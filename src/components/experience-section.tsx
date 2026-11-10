 "use client";

import { GlassPanel } from "@/components/glass-panel";
import { facts } from "@/data/facts";

export function ExperienceSection() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="section-header mb-12">
        <h2 className="text-heading text-foreground mb-2">Experience</h2>
        <p className="text-subhead text-muted/70">Professional journey and what I&apos;ve shipped.</p>
      </div>

      <GlassPanel variant="lg" className="max-w-5xl mx-auto relative overflow-hidden z-10">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[58px] top-0 bottom-0 w-[2px] bg-border/50" />

          {facts.experience.map((exp, i) => (
            <article
              key={exp.employer}
              className="relative pl-20 pr-8 py-8 mb-8"
            >
              {/* Timeline node dot */}
              <div className="absolute left-[53px] top-[16px] w-4 h-4 rounded-full bg-accent border-2 border-surface-background shadow-[0_0_10px_rgba(0,242,255,0.6)]" />

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-3">
                <div className="flex-1">
                  <span className="block text-label text-muted uppercase tracking-wider mb-1">
                    {exp.employer}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{exp.role}</h3>
                  <span className="block text-label text-accent font-mono">
                    {exp.period}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-body text-muted/90 leading-relaxed mb-6">
                {exp.description.map((d) => (
                  <li key={d} className="flex items-start gap-2 relative pl-2">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              { (exp as { attribution?: string }).attribution && (
                <p className="text-body text-muted/60 font-mono italic leading-relaxed border-l-2 border-accent/30 pl-4 py-2 bg-accent/5 rounded-r">
                  { (exp as { attribution?: string }).attribution }
                </p>
              )}
            </article>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}
