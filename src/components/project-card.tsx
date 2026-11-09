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
  window?: boolean;
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
  window: isWindow = false,
}: ProjectCardProps) {
  const statusChip = (
    <span
      className={`chip ${
        status === "live"
          ? "chip-live"
          : status === "public"
          ? "chip-public"
          : status === "private"
          ? "chip-private"
          : "chip-planned"
      }`}
    >
      {status}
    </span>
  );

  const base = (
    <article className={isWindow ? "window" : "card"}>
      {isWindow && (
        <div className="window-title">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-accent" />
            {name}
          </span>
          <div className="window-controls">
            <button className="window-btn close" aria-label="Close" />
            <button className="window-btn minimize" aria-label="Minimize" />
            <button className="window-btn maximize" aria-label="Maximize" />
          </div>
        </div>
      )}
      <div className={isWindow ? "window-body" : ""}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h3 className="font-inter font-semibold text-foreground">
              {name}
            </h3>
            {statusChip}
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
            <span className="font-mono text-xs text-warning">
              Result: pending · {result}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {repo ? (
            <Link
              href={repo}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </Link>
          ) : (
              <span className="flex items-center gap-2 rounded-full border border-solid border-accent/30 px-3 py-1 text-xs font-mono text-accent/60">
                Code · {status}
              </span>
          )}
          {live ? (
            <Link
              href={live}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </Link>
          ) : null}
          {demo ? (
            <Link
              href={demo}
              className="btn btn-outline btn-sm"
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
      </div>
    </article>
  );

  return base;
}
