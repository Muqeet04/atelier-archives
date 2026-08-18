"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEstate } from "@/context/estate-context";
import { ESTATE_TIERS, EstateTier } from "@/data/estate-data";
import { soundSynth } from "@/utils/sound-synth";

// Starfield & Champagne Particle Mist
function StarfieldMist({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const color1 = new THREE.Color("#D4AF37"); // Champagne Gold
    const color2 = new THREE.Color("#FFFFFF"); // Platinum White
    const color3 = new THREE.Color("#4A5568"); // Deep Slate

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spread
      const radius = 12 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Color distribution
      const rand = Math.random();
      const mixedColor = rand > 0.6 ? color1 : rand > 0.25 ? color2 : color3;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      sca[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, col, sca];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glowing Central Platinum Core
function CentralCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.25;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.2;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.35;
      ring3Ref.current.rotation.x -= delta * 0.2;
    }
    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Warm Platinum Core Sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#FFFDF5"
          emissive="#D4AF37"
          emissiveIntensity={1.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Halo Glow */}
      <mesh>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>

      {/* Orbiting Architectural Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#E2E8F0" emissive="#FFFFFF" emissiveIntensity={0.6} metalness={0.8} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.025, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} metalness={0.9} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.4, 0.02, 16, 100]} />
        <meshStandardMaterial color="#94A3B8" emissive="#38BDF8" emissiveIntensity={0.4} metalness={0.7} />
      </mesh>

      {/* Core Point Light */}
      <pointLight color="#FFF3D4" intensity={4} distance={15} decay={2} />
    </group>
  );
}

// Single Orbiting Luxury Asset Sphere
interface OrbitingSphereProps {
  tier: EstateTier;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  orbitTilt: number;
  onSelect: (tier: EstateTier) => void;
}

function OrbitingSphere({
  tier,
  orbitRadius,
  orbitSpeed,
  initialAngle,
  orbitTilt,
  onSelect,
}: OrbitingSphereProps) {
  const sphereGroupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const { setHoveredOrbTier, hoveredOrbTier, formatPrice } = useEstate();

  useFrame((state) => {
    const time = state.clock.elapsedTime * orbitSpeed + initialAngle;
    const x = Math.cos(time) * orbitRadius;
    const z = Math.sin(time) * orbitRadius;
    const y = Math.sin(time * 2) * (orbitTilt * 1.5);

    if (sphereGroupRef.current) {
      sphereGroupRef.current.position.set(x, y, z);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }

    if (haloRef.current) {
      const pulse = isHovered ? 1.4 : 1.15 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    setHoveredOrbTier(tier.id);
    soundSynth.playHover();
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    setHoveredOrbTier(null);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "auto";
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    soundSynth.playClick();
    onSelect(tier);
  };

  return (
    <group ref={sphereGroupRef}>
      {/* The Asset Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={tier.accentColor}
          emissive={tier.accentColor}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Orbital Halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshBasicMaterial
          color={tier.accentColor}
          transparent
          opacity={isHovered ? 0.45 : 0.18}
          wireframe
        />
      </mesh>

      {/* Point Light per Sphere */}
      <pointLight
        color={tier.accentColor}
        intensity={isHovered ? 3.5 : 1.5}
        distance={6}
        decay={2}
      />

      {/* Floating HUD Telemetry Tooltip */}
      {isHovered && (
        <Html
          position={[0, 0.9, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none select-none transition-all duration-300"
        >
          <div className="bg-[#030407]/95 border border-[#D4AF37]/40 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl min-w-[200px] text-left transform -translate-y-2">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                TIER {tier.number}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tier.accentColor, boxShadow: `0 0 8px ${tier.accentColor}` }}
              />
            </div>
            <div className="text-xs font-serif font-medium text-white tracking-wide">
              {tier.name}
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10 text-[11px] font-mono">
              <span className="text-white/60">Starting:</span>
              <span className="text-[#D4AF37] font-semibold">{formatPrice(tier.startingPriceUSD)}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mt-0.5">
              <span className="text-white/40">Yield:</span>
              <span>{tier.estimatedYield}</span>
            </div>
            <div className="mt-2 text-[9px] font-mono text-center tracking-wider text-white/50 bg-white/5 py-0.5 rounded">
              CLICK TO VIEW DOSSIER ➔
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Scene Root with Camera Parallax Tilt
function SceneContent() {
  const { openDossier } = useEstate();
  const { mouse } = useThree();
  const sceneGroupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (sceneGroupRef.current) {
      // Subtle smooth parallax tilt following mouse
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -mouse.y * 0.15,
        0.05
      );
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        mouse.x * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#FFF5E6" />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} color="#38BDF8" />

      {/* Deep Space Starfield & Mist */}
      <StarfieldMist count={1400} />

      {/* Central Platinum Core */}
      <CentralCore />

      {/* 4 Orbiting Luxury Spheres */}
      {ESTATE_TIERS.map((tier, idx) => {
        const orbitConfigs = [
          { radius: 4.8, speed: 0.28, angle: 0, tilt: 0.35 },
          { radius: 6.2, speed: 0.22, angle: (Math.PI / 2) * 1.3, tilt: -0.4 },
          { radius: 7.6, speed: 0.18, angle: Math.PI * 1.1, tilt: 0.25 },
          { radius: 9.0, speed: 0.14, angle: Math.PI * 1.7, tilt: -0.3 },
        ];
        const cfg = orbitConfigs[idx];

        return (
          <OrbitingSphere
            key={tier.id}
            tier={tier}
            orbitRadius={cfg.radius}
            orbitSpeed={cfg.speed}
            initialAngle={cfg.angle}
            orbitTilt={cfg.tilt}
            onSelect={(selectedTier) => openDossier(selectedTier)}
          />
        );
      })}
    </group>
  );
}

export function EstateCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.5, 13.5], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
