// components/3d/BackgroundScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[5, 2, -10]} scale={3}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-6, -1, -8]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} transparent opacity={0.3} roughness={0.4} metalness={0.6} />
        </mesh>
      </Float>
    </>
  );
}

export default function BackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Jeda render saat tidak terlihat
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <Canvas frameloop={isVisible ? "always" : "never"}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <color attach="background" args={["#0a0a0a"]} />
          <fog attach="fog" args={["#0a0a0a", 10, 25]} />

          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
          <Sparkles count={50} scale={20} size={0.5} speed={0.2} color="#ffffff" opacity={0.3} />

          <FloatingShapes />

          <ambientLight intensity={0.3} color="#3b82f6" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#10b981" />

          {typeof window !== "undefined" && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false} // ← nonaktifkan interaksi
              autoRotate={false} // ← nonaktifkan auto-rotate
              enableDamping={false}
            />
          )}
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
    </div>
  );
}
