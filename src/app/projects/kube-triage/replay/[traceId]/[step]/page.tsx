import { notFound } from "next/navigation";
import { traceById } from "@/data/traces";
import { devTraceById } from "@/data/traces/dev";
import { ReplayPlayer } from "@/components/replay-player";

export const metadata = {
  title: "Break-It Replay",
};

export default async function ReplayPage({
  params,
}: {
  params: Promise<{ traceId: string; step: string }>;
}) {
  const { traceId, step } = await params;
  const stepIndex = parseInt(step, 10) || 0;

  const trace = traceById(traceId) ?? devTraceById(traceId);

  if (!trace) {
    notFound();
  }

  if (stepIndex < 0 || stepIndex >= trace.clusterTimeline.length) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 print-break">
      <ReplayPlayer trace={trace} initialStep={stepIndex} />
    </article>
  );
}
