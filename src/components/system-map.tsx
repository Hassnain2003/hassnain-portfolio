"use client";

import { useEffect, useRef, useState } from "react";
import { facts } from "@/data/facts";
import Link from "next/link";

type ThemeKey = "agents" | "infrastructure" | "full-stack";

const THEMES: Record<string, { label: string; color: string }> = {
  agents: { label: "Agents & LLM systems", color: "#ffb000" },
  infrastructure: { label: "Infrastructure & platform", color: "#3b82f6" },
  "full-stack": { label: "Full-stack applications", color: "#00ff41" },
};

const NODE_POSITIONS: Record<string, { x: number; y: number; theme: ThemeKey }> = {
  AgentDine: { x: 180, y: 160, theme: "agents" },
  "kube-triage": { x: 520, y: 100, theme: "infrastructure" },
  "OpenAI LLM Gateway": { x: 350, y: 220, theme: "agents" },
  "Algorithmic trading engine": { x: 140, y: 340, theme: "full-stack" },
  "D&Z Cartique": { x: 430, y: 360, theme: "full-stack" },
  QLSS: { x: 300, y: 300, theme: "infrastructure" },
};

const EDGES: [string, string][] = [
  ["AgentDine", "OpenAI LLM Gateway"],
  ["kube-triage", "OpenAI LLM Gateway"],
  ["kube-triage", "QLSS"],
  ["Algorithmic trading engine", "QLSS"],
  ["D&Z Cartique", "QLSS"],
];

function projectTheme(name: string): ThemeKey {
  return NODE_POSITIONS[name]?.theme || "infrastructure";
}

interface Node {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number;
  fy: number;
  theme: ThemeKey;
  radius: number;
  hovered: boolean;
  selected: boolean;
  ping: number; // 0-1 ping animation
}

export function SystemMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Map<string, Node>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: 700, height: 450 };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodes = new Map<string, Node>();
    facts.projects.forEach((p) => {
      const pos = NODE_POSITIONS[p.name];
      nodes.set(p.name, {
        name: p.name,
        x: pos.x,
        y: pos.y,
        vx: 0,
        vy: 0,
        fx: pos.x,
        fy: pos.y,
        theme: projectTheme(p.name),
        radius: 12,
        hovered: false,
        selected: false,
        ping: 0,
      });
    });
    nodesRef.current = nodes;

    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    const handleMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const handleLeave = () => { mouseActive = false; };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let hit = false;
      nodes.forEach((n) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        if (dx * dx + dy * dy < n.radius * n.radius * 4) {
          setSelected(selected === n.name ? null : n.name);
          n.ping = 1;
          hit = true;
        }
      });
      if (!hit) setSelected(null);
    };

    const handleHover = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let hoverName: string | null = null;
      nodes.forEach((n) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        n.hovered = dx * dx + dy * dy < n.radius * n.radius * 2.25;
        if (n.hovered) hoverName = n.name;
      });
      setHovered(hoverName);
      canvas.style.cursor = hoverName ? "pointer" : "default";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("mousemove", handleHover);
    canvas.addEventListener("click", handleClick);

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear with slight trail
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Ambient mouse glow
      if (mouseActive) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
        grad.addColorStop(0, "rgba(0, 255, 65, 0.04)");
        grad.addColorStop(1, "rgba(0, 255, 65, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw edges
      nodes.forEach((n) => {
        const themeColor = THEMES[n.theme].color;
        EDGES.forEach(([a, b]) => {
          if (a !== n.name && b !== n.name) return;
          const other = a === n.name ? b : a;
          const on = nodes.get(other);
          if (!on) return;

          const isActive = (hovered === n.name || selected === n.name) && (hovered === other || selected === other);
          const dx = on.x - n.x;
          const dy = on.y - n.y;

          // Control point for curve
          const cx = (n.x + on.x) / 2 - dy * 0.25;
          const cy = (n.y + on.y) / 2 + dx * 0.25;

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.quadraticCurveTo(cx, cy, on.x, on.y);
          ctx.strokeStyle = isActive ? themeColor : "rgba(26, 26, 26, 0.35)";
          ctx.lineWidth = isActive ? 2 : 1;
          ctx.setLineDash(isActive ? [] : [6, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineWidth = 1;

          if (isActive) {
            ctx.shadowColor = themeColor;
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      });

      // Draw nodes
      nodes.forEach((n) => {
        const themeColor = THEMES[n.theme].color;
        const scale = n.selected ? 1.25 : n.hovered ? 1.1 : 1;
        const r = n.radius * scale;

        // Ping ring
        if (n.ping > 0) {
          const pingR = r + (1 - n.ping) * 40;
          const pingAlpha = n.ping * 0.4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pingR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${themeColor === "#00ff41" ? "0,255,65" : themeColor === "#ffb000" ? "255,176,0" : "59,130,246"}, ${pingAlpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          n.ping -= 0.02;
          if (n.ping < 0) n.ping = 0;
        }

        // Glow
        if (n.selected || n.hovered) {
          ctx.shadowColor = themeColor;
          ctx.shadowBlur = 16;
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = themeColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner dark circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "#050505";
        ctx.fill();

        // Label
        ctx.fillStyle = "#050505";
        ctx.font = "700 8px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = n.name.split(" ").map((w) => w[0]).join("");
        ctx.fillText(label, n.x, n.y + 2);

        // Selection ring
        if (n.selected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = themeColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Physics: spring to position + mouse repulsion
      nodes.forEach((n) => {
        // Spring to home
        const dx = n.fx - n.x;
        const dy = n.fy - n.y;
        n.vx += dx * 0.05;
        n.vy += dy * 0.05;

        // Mouse repulsion
        if (mouseActive) {
          const mdx = n.x - mouseX;
          const mdy = n.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150 && mdist > 0) {
            const force = (150 - mdist) / 150;
            n.vx += (mdx / mdist) * force * 0.5;
            n.vy += (mdy / mdist) * force * 0.5;
          }
        }

        // Damping
        n.vx *= 0.92;
        n.vy *= 0.92;
        n.x += n.vx;
        n.y += n.vy;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("mousemove", handleHover);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animRef.current);
    };
  }, [selected, hovered, setSelected]);

  const project = selected ? facts.projects.find((p) => p.name === selected) : null;
  const theme = project ? THEMES[projectTheme(project.name)] : null;

  return (
    <section
      id="system-map"
      className="print-break relative"
      aria-label="Project system map"
    >
      <div
        className="relative w-full h-[640px] bg-[#050505] border border-solid border-border rounded-lg overflow-hidden group"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Project constellation"
        />

        {/* Selected project detail overlay */}
        {selected && project && theme && (
          <div
            className="absolute top-4 right-4 w-[320px] bg-[#0a0a0a] border border-solid border-border rounded-lg p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-in"
            style={{ animation: "slideIn 0.3s ease-out" }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 h-6 w-6 rounded border border-solid border-current/30 flex items-center justify-center text-xs font-mono text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close detail"
            >
              <span className="sr-only">close</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
              <span className="text-xs font-mono font-bold text-foreground uppercase tracking-tighter">
                {theme.label}
              </span>
            </div>
            <h3 className="font-inter font-bold text-lg text-foreground mb-2 tracking-tight">
              {project.name}
            </h3>
            <p className="text-xs font-mono text-muted leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded border border-solid border-border/40 bg-[#050505]/50 text-[10px] font-mono text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.name.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-[10px] font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Open case study
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
