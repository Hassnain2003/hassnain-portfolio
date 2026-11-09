import type { Trace } from "@/data/trace-schema";
import { sampleTrace } from "./sample-trace";

// Development-only traces. These are clearly marked with source === "sample"
// and must NEVER be included in production builds. The guard-sample-trace
// build script enforces this.

export const devTraces: Trace[] = [sampleTrace];

export const devTraceById = (id: string): Trace | undefined => devTraces.find((t) => t.id === id);

export const devTraceIds = () => devTraces.map((t) => t.id);
