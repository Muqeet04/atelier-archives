"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { soundSynth } from "@/utils/sound-synth";
import {
  Sparkles,
  Layers,
  Eye,
  Info,
  Maximize2,
  Sun,
  Moon,
  Sunset,
  Box,
  Compass,
  CheckCircle2,
  X
} from "lucide-react";

export type LightingMode = "twilight" | "golden" | "daylight" | "blueprint";

interface Hotspot {
  id: string;
  title: string;
  level: string;
  position: [number, number, number];
  specs: string;
  features: string[];
}

const ESTATE_HOTSPOTS: Hotspot[] = [
  {
    id: "rooftop",
    title: "Cantilevered Sky Pool & Helipad",
    level: "Level 03 — Rooftop Oasis",
    position: [0.8, 3.4, 0.4],
    specs: "25m Saltwater Heated Pool • H160 Certified Aviation Deck",
    features: ["Aviation landing perimeter LED array", "Frameless structural acoustic glass", "Private sky bar with teppanyaki lounge"]
  },
  {
    id: "master",
    title: "Master Sovereign Suite",
    level: "Level 02 — Private Wing",
    position: [-1.4, 2.1, 0.6],
    specs: "2,800 Sq Ft Master Wing • Dual Italian Marble Spas",
    features: ["Biometric reinforced security portal", "Wraparound cantilevered morning terrace", "Custom Poliform walk-in dressing atelier"]
  },
  {
    id: "salon",
    title: "Grand Salon & Wine Sanctuary",
    level: "Level 01 — Reception Level",
    position: [1.2, 0.9, -0.4],
    specs: "7.5m Triple-Height Glass Facade • 800-Bottle Cellar",
    features: ["Grigio Alpi heated travertine slabs", "Sub-Zero & Gaggenau culinary suite", "Floor-to-ceiling motorized sliding glass walls"]
  },
  {
    id: "subterranean",
    title: "Subterranean Gallery & Marina Berth",
    level: "Level 00 — Waterfront Podium",
    position: [-0.6, -0.5, 1.4],
    specs: "6-Supercar Biometric Gallery • Deep-Water Yacht Slipway",
    features: ["Reinforced anti-surge maritime foundation", "Private EV 350kW ultra-fast charging", "Submerged underwater observation portal"]
  }
];

