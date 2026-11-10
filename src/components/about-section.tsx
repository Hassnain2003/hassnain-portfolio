 "use client";

import { GlassPanel } from "@/components/glass-panel";
import { facts } from "@/data/facts";

export function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="section-header mb-12">
        <h2 className="text-heading text-foreground mb-2">About</h2>
        <p className="text-subhead text-muted/70">Who I am and what drives me.</p>
      </div>

      <GlassPanel variant="lg" className="max-w-5xl mx-auto relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />

        {/* Lead paragraph */}
        <p className="text-body text-muted/90 leading-relaxed mb-6 relative z-10">
          I&apos;m a final-year IT student at Bahria University Islamabad, graduating in January 2027,
          and I build LLM agents and the infrastructure they run on. What draws me in is the part after
          the demo works: the queue that fills up, the webhook that arrives twice, the pod that crashes at
          3 a.m., and the question of whether an AI system is actually right or only sounds right.
        </p>

        {/* AgentDine + gateway paragraph */}
        <p className="text-body text-muted/90 leading-relaxed mb-6 relative z-10">
          My final year project, <span className="font-mono">AgentDine</span>, is a four-agent WhatsApp
          ordering platform that takes orders in Roman Urdu, Urdu script, and English and checks inventory
          in real time. I built an OpenAI-compatible gateway that rate-limits per key, queues requests with
          backpressure, streams responses, cancels abandoned ones, and ships with dashboards, 22 tests, and
          CI.
        </p>

        {/* kube-triage paragraph */}
        <p className="text-body text-muted/90 leading-relaxed mb-6 relative z-10">
          My latest project is a read-only Kubernetes agent that diagnoses broken deployments. It got
          <span className="text-accent font-semibold">29 of 30</span> injected faults right in an eval I
          wrote, and the repo shows its failures as plainly as its wins.
        </p>

        {/* Delta Plus + closing paragraph */}
        <p className="text-body text-muted/90 leading-relaxed mb-10 relative z-10">
          Before that, I shipped a three-week MVP at Delta Plus that cut document retrieval time by
          <span className="text-accent font-semibold">70%</span> (employer-reported, not independently
          verified). I&apos;ve also built full-stack apps with admin dashboards, authentication, and live
          deployments, and I was on the core team of Google Developer Student Club. Give me a hard backend
          or AI problem — from an ordering bot to a model gateway to an agent that reads logs — and I&apos;ll
          build it, test it, and tell you honestly where it breaks.
        </p>

        {/* Stats grid — 5 callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">🎓</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">Bahria University</span>
            <span className="text-caption text-muted/70 font-mono uppercase">BS Information Technology</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent-2/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">📅</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">January 2027</span>
            <span className="text-caption text-muted/70 font-mono uppercase">Graduation</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <span className="text-accent font-display font-bold text-2xl">📍</span>
            </div>
            <span className="block text-label text-accent stat-number mb-1">Islamabad</span>
            <span className="text-caption text-muted/70 font-mono uppercase">Based in</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-success/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-success/10 mx-auto mb-3 group-hover:bg-success group-hover:text-success transition-all duration-500">
              <span className="text-success font-display font-bold text-2xl">🧪</span>
            </div>
            <span className="block text-label text-success stat-number mb-1">29 / 30</span>
            <span className="text-caption text-muted/70 font-mono uppercase">fault-injection eval pass rate</span>
          </div>
          <div className="glass-panel-sm stat-card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-warning/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-warning/10 mx-auto mb-3 group-hover:bg-warning group-hover:text-warning transition-all duration-500">
              <span className="text-warning font-display font-bold text-2xl">📉</span>
            </div>
            <span className="block text-label text-warning stat-number mb-1">70%</span>
            <span className="text-caption text-muted/70 font-mono uppercase">retrieval time cut · employer-reported</span>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
