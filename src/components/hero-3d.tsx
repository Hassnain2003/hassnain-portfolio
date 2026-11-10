"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry, SphereGeometry, TorusKnotGeometry, IcosahedronGeometry, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute } from "three";
import * as THREE from "three";
import { facts } from "@/data/facts";

function FloatingObject({ type, color, speed = 1 }: { type: string; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.BufferGeometry | null>(null);
  if (!geoRef.current) {
    switch (type) {
      case "cube": geoRef.current = new BoxGeometry(0.8, 0.8, 0.8); break;
      case "sphere": geoRef.current = new SphereGeometry(0.6, 32, 32); break;
      case "knot": geoRef.current = new TorusKnotGeometry(0.4, 0.2, 64, 16); break;
      default: geoRef.current = new IcosahedronGeometry(0.7, 0);
    }
  }
  const matRef = useRef(new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, transparent: true, opacity: 0.8 }));

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * speed) * 0.3;
  });

  return (
    <mesh ref={meshRef} geometry={geoRef.current} material={matRef.current} castShadow>
      <pointLight position={[0, 0, 2]} intensity={0.5} />
    </mesh>
  );
}

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({ size: 0.02, color: 0x00f2ff, transparent: true, opacity: 0.6 });

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function Hero3D() {
  const contactBtn = (href: string, label: string) => (
    <a
      href={href}
      className="btn btn-primary"
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
    >
      {label}
    </a>
  );

  return (
    <section id="hero" className="section pt-20 pb-32 border-b-0 relative overflow-hidden">
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

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-start gap-6 max-w-4xl">
        <div className="flex items-center gap-3 mt-6">
          <div
            className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[10px] font-bold">HA</span>
          </div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-foreground leading-tight mb-4">
          Hassnain<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-2 to-white"> Abbas</span>
        </h1>

        <div className="relative max-w-xl h-96 md:h-[400px]">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f2ff" />
            <pointLight position={[-10, -10, 10]} intensity={0.6} color="#bc13fe" />
            <FloatingObject type="knot" color="#00f2ff" speed={1} />
            <FloatingObject type="icosahedron" color="#bc13fe" speed={0.7} />
            <ParticleSystem />
          </Canvas>
        </div>

        <p className="mt-6 text-lg text-muted max-w-2xl font-inter leading-relaxed">
          I build LLM agents and the infrastructure they run on — LangGraph, MCP,
          Kubernetes, rate-limited gateways, and fault-injection tested systems.
          Final-year BS IT student at Bahria University Islamabad, graduating
          January 2027.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {contactBtn(facts.links.resume || "#resume", "Resume")}
          {contactBtn(facts.links.github, "GitHub")}
          {contactBtn(facts.links.linkedin, "LinkedIn")}
          {contactBtn(`mailto:${facts.links.email}`, "Email")}
        </div>
      </div>
    </section>
  );
}