// Water surface shader for infinity pool
function PoolWater() {
  const waterRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <mesh ref={waterRef} position={[1.4, 3.25, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.8, 1.2]} />
      <meshStandardMaterial
        color="#06B6D4"
        emissive="#0891B2"
        emissiveIntensity={0.8}
        roughness={0.08}
        metalness={0.9}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

// 3D Architectural Villa Model (Procedural High-Precision Luxury Architecture)
export function ArchitecturalVilla({
  lightingMode = "twilight",
  activeLevel = "all",
  onSelectHotspot,
  selectedHotspotId,
}: {
  lightingMode: LightingMode;
  activeLevel: string;
  onSelectHotspot: (h: Hotspot) => void;
  selectedHotspotId: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  // Colors based on lighting mode
  const theme = useMemo(() => {
    switch (lightingMode) {
      case "golden":
        return {
          wallColor: "#EADCC9",
          wallEmissive: "#5C3A1E",
          glassColor: "#F59E0B",
          glassEmissive: "#D97706",
          woodColor: "#78350F",
          travertine: "#E2D3B8",
          wireframe: false,
        };
      case "daylight":
        return {
          wallColor: "#F8FAFC",
          wallEmissive: "#334155",
          glassColor: "#38BDF8",
          glassEmissive: "#0284C7",
          woodColor: "#9A3412",
          travertine: "#E2E8F0",
          wireframe: false,
        };
      case "blueprint":
        return {
          wallColor: "#0284C7",
          wallEmissive: "#0369A1",
          glassColor: "#38BDF8",
          glassEmissive: "#0EA5E9",
          woodColor: "#0369A1",
          travertine: "#0C4A6E",
          wireframe: true,
        };
      case "twilight":
      default:
        return {
          wallColor: "#1E2230",
          wallEmissive: "#D4AF37",
          glassColor: "#FEF08A",
          glassEmissive: "#F59E0B",
          woodColor: "#451A03",
          travertine: "#181D2A",
          wireframe: false,
        };
    }
  }, [lightingMode]);

  // Subtle slow rotation
  useFrame((_, delta) => {
    if (groupRef.current && !selectedHotspotId) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  const isLevelVisible = (levelNum: number) => {
    if (activeLevel === "all") return true;
    if (activeLevel === "rooftop" && levelNum === 3) return true;
    if (activeLevel === "master" && levelNum === 2) return true;
    if (activeLevel === "salon" && levelNum === 1) return true;
    if (activeLevel === "subterranean" && levelNum === 0) return true;
    return false;
  };

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={1.1}>
      {/* ======================================================== */}
      {/* LEVEL 00: PODIUM BASE, MARINA DECK & WATER REFLECTION */}
      {/* ======================================================== */}
      <group visible={isLevelVisible(0)}>
        {/* Main Travertine Platform */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[7.2, 0.4, 5.4]} />
          <meshStandardMaterial
            color={theme.travertine}
            roughness={0.4}
            metalness={0.2}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Deep Water Marina Slipway / Basin */}
        <mesh position={[0, -0.9, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7.0, 1.8]} />
          <meshStandardMaterial
            color="#082F49"
            emissive="#0C4A6E"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Subterranean 6-Car Gallery Facade */}
        <mesh position={[-1.6, -0.3, 1.2]}>
          <boxGeometry args={[3.2, 0.8, 2.0]} />
          <meshStandardMaterial
            color={theme.wallColor}
            roughness={0.3}
            metalness={0.6}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Perimeter Warm LED Strip Light */}
        <mesh position={[0, -0.58, 2.68]}>
          <boxGeometry args={[7.15, 0.03, 0.03]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* LEVEL 01: GRAND RECEPTION SALON & TRIPLE-HEIGHT GLASS */}
      {/* ======================================================== */}
      <group visible={isLevelVisible(1)}>
        {/* Floor Slab */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[6.4, 0.2, 4.4]} />
          <meshStandardMaterial
            color={theme.travertine}
            roughness={0.3}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Main Salon Volume (Rear & Side solid walls) */}
        <mesh position={[-1.2, 0.85, -0.6]}>
          <boxGeometry args={[3.6, 1.1, 2.6]} />
          <meshStandardMaterial
            color={theme.wallColor}
            emissive={theme.wallEmissive}
            emissiveIntensity={0.1}
            roughness={0.3}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Front Panoramic Glass Facade */}
        <mesh position={[0.8, 0.85, 0.6]}>
          <boxGeometry args={[3.8, 1.1, 2.4]} />
          <meshStandardMaterial
            color={theme.glassColor}
            emissive={theme.glassEmissive}
            emissiveIntensity={lightingMode === "twilight" ? 1.4 : 0.4}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.55}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Teak Wood Outdoor Terrace Deck */}
        <mesh position={[1.8, 0.22, 1.6]}>
          <boxGeometry args={[2.4, 0.05, 1.4]} />
          <meshStandardMaterial
            color={theme.woodColor}
            roughness={0.6}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Architectural Slim Columns */}
        {[
          [-2.6, 0.85, 1.8],
          [2.8, 0.85, 1.8],
          [2.8, 0.85, -1.8],
          [-2.6, 0.85, -1.8],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <cylinderGeometry args={[0.04, 0.04, 1.1, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* LEVEL 02: CANTILEVERED MASTER SOVEREIGN WING */}
      {/* ======================================================== */}
      <group visible={isLevelVisible(2)}>
        {/* Floor Slab (Cantilevered over left edge) */}
        <mesh position={[-0.8, 1.5, 0.2]}>
          <boxGeometry args={[5.2, 0.2, 4.0]} />
          <meshStandardMaterial
            color={theme.travertine}
            roughness={0.3}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Master Suite Cantilevered Box */}
        <mesh position={[-1.6, 2.1, 0.3]}>
          <boxGeometry args={[3.2, 1.0, 3.2]} />
          <meshStandardMaterial
            color={theme.wallColor}
            emissive={theme.wallEmissive}
            emissiveIntensity={0.15}
            roughness={0.25}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Master Suite Wraparound Glass Facade */}
        <mesh position={[-1.2, 2.1, 1.2]}>
          <boxGeometry args={[2.2, 0.95, 1.2]} />
          <meshStandardMaterial
            color={theme.glassColor}
            emissive={theme.glassEmissive}
            emissiveIntensity={lightingMode === "twilight" ? 1.6 : 0.5}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.6}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Master Terrace Glass Railing */}
        <mesh position={[-1.6, 1.75, 2.05]}>
          <boxGeometry args={[3.1, 0.35, 0.02]} />
          <meshStandardMaterial color="#38BDF8" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* LEVEL 03: ROOFTOP SKY POOL, HELIPAD & LOUNGE */}
      {/* ======================================================== */}
      <group visible={isLevelVisible(3)}>
        {/* Rooftop Base Slab */}
        <mesh position={[0.2, 2.7, 0.1]}>
          <boxGeometry args={[4.8, 0.2, 3.6]} />
          <meshStandardMaterial
            color={theme.travertine}
            roughness={0.3}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Sky Lounge Enclosed Pavilion */}
        <mesh position={[-0.8, 3.2, -0.4]}>
          <boxGeometry args={[2.2, 0.8, 2.0]} />
          <meshStandardMaterial
            color={theme.glassColor}
            emissive={theme.glassEmissive}
            emissiveIntensity={lightingMode === "twilight" ? 1.5 : 0.4}
            roughness={0.1}
            transparent
            opacity={0.65}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Cantilevered Infinity Pool Trough */}
        <mesh position={[1.4, 3.05, 0.2]}>
          <boxGeometry args={[2.0, 0.5, 1.4]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.2}
            metalness={0.8}
            wireframe={theme.wireframe}
          />
        </mesh>

        {/* Shimmering Infinity Pool Water */}
        <PoolWater />

        {/* Helipad Marking on Roof Slab */}
        <mesh position={[-0.8, 2.82, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.75, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        <mesh position={[-0.8, 2.83, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>

        {/* Helipad Perimeter Beacon Light Points */}
        {[
          [-0.8 + 0.6, 2.85, 0.8],
          [-0.8 - 0.6, 2.85, 0.8],
          [-0.8, 2.85, 0.8 + 0.6],
          [-0.8, 2.85, 0.8 - 0.6],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 3D INTERACTIVE HOTSPOT PINS */}
      {/* ======================================================== */}
      {ESTATE_HOTSPOTS.map((hotspot) => {
        const isSelected = selectedHotspotId === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            {/* Pulsing Pin Ring */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                soundSynth.playClick();
                onSelectHotspot(hotspot);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                soundSynth.playHover();
                if (typeof document !== "undefined") document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                if (typeof document !== "undefined") document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry args={[0.12, 24, 24]} />
              <meshStandardMaterial
                color={isSelected ? "#D4AF37" : "#FFFFFF"}
                emissive={isSelected ? "#D4AF37" : "#38BDF8"}
                emissiveIntensity={isSelected ? 3.0 : 1.8}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing Orbit Ring */}
            <mesh>
              <torusGeometry args={[0.22, 0.015, 16, 32]} />
              <meshBasicMaterial
                color={isSelected ? "#D4AF37" : "#38BDF8"}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* 3D HTML Hotspot Label on hover/selection */}
            <Html
              position={[0, 0.35, 0]}
              center
              distanceFactor={8}
              className="pointer-events-none select-none transition-all duration-300"
            >
              <div
                className={`px-3 py-1.5 rounded-xl border backdrop-blur-md text-left transition-all duration-300 min-w-[160px] ${
                  isSelected
                    ? "bg-[#030407]/95 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    : "bg-[#090C15]/85 border-white/20 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>{hotspot.level.split(" — ")[0]}</span>
                </div>
                <div className="text-xs font-serif font-medium text-white truncate mt-0.5">
                  {hotspot.title}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// Complete 3D Architectural Scene Canvas Wrapper with Lighting and Orbit Controls
export function LuxuryEstateViewer({
  lightingMode = "twilight",
  activeLevel = "all",
  selectedHotspot,
  onSelectHotspot,
  onCloseHotspot,
}: {
  lightingMode: LightingMode;
  activeLevel: string;
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (h: Hotspot) => void;
  onCloseHotspot: () => void;
}) {
  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B0E18] via-[#05070C] to-[#020306] border border-white/10 shadow-2xl">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [7.5, 5.0, 8.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={5}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
          autoRotate={!selectedHotspot}
          autoRotateSpeed={0.6}
          dampingFactor={0.05}
        />

        {/* Dynamic Lighting Setup based on Lighting Mode */}
        {lightingMode === "golden" ? (
          <>
            <ambientLight intensity={0.8} color="#FEF3C7" />
            <directionalLight position={[10, 6, 8]} intensity={2.8} color="#F59E0B" castShadow />
            <directionalLight position={[-8, 4, -8]} intensity={0.8} color="#D97706" />
          </>
        ) : lightingMode === "daylight" ? (
          <>
            <ambientLight intensity={1.1} color="#FFFFFF" />
            <directionalLight position={[12, 14, 10]} intensity={3.0} color="#FFFFFF" castShadow />
            <directionalLight position={[-10, 8, -6]} intensity={1.0} color="#BAE6FD" />
          </>
        ) : lightingMode === "blueprint" ? (
          <>
            <ambientLight intensity={0.4} color="#0284C7" />
            <directionalLight position={[8, 10, 8]} intensity={1.5} color="#38BDF8" />
            <pointLight position={[0, 4, 0]} intensity={3} color="#0EA5E9" distance={15} />
          </>
        ) : (
          /* Twilight Noir (Default Ultra-Luxury Mood) */
          <>
            <ambientLight intensity={0.45} color="#1E293B" />
            <directionalLight position={[8, 12, 6]} intensity={1.4} color="#E2E8F0" />
            <directionalLight position={[-10, 5, -8]} intensity={0.7} color="#0369A1" />
            <pointLight position={[0.8, 1.2, 0.6]} intensity={3.5} color="#F59E0B" distance={10} />
            <pointLight position={[-1.2, 2.2, 1.0]} intensity={3.0} color="#D4AF37" distance={8} />
          </>
        )}

        {/* The 3D Villa Model */}
        <ArchitecturalVilla
          lightingMode={lightingMode}
          activeLevel={activeLevel}
          onSelectHotspot={onSelectHotspot}
          selectedHotspotId={selectedHotspot?.id || null}
        />
      </Canvas>

      {/* Top Left Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: "12s" }} />
          <span>3D BIM DIGITAL TWIN • 4K SPATIAL</span>
        </div>
      </div>

      {/* Bottom Floating Hotspot Detail Drawer if a Hotspot is selected */}
      {selectedHotspot && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#070A14]/95 border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                <span>{selectedHotspot.level}</span>
                <span>•</span>
                <span className="text-emerald-400">ARCHITECTURAL SPECIFICATION</span>
              </div>
              <h4 className="font-serif text-base sm:text-lg text-white font-medium mt-0.5">
                {selectedHotspot.title}
              </h4>
              <p className="text-xs font-mono text-white/70 mt-1">
                {selectedHotspot.specs}
              </p>
            </div>

            <button
              onClick={onCloseHotspot}
              className="w-7 h-7 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-xs text-white/80 font-light">
            {selectedHotspot.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orbit Helper Tip */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/50 pointer-events-none">
        <span>DRAG TO ROTATE • PINCH/SCROLL TO ZOOM</span>
      </div>
    </div>
  );
}
