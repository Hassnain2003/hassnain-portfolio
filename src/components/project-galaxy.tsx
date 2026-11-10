 "use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SphereGeometry, BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial } from "three";
import * as THREE from "three";
import { facts } from "@/data/facts";
import Link from "next/link";

type ProjectNodeProps = {
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
  onSelect: (name: string) => void;
};

function ProjectNode({ name, x, y, z, color, onSelect }: ProjectNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = new SphereGeometry(0.45, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: hovered ? 1 : 0.3,
    transparent: true,
    opacity: 0.9,
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time + x) * 0.15;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + y) * 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      geometry={geometry}
      material={material}
      onClick={() => onSelect(name)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

const PROJECT_POSITIONS: Record<string, { x: number; y: number; z: number; color: string }> = {
  AgentDine: { x: -5, y: 2, z: -4, color: "#bc13fe" },
  "kube-triage": { x: 5, y: 1, z: -4, color: "#00f2ff" },
  "OpenAI LLM Gateway": { x: 0, y: 3, z: -6, color: "#00ff88" },
  "Algorithmic trading engine": { x: -6, y: -1, z: 0, color: "#ffb000" },
  "D&Z Cartique": { x: 4, y: -1, z: 2, color: "#00f2ff" },
  QLSS: { x: -1, y: -3, z: 4, color: "#00ff88" },
};

const PROJECT_TAGS: Record<string, string[]> = {
  AgentDine: ["LangGraph", "Groq", "Llama 3.3", "WhatsApp", "PostgreSQL", "Redis"],
  "kube-triage": ["Kubernetes", "MCP", "LangGraph", "RBAC", "Fault Injection", "Eval"],
  "OpenAI LLM Gateway": ["Rate Limiting", "SSE", "Token Bucket", "Prometheus", "Grafana", "CI"],
  "Algorithmic trading engine": ["Execution Engine", "Risk Manager", "Replay", "Walk-Forward", "Eligibility Rules"],
  "D&Z Cartique": ["React", "Firebase", "Firestore", "E-commerce", "Cash on Delivery"],
  QLSS: ["Flutter", "Firebase", "Queue Management", "Booking", "University"],
};

export function ProjectGalaxy() {
  const [selected, setSelected] = useState<string | null>(null);
  const project = selected ? facts.projects.find((p) => p.name === selected) : null;
  const branches = project ? PROJECT_TAGS[project.name] ?? [] : [];

  const positions = facts.projects.map((p) => PROJECT_POSITIONS[p.name] || { x: 0, y: 0, z: -5, color: "#8b8ca0" });

  const linePositions: number[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      linePositions.push(positions[i].x, positions[i].y, positions[i].z);
      linePositions.push(positions[j].x, positions[j].y, positions[j].z);
    }
  }

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new LineBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.15 });

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="section-header">
          <h2>Project Galaxy</h2>
          <p>Interactive constellation of built systems. Click a node to open details.</p>
        </div>

        <div
          className="w-full h-[600px] md:h-[700px] rounded-2xl border border-border/50 bg-black/30 backdrop-blur-sm relative"
        >
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }} shadows>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f2ff" />
            <pointLight position={[-10, -10, 10]} intensity={0.6} color="#bc13fe" />

            <primitive object={new Line(lineGeometry, lineMaterial)} />

            {facts.projects.map((p, i) => {
              const pos = positions[i];
              return (
                <ProjectNode
                  key={p.name}
                  name={p.name}
                  x={pos.x}
                  y={pos.y}
                  z={pos.z}
                  color={pos.color}
                  onSelect={setSelected}
                />
              );
            })}
          </Canvas>
        </div>

        {selected && project && (
          <div
            className="absolute top-4 right-4 w-96 glass p-6 rounded-xl border border-accent/50 shadow-[0_0_40px_rgba(0,242,255,0.2)] animate-in slide-in-from-right"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close details"
            >
              <span className="sr-only">Close</span>
              <span
                className="w-4 h-4"
                dangerouslySetInnerHTML={{ __html: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' }}
              />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROJECT_POSITIONS[project.name]?.color || "#8b8ca0" }} />
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-tighter">
                {project.status}
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{project.name}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

            {/* Branch tree visualization */}
            {branches.length > 0 && (
              <div className="mb-6">
                <h4 className="font-mono font-semibold text-xs text-accent uppercase tracking-tighter mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent" />
                  Project Branches
                </h4>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-accent/30" />
                  {branches.map((tag, i) => (
                    <div key={tag} className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                      <div className="w-1 h-px bg-accent/30" />
                      <span className="text-xs font-mono text-muted/90">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded border border-border/60 text-[10px] font-mono text-muted/70 bg-black/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.repo ? (
                <Link
                  href={project.repo}
                  className="flex items-center gap-2 btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Code
                </Link>
              ) : (
                <span className="px-3 py-1.5 rounded border border-solid border-accent/30 text-xs font-inter text-accent/60">
                  Code · private
                </span>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  className="flex items-center gap-2 btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Live
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  className="flex items-center gap-2 btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Demo
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
