/**
 * Curated water-facts database. Each fact has a citation pointing at
 * lib/sources.ts. New facts MUST cite. No "studies show" — name the study.
 */

export interface WaterFact {
  fact: string;
  sourceTitle: string;
  sourceId: string;
  category: "infrastructure" | "biology" | "contaminants" | "use" | "history" | "policy";
}

export const FACTS: WaterFact[] = [
  {
    fact: "There are still an estimated 9.2 million lead service lines connecting homes to water mains in the United States.",
    sourceTitle: "EPA Lead Service Line Inventory",
    sourceId: "epa-lead-inventory",
    category: "infrastructure",
  },
  {
    fact: "The average American uses about 82 gallons of water per day at home — more than residents of any other industrialized country.",
    sourceTitle: "USGS Estimated Use of Water",
    sourceId: "usgs-water-use",
    category: "use",
  },
  {
    fact: "About 62% of Americans on public water receive fluoridated water — a public health intervention the CDC ranks among the top 10 of the 20th century.",
    sourceTitle: "CDC Community Water Fluoridation",
    sourceId: "cdc-fluoride",
    category: "policy",
  },
  {
    fact: "PFAS — 'forever chemicals' — have been detected in the tap water of at least 45% of U.S. samples tested by the U.S. Geological Survey in 2023.",
    sourceTitle: "USGS PFAS in U.S. Tap Water",
    sourceId: "usgs-pfas",
    category: "contaminants",
  },
  {
    fact: "In April 2024, the EPA set the first-ever enforceable PFAS limits for drinking water: 4 parts per trillion for PFOA and PFOS — the lowest concentrations the agency considers technically measurable.",
    sourceTitle: "EPA PFAS Final Rule",
    sourceId: "epa-pfas",
    category: "policy",
  },
  {
    fact: "The Safe Drinking Water Act, passed in 1974, regulates only about 90 contaminants. EPA's Contaminant Candidate List of substances that may need regulation contains hundreds more.",
    sourceTitle: "EPA Safe Drinking Water Act",
    sourceId: "epa-sdwa",
    category: "policy",
  },
  {
    fact: "The human body is about 60% water by weight — but lungs are 83% water, the brain and heart are about 73%, and even bones are roughly 31% water.",
    sourceTitle: "USGS Water Science School",
    sourceId: "usgs-water-use",
    category: "biology",
  },
  {
    fact: "Roughly 155,000 public water systems serve drinking water in the United States — but the 9% that serve more than 10,000 people each provide water to over 80% of Americans.",
    sourceTitle: "EPA Public Drinking Water Systems",
    sourceId: "epa-pws-count",
    category: "infrastructure",
  },
  {
    fact: "Boiling water does NOT remove lead, nitrate, PFAS, or arsenic. It concentrates them. Boiling only addresses microbial contamination.",
    sourceTitle: "CDC Drinking Water Treatment",
    sourceId: "cdc-lead",
    category: "contaminants",
  },
  {
    fact: "The EPA's Maximum Contaminant Level Goal (MCLG) for lead is zero — but the enforceable action level was only lowered from 15 to 10 parts per billion in October 2024.",
    sourceTitle: "EPA Lead and Copper Rule Improvements",
    sourceId: "epa-lead-copper",
    category: "policy",
  },
  {
    fact: "Flint, Michigan switched water sources in April 2014. By October 2015 — 18 months later — pediatric blood lead levels had doubled in some neighborhoods.",
    sourceTitle: "Flint Water Advisory Task Force",
    sourceId: "flint-task-force",
    category: "history",
  },
  {
    fact: "Reverse osmosis filtration can remove over 99% of dissolved solids — including lead, PFAS, arsenic, fluoride, and nitrate. It also removes beneficial minerals.",
    sourceTitle: "NSF/ANSI 58 Standard",
    sourceId: "nsf-standards",
    category: "contaminants",
  },
  {
    fact: "About 13% of Americans — 23 million households — get their drinking water from private wells, which are NOT regulated under the Safe Drinking Water Act.",
    sourceTitle: "USGS Water Use",
    sourceId: "usgs-water-use",
    category: "infrastructure",
  },
  {
    fact: "The EWG Tap Water Database reports that, on average, U.S. tap water exceeds EWG's stricter health-based guidelines for at least one contaminant in over 90% of utilities — though most stay below the EPA's legal limits.",
    sourceTitle: "EWG Tap Water Database",
    sourceId: "ewg-tap-db",
    category: "contaminants",
  },
  {
    fact: "Arsenic occurs naturally in U.S. bedrock. EPA lowered the legal limit from 50 to 10 parts per billion in 2001 — but EWG's health guideline of 0.004 ppb is 2,500 times stricter.",
    sourceTitle: "EPA National Primary Drinking Water Regulations",
    sourceId: "epa-mcl",
    category: "contaminants",
  },
  {
    fact: "Nitrate from agricultural runoff is the most common groundwater contaminant in U.S. farm country. Levels above 10 mg/L can cause life-threatening 'blue baby syndrome' in infants under 6 months.",
    sourceTitle: "EPA Drinking Water Regulations",
    sourceId: "epa-mcl",
    category: "contaminants",
  },
  {
    fact: "Activated carbon filters certified to NSF/ANSI 53 can remove lead and many disinfection byproducts. Most pitcher filters certified to NSF/ANSI 42 only address taste and odor — they do not remove lead.",
    sourceTitle: "NSF International",
    sourceId: "nsf-standards",
    category: "contaminants",
  },
  {
    fact: "About 90% of bottled water samples tested in a 2018 study contained microplastic particles. Tap water samples contained them too, at lower average rates.",
    sourceTitle: "EPA Microplastics Research",
    sourceId: "epa-microplastics",
    category: "contaminants",
  },
  {
    fact: "Chlorine has been used to disinfect U.S. drinking water since 1908. Public health historians credit drinking-water chlorination with adding decades to American life expectancy.",
    sourceTitle: "EPA Chemical Contaminant Rules",
    sourceId: "epa-chlorine",
    category: "history",
  },
  {
    fact: "Trihalomethanes (TTHMs) — formed when chlorine reacts with organic matter in water — are linked to bladder cancer at chronic high exposure. The EPA limit is 80 ppb; EWG's health guideline is 0.15 ppb.",
    sourceTitle: "EPA Drinking Water Regulations",
    sourceId: "epa-mcl",
    category: "contaminants",
  },
  {
    fact: "Lead can leach into water when water sits in pipes overnight. Running the cold tap for 30–120 seconds before drinking or cooking can significantly reduce exposure in older homes.",
    sourceTitle: "CDC Lead in Water",
    sourceId: "cdc-lead",
    category: "contaminants",
  },
  {
    fact: "The 2024 NTP monograph found 'moderate confidence' that fluoride exposure above 1.5 mg/L is associated with lower IQ in children. That's about twice the level used in U.S. community water fluoridation.",
    sourceTitle: "National Toxicology Program",
    sourceId: "nih-ntp-fluoride",
    category: "contaminants",
  },
  {
    fact: "Hexavalent chromium — the contaminant from the Erin Brockovich case — has been detected in the tap water of more than 200 million Americans. There is no federal limit specific to Cr-6.",
    sourceTitle: "EWG Tap Water Database",
    sourceId: "ewg-tap-db",
    category: "contaminants",
  },
  {
    fact: "Surface-water systems (rivers, reservoirs) have higher organic matter than groundwater — which means more disinfection byproducts after chlorination.",
    sourceTitle: "EPA Chemical Contaminant Rules",
    sourceId: "epa-chlorine",
    category: "infrastructure",
  },
  {
    fact: "The first U.S. city to chlorinate its water supply was Jersey City, New Jersey, in 1908. Typhoid death rates in the city dropped by more than 90% within years.",
    sourceTitle: "EPA",
    sourceId: "epa-sdwa",
    category: "history",
  },
  {
    fact: "Pharmaceuticals — antidepressants, blood pressure medications, hormones — are detectable in many U.S. water supplies at parts-per-trillion levels. The health impact at those concentrations remains an open scientific question.",
    sourceTitle: "EPA Contaminant Candidate List",
    sourceId: "epa-mcl",
    category: "contaminants",
  },
  {
    fact: "It takes about 660 gallons of water to produce a single hamburger — most of it for the cattle feed.",
    sourceTitle: "USGS",
    sourceId: "usgs-water-use",
    category: "use",
  },
  {
    fact: "Lead plumbing was officially banned in the U.S. in 1986 — but 'lead-free' brass faucets were legal at up to 8% lead until 2014, when the limit was lowered to 0.25%.",
    sourceTitle: "EPA Lead Service Line Inventory",
    sourceId: "epa-lead-inventory",
    category: "history",
  },
  {
    fact: "About 70% of the U.S. population on public water receives some surface-water-treated drinking water. The rest get groundwater, which is generally lower in disinfection byproducts but higher in naturally-occurring contaminants like arsenic and radium.",
    sourceTitle: "EPA",
    sourceId: "epa-pws-count",
    category: "infrastructure",
  },
  {
    fact: "PFAS chemicals were detected in human blood samples from 97% of Americans tested in CDC's national survey. The half-life of PFOA in the human body is about 2.3 years; for PFOS, about 5 years.",
    sourceTitle: "ATSDR Toxicological Profile",
    sourceId: "atsdr-pfas",
    category: "contaminants",
  },
  {
    fact: "Distilled water has no minerals — and no contaminants. Spring water comes from a natural spring or borehole. 'Mineral water' must contain at least 250 ppm of dissolved minerals. 'Alkaline water' is a marketing term, not a regulated category.",
    sourceTitle: "FDA Bottled Water Standards",
    sourceId: "epa-mcl",
    category: "contaminants",
  },
  {
    fact: "The Clean Water Act (1972) regulates pollutants released INTO U.S. waterways. The Safe Drinking Water Act (1974) regulates contaminants in the water that comes OUT of your tap. They are two separate laws with two separate compliance systems.",
    sourceTitle: "EPA Safe Drinking Water Act",
    sourceId: "epa-sdwa",
    category: "policy",
  },
  {
    fact: "Newark, NJ replaced more than 23,000 lead service lines in roughly 2 years (2019–2021) — proving large-scale lead replacement is logistically feasible.",
    sourceTitle: "NRDC Lead Pipes",
    sourceId: "nrdc-lead",
    category: "history",
  },
  {
    fact: "The EPA's 2024 Lead and Copper Rule Improvements require all U.S. water utilities to replace all lead service lines within 10 years — the most aggressive lead-removal mandate in American history.",
    sourceTitle: "EPA Lead and Copper Rule Improvements",
    sourceId: "epa-lead-copper",
    category: "policy",
  },
  {
    fact: "California is the only U.S. state with an enforceable limit for hexavalent chromium (10 ppb). The state set the limit in 2014; the federal government has yet to follow.",
    sourceTitle: "EPA",
    sourceId: "epa-mcl",
    category: "policy",
  },
  {
    fact: "Most carbon-block water pitchers do NOT remove fluoride. Removing fluoride requires reverse osmosis, activated alumina, or distillation.",
    sourceTitle: "NSF/ANSI Standards",
    sourceId: "nsf-standards",
    category: "contaminants",
  },
  {
    fact: "Disinfection byproducts (DBPs) form mainly in the distribution pipes between the treatment plant and your tap — which is why systems with long, warm pipe runs tend to have higher TTHM readings.",
    sourceTitle: "EPA Chemical Contaminant Rules",
    sourceId: "epa-chlorine",
    category: "contaminants",
  },
  {
    fact: "A dog drinks roughly an ounce of water per pound of body weight per day. For a 60-pound dog, that's about 60 ounces — and yes, that water contains the same fluoride, chlorine, and PFAS your tap delivers to you.",
    sourceTitle: "USGS Water Use",
    sourceId: "usgs-water-use",
    category: "biology",
  },
  {
    fact: "About 1 in 4 American children has at least mild dental fluorosis — small white flecks on tooth enamel — usually a cosmetic effect of swallowing fluoridated toothpaste before age 8.",
    sourceTitle: "CDC Community Water Fluoridation",
    sourceId: "cdc-fluoride",
    category: "biology",
  },
  {
    fact: "WHO sets the global drinking-water guideline for lead at 10 ppb. The EPA's enforceable action level (also 10 ppb as of 2024) is one of the few major U.S. standards now consistent with international guidance.",
    sourceTitle: "WHO Guidelines for Drinking-water Quality",
    sourceId: "who-guidelines",
    category: "policy",
  },
];

export function getFact(idx: number) {
  return FACTS[idx % FACTS.length];
}

export function randomFact() {
  return FACTS[Math.floor(Math.random() * FACTS.length)];
}
