import dynamic from "next/dynamic";
import { facts } from "@/data/facts";
import { CommandPalette } from "@/components/command-palette";
import { ProjectCard } from "@/components/project-card";
import { ChatWidget } from "@/components/chat-widget";
import { SystemMap } from "@/components/system-map";

import telemetryData from "@/data/telemetry.json";

const telemetry: { lighthouse?: string | null; bundleSize?: string | null; source?: string | null } | null =
  telemetryData;

const resumeHref = facts.links.resume || "#resume";

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

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="mx-auto max-w-6xl px-6 py-16 print-hidden">
        <div className="flex flex-col gap-3 print-break">
          <h1 className="font-inter font-bold text-5xl tracking-tight text-foreground sm:text-7xl md:text-8xl">
            {facts.name}
          </h1>
          <p className="font-mono text-lg text-muted">
            {facts.role}
          </p>
          <div className="flex items-center gap-2 text-sm font-mono text-muted">
            <span className="led led-ok" aria-hidden="true" />
            Available full-time from {facts.availability.split(" from ")[1]}
          </div>
          {telemetry && telemetry.lighthouse && (
            <p className="mt-3 text-xs font-mono text-muted">
              This site: {telemetry.lighthouse} ·{" "}
              {telemetry.bundleSize ? (
                <>
                  {telemetry.bundleSize} ·{" "}
                </>
              ) : null}
              <a
                href={telemetry.source || "#"}
                className="underline underline-offset-3 hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                source
              </a>
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 print-hidden">
          {contactBtn(resumeHref, "Resume")}
          {contactBtn(facts.links.github, "GitHub")}
          {contactBtn(facts.links.linkedin, "LinkedIn")}
          {contactBtn(`mailto:${facts.links.email}`, "Email")}
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-6 pb-24">
        <SystemMap />

        <section id="projects" className="section print-break">
          <div className="section-header">
            <h2>Projects</h2>
            <p>Built and shipped. Ordered as listed in facts.md.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>

        <section id="experience" className="section print-break">
          <div className="section-header">
            <h2>Experience</h2>
            <p>Roles and what I shipped.</p>
          </div>
          <div className="space-y-6">
            {facts.experience.map((exp) => (
              <article key={exp.employer} className="card border-b border-solid border-border pb-6 last:border-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-inter font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-mono text-muted">
                      {exp.employer} · {exp.period}
                      {exp.location && ` · ${exp.location}`}
                    </p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm font-mono text-muted">
                  {exp.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {(exp as { attribution?: string }).attribution && (
                  <p className="mt-2 text-xs font-mono text-accent/70">
                    {(exp as { attribution?: string }).attribution}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section print-break">
          <div className="section-header">
            <h2>Skills</h2>
            <p>Tools and technologies I work with.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facts.skills.map((group) => (
              <div key={group.area} className="card">
                <h3 className="font-inter font-semibold text-foreground mb-2">
                  {group.area}
                </h3>
                <p className="text-sm font-mono text-muted">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section print-break">
          <div className="section-header">
            <h2>About</h2>
            <p>Background and context.</p>
          </div>
          <div className="card">
            <p className="text-sm font-mono text-muted leading-relaxed">
              {facts.name} is a final-year BS Information Technology student at
              Bahria University Islamabad, graduating January 2027. Based in
              {facts.location}, available full-time from
              {facts.availability.split(" from ")[1]}. Builds AI agents and
              backend infrastructure — LangGraph, MCP, LangChain, Groq, PostgreSQL,
              Redis, Docker, Kubernetes, Terraform.
            </p>
            <p className="mt-4 text-sm font-mono text-muted leading-relaxed">
              Leadership:{" "}
              {facts.leadership
                .map((l) => `${l.role} at ${l.organization} (${l.period})`)
                .join("; ")}.
            </p>
          </div>
        </section>

        <section id="contact" className="section print-break">
          <div className="section-header">
            <h2>Contact</h2>
            <p>Get in touch.</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-sm font-mono text-muted mb-4">
              Resume · GitHub · LinkedIn · Email
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {contactBtn(resumeHref, "Resume")}
              {contactBtn(facts.links.github, "GitHub")}
              {contactBtn(facts.links.linkedin, "LinkedIn")}
              {contactBtn(`mailto:${facts.links.email}`, "Email")}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-solid border-border/60 bg-panel py-10 mt-auto print-hidden">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-mono text-muted">
            <span className="led led-ok" aria-hidden="true" />
            Built static · no client bundle required to read
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-muted">
            {facts.name} · {facts.location} ·{" "}
            <a href={`mailto:${facts.links.email}`} className="underline underline-offset-4">
              {facts.links.email}
            </a>
          </div>
          <button
            id="theme-toggle"
            className="theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-full border border-solid border-current/30 bg-transparent p-0 text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span className="sr-only">theme</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </footer>
      <CommandPalette />
      <ChatWidget />
    </div>
  );
}
