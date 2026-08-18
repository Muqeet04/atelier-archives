import React from "react";
import { Scene00Gateway } from "@/components/scene-00-gateway";
import { Navbar } from "@/components/navbar";
import { Scene01HeroControlCenter } from "@/components/scene-01-hero-control-center";
import { Scene01BimStudio } from "@/components/scene-01-bim-studio";
import { Scene02Portfolios } from "@/components/scene-02-portfolios";
import { Scene03AcquisitionPipeline } from "@/components/scene-03-acquisition-pipeline";
import { Scene04GlobalPortfolios } from "@/components/scene-04-global-portfolios";
import { Scene05PrivateMandate } from "@/components/scene-05-private-mandate";
import { EstateDossierModal } from "@/components/estate-dossier-modal";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-estate-noir)] text-[var(--text-primary)] overflow-hidden transition-colors duration-500">
      {/* Scene 00: The Private Gateway (Interactive Cursor Loader) */}
      <Scene00Gateway />

      {/* Global Luxury Navigation */}
      <Navbar />

      {/* Scene 01: Hero Section with Cinematic Video-Like Scroll Transition & Film Reel */}
      <Scene01HeroControlCenter />

      {/* Dedicated 3D Spatial Digital Twin & Architectural BIM Studio (Directly Below Hero) */}
      <Scene01BimStudio />

      {/* Scene 02: The Portfolios (Interactive Bento Grid & Detail Modals) */}
      <Scene02Portfolios />

      {/* Scene 03: The Acquisition Pipeline (Continuous Buyer Journey) */}
      <Scene03AcquisitionPipeline />

      {/* Scene 04: The Global Portfolios (Adaptive Asset Switcher & Blueprints) */}
      <Scene04GlobalPortfolios />

      {/* Modals & Drawers */}
      <EstateDossierModal />
      <Scene05PrivateMandate />

      {/* Footer */}
      <Footer />
    </main>
  );
}
