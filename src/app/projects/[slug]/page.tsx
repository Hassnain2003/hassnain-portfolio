import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 print-break">
      <header className="mb-10">
        <h1 className="text-4xl font-mono font-bold tracking-tight text-foreground sm:text-6xl">
          {study.name}
        </h1>
        <p className="mt-4 text-xl font-mono text-muted">{study.problem}</p>
      </header>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Architecture</h2>
        <div className="border border-solid border-border rounded-lg p-6 bg-panel">
          <p className="text-sm font-mono text-muted leading-relaxed">
            {study.architecture}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Key design decisions</h2>
        <ul className="list-disc list-inside space-y-2 text-sm font-mono text-muted">
          {study.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">What went wrong</h2>
        <p className="text-sm font-mono text-muted leading-relaxed">
          {study.wentWrong}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Result</h2>
        <div className={`flex items-baseline gap-2 p-4 rounded border border-solid ${
          study.resultConfirmed
            ? "border-border/60 bg-panel/50 text-foreground"
            : "border-accent/30 bg-accent/5 text-accent"
        }`}>
          <span className="font-mono text-sm font-semibold">
            {study.resultConfirmed ? "Result:" : "Result: pending ·"}
          </span>
          <span className="font-mono text-sm">{study.result}</span>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-mono font-semibold text-foreground text-xl mb-4">Links</h2>
        <div className="flex flex-wrap gap-3">
          {study.links.code && (
            <a
              href={study.links.code}
              className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
          )}
          {study.links.live && (
            <a
              href={study.links.live}
              className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </a>
          )}
          {study.links.demo && (
            <a
              href={study.links.demo}
              className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}
          {study.links.results && (
            <a
              href={study.links.results}
              className="flex items-center gap-2 rounded-full border border-solid border-current px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Results
            </a>
          )}
        </div>
      </section>
    </article>
  );
}

export const generateStaticParams = () => {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
};
