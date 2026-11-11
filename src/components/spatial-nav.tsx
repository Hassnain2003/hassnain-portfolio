"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Home, Code, Monitor, Mail, GraduationCap, LayoutGrid, Github, Linkedin } from "lucide-react";
import { facts } from "@/data/facts";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "#projects", icon: Code },
  { label: "Experience", href: "#experience", icon: Monitor },
  { label: "Skills", href: "#skills", icon: LayoutGrid },
  { label: "About", href: "#about", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function SpatialNav() {
  const [active, setActive] = useState<string>("/");
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-40"
      aria-label="Main navigation"
    >
      <div
        className="glass px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-border/50"
      >
        <div className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] transition-shadow"
          >
            HA
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href || (item.href !== "/" && active.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-transparent ${isActive ? "bg-accent/10 text-accent border border-accent/30" : "text-muted/70 hover:text-accent hover:bg-accent/5 hover:border-accent/50"}`}
                onClick={() => { setActive(item.href); setOpen(false); }}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} className={isActive ? "text-accent" : "text-muted/70 group-hover:text-accent"} />
                <span className={isActive ? "text-foreground" : "text-muted/70 group-hover:text-foreground"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <a
              href={facts.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border/50 text-muted/70 hover:text-accent hover:border-accent/50 transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={facts.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border/50 text-muted/70 hover:text-accent hover:border-accent/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${facts.links.email}`}
              className="p-2 rounded-lg border border-border/50 text-muted/70 hover:text-accent hover:border-accent/50 transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg border border-border/50 text-muted/70 hover:text-accent hover:border-accent/50 transition-all"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      {open && (
        <div
          className="fixed inset-y-0 right-0 w-full sm:w-96 z-50 glass border-l border-border/50 flex flex-col"
        >
          <div className="p-6 flex items-center justify-between border-b border-border/50">
            <span className="font-mono text-xs text-accent">MENU</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <span className="w-5 h-5" dangerouslySetInnerHTML={{ __html: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' }} />
            </button>
          </div>
          <nav className="p-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.href || (item.href !== "/" && active.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "text-muted/70 hover:text-foreground hover:bg-white/5"
                  }`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </nav>
  );
}