"use client";

import { facts } from "@/data/facts";

export function SkillsSection() {
  return (
    <section id="skills" className="section relative">
      <div className="section-header mb-8">
        <h2>Technical Stack</h2>
        <p>Tools, languages, and systems I work with.</p>
      </div>
      <div className="glass p-8 md:p-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.skills.map((group) => (
            <div key={group.area} className="p-6 rounded-xl border border-border/60 bg-black/30 group hover:border-accent/50 transition-colors">
              <h4 className="font-display font-bold text-sm text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {group.area}
              </h4>
              <ul className="space-y-2 text-sm text-muted/80 leading-relaxed">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 group-hover:text-foreground transition-colors font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-border/50 group-hover:bg-accent transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}