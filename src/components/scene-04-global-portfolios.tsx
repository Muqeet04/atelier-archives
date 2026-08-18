"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_ARCHETYPES, AssetArchetype } from "@/data/estate-data";
import { useEstate } from "@/context/estate-context";
import { soundSynth } from "@/utils/sound-synth";
import {
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  Briefcase,
  ChevronRight,
  Building,
  Hotel,
  Palmtree,
  Store
} from "lucide-react";

export function Scene04GlobalPortfolios() {
  const [selectedArchetypeKey, setSelectedArchetypeKey] = useState<string>("residential");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const { openConsultation } = useEstate();

  const archetype: AssetArchetype = ASSET_ARCHETYPES[selectedArchetypeKey];

  const archetypeTabs = [
    { key: "residential", label: "Ultra-Luxury Residential", icon: Building },
    { key: "hotel", label: "Branded Hotel Residences", icon: Hotel },
    { key: "islands", label: "Private Islands", icon: Palmtree },
    { key: "commercial", label: "Commercial Flagships", icon: Store },
  ];

  return (
    <section
      id="scene-04"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-estate-noir)] border-t border-[var(--border-gold)] transition-colors duration-500"
    >
      {/* Glow aura */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,134,11,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
              SCENE 04 — ASSET CLASSIFICATIONS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-champagne)] to-[var(--accent-secondary)]">Your Portfolio.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] font-light">
            One standard of excellence, multiple asset classes. Select an archetype to inspect the acquisition blueprint.
          </p>
        </div>

        {/* SEGMENTED PILL SWITCHER */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[var(--surface-glass)] border border-[var(--border-gold)] backdrop-blur-xl w-full max-w-4xl shadow-sm">
            {archetypeTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedArchetypeKey === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    soundSynth.playClick();
                    setSelectedArchetypeKey(tab.key);
                    setSelectedNodeIndex(0);
                  }}
                  className={`relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent-champagne)] text-white font-semibold shadow-md"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC STATE ENGINE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={archetype.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[var(--surface-glass)] border border-[var(--border-gold)] p-6 sm:p-10 backdrop-blur-2xl shadow-xl"
          >
            {/* Value Proposition Hero Banner */}
            <div className="border-b border-[var(--border-gold)] pb-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent-champagne)] uppercase tracking-widest block mb-1 font-semibold">
                    STRATEGIC VALUE PROPOSITION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                    “{archetype.valueProp}”
                  </h3>
                </div>

                <button
                  onClick={() => openConsultation(archetype.id)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white font-mono text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap self-start md:self-auto shadow-md"
                >
                  <span>ACQUIRE ARCHETYPE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Key Quantitative Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-black/[0.02] border border-[var(--border-gold)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                    AVERAGE TICKET
                  </span>
                  <div className="text-base sm:text-lg font-mono font-semibold text-[var(--text-primary)] mt-0.5">
                    {archetype.avgTicket}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/[0.02] border border-[var(--border-gold)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                    TARGET YIELD
                  </span>
                  <div className="text-base sm:text-lg font-mono font-semibold text-emerald-600 mt-0.5">
                    {archetype.avgYield}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/[0.02] border border-[var(--border-gold)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                    HOLDING HORIZON
                  </span>
                  <div className="text-base sm:text-lg font-mono font-semibold text-[var(--text-primary)] mt-0.5">
                    {archetype.holdingHorizon}
                  </div>
                </div>
              </div>
            </div>

            {/* 5-NODE BLUEPRINT WORKFLOW TIMELINE */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[var(--accent-champagne)] uppercase mb-6 font-semibold">
                <Layers className="w-4 h-4" />
                <span>ACQUISITION BLUEPRINT (5 NODES)</span>
              </div>

              {/* Interactive 5 Nodes Row */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
                {archetype.blueprintNodes.map((node, index) => {
                  const isNodeSelected = selectedNodeIndex === index;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        soundSynth.playHover();
                        setSelectedNodeIndex(index);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isNodeSelected
                          ? "bg-[var(--surface-glass)] border-[var(--accent-champagne)] shadow-[0_4px_20px_-2px_rgba(184,134,11,0.25)] scale-[1.02]"
                          : "bg-black/[0.02] border-[var(--border-gold)] hover:border-[var(--accent-champagne)]/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[var(--accent-champagne)] font-bold">
                          0{index + 1}
                        </span>
                        {isNodeSelected && (
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-champagne)] animate-pulse" />
                        )}
                      </div>
                      <div className="font-serif text-sm font-medium text-[var(--text-primary)] mb-1">
                        {node.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Expanded Protocol */}
              <div className="p-6 rounded-2xl bg-black/[0.02] border border-[var(--border-gold)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent-champagne)] uppercase tracking-widest font-semibold">
                    NODE 0{selectedNodeIndex + 1} EXECUTION PROTOCOL
                  </span>
                  <h4 className="font-serif text-lg text-[var(--text-primary)] font-medium mt-0.5">
                    {archetype.blueprintNodes[selectedNodeIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light mt-1 max-w-2xl">
                    {archetype.blueprintNodes[selectedNodeIndex].description}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Statutory Guaranteed</span>
                </div>
              </div>

              {/* Prime Jurisdictions Footer */}
              <div className="mt-8 pt-6 border-t border-[var(--border-gold)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                  <span>TARGET CORRIDORS:</span>
                  <span className="text-[var(--text-primary)]">{archetype.keyJurisdictions.join(" • ")}</span>
                </div>
                <div className="text-[var(--accent-champagne)] font-semibold">
                  Discreet bilateral matching enabled
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
