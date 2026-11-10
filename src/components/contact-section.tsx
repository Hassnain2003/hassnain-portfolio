"use client";

import { facts } from "@/data/facts";

const contactBtn = (href: string, label: string) => (
  <a
    href={href}
    className="btn btn-primary hover-lift"
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
  >
    {label}
  </a>
);

export function ContactSection() {
  const resumeHref = facts.links.resume || "#resume";

  return (
    <section id="contact" className="section border-b-0 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-[60%] h-[400px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="section-header mb-10">
        <h2 className="text-heading text-foreground mb-2">Contact</h2>
        <p className="text-subhead text-muted/90">Open to opportunities starting January 2027.</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-2xl max-w-2xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8">
          {contactBtn(resumeHref, "Resume")}
          {contactBtn(facts.links.github, "GitHub")}
          {contactBtn(facts.links.linkedin, "LinkedIn")}
          {contactBtn(`mailto:${facts.links.email}`, "Email")}
        </div>
        <p className="text-sm text-muted/90 font-mono mb-6">
          {facts.name} · {facts.location}
        </p>
        <a
          href={`mailto:${facts.links.email}`}
          className="text-accent font-mono text-sm underline underline-offset-4 hover:text-accent/80 transition-colors hover-lift"
        >
          {facts.links.email}
        </a>
      </div>
    </section>
  );
}