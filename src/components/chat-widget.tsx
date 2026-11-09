"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { facts } from "@/data/facts";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const FAQ_ENTRIES = [
  {
    q: "Who are you?",
    a: `${facts.name} — ${facts.role}`,
  },
  {
    q: "Where are you based?",
    a: `${facts.location}.`,
  },
  {
    q: "What's your education?",
    a: facts.education,
  },
  {
    q: "How can I contact you?",
    a: `Email: ${facts.links.email}. GitHub: ${facts.links.github}. LinkedIn: ${facts.links.linkedin}.`,
  },
  {
    q: "What projects have you built?",
    a: facts.projects.map((p) => p.name).join(", "),
  },
  {
    q: "What's your experience?",
    a: facts.experience.map((e) => `${e.role} at ${e.employer} (${e.period})`).join("; "),
  },
  {
    q: "What are your skills?",
    a: facts.skills.map((s) => `${s.area}: ${s.items.join(", ")}`).join("; "),
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const toggleChat = useCallback(() => {
    setOpen((o) => !o);
    if (!open && error) setError(false);
  }, [open, error]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.answer ?? "I don't know, please email me at abbashussnain818@gmail.com",
        sources: data.sources ?? [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError(true);
      // Degrade to static FAQ: try to find a matching answer
      const lower = text.toLowerCase();
      const match = FAQ_ENTRIES.find((f) =>
        lower.includes(f.q.toLowerCase().split(" ")[0])
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: match
            ? `${match.a} (static fallback — AI assistant unavailable)`
            : "I don't know, please email me at abbashussnain818@gmail.com. The AI assistant is temporarily unavailable.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  }, [sendMessage]);

  if (!open) {
    return (
      <button
        id="chat-toggle"
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-solid border-current bg-background/90 backdrop-blur px-3 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Open chat assistant"
        title="Ask my agent"
      >
        <span className="sr-only">chat</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 flex flex-col">
      <div className="border border-solid border-border rounded-lg bg-background/95 backdrop-blur shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-border/50 bg-panel/50">
          <h3 className="font-mono font-semibold text-foreground">Ask my agent</h3>
          <button
            onClick={toggleChat}
            className="h-6 w-6 rounded border border-solid border-current/30 flex items-center justify-center text-xs font-mono text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close chat"
          >
            <span className="sr-only">close</span>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-xs font-mono text-muted">
            AI assistant. Answers are based on the facts on this site.
          </p>
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm font-mono ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-panel/50 text-foreground border border-solid border-border/50"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="ml-1">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-tighter">
                      Sources: {msg.sources.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-muted">Thinking…</span>
              </div>
            )}
            {error && (
              <div className="p-3 rounded bg-accent/10 border border-solid border-accent/30">
                <p className="text-xs font-mono text-accent">
                  AI assistant unavailable. Static answers may be limited.
                </p>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-solid border-border/50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects, experience, or skills…"
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm font-mono text-foreground bg-transparent border-none outline-none placeholder:text-muted/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 py-2 text-xs font-mono text-foreground bg-accent text-accent-foreground rounded hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-[10px] font-mono text-muted">
            Max 500 characters · 10 requests/minute
          </p>
        </form>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => {
            setOpen(false);
            setMessages([]);
            setError(false);
          }}
          className="text-[10px] font-mono text-muted hover:text-accent transition-colors"
        >
          Clear chat
        </button>
      </div>
    </div>
  );
}
