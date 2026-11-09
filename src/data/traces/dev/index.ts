import type { Trace } from "@/data/trace-schema";

// Development-only traces. This index is intentionally empty — sample traces
// have been removed so that zero sample traces ship in production. The
// guard-sample-trace build script enforces this.

export const devTraces: Trace[] = [];

export const devTraceById = (id: string): Trace | undefined => devTraces.find((t) => t.id === id);

export const devTraceIds = () => devTraces.map((t) => t.id);
