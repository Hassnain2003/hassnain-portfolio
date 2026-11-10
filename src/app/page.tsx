"use client";

import Link from "next/link";
import { facts } from "@/data/facts";
import { TerminalFileBrowser } from "@/components/project-card";
import { ChatWidget } from "@/components/chat-widget";
import { SystemMap } from "@/components/system-map";
import { BootSequence } from "@/components/boot-sequence";

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
    <div className="flex flex-col flex-1 min-h-screen relative">
      <BootSequence />

      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-inter font-bold text-lg tracking-tight text-foreground"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded border border-solid border-accent bg-accent px-0.5 text-accent-foreground text-xs font-bold">
              HA
            </span>
            <span className="tracking-tight">Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted">
              <span className="led led-ok" aria-hidden="true" /> SYSTEM ONLINE
            </span>
            <a
              href="mailto:abbashussnain818@gmail.com"
              className="text-xs font-mono text-muted underline underline-offset-3 hover:text-accent"
            >
              abbashussnain818@gmail.com
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 relative mx-auto max-w-6xl px-6 pb-32">
        <section id="hero" className="section pt-20 pb-24 border-b-0">
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <h1 className="font-inter font-bold text-5xl md:text-7xl tracking-tight text-foreground leading-tight">
              Hassnain Abbas
            </h1>
            <p className="typewriter font-mono text-lg text-muted max-w-md">
              AI &amp; Backend Engineer building LLM agents and the infrastructure they run on
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {contactBtn(resumeHref, "Resume")}
              {contactBtn(facts.links.github, "GitHub")}
              {contactBtn(facts.links.linkedin, "LinkedIn")}
              {contactBtn(`mailto:${facts.links.email}`, "Email")}
            </div>
            {telemetry && telemetry.lighthouse && (
              <p className="mt-6 text-[10px] font-mono text-muted uppercase tracking-wider">
                This site: {telemetry.lighthouse} · {telemetry.bundleSize} · source
              </p>
            )}
          </div>
        </section>

        <section id="system-map" className="section">
          <div className="section-header">
            <h2>System Map</h2>
            <p>Live project constellation — hover to trace links, click to open.</p>
          </div>
          <div className="canvas-map">
            <SystemMap />
          </div>
        </section>

        {/* Projects as terminal file browser */}
        <section id="projects" className="section relative min-h-[700px]">
          <div className="section-header absolute top-0 left-0 right-0 z-20">
            <h2>Deployed Projects</h2>
            <p>Terminal file browser — ls -la style. Click a file to cat its details.</p>
          </div>
          <div className="relative w-full h-[700px] overflow-visible">
            <TerminalFileBrowser projects={facts.projects} />
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-header">
            <h2>Experience</h2>
            <p>Roles and what I shipped.</p>
          </div>
          <div className="space-y-4">
            {facts.experience.map((exp) => (
              <article key={exp.employer} className="window">
                <div className="window-title">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {exp.role} @ {exp.employer}
                  </span>
                  <div className="window-controls">
                    <button className="window-btn close" aria-label="Close" />
                    <button className="window-btn minimize" aria-label="Minimize" />
                    <button className="window-btn maximize" aria-label="Maximize" />
                  </div>
                </div>
                <div className="window-body">
                  <p className="text-xs font-mono text-muted mb-2">
                    {exp.employer} · {exp.period}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs font-mono text-muted">
                    {exp.description.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {(exp as { attribution?: string }).attribution && (
                    <p className="mt-2 text-[10px] font-mono text-accent/70 uppercase tracking-wider">
                      {(exp as { attribution?: string }).attribution}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-header">
            <h2>Skills</h2>
            <p>Tools and technologies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facts.skills.map((group) => (
              <div key={group.area} className="window">
                <div className="window-title">
                  <span>{group.area}</span>
                  <div className="window-controls">
                    <button className="window-btn close" aria-label="Close" />
                    <button className="window-btn minimize" aria-label="Minimize" />
                    <button className="window-btn maximize" aria-label="Maximize" />
                  </div>
                </div>
                <div className="window-body">
                  <p className="text-sm font-mono text-muted">
                    {group.items.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <h2>About</h2>
            <p>Background and context.</p>
          </div>
          <div className="window">
            <div className="window-title">
              <span>Agent Profile</span>
              <div className="window-controls">
                <button className="window-btn close" aria-label="Close" />
                <button className="window-btn minimize" aria-label="Minimize" />
                <button className="window-btn maximize" aria-label="Maximize" />
              </div>
            </div>
            <div className="window-body">
              <p className="text-sm font-mono text-muted leading-relaxed">
                {facts.name} is a final-year BS Information Technology student at
                Bahria University Islamabad, graduating January 2027. Based in
                {facts.location}. Builds AI agents and backend infrastructure —
                LangGraph, MCP, LangChain, Groq, PostgreSQL, Redis, Docker,
                Kubernetes, Terraform.
              </p>
              <p className="mt-4 text-sm font-mono text-muted leading-relaxed">
                Leadership:{ " "}
                {facts.leadership
                  .map((l) => `${l.role} at ${l.organization} (${l.period})`)
                  .join("; ")}.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section border-b-0 pb-32">
          <div className="section-header">
            <h2>Contact</h2>
            <p>Get in touch.</p>
          </div>
          <div className="window">
            <div className="window-title">
              <span>Incoming Transmission</span>
              <div className="window-controls">
                <button className="window-btn close" aria-label="Close" />
                <button className="window-btn minimize" aria-label="Minimize" />
                <button className="window-btn maximize" aria-label="Maximize" />
              </div>
            </div>
            <div className="window-body p-6 text-center">
              <p className="text-sm font-mono text-muted mb-6">
                Resume · GitHub · LinkedIn · Email
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {contactBtn(resumeHref, "Resume")}
                {contactBtn(facts.links.github, "GitHub")}
                {contactBtn(facts.links.linkedin, "LinkedIn")}
                {contactBtn(`mailto:${facts.links.email}`, "Email")}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-solid border-border/60 bg-[#050505] py-10 mt-auto">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="led led-ok" aria-hidden="true" />
            static build · no client framework required to read
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            {facts.name} · {facts.location} ·{" "}
            <a href={`mailto:${facts.links.email}`} className="underline underline-offset-4 hover:text-accent">
              {facts.links.email}
            </a>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
