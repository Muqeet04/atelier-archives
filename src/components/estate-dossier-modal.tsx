"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { MiniSphereCanvas } from "@/components/three/mini-sphere-canvas";
import { soundSynth } from "@/utils/sound-synth";
import {
  X,
  ShieldCheck,
  Building2,
  DollarSign,
  TrendingUp,
  Briefcase,
  CheckCircle,
  FileText,
  Lock,
  ArrowRight,
  Calculator,
  Compass,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export function EstateDossierModal() {
  const { activeDossierTier, closeDossier, formatPrice, openConsultation } = useEstate();
  const [activeTab, setActiveTab] = useState<"specs" | "gallery" | "roi">("specs");
  const [investmentYears, setInvestmentYears] = useState<number>(5);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<number>(0);

  if (!activeDossierTier) return null;

  const tier = activeDossierTier;

  // ROI Calculator Calculations
  const startingPrincipal = tier.startingPriceUSD;
  const annualYieldPercent = tier.yieldNumeric / 100;
  const annualCapitalGrowthPercent = 0.065; // conservative 6.5% luxury asset growth
  const compoundTotal =
    startingPrincipal * Math.pow(1 + annualYieldPercent + annualCapitalGrowthPercent, investmentYears);
  const projectedGain = compoundTotal - startingPrincipal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDossier}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white border border-[var(--border-gold)] rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col my-auto text-[var(--text-primary)]"
        >
          {/* Top Bar Header */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-[var(--border-gold)] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-black/[0.03] border border-[var(--border-gold)] flex items-center justify-center">
                <MiniSphereCanvas color={tier.accentColor} className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--accent-champagne)] uppercase font-semibold">
                    ATELIER DOSSIER • TIER {tier.number}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">•</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    VERIFIED MANDATE
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)] tracking-wide">
                  {tier.name}
                </h3>
              </div>
            </div>

            {/* Close Button Reticle */}
            <button
              onClick={closeDossier}
              className="w-9 h-9 rounded-full border border-[var(--border-gold)] bg-black/[0.03] hover:bg-black/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Long description */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed">
              {tier.longDescription}
            </p>

            {/* 3 CAPITAL & COST BREAKDOWN CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Initial Allocation */}
              <div className="rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] p-5 relative overflow-hidden shadow-sm">
                <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase flex items-center space-x-1.5 mb-1 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                  <span>INITIAL ALLOCATION</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[var(--text-primary)]">
                  {formatPrice(tier.initialAllocationUSD)}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                  Minimum Reservation Escrow
                </div>
              </div>

              {/* Card 2: Estimated Yield */}
              <div className="rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] p-5 relative overflow-hidden shadow-sm">
                <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase flex items-center space-x-1.5 mb-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ESTIMATED YIELD</span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-600">
                  {tier.estimatedYield}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                  Projected Net Annual Return
                </div>
              </div>

              {/* Card 3: Service Retainer */}
              <div className="rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] p-5 relative overflow-hidden shadow-sm">
                <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase flex items-center space-x-1.5 mb-1 font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                  <span>SERVICE RETAINER</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[var(--text-primary)]">
                  {tier.serviceRetainerFormatted}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 font-mono truncate">
                  {tier.serviceRetainerLabel}
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Specs, Gallery, ROI Calculator) */}
            <div className="flex border-b border-[var(--border-gold)] space-x-6 text-xs font-mono tracking-widest">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "border-[var(--accent-champagne)] text-[var(--accent-champagne)] font-bold"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                CURATED SPECIFICATIONS & ADVISORY
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "gallery"
                    ? "border-[var(--accent-champagne)] text-[var(--accent-champagne)] font-bold"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                ESTATE GALLERY ({tier.gallery.length})
              </button>
              <button
                onClick={() => setActiveTab("roi")}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "roi"
                    ? "border-[var(--accent-champagne)] text-[var(--accent-champagne)] font-bold"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                ROI & CAPITAL GROWTH SIMULATOR
              </button>
            </div>

            {/* TAB CONTENT 1: TWO-COLUMN SPECIFICATIONS & TERMS */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Curated Specifications */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[var(--accent-champagne)] uppercase font-semibold">
                    <Building2 className="w-4 h-4" />
                    <span>CURATED SPECIFICATIONS</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.curatedSpecs.map((spec, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[var(--text-primary)] font-light">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Terms & Advisory */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[var(--accent-champagne)] uppercase font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>TERMS & BILATERAL ADVISORY</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.termsAndAdvisory.map((term, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[var(--text-primary)] font-light">
                        <Lock className="w-4 h-4 text-[var(--accent-champagne)] shrink-0 mt-0.5" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: ESTATE GALLERY */}
            {activeTab === "gallery" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {tier.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedGalleryImg(idx)}
                      className={`relative rounded-2xl overflow-hidden aspect-[4/3] border cursor-pointer transition-all ${
                        selectedGalleryImg === idx ? "border-[var(--accent-champagne)] ring-2 ring-[var(--accent-champagne)]/30" : "border-[var(--border-gold)] hover:border-[var(--accent-champagne)]"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end">
                        <span className="font-serif text-sm font-semibold text-white">{item.title}</span>
                        <span className="text-[10px] font-mono text-white/80">{item.location} • {item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: ROI SIMULATOR */}
            {activeTab === "roi" && (
              <div className="p-6 rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-[var(--accent-champagne)] uppercase tracking-widest flex items-center space-x-2 font-semibold">
                      <Calculator className="w-4 h-4" />
                      <span>CAPITAL APPRECIATION & YIELD SIMULATOR</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Based on {tier.estimatedYield} plus standard 6.5% annual sovereign luxury indexation.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-[var(--text-primary)] font-semibold">
                    Holding Period: <span className="text-[var(--accent-champagne)] font-bold text-sm">{investmentYears} Years</span>
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                  className="w-full accent-[var(--accent-champagne)] h-1.5 bg-black/10 rounded-lg cursor-pointer"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-[var(--border-gold)] shadow-sm">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Initial Capital</span>
                    <div className="text-lg font-mono font-bold text-[var(--text-primary)] mt-1">
                      {formatPrice(startingPrincipal)}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[var(--border-gold)] shadow-sm">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Cumulative Projected Gain</span>
                    <div className="text-lg font-mono font-bold text-emerald-600 mt-1">
                      +{formatPrice(projectedGain)}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--border-gold)]/10 border border-[var(--border-gold)] shadow-sm">
                    <span className="text-[10px] font-mono text-[var(--accent-champagne)] uppercase font-semibold">Simulated Future Value</span>
                    <div className="text-lg font-mono font-bold text-[var(--accent-champagne)] mt-1">
                      {formatPrice(compoundTotal)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer / Action CTA */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-t border-[var(--border-gold)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
              <KeyRound className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>Sovereign Allocation ID: ATELIER-{tier.id.toUpperCase()}-2026</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={closeDossier}
                className="px-4 py-2.5 rounded-xl border border-[var(--border-gold)] hover:bg-black/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-mono tracking-wider transition-colors cursor-pointer"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  closeDossier();
                  openConsultation(tier.id);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>REQUEST PRIVATE MANDATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
