"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SphereGeometry, BoxGeometry, BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial, PointsMaterial } from "three";
import * as THREE from "three";
import { facts } from "@/data/facts";
import Link from "next/link";

type ProjectCategory = "agents" | "infrastructure" | "full-stack";

const CATEGORY_STYLE: Record<ProjectCategory, { label: string; color: string }> = {
  agents: { label: "Agents & LLM", color: "#bc13fe" },
  infrastructure: { label: "Infrastructure", color: "#00f2ff" },
  "full-stack": { label: "Full-stack", color: "#00ff88" },
};

const PROJECT_META: Record<string, {
  category: ProjectCategory;
  size: "small" | "medium" | "large";
  status: "live" | "public" | "private" | "planned";
}> = {
  AgentDine: { category: "agents", size: "large", status: "private" },
  "kube-triage": { category: "infrastructure", size: "large", status: "public" },
  "OpenAI LLM Gateway": { category: "agents", size: "medium", status: "live" },
  "Algorithmic trading engine": { category: "full-stack", size: "medium", status: "planned" },
  "D&Z Cartique": { category: "full-stack", size: "medium", status: "live" },
  QLSS: { category: "infrastructure", size: "medium", status: "public" },
};

const PROJECT_POSITIONS: Record<string, { x: number; y: number; z: number }> = {
  AgentDine: { x: -3, y: 2, z: -3 },
  "kube-triage": { x: 3, y: 1, z: -3 },
  "OpenAI LLM Gateway": { x: 0, y: 2.5, z: -4 },
  "Algorithmic trading engine": { x: -3, y: -1, z: 0 },
  "D&Z Cartique": { x: 3, y: -0.5, z: 1 },
  QLSS: { x: 0, y: -2, z: 2 },
};

const PROJECT_TAGS: Record<string, string[]> = {
  AgentDine: ["LangGraph", "Groq", "Llama 3.3", "WhatsApp", "PostgreSQL", "Redis"],
  "kube-triage": ["Kubernetes", "MCP", "LangGraph", "RBAC", "Fault Injection", "Eval"],
  "OpenAI LLM Gateway": ["Rate Limiting", "SSE", "Token Bucket", "Prometheus", "Grafana", "CI"],
  "Algorithmic trading engine": ["Execution Engine", "Risk Manager", "Replay", "Walk-Forward", "Eligibility Rules"],
  "D&Z Cartique": ["React", "Firebase", "Firestore", "E-commerce", "Cash on Delivery"],
  QLSS: ["Flutter", "Firebase", "Queue Management", "Booking", "University"],
};

const SIZE_RADIUS: Record<string, number> = { small: 0.25, medium: 0.35, large: 0.5 };

const DEFAULT_SELECTED = "AgentDine";

function ProjectNode({ name, x, y, z, onSelect }: { name: string; x: number; y: number; z: number; onSelect: (name: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const meta = PROJECT_META[name];
  const style = CATEGORY_STYLE[meta.category];
  const isPlanned = meta.status === "planned";
  const radius = SIZE_RADIUS[meta.size] * (isPlanned ? 0.8 : 1);

  const geometry = new SphereGeometry(radius, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: style.color,
    emissive: style.color,
    emissiveIntensity: hovered ? 1 : isPlanned ? 0.15 : 0.3,
    transparent: true,
    opacity: isPlanned ? 0.5 : 0.9,
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = y + Math.sin(time + x) * 0.15;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 2 + y) * 0.05);
    if (isPlanned) {
      material.opacity = 0.4 + Math.sin(time * 2) * 0.1;
    }
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

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    velocities[i / 3] = Math.random() * 0.02 + 0.01;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({ size: 0.03, color: 0x00f2ff, transparent: true, opacity: 0.5 });

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      posAttr.setY(i, y + velocities[i]);
      if (y > 12) posAttr.setY(i, -12);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function ConnectionLines({ centerX, centerY, centerZ }: { centerX: number; centerY: number; centerZ: number }) {
  const linesRef = useRef<THREE.Line>(null);
  const nodeCount = 12;
  const positions: number[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 6;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + (Math.random() - 0.5) * 4;
    const z = centerZ + Math.sin(angle) * radius;
    positions.push(centerX, centerY, centerZ, x, y, z);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new LineBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.2 });

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
  });

  return linesRef.current ? <primitive object={linesRef.current} /> : null;
}

function HolographicCube({ color = 0x00f2ff }: { color?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef(new BoxGeometry(1.2, 1.2, 1.2));
  const matRef = useRef(
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
    })
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.z = time * 0.2;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
  });

  return (
    <mesh ref={meshRef} geometry={geoRef.current} material={matRef.current} castShadow>
      <pointLight position={[0, 0, 2]} intensity={0.5} color={color} />
    </mesh>
  );
}

