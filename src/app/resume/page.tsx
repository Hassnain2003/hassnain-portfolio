import { facts } from "@/data/facts";

export const metadata = {
  title: "Resume · Hassnain Abbas",
  description: "Resume of Hassnain Abbas — AI & Backend Engineer.",
};

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground p-6 md:p-10 font-inter print-hidden">
      <div className="max-w-4xl mx-auto border border-solid border-border p-8 print-break">
        <header className="mb-8 text-center">
          <h1 className="font-inter font-bold text-4xl md:text-5xl tracking-tight">
            {facts.name}
          </h1>
          <p className="mt-2 text-lg text-muted">
            {facts.role}
          </p>
          <p className="mt-1 text-sm text-muted">
            {facts.location} ·{" "}
            <a
              href={`mailto:${facts.links.email}`}
              className="underline underline-offset-4 hover:text-accent transition-colors"
            >
              {facts.links.email}
            </a>
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <a
              href={facts.links.github}
              className="underline underline-offset-4 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={facts.links.linkedin}
              className="underline underline-offset-4 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <section className="mb-8 border-b border-solid border-border pb-4">
          <h2 className="font-inter font-bold text-xl mb-3 uppercase tracking-wider text-accent">
            Profile
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Final-year BS Information Technology student at Bahria University
            Islamabad, graduating January 2027. Builds AI agents and backend
            infrastructure — LangGraph, MCP, LangChain, Groq, PostgreSQL,
            Redis, Docker, Kubernetes, Terraform. Available full-time from
            January 2027.
          </p>
        </section>

        <section className="mb-8 border-b border-solid border-border pb-4">
          <h2 className="font-inter font-bold text-xl mb-3 uppercase tracking-wider text-accent">
            Experience
          </h2>
          {facts.experience.map((exp) => (
            <article key={exp.employer} className="mb-6">
              <h3 className="font-inter font-semibold text-lg mb-1">
                {exp.role}
              </h3>
              <p className="text-sm font-inter text-muted mb-2">
                {exp.employer} · {exp.period}
                {exp.location && ` · ${exp.location}`}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {exp.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-8 border-b border-solid border-border pb-4">
          <h2 className="font-inter font-bold text-xl mb-3 uppercase tracking-wider text-accent">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts.projects.map((project) => (
              <div key={project.name} className="border border-solid border-border rounded-lg p-4 bg-panel">
                <h4 className="font-inter font-semibold text-sm mb-2">
                  {project.name}
                </h4>
                <p className="text-sm text-muted mb-2 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs font-inter text-muted uppercase tracking-wider">
                  Status: {project.status}
                </p>
                {project.repo && (
                  <p className="mt-2 text-xs font-inter text-muted">
                    Repo:{" "}
                    <a
                      href={project.repo}
                      className="underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      {project.repo}
                    </a>
                  </p>
                )}
                {project.live && (
                  <p className="mt-1 text-xs font-inter text-muted">
                    Live:{" "}
                    <a
                      href={project.live}
                      className="underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      {project.live}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 border-b border-solid border-border pb-4">
          <h2 className="font-inter font-bold text-xl mb-3 uppercase tracking-wider text-accent">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facts.skills.map((group) => (
              <div key={group.area}>
                <h4 className="font-inter font-semibold text-sm mb-2 uppercase tracking-wider text-accent">
                  {group.area}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-inter font-bold text-xl mb-3 uppercase tracking-wider text-accent">
            Leadership
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted">
            {facts.leadership.map((l) => (
              <li key={l.organization}>
                {l.role} at {l.organization} ({l.period})
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-8 pt-4 border-t border-solid border-border text-center text-xs text-muted uppercase tracking-wider">
          Generated from facts.md · portfolio · {facts.location}
        </footer>
      </div>
    </div>
  );
}
