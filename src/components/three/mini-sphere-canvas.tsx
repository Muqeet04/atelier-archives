"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MiniSphereProps {
  color: string;
  isHovered?: boolean;
}

function InnerMiniSphere({ color, isHovered }: MiniSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.6);
      meshRef.current.rotation.x += delta * (isHovered ? 0.8 : 0.3);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (isHovered ? 2.0 : 0.8);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} color="#FFFFFF" />
      <pointLight color={color} intensity={isHovered ? 4 : 2} distance={5} />

      {/* Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.6 : 0.9}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.03, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.7 : 0.3} />
      </mesh>
    </group>
  );
}

export function MiniSphereCanvas({
  color,
  isHovered = false,
  className = "w-20 h-20",
}: {
  color: string;
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <InnerMiniSphere color={color} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
