"use client";

import Link from "next/link";
import { useState } from "react";

type TerminalFileProps = {
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

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  live: { color: "#00ff41", label: "live" },
  public: { color: "#3b82f6", label: "public" },
  private: { color: "#ffb000", label: "private" },
  planned: { color: "#737373", label: "planned" },
};

export function TerminalFileBrowser({
  projects,
}: {
  projects: readonly TerminalFileProps[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const project = selected ? projects.find((p) => p.name === selected) : null;

  return (
    <section
      id="projects"
      className="section relative min-h-[700px]"
      aria-label="Projects terminal file browser"
    >
      <div className="section-header absolute top-0 left-0 right-0 z-10">
        <h2>Deployed Projects</h2>
        <p>Terminal file browser — ls -la style. Click a file to cat its details.</p>
      </div>

      <div className="relative h-[600px] bg-[#050505] border border-solid border-border rounded-lg overflow-hidden flex flex-col">
        {/* Terminal header */}
        <div className="bg-[#1a1a1a] border-b border-solid border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-[11px] font-mono text-accent">
            root@agentos:~/projects$ ls -la
          </div>
        </div>

        {/* File listing */}
        <div className="flex-1 overflow-auto border-t border-solid border-border/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-wider border-b border-solid border-border/30">
                  Permissions
                </th>
                <th className="px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-wider border-b border-solid border-border/30">
                  Owner
                </th>
                <th className="px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-wider border-b border-solid border-border/30">
                  Size
                </th>
                <th className="px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-wider border-b border-solid border-border/30">
                  Modified
                </th>
                <th className="px-6 py-2 text-[10px] font-mono text-muted uppercase tracking-wider border-b border-solid border-border/30">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const style = STATUS_STYLE[p.status];
                const isSelected = selected === p.name;
                const permissions = p.status === "live" ? "drwxr-xr-x" : "drwxr-xr-x";
                return (
                  <tr
                    key={p.name}
                    onClick={() => setSelected(selected === p.name ? null : p.name)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-accent/10" : "hover:bg-[#0a0a0a]"
                    } border-b border-solid border-border/20`}
                  >
                    <td className="px-6 py-3 text-[11px] font-mono text-muted">
                      {permissions}
                    </td>
                    <td className="px-6 py-3 text-[11px] font-mono text-muted">
                      hassnain
                    </td>
                    <td className="px-6 py-3 text-[11px] font-mono text-muted">
                      4.0K
                    </td>
                    <td className="px-6 py-3 text-[11px] font-mono text-muted">
                      Jan 2027
                    </td>
                    <td className="px-6 py-3 font-mono">
                      <span
                        className={`inline-flex items-center gap-2 ${
                          isSelected ? "font-bold text-accent" : `text-${style.color}`
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${style.color === "#00ff41" ? "bg-green-500" : style.color === "#3b82f6" ? "bg-blue-500" : style.color === "#ffb000" ? "bg-yellow-500" : "bg-gray-500"}`} />
                        {p.name}
                      </span>
                      <span className={`text-[10px] ${style.color === "#00ff41" ? "text-green-500" : style.color === "#3b82f6" ? "text-blue-500" : style.color === "#ffb000" ? "text-yellow-500" : "text-gray-500"}`}>
                        [{style.label}]
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cat output panel */}
        {selected && project && (
          <div className="bg-[#0a0a0a] border-t border-solid border-border p-4 max-h-[45%] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                cat {selected}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="h-6 w-6 rounded border border-solid border-current/30 flex items-center justify-center text-[10px] font-mono text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close output"
              >
                <span className="sr-only">close</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-foreground whitespace-pre-wrap">
              {`Name: ${project.name}
Status: ${project.status}
Result: ${project.resultConfirmed ? project.result : "pending · " + project.result}
Confirmed: ${project.resultConfirmed ? "yes" : "no"}

Description:
${project.description}

Tags: ${project.tags.join(", ")}

${
  project.context
    ? `Context:
${project.context}

`
    : ""
}Links:
${project.repo ? `  Code: ${project.repo}` : "  Code: not published"}
${project.live ? `  Live: ${project.live}` : "  Live: none"}
${project.demo ? `  Demo: ${project.demo}` : "  Demo: none"}`}

            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.repo ? (
                <Link
                  href={project.repo}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Code
                </Link>
              ) : (
                <span className="px-2 py-1 rounded border border-solid border-accent/30 text-[10px] font-mono text-accent/60">
                  Code · private
                </span>
              )}
              {project.live ? (
                <Link
                  href={project.live}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Live
                </Link>
              ) : null}
              {project.demo ? (
                <Link
                  href={project.demo}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Demo
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
