import Link from "next/link";

export const metadata = {
  title: "Lost · Hassnain Abbas",
  description: "This page does not exist. Return to the home page.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-6xl font-mono font-bold tracking-tight text-foreground">
        Lost.
      </h1>
      <p className="mt-4 text-lg text-muted">
        No page at this path.{" "}
        <Link href="/" className="underline underline-offset-4 hover:text-accent">
          Return home
        </Link>
        .
      </p>
      <div className="mt-10 border border-solid border-border rounded-lg p-6 bg-panel text-left">
        <p className="text-xs font-mono text-muted uppercase tracking-tighter mb-2">
          Try ⌘K
        </p>
        <p className="text-sm font-mono text-muted leading-relaxed">
          The command palette is pre-opened on every page. Press{" "}
          <span className="font-mono font-bold text-foreground">⌘K</span> (or{" "}
          <span className="font-mono font-bold text-foreground">Ctrl+K</span>) to
          jump to a section, case study, the chat, or toggle the theme.
        </p>
        <div className="mt-4 border-t border-solid border-border/50 pt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-xs font-mono text-muted">Sections · Case studies · Theme · Resume · Chat</span>
        </div>
      </div>
      <p className="mt-8 text-sm font-mono text-muted">
        Tip: everything on this site is static HTML — ⌘P prints a one-page
        resume from the Home page.
      </p>
    </div>
  );
}
