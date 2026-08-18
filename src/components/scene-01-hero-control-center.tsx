"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { ESTATE_TIERS } from "@/data/estate-data";
import { soundSynth } from "@/utils/sound-synth";
import {
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  MapPin,
  Search,
  ArrowRight,
  Maximize2,
  Calendar,
  Layers,
  DollarSign,
  Compass,
  Film,
  Eye,
  Sliders
} from "lucide-react";
import Image from "next/image";

interface CinematicScene {
  id: string;
  title: string;
  location: string;
  tierName: string;
  price: string;
  specs: string;
  keyFeature: string;
  image: string;
  timecode: string;
  coords: string;
}

const CINEMATIC_SCENES: CinematicScene[] = [
  {
    id: "penthouse-reel",
    title: "The Horizon Crown Duplex",
    location: "Billionaires' Row, Manhattan",
    tierName: "Bespoke Penthouse Collection",
    price: "$14,800,000",
    specs: "8,450 Sq Ft • 5 Beds • 6.5 Baths",
    keyFeature: "Wraparound Skyline Terrace & Private Sky Pool",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=90",
    timecode: "00:01:24:18",
    coords: "40.7128° N, 74.0060° W"
  },
  {
    id: "villa-reel",
    title: "Villa Solaria di Positano",
    location: "Amalfi Coast & Cap d'Antibes",
    tierName: "Coastal & Hill Sanctuary",
    price: "$24,500,000",
    specs: "14,200 Sq Ft • 7 Beds • 9 Baths",
    keyFeature: "Private Deep-Water Superyacht Jetty & 3.2 Acre Cliff Estate",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=90",
    timecode: "00:02:45:09",
    coords: "43.7031° N, 7.2661° E"
  },
  {
    id: "island-reel",
    title: "Isla de la Palma Sovereign Atoll",
    location: "Exuma Cays, Bahamas",
    tierName: "Autonomous Sovereign Sanctuary",
    price: "$48,000,000",
    specs: "38,000 Sq Ft • 12 Beds • 16 Baths",
    keyFeature: "Private 1.4km Jet Runway, 80-Acre Private Sovereign Atoll",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=90",
    timecode: "00:03:12:22",
    coords: "24.2532° N, 77.6256° W"
  },
  {
    id: "offplan-reel",
    title: "The Luminar Tower Residences",
    location: "Minato, Tokyo & Dubai DIFC",
    tierName: "Off-Plan Alpha Portfolio",
    price: "$2,850,000",
    specs: "3,100 Sq Ft • 3 Beds • 3.5 Baths",
    keyFeature: "Q4 2027 Handover • 28% Expected Pre-Completion Alpha",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=90",
    timecode: "00:04:00:00",
    coords: "35.6762° N, 139.6503° E"
  }
];

