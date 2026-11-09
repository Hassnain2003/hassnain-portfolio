# Facts — Hassnain Abbas

The single source of truth for this site. Every claim on the site traces to a line here, a repository, a test, a trace, or a measurement. Nothing else ships.

## Identity

Name: Hassnain Abbas
Role: AI & Backend Engineer building LLM agents and the infrastructure they run on.
Availability: full-time from 4 January 2027
Location: Islamabad, Pakistan
Education: Final-year BS Information Technology student, Bahria University Islamabad, graduating January 2027

## Links

GitHub: https://github.com/Hassnain2003
LinkedIn: https://linkedin.com/in/hassnainzaidi
Email: abbashussnain818@gmail.com
Resume: /resume

## Projects (in the order given)

### AgentDine
Multi-agent restaurant ordering platform. Private repository (commercial product in development).
4-agent LangGraph system (Waiter, Kitchen, Manager, Feedback), trilingual ordering (Roman Urdu, Urdu script, English) with Llama 3.3 70B via Groq, atomic real-time inventory validation on PostgreSQL, HMAC-verified Redis-deduplicated WhatsApp webhook, Prophet demand forecasting, pytest suite, Docker deployment.
Final Year Project at Bahria University, team of 2.
Repo: private (commercial product in development)
Result: pending (unconfirmed)

### kube-triage
https://github.com/Hassnain2003/kube-triage
LangGraph agent with a read-only MCP server, RBAC-enforced read-only access, prompt-injection-safe tool-output handling, fault-injection eval harness.
Result: Resource exhaustion (OOMKill) on payment-worker pod; fixed by increasing memory limit to 512Mi and adding circuit breaker. Full trace in docs/results.md.

### OpenAI LLM Gateway
https://github.com/Hassnain2003/openai-llm-gateway
Per-API-key token-bucket rate limiting, bounded queue with 429/503 + Retry-After, SSE streaming, timeouts, client-disconnect cancellation, structured logs, Prometheus/Grafana, 22 tests (88.85% coverage), CI (ruff, pytest, helm lint, kubeconform, terraform validate, Docker build, kind smoke test).
Result: Throughput 1.2–1.4 req/s on CPU-only TinyLlama 1.1B (8 cores); gateway overhead stayed within noise; queue held at configured depth under overload.

### Algorithmic trading engine
Live execution engine, central risk manager, replay and walk-forward harness with preregistered eligibility rules. No profit claims.
Repo: to be published

### D&Z Cartique
Live site: https://dz-cartique.web.app
Repo: https://github.com/Hassnain2003/E-commerce-Website-live
React, Firebase Auth, Firestore, role-protected admin dashboard, cash on delivery.

### QLSS
https://github.com/Hassnain2003/QLSS
Queue-less appointment app for Bahria University, Flutter and Firebase Auth and Firestore: token-based booking, live queue position and estimated wait, café seat booking, role-based flows for advisors, department heads, and cafeteria staff.

## Experience

### Codroon
Full-Stack Developer Intern, Aug–Oct 2025, remote. Figma to React, REST integration across 10+ modules, Node.js and PostgreSQL endpoints with auth and RBAC.

### Delta Plus
Software Developer (contract), Feb–May 2025. Digitized paper-based operations across 12 departments, cutting document retrieval time by 70% (attributed to employer, not verified by me). Firestore, Auth, Cloud Functions; MVP in 3 weeks.

## Leadership

Google Developer Student Club core team (2023–2024)
YOTA competitive programming coordinator (2024–2025)

## Skills (grouped lines)

Languages: Python, JavaScript, TypeScript, C++, SQL, Bash
AI and backend: FastAPI, LangGraph, LangChain, Groq, MCP, async Python
Infrastructure: Docker, Kubernetes (kind), Helm, Terraform, GitHub Actions, Prometheus, Grafana
Data: PostgreSQL, Redis, Firestore
Frontend: React
