# Results — Hassnain Abbas

Single source of truth for measured project outcomes. Every number here
traces to a repository, test, trace, or Lighthouse report. Nothing is
invented.

## kube-triage

**Root cause category:** resource-exhaustion (OOMKill on payment-worker pod)

**What was measured:**
- Payment-worker pod exceeded 256Mi memory limit, triggering OOMKill
- CrashLoopBackOff cycle from batch reprocessing on restart
- API gateway returned 502s as upstream latency increased
- Fix: increased memory limit to 512Mi, added circuit breaker to skip batch reprocessing
- Verified via kubectl logs, kubectl describe pod, and kubectl top pod
- Replay available at: /projects/kube-triage/replay/sample-001/0

**Trace metrics:**
- Agent steps: 5 (kubectl get pods, kubectl logs, kubectl describe pod, kubectl top pod, kubectl patch deployment)
- Wall clock: 48 seconds
- Tokens: 1,847
- Tool calls: 5

**Source:** https://github.com/Hassnain2003/kube-triage

## OpenAI LLM Gateway

**Throughput:** 1.2–1.4 req/s on CPU-only TinyLlama 1.1B (8 cores)
**Bottleneck:** Model inference, not the gateway
**Gateway overhead:** within run-to-run noise
**Queue:** held at configured depth under overload
**Test coverage:** 22 tests (88.85%)
**Source:** https://github.com/Hassnain2003/openai-llm-gateway

## AgentDine

**Status:** Private repository (commercial product in development)
**Result:** pending (unconfirmed)
**System:** 4-agent LangGraph (Waiter, Kitchen, Manager, Feedback)
**Model:** Llama 3.3 70B via Groq
**Trilingual:** Roman Urdu, Urdu script, English
**Source:** Not public (commercial product)

## D&Z Cartique

**Status:** Live
**Live site:** https://dz-cartique.web.app
**Stack:** React, Firebase Auth, Firestore, role-protected admin dashboard, cash on delivery
**Source:** https://github.com/Hassnain2003/E-commerce-Website-live

## QLSS

**Status:** Public
**Repo:** https://github.com/Hassnain2003/QLSS
**Result:** Live queue position and estimated wait
**Stack:** Flutter, Firebase Auth, Firestore
**Source:** https://github.com/Hassnain2003/QLSS

## Algorithmic trading engine

**Status:** Planned
**Result:** No profit claims
**System:** Live execution engine, central risk manager, replay and walk-forward harness
**Source:** Repository to be published

## This site

**Lighthouse mobile:** 91/100 performance, 100/100 accessibility, 100/100 best practices, 100/100 SEO
**Lighthouse desktop:** 100/100 across all categories
**Bundle size:** 305 KB gzipped (within 450 KB budget)
**Build:** Next.js 15 App Router, static HTML hero, self-hosted fonts
**Source:** https://github.com/Hassnain2003/hassnain-portfolio
