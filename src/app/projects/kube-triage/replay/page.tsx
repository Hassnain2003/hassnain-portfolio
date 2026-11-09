import Link from "next/link";
import { traceIds, traceById } from "@/data/traces";

export const metadata = {
  title: "Break-It Replay — kube-triage",
  description: "Replay real kube-triage runs. Permalink to any frame. Inspect pod states, agent steps, and final reports.",
};

export default function ReplayListing() {
  const allTraces = traceIds().map((id) => ({ ...traceById(id)!, source: "real" as const }));

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-mono font-bold tracking-tight text-foreground sm:text-6xl">
          Break-It Replay
        </h1>
        <p className="mt-4 text-xl font-mono text-muted">
          Replay real kube-triage runs. Every frame is deep-linkable — send a friend the exact
          moment the pod goes red.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Available traces</h2>
        <div className="space-y-4">
          {allTraces.length === 0 ? (
            <p className="text-sm font-mono text-muted">
              No traces available. Provide real traces via scripts/convert-eval-to-trace.ts.
            </p>
          ) : (
            allTraces.map((trace) => (
              <article
                key={trace.id}
                className="border border-solid border-border rounded-lg p-6 print-break"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-mono font-semibold text-foreground">
                      {trace.fault}
                    </h3>
                    <p className="text-sm font-mono text-muted">
                      {trace.id} · {trace.date} · {trace.model}
                    </p>
                  </div>
                  <span
                    className="bg-blue-500/10 text-blue-400 border border-solid border-blue-500/20 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono"
                  >
                    Real run
                  </span>
                </div>
                <p className="text-sm font-mono text-muted mb-4">
                  {trace.clusterTimeline.length} frames · {trace.agentSteps.length} agent steps ·
                  {trace.wallClockSeconds}s wall-clock
                </p>
                <Link
                  href={`/projects/kube-triage/replay/${trace.id}/0`}
                  className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Open replay →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">How to read a replay</h2>
        <ul className="list-disc list-inside space-y-2 text-sm font-mono text-muted">
          <li>
            Pods turn <span className="text-green-500">green</span> (healthy),{" "}
            <span className="text-yellow-500">yellow</span> (degraded), or{" "}
            <span className="text-red-500">red</span> (failed) per the cluster timeline.
          </li>
          <li>
            Agent steps stream into a terminal-style panel with recorded timing.
          </li>
          <li>
            Use the speed slider to fast-forward or slow down playback.
          </li>
          <li>
            Every frame has a permalink — copy it with the link button next to the step counter.
          </li>
          <li>
            The final report card shows root cause, evidence, and suggested fix.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Reduced motion</h2>
        <p className="text-sm font-mono text-muted">
          Under prefers-reduced-motion, the replay shows a static step-by-step view with the same
          information and the same permalinks — no animation, no auto-play.
        </p>
      </section>
    </article>
  );
}
