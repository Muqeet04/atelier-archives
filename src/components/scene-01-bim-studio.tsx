"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { soundSynth } from "@/utils/sound-synth";
import {
  Sparkles,
  Layers,
  Compass,
  Maximize2,
  Sun,
  Sunset,
  Moon,
  Building,
  ShieldCheck,
  CheckCircle2,
  Download,
  Calendar,
  Eye,
  Sliders,
  Radio,
  FileText
} from "lucide-react";
import type { LightingMode } from "@/components/three/luxury-estate-model";

// Dynamic import for the 3D Luxury Estate Model
const LuxuryEstateViewer = dynamic(
  () => import("@/components/three/luxury-estate-model").then((mod) => mod.LuxuryEstateViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[550px] lg:min-h-[650px] rounded-3xl flex items-center justify-center bg-[var(--surface-glass)] border border-[var(--border-gold)]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-9 h-9 rounded-full border-2 border-[var(--accent-champagne)] border-t-transparent animate-spin" />
          <span className="font-mono text-xs text-[var(--accent-champagne)] tracking-widest uppercase">
            Initializing 3D Spatial Digital Twin...
          </span>
        </div>
      </div>
    ),
  }
);

export function Scene01BimStudio() {
  const { openConsultation } = useEstate();
  const [lightingMode, setLightingMode] = useState<LightingMode>("daylight");
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);

  const floorLevels = [
    { id: "all", label: "ALL LEVELS", tag: "Complete Structure" },
    { id: "rooftop", label: "L3 • ROOFTOP SKY POOL", tag: "Pool & Helipad" },
    { id: "master", label: "L2 • MASTER WING", tag: "Sovereign Suite" },
    { id: "salon", label: "L1 • GRAND SALON", tag: "Reception & Cellar" },
    { id: "subterranean", label: "L0 • WATERFRONT PODIUM", tag: "6-Car Gallery & Berth" },
  ];

  return (
    <section
      id="bim-studio"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-estate-noir)] border-t border-[var(--border-gold)] overflow-hidden transition-colors duration-500"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,134,11,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-4">
              <Compass className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
                [ • ATELIER BIM STUDIO — 3D SPATIAL DIGITAL TWIN ]
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-champagne)] to-[var(--accent-secondary)]">Spatial Architecture.</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl font-light leading-relaxed">
              Explore the architectural anatomy of our flagship cantilevered villa. Inspect structural glass facades, illuminated infinity pools, and subterranean berths in full 360° spatial fidelity.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-4 p-3 rounded-2xl bg-[var(--surface-glass)] border border-[var(--border-gold)] backdrop-blur-xl shadow-sm">
            <div>
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">SCALE</span>
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">1:1 Millimetric BIM</span>
            </div>
            <div className="h-6 w-px bg-black/10" />
            <div>
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">HOTSPOTS</span>
              <span className="text-xs font-mono font-semibold text-[var(--accent-champagne)]">4 Interactive Nodes</span>
            </div>
            <div className="h-6 w-px bg-black/10" />
            <div>
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">FPS / RENDERING</span>
              <span className="text-xs font-mono font-semibold text-emerald-600">60 FPS WebGL</span>
            </div>
          </div>
        </div>

        {/* 3D STUDIO MAIN STAGE (Grid: 8 Cols Viewer + 4 Cols Architectural Telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3D INTERACTIVE CANVAS VIEWPORT & CONTROLS (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Toolbar: Lighting Modes + Floor Level Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[var(--surface-glass)] border border-[var(--border-gold)] backdrop-blur-xl shadow-sm">
              {/* Floor Level Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {floorLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      soundSynth.playClick();
                      setActiveLevel(lvl.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                      activeLevel === lvl.id
                        ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-md"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* Lighting Mode Buttons */}
              <div className="flex items-center space-x-1 bg-black/[0.04] p-1 rounded-xl border border-[var(--border-gold)] ml-auto">
                <button
                  onClick={() => {
                    soundSynth.playHover();
                    setLightingMode("daylight");
                  }}
                  title="Daylight Modern"
                  className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                    lightingMode === "daylight"
                      ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundSynth.playHover();
                    setLightingMode("golden");
                  }}
                  title="Golden Hour"
                  className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                    lightingMode === "golden"
                      ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Sunset className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundSynth.playHover();
                    setLightingMode("twilight");
                  }}
                  title="Twilight Noir"
                  className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                    lightingMode === "twilight"
                      ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundSynth.playHover();
                    setLightingMode("blueprint");
                  }}
                  title="Structural Blueprint"
                  className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                    lightingMode === "blueprint"
                      ? "bg-[#0284C7] text-white font-semibold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The 3D Canvas Box */}
            <div className="relative w-full h-[540px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-gold)] bg-white">
              <LuxuryEstateViewer
                lightingMode={lightingMode}
                activeLevel={activeLevel}
                selectedHotspot={selectedHotspot}
                onSelectHotspot={(h) => setSelectedHotspot(h)}
                onCloseHotspot={() => setSelectedHotspot(null)}
              />
            </div>
          </div>

          {/* RIGHT: ARCHITECTURAL TELEMETRY & SPECIFICATIONS DOSSIER (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Key Dimension & Engineering Specs Card */}
            <div className="p-6 rounded-3xl bg-[var(--surface-glass)] border border-[var(--border-gold)] backdrop-blur-xl shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-gold)] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent-champagne)] uppercase tracking-widest block font-semibold">
                    ARCHITECTURAL BLUEPRINT
                  </span>
                  <h3 className="font-serif text-lg text-[var(--text-primary)] font-medium mt-0.5">
                    Villa Solaria Cantilever
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[var(--border-gold)]/20 border border-[var(--border-gold)] flex items-center justify-center text-[var(--accent-champagne)]">
                  <Building className="w-4 h-4" />
                </div>
              </div>

              {/* Spec Rows */}
              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Total Built Area</span>
                  <span className="text-[var(--text-primary)] font-semibold">14,200 Sq Ft (1,320 m²)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Ceiling Heights</span>
                  <span className="text-[var(--text-primary)] font-semibold">7.5m Grand Salon</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Glazing Ratio</span>
                  <span className="text-[var(--text-primary)] font-semibold">68% Acoustic Structural Glass</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Infinity Pool</span>
                  <span className="text-cyan-600 font-semibold">25m Heated Saltwater</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Aviation Clearance</span>
                  <span className="text-[var(--accent-champagne)] font-semibold">H160 Helipad Certified</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-[var(--border-gold)]/50">
                  <span className="text-[var(--text-muted)]">Energy Grid</span>
                  <span className="text-emerald-600 font-semibold">Tesla Solar + 120kWh Battery</span>
                </div>
              </div>

              {/* Material Palette Tags */}
              <div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                  CURATED MATERIAL PALETTE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Grigio Alpi Travertine",
                    "Acoustic Triple Glazing",
                    "Teak Maritime Decks",
                    "Titanium Zinc Fascia",
                    "Matte Carbon",
                  ].map((mat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-black/[0.03] border border-[var(--border-gold)] text-[10px] font-mono text-[var(--text-primary)]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => openConsultation("villa")}
                  className="w-full py-3 rounded-xl bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white font-mono text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>SCHEDULE SPATIAL ON-SITE TOUR</span>
                </button>

                <button
                  onClick={() => {
                    soundSynth.playChime();
                    alert("Architectural BIM Dossier (CAD/BIM Package & High-Res Floor Plans) downloaded under NDA ID: AA-BIM-2026.");
                  }}
                  className="w-full py-2.5 rounded-xl border border-[var(--border-gold)] hover:bg-black/5 text-[var(--text-primary)] font-mono text-xs tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                  <span>DOWNLOAD BIM SPECIFICATION DOSSIER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
