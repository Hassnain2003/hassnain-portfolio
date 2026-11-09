"use client";

import { useState } from "react";

const DOCK_APPS = [
  { label: "home", href: "/", icon: "H" },
  { label: "projects", href: "#projects", icon: "P" },
  { label: "system", href: "#system-map", icon: "S" },
  { label: "experience", href: "#experience", icon: "E" },
  { label: "skills", href: "#skills", icon: "K" },
  { label: "about", href: "#about", icon: "A" },
  { label: "contact", href: "#contact", icon: "C" },
  { label: "resume", href: "#resume", icon: "R" },
  { label: "theme", href: "#theme", icon: "T" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="dock" aria-label="Application dock">
      {DOCK_APPS.map((app) => (
        <a
          key={app.label}
          href={app.href}
          onClick={() => setActive(app.label)}
          className={`dock-item ${active === app.label ? "active" : ""}`}
          aria-label={app.label}
        >
          <div className="dock-icon">
            <span className="rounded border border-solid border-current/30 flex h-6 w-6 items-center justify-center text-[10px] font-mono font-bold">
              {app.icon}
            </span>
          </div>
          <span>{app.label}</span>
        </a>
      ))}
    </div>
  );
}
