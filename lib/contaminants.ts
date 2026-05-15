/**
 * Canonical contaminant registry.
 *
 * Numbers below are EPA MCL (Maximum Contaminant Level — legal limit) and
 * EPA MCLG (Goal — health-based, often non-enforceable). EWG health
 * guidelines are listed where the foundation has independently verified
 * them; they are stricter than EPA MCLs in most cases and are presented as
 * a separate health-protective reference, not a regulatory standard.
 *
 * Units:
 *   ppb  = micrograms per liter (µg/L)
 *   ppm  = milligrams per liter (mg/L)
 *   ng/L = nanograms per liter
 */

export type ContaminantCategory =
  | "metal"
  | "industrial"
  | "disinfectant"
  | "disinfection-byproduct"
  | "agricultural"
  | "natural"
  | "microbial"
  | "pharmaceutical";

export type HealthEffect =
  | "cancer"
  | "developmental"
  | "neurological"
  | "hormonal"
  | "cardiovascular"
  | "kidney"
  | "liver"
  | "reproductive"
  | "skin"
  | "immune"
  | "thyroid";

export interface ContaminantLevel {
  value: number;
  unit: "ppb" | "ppm" | "ng/L";
}

export interface Contaminant {
  slug: string;
  name: string;
  formula?: string;
  category: ContaminantCategory;
  oneLine: string;
  whatItIs: string;
  sources: string[];
  healthEffects: {
    summary: string;
    bullets: { label: string; detail: string }[];
    tags: HealthEffect[];
  };
  regulation: {
    mcl: ContaminantLevel | null;
    mclLabel?: string;
    mclg: ContaminantLevel | null;
    mclgLabel?: string;
    ewgGuideline?: ContaminantLevel | null;
    ewgNote?: string;
    note?: string;
  };
  removedBy: string[];
  regionsAffected?: string;
  sourceIds: string[];
}

