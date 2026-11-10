"use client";

import { facts } from "@/data/facts";

export function AboutSection() {
  return (
    <section id="about" className="section relative">
      <div className="section-header mb-8">
        <h2>About</h2>
        <p>Who I am and what drives me.</p>
      </div>
      <div className="glass p-8 md:p-12 rounded-2xl section-card">
        <div className="max-w-3xl">
          <p className="text-lg text-muted/90 leading-relaxed mb-6 font-inter text-center">
            {facts.bio}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl border border-border/60 bg-black/30 stat-card">
              <span className="block text-2xl font-display font-bold text-accent stat-number mb-1">Bahria University</span>
              <span className="text-xs text-muted/70 font-mono">BS Information Technology</span>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-black/30 stat-card">
              <span className="block text-2xl font-display font-bold text-accent stat-number mb-1">January 2027</span>
              <span className="text-xs text-muted/70 font-mono">Graduation</span>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-black/30 stat-card">
              <span className="block text-2xl font-display font-bold text-accent stat-number mb-1">Islamabad</span>
              <span className="text-xs text-muted/70 font-mono">Based in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
