 "use client";

import { facts } from "@/data/facts";

// Inline SVG icons for key tools. Falls back to a simple dot for anything without a custom icon.
const TECH_ICONS: Record<string, string> = {
  Python: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#3776AB" d="M16 3c-2.2 0-4.3 0.6-6 1.7l-1.3 1.1c0.4-0.9 1.1-1.5 1.9-1.5h2c1.1 0 2 0.9 2 2v2c0 1.1-0.9 2-2 2h-1v2h1c1.1 0 2 0.9 2 2s-0.9 2-2 2h-2c-1.1 0-2-0.9-2-2v-1h-1c-1.1 0-2-0.9-2-2v-2c0-1.1 0.9-2 2-2h1v-2h-1c-1.1 0-2-0.9-2-2V7c0-2.2 1.7-4 4-4s4 1.8 4 4z"/><path fill="#FFD43B" d="M16 3c-0.2 0-0.4 0-0.6 0.1l-1.1 1c0.5-0.9 1.6-1.5 2.7-1.5h1c1.5 0 2.7 1.2 2.7 2.7v2.7c0 1.5-1.2 2.7-2.7 2.7h-1l1.1 1c0.1 0 0.2 0 0.3 0.1V7c0-2.8-2.2-5-5-5z"/><path fill="#3776AB" d="M24 16c0-1.1-0.9-2-2-2h-2c-1.1 0-2 0.9-2 2v2c0 1.1 0.9 2 2 2h2c1.1 0 2-0.9 2-2z"/><path fill="#FFD43B" d="M22 14h-2c-1.1 0-2 0.9-2 2v2c0 1.1 0.9 2 2 2h2c1.1 0 2-0.9 2-2v-2c0-1.1-0.9-2-2-2z"/><path fill="#3776AB" d="M16 21c-2.2 0-4-1.8-4-4v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2c0 2.2-1.8 4-4 4z"/><path fill="#FFD43B" d="M24 21c0-0.2 0-0.4-0.1-0.6l-1-1.1c-0.1-0.5-0.7-0.8-1.2-0.8h-2.7c-0.5 0-0.9 0.4-1 0.9l-1 1.1c-0.1 0.5-0.1 1 0 1.5 0.1 0.5 0.5 0.9 1 0.9h2.7c0.2 0 0.4-0.1 0.6-0.1V21z"/><path fill="#3776AB" d="M8 16c0-1.1 0.9-2 2-2h2c1.1 0 2 0.9 2 2v2c0 1.1-0.9 2-2 2h-2c-1.1 0-2-0.9-2-2z"/><path fill="#FFD43B" d="M10 14h2c1.1 0 2-0.9 2-2v-2c0-1.1-0.9-2-2-2h-2c-1.1 0-2 0.9-2 2v2c0 1.1 0.9 2 2 2z"/></svg>`,
  TypeScript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#3178C6" d="M2 30h28l-8-14-8 14z"/><path fill="#A277BA" d="M2 16l6-6 6 6 6-6 6 6-14 0z"/><path fill="#3178C6" d="M4 28l12-12 12 12-4 2-8-14-8 14z"/></svg>`,
  JavaScript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#F7DF1E" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2L10 13.2c-0.6-0.6-1-1.4-1-2.3 0-1.6 1-2.7 2.7-2.7 0.8 0 1.3 0.4 1.6 1L16 3.8l2-2.4c0.3-0.6 0.8-1 1.6-1 1.6 0 2.7 1.1 2.7 2.7 0 0.9-0.4 1.7-1 2.3l1.6 1.6c1-1.1 1.6-2.5 1.6-4.2C22 4 19.3 2 16 2z"/><path fill="#F7DF1E" d="M2 14h2v14h-2z"/><path fill="#F7DF1E" d="M14 30h2v-14h-2z"/><path fill="#F7DF1E" d="M10 14h12v2H10z"/><path fill="#F7DF1E" d="M10 26h12v2H10z"/></svg>`,
  Kubernetes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#326CE5" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l-1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C10 4 7.3 2 4 2S2 4 2 6c0 2.2 1.8 4 4 4h1v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h1c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#326CE5" d="M24 6c0-2.2-1.8-4-4-4h-1v2c0 1.1-0.9 2-2 2s-2-0.9-2-2v-1h-2c-1.1 0-2 0.9-2 2v1h-2c-1.1 0-2-0.9-2-2v-2c0-2.2-1.8-4-4-4S4 4 4 6c0 2.2 1.8 4 4 4h1v-2c0-1.1 0.9-2 2-2s2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h2c1.1 0 2-0.9 2-2v2c0 2.2 1.8 4 4 4z"/><path fill="#326CE5" d="M16 26c-3.3 0-6-2-6-5.4 0-1.7-0.6-3.1-1.6-4.2l1.6-1.6c1 1.1 1.6 2.5 1.6 4.2C18 28 20.7 30 24 30s4-2 4-4c0-2.2-1.8-4-4-4h-1v-2c0-1.1-0.9-2-2-2s-2 0.9-2 2v1h-2c-1.1 0-2 0.9-2 2v1h1c1.1 0 2 0.9 2 2v2c0 2.2 1.8 4 4 4z"/></svg>`,
  Docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#0DB9ED" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C12 4 9.3 2 6 2S2 4 2 6c0 2.2 1.8 4 4 4h2v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h2c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#0DB9ED" d="M16 26c-3.3 0-6-2-6-5.4 0-1.7-0.6-3.1-1.6-4.2l-1.6-1.6c1 1.1 1.6 2.5 1.6 4.2C10 28 12.7 30 16 30s6-2 6-4c0-2.2-1.8-4-4-4z"/><path fill="#0DB9ED" d="M16 10h-2c-1.1 0-2 0.9-2 2v2c0 1.1 0.9 2 2 2h2c1.1 0 2-0.9 2-2v-2c0-1.1-0.9-2-2-2z"/><path fill="#0DB9ED" d="M16 22h-2c-1.1 0-2 0.9-2 2v2c0 1.1 0.9 2 2 2h2c1.1 0 2-0.9 2-2v-2c0-1.1-0.9-2-2-2z"/></svg>`,
  React: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#61DAFB" d="M16 2c-4.4 0-8 3-8 8 0 1.9 0.7 3.6 1.8 5l-2.6 2.6C4.7 19.2 2 21.4 2 24c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4 0-2.6-2.7-4.8-5.4-2l-2.6-2.6c1.1-1.4 1.8-3.1 1.8-5 0-4.9-3.6-8-8-8z"/><path fill="#61DAFB" d="M6 18c0-1.1 0.9-2 2-2s2 0.9 2 2v2c0 1.1-0.9 2-2 2s-2-0.9-2-2z"/><path fill="#61DAFB" d="M10 14h2v4h-2z"/><path fill="#61DAFB" d="M22 18c0-1.1-0.9-2-2-2s-2 0.9-2 2v2c0 1.1 0.9 2 2 2s2-0.9 2-2z"/><path fill="#61DAFB" d="M22 14h2v4h-2z"/></svg>`,
  Terraform: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#7B42BC" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C12 4 9.3 2 6 2S2 4 2 6c0 2.2 1.8 4 4 4h2v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h2c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#584592" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C12 4 9.3 2 6 2S2 4 2 6c0 2.2 1.8 4 4 4h2v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h2c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#000" d="M16 26c-3.3 0-6-2-6-5.4 0-1.7-0.6-3.1-1.6-4.2l-1.6-1.6c1 1.1 1.6 2.5 1.6 4.2C10 28 12.7 30 16 30s6-2 6-4c0-2.2-1.8-4-4-4z"/><path fill="#584592" d="M16 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C12 4 9.3 2 6 2S2 4 2 6c0 2.2 1.8 4 4 4h2v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-1h2c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#000" d="M24 26c0-3.3-2-5.4-2-5.4 0-1.7-0.6-3.1-1.6-4.2l-1.6-1.6c1 1.1 1.6 2.5 1.6 4.2C20 28 22.7 30 26 30s4-2 4-4c0-2.2-1.8-4-4-4z"/><path fill="#584592" d="M24 2c-3.3 0-6 2-6 5.4 0 1.7 0.6 3.1 1.6 4.2l1.6 1.6c-1-1.1-1.6-2.5-1.6-4.2C20 4 17.3 2 14 2s-4 2-4 4c0 2.2 1.8 4 4 4h2v2c0 1.1 0.9 2 2 2s2-0.9 2-2v-1h2c1.1 0 2 0.9 2 2v1h2c1.1 0 2-0.9 2-2v-2c0-2.2-1.8-4-4-4z"/><path fill="#000" d="M24 26c0-3.3-2-5.4-2-5.4 0-1.7-0.6-3.1-1.6-4.2l-1.6-1.6c1 1.1 1.6 2.5 1.6 4.2C20 28 22.7 30 26 30s4-2 4-4c0-2.2-1.8-4-4-4z"/></svg>`,
};

