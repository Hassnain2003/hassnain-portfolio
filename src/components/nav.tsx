import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-solid border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/[.75]" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium text-foreground"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded border border-solid border-accent bg-accent px-0.5 text-accent-foreground text-xs font-bold">
            HR
          </span>
          <span className="tracking-tight">hassnain-portfolio</span>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="mailto:abbashussnain818@gmail.com"
            rel="noopener noreferrer"
            className="hidden sm:flex h-8 items-center rounded-full border border-solid border-current/20 bg-transparent px-3 text-xs font-mono text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            abbashussnain818@gmail.com
          </a>
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
      </div>
    </nav>
  );
}
