import Link from "next/link";

export const metadata = {
  title: "Lost · Hassnain Abbas",
  description: "This page does not exist. Return to the home page.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-6xl font-mono font-bold tracking-tight text-foreground">Lost.</h1>
      <p className="mt-4 text-lg text-muted">
        No page at this path. <Link href="/" className="underline underline-offset-4 hover:text-accent">Return home</Link>.
      </p>
      <p className="mt-8 text-sm font-mono text-muted">
        Tip: open the command palette with ⌘K on any page to jump to a section, case study, or the chat.
      </p>
    </div>
  );
}
