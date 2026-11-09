#!/usr/bin/env node
/**
 * convert-eval-to-trace.ts
 *
 * Converts kube-triage's eval output into the trace schema used by the
 * Break-It replay feature.
 *
 * Expected kube-triage eval output format (JSON):
 * {
 *   "traceId": "abc-123",
 *   "date": "2026-01-15T10:30:00Z",
 *   "model": "llama-3.3-70b-versatile",
 *   "fault": "CrashLoopBackOff on payment-worker pod",
 *   "clusterTimeline": [
 *     { "timestamp": 0, "pod": "api-gateway-7d4f2", "namespace": "default", "state": "healthy" },
 *     ...
 *   ],
 *   "agentSteps": [
 *     { "timestamp": 5, "tool": "kubectl get pods", "args": "-n default -l app=payment-worker", "output": "...", "durationMs": 840 },
 *     ...
 *   ],
 *   "finalReport": {
 *     "rootCauseCategory": "resource-exhaustion",
 *     "explanation": "...",
 *     "evidenceReferences": ["..."],
 *     "suggestedFix": "..."
 *   },
 *   "tokens": 1847,
 *   "toolCallCount": 5,
 *   "wallClockSeconds": 48
 * }
 *
 * Usage:
 *   node scripts/convert-eval-to-trace.ts <eval-json-file> <output-trace-file> [--source real|sample]
 *
 * If kube-triage's eval format differs, export it to the shape above first,
 * then run this script to produce the trace file.
 */

import fs from "node:fs";
import path from "node:path";

type EvalOutput = {
  traceId?: string;
  date?: string;
  model?: string;
  fault?: string;
  clusterTimeline?: Array<{
    timestamp: number;
    pod: string;
    namespace: string;
    state: string;
    reason?: string;
  }>;
  agentSteps?: Array<{
    timestamp: number;
    tool: string;
    args: string;
    output: string;
    durationMs: number;
  }>;
  finalReport?: {
    rootCauseCategory: string;
    explanation: string;
    evidenceReferences: string[];
    suggestedFix: string;
  };
  tokens?: number;
  toolCallCount?: number;
  wallClockSeconds?: number;
};

const SOURCE = process.argv.includes("--source=real") ? "real" : "sample";

function die(message: string): never {
  console.error(`convert-eval-to-trace: ${message}`);
  process.exit(1);
}

const [, , evalFile, outputFile] = process.argv;

if (!evalFile || !outputFile) {
  die("Usage: node scripts/convert-eval-to-trace.ts <eval-json-file> <output-trace-file> [--source real|sample]");
}

if (!fs.existsSync(evalFile)) {
  die(`eval file not found: ${evalFile}`);
}

let evalData: EvalOutput;
try {
  evalData = JSON.parse(fs.readFileSync(evalFile, "utf8"));
} catch (err) {
  die(`failed to parse eval JSON: ${err}`);
}

const trace = {
  id: evalData.traceId || "unknown",
  date: evalData.date || new Date().toISOString(),
  model: evalData.model || "unknown",
  source: SOURCE as "real" | "sample",
  fault: evalData.fault || "unspecified fault",
  clusterTimeline: (evalData.clusterTimeline ?? []).map((e) => ({
    timestamp: e.timestamp,
    pod: e.pod,
    namespace: e.namespace,
    state: e.state as "healthy" | "degraded" | "failed",
    reason: e.reason,
  })),
  agentSteps: (evalData.agentSteps ?? []).map((s) => ({
    timestamp: s.timestamp,
    tool: s.tool,
    args: s.args,
    output: s.output,
    durationMs: s.durationMs,
  })),
  finalReport: evalData.finalReport ?? {
    rootCauseCategory: "unspecified",
    explanation: "No final report provided in eval output.",
    evidenceReferences: [],
    suggestedFix: "Review the trace manually.",
  },
  tokens: evalData.tokens ?? 0,
  toolCallCount: evalData.toolCallCount ?? 0,
  wallClockSeconds: evalData.wallClockSeconds ?? 0,
};

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(trace, null, 2) + "\n");

console.log(
  `convert-eval-to-trace: wrote ${outputFile} (id=${trace.id}, source=${trace.source}, steps=${trace.agentSteps.length}, wallClock=${trace.wallClockSeconds}s)`
);

if (trace.source === "sample") {
  console.warn(
    "WARNING: trace marked as 'sample'. Do not include sample traces in production builds."
  );
}
