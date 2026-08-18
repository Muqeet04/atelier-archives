"use client";

import React from "react";
import { soundSynth } from "@/utils/sound-synth";
import { ArrowUp, ShieldCheck, Globe, Compass, Lock } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    soundSynth.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[var(--surface-glass)] border-t border-[var(--border-gold)] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[var(--text-muted)] text-xs font-mono transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[var(--border-gold)]">
          {/* Brand & Metaphor */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-[var(--text-primary)] font-serif text-base tracking-[0.2em] font-semibold">
              <div className="w-6 h-6 rounded bg-[var(--border-gold)]/20 border border-[var(--border-gold)] flex items-center justify-center text-[10px] text-[var(--accent-champagne)] font-bold font-serif">
                AA
              </div>
              <span>ATELIER ARCHIVES</span>
            </div>
            <p className="text-[var(--text-muted)] max-w-md font-sans text-xs leading-relaxed">
              An institutional-grade architectural acquisition platform connecting sovereign private capital with the world&apos;s rarest trophy real estate assets.
            </p>
          </div>

          {/* Global Hubs */}
          <div className="space-y-2">
            <span className="text-[var(--accent-champagne)] uppercase tracking-widest text-[10px] block font-semibold">
              GLOBAL OPERATING NODES
            </span>
            <ul className="space-y-1 text-[var(--text-muted)] text-[11px]">
              <li>Zurich • Bahnhofstrasse 45</li>
              <li>London • Mayfair Square W1K</li>
              <li>Dubai • DIFC Gate Precinct 4</li>
              <li>Tokyo • Roppongi Hills Mori</li>
              <li>New York • 57th St Billionaires&apos; Row</li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-2">
            <span className="text-[var(--accent-champagne)] uppercase tracking-widest text-[10px] block font-semibold">
              INSTITUTIONAL GOVERNANCE
            </span>
            <div className="space-y-2 text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>FINMA & AML Compliant</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
                <span>Bilateral NDA Protected</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-600" />
                <span>Statutory Title Indemnity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} ATELIER ARCHIVES AG. All sovereign asset registrations and blueprints reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span>DISCREET PRIVATE ADVISORY</span>
            <span>AES-256 ENCRYPTION</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[var(--accent-champagne)] hover:underline transition-colors cursor-pointer font-semibold"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
