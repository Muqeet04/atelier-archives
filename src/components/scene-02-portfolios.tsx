"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { ESTATE_TIERS } from "@/data/estate-data";
import { MiniSphereCanvas } from "@/components/three/mini-sphere-canvas";
import { soundSynth } from "@/utils/sound-synth";
import { ArrowUpRight, Sparkles, MapPin, Eye, Filter, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function Scene02Portfolios() {
  const { openDossier, formatPrice, selectedTierId, setSelectedTierId } = useEstate();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredTiers =
    filterCategory === "all"
      ? ESTATE_TIERS
      : ESTATE_TIERS.filter((t) => t.id === filterCategory);

  return (
    <section
      id="scene-02"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-estate-noir)] border-t border-[var(--border-gold)] transition-colors duration-500"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,134,11,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
                SCENE 02 — THE PORTFOLIOS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
              Four Private <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-champagne)] to-[var(--accent-secondary)]">Acquisition Tiers.</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-xl font-light">
              Select any tier to inspect complete architectural dossiers, allocation structures, curated specifications, and bilateral legal covenants.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[var(--surface-glass)] border border-[var(--border-gold)] backdrop-blur-xl shadow-sm">
            <button
              onClick={() => {
                soundSynth.playClick();
                setFilterCategory("all");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                filterCategory === "all"
                  ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-md"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5"
              }`}
            >
              ALL TIERS (4)
            </button>
            {ESTATE_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => {
                  soundSynth.playClick();
                  setFilterCategory(tier.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                  filterCategory === tier.id
                    ? "bg-[var(--accent-champagne)] text-white font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tier.accentColor }}
                />
                <span>{tier.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTiers.map((tier, idx) => {
            const isHovered = hoveredCardId === tier.id;
            const isSelected = selectedTierId === tier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => {
                  setHoveredCardId(tier.id);
                  setSelectedTierId(tier.id);
                }}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => openDossier(tier)}
                className={`group relative rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected || isHovered
                    ? "bg-[var(--surface-glass)] border-[var(--accent-champagne)] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.1)] scale-[1.01]"
                    : "bg-[var(--surface-glass)] border-[var(--border-gold)] hover:border-[var(--accent-champagne)]/60 shadow-sm"
                }`}
              >
                {/* Glow aura accent */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
                  style={{ backgroundColor: tier.accentColor }}
                />

                {/* Top Bar: Tier Number & 3D Mini Sphere Node */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
                        TIER {tier.number}
                      </span>
                      <span className="text-[var(--text-muted)] opacity-40">•</span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">{tier.coordinates}</span>
                    </div>

                    {/* Interactive 3D Mini Sphere Preview */}
                    <div className="w-14 h-14 rounded-2xl bg-black/[0.03] border border-[var(--border-gold)] flex items-center justify-center p-1 group-hover:border-[var(--accent-champagne)] transition-colors">
                      <MiniSphereCanvas color={tier.accentColor} isHovered={isHovered} className="w-12 h-12" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-medium group-hover:text-[var(--accent-champagne)] transition-colors flex items-center space-x-2">
                    <span>{tier.name}</span>
                  </h3>
                  <p className="text-xs font-mono text-[var(--accent-champagne)] tracking-wide mt-1 uppercase font-semibold">
                    {tier.tagline}
                  </p>

                  <p className="mt-3 text-sm text-[var(--text-muted)] font-light leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Featured Asset Preview Image Card */}
                <div className="relative mt-6 rounded-2xl overflow-hidden aspect-[16/9] border border-[var(--border-gold)] group-hover:border-[var(--accent-champagne)] transition-all shadow-sm">
                  <Image
                    src={tier.featuredProperty.image}
                    alt={tier.featuredProperty.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating badge inside image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-white font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                      <span className="truncate max-w-[200px] sm:max-w-[260px]">
                        {tier.featuredProperty.title}
                      </span>
                    </div>
                    <div className="font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                      {tier.estimatedYield}
                    </div>
                  </div>
                </div>

                {/* Bottom Financial Metrics & Dossier Trigger */}
                <div className="mt-6 pt-5 border-t border-[var(--border-gold)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                      STARTING CAPITAL
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-champagne)] transition-colors">
                      {formatPrice(tier.startingPriceUSD)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDossier(tier);
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white font-mono text-xs tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>VIEW DOSSIER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
