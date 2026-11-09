export type TraceSource = "real" | "sample";

export type ClusterState = "healthy" | "degraded" | "failed";

export type ClusterTimelineEntry = {
  timestamp: number; // wall-clock seconds from trace start
  pod: string;
  namespace: string;
  state: ClusterState;
  reason?: string;
};

export type AgentStep = {
  timestamp: number; // wall-clock seconds from trace start
  tool: string;
  args: string; // truncated arguments
  output: string; // truncated output
  durationMs: number;
};

export type FinalReport = {
  rootCauseCategory: string;
  explanation: string;
  evidenceReferences: string[]; // links to logs, traces, etc.
  suggestedFix: string;
};

export type Trace = {
  id: string;
  date: string; // ISO date string
  model: string; // e.g. "llama-3.3-70b-versatile"
  source: TraceSource;
  fault: string; // human-readable fault name
  clusterTimeline: ClusterTimelineEntry[];
  agentSteps: AgentStep[];
  finalReport: FinalReport;
  tokens: number;
  toolCallCount: number;
  wallClockSeconds: number;
};
