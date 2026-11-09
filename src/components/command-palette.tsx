"use client";

import { useCallback, useEffect, useState } from "react";

type PaletteItem = {
  label: string;
  href: string;
  action?: () => void;
};

const ITEMS: PaletteItem[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
  { label: "Theme", href: "#theme", action: () => {
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.click();
  } },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => setOpen(false), []);

  const selectItem = useCallback(
    (item: PaletteItem) => {
      if (item.action) {
        item.action();
      } else if (item.href && item.href !== "#") {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      closePalette();
    },
    [closePalette]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        selectItem(filtered[activeIndex]);
        return;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closePalette, filtered, activeIndex, selectItem, openPalette]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closePalette}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md bg-panel border border-solid border-border rounded-lg p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <h2 className="font-mono font-semibold text-foreground mb-4">⌘K</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full font-mono text-sm text-foreground bg-transparent border-none outline-none pb-2 mb-4"
          placeholder="Search sections…"
        />
        <ul className="max-h-48 overflow-y-auto space-y-1">
          {filtered.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <li
                key={item.label}
                onClick={() => selectItem(item)}
                className={`px-4 py-2 font-mono text-sm rounded cursor-pointer select-none transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:bg-panel/50"
                }`}
              >
                {item.label}
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-4 py-2 font-mono text-sm text-muted">
              No matches
            </li>
          )}
        </ul>
        <p className="mt-4 text-xs font-mono text-muted">
          ↑↓ to navigate · Enter to select · Esc to close
        </p>
      </div>
    </div>
  );
}
