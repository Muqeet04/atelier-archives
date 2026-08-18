export interface EstateTier {
  id: string;
  number: string;
  name: string;
  tagline: string;
  startingPriceUSD: number;
  startingPriceFormatted: string;
  accentColor: string;
  accentGlow: string;
  accentRgb: string;
  description: string;
  longDescription: string;
  initialAllocationUSD: number;
  initialAllocationFormatted: string;
  estimatedYield: string;
  yieldNumeric: number;
  serviceRetainerUSD: number;
  serviceRetainerFormatted: string;
  serviceRetainerLabel: string;
  curatedSpecs: string[];
  termsAndAdvisory: string[];
  propertiesCount: number;
  coordinates: string;
  featuredProperty: {
    title: string;
    location: string;
    priceUSD: number;
    priceFormatted: string;
    areaSqFt: number;
    bedrooms: number;
    bathrooms: number;
    keyFeature: string;
    image: string;
  };
  gallery: {
    title: string;
    location: string;
    price: string;
    specs: string;
    image: string;
  }[];
}

export const ESTATE_TIERS: EstateTier[] = [
  {
    id: "penthouse",
    number: "01",
    name: "Bespoke Penthouses",
    tagline: "Sky-Level Architectural Masterpieces",
    startingPriceUSD: 4500000,
    startingPriceFormatted: "From $4.5M",
    accentColor: "#10B981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    accentRgb: "16, 185, 129",
    description: "Sky-level residences with private elevators, 360° views, and custom Italian finishes.",
    longDescription: "Floating above prime metropolitan skylines, our penthouse collection delivers uncompromised vertical privacy, cantilevered private infinity pools, biometric keyless access, and curated bespoke interior architecture by Milanese ateliers.",
    initialAllocationUSD: 250000,
    initialAllocationFormatted: "$250,000",
    estimatedYield: "8.4% Net ROI",
    yieldNumeric: 8.4,
    serviceRetainerUSD: 1800,
    serviceRetainerFormatted: "$1,800/mo",
    serviceRetainerLabel: "Turnkey Concierge & Asset Stewardship",
    curatedSpecs: [
      "Private direct-to-penthouse high-speed biometric elevator",
      "Triple-height 7.2m glass facade with anti-reflective acoustic glazing",
      "Heated Grigio Alpi travertine marble floors throughout",
      "Sub-Zero & Gaggenau 400 Series bespoke culinary suite",
      "Subterranean temperature-controlled 600-bottle wine sanctuary",
      "Dedicated rooftop helipad landing privileges",
      "Integrated Crestron Diamond home automation with air purification"
    ],
    termsAndAdvisory: [
      "Escrow accounts routed through Swiss Tier-1 private banking partners",
      "100% Freehold Foreign Ownership guaranteed with statutory title insurance",
      "Qualifying threshold for Golden Visa / Sovereign Residency by Investment",
      "Bilateral non-disclosure agreement (NDA) governance for all asset records",
      "White-glove 45-day turnkey handover with private art curator induction"
    ],
    propertiesCount: 14,
    coordinates: "40.7128° N, 74.0060° W",
    featuredProperty: {
      title: "The Horizon Crown Duplex",
      location: "Billionaires' Row, Manhattan & London Mayfair",
      priceUSD: 14800000,
      priceFormatted: "$14.8M",
      areaSqFt: 8450,
      bedrooms: 5,
      bathrooms: 6.5,
      keyFeature: "Wraparound 360° Skyline Terrace & Private Sky Pool",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"
    },
    gallery: [
      {
        title: "The Solstice Crown",
        location: "Tribeca, New York",
        price: "$12.4M",
        specs: "4 Beds • 5 Baths • 6,200 Sq Ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Aura Residence Top Floor",
        location: "Kensington, London",
        price: "$16.2M",
        specs: "5 Beds • 6 Baths • 7,800 Sq Ft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Le Mirage Sky Palace",
        location: "Downtown Dubai",
        price: "$19.5M",
        specs: "6 Beds • 8 Baths • 9,400 Sq Ft",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    id: "villa",
    number: "02",
    name: "Coastal & Hill Villas",
    tagline: "Secluded Cliffside & Maritime Sanctuaries",
    startingPriceUSD: 8200000,
    startingPriceFormatted: "From $8.2M",
    accentColor: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.4)",
    accentRgb: "245, 158, 11",
    description: "Secluded cliffside estates featuring infinity architecture and private coastline access.",
    longDescription: "Engineered into natural dramatic topography across the French Riviera, Amalfi Coast, and Costa Smeralda. These standalone private sanctuaries offer total territorial privacy, deep-water yacht moorings, and seamless indoor-outdoor living.",
    initialAllocationUSD: 500000,
    initialAllocationFormatted: "$500,000",
    estimatedYield: "7.1% Net ROI",
    yieldNumeric: 7.1,
    serviceRetainerUSD: 3200,
    serviceRetainerFormatted: "$3,200/mo",
    serviceRetainerLabel: "Full Estate Staffing & Marine Maintenance",
    curatedSpecs: [
      "Private deep-water yacht slipway and private jetty",
      "50-meter cantilevered infinity pool with saltwater heating",
      "Reinforced subterranean biometric panic room & security command suite",
      "Private terraced olive grove and organic vineyard parcel",
      "Independent staff quarters with separate vehicular access",
      "Tesla Solar roof tiles with 120kWh commercial storage backup",
      "Private cliffside funicular railway descending to private cove"
    ],
    termsAndAdvisory: [
      "Direct coastal concession rights protected under maritime leasehold covenants",
      "Frictionless offshore corporate vehicle structuring (BVI, Luxembourg, DIFC)",
      "Dedicated environmental impact and coastal zoning indemnity warranties",
      "Comprehensive title deed notarization with private embassy courier delivery",
      "Seasonal rental pool optimization achieving up to 12% peak-month cash flow"
    ],
    propertiesCount: 9,
    coordinates: "43.7031° N, 7.2661° E",
    featuredProperty: {
      title: "Villa Solaria di Positano",
      location: "Cap d'Antibes & Amalfi Coast",
      priceUSD: 24500000,
      priceFormatted: "$24.5M",
      areaSqFt: 14200,
      bedrooms: 7,
      bathrooms: 9,
      keyFeature: "Private Deep-Water Superyacht Jetty & 3.2 Acre Cliff Estate",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80"
    },
    gallery: [
      {
        title: "Villa Thalassa Cliffside",
        location: "Santorini, Greece",
        price: "$11.8M",
        specs: "5 Beds • 6 Baths • 8,100 Sq Ft",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "The Belvedere Promontory",
        location: "Saint-Jean-Cap-Ferrat",
        price: "$28.0M",
        specs: "8 Beds • 10 Baths • 15,500 Sq Ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Casa del Mar Cantilever",
        location: "Mallorca, Spain",
        price: "$15.4M",
        specs: "6 Beds • 7 Baths • 9,800 Sq Ft",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    id: "offplan",
    number: "03",
    name: "Off-Plan Developments",
    tagline: "High-Alpha Institutional Early Allocations",
    startingPriceUSD: 1800000,
    startingPriceFormatted: "From $1.8M",
    accentColor: "#06B6D4",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    accentRgb: "6, 182, 212",
    description: "Prime early-phase capital growth opportunities in prime international corridors.",
    longDescription: "Secure ground-floor institutional valuations in prime branded developments across Tokyo, Zurich, Miami, and Dubai. Structured with staged milestones, guaranteed pre-completion equity appreciation, and developer buyback protection.",
    initialAllocationUSD: 120000,
    initialAllocationFormatted: "$120,000",
    estimatedYield: "12.8% Projected IRR",
    yieldNumeric: 12.8,
    serviceRetainerUSD: 750,
    serviceRetainerFormatted: "$750/mo",
    serviceRetainerLabel: "Milestone Auditing & Construction Escrow Monitoring",
    curatedSpecs: [
      "Staged payment schedule (10% reservation, 40% construction linked, 50% on handover)",
      "Developer bank guarantees backing 100% of deposited capital",
      "Early-bird preferential pricing (typically 22-30% below launch index)",
      "Assignment rights permitting resale pre-completion without penalty",
      "Full turnkey interior package included by world-renowned design firms",
      "Priority allocation in future portfolio phases and flagship releases"
    ],
    termsAndAdvisory: [
      "Government-regulated master escrow trust accounts with audited milestones",
      "Standardized FIDIC contracts with international arbitration clauses (ICC Paris)",
      "Tax-neutral completion structures with zero capital gains in qualifying zones",
      "Institutional exit routes via pre-arranged private REIT buyback covenants",
      "Dedicated independent quantity surveyor quarterly video reports"
    ],
    propertiesCount: 22,
    coordinates: "35.6762° N, 139.6503° E",
    featuredProperty: {
      title: "The Luminar Tower Residences",
      location: "Minato, Tokyo & Dubai Financial Centre",
      priceUSD: 2850000,
      priceFormatted: "$2.85M",
      areaSqFt: 3100,
      bedrooms: 3,
      bathrooms: 3.5,
      keyFeature: "Q4 2027 Handover • 28% Expected Pre-Completion Alpha",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
    },
    gallery: [
      {
        title: "Aetheria Residences",
        location: "Brickell, Miami",
        price: "$2.2M",
        specs: "2 Beds • 2.5 Baths • 2,400 Sq Ft",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "The Sovereign Apex",
        location: "Business Bay, Dubai",
        price: "$3.6M",
        specs: "4 Beds • 4 Baths • 4,100 Sq Ft",
        image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Koto District Tower",
        location: "Roppongi, Tokyo",
        price: "$4.1M",
        specs: "3 Beds • 3.5 Baths • 3,500 Sq Ft",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    id: "island",
    number: "04",
    name: "Private Island Estates",
    tagline: "Autonomous Sovereign Sanctuaries",
    startingPriceUSD: 22000000,
    startingPriceFormatted: "From $22.0M+",
    accentColor: "#8B5CF6",
    accentGlow: "rgba(139, 92, 246, 0.4)",
    accentRgb: "139, 92, 246",
    description: "Fully sovereign private sanctuaries with bespoke aviation and yachting infrastructure.",
    longDescription: "The zenith of generational capital allocation. Entirely sovereign archipelagic holdings offering complete territorial jurisdiction, private asphalt airstrips, mega-yacht moorings, desalination plants, and military-grade satellite autonomy.",
    initialAllocationUSD: 1500000,
    initialAllocationFormatted: "$1,500,000",
    estimatedYield: "5.4% Sovereign Appreciation + Yield",
    yieldNumeric: 5.4,
    serviceRetainerUSD: 8500,
    serviceRetainerFormatted: "$8,500/mo",
    serviceRetainerLabel: "Island Grid Maintenance, Security & Aviation Crew",
    curatedSpecs: [
      "1,400-meter private paved runway certified for Gulfstream G650 / Global 7500",
      "Deep-water marina engineered for superyachts up to 90 meters",
      "Multi-megawatt solar & tidal microgrid with 30-day diesel generator reserve",
      "Reverse-osmosis seawater desalination facility (200,000 L/day capacity)",
      "Private satellite uplink array with fiber-optic island-wide ring network",
      "Sovereign freehold territory across 45 to 220 hectares with private marine perimeter",
      "Architectural main lodge plus 6 independent VIP guest pavilions"
    ],
    termsAndAdvisory: [
      "100% Sovereign Title Fee-Simple with maritime exclusion zone protection",
      "Bespoke sovereign tax agreements with zero municipal or capital levy obligations",
      "Full diplomatic protocol clearance & private customs port-of-entry designation",
      "Complete aviation and maritime international call-sign allocation",
      "Direct bilateral transaction routing with Swiss bank vault security certificates"
    ],
    propertiesCount: 4,
    coordinates: "24.2532° N, 77.6256° W",
    featuredProperty: {
      title: "Isla de la Palma Sovereign Atoll",
      location: "Exuma Cays, Bahamas & South Pacific",
      priceUSD: 48000000,
      priceFormatted: "$48.0M",
      areaSqFt: 38000,
      bedrooms: 12,
      bathrooms: 16,
      keyFeature: "Private 1.4km Jet Runway, 80-Acre Private Sovereign Atoll",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80"
    },
    gallery: [
      {
        title: "Cayo Sereno Sanctuary",
        location: "Exumas, Bahamas",
        price: "$34.0M",
        specs: "10 Beds • 12 Baths • 28,000 Sq Ft",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Motu Tane Sovereign Atoll",
        location: "French Polynesia",
        price: "$52.0M",
        specs: "14 Beds • 18 Baths • 45,000 Sq Ft",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Nautilus Private Archipelago",
        location: "Whitsundays, Australia",
        price: "$65.0M",
        specs: "16 Beds • 20 Baths • 52,000 Sq Ft",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  }
];

export interface PipelineStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  detailedProtocol: string;
  turnaroundTime: string;
  securityProtocol: string;
  requiredDocuments: string[];
  deliverable: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "enquiry",
    stepNumber: "01",
    title: "Private Enquiry",
    shortDesc: "Initial encrypted outreach via private key or verified family office intermediary.",
    detailedProtocol: "Your dedicated senior acquisitions partner initiates a discreet 1-on-1 dialogue over encrypted channels. We assess asset parameters, confidential geographic preferences, and capital allocation horizons.",
    turnaroundTime: "Within 2 Hours",
    securityProtocol: "AES-256 Encrypted Dossier Transmission & Zero-Knowledge Storage",
    requiredDocuments: ["Proof of Representative Authority / Letter of Introduction", "Bilateral NDA Confirmation"],
    deliverable: "Confidential Client Key & Access to Tier Vault"
  },
  {
    id: "kyc",
    stepNumber: "02",
    title: "KYC Verification",
    shortDesc: "Discreet institutional verification handled via Tier-1 private banking networks.",
    detailedProtocol: "Frictionless source-of-wealth confirmation performed directly through Swiss or Luxembourg banking conduits, ensuring 100% compliance with international anti-money laundering frameworks without public exposure.",
    turnaroundTime: "12 - 24 Hours",
    securityProtocol: "Swiss Federal Banking Secrecy Standard & FINMA Compliance",
    requiredDocuments: ["Institutional Bank Reference Letter", "Beneficial Owner Passport / Corporate Entity By-Laws"],
    deliverable: "Verified Sovereign Mandate Token"
  },
  {
    id: "vr",
    stepNumber: "03",
    title: "VR Walkthrough",
    shortDesc: "Sub-millimeter spatial digital twin exploration in private virtual screening rooms.",
    detailedProtocol: "Access our ultra-high-definition spatial digital twin platform. Inspect every architectural angle, solar orientation study, acoustic insulation telemetry, and live camera feed with real-time architectural narration.",
    turnaroundTime: "On-Demand 24/7",
    securityProtocol: "Dedicated Air-Gapped Spatial Streaming Node",
    requiredDocuments: ["Client Portal Biometric Passkey"],
    deliverable: "Complete CAD/BIM Model Telemetry & 4K Spatial Recording"
  },
  {
    id: "escrow",
    stepNumber: "04",
    title: "Escrow Setup",
    shortDesc: "Segregated legal escrow routing backed by statutory title insurance.",
    detailedProtocol: "Initial reservation deposit is locked into a designated top-tier notary or escrow trust account. Funds remain 100% refundable pending private physical inspection and clear title clearance.",
    turnaroundTime: "24 - 48 Hours",
    securityProtocol: "Multi-Signature Escrow Governance with Lloyd's of London Insurance",
    requiredDocuments: ["Escrow Agreement Signing", "Wire Routing Instructions"],
    deliverable: "Official Escrow Deposit Certificate & Asset Lockout Notice"
  },
  {
    id: "viewing",
    stepNumber: "05",
    title: "Private Viewing",
    shortDesc: "White-glove private jet charter or yacht transfer for on-site physical inspection.",
    detailedProtocol: "Experience the estate in person. We coordinate private aviation transfers, armored chauffeur transport, private security details, and curated fine dining during your confidential on-site inspection.",
    turnaroundTime: "Custom Schedule (24-72h Notice)",
    securityProtocol: "Diplomatic-Grade Ground & Maritime Security Detail",
    requiredDocuments: ["Travel Roster & Tailored Flight Manifest"],
    deliverable: "Physical Estate Verification & Master Snagging Report"
  },
  {
    id: "notary",
    stepNumber: "06",
    title: "Notary Sign-off",
    shortDesc: "High-court notary and international legal counsel execution.",
    detailedProtocol: "Final deed execution performed in presence of accredited notaries and bilateral legal counsel. All foreign ownership covenants, tax exemptions, and title insurances are ratified and sealed.",
    turnaroundTime: "3 - 5 Business Days",
    securityProtocol: "High Court Notary Holographic Seal & Digital Blockchain Registry",
    requiredDocuments: ["Final Notarized Conveyance Deed", "Power of Attorney (if remote)"],
    deliverable: "Registered Statutory Freehold Title Deed"
  },
  {
    id: "handover",
    stepNumber: "07",
    title: "Key Handover",
    shortDesc: "Turnkey delivery with biometric keycards, full staff induction, and champagne reception.",
    deliverable: "Platinum Vault Master Box, Biometric Access & Concierge Retainer",
    detailedProtocol: "The definitive moment. Our master estate steward delivers the custom titanium presentation chest containing biometric transponders, bespoke operating manuals, wine cellar inventory, and staffed team introduction.",
    turnaroundTime: "Immediate upon Closing",
    securityProtocol: "Physical Biometric Recoding & Sovereign Perimeter Activation",
    requiredDocuments: ["Handover Protocol Acceptance", "Concierge Retainer Agreement"]
  }
];

export interface AssetArchetype {
  id: string;
  name: string;
  subtitle: string;
  valueProp: string;
  avgTicket: string;
  avgYield: string;
  holdingHorizon: string;
  blueprintNodes: {
    title: string;
    description: string;
  }[];
  strategicHighlights: string[];
  keyJurisdictions: string[];
}

export const ASSET_ARCHETYPES: Record<string, AssetArchetype> = {
  residential: {
    id: "residential",
    name: "Ultra-Luxury Residential",
    subtitle: "Generational Landmark Residences",
    valueProp: "Turn private capital into generational landmark living.",
    avgTicket: "$6.2M - $25M+",
    avgYield: "5.8% - 7.5% Net",
    holdingHorizon: "Generational (10+ Years)",
    blueprintNodes: [
      { title: "Client Dossier", description: "Deep preference profiling, architectural lifestyle scoping, and tax domicile planning." },
      { title: "Private Concierge", description: "Discreet matching with off-market off-radar trophy residences globally." },
      { title: "Deed Allocation", description: "Bespoke corporate structuring and secure notary escrow title transfer." },
      { title: "Bespoke Interior Fit", description: "Direct collaboration with leading European design houses and artisan contractors." },
      { title: "White-Glove Handover", description: "Turnkey key delivery, staff recruitment, and 24/7 concierge onboarding." }
    ],
    strategicHighlights: [
      "Prime metropolitan and coastal capital appreciation",
      "Complete personal territorial privacy and estate autonomy",
      "Qualifying gateway for global Golden Visa & Citizenship programs"
    ],
    keyJurisdictions: ["London Mayfair", "Manhattan", "French Riviera", "Zurich", "Dubai Palm"]
  },
  hotel: {
    id: "hotel",
    name: "Branded Hotel Residences",
    subtitle: "High-Yield Hospitality-Managed Assets",
    valueProp: "Turn prime urban footprint into high-yield passive luxury.",
    avgTicket: "$3.4M - $12M+",
    avgYield: "8.5% - 11.2% Net",
    holdingHorizon: "5 - 8 Years (High Cash Flow)",
    blueprintNodes: [
      { title: "Investor Inquiry", description: "Institutional yield modeling and historical RevPAR occupancy audits." },
      { title: "Rental Pool Opt-In", description: "Seamless management agreement under 5-star international hotel banners." },
      { title: "Hospitality Audit", description: "Quarterly inspection of fixture quality, guest satisfaction, and room upkeep." },
      { title: "Revenue Agreement", description: "Automated monthly accounting with zero landlord operational friction." },
      { title: "Quarterly Yield Distribution", description: "Direct dividend distribution to designated Swiss or international accounts." }
    ],
    strategicHighlights: [
      "Effortless passive income managed by Aman, Four Seasons, and Bulgari",
      "60-90 days complimentary personal owner stay per year with VIP perks",
      "Worldwide reciprocal hotel privileges and elite status"
    ],
    keyJurisdictions: ["Tokyo", "Miami Beach", "Courchevel 1850", "Dubai DIFC", "Milan"]
  },
  islands: {
    id: "islands",
    name: "Private Islands",
    subtitle: "Autonomous Sovereign Sanctuaries",
    valueProp: "Turn sovereign geography into an untouchable private haven.",
    avgTicket: "$22.0M - $85M+",
    avgYield: "Capital Security & Scarcity Alpha",
    holdingHorizon: "Permanent Sovereign Hold",
    blueprintNodes: [
      { title: "Sovereign Survey", description: "Bathymetric hydro-survey, maritime boundary verification, and soil analysis." },
      { title: "Eco-Masterplan", description: "Architectural blueprint balancing ecological integrity with luxury infrastructure." },
      { title: "Maritime Permitting", description: "Securing deep-water marina licenses, runway concessions, and exclusive airspace." },
      { title: "Infrastructure Build", description: "Desalination, solar microgrids, satellite arrays, and typhoon-resistant construction." },
      { title: "Sanctuary Commissioning", description: "Full security perimeter activation and commissioning of private marine fleet." }
    ],
    strategicHighlights: [
      "Absolute geopolitical insulation and territorial sovereignty",
      "Bespoke off-grid self-sufficiency with endless water and solar energy",
      "Ultra-rare asset class with finite global supply and immense prestige"
    ],
    keyJurisdictions: ["Exuma Cays Bahamas", "South Pacific Fiji", "Greek Archipelago", "Caribbean St. Barths"]
  },
  commercial: {
    id: "commercial",
    name: "Commercial Flagships",
    subtitle: "Triple-Net Institutional Assets",
    valueProp: "Turn high-street real estate into iconic institutional assets.",
    avgTicket: "$35.0M - $120M+",
    avgYield: "6.8% - 8.4% Cap Rate",
    holdingHorizon: "7 - 15 Years",
    blueprintNodes: [
      { title: "Institutional RFP", description: "Confidential acquisition mandate matching with institutional sellers." },
      { title: "Anchor Tenant Audit", description: "Credit-rating evaluation of luxury conglomerate tenants (LVMH, Kering, Richemont)." },
      { title: "Cap-Rate Valuation", description: "Discounted cash flow analysis and inflation-hedged indexation modeling." },
      { title: "Asset Structuring", description: "Special Purpose Vehicle (SPV) formation with cross-border tax optimization." },
      { title: "Yield Execution", description: "Quarterly institutional dividend distribution under long-term NNN leaseholds." }
    ],
    strategicHighlights: [
      "15 to 25 year long-term non-cancellable Triple-Net (NNN) leases",
      "Blue-chip institutional covenant tenants with sovereign-grade balance sheets",
      "Prime trophy streets: Avenue Montaigne, Fifth Avenue, Ginza, New Bond Street"
    ],
    keyJurisdictions: ["New York 5th Ave", "Paris Ave Montaigne", "London New Bond St", "Tokyo Ginza"]
  }
};

export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1.0, name: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.92, name: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.79, name: "British Pound" },
  { code: "AED", symbol: "AED ", rate: 3.67, name: "UAE Dirham" },
  { code: "CHF", symbol: "CHF ", rate: 0.88, name: "Swiss Franc" }
];

export interface ColorTheme {
  id: string;
  name: string;
  subtitle: string;
  bgNoir: string;
  surfaceGlass: string;
  borderAccent: string;
  textPrimary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentBadge: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "light-alabaster",
    name: "Carrara Light & Gold (Default)",
    subtitle: "Crisp Alabaster Architectural Marble",
    bgNoir: "#F8F9FA",
    surfaceGlass: "rgba(255, 255, 255, 0.88)",
    borderAccent: "rgba(184, 134, 11, 0.28)",
    textPrimary: "#0F172A",
    textMuted: "#64748B",
    accentPrimary: "#B8860B",
    accentSecondary: "#9A7B4F",
    accentBadge: "#0284C7",
  },
  {
    id: "light-sand",
    name: "Travertine Sand & Bronze",
    subtitle: "Warm Mediterranean Light",
    bgNoir: "#F5F4F0",
    surfaceGlass: "rgba(255, 253, 250, 0.90)",
    borderAccent: "rgba(180, 140, 95, 0.32)",
    textPrimary: "#1C1917",
    textMuted: "#78716C",
    accentPrimary: "#A16207",
    accentSecondary: "#C8A97E",
    accentBadge: "#059669",
  },
  {
    id: "light-coastal",
    name: "Nordic Coastal & Azure",
    subtitle: "Clean Frost Silver & Cyan",
    bgNoir: "#F0F4F8",
    surfaceGlass: "rgba(255, 255, 255, 0.92)",
    borderAccent: "rgba(14, 165, 233, 0.28)",
    textPrimary: "#0C4A6E",
    textMuted: "#475569",
    accentPrimary: "#0284C7",
    accentSecondary: "#38BDF8",
    accentBadge: "#10B981",
  },
  {
    id: "noir-obsidian",
    name: "Obsidian Noir (Dark Mode)",
    subtitle: "Deep Velvet Dark Space",
    bgNoir: "#060709",
    surfaceGlass: "rgba(18, 17, 24, 0.8)",
    borderAccent: "rgba(200, 169, 126, 0.22)",
    textPrimary: "#FAF8F5",
    textMuted: "#A39E93",
    accentPrimary: "#C8A97E",
    accentSecondary: "#E5C99F",
    accentBadge: "#38BDF8",
  }
];
