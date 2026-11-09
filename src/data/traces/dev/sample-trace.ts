import type { Trace } from "@/data/trace-schema";

export const sampleTrace: Trace = {
  id: "sample-001",
  date: "2026-01-15T10:30:00Z",
  model: "llama-3.3-70b-versatile",
  source: "sample",
  fault: "CrashLoopBackOff on payment-worker pod",
  clusterTimeline: [
    { timestamp: 0, pod: "api-gateway-7d4f2", namespace: "default", state: "healthy" },
    { timestamp: 0, pod: "payment-worker-5f9a1", namespace: "default", state: "healthy" },
    { timestamp: 0, pod: "order-queue-c8b3e", namespace: "default", state: "healthy" },
    { timestamp: 0, pod: "inventory-svc-2a1d4", namespace: "default", state: "healthy" },
    { timestamp: 12, pod: "payment-worker-5f9a1", namespace: "default", state: "degraded", reason: "OOMKilled" },
    { timestamp: 18, pod: "payment-worker-5f9a1", namespace: "default", state: "failed" },
    { timestamp: 24, pod: "payment-worker-5f9a1", namespace: "default", state: "degraded", reason: "Restarting" },
    { timestamp: 36, pod: "payment-worker-5f9a1", namespace: "default", state: "failed" },
    { timestamp: 48, pod: "payment-worker-5f9a1", namespace: "default", state: "healthy" },
    { timestamp: 48, pod: "api-gateway-7d4f2", namespace: "default", state: "degraded", reason: "Upstream latency" },
  ],
  agentSteps: [
    {
      timestamp: 5,
      tool: "kubectl get pods",
      args: "-n default -l app=payment-worker",
      output: "NAME                     READY   STATUS    RESTARTS   AGE\npayment-worker-5f9a1   0/1     CrashLoopBackOff   3   45m",
      durationMs: 840,
    },
    {
      timestamp: 15,
      tool: "kubectl logs",
      args: "payment-worker-5f9a1 --previous",
      output: "FATAL: java.lang.OutOfMemoryError: Java heap space\n        at com.payments.Worker.processBatch(Worker.java:142)",
      durationMs: 1200,
    },
    {
      timestamp: 22,
      tool: "kubectl describe pod",
      args: "payment-worker-5f9a1",
      output: "Events:\n  Type     Reason     Age   From               Message\n  ----     ------     ----  ----               -------\n  Warning  OOMKilling   2m   kubelet            Memory cgroup out of memory\n  Normal   Created      2m   kubelet            Created container payment-worker",
      durationMs: 950,
    },
    {
      timestamp: 30,
      tool: "kubectl top pod",
      args: "payment-worker-5f9a1",
      output: "NAME                CPU(cores)   MEMORY(bytes)\npayment-worker-5f9a1   250m         512Mi / 256Mi",
      durationMs: 720,
    },
    {
      timestamp: 40,
      tool: "kubectl patch deployment",
      args: "payment-worker --patch '{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"payment-worker\",\"resources\":{\"limits\":{\"memory\":\"512Mi\"}}}]}}}}'",
      output: "deployment.apps/payment-worker patched",
      durationMs: 1100,
    },
  ],
  finalReport: {
    rootCauseCategory: "resource-exhaustion",
    explanation:
      "The payment-worker pod exceeded its 256Mi memory limit while processing a large batch of orders, triggering OOMKill. Kubernetes restarted the pod, but the same batch was reprocessed, creating a CrashLoopBackOff cycle. The API gateway began returning 502s as upstream latency increased.",
    evidenceReferences: [
      "kubectl logs payment-worker-5f9a1 --previous",
      "kubectl describe pod payment-worker-5f9a1",
      "metrics: memory usage spiked to 512Mi against 256Mi limit",
    ],
    suggestedFix:
      "Increase payment-worker memory limit to 512Mi and add a circuit breaker to skip batch reprocessing on restart.",
  },
  tokens: 1847,
  toolCallCount: 5,
  wallClockSeconds: 48,
};
