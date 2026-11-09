import Link from "next/link";

export const metadata = {
  title: "404 · Hassnain Abbas",
  description: "This page does not exist. Return to the home page.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-foreground p-6 font-mono">
        <div className="border border-solid border-border p-6 max-w-lg w-full text-[12px]">
          <div className="flex items-center gap-2 mb-4 border-b border-solid border-border pb-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <h1 className="mb-4 text-red-500">404 — SYSTEM NOT FOUND</h1>
          <pre className="mb-4">Error: route not found in agent.os kernel.</pre>
        <pre className="mb-6 text-muted">
          Press <span className="text-accent font-bold">⌘K</span> to open the
          command palette, or{" "}
        </pre>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-block border border-solid border-current px-3 py-1 text-xs hover:bg-current hover:text-accent-foreground transition-colors"
          >
            &gt; reboot to home
          </Link>
        </div>
      </div>
    </div>
  );
}
