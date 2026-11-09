import type { Trace } from "@/data/trace-schema";

// Real traces go here. Provide real traces by placing trace JSON files
// in src/data/traces/ and adding them to this index.
// Until real traces are provided, this list is empty — the replay page
// will gracefully degrade to a "no traces available" state in production.

export const traces: Trace[] = [];

export const traceById = (id: string): Trace | undefined => traces.find((t) => t.id === id);

export const traceIds = () => traces.map((t) => t.id);
