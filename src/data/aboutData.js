// Partner Logos
import adaniLogo from '../assets/partners/adani.svg';
import tataLogo from '../assets/partners/tata_steel.png';
import relianceLogo from '../assets/partners/reliance.png';
import jswLogo from '../assets/partners/jsw_steel.png';
import indianOilLogo from '../assets/partners/indian_oil.svg';
import godrejLogo from '../assets/partners/godrej.svg';
import haldiaLogo from '../assets/partners/haldia_petrochemicals.svg';
import birlaLogo from '../assets/partners/aditya_birla.png';
import bhushanLogo from '../assets/partners/bhushan_power.png';
import jindalLogo from '../assets/partners/jindal_steel.png';
import hpclLogo from '../assets/partners/hindustan_petroleum.png';

// Industry Visuals
import aerospaceImg from '../assets/Serving Global Mission-Critical Sectors/aerospace and defence.png';
import heavyEngImg from '../assets/Serving Global Mission-Critical Sectors/heavt engineering.png';
import marineImg from '../assets/Serving Global Mission-Critical Sectors/marine.png';
import nuclearImg from '../assets/Serving Global Mission-Critical Sectors/nuclear and thermal power.png';
import petrochemicalImg from '../assets/Serving Global Mission-Critical Sectors/petrochemical.png';
import pipingImg from '../assets/Serving Global Mission-Critical Sectors/precision industrial piping.png';

// Steel Imagery for Timeline & Visuals
import legacyImg2017 from '../assets/images/slide-5.jpg';
import legacyImg2020 from '../assets/images/slide-2.jpg';
import legacyImg2022 from '../assets/images/slide-3.jpg';
import legacyImg2024 from '../assets/images/slide-4.jpg';
import legacyImg2026 from '../assets/Product BG/precision pipes and fitting.png';
import storyImg from '../assets/images/company-story-steel.jpg';

export const aboutIntroData = {
  eyebrow: "ABOUT BHAWAL STEEL & ENGINEERING",
  headlineLine1: "ENGINEERED INTEGRITY.",
  headlineLine2: "GLOBAL INDUSTRIAL STEEL.",
  lead: "Specialized high-performance ferrous and exotic alloys engineered for severe operating environments, extreme pressures, and mission-critical infrastructure worldwide.",
  description: "Operating from our strategic Mumbai logistics hub, we connect certified primary steel mills with international EPC contractors through rigorous metallurgy, zero-defect quality control, and reliable global dispatch.",
  metrics: [
    { num: "2017", label: "Foundation Year" },
    { num: "40+", label: "Export Destinations" },
    { num: "100%", label: "Mill Certified Provenance" }
  ]
};

export const aboutLegacyMilestones = [
  {
    year: "2017",
    tag: "FOUNDATION",
    title: "Industrial Inception",
    description: "Founded with a focused vision for specialized industrial steel and certified alloy supply.",
    image: legacyImg2017,
    spec: "ASME / ASTM Standard Stock"
  },
  {
    year: "2020",
    tag: "CAPABILITY EXPANSION",
    title: "Product Range Scale",
    description: "Expanded product capabilities and customer reach across high-pressure process sectors.",
    image: legacyImg2020,
    spec: "Seamless Pipes, Tubes & Flanges"
  },
  {
    year: "2022",
    tag: "QUALITY & SOURCING",
    title: "Metallurgical Rigor",
    description: "Strengthened sourcing, quality assurance, and precision engineering capabilities.",
    image: legacyImg2022,
    spec: "Duplex, Super Duplex & Superalloys"
  },
  {
    year: "2024",
    tag: "GLOBAL LOGISTICS",
    title: "International Reach",
    description: "Expanded international supply channels and multi-sector industrial coverage.",
    image: legacyImg2024,
    spec: "Direct Global Port Dispatch"
  },
  {
    year: "2026",
    tag: "FUTURE READY",
    title: "Global Supply Network",
    description: "Building a stronger, more agile global industrial supply network with complete traceability.",
    image: legacyImg2026,
    spec: "EN 10204 3.1 & 3.2 Provenance"
  }
];

