"use client";

import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import { facts } from "@/data/facts";

type ProjectTheme = "agents" | "infrastructure" | "full-stack";

const THEMES: Record<string, { label: string; color: string; glow: string }> = {
  agents: {
    label: "Agents & LLM systems",
    color: "#f59e0b",
    glow: "0 0 20px rgba(245, 158, 11, 0.4)",
  },
  infrastructure: {
    label: "Infrastructure & platform",
    color: "#3b82f6",
    glow: "0 0 20px rgba(59, 130, 246, 0.4)",
  },
  "full-stack": {
    label: "Full-stack applications",
    color: "#10b981",
    glow: "0 0 20px rgba(16, 185, 129, 0.4)",
  },
};

// Creative constellation layout — nodes scattered like a solar system
const NODE_POSITIONS: Record<string, { x: number; y: number; theme: ProjectTheme }> = {
  AgentDine: { x: 180, y: 140, theme: "agents" },
  "kube-triage": { x: 520, y: 90, theme: "infrastructure" },
  "OpenAI LLM Gateway": { x: 340, y: 200, theme: "agents" },
  "Algorithmic trading engine": { x: 120, y: 320, theme: "full-stack" },
  "D&Z Cartique": { x: 420, y: 340, theme: "full-stack" },
  QLSS: { x: 280, y: 300, theme: "infrastructure" },
};

// Confirmed relationships only — edges between related projects
const EDGES: [string, string][] = [
  ["AgentDine", "OpenAI LLM Gateway"],
  ["kube-triage", "OpenAI LLM Gateway"],
  ["kube-triage", "QLSS"],
  ["Algorithmic trading engine", "QLSS"],
  ["D&Z Cartique", "QLSS"],
];

function projectTheme(name: string): ProjectTheme {
  return NODE_POSITIONS[name]?.theme || "infrastructure";
}

