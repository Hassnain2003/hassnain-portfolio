"use client";

import Link from "next/link";
import { useState } from "react";
import { facts } from "@/data/facts";

type ProjectTheme = "agents" | "infrastructure" | "full-stack";

const THEMES: Record<string, { label: string; color: string; projects: string[] }> = {
  agents: {
    label: "Agents & LLM systems",
    color: "#f59e0b",
    projects: ["AgentDine", "kube-triage", "OpenAI LLM Gateway"],
  },
  infrastructure: {
    label: "Infrastructure & platform",
    color: "#3b82f6",
    projects: ["kube-triage", "OpenAI LLM Gateway"],
  },
  "full-stack": {
    label: "Full-stack applications",
    color: "#10b981",
    projects: ["D&Z Cartique", "QLSS", "Algorithmic trading engine"],
  },
};

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  AgentDine: { x: 160, y: 100 },
  "kube-triage": { x: 340, y: 60 },
  "OpenAI LLM Gateway": { x: 520, y: 100 },
  "Algorithmic trading engine": { x: 160, y: 260 },
  "D&Z Cartique": { x: 340, y: 260 },
  QLSS: { x: 520, y: 260 },
};

function projectTheme(name: string): ProjectTheme {
  if (name === "AgentDine" || name === "kube-triage" || name === "OpenAI LLM Gateway")
    return "agents";
  if (name === "D&Z Cartique" || name === "QLSS" || name === "Algorithmic trading engine")
    return "full-stack";
  return "infrastructure";
}

export function SystemMap() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      id="system-map"
      className="section print-break"
      aria-label="System map of projects"
    >
      <div className="section-header">
        <h2>System map</h2>
        <p>Six projects grouped by theme. Click a node to open its card or case study.</p>
      </div>

      <div className="relative w-full h-[560px] bg-panel border border-solid border-border rounded-lg overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 700 400"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Project system map"
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
              <path d="M0,0 L0,6 L6,3 z" fill="#737373" />
            </marker>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="40" y="20" width="260" height="340" fill="#f59e0b" opacity={0.06} rx="12" />
          <rect x="300" y="20" width="360" height="340" fill="#3b82f6" opacity={0.06} rx="12" />

          <text x="170" y="40" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="#f59e0b" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">
            Agents & LLM systems
          </text>
          <text x="480" y="40" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill="#3b82f6" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">
            Infrastructure & full-stack
          </text>

          {facts.projects.map((p) => {
            const pos = NODE_POSITIONS[p.name];
            const theme = projectTheme(p.name);
            const isSelected = selected === p.name;
            return (
              <g
                key={p.name}
                onClick={() => setSelected(selected === p.name ? null : p.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(selected === p.name ? null : p.name);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.name} case study`}
                style={{
                  outline: isSelected ? "2px solid #f59e0b" : "2px solid transparent",
                  outlineOffset: "2px",
                  cursor: "pointer",
                }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={20}
                  fill={THEMES[theme].color}
                  style={{
                    transition: "r 0.2s ease, opacity 0.2s ease, filter 0.2s ease",
                    filter: isSelected ? "url(#nodeGlow)" : "none",
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  fill="#030303"
                  textAnchor="middle"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {selected && (
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h3 className="font-inter font-semibold text-foreground text-xl">
                {selected}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${
                  projectTheme(selected) === "agents"
                    ? "bg-f59e0b/10 text-f59e0b border border-solid border-f59e0b/20"
                    : projectTheme(selected) === "infrastructure"
                    ? "bg-3b82f6/10 text-3b82f6 border border-solid border-3b82f6/20"
                    : "bg-10b981/10 text-10b981 border border-solid border-10b981/20"
                }`}
              >
                {THEMES[projectTheme(selected)].label}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs font-mono text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close selection"
            >
              <span className="sr-only">close</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm font-mono text-muted leading-relaxed mb-4">
            {facts.projects.find((p) => p.name === selected)?.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {facts.projects.find((p) => p.name === selected)?.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded border border-solid border-border/40 bg-panel/50 text-xs font-mono text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href={`/projects/${selected.toLowerCase().replace(/ /g, "-")}`}
              className="btn btn-outline btn-sm"
            >
              Case study
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
