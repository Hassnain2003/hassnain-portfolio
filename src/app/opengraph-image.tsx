import { ImageResponse } from "next/og";

export default async function OgImage(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0b0c0d",
          color: "#eef0f1",
          fontFamily:
            'var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
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
            <span
              style={{
                color: "#0b0c0d",
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              HR
            </span>
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Hassnain Abbas
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
          AI &amp; Backend Engineer
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#93979d",
            maxWidth: 860,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          LLM agents and the infrastructure they run on &middot; available full-time from 4 January 2027
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
