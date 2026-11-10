"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

type ProjectCard3DProps = {
  name: string;
  description: string;
  status: "private" | "public" | "live" | "planned";
  tags: readonly string[];
  repo?: string;
  live?: string;
  demo?: string;
};

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  live: { color: "#00ff88", label: "live" },
  public: { color: "#00f2ff", label: "public" },
  private: { color: "#bc13fe", label: "private" },
  planned: { color: "#8b8ca0", label: "planned" },
};

export function ProjectCard3D({
  name,
  description,
  status,
  tags,
  repo,
  live,
  demo,
}: ProjectCard3DProps) {
  const style = STATUS_STYLE[status];

  return (
    <article
      className="group relative glass hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-all duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="overflow-hidden rounded-xl border border-border/80 bg-black/40 backdrop-blur-sm p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border/60 text-[10px] font-mono font-semibold uppercase tracking-wider"
                style={{ borderColor: style.color, color: style.color }}
              >
                [{style.label}]
              </span>
            </div>
            <div className="w-8 h-8 rounded bg-border/50 flex items-center justify-center text-[10px] font-mono font-bold text-muted group-hover:text-accent transition-colors">
              HA
            </div>
          </div>

          <h3 className="font-display font-bold text-lg text-foreground tracking-tight group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted/80 leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded border border-border/60 text-[10px] font-mono text-muted/70 bg-black/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-3">
              {repo && (
                <Link
                  href={repo}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Code <ExternalLink size={14} />
                </Link>
              )}
              {live && (
                <Link
                  href={live}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Live <ExternalLink size={14} />
                </Link>
              )}
              {demo && (
                <Link
                  href={demo}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Demo <ExternalLink size={14} />
                </Link>
              )}
              {!repo && !live && !demo && (
                <span className="px-3 py-1.5 rounded border border-solid border-accent/30 text-xs font-inter text-accent/60">
                  Coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
