import { describe, expect, it } from "vitest";
import { facts } from "@/data/facts";

describe("facts", () => {
  it("exports the expected identity", () => {
    expect(facts.name).toBe("Hassnain Abbas");
    expect(facts.role).toBe("AI & Backend Engineer building LLM agents and the infrastructure they run on.");
    expect(facts.availability).toBe("full-time from 4 January 2027");
  });

  it("lists projects in the given order", () => {
    expect(facts.projects.map((p) => p.name)).toEqual([
      "AgentDine",
      "kube-triage",
      "OpenAI LLM Gateway",
      "Algorithmic trading engine",
      "D&Z Cartique",
      "QLSS",
    ]);
  });

  it("marks unconfirmed results", () => {
    expect(facts.projects[0].resultConfirmed).toBe(false);
    expect(facts.projects[1].resultConfirmed).toBe(true);
    expect(facts.projects[2].resultConfirmed).toBe(true);
  });

  it("has resume link", () => {
    expect(facts.links.resume).toBe("/resume");
  });
});
