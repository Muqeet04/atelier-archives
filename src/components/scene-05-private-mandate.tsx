"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { soundSynth } from "@/utils/sound-synth";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Send,
  Building,
  KeyRound,
  FileSignature,
  Radio,
  ArrowRight
} from "lucide-react";

export function Scene05PrivateMandate() {
  const {
    isConsultationOpen,
    closeConsultation,
    consultationPreselectTier,
    formatPrice,
  } = useEstate();

  const [allocation, setAllocation] = useState<number>(10000000);
  const [clientType, setClientType] = useState<string>("principal");
  const [selectedTier, setSelectedTier] = useState<string>(consultationPreselectTier || "penthouse");
  const [commChannel, setCommChannel] = useState<string>("signal");
  const [fullName, setFullName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [contactHandle, setContactHandle] = useState("");
  const [ndaAgreed, setNdaAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenGenerated, setTokenGenerated] = useState("");

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAgreed) return;

    soundSynth.playChime();
    const token = `AA-MANDATE-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
    setTokenGenerated(token);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B8860B", "#10B981", "#0284C7", "#C8A97E"],
      });
    } catch {}
  };

  const resetForm = () => {
    setIsSubmitted(false);
    closeConsultation();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeConsultation}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white border border-[var(--border-gold)] rounded-3xl shadow-2xl p-6 sm:p-10 z-10 my-auto overflow-hidden text-[var(--text-primary)]"
        >
          {/* Top subtle glow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-champagne)] via-cyan-500 to-[var(--accent-secondary)]" />

          {/* Close Reticle */}
          <button
            onClick={closeConsultation}
            className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[var(--border-gold)] bg-black/[0.03] hover:bg-black/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-3">
                  <Lock className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
                    DISCREET PRIVATE CLIENT ACQUISITION
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Request Private Mandate & Advisory.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light mt-1.5">
                  Direct encrypted routing to senior portfolio partners. Zero public indexing.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Allocation Range Slider */}
                <div className="p-5 rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-muted)] uppercase tracking-widest font-semibold">
                      TARGET CAPITAL ALLOCATION
                    </span>
                    <span className="text-[var(--accent-champagne)] font-bold text-base">
                      {formatPrice(allocation)} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500000"
                    max="80000000"
                    step="500000"
                    value={allocation}
                    onChange={(e) => setAllocation(Number(e.target.value))}
                    className="w-full accent-[var(--accent-champagne)] h-1.5 bg-black/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                    <span>$1.5M (Min Tier)</span>
                    <span>$25M</span>
                    <span>$50M</span>
                    <span>$80M+ (Sovereign)</span>
                  </div>
                </div>

                {/* Primary Asset Class Interest */}
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2 font-semibold">
                    PRIMARY ASSET TIER
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "penthouse", label: "Penthouses" },
                      { id: "villa", label: "Coastal Villas" },
                      { id: "offplan", label: "Off-Plan Alpha" },
                      { id: "island", label: "Private Islands" },
                    ].map((tier) => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-mono tracking-wider transition-all cursor-pointer ${
                          selectedTier === tier.id
                            ? "bg-[var(--accent-champagne)] border-[var(--accent-champagne)] text-white font-semibold shadow-sm"
                            : "bg-black/[0.02] border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Representation & Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-semibold">
                      CLIENT / REPRESENTATIVE NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-[var(--border-gold)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-xs font-mono focus:outline-none focus:border-[var(--accent-champagne)] transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-semibold">
                      FAMILY OFFICE / TRUST ENTITY (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Sovereign Trust AG"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-[var(--border-gold)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-xs font-mono focus:outline-none focus:border-[var(--accent-champagne)] transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Encrypted Contact Handle & Channel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-semibold">
                      PREFERRED CONTACT CHANNEL
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "signal", label: "Signal" },
                        { id: "wire", label: "Encrypted Wire" },
                        { id: "diplomatic", label: "Diplomatic" },
                      ].map((ch) => (
                        <button
                          type="button"
                          key={ch.id}
                          onClick={() => setCommChannel(ch.id)}
                          className={`py-2 px-2 rounded-xl border text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                            commChannel === ch.id
                              ? "bg-[var(--accent-champagne)] border-[var(--accent-champagne)] text-white font-semibold"
                              : "bg-black/[0.02] border-[var(--border-gold)] text-[var(--text-muted)]"
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-semibold">
                      CONTACT HANDLE / SECURE NUMBER
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+41 22 819 0000 or username.01"
                      value={contactHandle}
                      onChange={(e) => setContactHandle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.02] border border-[var(--border-gold)] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-xs font-mono focus:outline-none focus:border-[var(--accent-champagne)] transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Bilateral NDA Acknowledgement Checkbox */}
                <div className="p-4 rounded-xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] flex items-start space-x-3 shadow-sm">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={ndaAgreed}
                    onChange={(e) => setNdaAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[var(--accent-champagne)] rounded cursor-pointer"
                  />
                  <label htmlFor="nda-checkbox" className="text-xs text-[var(--text-muted)] font-light cursor-pointer select-none">
                    I acknowledge that all transmissions are governed by mutual bilateral non-disclosure covenants and statutory Swiss banking confidentiality standards.
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!ndaAgreed}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer ${
                    ndaAgreed
                      ? "bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white shadow-[0_4px_20px_-2px_rgba(184,134,11,0.3)]"
                      : "bg-black/10 text-black/30 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT ENCRYPTED MANDATE</span>
                </button>
              </form>
            </div>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[var(--border-gold)]/20 border border-[var(--accent-champagne)] text-[var(--accent-champagne)] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-600 uppercase font-semibold">
                  MANDATE ENCRYPTED & TRANSMITTED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-medium mt-1">
                  Private Channel Initialized.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-md mx-auto mt-2">
                  Your dedicated senior acquisitions partner has received your mandate parameters. We will establish direct contact within 2 hours.
                </p>
              </div>

              {/* Cryptographic Sovereign Token */}
              <div className="p-5 rounded-2xl bg-[var(--bg-estate-noir)] border border-[var(--border-gold)] max-w-md mx-auto space-y-1.5 shadow-sm">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block font-semibold">
                  AUTHENTICATED TRANSACTION TOKEN
                </span>
                <div className="font-mono text-sm sm:text-base font-bold text-[var(--accent-champagne)] tracking-widest">
                  {tokenGenerated}
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] pt-1">
                  SHA-256 Verified • Direct Swiss Notary Pipeline
                </div>
              </div>

              <button
                onClick={resetForm}
                className="px-8 py-3 rounded-xl bg-[var(--accent-champagne)] hover:bg-[var(--accent-secondary)] text-white font-mono text-xs font-semibold tracking-wider transition-colors cursor-pointer shadow-md"
              >
                RETURN TO CONTROL CENTER
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