export function ProjectGalaxy() {
  const [selected, setSelected] = useState<string | null>(DEFAULT_SELECTED);
  const project = selected ? facts.projects.find((p) => p.name === selected) : null;
  const branches = project ? PROJECT_TAGS[project.name] ?? [] : [];

  const positions = facts.projects.map((p) => PROJECT_POSITIONS[p.name] || { x: 0, y: 0, z: -5 });

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="section-header mb-8">
          <h2 className="text-heading text-foreground mb-2">Project Galaxy</h2>
          <p className="text-subhead text-muted/70">Interactive constellation of built systems. Click a node to open details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graph container */}
          <div className="h-[320px] md:h-[400px] lg:h-[700px] rounded-2xl border border-border/50 bg-black/30 backdrop-blur-sm relative overflow-hidden">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} shadows dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
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
                    onSelect={setSelected}
                  />
                );
              })}
              <HolographicCube color={0x00f2ff} />
              <ParticleField />
            </Canvas>
          </div>

          {/* Selected project detail panel - desktop only */}
          {selected && project && (
            <div className="hidden lg:block glass p-6 rounded-xl border border-accent/50 shadow-[0_0_40px_rgba(0,242,255,0.2)] overflow-y-auto max-h-[calc(100vh-8rem)]">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close details"
              >
                <span className="sr-only">Close</span>
                <span className="w-4 h-4" dangerouslySetInnerHTML={{ __html: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' }} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_STYLE[PROJECT_META[project.name]?.category ?? "infrastructure"].color }} />
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-tighter">{project.status === "planned" ? "planned" : project.status}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{project.name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

              {branches.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-mono font-semibold text-xs text-accent uppercase tracking-tighter mb-2 flex items-center gap-1">
                    <span className="w-1 h-3 bg-accent" />Project Branches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {branches.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded border border-border/60 text-[10px] font-mono text-muted/70 bg-black/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {project.repo ? (
                  <Link href={project.repo} className="flex items-center gap-2 btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Open Code</Link>
                ) : (
                  <span className="px-3 py-1.5 rounded border border-solid border-accent/30 text-xs font-inter text-accent/60">Code · private</span>
                )}
                {project.live && (
                  <Link href={project.live} className="flex items-center gap-2 btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Open Live</Link>
                )}
              </div>
            </div>
          )}

          {/* Project chips below canvas - always visible, tap to select */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2 justify-center bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
            {facts.projects.map((proj) => {
              const meta = PROJECT_META[proj.name];
              const st = CATEGORY_STYLE[meta.category];
              const isSelected = selected === proj.name;
              const isPlanned = meta.status === "planned";
              const shadow = isSelected ? { boxShadow: `0 0 12px ${st.color}40` } : undefined;
              return (
                <button
                  key={proj.name}
                  onClick={() => setSelected(proj.name)}
                  className={
                    "px-2 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-tighter border transition-all duration-200 " +
                    (isSelected
                      ? "text-accent border-accent bg-accent/20 shadow-[0_0_12px_rgba(0,242,255,0.3)]"
                      : isPlanned
                      ? "text-muted/60 border-muted/30 bg-muted/10 hover:text-muted hover:border-muted/50"
                      : "text-muted/80 border-border/50 bg-black/40 hover:text-foreground hover:border-accent/50")
                  }
                  style={shadow}
                >
                  {proj.name}
                </button>
              );
            })}
          </div>

          {/* Mobile detail panel */}
          {selected && project && (
            <div className="block lg:hidden glass p-6 rounded-xl border border-accent/50 shadow-[0_0_40px_rgba(0,242,255,0.2)] overflow-y-auto max-h-[calc(100vh-8rem)] mt-4">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs text-foreground hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close details"
              >
                <span className="sr-only">Close</span>
                <span className="w-4 h-4" dangerouslySetInnerHTML={{ __html: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' }} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_STYLE[PROJECT_META[project.name]?.category ?? "infrastructure"].color }} />
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-tighter">{project.status === "planned" ? "planned" : project.status}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{project.name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

              {branches.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-mono font-semibold text-xs text-accent uppercase tracking-tighter mb-2 flex items-center gap-1">
                    <span className="w-1 h-3 bg-accent" />Project Branches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {branches.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded border border-border/60 text-[10px] font-mono text-muted/70 bg-black/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {project.repo ? (
                  <Link href={project.repo} className="flex items-center gap-2 btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Open Code</Link>
                ) : (
                  <span className="px-3 py-1.5 rounded border border-solid border-accent/30 text-xs font-inter text-accent/60">Code · private</span>
                )}
                {project.live && (
                  <Link href={project.live} className="flex items-center gap-2 btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Open Live</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
