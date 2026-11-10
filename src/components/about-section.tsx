"use client";

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
        <h2>About</h2>
        <p>Who I am and what drives me.</p>
      </div>

      <div className="glass p-8 md:p-16 rounded-2xl section-card max-w-5xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"
          />
          <p
            className="text-lg md:text-xl text-muted/90 leading-relaxed mb-10 font-inter text-center mx-auto relative z-10"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #00f2ff 40%, #bc13fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 12px rgba(0, 242, 255, 0.25))",
            }}
          >
            {facts.bio}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 rounded-2xl border border-border/60 bg-black/40 backdrop-blur-sm stat-card group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <span className="text-accent font-display font-bold text-2xl">🎓</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-2">Bahria University</span>
              <span className="text-xs text-muted/70 font-mono uppercase tracking-wider">BS Information Technology</span>
            </div>
            <div className="p-8 rounded-2xl border border-border/60 bg-black/40 backdrop-blur-sm stat-card group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-accent-2/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <span className="text-accent font-display font-bold text-2xl">📅</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-2">January 2027</span>
              <span className="text-xs text-muted/70 font-mono uppercase tracking-wider">Graduation</span>
            </div>
            <div className="p-8 rounded-2xl border border-border/60 bg-black/40 backdrop-blur-sm stat-card group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <span className="text-accent font-display font-bold text-2xl">📍</span>
              </div>
              <span className="block text-xl font-display font-bold text-accent stat-number mb-2">Islamabad</span>
              <span className="text-xs text-muted/70 font-mono uppercase tracking-wider">Based in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
