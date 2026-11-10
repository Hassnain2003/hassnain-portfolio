 "use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry, SphereGeometry, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial } from "three";
import * as THREE from "three";
import Link from "next/link";
import { facts } from "@/data/facts";

const PROJECT_NODES = [
  { name: "AgentDine", x: -4, y: 2, z: -3, color: 0xbc13fe },
  { name: "kube-triage", x: 4, y: 1, z: -3, color: 0x00f2ff },
  { name: "OpenAI LLM Gateway", x: 0, y: 3, z: -5, color: 0x00ff88 },
  { name: "Algorithmic trading engine", x: -5, y: -1, z: 0, color: 0xffb000 },
  { name: "D&Z Cartique", x: 4, y: -1, z: 3, color: 0x00f2ff },
  { name: "QLSS", x: -1, y: -3, z: 4, color: 0x00ff88 },
];

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

function DataNode({ name, x, y, z, color, onPointerOver, onPointerOut }: { name: string; x: number; y: number; z: number; color: number; onPointerOver?: () => void; onPointerOut?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef(new SphereGeometry(0.15, 16, 16));
  const matRef = useRef(
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.9,
    })
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = y + Math.sin(time + x) * 0.2;
    meshRef.current.position.x = x + Math.cos(time * 0.7 + z) * 0.15;
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.6 + Math.sin(time * 3 + x) * 0.3;
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      geometry={geoRef.current}
      material={matRef.current}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
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

export function Hero3D() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const contactBtn = (href: string, label: string, variant: "primary" | "secondary" = "primary") => (
    <a
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-outline"}`}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
    >
      {label}
    </a>
  );

  return (
    <section id="hero" className="section pt-32 pb-40 border-b-0 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-2/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center gap-4 max-w-4xl">
        <div className="flex items-center gap-3 mt-4">
          <div
            className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[10px] font-bold">HA</span>
          </div>
          <span className="text-label text-muted uppercase tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <h1 className="text-heading text-foreground mb-4 text-center">
          Hassnain<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-2 to-white"> Abbas</span>
        </h1>

        <div className="relative w-full max-w-[500px] h-[500px] md:h-[600px] flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f2ff" />
            <pointLight position={[-10, -10, 10]} intensity={0.6} color="#bc13fe" />
            <pointLight position={[0, -10, 0]} intensity={0.4} color="#00ff88" />

            <ConnectionLines centerX={0} centerY={0} centerZ={0} />

            {PROJECT_NODES.map((node) => (
              <DataNode
                key={node.name}
                name={node.name}
                x={node.x}
                y={node.y}
                z={node.z}
                color={node.color}
                onPointerOver={() => setHoveredNode(node.name)}
                onPointerOut={() => setHoveredNode(null)}
              />
            ))}

            <HolographicCube color={0x00f2ff} />

            <ParticleField />
          </Canvas>
        </div>

        {hoveredNode && (
          <div className="mt-2 flex items-center gap-1 text-label text-accent font-mono">
            <span className="w-1 h-1 rounded-full bg-accent" />
            {hoveredNode}
          </div>
        )}

        <p className="mt-6 text-body text-muted/90 leading-relaxed text-center mx-auto max-w-[42rem]">
          <span className="block text-accent text-subhead font-sans font-semibold mb-2">
            I build LLM agents and the infrastructure they run on.
          </span>
          LangGraph, MCP, Kubernetes, rate-limited gateways, fault-injection tested systems.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {contactBtn("#projects", "View Work", "primary")}
          {contactBtn(facts.links.resume || "#resume", "Resume", "secondary")}
        </div>
      </div>
    </section>
  );
}
