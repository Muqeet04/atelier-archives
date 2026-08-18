"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEstate } from "@/context/estate-context";
import { soundSynth } from "@/utils/sound-synth";
import { Lock, Sparkles, ChevronRight, ShieldCheck } from "lucide-react";

export function Scene00Gateway() {
  const { isGatewayUnlocked, unlockGateway } = useEstate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [movementDistance, setMovementDistance] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const threshold = 180; // pixels of movement required

  // Quote sequence cycle
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuoteIndex(1);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse movement to charge aperture
  useEffect(() => {
    if (isGatewayUnlocked || isOpening) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (lastPosRef.current.x === 0 && lastPosRef.current.y === 0) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      setMovementDistance((prev) => {
        const next = prev + dist;
        if (next >= threshold && !isOpening) {
          triggerUnlock();
        }
        return next;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        triggerUnlock();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGatewayUnlocked, isOpening]);

  const triggerUnlock = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundSynth.playHover();
    setTimeout(() => {
      unlockGateway();
    }, 700);
  };

  if (isGatewayUnlocked && !isOpening) return null;

  const progressPercent = Math.min(100, Math.round((movementDistance / threshold) * 100));

  return (
    <AnimatePresence>
      {!isGatewayUnlocked && (
        <motion.div
          key="gateway-container"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9000] flex flex-col justify-between bg-[var(--bg-estate-noir)] text-[var(--text-primary)] select-none p-6 md:p-12 overflow-hidden transition-colors duration-500"
          onClick={triggerUnlock}
        >
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.08)_0%,transparent_80%)] pointer-events-none" />
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          {/* Interactive Radial Reticle Follower */}
          <motion.div
            className="absolute pointer-events-none rounded-full border border-[var(--accent-champagne)]/30 -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: isOpening ? 25 : 1 + (progressPercent / 100) * 0.4,
              opacity: isOpening ? 0 : 0.85,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.6 }}
            style={{
              width: 180,
              height: 180,
              background: "radial-gradient(circle, rgba(184,134,11,0.12) 0%, transparent 70%)",
            }}
          >
            {/* Spinning Aperture Dashes */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--accent-champagne)]/40 animate-[spin_16s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-[var(--accent-champagne)] font-bold">
              {progressPercent}%
            </div>
          </motion.div>

          {/* TOP BAR */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-champagne)] animate-ping" />
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--accent-champagne)] uppercase font-semibold">
                Atelier Archives • Node 00
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-black/[0.03] text-[11px] font-mono text-[var(--text-muted)]">
                <ShieldCheck className="w-3 h-3 text-[var(--accent-champagne)]" />
                <span>256-BIT DISCREET PROTOCOL</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerUnlock();
                }}
                className="px-4 py-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--accent-champagne)]/10 hover:bg-[var(--accent-champagne)]/20 text-[var(--accent-champagne)] text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-1 cursor-pointer font-semibold shadow-sm"
              >
                <span>BYPASS</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* CENTER TYPOGRAPHY SEQUENCE */}
          <div className="relative z-10 my-auto text-center max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-gold)] bg-[var(--border-gold)]/10 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-champagne)]" />
              <span className="text-xs font-mono text-[var(--accent-champagne)] tracking-[0.2em] uppercase font-semibold">
                Private Sovereign Acquisition
              </span>
            </div>

            <div className="h-28 sm:h-36 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {quoteIndex === 0 ? (
                  <motion.h1
                    key="quote-1"
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight font-light leading-tight"
                  >
                    “Architecture is more than <span className="italic text-[var(--accent-champagne)] font-medium">square footage</span>.”
                  </motion.h1>
                ) : (
                  <motion.h1
                    key="quote-2"
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight font-light leading-tight"
                  >
                    “<span className="italic text-[var(--accent-champagne)] font-medium">Legacy</span> is what you are acquiring.”
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-sm md:text-base text-[var(--text-muted)] font-light max-w-xl mx-auto mt-4"
            >
              An encrypted gateway to four private global estate tiers. Move your cursor or tap anywhere to initialize the control center.
            </motion.p>
          </div>

          {/* FOOTER CUE & APERTURE CHARGE BAR */}
          <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
            {/* Progress meter ring / bar */}
            <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden mb-4 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent-champagne)]/50 via-[var(--accent-champagne)] to-[var(--accent-secondary)]"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.25em] text-[var(--accent-champagne)] font-semibold">
              <Lock className="w-3.5 h-3.5 animate-pulse" />
              <span className="animate-pulse">MOVE TO ENTER / TAP TO INITIALIZE</span>
            </div>

            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest mt-2">
              ESC / ENTER TO BYPASS
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
