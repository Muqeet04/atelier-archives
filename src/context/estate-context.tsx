"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ESTATE_TIERS, EstateTier, CURRENCIES, COLOR_THEMES, ColorTheme } from "@/data/estate-data";
import { soundSynth } from "@/utils/sound-synth";

interface Currency {
  code: string;
  symbol: string;
  rate: number;
  name: string;
}

interface EstateContextType {
  isGatewayUnlocked: boolean;
  unlockGateway: () => void;
  selectedTierId: string | null;
  setSelectedTierId: (id: string | null) => void;
  activeDossierTier: EstateTier | null;
  openDossier: (tier: EstateTier) => void;
  closeDossier: () => void;
  currency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (amountUSD: number) => string;
  isSoundMuted: boolean;
  toggleSound: () => void;
  activePipelineStep: string;
  setActivePipelineStep: (stepId: string) => void;
  isConsultationOpen: boolean;
  consultationPreselectTier: string;
  openConsultation: (tierId?: string) => void;
  closeConsultation: () => void;
  hoveredOrbTier: string | null;
  setHoveredOrbTier: (id: string | null) => void;
  activeThemeId: string;
  setActiveThemeId: (themeId: string) => void;
  activeTheme: ColorTheme;
}

const EstateContext = createContext<EstateContextType | undefined>(undefined);

export function EstateProvider({ children }: { children: React.ReactNode }) {
  const [isGatewayUnlocked, setIsGatewayUnlocked] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [activeDossierTier, setActiveDossierTier] = useState<EstateTier | null>(null);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [activePipelineStep, setActivePipelineStep] = useState<string>("enquiry");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPreselectTier, setConsultationPreselectTier] = useState<string>("penthouse");
  const [hoveredOrbTier, setHoveredOrbTier] = useState<string | null>(null);
  const [activeThemeId, setActiveThemeIdState] = useState<string>("light-alabaster");

  const activeTheme = COLOR_THEMES.find((t) => t.id === activeThemeId) || COLOR_THEMES[0];

  const setActiveThemeId = (themeId: string) => {
    soundSynth.playClick();
    setActiveThemeIdState(themeId);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove(
        "theme-light-alabaster",
        "theme-light-sand",
        "theme-light-coastal",
        "theme-noir-obsidian"
      );
      document.documentElement.classList.add(`theme-${themeId}`);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add(`theme-${activeThemeId}`);
    }
  }, [activeThemeId]);

  const unlockGateway = () => {
    soundSynth.playApertureUnlock();
    setIsGatewayUnlocked(true);
  };

  const openDossier = (tier: EstateTier) => {
    soundSynth.playModalOpen();
    setActiveDossierTier(tier);
    setSelectedTierId(tier.id);
  };

  const closeDossier = () => {
    soundSynth.playClick();
    setActiveDossierTier(null);
  };

  const openConsultation = (tierId?: string) => {
    soundSynth.playModalOpen();
    if (tierId) setConsultationPreselectTier(tierId);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    soundSynth.playClick();
    setIsConsultationOpen(false);
  };

  const setCurrencyCode = (code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) {
      soundSynth.playClick();
      setCurrency(found);
    }
  };

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    if (!nextState) {
      soundSynth.startAmbient();
      soundSynth.playChime();
    } else {
      soundSynth.stopAmbient();
    }
  };

  const formatPrice = (amountUSD: number): string => {
    const converted = amountUSD * currency.rate;
    if (converted >= 1_000_000) {
      const millions = (converted / 1_000_000).toFixed(1).replace(/\.0$/, "");
      return `${currency.symbol}${millions}M`;
    }
    if (converted >= 1_000) {
      const thousands = Math.round(converted).toLocaleString();
      return `${currency.symbol}${thousands}`;
    }
    return `${currency.symbol}${Math.round(converted)}`;
  };

  return (
    <EstateContext.Provider
      value={{
        isGatewayUnlocked,
        unlockGateway,
        selectedTierId,
        setSelectedTierId,
        activeDossierTier,
        openDossier,
        closeDossier,
        currency,
        setCurrencyCode,
        formatPrice,
        isSoundMuted,
        toggleSound,
        activePipelineStep,
        setActivePipelineStep,
        isConsultationOpen,
        consultationPreselectTier,
        openConsultation,
        closeConsultation,
        hoveredOrbTier,
        setHoveredOrbTier,
        activeThemeId,
        setActiveThemeId,
        activeTheme
      }}
    >
      {children}
    </EstateContext.Provider>
  );
}

export function useEstate() {
  const context = useContext(EstateContext);
  if (!context) {
    throw new Error("useEstate must be used within an EstateProvider");
  }
  return context;
}
