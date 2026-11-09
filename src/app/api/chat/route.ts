import { NextResponse } from "next/server";

import { SYSTEM_PROMPT, validateSources, isPromptInjection, MAX_INPUT_LENGTH } from "@/lib/chat-grounding";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

// In-memory rate limiter: IP -> { count, resetTime }
// Documented: 10 requests per minute per IP. Resets every 60 seconds.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60_000 });
    return { allowed: true };
  }

  if (entry.count >= 10) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

export const runtime = "edge";

export async function POST(request: Request) {
  // 1. Check API key is configured (server-side only, never in client bundle)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat service not configured" },
      { status: 503 }
    );
  }

  // 2. Restrict origins to my site
  const origin = request.headers.get("origin") ?? "";
  const allowedOrigins = [
    "https://hassnain-portfolioz.vercel.app",
    "http://localhost:3000",
  ];
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }

  // 3. Rate limit per IP
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rateLimit.retryAfter },
      { status: 429 }
    );
  }

  // 4. Parse and validate input
  let body: { message: string };
  try {
    body = (await request.json()) as { message: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message } = body;
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (message.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: `Message too long (max ${MAX_INPUT_LENGTH} characters)` },
      { status: 400 }
    );
  }

  // 5. Prompt injection check
  if (isPromptInjection(message)) {
    return NextResponse.json(
      { error: "I can't help with that." },
      { status: 400 }
    );
  }

  // 6. Call Gemini API
  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 250,
        },
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Chat service unavailable" },
      { status: 503 }
    );
  }

  if (!geminiResponse.ok) {
    return NextResponse.json(
      { error: "Chat service error" },
      { status: 502 }
    );
  }

  const geminiData = await geminiResponse.json();
  const content = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    return NextResponse.json(
      { error: "No response from chat service" },
      { status: 502 }
    );
  }

  // 7. Parse the JSON response from Gemini
  let parsed: { answer: string; sources: string[]; confidence: "high" | "medium" | "low" };
  try {
    // Gemini may wrap JSON in markdown code fences — strip them
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    // Gemini didn't return valid JSON — treat as unknown
    parsed = {
      answer: "I don't know, please email me at abbashussnain818@gmail.com",
      sources: [],
      confidence: "low",
    };
  }

  // 8. Validate sources against facts
  parsed.sources = validateSources(parsed.sources ?? []);

  // 9. If no sources and not a clear "I don't know", still be safe
  if (!parsed.sources || parsed.sources.length === 0) {
    if (!parsed.answer.toLowerCase().includes("i don't know")) {
      parsed.answer = "I don't know, please email me at abbashussnain818@gmail.com";
    }
  }

  return NextResponse.json(parsed);
}
