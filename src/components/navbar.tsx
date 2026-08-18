"use client";

import React, { useState, useEffect } from "react";
import { useEstate } from "@/context/estate-context";
import { soundSynth } from "@/utils/sound-synth";
import { CURRENCIES, COLOR_THEMES } from "@/data/estate-data";
import { Volume2, VolumeX, Shield, Globe, ChevronDown, Menu, X, ArrowUpRight, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const {
    isSoundMuted,
    toggleSound,
    currency,
    setCurrencyCode,
    openConsultation,
    isGatewayUnlocked,
    activeThemeId,
    setActiveThemeId,
  } = useEstate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isGatewayUnlocked) return null;

  const scrollToSection = (id: string) => {
    soundSynth.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => scrollToSection("scene-01")}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg border border-[var(--border-gold)] bg-[var(--border-gold)]/10 flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent-champagne)] group-hover:shadow-[0_0_15px_rgba(200,169,126,0.3)]">
            <span className="font-serif font-bold text-sm text-[var(--accent-champagne)]">AA</span>
          </div>
          <div>
            <div className="font-serif tracking-[0.2em] text-sm text-white font-semibold flex items-center space-x-1.5">
              <span>ATELIER ARCHIVES</span>
              <span className="text-[9px] font-mono text-[var(--accent-champagne)] border border-[var(--border-gold)] px-1 rounded">VIP</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#94A3B8] hidden sm:block">
              ESTATE CONTROL CENTER
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-widest text-white/70">
          <button
            onClick={() => scrollToSection("scene-01")}
            className="hover:text-[var(--accent-champagne)] transition-colors cursor-pointer"
          >
            01 REEL
          </button>
          <button
            onClick={() => scrollToSection("bim-studio")}
            className="hover:text-[var(--accent-champagne)] transition-colors cursor-pointer text-[var(--accent-champagne)]"
          >
            02 3D BIM STUDIO
          </button>
          <button
            onClick={() => scrollToSection("scene-02")}
            className="hover:text-[var(--accent-champagne)] transition-colors cursor-pointer"
          >
            03 PORTFOLIOS
          </button>
          <button
            onClick={() => scrollToSection("scene-03")}
            className="hover:text-[var(--accent-champagne)] transition-colors cursor-pointer"
          >
            04 PIPELINE
          </button>
          <button
            onClick={() => scrollToSection("scene-04")}
            className="hover:text-[var(--accent-champagne)] transition-colors cursor-pointer"
          >
            05 BLUEPRINTS
          </button>
        </nav>

        {/* Right Actions: Theme, Currency, Sound, VIP CTA */}
        <div className="flex items-center space-x-2.5">
          {/* Color Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundSynth.playClick();
                setThemeDropdownOpen(!themeDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              title="Change Luxury Color Palette"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-white/90 transition-all cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span className="hidden md:inline text-[11px]">PALETTE</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 py-1.5 bg-[#0A0C14] border border-white/15 rounded-xl shadow-2xl backdrop-blur-2xl z-50 space-y-1"
                >
                  <div className="px-3 py-1 text-[9px] font-mono text-white/40 uppercase tracking-widest border-b border-white/10">
                    SELECT COLOR SCHEME
                  </div>
                  {COLOR_THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => {
                        setActiveThemeId(th.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                        activeThemeId === th.id
                          ? "bg-white/15 text-white font-semibold"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: th.accentPrimary }}
                        />
                        <span className="truncate">{th.name}</span>
                      </div>
                      {activeThemeId === th.id && (
                        <span className="text-[10px] text-[var(--accent-champagne)]">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundSynth.playClick();
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setThemeDropdownOpen(false);
              }}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-white/80 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span>{currency.code}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 py-1 bg-[#090C14] border border-white/15 rounded-xl shadow-2xl backdrop-blur-2xl z-50"
                >
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrencyCode(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition-colors ${
                        currency.code === c.code
                          ? "bg-white/15 text-[var(--accent-champagne)] font-semibold"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-white/40">{c.symbol}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient soundscape"
            title={isSoundMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
            className="p-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-[var(--accent-champagne)] transition-all cursor-pointer"
          >
            {isSoundMuted ? (
              <VolumeX className="w-4 h-4 text-white/40" />
            ) : (
              <div className="flex items-center space-x-1">
                <Volume2 className="w-4 h-4 text-[var(--accent-champagne)] animate-pulse" />
              </div>
            )}
          </button>

          {/* VIP Consultation Request */}
          <button
            onClick={() => openConsultation()}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-[var(--border-gold)] bg-[var(--border-gold)]/15 hover:bg-[var(--border-gold)]/25 text-[var(--accent-champagne)] text-xs font-mono font-medium tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(200,169,126,0.15)] hover:shadow-[0_0_20px_rgba(200,169,126,0.3)] cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>PRIVATE MANDATE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/[0.04] text-white/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060709]/95 border-b border-white/10 px-4 py-4 backdrop-blur-2xl space-y-3"
          >
            <button
              onClick={() => scrollToSection("scene-01")}
              className="block w-full text-left py-2 text-xs font-mono tracking-widest text-white/80 hover:text-[var(--accent-champagne)]"
            >
              01 CINEMATIC REEL
            </button>
            <button
              onClick={() => scrollToSection("bim-studio")}
              className="block w-full text-left py-2 text-xs font-mono tracking-widest text-[var(--accent-champagne)] font-semibold"
            >
              02 3D BIM STUDIO
            </button>
            <button
              onClick={() => scrollToSection("scene-02")}
              className="block w-full text-left py-2 text-xs font-mono tracking-widest text-white/80 hover:text-[var(--accent-champagne)]"
            >
              03 PORTFOLIO TIERS
            </button>
            <button
              onClick={() => scrollToSection("scene-03")}
              className="block w-full text-left py-2 text-xs font-mono tracking-widest text-white/80 hover:text-[var(--accent-champagne)]"
            >
              04 ACQUISITION PIPELINE
            </button>
            <button
              onClick={() => scrollToSection("scene-04")}
              className="block w-full text-left py-2 text-xs font-mono tracking-widest text-white/80 hover:text-[var(--accent-champagne)]"
            >
              05 ASSET BLUEPRINTS
            </button>

            {/* Mobile Color Palette Selector */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                COLOR PALETTE
              </span>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setActiveThemeId(th.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-lg border text-[10px] font-mono text-left flex items-center space-x-1.5 ${
                      activeThemeId === th.id
                        ? "border-[var(--accent-champagne)] text-white bg-white/10"
                        : "border-white/10 text-white/60"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: th.accentPrimary }} />
                    <span className="truncate">{th.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultation();
                }}
                className="w-full py-2.5 rounded-lg border border-[var(--border-gold)] bg-[var(--border-gold)]/15 text-[var(--accent-champagne)] text-xs font-mono font-medium tracking-wider flex items-center justify-center space-x-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>REQUEST PRIVATE MANDATE</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
