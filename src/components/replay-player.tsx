"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Trace } from "@/data/trace-schema";

const POD_COLORS: Record<string, string> = {
  healthy: "#10b981",
  degraded: "#f59e0b",
  failed: "#ef4444",
};

type PodState = { pod: string; namespace: string; state: string; reason?: string };

function computePodStatesAt(
  timeline: { timestamp: number; pod: string; namespace: string; state: string; reason?: string }[],
  time: number
): PodState[] {
  const states: Record<string, PodState> = {};
  for (const entry of timeline) {
    if (entry.timestamp <= time) {
      states[`${entry.namespace}/${entry.pod}`] = entry;
    }
  }
  return Object.values(states);
}

export function ReplayPlayer({ trace, initialStep }: { trace: Trace; initialStep: number }) {
  const [step, setStep] = useState(initialStep);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 4x
  const [reducedMotion, setReducedMotion] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const rafRef = useRef<number | null>(null);
  const stepStartTimeRef = useRef<number>(0);

  const intervalMs = useCallback(() => {
    switch (speed) {
      case 1: return 800;
      case 2: return 400;
      case 4: return 200;
      default: return 800;
    }
  }, [speed]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    stepStartTimeRef.current = Date.now();
  }, [step]);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;

    const now = Date.now();
    const elapsed = now - stepStartTimeRef.current;
    const delay = intervalMs();

    if (elapsed >= delay) {
      setStep((s) => (s + 1 < trace.clusterTimeline.length ? s + 1 : s));
      setIsPlaying(false);
      return;
    }

    rafRef.current = requestAnimationFrame(() => {
      // handled by the loop above
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, step, trace.clusterTimeline.length, intervalMs, reducedMotion]);

  const stepTime = trace.clusterTimeline[step]?.timestamp ?? 0;
  const podStates = computePodStatesAt(trace.clusterTimeline, stepTime);
  const isLastStep = step >= trace.clusterTimeline.length - 1;

  const permalink = `${window.location.origin}/projects/kube-triage/replay/${trace.id}/${step}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(permalink);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 1500);
  }, [permalink]);

  const handleStepDelta = useCallback((delta: number) => {
    setIsPlaying(false);
    setStep((s) => {
      const next = s + delta;
      if (next < 0) return 0;
      if (next >= trace.clusterTimeline.length) return trace.clusterTimeline.length - 1;
      return next;
    });
  }, [trace.clusterTimeline.length]);

  const handleTogglePlay = useCallback(() => {
    if (reducedMotion) return;
    setIsPlaying((p) => {
      if (!p) stepStartTimeRef.current = Date.now();
      return !p;
    });
  }, [reducedMotion]);

  const isSample = trace.source === "sample";

  return (
    <div className="space-y-8">
      {/* Header with label */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-mono font-bold tracking-tight text-foreground sm:text-6xl">
            Break-It Replay
          </h1>
          <p className="mt-2 text-sm font-mono text-muted">
            {trace.fault}
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-solid text-xs font-mono ${
            isSample
              ? "bg-accent/10 text-accent border border-solid border-accent/20"
              : "bg-blue-500/10 text-blue-400 border border-solid border-blue-500/20"
          }`}
        >
          <span className="w-2 h-2 rounded-full" aria-hidden="true" />
          {isSample ? "Illustrative sample" : "Real run"} · {trace.id} · {trace.date} · {trace.model}
        </div>
      </header>

      {/* Replay controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-solid border-border pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStepDelta(-1)}
            disabled={step === 0}
            className="flex h-8 w-8 items-center justify-center rounded border border-solid border-current px-2 text-xs font-mono text-foreground transition-colors hover:bg-accent/10 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous frame"
          >
            ←
          </button>
          <button
            onClick={handleTogglePlay}
            disabled={reducedMotion}
            className={`flex h-8 w-8 items-center justify-center rounded border border-solid border-current px-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isPlaying
                ? "bg-current text-background"
                : "bg-transparent text-foreground hover:bg-accent/10"
            } ${reducedMotion ? "opacity-50 pointer-events-none" : ""}`}
            aria-label={isPlaying ? "Pause" : "Play"}
            title={reducedMotion ? "Auto-play disabled under reduced motion" : undefined}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => handleStepDelta(1)}
            disabled={isLastStep}
            className="flex h-8 w-8 items-center justify-center rounded border border-solid border-current px-2 text-xs font-mono text-foreground transition-colors hover:bg-accent/10 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next frame"
          >
            →
          </button>
          <span className="text-xs font-mono text-muted">
            Frame {step + 1} of {trace.clusterTimeline.length}
          </span>
          <span className="text-xs font-mono text-muted">· {stepTime}s</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-muted">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
            disabled={reducedMotion}
            className="text-xs font-mono text-foreground bg-transparent border-none outline-none"
          >
            <option value={1}>1×</option>
            <option value={2}>2×</option>
            <option value={4}>4×</option>
          </select>
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded border border-solid border-current px-2 text-xs font-mono text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={copyFeedback ? "Link copied" : "Copy link to this frame"}
            title={copyFeedback ? "Link copied to clipboard" : "Copy link to this frame"}
          >
            {copyFeedback ? "✓" : "🔗"}
          </button>
          <a
            href={permalink}
            className="text-xs font-mono text-accent underline underline-offset-4 hover:text-accent/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open permalink
          </a>
        </div>
      </div>

      {/* Pod visualization */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-solid border-border rounded-lg p-6 bg-panel">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-mono font-semibold text-foreground">Cluster state</h2>
            <span className="ml-auto text-xs font-mono text-muted">
              t+{stepTime}s
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {podStates.map((ps) => (
              <div
                key={`${ps.namespace}/${ps.pod}`}
                className="flex flex-col items-center gap-2 p-3 rounded border border-solid"
                style={{
                  borderColor: POD_COLORS[ps.state] ?? "#1f2224",
                  backgroundColor:
                    POD_COLORS[ps.state] === "#ef4444"
                      ? "#ef4444/10"
                      : POD_COLORS[ps.state] === "#f59e0b"
                      ? "#f59e0b/10"
                      : "#10b981/10",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: POD_COLORS[ps.state] ?? "#10b981",
                  }}
                >
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: "#0b0c0d" }}
                  >
                    {ps.pod.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-mono text-foreground">{ps.pod}</span>
                <span className="text-[10px] font-mono text-muted uppercase tracking-tighter">
                  {ps.state}
                </span>
                {ps.reason && (
                  <span className="text-[10px] font-mono text-muted">{ps.reason}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Terminal panel */}
        <div className="border border-solid border-border rounded-lg bg-background/50">
          <div className="border-b border-solid border-border/50 bg-panel/50 p-3 flex items-center justify-between">
            <h2 className="font-mono font-semibold text-foreground">Agent steps</h2>
            <span className="text-xs font-mono text-muted">
              {trace.agentSteps.length} steps
            </span>
          </div>
          <div className="p-4 font-mono text-xs space-y-2 max-h-96 overflow-y-auto">
            {trace.agentSteps.map((s, i) => {
              const isCurrent = i === step;
              const isPast = i < step;
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${
                    isCurrent ? "border-l-2 border-l-accent pl-3 bg-accent/5" : ""
                  } ${isPast ? "opacity-60" : "opacity-30"}`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-tighter">
                      t+{s.timestamp}s
                    </span>
                    <span className="text-foreground font-bold">{s.tool}</span>
                    <span className="text-muted">{s.args}</span>
                  </div>
                  <div className="text-muted">
                    {s.output.split("\n").slice(0, 3).join("\n")}
                    {s.output.split("\n").length > 3 && " ..."}
                  </div>
                  <div className="text-[10px] text-muted">
                    {s.durationMs}ms
                  </div>
                </div>
              );
            })}
            {trace.agentSteps.length === 0 && (
              <p className="text-sm text-muted">No agent steps recorded.</p>
            )}
          </div>
        </div>
      </section>

      {/* Final report */}
      <section className="border border-solid border-border rounded-lg p-6 bg-panel">
        <h2 className="font-mono font-semibold text-foreground mb-4">Final report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-tighter mb-1">
              Root cause
            </p>
            <p className="text-sm font-mono text-foreground">{trace.finalReport.rootCauseCategory}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-tighter mb-1">
              Tokens · Tools · Wall-clock
            </p>
            <p className="text-sm font-mono text-foreground">
              {trace.tokens} · {trace.toolCallCount} · {trace.wallClockSeconds}s
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm font-mono text-muted leading-relaxed">
          {trace.finalReport.explanation}
        </p>
        <div className="mt-4">
          <p className="text-xs font-mono text-muted uppercase tracking-tighter mb-2">
            Evidence
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm font-mono text-muted">
            {trace.finalReport.evidenceReferences.map((ref, i) => (
              <li key={i}>{ref}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-xs font-mono text-muted uppercase tracking-tighter mb-2">
            Suggested fix
          </p>
          <p className="text-sm font-mono text-foreground leading-relaxed">
            {trace.finalReport.suggestedFix}
          </p>
        </div>
      </section>
    </div>
  );
}
