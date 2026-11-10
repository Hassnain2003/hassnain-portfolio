"use client";

import { facts } from "@/data/facts";

export function Hero3D() {
  const contactBtn = (href: string, label: string) => (
    <a
      href={href}
      className="btn btn-primary"
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
    >
      {label}
    </a>
  );

  return (
    <section id="hero" className="section pt-20 pb-32 border-b-0 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-2/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-start gap-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[10px] font-bold">HA</span>
          </div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-foreground leading-tight mb-4">
          Hassnain<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-2 to-white"> Abbas</span>
        </h1>

        <div className="relative max-w-xl">
          <canvas
            className="w-full h-96 md:h-[400px] rounded-2xl border border-border/50 bg-black/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          />
        </div>

        <p className="mt-6 text-lg text-muted max-w-2xl font-inter leading-relaxed">
          I build LLM agents and the infrastructure they run on — LangGraph, MCP,
          Kubernetes, rate-limited gateways, and fault-injection tested systems.
          Final-year BS IT student at Bahria University Islamabad, graduating
          January 2027.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {contactBtn(facts.links.resume || "#resume", "Resume")}
          {contactBtn(facts.links.github, "GitHub")}
          {contactBtn(facts.links.linkedin, "LinkedIn")}
          {contactBtn(`mailto:${facts.links.email}`, "Email")}
        </div>
      </div>
    </section>
  );
}
