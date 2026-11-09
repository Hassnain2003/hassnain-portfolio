import dynamic from "next/dynamic";
import { facts } from "@/data/facts";
import { CommandPalette } from "@/components/command-palette";

const ClusterVisual = dynamic(
  () => import("@/components/cluster-visual").then((mod) => mod.ClusterVisual),
  { loading: () => null }
);

import telemetryData from "@/data/telemetry.json";

const telemetry: { lighthouse?: string | null; bundleSize?: string | null; source?: string | null } | null =
  telemetryData;

const resumeHref = facts.links.resume || "#resume";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="mx-auto max-w-6xl px-6 py-12 print-hidden">
        <div className="flex flex-col gap-2 print-break">
          <h1 className="text-4xl font-mono font-bold tracking-tight text-foreground sm:text-6xl">
            {facts.name}
          </h1>
          <p className="text-xl font-mono text-muted">{facts.role}</p>
          <div className="flex items-center gap-2 text-sm font-mono text-muted">
            <span className="led led-ok" aria-hidden="true" />
            Available full-time from {facts.availability.split(" from ")[1]}
          </div>
          {telemetry && telemetry.lighthouse && (
            <p className="mt-2 text-xs font-mono text-muted">
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
        <div className="mt-10 flex flex-wrap gap-3 print-hidden">
          <a
            href={resumeHref}
            className="flex h-10 min-w-fit items-center justify-center gap-2 rounded-full border border-solid border-current px-4 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Resume
          </a>
          <a
            href={facts.links.github}
            className="flex h-10 min-w-fit items-center justify-center gap-2 rounded-full border border-solid border-current px-4 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            GitHub
          </a>
          <a
            href={facts.links.linkedin}
            className="flex h-10 min-w-fit items-center justify-center gap-2 rounded-full border border-solid border-current px-4 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${facts.links.email}`}
            className="flex h-10 min-w-fit items-center justify-center gap-2 rounded-full border border-solid border-current px-4 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Email
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-6 pb-24">
        <section className="grid gap-12 print-break">
          <div className="border border-border rounded-lg p-6 text-sm">
            <h2 className="font-mono font-semibold text-foreground mb-3">Site status</h2>
            <p className="text-muted">
              This portfolio is under construction. Case studies, the Break-It replay, and the
              Ask-My-Agent chat ship in the coming phases. Everything here is static HTML and
              works with JavaScript disabled.
            </p>
          </div>
          <ClusterVisual />
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
            <a href={`mailto:${facts.links.email}`} className="underline underline-offset-3">
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
    </div>
  );
}
