import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EstateProvider } from "@/context/estate-context";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATELIER ARCHIVES | The Estate Control Center — Ultra-Luxury Real Estate",
  description: "A cinematic, dark-mode 3D interactive luxury real estate portfolio and private client acquisition platform with orbital development nodes, investment clarity, and sovereign asset acquisition.",
  keywords: ["Luxury Real Estate", "Bespoke Penthouses", "Private Island Estates", "Coastal Villas", "Asset Acquisition", "Off-Plan Investment"],
  openGraph: {
    title: "ATELIER ARCHIVES | The Estate Control Center",
    description: "Four private acquisition tiers, one cinematic interface.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[var(--bg-estate-noir)] text-[var(--text-primary)] font-sans antialiased min-h-screen selection:bg-[var(--accent-champagne)] selection:text-white overflow-x-hidden transition-colors duration-500">
        <EstateProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </EstateProvider>
      </body>
    </html>
  );
}
