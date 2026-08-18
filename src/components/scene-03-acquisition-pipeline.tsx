"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PIPELINE_STAGES } from "@/data/estate-data";
import { soundSynth } from "@/utils/sound-synth";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Play,
  Pause,
  KeyRound,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export function Scene03AcquisitionPipeline() {
  const [selectedStageId, setSelectedStageId] = useState<string>("enquiry");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentStage =
    PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[0];

  const currentStageIndex = PIPELINE_STAGES.findIndex((s) => s.id === currentStage.id);

  // Automated Simulation Mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSelectedStageId((prevId) => {
          const idx = PIPELINE_STAGES.findIndex((s) => s.id === prevId);
          const nextIdx = (idx + 1) % PIPELINE_STAGES.length;
          soundSynth.playHover();
          return PIPELINE_STAGES[nextIdx].id;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const toggleSimulation = () => {
    soundSynth.playClick();
    setIsSimulating(!isSimulating);
  };

  return (
    <section
      id="scene-03"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-estate-noir)] border-t border-[var(--border-gold)] overflow-hidden transition-colors duration-500"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[radial-gradient(circle,rgba(184,134,11,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[radial-gradient(circle,rgba(2,132,199,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
                SCENE 03 — THE ACQUISITION PIPELINE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)] tracking-tight">
              One Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-champagne)] to-[var(--accent-secondary)]">Acquisition Path.</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-xl font-light">
              Every private client moves through an encrypted, friction-free journey — from initial enquiry to key handover.
            </p>
          </div>

          {/* Simulation Toggle */}
          <button
            onClick={toggleSimulation}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border cursor-pointer ${
              isSimulating
                ? "bg-[var(--accent-champagne)] text-white border-[var(--accent-champagne)] font-semibold shadow-md"
                : "bg-[var(--surface-glass)] text-[var(--text-primary)] border-[var(--border-gold)] hover:border-[var(--accent-champagne)] shadow-sm"
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />}
            <span>{isSimulating ? "PAUSE SIMULATION" : "SIMULATE PROTOCOL"}</span>
          </button>
        </div>

        {/* CONTINUOUS VISUAL PIPELINE FLOW (7 STAGES) */}
        <div className="relative mb-12">
          {/* Connecting Track Line */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-0.5 bg-[var(--border-gold)]/50" />

          {/* Active Animated Energy Pulse Line */}
          <div
            className="hidden lg:block absolute top-7 left-0 h-0.5 bg-[var(--accent-champagne)] transition-all duration-700 shadow-[0_0_10px_rgba(184,134,11,0.6)]"
            style={{
              width: `${((currentStageIndex + 1) / PIPELINE_STAGES.length) * 100}%`,
            }}
          />

          {/* 7 Stage Nodes Horizontal Container */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative z-10">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = stage.id === currentStage.id;
              const isPast = idx < currentStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    soundSynth.playClick();
                    setIsSimulating(false);
                    setSelectedStageId(stage.id);
                  }}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                    isActive
                      ? "bg-[var(--surface-glass)] border-[var(--accent-champagne)] shadow-[0_10px_25px_-5px_rgba(184,134,11,0.2)] scale-[1.02]"
                      : isPast
                      ? "bg-[var(--surface-glass)] border-[var(--border-gold)] text-[var(--text-primary)]"
                      : "bg-[var(--surface-glass)]/60 border-[var(--border-gold)]/50 hover:border-[var(--border-gold)] text-[var(--text-muted)]"
                  }`}
                >
                  {/* Step Number Dot */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        isActive
                          ? "bg-[var(--accent-champagne)] text-white shadow-md"
                          : isPast
                          ? "bg-black/10 text-[var(--text-primary)]"
                          : "bg-black/[0.04] text-[var(--text-muted)]"
                      }`}
                    >
                      {stage.stepNumber}
                    </span>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-champagne)] animate-ping" />
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <div
                      className={`font-serif text-xs sm:text-sm font-medium transition-colors ${
                        isActive ? "text-[var(--accent-champagne)] font-semibold" : "text-[var(--text-primary)]"
                      }`}
                    >
                      {stage.title}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1 truncate">
                      {stage.turnaroundTime}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILED STAGE INSPECTION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-[var(--surface-glass)] border border-[var(--border-gold)] p-6 sm:p-10 backdrop-blur-2xl shadow-xl relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-champagne)] via-cyan-500 to-[var(--accent-secondary)]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Info (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[var(--accent-champagne)] mb-2 uppercase font-semibold">
                    <span>STAGE {currentStage.stepNumber} OF 07</span>
                    <span>•</span>
                    <span>{currentStage.turnaroundTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
                    {currentStage.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed">
                    {currentStage.detailedProtocol}
                  </p>
                </div>

                {/* Required Documents */}
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-[var(--border-gold)] space-y-2">
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider flex items-center space-x-2">
                    <FileCheck className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                    <span>REQUIRED BILATERAL DOCUMENTATION</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {currentStage.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-[var(--text-primary)] font-light">
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-champagne)] shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Security & Stage Deliverable (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Security Standard Card */}
                <div className="p-5 rounded-2xl bg-black/[0.02] border border-[var(--border-gold)] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[var(--accent-champagne)] uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SECURITY STANDARD</span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[var(--text-primary)] font-medium">
                    {currentStage.securityProtocol}
                  </p>
                </div>

                {/* Deliverable Card */}
                <div className="p-5 rounded-2xl bg-[var(--border-gold)]/10 border border-[var(--border-gold)] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[var(--accent-champagne)] uppercase tracking-wider font-semibold">
                    <KeyRound className="w-4 h-4" />
                    <span>STAGE DELIVERABLE</span>
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[var(--text-primary)] font-semibold">
                    {currentStage.deliverable}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2 px-1">
                  <span>Protocol Readiness: 100%</span>
                  <span className="text-emerald-600 font-semibold">Encrypted Conduit</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
