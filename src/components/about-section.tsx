"use client";

import { GlassPanel } from "@/components/glass-panel";
import { facts } from "@/data/facts";

export function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="section-header mb-10">
        <h2 className="text-heading text-foreground mb-2">About</h2>
        <p className="text-subhead text-muted/70">Who I am and what drives me.</p>
      </div>

      <GlassPanel variant="lg" className="max-w-5xl mx-auto relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
        <p
          className="text-body text-muted/90 leading-relaxed mb-6 text-center mx-auto relative z-10"
          style={{
            background: "linear-gradient(135deg, #fff 0%, var(--color-primary) 40%, var(--color-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px rgba(0, 242, 255, 0.25))",
          }}
        >
          {facts.bio}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">🎓</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">Bahria University</span>
            <span className="text-caption text-muted/70 font-mono uppercase">BS Information Technology</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent-2/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">📅</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">January 2027</span>
            <span className="text-caption text-muted/70 font-mono uppercase">Graduation</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">📍</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">Islamabad</span>
            <span className="text-caption text-muted/70 font-mono uppercase">Based in</span>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
