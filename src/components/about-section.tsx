"use client";

import { facts } from "@/data/facts";

export function AboutSection() {
  return (
    <section id="about" className="section relative">
      <div className="section-header mb-8">
        <h2>About</h2>
        <p>Who I am and what drives me.</p>
      </div>
      <div className="glass p-8 md:p-16 rounded-2xl section-card">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-lg md:text-xl text-muted/90 leading-relaxed mb-8 font-inter text-center mx-auto"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #00f2ff 50%, #bc13fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(0, 242, 255, 0.3))",
            }}
          >
            {facts.bio}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl border border-border/60 bg-black/30 stat-card group">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <span className="text-accent font-display font-bold text-lg">🎓</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-1">Bahria University</span>
              <span className="text-xs text-muted/70 font-mono">BS Information Technology</span>
            </div>
            <div className="p-6 rounded-xl border border-border/60 bg-black/30 stat-card group">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <span className="text-accent font-display font-bold text-lg">📅</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-1">January 2027</span>
              <span className="text-xs text-muted/70 font-mono">Graduation</span>
            </div>
            <div className="p-6 rounded-xl border border-border/60 bg-black/30 stat-card group">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <span className="text-accent font-display font-bold text-lg">📍</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-1">Islamabad</span>
              <span className="text-xs text-muted/70 font-mono">Based in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
