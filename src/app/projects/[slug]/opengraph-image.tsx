import { ImageResponse } from "next/og";
import { caseStudies } from "@/data/case-studies";

export const config = {
  runtime: "edge",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
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
            Case study not found
          </h1>
          <p style={{ fontSize: 18, color: "#93979d" }}>{slug}</p>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const isSample = study.links.code === undefined;

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
              {study.name}
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#f59e0b" }}>
              Case study
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24, fontSize: 14, color: "#93979d", maxWidth: 900 }}>
          {study.problem}
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
            Key decisions
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 15,
              color: "#eef0f1",
            }}
          >
            {study.decisions.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span style={{ color: "#f59e0b", fontWeight: "800" }}>{i + 1}.</span>
                <span style={{ maxWidth: 900 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, fontSize: 12, color: "#6b7280" }}>
          Break-It portfolio · {isSample ? "Illustrative sample" : "Real project"} ·
          Permalink: /projects/{study.slug}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
