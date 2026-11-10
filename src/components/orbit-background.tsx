"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export function OrbitBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f2ff" />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#bc13fe" />
      </Canvas>
    </div>
  );
}
