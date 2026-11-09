"use client";

import { useEffect, useState } from "react";

export function ClusterVisual() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  const nodes = [
    { id: "api", label: "api", x: 240, y: 120, type: "service" as const },
    { id: "worker", label: "worker", x: 360, y: 120, type: "service" as const },
    { id: "db", label: "db", x: 300, y: 220, type: "pod" as const },
    { id: "redis", label: "redis", x: 180, y: 220, type: "pod" as const },
    { id: "mq", label: "mq", x: 420, y: 220, type: "pod" as const },
  ];

  const edges = [
    { from: "api", to: "worker" },
    { from: "api", to: "db" },
    { from: "worker", to: "db" },
    { from: "worker", to: "redis" },
    { from: "worker", to: "mq" },
  ];

  return (
    <section aria-label="System cluster visual" className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-4">
        <h2 className="font-mono font-semibold text-foreground">Cluster</h2>
        <p className="text-xs font-mono text-muted">
          Healthy state — all nodes green. SVG diagram, reduced-motion safe.
        </p>
      </div>
      <div className="relative w-full aspect-[4/3] bg-panel border border-solid border-border rounded-lg overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 480 320"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Cluster diagram"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth={8}
              markerHeight={8}
              refX={6}
              refY={3}
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#93979d" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={2} result="blur" />
              <feComposite
                in="SourceGraphic"
                in2="blur"
                operator="over"
              />
            </filter>
          </defs>
          {edges.map((e) => {
            const src = nodes.find((n) => n.id === e.from);
            const dst = nodes.find((n) => n.id === e.to);
            if (!src || !dst) return null;
            return (
              <line
                key={e.from + e.to}
                x1={src.x}
                y1={src.y}
                x2={dst.x}
                y2={dst.y}
                stroke="#1f2224"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
            );
          })}
          {nodes.map((n) => {
            const isPod = n.type === "pod";
            const pulseClass = reducedMotion ? "" : "pulse";
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isPod ? 14 : 10}
                  fill="#10b981"
                  className={
                    pulseClass +
                    (isPod
                      ? " ring ring-offset-2 ring-offset-background ring-2 ring-current/30"
                      : "")
                  }
                  filter={isPod ? "url(#glow)" : undefined}
                />
                <text
                  x={n.x}
                  y={n.y + (isPod ? 4 : 0)}
                  fontSize={isPod ? 10 : 8}
                  fontFamily="'JetBrains Mono', monospace"
                  fill="#0b0c0d"
                  textAnchor="middle"
                  fontWeight={600}
                  pointerEvents="none"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
