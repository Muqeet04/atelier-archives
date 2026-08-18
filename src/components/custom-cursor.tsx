"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch screen
    if (typeof window !== "undefined" && !("ontouchstart" in window)) {
      setIsTouch(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("interactive-element")
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/50 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? "rgba(212, 175, 55, 0.08)" : "transparent",
          boxShadow: isPointer ? "0 0 20px rgba(212, 175, 55, 0.25)" : "0 0 10px rgba(212, 175, 55, 0.1)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* Crosshair corner marks on hover */}
        {isPointer && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#D4AF37]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-0.5 bg-[#D4AF37]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#D4AF37]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0.5 h-1.5 bg-[#D4AF37]" />
          </>
        )}
      </motion.div>

      {/* Center Golden Point */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          width: isPointer ? 6 : 4,
          height: isPointer ? 6 : 4,
          boxShadow: "0 0 8px #D4AF37",
        }}
      />
    </div>
  );
}
