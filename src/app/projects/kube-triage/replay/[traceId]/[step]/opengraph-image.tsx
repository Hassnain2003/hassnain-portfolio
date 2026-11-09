import { ImageResponse } from "next/og";
import { traceById } from "@/data/traces";
import { devTraceById } from "@/data/traces/dev";

const POD_COLORS: Record<string, string> = {
  healthy: "#10b981",
  degraded: "#f59e0b",
  failed: "#ef4444",
};

export const config = {
  runtime: "edge",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ traceId: string; step: string }>;
}) {
  const { traceId, step } = await params;
  const stepIndex = parseInt(step, 10) || 0;

  const trace = traceById(traceId) ?? devTraceById(traceId);
  if (!trace) {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            background: "#0b0c0d",
            color: "#eef0f1",
            fontFamily: "'JetBrains Mono', monospace",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
            Trace not found
          </h1>
          <p style={{ fontSize: 18, color: "#93979d" }}>{traceId}</p>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Compute pod states at this step
  const stepTime = trace.clusterTimeline[stepIndex]?.timestamp ?? 0;
  const podStates: Record<string, string> = {};
  for (const entry of trace.clusterTimeline) {
    if (entry.timestamp <= stepTime) {
      podStates[`${entry.namespace}/${entry.pod}`] = entry.state;
    }
  }

  const pods = Object.entries(podStates).map(([key, state]) => {
    const [namespace, pod] = key.split("/");
    const color = POD_COLORS[state] ?? "#10b981";
    return (
      <div
        key={key}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />
        <span
          style={{
            fontSize: 16,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {namespace}/{pod} — {state}
        </span>
      </div>
    );
  });

  const currentStep = trace.agentSteps[stepIndex];
  const isSampleLabel = trace.source === "sample"
    ? "ILLUSTRATIVE SAMPLE"
    : "REAL RUN";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0b0c0d",
          color: "#eef0f1",
          fontFamily: "'JetBrains Mono', monospace",
          display: "flex",
          flexDirection: "column",
          padding: 48,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#0b0c0d", fontSize: 22, fontWeight: 800 }}>
              HR
            </span>
          </div>
          <div>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em" }}>
              kube-triage replay
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#f59e0b" }}>
              {trace.fault}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24, fontSize: 14, color: "#93979d" }}>
          {isSampleLabel} · {trace.id} · {trace.date} · {trace.model}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Frame {stepIndex + 1} of {trace.clusterTimeline.length}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 16,
            }}
          >
            {pods}
          </div>
        </div>

        {currentStep && (
          <div
            style={{
              borderTop: "1px solid #1f2224",
              paddingTop: 16,
              fontSize: 14,
              color: "#93979d",
            }}
          >
            <div style={{ marginBottom: 4, color: "#eef0f1" }}>
              {currentStep.tool} {currentStep.args}
            </div>
            <div
              style={{
                background: "#121416",
                padding: 8,
                borderRadius: 4,
                maxWidth: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentStep.output}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, fontSize: 12, color: "#6b7280" }}>
          Break-It replay · permalink: /projects/kube-triage/replay/{trace.id}/{stepIndex}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