export function SystemMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isConnected = useCallback(
    (a: string, b: string) =>
      EDGES.some(
        (e) =>
          (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a)
      ),
    []
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      containerRef.current.style.setProperty("--mouse-x", String(x));
      containerRef.current.style.setProperty("--mouse-y", String(y));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const project = selected ? facts.projects.find((p) => p.name === selected) : null;
  const connectedNodes = project
    ? EDGES.flatMap((e) =>
        e[0] === selected ? [e[1]] : e[1] === selected ? [e[0]] : []
      )
    : [];

  return (
    <section
      id="system-map"
      className="section print-break relative"
      aria-label="Project system map"
    >
      <div className="section-header">
        <h2>System map</h2>
        <p>
          Six projects wired as a live constellation. Hover a node to trace its
          links; click to open its case study.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[640px] bg-panel border border-solid border-border rounded-xl overflow-hidden group"
      >
        {/* Background ambient glow following mouse */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245, 158, 11, 0.03), transparent 60%)`,
          }}
        />

        {/* Decorative orbit rings */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-solid border-border/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-solid border-border/20 animate-[spin_30s_linear_infinite reverse]" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 700 450"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Project constellation"
        >
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#030303" />
              <stop offset="100%" stopColor="#090909" />
            </linearGradient>
          </defs>
          <rect width="700" height="450" fill="url(#meshGradient)" />

          {/* Edges — drawn first so they sit behind nodes */}
          {EDGES.map(([a, b], i) => {
            const pa = NODE_POSITIONS[a];
            const pb = NODE_POSITIONS[b];
            const aActive = hovered === a || selected === a;
            const bActive = hovered === b || selected === b;
            const edgeActive = aActive && bActive;
            const ta = THEMES[pa.theme];
            const tb = THEMES[pb.theme];
            return (
              <path
                key={`e-${i}`}
                d={`M${pa.x},${pa.y} Q${(pa.x + pb.x) / 2},${(pa.y + pb.y) / 2 - 40} ${pb.x},${pb.y}`}
                fill="none"
                stroke={
                  edgeActive
                    ? ta.color
                    : "rgba(20, 20, 20, 0.35)"
                }
                strokeWidth={edgeActive ? 2.5 : 1}
                strokeDasharray={edgeActive ? "0" : "6 4"}
                className="transition-all duration-300"
                style={{
                  opacity: edgeActive ? 0.9 : 0.25,
                  filter: edgeActive ? `drop-shadow(0 0 8px ${ta.color})` : "none",
                }}
              />
            );
          })}

          {/* Nodes */}
          {facts.projects.map((p) => {
            const pos = NODE_POSITIONS[p.name];
            const theme = THEMES[projectTheme(p.name)];
            const isSelected = selected === p.name;
            const isHovered = hovered === p.name;
            const scale = isSelected ? 1.15 : isHovered ? 1.08 : 1;
            const nodeConnectedNodes = EDGES.flatMap((e) =>
              e[0] === p.name ? [e[1]] : e[1] === p.name ? [e[0]] : []
            );
            const isConnectedActive = nodeConnectedNodes.some(
              (n) => hovered === n || selected === n
            );

            return (
              <g
                key={p.name}
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setSelected(selected === p.name ? null : p.name)
                }
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
                  cursor: "pointer",
                  outline: isSelected
                    ? `2px solid ${theme.color}`
                    : "2px solid transparent",
                  outlineOffset: "3px",
                }}
              >
                {/* Connection pulse ring when related node active */}
                {isConnectedActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={34}
                    fill="none"
                    stroke={theme.color}
                    strokeWidth={1.5}
                    opacity={0.35}
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 24 : 18}
                  fill={theme.color}
                  style={{
                    transition:
                      "r 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
                    filter:
                      isSelected || isHovered
                        ? `url(#nodeGlow) drop-shadow(0 0 12px ${theme.color})`
                        : "none",
                    transform: `scale(${scale})`,
                    transformOrigin: "center",
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  fontSize="8"
                  fontFamily="'JetBrains Mono', monospace"
                  fill="#030303"
                  textAnchor="middle"
                  fontWeight="700"
                  pointerEvents="none"
                  className="leading-tight"
                >
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected project detail card — slides in from right */}
      {selected && project && (
        <div
          className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col h-full"
          style={{ transform: `translateX(${selected ? 0 : "100%"})` }}
        >
          <div className="h-full bg-panel border-l border-solid border-border overflow-y-auto">
            <div className="p-6 border-b border-solid border-border flex flex-col gap-3">
              <button
                onClick={() => setSelected(null)}
                className="h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs font-mono text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent absolute top-6 right-6"
                aria-label="Close system map detail"
              >
                <span className="sr-only">close</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
                <div>
                  <h3 className="font-inter font-bold text-2xl text-foreground tracking-tight">
                    {project.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${
                      projectTheme(project.name) === "agents"
                        ? "bg-f59e0b/10 text-f59e0b border border-solid border-f59e0b/20"
                        : projectTheme(project.name) === "infrastructure"
                        ? "bg-3b82f6/10 text-3b82f6 border border-solid border-3b82f6/20"
                        : "bg-10b981/10 text-10b981 border border-solid border-10b981/20"
                    }`}
                  >
                    {THEMES[projectTheme(project.name)].label}
                  </span>
                </div>
              </div>
              <p className="text-sm font-mono text-muted leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded border border-solid border-border/40 bg-panel/50 text-xs font-mono text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={`/projects/${project.name.toLowerCase().replace(/ /g, "-")}`}
                  className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Open case study
                </Link>
              </div>
            </div>
            <div className="p-6 flex items-center gap-3 text-xs font-mono text-muted border-t border-solid border-border/50">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEMES[projectTheme(project.name)].color }} />
              <span>{connectedNodes.length} connection{connectedNodes.length !== 1 ? "s" : ""}</span>
              <span className="w-px h-3 bg-border mx-2" aria-hidden="true" />
              <span>Click node to collapse</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
