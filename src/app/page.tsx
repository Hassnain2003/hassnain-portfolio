"use client";

import dynamic from "next/dynamic";
import { facts } from "@/data/facts";
import { ChatWidget } from "@/components/chat-widget";
import { SpatialNav } from "@/components/spatial-nav";
import { Hero3D } from "@/components/hero-3d";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

const ProjectGalaxyDynamic = dynamic(() => import("@/components/project-galaxy").then((mod) => ({ default: mod.ProjectGalaxy })), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center text-muted/60 font-mono">
      Loading galaxy…
    </div>
  ),
});

const OrbitBackgroundDynamic = dynamic(() => import("@/components/orbit-background").then((mod) => ({ default: mod.OrbitBackground })), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen relative overflow-x-hidden">
      <OrbitBackgroundDynamic />

      <SpatialNav />

      <main id="main" className="flex-1 relative">
        <ScrollReveal delay={100}>
          <Hero3D />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <ProjectGalaxyDynamic />
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <ExperienceSection />
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <SkillsSection />
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <AboutSection />
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <ContactSection />
        </ScrollReveal>
      </main>

      <footer className="border-t border-border/50 bg-black/60 backdrop-blur py-8 mt-auto">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted/70">
            <span className="text-xs font-mono text-accent">●</span>
            <span>Spatial build · WebGL-accelerated</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted/70">
            {facts.name} · {facts.location}
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
