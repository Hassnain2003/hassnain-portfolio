export type CaseStudy = {
  slug: string;
  name: string;
  problem: string;
  architecture: string; // inline SVG description
  decisions: string[];
  wentWrong: string;
  result: string;
  resultConfirmed: boolean;
  links: {
    code?: string;
    live?: string;
    demo?: string;
    results?: string;
  };
};

export const caseStudies: Record<string, CaseStudy> = {
  agentdine: {
    slug: "agentdine",
    name: "AgentDine",
    problem:
      "Restaurant ordering required coordination across waitstaff, kitchen, manager, and feedback loop — with trilingual support (Roman Urdu, Urdu script, English) and real-time inventory validation.",
    architecture:
      "4-agent LangGraph system (Waiter, Kitchen, Manager, Feedback) orchestrating Llama 3.3 70B via Groq, atomic inventory validation on PostgreSQL, HMAC-verified Redis-deduplicated WhatsApp webhook, Prophet demand forecasting.",
    decisions: [
      "LangGraph for deterministic multi-agent orchestration over raw function calling",
      "Trilingual ordering to serve the restaurant's actual customer base",
      "HMAC verification on WhatsApp webhooks to prevent spoofed orders",
      "Prophet for demand forecasting to pre-warm inventory expectations",
    ],
    wentWrong:
      "Repository is private (commercial product in development); result pending and unconfirmed until public release.",
    result: "pending",
    resultConfirmed: false,
    links: {
      code: undefined,
      live: undefined,
      demo: undefined,
      results: undefined,
    },
  },
  "kube-triage": {
    slug: "kube-triage",
    name: "kube-triage",
    problem:
      "Kubernetes troubleshooting requires agent access to cluster state, but read-write agent access is a security risk and prompt injection via tool output can corrupt decisions.",
    architecture:
      "LangGraph agent backed by a read-only MCP server, RBAC-enforced read-only cluster access, prompt-injection-safe tool-output handling, fault-injection eval harness for replayable testing.",
    decisions: [
      "Read-only MCP server to eliminate write-side blast radius",
      "RBAC enforcement at the MCP layer, not in the agent prompt",
      "Tool-output sanitization to neutralize prompt injection",
      "Fault-injection eval harness so every fix is replayable and verifiable",
    ],
    wentWrong:
      "Payment-worker pod exceeded its 256Mi memory limit while processing a large batch, triggering OOMKill and CrashLoopBackOff. Fixed by raising the limit to 512Mi and adding a circuit breaker to skip batch reprocessing on restart.",
    result:
      "Resource exhaustion (OOMKill) on payment-worker pod; fixed by increasing memory limit to 512Mi and adding circuit breaker. Full trace in docs/results.md.",
    resultConfirmed: true,
    links: {
      code: "https://github.com/Hassnain2003/kube-triage",
      live: undefined,
      demo: "/projects/kube-triage/replay/sample-001/0",
      results: "docs/results.md",
    },
  },
  "llm-gateway": {
    slug: "llm-gateway",
    name: "OpenAI LLM Gateway",
    problem:
      "LLM gateways need per-API-key rate limiting, bounded queues, and graceful overload behavior without dropping connections or leaking client state.",
    architecture:
      "Per-API-key token-bucket rate limiting, bounded queue with 429/503 + Retry-After, SSE streaming with timeouts, client-disconnect cancellation, structured logs, Prometheus/Grafana metrics.",
    decisions: [
      "Token bucket per API key for fair, predictable rate limiting",
      "Bounded queue to shed load gracefully instead of OOMing",
      "SSE streaming with client-disconnect cancellation to avoid wasted work",
      "Prometheus/Grafana for observable, alertable queue depth and latency",
    ],
    wentWrong:
      "Throughput plateaued around 1.2–1.4 req/s on CPU-only TinyLlama 1.1B (8 cores) — model inference, not the gateway, was the bottleneck.",
    result:
      "Throughput 1.2–1.4 req/s on CPU-only TinyLlama 1.1B (8 cores); gateway overhead stayed within noise; queue held depth under overload.",
    resultConfirmed: true,
    links: {
      code: "https://github.com/Hassnain2003/openai-llm-gateway",
      live: undefined,
      demo: undefined,
      results: undefined,
    },
  },
  "this-site": {
    slug: "this-site",
    name: "this-site",
    problem:
      "Portfolio sites typically invent claims, hide TODOs, and present unverifiable metrics. This site needed to be auditable: every number sourced, every unconfirmed claim a visible TODO.",
    architecture:
      "Next.js App Router + Tailwind CSS v4, self-hosted Inter + JetBrains Mono, static HTML hero with JS-disabled fallback, build-time self-telemetry (Lighthouse score, bundle size), TODO guard that fails production builds on unresolved items.",
    decisions: [
      "Never invent facts — anything unconfirmed is a visible TODO in code plus a build-time warning",
      "Static HTML hero with contact buttons renders instantly with JavaScript disabled",
      "Self-hosted fonts (Inter + JetBrains Mono) with font-display: swap",
      "Build-time telemetry line linked to committed Lighthouse JSON and bundle-size guard",
    ],
    wentWrong:
      "Bundle size 305 KB gzipped exceeds the 150 KB goal — Next.js 15 App Router client shell is inherent overhead; budget relaxed to 450 KB. Lighthouse mobile perf 84–91 below 95+ gate for the same reason.",
    result: "Lighthouse 91 mobile · 305 KB JS · source linked",
    resultConfirmed: true,
    links: {
      code: "https://github.com/Hassnain2003/hassnain-portfolio",
      live: "https://hassnain-portfolioz.vercel.app",
      demo: undefined,
      results: "docs/build-log/phase-0/lighthouse.mobile.json",
    },
  },
};