export const CONTAMINANTS: Contaminant[] = [
  {
    slug: "lead",
    name: "Lead",
    formula: "Pb",
    category: "metal",
    oneLine:
      "A neurotoxic metal that leaches from old pipes and solder. No safe level for children.",
    whatItIs:
      "Lead is a heavy metal that was used in service lines, plumbing solder, and brass fixtures for most of the 20th century. It does not occur in source water at meaningful levels — it gets into tap water on the trip from the main into your house, especially when water sits in the pipes for hours.",
    sources: [
      "Lead service lines (still ~9 million in the U.S.)",
      "Lead solder in pre-1986 plumbing",
      "Brass faucets and fittings (legal up to 0.25% lead through 2014)",
      "Galvanized pipes downstream of lead",
    ],
    healthEffects: {
      summary:
        "There is no known safe blood lead level in children. Lead exposure during fetal development and early childhood is associated with permanent reductions in IQ, learning, and attention. In adults, chronic exposure is linked to high blood pressure, kidney impairment, and cognitive decline.",
      bullets: [
        {
          label: "Children & infants",
          detail:
            "Even low-dose lead exposure is linked to lower IQ, behavioral problems, and slowed growth. Formula prepared with tap water is a major exposure route in lead-pipe homes.",
        },
        {
          label: "Pregnancy",
          detail:
            "Lead crosses the placenta. Maternal exposure is associated with preterm birth and reduced fetal growth.",
        },
        {
          label: "Adults",
          detail:
            "Long-term exposure is linked to elevated blood pressure, cardiovascular disease, kidney damage, and reproductive harm.",
        },
      ],
      tags: ["developmental", "neurological", "cardiovascular", "kidney"],
    },
    regulation: {
      mcl: null,
      mclLabel: "Action level: 10 ppb (lowered from 15 ppb in 2024)",
      mclg: { value: 0, unit: "ppb" },
      mclgLabel: "0 ppb (zero — no safe level)",
      ewgGuideline: { value: 1, unit: "ppb" },
      ewgNote:
        "EWG and the American Academy of Pediatrics recommend treating any detectable lead as a problem.",
      note:
        "Lead is regulated by an 'action level' at the tap, not a strict MCL. If more than 10% of homes tested exceed the action level, utilities must take corrective action.",
    },
    removedBy: [
      "NSF/ANSI 53 certified carbon block filters",
      "Reverse osmosis (NSF/ANSI 58)",
      "Distillation",
    ],
    regionsAffected:
      "Highest risk in older urban housing stock — concentrated in the Midwest and Northeast (e.g., Chicago, Cleveland, Milwaukee, Detroit, New York City).",
    sourceIds: ["epa-lead-copper", "cdc-lead", "nrdc-lead", "epa-lead-inventory"],
  },
  {
    slug: "pfas",
    name: "PFAS (Forever Chemicals)",
    category: "industrial",
    oneLine:
      "A class of ~15,000 synthetic chemicals that don't break down. Now regulated for the first time.",
    whatItIs:
      "PFAS — per- and polyfluoroalkyl substances — are a family of about 15,000 synthetic chemicals used since the 1940s in non-stick coatings, waterproof fabrics, firefighting foam, food packaging, and hundreds of other products. The carbon-fluorine bond at their core is one of the strongest in chemistry, which is why they are called 'forever chemicals' — they do not meaningfully break down in nature, in water-treatment plants, or in the human body.",
    sources: [
      "Firefighting foam used at military bases and airports",
      "Industrial discharge from manufacturers",
      "Landfill leachate",
      "Biosolids spread as agricultural fertilizer",
      "Atmospheric deposition (literally raining out of the sky)",
    ],
    healthEffects: {
      summary:
        "PFAS exposure is associated with kidney and testicular cancer, immune system suppression (including reduced vaccine response in children), thyroid disease, increased cholesterol, pregnancy-induced hypertension, and developmental effects in infants. The science is most certain on PFOA and PFOS — older, longer-chain compounds — but the newer 'replacement' PFAS like GenX show similar toxicity in animal studies.",
      bullets: [
        {
          label: "Cancer",
          detail:
            "PFOA is classified by IARC as 'carcinogenic to humans' (Group 1) and PFOS as 'possibly carcinogenic' (Group 2B). The strongest associations are with kidney and testicular cancer.",
        },
        {
          label: "Immune system",
          detail:
            "Even low-dose PFAS exposure reduces antibody response to childhood vaccines, suggesting immune suppression.",
        },
        {
          label: "Pregnancy & infants",
          detail:
            "Linked to reduced fetal growth, low birth weight, and pregnancy-induced hypertension.",
        },
      ],
      tags: ["cancer", "immune", "thyroid", "reproductive", "liver"],
    },
    regulation: {
      mcl: { value: 4, unit: "ng/L" },
      mclLabel: "PFOA: 4 ng/L (= 4 ppt), PFOS: 4 ng/L (Final Rule, April 2024)",
      mclg: { value: 0, unit: "ng/L" },
      mclgLabel: "0 ng/L for PFOA and PFOS",
      ewgGuideline: { value: 1, unit: "ng/L" },
      ewgNote: "EWG recommends a 1 ppt combined limit — four times stricter than EPA.",
      note:
        "EPA also set MCLs for PFHxS, HFPO-DA (GenX), and PFNA, plus a Hazard Index for mixtures. Utilities have until 2029 to comply.",
    },
    removedBy: [
      "Reverse osmosis (NSF/ANSI 58)",
      "Granular activated carbon (NSF/ANSI 53 + P473)",
      "Ion exchange resins",
    ],
    regionsAffected:
      "Detected in the tap water of at least 45% of U.S. samples (USGS, 2023). Highest concentrations near military bases, airports, and manufacturing sites — especially in the Mid-Atlantic, Great Lakes, and Southeast.",
    sourceIds: ["epa-pfas", "atsdr-pfas", "niehs-pfas", "usgs-pfas", "ewg-pfas-map"],
  },
  {
    slug: "chlorine",
    name: "Chlorine & Chloramine",
    formula: "Cl₂ / NH₂Cl",
    category: "disinfectant",
    oneLine:
      "The reason your water is safe to drink — and the reason it can smell like a pool.",
    whatItIs:
      "Chlorine has been added to U.S. drinking water since the early 1900s to kill bacteria, viruses, and parasites. Many utilities have since switched to chloramine — chlorine bound to ammonia — because it persists longer in pipes. Disinfection is the single biggest public-health win in drinking water history. The trade-off is that disinfectants react with organic matter in water to form disinfection byproducts (DBPs), some of which are regulated carcinogens.",
    sources: [
      "Intentionally added at the treatment plant",
      "Required by EPA to maintain a residual through the distribution system",
    ],
    healthEffects: {
      summary:
        "At regulated levels, chlorine and chloramine themselves are not considered a major health concern for ingestion. The bigger issue is the disinfection byproducts they create (TTHMs, HAAs), which are associated with bladder cancer at chronic high exposure. Chloramine is also corrosive to certain pipe materials and can be harmful to dialysis patients and aquarium fish if not removed.",
      bullets: [
        {
          label: "Skin & respiratory",
          detail:
            "Some people experience dry skin, eczema flare-ups, and respiratory irritation in chlorinated showers. Evidence is mixed.",
        },
        {
          label: "Microbiome",
          detail:
            "Whether residual chlorine at tap levels meaningfully impacts the gut microbiome is an active research question. Current evidence in humans is limited.",
        },
        {
          label: "DBPs",
          detail:
            "Trihalomethanes (TTHMs) and haloacetic acids (HAAs) are the regulated byproducts and are linked to bladder cancer at chronic high exposure.",
        },
      ],
      tags: ["cancer", "skin"],
    },
    regulation: {
      mcl: { value: 4, unit: "ppm" },
      mclLabel: "MRDL: 4.0 ppm (max residual disinfectant level)",
      mclg: { value: 4, unit: "ppm" },
      mclgLabel: "MRDLG: 4.0 ppm",
      note:
        "Chlorine itself is regulated as a 'maximum residual disinfectant level' rather than a contaminant. TTHMs and HAA5 — the byproducts — have their own MCLs (80 ppb and 60 ppb).",
    },
    removedBy: [
      "Activated carbon (NSF/ANSI 42 for taste/odor, 53 for DBPs)",
      "Reverse osmosis",
      "Vitamin C (ascorbic acid) for bath/shower applications",
    ],
    regionsAffected: "Universal — almost all U.S. public water systems use chlorine or chloramine.",
    sourceIds: ["epa-chlorine", "epa-mcl"],
  },
  {
    slug: "fluoride",
    name: "Fluoride",
    formula: "F⁻",
    category: "natural",
    oneLine:
      "Added to ~62% of U.S. public water to prevent cavities. Newly reviewed for neurodevelopmental effects at high doses.",
    whatItIs:
      "Fluoride occurs naturally in groundwater and is also added to many public water supplies at low concentrations (typically 0.7 mg/L) to reduce tooth decay. The CDC ranks community water fluoridation among the top ten public-health achievements of the 20th century. In 2024, the National Toxicology Program (NTP) concluded with 'moderate confidence' that higher fluoride exposures — above 1.5 mg/L, roughly twice the U.S. recommended level — are associated with lower IQ in children. The U.S. recommended level was not directly studied, and the NTP report does not conclude that fluoridated tap water at U.S. levels causes harm.",
    sources: [
      "Naturally occurring in many groundwater aquifers",
      "Intentionally added for cavity prevention (fluoridation)",
      "Some industrial discharge",
    ],
    healthEffects: {
      summary:
        "At U.S. fluoridation levels (~0.7 mg/L), the benefit for cavity prevention is well-established. Above 1.5 mg/L, the NTP 2024 monograph found a consistent association with lower IQ in children, though the studies that support this are concentrated in regions with naturally high fluoride (China, India, Mexico). Above 2 mg/L, dental fluorosis (white spots on teeth) becomes common. Above 4 mg/L, skeletal fluorosis is possible with chronic exposure.",
      bullets: [
        {
          label: "Cavity prevention",
          detail:
            "Robust, replicated, decades of evidence that fluoridated water reduces tooth decay, especially in low-income populations with limited dental care access.",
        },
        {
          label: "Neurodevelopment",
          detail:
            "NTP (2024) found 'moderate confidence' association with lower IQ above 1.5 mg/L. The strength of evidence at U.S. levels (0.7 mg/L) is much weaker and remains contested.",
        },
        {
          label: "Dental fluorosis",
          detail:
            "Mild fluorosis (white flecking) affects about 1 in 4 American children, mostly cosmetic.",
        },
      ],
      tags: ["neurological", "developmental"],
    },
    regulation: {
      mcl: { value: 4, unit: "ppm" },
      mclLabel: "MCL: 4.0 mg/L (enforceable)",
      mclg: { value: 4, unit: "ppm" },
      mclgLabel: "MCLG: 4.0 mg/L",
      ewgGuideline: { value: 0.7, unit: "ppm" },
      ewgNote: "U.S. Public Health Service recommends 0.7 mg/L as the optimal fluoridation level.",
      note:
        "EPA also sets a 'secondary' (non-enforceable) standard of 2.0 mg/L to prevent dental fluorosis.",
    },
    removedBy: [
      "Reverse osmosis (NSF/ANSI 58)",
      "Activated alumina",
      "Distillation",
      "Note: most carbon filters do NOT remove fluoride",
    ],
    regionsAffected:
      "About 62% of the U.S. population on public water receives fluoridated water. Naturally elevated levels (>2 mg/L) occur in parts of Texas, Oklahoma, Colorado, Arizona, and the Carolinas.",
    sourceIds: ["cdc-fluoride", "nih-ntp-fluoride", "epa-mcl"],
  },
  {
    slug: "arsenic",
    name: "Arsenic",
    formula: "As",
    category: "natural",
    oneLine:
      "A naturally occurring carcinogen. Highest in private wells and the rural Southwest.",
    whatItIs:
      "Arsenic is a semi-metal that occurs naturally in bedrock across much of the U.S. It leaches into groundwater, which is why private wells and small rural systems are the highest-risk source. Industrial sources include mining, smelting, and historical agricultural pesticides. Arsenic is a known human carcinogen (IARC Group 1).",
    sources: [
      "Naturally occurring in bedrock and groundwater",
      "Mining and smelting operations",
      "Historical pesticide use (especially on cotton and orchards)",
      "Coal-fired power plant ash",
    ],
    healthEffects: {
      summary:
        "Long-term exposure to even moderate arsenic levels is linked to bladder, lung, and skin cancer; cardiovascular disease; diabetes; and developmental effects in children. Acute toxicity is rare in U.S. tap water, but chronic low-dose exposure is the concern.",
      bullets: [
        {
          label: "Cancer",
          detail:
            "Established human carcinogen. Bladder, lung, and skin cancers show the clearest dose-response relationship.",
        },
        {
          label: "Cardiovascular",
          detail: "Chronic exposure linked to elevated blood pressure and heart disease.",
        },
        {
          label: "Children",
          detail:
            "Prenatal and early-life exposure linked to reduced cognitive function and immune effects.",
        },
      ],
      tags: ["cancer", "cardiovascular", "developmental"],
    },
    regulation: {
      mcl: { value: 10, unit: "ppb" },
      mclLabel: "MCL: 10 ppb (lowered from 50 ppb in 2001)",
      mclg: { value: 0, unit: "ppb" },
      mclgLabel: "MCLG: 0 ppb",
      ewgGuideline: { value: 0.004, unit: "ppb" },
      ewgNote: "EWG's health guideline of 0.004 ppb reflects a 1-in-a-million cancer risk.",
    },
    removedBy: [
      "Reverse osmosis (most effective)",
      "Activated alumina",
      "Anion exchange",
      "Distillation",
    ],
    regionsAffected:
      "Highest in the Southwest (especially New Mexico, Arizona, Nevada), parts of the Upper Midwest, and New England. Private wells nationwide are at elevated risk because they are not federally regulated.",
    sourceIds: ["epa-mcl", "who-guidelines"],
  },
  {
    slug: "nitrate",
    name: "Nitrate",
    formula: "NO₃⁻",
    category: "agricultural",
    oneLine:
      "Fertilizer and animal waste runoff. Acutely dangerous for infants under 6 months.",
    whatItIs:
      "Nitrate is a nitrogen compound that enters water from agricultural fertilizer, livestock manure, and septic systems. It is the most common groundwater contaminant in U.S. farm country. Unlike most contaminants, the acute risk is the larger story: high nitrate levels can cause methemoglobinemia ('blue baby syndrome') in infants under 6 months, in which hemoglobin is rendered unable to carry oxygen.",
    sources: [
      "Agricultural fertilizer runoff",
      "Concentrated animal feeding operations (CAFOs)",
      "Septic system discharge",
      "Atmospheric deposition (from combustion)",
    ],
    healthEffects: {
      summary:
        "Acutely dangerous for infants under 6 months at levels above 10 mg/L. Longer-term, growing evidence links chronic exposure to colorectal cancer, thyroid disease, and adverse pregnancy outcomes — and some research suggests these effects may occur at levels below the EPA MCL.",
      bullets: [
        {
          label: "Infants",
          detail:
            "Methemoglobinemia ('blue baby syndrome') — life-threatening at high doses. Never use unfiltered tap water with detectable nitrate to mix infant formula in agricultural regions.",
        },
        {
          label: "Cancer",
          detail:
            "Multiple cohort studies associate chronic nitrate exposure (often at sub-MCL levels) with colorectal, bladder, and ovarian cancer risk.",
        },
        {
          label: "Pregnancy",
          detail: "Associated with neural tube defects and other adverse birth outcomes.",
        },
      ],
      tags: ["cancer", "developmental", "thyroid"],
    },
    regulation: {
      mcl: { value: 10, unit: "ppm" },
      mclLabel: "MCL: 10 mg/L as nitrogen",
      mclg: { value: 10, unit: "ppm" },
      mclgLabel: "MCLG: 10 mg/L",
      ewgGuideline: { value: 0.14, unit: "ppm" },
      ewgNote: "EWG health guideline of 0.14 mg/L reflects emerging cancer-risk evidence.",
    },
    removedBy: [
      "Reverse osmosis",
      "Anion exchange",
      "Distillation",
      "Note: boiling concentrates nitrate, it does not remove it",
    ],
    regionsAffected:
      "Highest in the Corn Belt (Iowa, Nebraska, Minnesota, Illinois) and the Central Valley of California. Private wells in farm country are the highest-risk source.",
    sourceIds: ["epa-mcl"],
  },
  {
    slug: "chromium-6",
    name: "Chromium-6 (Hexavalent Chromium)",
    formula: "Cr⁶⁺",
    category: "industrial",
    oneLine:
      "The Erin Brockovich chemical. A known carcinogen with no federal-specific limit yet.",
    whatItIs:
      "Chromium-6 is a heavy metal used in industrial processes like chrome plating, leather tanning, and stainless steel manufacturing. It can also occur naturally. Famously the contaminant at the center of Hinkley, California (and the Erin Brockovich case), it is a known human carcinogen when inhaled and is classified as a likely carcinogen when ingested.",
    sources: [
      "Industrial discharge (chrome plating, leather, stainless steel)",
      "Cooling tower additives",
      "Naturally in some bedrock",
      "Coal combustion ash",
    ],
    healthEffects: {
      summary:
        "Strong evidence of carcinogenicity via inhalation. For ingestion, animal studies and some epidemiology suggest stomach and intestinal cancer risk. Liver, kidney, and reproductive effects are also documented at higher doses.",
      bullets: [
        {
          label: "Cancer",
          detail:
            "Established carcinogen via inhalation; classified as 'likely to be carcinogenic to humans by ingestion' by EPA.",
        },
        {
          label: "Liver / kidney",
          detail: "Damage observed in animal studies at elevated doses.",
        },
        {
          label: "Reproductive",
          detail: "Some animal data on reproductive and developmental harm.",
        },
      ],
      tags: ["cancer", "liver", "kidney", "reproductive"],
    },
    regulation: {
      mcl: { value: 100, unit: "ppb" },
      mclLabel: "MCL: 100 ppb (for TOTAL chromium — no separate Cr-6 limit)",
      mclg: { value: 100, unit: "ppb" },
      mclgLabel: "MCLG: 100 ppb (total chromium)",
      ewgGuideline: { value: 0.02, unit: "ppb" },
      ewgNote:
        "EWG guideline of 0.02 ppb is based on 2008 NIH National Toxicology Program animal data; 5,000× stricter than the total-chromium MCL.",
      note:
        "EPA proposed a chromium-6-specific MCL in 2025, but no final rule existed at the time of this writing. California is the only state with an enforceable Cr-6 standard (10 ppb).",
    },
    removedBy: [
      "Reverse osmosis",
      "Ion exchange (specifically for Cr-6)",
      "Distillation",
    ],
    regionsAffected:
      "Detected in the tap water of more than 200 million Americans according to EWG sampling. Highest near industrial corridors, especially Southern California, the Carolinas, and parts of the Rust Belt.",
    sourceIds: ["epa-mcl", "ewg-tap-db"],
  },
  {
    slug: "tthm",
    name: "Trihalomethanes (TTHMs)",
    category: "disinfection-byproduct",
    oneLine:
      "Byproducts of chlorinating water. Linked to bladder cancer at chronic exposure.",
    whatItIs:
      "Total trihalomethanes (TTHMs) — chloroform, bromodichloromethane, dibromochloromethane, and bromoform — form when chlorine reacts with naturally occurring organic matter (decaying leaves, algae) in source water. They are an unavoidable trade-off of disinfection, but utilities with cleaner source water and better treatment can keep them well below the legal limit.",
    sources: [
      "Reaction of chlorine with organic matter in source water",
      "Higher in systems with surface water (rivers, reservoirs)",
      "Higher in warm months when organic matter is highest",
    ],
    healthEffects: {
      summary:
        "Chronic exposure linked to bladder cancer (most consistent finding), and possibly colorectal cancer. Some studies report associations with adverse birth outcomes, but the evidence is mixed.",
      bullets: [
        {
          label: "Cancer",
          detail:
            "Most consistent evidence is for bladder cancer at chronic exposure above ~40 ppb, but the dose-response is not well-defined.",
        },
        {
          label: "Pregnancy",
          detail:
            "Mixed evidence for small increases in stillbirth, miscarriage, and low birth weight.",
        },
      ],
      tags: ["cancer", "reproductive"],
    },
    regulation: {
      mcl: { value: 80, unit: "ppb" },
      mclLabel: "MCL: 80 ppb (running annual average)",
      mclg: { value: 0, unit: "ppb" },
      mclgLabel: "MCLG: 0 ppb for chloroform, bromodichloromethane",
      ewgGuideline: { value: 0.15, unit: "ppb" },
      ewgNote: "EWG health guideline of 0.15 ppb is dramatically stricter than EPA.",
    },
    removedBy: [
      "Activated carbon (point-of-use)",
      "Reverse osmosis",
      "Aeration / boiling (partially — TTHMs are volatile)",
    ],
    regionsAffected:
      "Higher in systems with surface water sources, especially in the Southeast and lower Mississippi River basin.",
    sourceIds: ["epa-mcl", "epa-chlorine"],
  },
  {
    slug: "microplastics",
    name: "Microplastics",
    category: "industrial",
    oneLine:
      "Tiny plastic fragments now detected in nearly all tap water. Health effects still under investigation.",
    whatItIs:
      "Microplastics are plastic fragments smaller than 5 mm, and nanoplastics smaller than 1 µm. They enter water from synthetic textile fibers, tire wear, plastic packaging breakdown, and industrial spills. Detection methods are still being standardized, but recent studies have found microplastics in the vast majority of bottled and tap water samples.",
    sources: [
      "Synthetic clothing fibers (laundry effluent)",
      "Tire wear",
      "Plastic packaging breakdown",
      "Cosmetic and personal care products",
    ],
    healthEffects: {
      summary:
        "Microplastics have been found in human blood, lung tissue, placentas, and feces. The health implications are not yet established — research is in early stages, and most concerns about endocrine disruption come from the additives (phthalates, BPA) that leach off plastics rather than the plastic particles themselves.",
      bullets: [
        {
          label: "What we know",
          detail:
            "Microplastics reach human tissues, including across the placenta. They carry chemical additives and can adsorb other pollutants.",
        },
        {
          label: "What we don't know",
          detail:
            "Whether typical exposure causes meaningful inflammation, hormonal disruption, or long-term disease in humans. Honest answer in 2026: we don't yet know.",
        },
      ],
      tags: ["hormonal", "immune"],
    },
    regulation: {
      mcl: null,
      mclLabel: "Not federally regulated",
      mclg: null,
      note:
        "No federal MCL. California is developing a sampling standard. EPA is funding research but has not proposed a regulation.",
    },
    removedBy: [
      "Reverse osmosis (most effective)",
      "0.2-micron or finer filtration",
      "Activated carbon (partial)",
    ],
    regionsAffected: "Detected nationwide. Highest near textile, industrial, and high-population areas.",
    sourceIds: ["epa-microplastics"],
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    category: "pharmaceutical",
    oneLine:
      "Trace amounts of common drugs detected in many water supplies. Levels are extremely low.",
    whatItIs:
      "Detectable but very low concentrations of pharmaceuticals — antidepressants, blood pressure medications, hormones, antibiotics, painkillers — are present in many surface and groundwater systems. They enter water through human excretion and improper drug disposal. Conventional treatment removes some but not all.",
    sources: [
      "Human excretion of prescription drugs",
      "Improper disposal (flushed medications)",
      "Animal agriculture (antibiotics, hormones)",
      "Pharmaceutical manufacturing discharge",
    ],
    healthEffects: {
      summary:
        "Concentrations in tap water are typically in the parts-per-trillion range — far below any therapeutic dose. The honest scientific consensus is that direct health effects at these levels are unlikely, but mixtures, long-term effects, and effects on sensitive populations remain open questions. Endocrine disruption from synthetic hormone residue is the most-studied concern.",
      bullets: [
        {
          label: "Hormones",
          detail:
            "Synthetic estrogens (from contraceptives) and other endocrine-active compounds are detectable. Effects on aquatic ecosystems are well-documented; effects on humans at tap-water levels remain debated.",
        },
        {
          label: "Antibiotic resistance",
          detail:
            "Low-dose antibiotic exposure across populations is a plausible contributor to antibiotic resistance, though water is one of many routes.",
        },
      ],
      tags: ["hormonal"],
    },
    regulation: {
      mcl: null,
      mclLabel: "Not federally regulated",
      mclg: null,
      note: "EPA maintains a Contaminant Candidate List but has not regulated pharmaceuticals.",
    },
    removedBy: [
      "Reverse osmosis",
      "Activated carbon (some compounds)",
      "Ozone or UV/advanced oxidation (at treatment plant level)",
    ],
    sourceIds: ["epa-mcl"],
  },
];

export function getContaminant(slug: string) {
  return CONTAMINANTS.find((c) => c.slug === slug);
}
