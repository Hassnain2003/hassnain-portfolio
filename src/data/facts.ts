// Verbatim source of truth. Keep facts.md and this file in sync.
//
// Every project card, case study, hero line, and chat answer derives from
// this typed object. If it is not here, it does not ship.

export type Link = {
  label: string;
  url: string;
};

export type Experience = {
  employer: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  attribution?: string;
};

export type Leadership = {
  organization: string;
  role: string;
  period: string;
};

export type SkillGroup = {
  area: string;
  items: string[];
};

export type ProjectStatus = "private" | "public" | "live" | "planned";

export type Project = {
  name: string;
  description: string;
  repo?: string;
  live?: string;
  demo?: string;
  status: ProjectStatus;
  tags: string[];
  result: string;
  resultConfirmed: boolean;
  context?: string;
};

export const facts = {
  name: "Hassnain Abbas",
  role: "AI & Backend Engineer building LLM agents and the infrastructure they run on.",
  availability: "full-time from 4 January 2027",
  location: "Islamabad, Pakistan",
  education:
    "Final-year BS Information Technology student, Bahria University Islamabad, graduating January 2027",
  bio: `I'm a final-year IT student at Bahria University Islamabad, graduating in January 2027, and I build LLM agents and the infrastructure they run on. What draws me in is the part after the demo works: the queue that fills up, the webhook that arrives twice, the pod that crashes at 3 a.m., and the question of whether an AI system is actually right or only sounds right.

My final year project, AgentDine, is a four-agent WhatsApp ordering platform that takes orders in Roman Urdu, Urdu, and English and checks inventory in real time. I built an OpenAI-compatible gateway that rate-limits per key, queues requests with backpressure, streams responses, cancels abandoned ones, and ships with dashboards, 22 tests, and CI. My latest project is a read-only Kubernetes agent that diagnoses broken deployments. It got 29 of 30 injected faults right in an eval I wrote, and the repo shows its failures as plainly as its wins.

Before that, I shipped a three-week MVP at Delta Plus that, by the company's measure, cut document retrieval time by 70%, and I built full-stack apps with admin dashboards, authentication, and live deployments. I was also on the core team of Google Developer Student Club.

Give me a hard backend or AI problem, from an ordering bot to a model gateway to an agent that reads logs, and I'll build it, test it, and tell you honestly where it breaks.`,
  links: {
    github: "https://github.com/Hassnain2003",
    linkedin: "https://linkedin.com/in/hassnainzaidi",
    email: "abbashussnain818@gmail.com",
    resume: "/resume",
  },
  projects: [
    {
      name: "AgentDine",
      description:
        "Multi-agent restaurant ordering platform. 4-agent LangGraph system (Waiter, Kitchen, Manager, Feedback), trilingual ordering (Roman Urdu, Urdu script, English) with Llama 3.3 70B via Groq, atomic real-time inventory validation on PostgreSQL, HMAC-verified Redis-deduplicated WhatsApp webhook, Prophet demand forecasting, pytest suite, Docker deployment.",
      repo: undefined,
      live: undefined,
      demo: undefined,
      status: "private",
      tags: ["LangGraph", "Groq", "Llama 3.3 70B", "PostgreSQL", "Redis", "WhatsApp", "Prophet", "pytest", "Docker"],
      result: "pending",
      resultConfirmed: false,
      context: "Final Year Project at Bahria University, team of 2. Private repository (commercial product in development).",
    },
    {
      name: "kube-triage",
      description:
        "LangGraph agent with a read-only MCP server, RBAC-enforced read-only access, prompt-injection-safe tool-output handling, fault-injection eval harness.",
      repo: "https://github.com/Hassnain2003/kube-triage",
      live: undefined,
      demo: "/projects/kube-triage/replay/sample-001/0",
      status: "public",
      tags: ["LangGraph", "MCP", "RBAC", "prompt-injection-safe", "fault-injection eval"],
      result: "Resource exhaustion (OOMKill) on payment-worker pod; fixed by increasing memory limit to 512Mi and adding circuit breaker. Full trace in docs/results.md.",
      resultConfirmed: true,
    },
    {
      name: "OpenAI LLM Gateway",
      description:
        "Per-API-key token-bucket rate limiting, bounded queue with 429/503 + Retry-After, SSE streaming, timeouts, client-disconnect cancellation, structured logs, Prometheus/Grafana, 22 tests (88.85% coverage), CI (ruff, pytest, helm lint, kubeconform, terraform validate, Docker build, kind smoke test).",
      repo: "https://github.com/Hassnain2003/openai-llm-gateway",
      live: undefined,
      demo: undefined,
      status: "public",
      tags: ["token bucket", "SSE", "Prometheus", "Grafana", "Docker", "kind"],
      result:
        "Throughput 1.2–1.4 req/s on CPU-only TinyLlama 1.1B (8 cores); gateway overhead within noise; queue held depth under overload.",
      resultConfirmed: true,
    },
    {
      name: "Algorithmic trading engine",
      description:
        "Live execution engine, central risk manager, replay and walk-forward harness with preregistered eligibility rules.",
      repo: undefined,
      live: undefined,
      demo: undefined,
      status: "planned",
      tags: ["execution engine", "risk manager", "replay", "walk-forward"],
      result: "No profit claims.",
      resultConfirmed: true,
    },
    {
      name: "D&Z Cartique",
      description:
        "Live fashion e-commerce site with React, Firebase Auth, Firestore, role-protected admin dashboard, cash on delivery.",
      repo: "https://github.com/Hassnain2003/E-commerce-Website-live",
      live: "https://dz-cartique.web.app",
      demo: undefined,
      status: "live",
      tags: ["React", "Firebase Auth", "Firestore", "cash on delivery"],
      result: "live site",
      resultConfirmed: true,
    },
    {
      name: "QLSS",
      description:
        "Queue-less appointment app for Bahria University: token-based booking, live queue position and estimated wait, café seat booking, role-based flows for advisors, department heads, and cafeteria staff.",
      repo: "https://github.com/Hassnain2003/QLSS",
      live: undefined,
      demo: undefined,
      status: "public",
      tags: ["Flutter", "Firebase Auth", "Firestore"],
      result: "live queue position and estimated wait",
      resultConfirmed: true,
    },
  ],
  experience: [
    {
      employer: "Codroon",
      role: "Full-Stack Developer Intern",
      period: "Aug–Oct 2025",
      location: "remote",
      description: [
        "Figma to React",
        "REST integration across 10+ modules",
        "Node.js and PostgreSQL endpoints with auth and RBAC",
      ],
    },
    {
      employer: "Delta Plus",
      role: "Software Developer (contract)",
      period: "Feb–May 2025",
      location: "",
      description: [
        "Digitized paper-based operations across 12 departments",
        "Firestore, Auth, Cloud Functions",
        "MVP in 3 weeks",
      ],
      attribution:
        "employer reports cutting document retrieval time by 70%; not independently verified",
    },
  ],
  leadership: [
    { organization: "Google Developer Student Club", role: "core team", period: "2023–2024" },
    { organization: "YOTA", role: "competitive programming coordinator", period: "2024–2025" },
  ],
  skills: [
    { area: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Bash"] },
    { area: "AI and agents", items: ["LangGraph", "LangChain", "Groq API (Llama 3.3, gpt-oss)", "MCP (Model Context Protocol)", "prompt-injection-aware tool design", "rule-based evals"] },
    { area: "Backend", items: ["FastAPI", "async Python", "REST APIs", "Pydantic", "WebSockets/SSE streaming", "Node.js"] },
    { area: "Data and storage", items: ["PostgreSQL", "Redis", "SQLite", "Firestore", "SQLAlchemy", "Alembic", "Pandas", "Prophet"] },
    { area: "Infrastructure and DevOps", items: ["Docker", "Docker Compose", "Kubernetes (kind)", "Helm", "Terraform", "GitHub Actions", "Prometheus", "Grafana", "k6"] },
    { area: "Quality and reliability", items: ["pytest", "ruff", "rate limiting", "backpressure and queuing", "structured logging", "CI pipelines", "load testing"] },
    { area: "Frontend", items: ["React", "Next.js", "Vite", "HTML/CSS", "Flutter"] },
    { area: "Integrations", items: ["WhatsApp Cloud API", "webhooks with HMAC verification", "Firebase (Auth, Firestore, Cloud Functions, Hosting)"] },
  ],
} as const;

export type Facts = typeof facts;