export const aboutLeadershipData = {
  eyebrow: "COMPANY STORY & PHILOSOPHY",
  tagline: "ENGINEERING MINDSET • METALLURGICAL RIGOR • RELIABLE SUPPLY",
  statement: "Precision is not an afterthought. In high-pressure pipelines and critical infrastructure, material integrity is everything.",
  lead: "At Bhawal Steel & Engineering Company, we approach industrial distribution with an engineering discipline. Every consignment is governed by exact chemical compositions, certified mill provenance, and stringent third-party quality verification.",
  subtext: "From our strategic Mumbai distribution hub, we connect premier metallurgical producers with international EPC contractors, ensuring zero-compromise reliability across every ton delivered.",
  pillars: [
    {
      num: "01",
      title: "Engineering Mindset",
      desc: "Deep metallurgical discipline ensuring every grade meets exact mechanical and chemical thresholds."
    },
    {
      num: "02",
      title: "Material & Quality Rigor",
      desc: "Complete heat-to-melt traceability with certified EN 10204 3.1 & 3.2 inspection dossiers."
    },
    {
      num: "03",
      title: "Long-Term Supply Trust",
      desc: "Prioritizing dependable multi-year industrial partnerships over short-term transactional supply."
    }
  ],
  image: storyImg
};

// Exactly 6 Quality Principles arranged in 3x2 Grid
export const aboutQualityPrinciples = [
  {
    id: "dimensional-precision",
    number: "01",
    tag: "TOLERANCE",
    title: "DIMENSIONAL PRECISION",
    subtitle: "Micron-Level Verification",
    description: "Calibrated optical and ultrasonic inspection ensuring exact wall thickness and schedule tolerances.",
    details: [
      "Ultrasonic wall-thickness audit",
      "Calibrated optical micrometer check",
      "Strict schedule & tolerance adherence"
    ],
    statusTag: "ASME B36.10 / B36.19"
  },
  {
    id: "chemical-integrity",
    number: "02",
    tag: "METALLURGY",
    title: "ALLOY INTEGRITY",
    subtitle: "Positive Material Identification",
    description: "100% portable XRF spectrometry analysis verifying chemical grade and heat chemistry.",
    details: [
      "100% portable XRF / PMI testing",
      "Heat-to-heat chemical spectrum audit",
      "Standardized tensile & yield verification"
    ],
    statusTag: "PMI 100% VERIFIED"
  },
  {
    id: "mill-traceability",
    number: "03",
    tag: "PROVENANCE",
    title: "MILL TRACEABILITY",
    subtitle: "Complete EN 10204 Dossiers",
    description: "Authentic mill test certificates tracing raw melt origin, production lot, and inspection logs.",
    details: [
      "Authentic EN 10204 3.1 & 3.2 certs",
      "Raw melt to finished product lineage",
      "Third-party inspection dossier ready"
    ],
    statusTag: "EN 10204 3.1 / 3.2"
  },
  {
    id: "severe-service",
    number: "04",
    tag: "TESTING",
    title: "SEVERE-SERVICE QA",
    subtitle: "Corrosion & Pressure Testing",
    description: "Hydrostatic, cryogenic impact, and intergranular corrosion tests for aggressive environments.",
    details: [
      "Hydrostatic pressure testing to spec",
      "Intergranular corrosion testing (IGC)",
      "Charpy V-notch impact validation"
    ],
    statusTag: "NACE MR0175 COMPLIANT"
  },
  {
    id: "surface-ndt",
    number: "05",
    tag: "INSPECTION",
    title: "NDT & SURFACE FINISH",
    subtitle: "Non-Destructive Testing",
    description: "Radiographic, liquid penetrant, and ultrasonic flaw detection for zero defect integrity.",
    details: [
      "Dye penetrant & magnetic particle tests",
      "Ultrasonic flaw & laminar scanning",
      "Surface roughness & Ra finish audit"
    ],
    statusTag: "ZERO DEFECT NDT"
  },
  {
    id: "reliable-supply",
    number: "06",
    tag: "LOGISTICS",
    title: "EXPEDITED DISPATCH",
    subtitle: "Mumbai Hub Inventory",
    description: "Ready-stock staging and priority maritime containerization for critical plant shutdowns.",
    details: [
      "Ready stock in standard & exotic grades",
      "Fast-track sea freight & air deployment",
      "Export-grade heavy crate packaging"
    ],
    statusTag: "FAST-TRACK READY"
  }
];