const HIGHLIGHTED = new Set(["LangGraph", "MCP", "Kubernetes", "PostgreSQL", "React"]);

function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const svg = TECH_ICONS[name];
  if (svg) {
    return (
      <span
        className="inline-block"
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ width: size, height: size, display: "inline-block", verticalAlign: "middle" }}
      />
    );
  }
  return (
    <span className="inline-block w-3 h-3 rounded-full bg-accent/50 flex-shrink-0" />
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section relative overflow-hidden">
      <div className="section-header mb-8">
        <h2 className="text-heading text-foreground mb-2">Technical Stack</h2>
        <p className="text-subhead text-muted/70">Tools, languages, and systems I work with.</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-2xl section-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {facts.skills.map((group) => (
            <div key={group.area} className="p-6 rounded-xl border border-border/60 bg-black/30 skill-container group">
              <h4 className="font-display font-bold text-sm text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent skill-dot" />
                {group.area}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const isHighlighted = HIGHLIGHTED.has(item);
                  return (
                    <span
                      key={item}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-solid transition-all duration-200 ${
                        isHighlighted
                          ? "border-accent bg-accent/10 text-accent font-bold"
                          : "border-border/60 text-muted/70 bg-black/20 group-hover:border-accent/50 group-hover:bg-accent/5 group-hover:text-foreground"
                      }`}
                    >
                      <TechIcon name={item} size={isHighlighted ? 14 : 12} />
                      <span className={`text-xs font-mono ${isHighlighted ? "" : "font-medium"}`}>{item}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
