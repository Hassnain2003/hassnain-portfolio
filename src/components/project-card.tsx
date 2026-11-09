"use client";

import Link from "next/link";

type ProjectCardProps = {
  name: string;
  description: string;
  status: "private" | "public" | "live" | "planned";
  tags: readonly string[];
  result: string;
  resultConfirmed: boolean;
  repo?: string;
  live?: string;
  demo?: string;
  context?: string;
};

export function ProjectCard({
  name,
  description,
  status,
  tags,
  result,
  resultConfirmed,
  repo,
  live,
  demo,
  context,
}: ProjectCardProps) {
  return (
    <article className="border border-solid border-border rounded-lg p-6 print-break">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h3 className="font-mono font-semibold text-foreground">
            {name}
          </h3>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${
              status === "live"
                ? "bg-green-500/10 text-green-400 border border-solid border-green-500/20"
                : status === "public"
                ? "bg-blue-500/10 text-blue-400 border border-solid border-blue-500/20"
                : status === "private"
                ? "bg-accent/10 text-accent border border-solid border-accent/20"
                : "bg-muted/20 text-muted border border-solid border-muted/20"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-xs font-mono text-muted leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded border border-solid border-border/40 bg-panel/50 text-xs font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-mono text-xs font-semibold text-foreground">Result:</span>
        {resultConfirmed ? (
          <span className="font-mono text-xs text-foreground">{result}</span>
        ) : (
          <span className="font-mono text-xs text-accent">
            Result: pending · {result}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {repo ? (
          <Link
            href={repo}
            className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-full border border-solid border-accent/30 px-3 py-1 text-xs font-mono text-accent/60">
            Code · TODO
          </span>
        )}
        {live ? (
          <Link
            href={live}
            className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </Link>
        ) : null}
        {demo ? (
          <Link
            href={demo}
            className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo
          </Link>
        ) : null}
      </div>

      {context && (
        <p className="mt-4 text-xs font-mono text-muted leading-relaxed">
          {context}
        </p>
      )}
    </article>
  );
}