export const aboutPartnersList = [
  { name: "Adani", logo: adaniLogo },
  { name: "Tata Steel", logo: tataLogo },
  { name: "Reliance Industries", logo: relianceLogo },
  { name: "JSW Steel", logo: jswLogo },
  { name: "Indian Oil", logo: indianOilLogo },
  { name: "Godrej", logo: godrejLogo },
  { name: "Haldia Petrochemicals", logo: haldiaLogo },
  { name: "Aditya Birla", logo: birlaLogo },
  { name: "Bhushan Power", logo: bhushanLogo },
  { name: "Jindal Steel", logo: jindalLogo },
  { name: "Hindustan Petroleum", logo: hpclLogo }
];

export const aboutIndustriesData = [
  {
    id: "oil-gas",
    name: "Oil & Gas Refineries",
    tagline: "High-Pressure Hydrocarbon Piping",
    desc: "Sour service piping, heavy-wall fittings, and corrosion-resistant alloys for upstream and downstream extraction.",
    image: petrochemicalImg
  },
  {
    id: "power-energy",
    name: "Power Generation",
    tagline: "Thermal & Nuclear Steam Loops",
    desc: "High-temperature alloy tubes, boiler loops, and heat exchanger components certified for continuous operational loads.",
    image: nuclearImg
  },
  {
    id: "aerospace-defence",
    name: "Aerospace & Defence",
    tagline: "Ultra-High Strength Superalloys",
    desc: "Specialized titanium, nickel alloys, and precision round bars engineered for extreme strength-to-weight ratios.",
    image: aerospaceImg
  },
  {
    id: "heavy-engineering",
    name: "Heavy Engineering",
    tagline: "Forged Rounds & Structural Plates",
    desc: "High-yield structural steels, shafts, and pressure-vessel plates powering heavy machinery and infrastructure.",
    image: heavyEngImg
  },
  {
    id: "marine-offshore",
    name: "Marine & Offshore",
    tagline: "Seawater Corrosion Mastery",
    desc: "Duplex, Super Duplex, and Cupro-Nickel piping engineered for deep-sea immersion, ballast lines, and desalination.",
    image: marineImg
  },
  {
    id: "piping-processing",
    name: "Process & Chemical",
    tagline: "Aggressive Media & Sanitary Standards",
    desc: "Electropolished stainless tubing and valve hardware designed for sterile pharmaceutical and acid processing lines.",
    image: pipingImg
  }
];

export const aboutImpactNumbers = [
  { value: 500, suffix: "+", label: "Industrial Clients", detail: "Global conglomerates, refiners, and EPC contractors served" },
  { value: 40, suffix: "+", label: "Export Destinations", detail: "Active cross-border supply lines across GCC, Europe, and Asia" },
  { value: 100, suffix: "%", label: "Certified Traceability", detail: "Every item backed by verified EN 10204 inspection dossiers" },
  { value: 50, suffix: "+", label: "Specialized Alloy Grades", detail: "Ready stock inventory in stainless, duplex, nickel, and titanium" }
];

export const aboutCertificationsData = {
  eyebrow: "STANDARDS & MATERIAL CAPABILITY",
  heading: "ISO 9001 Certified & Recognized Export House",
  subheading: "Comprehensive metallurgy and quality management across all grades.",
  certifications: [
    { title: "ISO 9001:2015", desc: "Certified Quality Management System covering procurement, inspection, and global distribution." },
    { title: "Govt. Recognized Export House", desc: "Accredited international status ensuring expedited customs and priority shipping lines." },
    { title: "MSME Registered Enterprise", desc: "Recognized Indian industrial enterprise with verified supply infrastructure." }
  ],
  materialGrades: [
    { category: "Stainless Steel", grades: "304, 304L, 316, 316L, 316Ti, 321, 310S, 347, 410, 446" },
    { category: "Duplex & Super Duplex", grades: "UNS S31803, S32205, S32750, S32760 (F51, F53, F55)" },
    { category: "Nickel & High-Performance Alloys", grades: "Inconel 600/625, Incoloy 800/825, Monel 400/K500, Hastelloy C276" },
    { category: "Titanium & Special Alloys", grades: "Grade 1, Grade 2, Grade 5 (Ti-6Al-4V), Grade 7, Cu-Ni 90/10 & 70/30" }
  ]
};

export const aboutCTAData = {
  eyebrow: "START YOUR PROCUREMENT",
  heading: "Ready for Precision Steel Supply?",
  tagline: "Let's engineer your project requirements together.",
  description: "Connect with our Mumbai technical desk for certified material specifications, mill test dossiers, and expedited international freight schedules.",
  primaryAction: { label: "Request Technical Quote", href: "#contact" },
  secondaryAction: { label: "Call Export Desk", href: "tel:+919223381575" }
};