export function Scene01HeroControlCenter() {
  const { openDossier, openConsultation, formatPrice } = useEstate();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [selectedAssetType, setSelectedAssetType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax zoom & fade transforms driven by user scrolling
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Video Reel Autoplay Loop (syncs every 6 seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSceneIndex((prev) => (prev + 1) % CINEMATIC_SCENES.length);
        setPlaybackProgress(0);
      }, 6000);

      progressInterval = setInterval(() => {
        setPlaybackProgress((prev) => Math.min(100, prev + 1.66));
      }, 100);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, activeSceneIndex]);

  // Scroll smoothly to any section
  const scrollToSection = (id: string) => {
    soundSynth.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentScene = CINEMATIC_SCENES[activeSceneIndex];

  return (
    <div
      ref={containerRef}
      id="scene-01"
      className="relative w-full min-h-[105vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#020204] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO-LIKE PARALLAX SCROLL BACKDROP */}
      {/* ========================================================================= */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentScene.image}
              alt={currentScene.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.65] contrast-[1.12]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Film Vignette & Lens Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-black/40 to-[#020204]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,4,0.85)_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-25" />

        {/* Anamorphic Widescreen Film Shutter Letterbox Bars */}
        <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-[#020204]/90 backdrop-blur-sm border-b border-white/[0.05]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-[#020204]/90 backdrop-blur-sm border-t border-white/[0.05]" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. CINEMATIC HUD OVERLAY (Camera Telemetry, Timecode, Rec Beacon) */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 sm:pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10 text-[11px] font-mono text-white/70">
          {/* Live Recording Beacon & Location */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-red-950/60 border border-red-500/30 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold tracking-widest text-[10px]">REC • 4K HDR</span>
            </div>

            <span className="text-white/40">|</span>
            <span className="text-[#D4AF37] font-semibold tracking-wider">
              {currentScene.timecode}
            </span>

            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/60 hidden sm:inline">{currentScene.coords}</span>
          </div>

          {/* Prime Global Real Estate Corridors */}
          <div className="hidden lg:flex items-center space-x-3 text-[10px] text-white/50 tracking-widest uppercase">
            <span>MANHATTAN</span>
            <span className="text-white/20">•</span>
            <span>MONACO</span>
            <span className="text-white/20">•</span>
            <span>DUBAI DIFC</span>
            <span className="text-white/20">•</span>
            <span>AMALFI COAST</span>
            <span className="text-white/20">•</span>
            <span>TOKYO</span>
            <span className="text-white/20">•</span>
            <span>BAHAMAS</span>
          </div>

          {/* Camera Telemetry */}
          <div className="flex items-center space-x-3 text-[10px] text-white/40">
            <span>SHUTTER: 1/48s</span>
            <span>•</span>
            <span>35mm T1.5</span>
            <span>•</span>
            <span>ACES PRO</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: LUXURY REAL ESTATE HEADLINE & FILM REEL CONTROLS */}
      {/* ========================================================================= */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end my-auto py-6"
      >
        {/* LEFT: REAL ESTATE HEADLINE, CURRENT SCENE DOSSIER & SEARCH (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                {currentScene.tierName}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Curating the World&apos;s <br className="hidden sm:inline" />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#D4AF37] to-[#E2E8F0]">
                Rarest Trophy Estates.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-light max-w-xl leading-relaxed">
              Explore four private sovereign acquisition tiers through cinematic drone sweeps, spatial 3D architectural digital twins, and encrypted escrow pathways.
            </p>
          </div>

          {/* CURRENT ACTIVE FILM PROPERTY DOSSIER CARD */}
          <div className="p-5 rounded-2xl bg-[#090C16]/85 border border-white/15 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
                  FEATURED SPOTLIGHT ESTATE
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium mt-0.5">
                  {currentScene.title}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                  VALUATION
                </span>
                <span className="font-mono text-lg sm:text-xl font-bold text-[#D4AF37]">
                  {currentScene.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="truncate">{currentScene.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{currentScene.specs}</span>
              </div>
            </div>

            {/* Key Feature Highlight */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-sans text-white/70 italic flex items-center justify-between">
              <span>“{currentScene.keyFeature}”</span>
              <span className="font-mono not-italic text-[10px] text-emerald-400 font-semibold uppercase shrink-0 ml-2">
                Verified Mandate
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollToSection("bim-studio")}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#F3CE5E] text-[#030407] font-mono text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/25"
              >
                <span>INSPECT 3D ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => openConsultation()}
                className="py-2.5 px-4 rounded-xl border border-white/15 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
              >
                REQUEST DOSSIER
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE CINEMATIC FILM REEL SCRUBBER (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Video Reel Header & Play/Pause */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#090C16]/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center space-x-2">
              <Film className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-mono text-xs tracking-widest text-white font-medium uppercase">
                ESTATE FILM REEL ({activeSceneIndex + 1}/4)
              </span>
            </div>

            <button
              onClick={() => {
                soundSynth.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3 text-[#D4AF37]" /> : <Play className="w-3 h-3 text-[#D4AF37]" />}
              <span>{isPlaying ? "PAUSE REEL" : "AUTO PLAY"}</span>
            </button>
          </div>

          {/* 4 Scene Thumbnails / Scrub Triggers */}
          <div className="space-y-2.5">
            {CINEMATIC_SCENES.map((scene, idx) => {
              const isActive = activeSceneIndex === idx;

              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    soundSynth.playClick();
                    setActiveSceneIndex(idx);
                    setPlaybackProgress(0);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer flex items-center space-x-3.5 relative overflow-hidden ${
                    isActive
                      ? "bg-[#121524]/90 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.01]"
                      : "bg-[#080B14]/60 border-white/[0.08] hover:border-white/20 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Active Scene Playback Progress Bar */}
                  {isActive && isPlaying && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-cyan-400 transition-all duration-100"
                      style={{ width: `${playbackProgress}%` }}
                    />
                  )}

                  {/* Thumbnail */}
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      className="object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#D4AF37]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                      </div>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
                        SCENE 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{scene.price}</span>
                    </div>
                    <div className="font-serif text-xs sm:text-sm font-medium text-white truncate">
                      {scene.title}
                    </div>
                    <div className="text-[10px] font-mono text-white/40 truncate">
                      {scene.location}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Jump to 3D BIM Model Studio */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-cyan-500/10 border border-[#D4AF37]/30 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-white/90">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct 3D Spatial Digital Twin Available</span>
            </div>
            <button
              onClick={() => scrollToSection("bim-studio")}
              className="text-[#D4AF37] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>INSPECT</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM TELEMETRY BAR & SCROLL CUE TO 3D BIM STUDIO */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-left w-full md:w-auto text-xs font-mono">
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">PORTFOLIO AUM</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">$1.48B+ USD</span>
          </div>

          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">OFF-MARKET MANDATES</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">48 Curated</span>
          </div>

          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">TARGET YIELD</span>
            <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">8.4% Net ROI</span>
          </div>

          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">SETTLEMENT ESCROW</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">Swiss Tier-1</span>
          </div>
        </div>

        {/* Scroll Cue pointing directly down to 3D BIM Studio */}
        <button
          onClick={() => scrollToSection("bim-studio")}
          className="group flex items-center space-x-3 text-xs font-mono tracking-widest text-[#D4AF37] hover:text-white transition-colors cursor-pointer py-2.5 px-5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/15"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="font-semibold">SCROLL TO ENTER 3D SPATIAL DIGITAL TWIN</span>
          <ChevronDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
