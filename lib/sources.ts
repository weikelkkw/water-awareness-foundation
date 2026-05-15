/**
 * Central citation registry. Every numeric claim, health effect, and
 * regulatory limit on the site should map back to one of these entries.
 *
 * Format: { id: { title, publisher, url, accessed } }
 *
 * Rule: if you cannot point to a primary source here, the claim does not
 * ship. No "studies show" hand-waves.
 */

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessed?: string;
}

export const SOURCES: Record<string, Source> = {
  "epa-sdwa": {
    id: "epa-sdwa",
    title: "Safe Drinking Water Act overview",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/sdwa",
    accessed: "2026-05",
  },
  "epa-mcl": {
    id: "epa-mcl",
    title: "National Primary Drinking Water Regulations",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/ground-water-and-drinking-water/national-primary-drinking-water-regulations",
    accessed: "2026-05",
  },
  "epa-sdwis": {
    id: "epa-sdwis",
    title: "Safe Drinking Water Information System (SDWIS) Federal Reports",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/enviro/sdwis-search",
    accessed: "2026-05",
  },
  "epa-pfas": {
    id: "epa-pfas",
    title: "PFAS National Primary Drinking Water Regulation (Final Rule, April 2024)",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
    accessed: "2026-05",
  },
  "epa-lead-copper": {
    id: "epa-lead-copper",
    title: "Lead and Copper Rule Improvements (Final Rule, October 2024)",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/dwreginfo/lead-and-copper-rule",
    accessed: "2026-05",
  },
  "cdc-lead": {
    id: "cdc-lead",
    title: "Sources of Lead Exposure",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/nceh/lead/prevention/sources/water.htm",
    accessed: "2026-05",
  },
  "cdc-fluoride": {
    id: "cdc-fluoride",
    title: "Community Water Fluoridation",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/fluoridation/index.html",
    accessed: "2026-05",
  },
  "who-guidelines": {
    id: "who-guidelines",
    title: "Guidelines for Drinking-water Quality, Fourth Edition",
    publisher: "World Health Organization",
    url: "https://www.who.int/publications/i/item/9789241549950",
    accessed: "2026-05",
  },
  "niehs-pfas": {
    id: "niehs-pfas",
    title: "Perfluorinated Chemicals (PFAS)",
    publisher: "National Institute of Environmental Health Sciences",
    url: "https://www.niehs.nih.gov/health/topics/agents/pfc",
    accessed: "2026-05",
  },
  "atsdr-pfas": {
    id: "atsdr-pfas",
    title: "Toxicological Profile for Perfluoroalkyls",
    publisher: "Agency for Toxic Substances and Disease Registry",
    url: "https://www.atsdr.cdc.gov/toxprofiles/tp200.pdf",
    accessed: "2026-05",
  },
  "nih-ntp-fluoride": {
    id: "nih-ntp-fluoride",
    title: "NTP Monograph on the State of the Science Concerning Fluoride Exposure and Neurodevelopmental and Cognitive Health Effects (2024)",
    publisher: "National Toxicology Program",
    url: "https://ntp.niehs.nih.gov/whatwestudy/assessments/noncancer/completed/fluoride",
    accessed: "2026-05",
  },
  "usgs-pfas": {
    id: "usgs-pfas",
    title: "PFAS in US Tapwater (2023)",
    publisher: "U.S. Geological Survey",
    url: "https://www.usgs.gov/news/national-news-release/least-45-nations-tap-water-estimated-have-one-or-more-types-pfas",
    accessed: "2026-05",
  },
  "ewg-tap-db": {
    id: "ewg-tap-db",
    title: "Tap Water Database",
    publisher: "Environmental Working Group",
    url: "https://www.ewg.org/tapwater/",
    accessed: "2026-05",
  },
  "ewg-pfas-map": {
    id: "ewg-pfas-map",
    title: "PFAS Contamination in the U.S.",
    publisher: "Environmental Working Group",
    url: "https://www.ewg.org/interactive-maps/pfas_contamination/",
    accessed: "2026-05",
  },
  "epa-pws-count": {
    id: "epa-pws-count",
    title: "Public Drinking Water Systems: Facts and Figures",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/dwreginfo/information-about-public-water-systems",
    accessed: "2026-05",
  },
  "epa-lead-inventory": {
    id: "epa-lead-inventory",
    title: "Lead Service Line Inventory",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/ground-water-and-drinking-water/lead-service-line-inventory-guidance",
    accessed: "2026-05",
  },
  "usgs-water-use": {
    id: "usgs-water-use",
    title: "Estimated Use of Water in the United States",
    publisher: "U.S. Geological Survey",
    url: "https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states",
    accessed: "2026-05",
  },
  "epa-microplastics": {
    id: "epa-microplastics",
    title: "Microplastics Research",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/water-research/microplastics-research",
    accessed: "2026-05",
  },
  "flint-task-force": {
    id: "flint-task-force",
    title: "Flint Water Advisory Task Force Final Report",
    publisher: "State of Michigan",
    url: "https://www.michigan.gov/-/media/Project/Websites/formergovernors/Folder6/FWATF_FINAL_REPORT_21March2016.pdf",
    accessed: "2026-05",
  },
  "nrdc-lead": {
    id: "nrdc-lead",
    title: "Lead Pipes Are Widespread and Used in Every State",
    publisher: "Natural Resources Defense Council",
    url: "https://www.nrdc.org/resources/lead-pipes-are-widespread-and-used-every-state",
    accessed: "2026-05",
  },
  "epa-chlorine": {
    id: "epa-chlorine",
    title: "Chlorine in Drinking Water",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/dwreginfo/chemical-contaminant-rules",
    accessed: "2026-05",
  },
  "nsf-standards": {
    id: "nsf-standards",
    title: "Drinking Water Treatment Unit Standards (NSF/ANSI 42, 53, 58, 401, P473)",
    publisher: "NSF International",
    url: "https://www.nsf.org/knowledge-library/water-filters-treatment-systems",
    accessed: "2026-05",
  },
};

export function cite(id: keyof typeof SOURCES) {
  const s = SOURCES[id];
  if (!s) throw new Error(`Unknown source: ${id}`);
  return s;
}
