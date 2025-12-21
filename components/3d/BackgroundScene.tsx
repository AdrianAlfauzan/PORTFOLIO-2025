// components/3d/BackgroundScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

// Atau alternatif yang lebih simple tanpa custom particles:
function SimpleParticles() {
  return (
    <points>
      <sphereGeometry args={[20, 32, 32]} />
      <pointsMaterial size={0.1} color="#8b5cf6" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function FloatingShapes() {
  return (
    <>
      {/* Large floating sphere - subtle glow */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[5, 2, -10]} scale={3}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      </Float>

      {/* Medium torus knot */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-6, -1, -8]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} transparent opacity={0.3} roughness={0.4} metalness={0.6} />
        </mesh>
      </Float>

      {/* Small icosahedron */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4, -3, -5]}>
          <icosahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} transparent opacity={0.4} roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>

      {/* Wireframe cube */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[-3, 3, -12]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

          {/* Sky/Background */}
          <color attach="background" args={["#0a0a0a"]} />
          <fog attach="fog" args={["#0a0a0a", 10, 25]} />

          {/* Stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

          {/* Sparkles */}
          <Sparkles count={100} scale={20} size={0.5} speed={0.2} color="#ffffff" opacity={0.3} />

          {/* Subtle particles - gunakan yang simple */}
          <SimpleParticles />

          {/* Floating shapes */}
          <FloatingShapes />

          {/* Ambient lighting */}
          <ambientLight intensity={0.3} color="#3b82f6" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#10b981" />

          {/* Auto-rotate controls (subtle) */}
          {typeof window !== "undefined" && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI} minPolarAngle={0} />}
        </Suspense>
      </Canvas>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
    </div>
  );
}
