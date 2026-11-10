"use client";

import { facts } from "@/data/facts";

export function ExperienceSection() {
  return (
    <section id="experience" className="section relative">
      <div className="section-header mb-8">
        <h2>Experience</h2>
        <p>Professional journey and what I&apos;ve shipped.</p>
      </div>
      <div className="glass p-8 md:p-12 rounded-2xl section-card">
        <div className="space-y-6">
          {facts.experience.map((exp) => (
            <article key={exp.employer} className="border-l-2 border-l-accent pl-6 py-4 experience-item">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">{exp.role}</h3>
                  <p className="text-sm text-muted/80 font-mono">{exp.employer}</p>
                </div>
                <div className="flex gap-3">
                  <span className="px-3 py-1 rounded border border-border/60 text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                    {exp.period}
                  </span>
                  {exp.location && (
                    <span className="px-3 py-1 rounded border border-border/60 text-[10px] font-mono text-muted/70">
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted/80 leading-relaxed">
                {exp.description.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="list-dot mt-1.5" />
                    {d}
                  </li>
                ))}
              </ul>
              { (exp as { attribution?: string }).attribution && (
                <p className="mt-3 text-xs text-muted/60 font-mono italic">
                  {(exp as { attribution?: string }).attribution}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
