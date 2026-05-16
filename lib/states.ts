/**
 * Per-state water profiles. Each state carries a deep public profile:
 * curated regulator info, historical timeline, regulatory posture, top
 * utilities by population, demographic risk read, and state-specific
 * filter guidance.
 *
 * Numbers are conservative, public-data-derived approximations drawn
 * from EPA SDWIS, EWG state summaries, state primacy-agency reports,
 * and major regional reporting. Top contaminants reflect what state
 * regulators and EWG have flagged most frequently — not exhaustive
 * lists. All data should be verified before quotation.
 */

export interface StateRegulator {
  name: string;
  websiteUrl: string;
  complaintsUrl?: string;
}

export interface StateTimelineEvent {
  year: string; // "2014" or "2014–2015"
  event: string;
}

export interface NotableUtility {
  name: string;
  city: string;
  populationServed: number;
  notes?: string;
}

export interface StateProfile {
  slug: string;
  name: string;
  abbreviation: string;
  population: number;
  utilityCount: number;
  servedPopulation?: number;
  primarySourceMix: string;
  topContaminants: string[];
  context: string;
  flagshipStory?: string;
  majorCities: string[];

  // Deep profile fields
  regulator: StateRegulator;
  timeline?: StateTimelineEvent[];
  regulatoryPosture?: string;
  leadServiceLines?: { approxCount?: number; notes?: string };
  privateWellShare?: string;
  notableUtilities?: NotableUtility[];
  whoIsAtRisk?: string;
  filterRecommendation?: string;
}

export const STATES: StateProfile[] = [
  {
    slug: "alabama",
    name: "Alabama",
    abbreviation: "AL",
    population: 5_100_000,
    utilityCount: 590,
    servedPopulation: 4_500_000,
    primarySourceMix: "~55% surface water, ~45% groundwater",
    topContaminants: ["tthm", "pfas", "chromium-6", "lead"],
    context:
      "Alabama relies heavily on river-system surface water in the south and karst-aquifer groundwater in the north. Disinfection byproducts (TTHMs) consistently appear above EWG guidelines across the state. Industrial PFAS contamination from the Decatur area is among the most studied in the Southeast.",
    flagshipStory:
      "Decatur's 3M plant fueled one of the largest PFAS contamination zones in the country.",
    majorCities: ["Birmingham", "Mobile", "Montgomery", "Huntsville", "Tuscaloosa"],
    regulator: {
      name: "Alabama Department of Environmental Management",
      websiteUrl: "https://www.adem.alabama.gov/",
      complaintsUrl: "https://www.adem.alabama.gov/programs/complaints/",
    },
    regulatoryPosture:
      "Tracks federal SDWA standards. No state-specific MCLs stricter than EPA. PFAS enforcement is reactive to federal action.",
    timeline: [
      { year: "2016", event: "3M and Daikin Decatur PFAS contamination identified in West Morgan-East Lawrence water supply." },
      { year: "2019", event: "$35M settlement reached between 3M and Decatur-area water authority over PFAS." },
      { year: "2023", event: "State legislature considers but does not pass PFAS-specific drinking water limits." },
    ],
    notableUtilities: [
      { name: "Birmingham Water Works Board", city: "Birmingham", populationServed: 770_000 },
      { name: "Mobile Area Water and Sewer System", city: "Mobile", populationServed: 280_000 },
      { name: "Huntsville Utilities", city: "Huntsville", populationServed: 220_000 },
      { name: "Montgomery Water Works", city: "Montgomery", populationServed: 200_000 },
    ],
    privateWellShare: "~15% of households rely on private wells, predominantly rural and unregulated.",
    whoIsAtRisk:
      "Households on the West Morgan-East Lawrence water authority near Decatur face the most-documented PFAS exposure. Rural well users statewide have no testing requirement.",
    filterRecommendation:
      "For PFAS in the Decatur corridor, look for NSF/ANSI P473 or reverse osmosis. For TTHMs statewide, NSF/ANSI 53 carbon block works well.",
  },
  {
    slug: "alaska",
    name: "Alaska",
    abbreviation: "AK",
    population: 740_000,
    utilityCount: 530,
    servedPopulation: 550_000,
    primarySourceMix: "~65% groundwater, ~35% surface water",
    topContaminants: ["arsenic", "lead", "pfas"],
    context:
      "Alaska's hundreds of small village systems serve remote populations from groundwater wells. Natural arsenic from geologic sources is the dominant concern. Aging service lines and military-site PFAS contamination are growing issues.",
    majorCities: ["Anchorage", "Fairbanks", "Juneau"],
    regulator: {
      name: "Alaska Department of Environmental Conservation",
      websiteUrl: "https://dec.alaska.gov/eh/dw/",
      complaintsUrl: "https://dec.alaska.gov/eh/dw/contact/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State has expanded PFAS sampling at military and former-military sites. Most rural village systems operate under EPA reduced-monitoring rules.",
    timeline: [
      { year: "2014", event: "PFAS contamination identified at Fairbanks International Airport firefighting training area." },
      { year: "2018", event: "State formally adds PFAS to regulated contaminant action list." },
      { year: "2022", event: "Federal infrastructure funding directed to remote-village system replacements." },
    ],
    notableUtilities: [
      { name: "Anchorage Water and Wastewater Utility", city: "Anchorage", populationServed: 290_000 },
      { name: "Golden Heart Utilities", city: "Fairbanks", populationServed: 30_000 },
      { name: "Juneau Public Utilities", city: "Juneau", populationServed: 32_000 },
    ],
    privateWellShare: "~25% of Alaskans use private wells. Rural village systems frequently fall outside standard SDWA monitoring.",
    whoIsAtRisk:
      "Tribal communities served by small village systems face the highest combined arsenic and infrastructure-age exposure. Households near military bases face PFAS risk.",
    filterRecommendation:
      "For arsenic, NSF/ANSI 58 reverse osmosis is the most reliable home solution. Activated alumina filters also work but require routine media replacement.",
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbreviation: "AZ",
    population: 7_400_000,
    utilityCount: 1_660,
    servedPopulation: 7_100_000,
    primarySourceMix: "~60% Colorado River surface water, ~40% groundwater",
    topContaminants: ["arsenic", "chromium-6", "tthm", "nitrate"],
    context:
      "Arizona's water comes overwhelmingly from the Colorado River (CAP) and deep desert groundwater. Naturally occurring arsenic is widespread in groundwater across the state. Hexavalent chromium contamination from industrial activity is concentrated in the Phoenix metro.",
    flagshipStory:
      "Phoenix and Tucson regularly post arsenic levels above EWG's health-protective guideline.",
    majorCities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
    regulator: {
      name: "Arizona Department of Environmental Quality",
      websiteUrl: "https://www.azdeq.gov/programs/water-quality-programs",
      complaintsUrl: "https://www.azdeq.gov/contact/file-complaint",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State tracks chromium-6 with its own monitoring program. No stricter state MCL for arsenic; relies on federal 10 ppb.",
    timeline: [
      { year: "2006", event: "Federal arsenic MCL drops to 10 ppb; Arizona utilities require massive treatment upgrades." },
      { year: "2015", event: "Hexavalent chromium plume documented in Phoenix industrial corridor." },
      { year: "2023", event: "Colorado River drought declaration intensifies regional water-supply pressure." },
    ],
    notableUtilities: [
      { name: "City of Phoenix Water Services", city: "Phoenix", populationServed: 1_650_000 },
      { name: "Tucson Water", city: "Tucson", populationServed: 730_000 },
      { name: "Salt River Project", city: "Phoenix metro", populationServed: 2_300_000, notes: "Raw-water provider to multiple cities." },
      { name: "Mesa Water Resources", city: "Mesa", populationServed: 510_000 },
      { name: "Chandler Public Works", city: "Chandler", populationServed: 280_000 },
    ],
    privateWellShare: "~12% on private wells, concentrated in rural northern and southern counties with elevated natural arsenic.",
    whoIsAtRisk:
      "Older adults and immunocompromised residents in groundwater-served rural communities face the highest cumulative arsenic exposure.",
    filterRecommendation:
      "For arsenic and chromium-6 — NSF/ANSI 58 reverse osmosis. For chlorine taste / TTHMs in Phoenix metro, NSF/ANSI 53 carbon block.",
  },
  {
    slug: "arkansas",
    name: "Arkansas",
    abbreviation: "AR",
    population: 3_050_000,
    utilityCount: 720,
    servedPopulation: 2_800_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["tthm", "nitrate", "pfas"],
    context:
      "Arkansas draws heavily from rivers and reservoirs, making disinfection byproducts a consistent concern. Agricultural runoff in the east drives nitrate exposure. PFAS testing under the 2024 EPA rule is still rolling out.",
    majorCities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
    regulator: {
      name: "Arkansas Department of Health — Engineering Section",
      websiteUrl: "https://www.healthy.arkansas.gov/programs-services/topics/drinking-water",
      complaintsUrl: "https://www.healthy.arkansas.gov/programs-services/topics/drinking-water",
    },
    regulatoryPosture:
      "Federal SDWA primacy via the Arkansas Department of Health. No state-specific MCLs beyond federal. PFAS testing under the 2024 EPA rule is rolling out.",
    timeline: [
      { year: "2014", event: "Western Arkansas TTHM exceedances trigger state-led source-water assessments." },
      { year: "2020", event: "USGS national PFAS sampling detects compounds at multiple Arkansas systems." },
    ],
    notableUtilities: [
      { name: "Central Arkansas Water", city: "Little Rock", populationServed: 470_000 },
      { name: "Fort Smith Utility Department", city: "Fort Smith", populationServed: 130_000 },
      { name: "Beaver Water District", city: "Northwest AR", populationServed: 500_000 },
    ],
    privateWellShare: "~16% of households on private wells, mostly in the Ozarks and rural delta.",
    whoIsAtRisk:
      "Rural agricultural communities in the Mississippi Delta face the highest combined nitrate-and-disinfection-byproduct exposure.",
    filterRecommendation:
      "NSF/ANSI 53 carbon block for TTHMs. Reverse osmosis (NSF/ANSI 58) addresses both nitrate and PFAS.",
  },
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    population: 38_900_000,
    utilityCount: 7_400,
    servedPopulation: 37_000_000,
    primarySourceMix: "~55% surface water, ~45% groundwater (varies by region)",
    topContaminants: ["chromium-6", "arsenic", "pfas", "nitrate", "tthm"],
    context:
      "California has the most comprehensive state-level water monitoring in the U.S. and the strictest contaminant-specific public-health goals. Hexavalent chromium (the Erin Brockovich contaminant) is widely monitored after Hinkley. Central Valley agricultural runoff drives nitrate exposure in farm-belt communities.",
    flagshipStory:
      "California's OEHHA public-health goals are the reference for most EWG health-protective guidelines nationwide.",
    majorCities: ["Los Angeles", "San Diego", "San Francisco", "San Jose", "Sacramento", "Fresno"],
    regulator: {
      name: "State Water Resources Control Board — Division of Drinking Water",
      websiteUrl: "https://www.waterboards.ca.gov/drinking_water/",
      complaintsUrl: "https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/complaint_form.pdf",
    },
    regulatoryPosture:
      "Strictest state in the country. OEHHA Public Health Goals are stricter than federal MCLs for nearly every contaminant. State has its own MCL for chromium-6 (10 ppb), perchlorate, and PFAS Response Levels. AB 685 recognizes the Human Right to Water.",
    timeline: [
      { year: "1993", event: "Hinkley chromium-6 contamination becomes a national story (later the basis for Erin Brockovich)." },
      { year: "2012", event: "AB 685 makes safe drinking water a state-recognized human right." },
      { year: "2014", event: "California sets the first state-level chromium-6 MCL in U.S. history (10 ppb)." },
      { year: "2019", event: "SAFER Drinking Water Program launched, targeting ~1M residents on failing systems." },
      { year: "2023", event: "State adopts response levels for PFAS PFOA (10 ng/L) and PFOS (40 ng/L) ahead of federal rule." },
    ],
    notableUtilities: [
      { name: "Los Angeles Department of Water and Power", city: "Los Angeles", populationServed: 4_000_000 },
      { name: "Metropolitan Water District of Southern California", city: "Multi-county", populationServed: 19_000_000, notes: "Wholesale provider serving 26 member agencies." },
      { name: "San Francisco Public Utilities Commission", city: "San Francisco / Hetch Hetchy", populationServed: 2_700_000 },
      { name: "San Diego County Water Authority", city: "San Diego", populationServed: 3_300_000 },
      { name: "Santa Clara Valley Water District", city: "San Jose metro", populationServed: 2_000_000 },
    ],
    privateWellShare: "~5% of California households on private wells. Central Valley well users face the most-documented contamination.",
    whoIsAtRisk:
      "Roughly 1 million Californians — disproportionately Latino, low-income, and rural — are served by community systems that fail SDWA standards. The SAFER program targets this gap.",
    filterRecommendation:
      "Reverse osmosis is the most universally effective home solution for California's diverse contaminant profile. For chromium-6 specifically, NSF/ANSI 58 RO is the recommended path.",
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbreviation: "CO",
    population: 5_900_000,
    utilityCount: 2_000,
    servedPopulation: 5_500_000,
    primarySourceMix: "~70% snowmelt surface water, ~30% groundwater",
    topContaminants: ["pfas", "tthm", "chromium-6", "lead"],
    context:
      "Colorado utilities draw heavily from Front Range snowmelt watersheds. PFAS contamination from firefighting foam at Air Force bases and Colorado Springs is a major regional concern. Disinfection byproducts are widespread on river-fed systems.",
    flagshipStory:
      "Colorado Springs and Fountain saw some of the earliest documented PFAS exposure from military firefighting foam.",
    majorCities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"],
    regulator: {
      name: "Colorado Department of Public Health and Environment — Water Quality Control Division",
      websiteUrl: "https://cdphe.colorado.gov/drinking-water",
      complaintsUrl: "https://cdphe.colorado.gov/water-quality-control-division-water-pollution-complaints",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State PFAS Action Plan launched 2020; CDPHE has its own PFAS testing program. No state MCLs stricter than federal.",
    timeline: [
      { year: "2016", event: "PFAS contamination from Peterson AFB firefighting foam confirmed in Fountain/Widefield/Security." },
      { year: "2018", event: "Colorado Springs sues 3M and Tyco over PFAS contamination." },
      { year: "2020", event: "Colorado PFAS Action Plan launched with statewide sampling." },
      { year: "2024", event: "Federal PFAS rule formally regulates six PFAS compounds." },
    ],
    notableUtilities: [
      { name: "Denver Water", city: "Denver metro", populationServed: 1_500_000 },
      { name: "Aurora Water", city: "Aurora", populationServed: 400_000 },
      { name: "Colorado Springs Utilities", city: "Colorado Springs", populationServed: 480_000 },
      { name: "Fort Collins Utilities", city: "Fort Collins", populationServed: 175_000 },
    ],
    privateWellShare: "~10% of households on private wells, mostly mountain and Eastern Plains.",
    whoIsAtRisk:
      "Residents in El Paso County (Colorado Springs / Fountain / Widefield / Security) face the most-documented PFAS exposure from military firefighting foam.",
    filterRecommendation:
      "For PFAS removal, NSF/ANSI P473 carbon or reverse osmosis. Pitcher filters labeled \"PFOA reduction\" using activated carbon work for many compounds.",
  },
  {
    slug: "connecticut",
    name: "Connecticut",
    abbreviation: "CT",
    population: 3_600_000,
    utilityCount: 580,
    servedPopulation: 3_200_000,
    primarySourceMix: "~55% surface water, ~45% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Connecticut's older urban housing stock means lead service lines remain a real exposure pathway. PFAS contamination from a 2019 Bradley Airport firefighting-foam spill drove statewide concern. Industrial groundwater plumes affect several legacy manufacturing communities.",
    majorCities: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury"],
    regulator: {
      name: "Connecticut Department of Public Health — Drinking Water Section",
      websiteUrl: "https://portal.ct.gov/dph/drinking-water",
      complaintsUrl: "https://portal.ct.gov/DPH/Drinking-Water/DWS/Drinking-Water-Public-Health-Concerns",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State established a PFAS Task Force in 2019 with a Drinking Water Action Level of 70 ng/L combined PFOA+PFOS. Lead service line inventory required by 2027.",
    timeline: [
      { year: "2019", event: "Bradley International Airport spills 40,000 gallons of PFAS firefighting foam into Windsor Locks." },
      { year: "2020", event: "Connecticut PFAS Task Force publishes state-action plan." },
      { year: "2023", event: "State mandates lead service line inventory across all community systems." },
    ],
    notableUtilities: [
      { name: "Aquarion Water Company", city: "Bridgeport / Greenwich / Stamford", populationServed: 670_000 },
      { name: "Metropolitan District Commission", city: "Hartford metro", populationServed: 400_000 },
      { name: "South Central Connecticut Regional Water Authority", city: "New Haven", populationServed: 430_000 },
      { name: "Connecticut Water Company", city: "Multi-region", populationServed: 350_000 },
    ],
    privateWellShare: "~23% of households on private wells, predominantly in eastern and northwestern CT with significant arsenic.",
    whoIsAtRisk:
      "Residents in pre-1986 housing across Bridgeport, Hartford, and New Haven face elevated lead exposure. Households downstream of Windsor Locks face PFAS.",
    filterRecommendation:
      "For lead: NSF/ANSI 53 carbon block specifically certified for lead reduction. For private-well arsenic in the east: NSF/ANSI 58 reverse osmosis.",
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbreviation: "DE",
    population: 1_020_000,
    utilityCount: 200,
    servedPopulation: 900_000,
    primarySourceMix: "~60% groundwater, ~40% surface water",
    topContaminants: ["pfas", "nitrate", "tthm"],
    context:
      "Delaware sits at the intersection of agricultural Sussex County and the industrial I-95 corridor. PFAS, nitrate, and chemicals from legacy industry all appear in state monitoring data.",
    majorCities: ["Wilmington", "Dover", "Newark"],
    regulator: {
      name: "Delaware Division of Public Health — Office of Drinking Water",
      websiteUrl: "https://dhss.delaware.gov/dhss/dph/hsp/odw.html",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State maintains its own PFAS response program; New Castle County sites are under Superfund-led remediation.",
    timeline: [
      { year: "2014", event: "PFAS contamination documented at Dover Air Force Base." },
      { year: "2020", event: "Statewide nitrate-and-PFAS sampling expanded in Sussex County agricultural zone." },
    ],
    notableUtilities: [
      { name: "Wilmington Department of Public Works", city: "Wilmington", populationServed: 70_000 },
      { name: "Artesian Water Company", city: "Multi-county", populationServed: 300_000 },
      { name: "Tidewater Utilities", city: "Sussex County", populationServed: 110_000 },
    ],
    privateWellShare: "~17% on private wells, concentrated in Sussex County agricultural areas.",
    whoIsAtRisk:
      "Sussex County agricultural communities face the highest combined nitrate-and-PFAS exposure. Dover Air Force Base neighborhoods face documented PFAS.",
    filterRecommendation:
      "Reverse osmosis (NSF/ANSI 58) is the most effective home solution for the Delaware nitrate + PFAS combination.",
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    population: 22_600_000,
    utilityCount: 5_400,
    servedPopulation: 20_500_000,
    primarySourceMix: "~85% groundwater (Floridan aquifer), ~15% surface water",
    topContaminants: ["tthm", "pfas", "lead", "chromium-6"],
    context:
      "Florida is overwhelmingly groundwater-fed, drawing from the Floridan aquifer that underlies most of the state. Saltwater intrusion in coastal areas and disinfection byproducts on surface systems are dominant concerns. Military-base PFAS contamination is widespread.",
    majorCities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
    regulator: {
      name: "Florida Department of Environmental Protection — Drinking Water Program",
      websiteUrl: "https://floridadep.gov/water/source-drinking-water",
      complaintsUrl: "https://floridadep.gov/about/contact-us/file-a-complaint",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. State PFAS Dynamic Plan in active rulemaking since 2022.",
    timeline: [
      { year: "2014", event: "PFAS contamination identified at multiple Florida military installations." },
      { year: "2018", event: "Saltwater intrusion forces several South Florida utilities to deepen wells." },
      { year: "2022", event: "Florida begins PFAS Dynamic Plan rulemaking." },
    ],
    notableUtilities: [
      { name: "Miami-Dade Water and Sewer Department", city: "Miami metro", populationServed: 2_500_000 },
      { name: "JEA", city: "Jacksonville", populationServed: 880_000 },
      { name: "Tampa Bay Water", city: "Tampa Bay region", populationServed: 2_500_000 },
      { name: "Orange County Utilities", city: "Orlando metro", populationServed: 600_000 },
      { name: "Pinellas County Utilities", city: "St. Petersburg", populationServed: 730_000 },
    ],
    privateWellShare: "~10% on private wells, concentrated in rural North Florida and Panhandle.",
    whoIsAtRisk:
      "Residents near Tyndall, Eglin, MacDill, Patrick Air Force Bases face the most-documented PFAS exposure. Coastal saltwater intrusion increasingly affects residential wells.",
    filterRecommendation:
      "NSF/ANSI 53 carbon block addresses TTHMs and most PFAS in standard concentrations. RO for households with documented saltwater intrusion.",
  },
  {
    slug: "georgia",
    name: "Georgia",
    abbreviation: "GA",
    population: 11_000_000,
    utilityCount: 2_200,
    servedPopulation: 10_300_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["tthm", "pfas", "lead", "chromium-6"],
    context:
      "Metro Atlanta and most of north Georgia rely on river-fed surface water; coastal counties draw from the Floridan aquifer. PFAS contamination from carpet and textile manufacturing in Dalton is among the worst-documented in the Southeast.",
    flagshipStory:
      "Rome, Georgia's water system has been ground zero for PFAS litigation against carpet manufacturers.",
    majorCities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
    regulator: {
      name: "Georgia Environmental Protection Division",
      websiteUrl: "https://epd.georgia.gov/watershed-protection-branch/drinking-water",
      complaintsUrl: "https://epd.georgia.gov/forms-permits/forms",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Significant PFAS litigation history in Northwest Georgia carpet corridor.",
    timeline: [
      { year: "2016", event: "PFAS contamination from carpet manufacturers documented in Rome and Calhoun." },
      { year: "2019", event: "Rome wins $50M+ settlement against 3M, Daikin, and others for PFAS contamination." },
      { year: "2022", event: "PFAS class action settled for over $850M with carpet industry defendants." },
    ],
    notableUtilities: [
      { name: "Atlanta Department of Watershed Management", city: "Atlanta", populationServed: 1_200_000 },
      { name: "Cobb County-Marietta Water Authority", city: "Marietta metro", populationServed: 800_000 },
      { name: "Gwinnett County Department of Water Resources", city: "Lawrenceville metro", populationServed: 950_000 },
      { name: "Savannah Water and Sewer", city: "Savannah", populationServed: 145_000 },
    ],
    privateWellShare: "~22% on private wells, concentrated in rural North and South Georgia.",
    whoIsAtRisk:
      "Residents along the Conasauga River downstream of Dalton carpet mills face the most-documented PFAS exposure. Rural well users face untested geological arsenic and bacterial risk.",
    filterRecommendation:
      "For PFAS in Northwest Georgia: NSF/ANSI P473 or RO. For TTHMs in metro Atlanta: NSF/ANSI 53 carbon.",
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    abbreviation: "HI",
    population: 1_440_000,
    utilityCount: 110,
    servedPopulation: 1_400_000,
    primarySourceMix: "~99% groundwater (volcanic aquifers)",
    topContaminants: ["pfas", "lead", "tthm"],
    context:
      "Hawaii draws almost exclusively from pristine volcanic aquifers, historically among the cleanest source water in the country. The 2021 Red Hill fuel leak contaminated Oahu Navy systems and reshaped how Hawaii regulators think about military-base groundwater risk.",
    flagshipStory:
      "The Red Hill jet-fuel contamination on Oahu remains an active public-health emergency.",
    majorCities: ["Honolulu", "Hilo", "Kailua"],
    regulator: {
      name: "Hawaii Department of Health — Safe Drinking Water Branch",
      websiteUrl: "https://health.hawaii.gov/sdwb/",
      complaintsUrl: "https://health.hawaii.gov/sdwb/main/concerns/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. Aggressive post-Red Hill enforcement and military-base groundwater monitoring. No state MCLs stricter than federal but significant rulemaking activity post-2021.",
    timeline: [
      { year: "2021", event: "Red Hill jet-fuel leak contaminates Navy water systems serving 93,000+ people on Oahu." },
      { year: "2022", event: "Defense Department orders permanent closure of Red Hill underground fuel facility." },
      { year: "2024", event: "Long-term remediation and groundwater monitoring continues; multiple residents report ongoing symptoms." },
    ],
    notableUtilities: [
      { name: "Honolulu Board of Water Supply", city: "Honolulu / Oahu", populationServed: 1_000_000 },
      { name: "Hawaii County Department of Water Supply", city: "Big Island", populationServed: 200_000 },
      { name: "Maui Department of Water Supply", city: "Maui", populationServed: 150_000 },
    ],
    privateWellShare: "~1% on private wells. Hawaii has unusually centralized water infrastructure.",
    whoIsAtRisk:
      "Military families and civilians served by Navy water on Oahu, plus residents in the Red Hill plume zone, face the most-documented petroleum and PFAS exposure.",
    filterRecommendation:
      "For Red Hill-affected households: NSF/ANSI 53 carbon block specifically certified for VOCs. RO is the most thorough whole-tap solution.",
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbreviation: "ID",
    population: 1_960_000,
    utilityCount: 1_400,
    servedPopulation: 1_700_000,
    primarySourceMix: "~85% groundwater, ~15% surface water",
    topContaminants: ["arsenic", "nitrate", "lead"],
    context:
      "Idaho's water is overwhelmingly groundwater-fed from Snake River Plain aquifers. Natural arsenic and agricultural nitrate are the dominant rural concerns. Lead in pre-1986 plumbing affects urban service areas.",
    majorCities: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    regulator: {
      name: "Idaho Department of Environmental Quality — Drinking Water Program",
      websiteUrl: "https://www.deq.idaho.gov/water-quality/drinking-water/",
      complaintsUrl: "https://www.deq.idaho.gov/get-involved/file-complaint/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active state-led source-water protection in Snake River Plain.",
    timeline: [
      { year: "2006", event: "Federal arsenic MCL drop triggers treatment upgrades across rural Idaho systems." },
      { year: "2019", event: "Statewide private-well nitrate-monitoring program expanded in agricultural counties." },
    ],
    notableUtilities: [
      { name: "United Water Idaho", city: "Boise metro", populationServed: 400_000 },
      { name: "Meridian Public Works", city: "Meridian", populationServed: 130_000 },
      { name: "Idaho Falls Public Works", city: "Idaho Falls", populationServed: 67_000 },
    ],
    privateWellShare: "~24% on private wells. Magic Valley and Treasure Valley agricultural zones have the most documented nitrate exposure.",
    whoIsAtRisk:
      "Magic Valley and Treasure Valley well users face the highest nitrate exposure. Rural northern Idaho residents face geologic arsenic.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis addresses arsenic, nitrate, and lead in one system. Most cost-effective for rural well users.",
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbreviation: "IL",
    population: 12_550_000,
    utilityCount: 1_750,
    servedPopulation: 12_100_000,
    primarySourceMix: "~75% surface water (Lake Michigan), ~25% groundwater",
    topContaminants: ["lead", "tthm", "pfas", "chromium-6"],
    context:
      "Chicago and most of northeast Illinois drink Lake Michigan water — among the highest-quality source water in the country. Yet Chicago has more lead service lines than any U.S. city. Disinfection byproducts are widespread on Mississippi River systems downstate.",
    flagshipStory:
      "Chicago has an estimated 400,000+ lead service lines — more than any U.S. city.",
    majorCities: ["Chicago", "Aurora", "Joliet", "Naperville", "Rockford", "Springfield"],
    regulator: {
      name: "Illinois Environmental Protection Agency — Bureau of Water",
      websiteUrl: "https://www.epa.illinois.gov/topics/drinking-water.html",
      complaintsUrl: "https://www.epa.illinois.gov/citizen-helpdesk/file-a-complaint.html",
    },
    regulatoryPosture:
      "Federal SDWA primacy. Lead Service Line Replacement Act (2021) requires full replacement of all lead service lines by 2042 — most aggressive state mandate in the country.",
    timeline: [
      { year: "2016", event: "Post-Flint lead testing identifies elevated lead in 70+ Chicago Public Schools." },
      { year: "2021", event: "Illinois Lead Service Line Replacement Act mandates full replacement by 2042." },
      { year: "2024", event: "Federal LCRI replaces line replacement by 2034; Illinois extends its statutory deadline." },
    ],
    notableUtilities: [
      { name: "Chicago Department of Water Management", city: "Chicago", populationServed: 2_700_000 },
      { name: "Aurora Water and Wastewater Department", city: "Aurora", populationServed: 200_000 },
      { name: "Springfield Water Department", city: "Springfield", populationServed: 115_000 },
    ],
    leadServiceLines: {
      approxCount: 1_050_000,
      notes: "Illinois has roughly 1.05 million lead service lines statewide; Chicago alone has ~400,000.",
    },
    privateWellShare: "~12% on private wells, concentrated downstate.",
    whoIsAtRisk:
      "Chicago residents in pre-1986 buildings face the highest lead exposure in the U.S. by absolute number of lead service lines.",
    filterRecommendation:
      "For lead, NSF/ANSI 53 carbon block certified for lead reduction. Pitcher filters labeled \"lead\" reduction are the cheapest path — replace cartridges on schedule.",
  },
  {
    slug: "indiana",
    name: "Indiana",
    abbreviation: "IN",
    population: 6_870_000,
    utilityCount: 870,
    servedPopulation: 6_400_000,
    primarySourceMix: "~50% surface water, ~50% groundwater",
    topContaminants: ["lead", "tthm", "pfas", "chromium-6"],
    context:
      "Indiana's industrial corridor (East Chicago, Gary, Hammond) has some of the most documented lead-in-water exposure in the country. Agricultural nitrate and disinfection byproducts dominate elsewhere.",
    flagshipStory:
      "East Chicago's West Calumet housing complex was condemned in 2016 due to soil and water lead contamination.",
    majorCities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
    regulator: {
      name: "Indiana Department of Environmental Management — Drinking Water Branch",
      websiteUrl: "https://www.in.gov/idem/cleanwater/2452.htm",
      complaintsUrl: "https://www.in.gov/idem/cleanwater/2528.htm",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. PFAS sampling expanding under 2024 federal rule.",
    timeline: [
      { year: "2016", event: "East Chicago's West Calumet housing complex condemned over lead contamination." },
      { year: "2019", event: "Statewide lead testing of schools identifies hundreds of fixture-level exceedances." },
    ],
    notableUtilities: [
      { name: "Citizens Energy Group", city: "Indianapolis", populationServed: 800_000 },
      { name: "Indiana American Water — Fort Wayne", city: "Fort Wayne", populationServed: 270_000 },
      { name: "Evansville Water and Sewer Utility", city: "Evansville", populationServed: 120_000 },
    ],
    privateWellShare: "~15% on private wells. Northern Indiana karst region has documented bacterial and nitrate risk.",
    whoIsAtRisk:
      "Residents of pre-1986 Lake County industrial communities (East Chicago, Gary, Hammond) face among the worst combined lead and industrial-contamination exposure in the country.",
    filterRecommendation:
      "For lead: NSF/ANSI 53 carbon block. For PFAS in northern Indiana: NSF/ANSI P473.",
  },
  {
    slug: "iowa",
    name: "Iowa",
    abbreviation: "IA",
    population: 3_200_000,
    utilityCount: 1_900,
    servedPopulation: 2_900_000,
    primarySourceMix: "~80% groundwater, ~20% surface water",
    topContaminants: ["nitrate", "tthm", "arsenic"],
    context:
      "Iowa's intensive corn and soy agriculture drives the worst nitrate exposure in the country. Des Moines Water Works has sued upstream agricultural drainage districts over nitrate runoff. Groundwater wells across rural Iowa frequently exceed EWG nitrate guidelines.",
    flagshipStory:
      "Des Moines Water Works' nitrate lawsuit against upstream farms remains a landmark in U.S. agricultural water policy.",
    majorCities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
    regulator: {
      name: "Iowa Department of Natural Resources — Water Supply Engineering",
      websiteUrl: "https://www.iowadnr.gov/Environmental-Protection/Water-Quality/Water-Supply-Engineering",
      complaintsUrl: "https://www.iowadnr.gov/about-dnr/contact-us",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal for nitrate (remains 10 ppm federal MCL). State has been politically resistant to enforceable agricultural runoff limits.",
    timeline: [
      { year: "2015", event: "Des Moines Water Works sues three upstream drainage districts over nitrate runoff." },
      { year: "2017", event: "Federal court dismisses Des Moines lawsuit, citing agricultural exemption." },
      { year: "2022", event: "Nitrate-related drinking-water complaints reach record levels in Cedar Rapids and Des Moines." },
    ],
    notableUtilities: [
      { name: "Des Moines Water Works", city: "Des Moines", populationServed: 500_000 },
      { name: "Cedar Rapids Water Department", city: "Cedar Rapids", populationServed: 135_000 },
      { name: "Iowa American Water — Davenport", city: "Davenport", populationServed: 130_000 },
    ],
    privateWellShare: "~12% on private wells. Northeast Iowa karst region has the most-documented nitrate and bacterial risk.",
    whoIsAtRisk:
      "Infants on formula prepared with nitrate-contaminated well water face the highest acute risk (methemoglobinemia). Pregnant women face thyroid-disruption concerns.",
    filterRecommendation:
      "For nitrate, NSF/ANSI 58 reverse osmosis or ion exchange. Standard carbon filters do NOT remove nitrate.",
  },
  {
    slug: "kansas",
    name: "Kansas",
    abbreviation: "KS",
    population: 2_940_000,
    utilityCount: 980,
    servedPopulation: 2_700_000,
    primarySourceMix: "~55% surface water, ~45% groundwater (Ogallala)",
    topContaminants: ["nitrate", "arsenic", "tthm"],
    context:
      "Western Kansas draws from the depleting Ogallala Aquifer; eastern Kansas relies on reservoirs. Agricultural nitrate is the dominant concern in farm communities, with multiple small systems exceeding the federal MCL.",
    majorCities: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"],
    regulator: {
      name: "Kansas Department of Health and Environment — Bureau of Water",
      websiteUrl: "https://www.kdhe.ks.gov/238/Public-Water-Supply",
      complaintsUrl: "https://www.kdhe.ks.gov/161/Contact-Us",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Ogallala depletion is the dominant long-term water-policy concern.",
    timeline: [
      { year: "2014", event: "Multiple small western Kansas systems exceed nitrate MCL; emergency variances issued." },
      { year: "2023", event: "Ogallala Aquifer depletion enters formal state-led conservation planning phase." },
    ],
    notableUtilities: [
      { name: "WaterOne", city: "Johnson County / Overland Park", populationServed: 425_000 },
      { name: "Wichita Public Water Utility", city: "Wichita", populationServed: 400_000 },
      { name: "Topeka Public Works", city: "Topeka", populationServed: 125_000 },
    ],
    privateWellShare: "~10% on private wells; concentrated in west and rural northeast.",
    whoIsAtRisk:
      "Rural western Kansas farm families face the highest nitrate exposure. Hispanic farmworker communities are disproportionately affected.",
    filterRecommendation:
      "Reverse osmosis (NSF/ANSI 58) for nitrate and arsenic. Standard pitcher filters won't remove nitrate.",
  },
  {
    slug: "kentucky",
    name: "Kentucky",
    abbreviation: "KY",
    population: 4_510_000,
    utilityCount: 480,
    servedPopulation: 4_300_000,
    primarySourceMix: "~80% surface water, ~20% groundwater",
    topContaminants: ["tthm", "pfas", "lead", "chromium-6"],
    context:
      "Kentucky's reliance on Ohio River and tributary surface water means TTHMs and other disinfection byproducts are pervasive. Coal-region groundwater and PFAS from industrial sources add complexity in specific watersheds.",
    majorCities: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
    regulator: {
      name: "Kentucky Division of Water — Drinking Water Branch",
      websiteUrl: "https://eec.ky.gov/Environmental-Protection/Water/Drinking/Pages/default.aspx",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. PFAS enforcement reactive to federal action.",
    timeline: [
      { year: "2018", event: "PFAS detections at Louisville Air National Guard base trigger localized response." },
      { year: "2023", event: "Federal infrastructure funding directed to Eastern Kentucky coal-region water system upgrades." },
    ],
    notableUtilities: [
      { name: "Louisville Water Company", city: "Louisville", populationServed: 920_000 },
      { name: "Lexington-Fayette Urban County Government", city: "Lexington", populationServed: 320_000 },
    ],
    privateWellShare: "~17% on private wells, concentrated in Appalachian East.",
    whoIsAtRisk:
      "Eastern Kentucky coal-region residents face combined heavy-metal and infrastructure-age exposure. Ohio River cities face persistent TTHMs.",
    filterRecommendation:
      "NSF/ANSI 53 carbon block for TTHMs. For Eastern Kentucky well users: NSF/ANSI 58 reverse osmosis covers heavy metals and bacterial risk.",
  },
  {
    slug: "louisiana",
    name: "Louisiana",
    abbreviation: "LA",
    population: 4_570_000,
    utilityCount: 1_280,
    servedPopulation: 4_300_000,
    primarySourceMix: "~55% surface water (Mississippi), ~45% groundwater",
    topContaminants: ["tthm", "pfas", "chromium-6", "lead"],
    context:
      "Louisiana's Mississippi River source water passes downstream of every major U.S. industrial corridor. Cancer Alley between Baton Rouge and New Orleans has the highest cancer-risk pollution exposure in the country, with water playing a role in cumulative exposure.",
    flagshipStory:
      "Louisiana's Cancer Alley is among the most-studied environmental-health zones in U.S. history.",
    majorCities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
    regulator: {
      name: "Louisiana Department of Health — Office of Public Health, Engineering Services",
      websiteUrl: "https://ldh.la.gov/page/2206",
      complaintsUrl: "https://ldh.la.gov/page/contact-us",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Cancer Alley enforcement has been a long-running EPA Region 6 priority.",
    timeline: [
      { year: "2016", event: "St. James Parish Cancer Alley water-quality reporting becomes national news." },
      { year: "2020", event: "EPA Civil Rights Title VI investigation opened on cumulative-exposure complaints in Cancer Alley." },
      { year: "2024", event: "PFAS contamination identified at multiple Louisiana refineries." },
    ],
    notableUtilities: [
      { name: "Sewerage and Water Board of New Orleans", city: "New Orleans", populationServed: 380_000 },
      { name: "Baton Rouge Water Company", city: "Baton Rouge", populationServed: 250_000 },
      { name: "Shreveport Water Department", city: "Shreveport", populationServed: 190_000 },
    ],
    privateWellShare: "~10% on private wells, mostly rural northern Louisiana.",
    whoIsAtRisk:
      "Cancer Alley residents — disproportionately Black — face combined air, water, and soil chemical exposure that has no parallel in U.S. environmental health.",
    filterRecommendation:
      "Reverse osmosis (NSF/ANSI 58) for the broadest protection against the multi-contaminant industrial profile in Cancer Alley.",
  },
  {
    slug: "maine",
    name: "Maine",
    abbreviation: "ME",
    population: 1_400_000,
    utilityCount: 410,
    servedPopulation: 900_000,
    primarySourceMix: "~60% surface water, ~40% groundwater (high private well share)",
    topContaminants: ["pfas", "arsenic", "lead", "nitrate"],
    context:
      "Maine led the country in PFAS regulation after biosolids-spread sludge contaminated dairy farms and household wells across the state. About 40% of Mainers drink from private wells with no testing requirement, raising natural-arsenic exposure concerns.",
    flagshipStory:
      "Maine became the first state to ban biosolids land application after widespread PFAS farm contamination.",
    majorCities: ["Portland", "Lewiston", "Bangor", "Augusta"],
    regulator: {
      name: "Maine Drinking Water Program — Maine CDC",
      websiteUrl: "https://www.maine.gov/dhhs/mecdc/environmental-health/dwp/",
      complaintsUrl: "https://www.maine.gov/dhhs/mecdc/environmental-health/dwp/concerns/index.shtml",
    },
    regulatoryPosture:
      "Among the strictest state PFAS frameworks in the country. Maine MCLs for six PFAS compounds at 20 ng/L combined. 2022 statewide biosolids land-application ban.",
    timeline: [
      { year: "2018", event: "PFAS contamination identified at Fairfield dairy farms from biosolids fertilizer." },
      { year: "2021", event: "Maine sets MCL of 20 ng/L combined for six PFAS compounds." },
      { year: "2022", event: "Maine becomes first state to ban biosolids land application." },
      { year: "2024", event: "Statewide private-well PFAS testing program expands; PFAS Fund established." },
    ],
    notableUtilities: [
      { name: "Portland Water District", city: "Portland", populationServed: 200_000 },
      { name: "Bangor Water District", city: "Bangor", populationServed: 38_000 },
    ],
    privateWellShare: "~40% of Mainers — one of the highest private-well rates in the U.S. — most without testing requirements.",
    whoIsAtRisk:
      "Maine farmers and rural households on private wells in the Fairfield / Unity / Arundel corridors face the most-documented PFAS exposure.",
    filterRecommendation:
      "For private wells: test first. Then NSF/ANSI 58 reverse osmosis for the combination of PFAS, arsenic, and bacteria.",
  },
  {
    slug: "maryland",
    name: "Maryland",
    abbreviation: "MD",
    population: 6_180_000,
    utilityCount: 460,
    servedPopulation: 5_700_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["pfas", "tthm", "lead", "chromium-6"],
    context:
      "Maryland's Chesapeake watershed and Potomac source water carry agricultural and urban runoff. Baltimore's aging service lines and PFAS contamination from military and industrial sites are documented concerns.",
    majorCities: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Annapolis"],
    regulator: {
      name: "Maryland Department of the Environment — Water Supply Program",
      websiteUrl: "https://mde.maryland.gov/programs/water/water_supply/Pages/index.aspx",
      complaintsUrl: "https://mde.maryland.gov/Pages/file-a-complaint.aspx",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State PFAS Action Plan launched 2020. Active Chesapeake watershed protection.",
    timeline: [
      { year: "2017", event: "PFAS contamination at Joint Base Andrews triggers Prince George's County response." },
      { year: "2020", event: "Maryland PFAS Action Plan launched with statewide sampling." },
    ],
    notableUtilities: [
      { name: "Baltimore City Department of Public Works", city: "Baltimore", populationServed: 1_800_000 },
      { name: "Washington Suburban Sanitary Commission", city: "DC metro / MD", populationServed: 1_900_000 },
    ],
    privateWellShare: "~20% on private wells, mostly in Eastern Shore agricultural counties.",
    whoIsAtRisk:
      "Baltimore residents in pre-1986 housing face significant lead exposure. Eastern Shore agricultural communities face nitrate and PFAS.",
    filterRecommendation:
      "For Baltimore lead: NSF/ANSI 53 carbon block. For Eastern Shore private wells: NSF/ANSI 58 reverse osmosis.",
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    abbreviation: "MA",
    population: 7_000_000,
    utilityCount: 530,
    servedPopulation: 6_700_000,
    primarySourceMix: "~70% surface water (Quabbin), ~30% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Greater Boston drinks pristine Quabbin Reservoir water — among the highest-quality municipal source water in the country. Yet Massachusetts' colonial-era and post-war housing stock means lead-in-water exposure remains significant in many communities. PFAS contamination affects multiple Cape Cod systems.",
    majorCities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
    regulator: {
      name: "Massachusetts Department of Environmental Protection — Drinking Water Program",
      websiteUrl: "https://www.mass.gov/orgs/drinking-water-program",
      complaintsUrl: "https://www.mass.gov/how-to/file-an-environmental-complaint",
    },
    regulatoryPosture:
      "Among the strictest states. Massachusetts MCL of 20 ng/L combined for six PFAS compounds (2020). State School Lead-in-Water Program operational since 2016.",
    timeline: [
      { year: "2016", event: "Massachusetts launches one of the first state-mandated school lead-in-water testing programs." },
      { year: "2020", event: "State sets MCL of 20 ng/L combined for six PFAS compounds." },
      { year: "2023", event: "Cape Cod-wide PFAS testing identifies multiple military-source contamination zones." },
    ],
    notableUtilities: [
      { name: "Massachusetts Water Resources Authority", city: "Boston metro / Quabbin", populationServed: 2_500_000 },
      { name: "Springfield Water and Sewer Commission", city: "Springfield", populationServed: 250_000 },
      { name: "Worcester Department of Public Works", city: "Worcester", populationServed: 200_000 },
    ],
    privateWellShare: "~13% on private wells. Cape Cod and Western Massachusetts have the most documented private-well PFAS.",
    whoIsAtRisk:
      "Boston-area residents in pre-1986 colonial-era housing face lead from older service lines. Cape Cod households near former military bases face PFAS.",
    filterRecommendation:
      "For lead: NSF/ANSI 53 carbon block. For Cape Cod PFAS: NSF/ANSI P473 or reverse osmosis.",
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbreviation: "MI",
    population: 10_040_000,
    utilityCount: 1_390,
    servedPopulation: 9_400_000,
    primarySourceMix: "~75% surface water (Great Lakes), ~25% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Michigan has both pristine Great Lakes source water and the country's most-cited water crisis. Flint's 2014–2015 lead exposure permanently changed U.S. water regulation. PFAS contamination is the most widely documented of any state.",
    flagshipStory:
      "Flint became the defining U.S. drinking-water failure of the 21st century.",
    majorCities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Flint"],
    regulator: {
      name: "Michigan Department of Environment, Great Lakes, and Energy (EGLE)",
      websiteUrl: "https://www.michigan.gov/egle/about/organization/drinking-water-and-environmental-health",
      complaintsUrl: "https://www.michigan.gov/egle/contact",
    },
    regulatoryPosture:
      "Post-Flint, Michigan adopted the strictest Lead and Copper Rule in the U.S. (action level 12 ppb, dropping to 10 in 2025). State MCLs for 7 PFAS compounds (2020). Lead service line replacement mandate.",
    timeline: [
      { year: "2014–2015", event: "Flint water crisis: a city manager switches water source to the Flint River without corrosion control; lead leaches into 100,000+ homes." },
      { year: "2018", event: "Michigan adopts the strictest state Lead and Copper Rule in the U.S. (12 ppb action level)." },
      { year: "2020", event: "Michigan sets MCLs for 7 PFAS compounds — among the most comprehensive in the country." },
      { year: "2023", event: "Michigan PFAS Action Response Team continues statewide sampling and remediation." },
    ],
    notableUtilities: [
      { name: "Great Lakes Water Authority", city: "Detroit metro", populationServed: 3_800_000 },
      { name: "City of Grand Rapids Water System", city: "Grand Rapids", populationServed: 280_000 },
      { name: "Lansing Board of Water and Light", city: "Lansing", populationServed: 110_000 },
    ],
    leadServiceLines: {
      approxCount: 460_000,
      notes: "Michigan has approximately 460,000 lead service lines statewide. Detroit area alone has 80,000+.",
    },
    privateWellShare: "~25% on private wells — among the highest in the U.S. Northern Michigan has elevated PFAS in private wells.",
    whoIsAtRisk:
      "Flint residents — disproportionately Black and low-income — bear lifelong cognitive and developmental harm. Statewide private-well PFAS exposure is highest in Michigan of any state.",
    filterRecommendation:
      "For lead, NSF/ANSI 53 certified for lead reduction. For PFAS, NSF/ANSI P473 or reverse osmosis. State of Michigan provides free filters to flagged communities.",
  },
  {
    slug: "minnesota",
    name: "Minnesota",
    abbreviation: "MN",
    population: 5_750_000,
    utilityCount: 970,
    servedPopulation: 5_200_000,
    primarySourceMix: "~75% groundwater, ~25% surface water",
    topContaminants: ["nitrate", "pfas", "tthm"],
    context:
      "Minnesota's southeast karst region and farm belt have widespread nitrate exposure. The Twin Cities' East Metro is the original PFAS contamination zone — 3M's manufacturing operations there generated decades of groundwater contamination.",
    flagshipStory:
      "Minnesota's 3M PFAS settlement remains one of the largest environmental settlements in U.S. history.",
    majorCities: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington"],
    regulator: {
      name: "Minnesota Department of Health — Drinking Water Protection",
      websiteUrl: "https://www.health.state.mn.us/communities/environment/water/index.html",
      complaintsUrl: "https://www.health.state.mn.us/communities/environment/water/contacts.html",
    },
    regulatoryPosture:
      "Strict state-level PFAS framework. Minnesota Department of Health Health-Based Values for PFAS predate federal action by years. State enforces PFAS at 5+ contaminants below detection-limit guidance.",
    timeline: [
      { year: "2010", event: "Minnesota Attorney General sues 3M for $5B over East Metro PFAS contamination." },
      { year: "2018", event: "3M agrees to $850M settlement for Minnesota PFAS damages — among the largest environmental settlements in U.S. history." },
      { year: "2023", event: "Minnesota bans PFAS in most consumer products (Amara's Law) — most aggressive U.S. state ban." },
    ],
    notableUtilities: [
      { name: "Minneapolis Water Department", city: "Minneapolis", populationServed: 500_000 },
      { name: "Saint Paul Regional Water Services", city: "Saint Paul", populationServed: 425_000 },
      { name: "Rochester Public Utilities", city: "Rochester", populationServed: 120_000 },
    ],
    privateWellShare: "~20% on private wells. Southeast karst region (Winona, Olmsted, Fillmore counties) has the highest nitrate exposure.",
    whoIsAtRisk:
      "East Metro residents (Cottage Grove, Lake Elmo, Oakdale, Woodbury) face the most-documented PFAS exposure in the U.S. Southeast karst farmers face nitrate.",
    filterRecommendation:
      "For East Metro PFAS: NSF/ANSI P473 or reverse osmosis. State of Minnesota provides POU filters in confirmed contamination zones.",
  },
  {
    slug: "mississippi",
    name: "Mississippi",
    abbreviation: "MS",
    population: 2_940_000,
    utilityCount: 1_180,
    servedPopulation: 2_700_000,
    primarySourceMix: "~75% groundwater, ~25% surface water",
    topContaminants: ["tthm", "lead", "pfas"],
    context:
      "Mississippi's small-system infrastructure was severely tested by the 2022 Jackson water crisis. Aging treatment plants and disinfection byproducts are persistent concerns across the state.",
    flagshipStory:
      "Jackson's 2022 water system collapse left 150,000 residents without safe tap water for weeks.",
    majorCities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
    regulator: {
      name: "Mississippi State Department of Health — Bureau of Public Water Supply",
      websiteUrl: "https://msdh.ms.gov/page/30,0,76.html",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Jackson is under EPA federal consent decree post-2022 crisis.",
    timeline: [
      { year: "2020", event: "Jackson under EPA emergency order over chronic SDWA violations." },
      { year: "2022", event: "Pearl River flooding collapses Jackson's primary treatment plant; 150,000 residents lose safe tap water for over a month." },
      { year: "2023", event: "Federal third-party manager appointed for Jackson water system." },
    ],
    notableUtilities: [
      { name: "Jackson Department of Public Works", city: "Jackson", populationServed: 150_000, notes: "Under federal third-party management since 2023." },
      { name: "Gulfport Public Works", city: "Gulfport", populationServed: 72_000 },
    ],
    privateWellShare: "~20% on private wells, concentrated in rural Delta counties.",
    whoIsAtRisk:
      "Jackson residents — over 80% Black — have faced sustained water-system failures for years and the longest single-system shutdown in modern U.S. history.",
    filterRecommendation:
      "For Jackson and rural systems: NSF/ANSI 53 carbon block for TTHMs and lead. Boil-water advisories must be followed; filters are not a substitute.",
  },
  {
    slug: "missouri",
    name: "Missouri",
    abbreviation: "MO",
    population: 6_180_000,
    utilityCount: 1_390,
    servedPopulation: 5_700_000,
    primarySourceMix: "~55% surface water, ~45% groundwater",
    topContaminants: ["lead", "tthm", "nitrate", "pfas"],
    context:
      "Missouri's lead mining belt in the southeast has groundwater lead concerns separate from infrastructure-related lead exposure. St. Louis and Kansas City both have aging service-line inventories.",
    majorCities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
    regulator: {
      name: "Missouri Department of Natural Resources — Public Drinking Water Branch",
      websiteUrl: "https://dnr.mo.gov/water/business-industry-other-entities/permits-certification-engineering-fees/public-drinking-water",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Lead-mining-belt monitoring is a state priority.",
    timeline: [
      { year: "2017", event: "St. Louis identifies 60,000+ lead service lines requiring replacement." },
      { year: "2020", event: "Statewide PFAS sampling expanded under federal UCMR 5." },
    ],
    notableUtilities: [
      { name: "Kansas City Water", city: "Kansas City", populationServed: 460_000 },
      { name: "St. Louis Water Division", city: "St. Louis", populationServed: 300_000 },
      { name: "Missouri American Water", city: "Multi-region", populationServed: 1_500_000 },
    ],
    privateWellShare: "~15% on private wells, concentrated in southern Missouri Ozarks and lead belt.",
    whoIsAtRisk:
      "St. Louis and Kansas City pre-1986 housing residents face the highest infrastructure-lead exposure. Lead-mining-belt residents face geologic lead.",
    filterRecommendation:
      "NSF/ANSI 53 carbon block for lead. Reverse osmosis for lead-mining-belt private wells.",
  },
  {
    slug: "montana",
    name: "Montana",
    abbreviation: "MT",
    population: 1_120_000,
    utilityCount: 670,
    servedPopulation: 900_000,
    primarySourceMix: "~60% groundwater, ~40% surface water",
    topContaminants: ["arsenic", "lead", "nitrate"],
    context:
      "Montana's mining legacy drives arsenic and heavy-metal exposure in several watersheds. Butte and Anaconda communities have decades-long Superfund water-quality history.",
    majorCities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"],
    regulator: {
      name: "Montana Department of Environmental Quality — Public Water Supply",
      websiteUrl: "https://deq.mt.gov/water/Programs/dw",
      complaintsUrl: "https://deq.mt.gov/about/contactus",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active EPA Superfund oversight in Clark Fork watershed.",
    timeline: [
      { year: "1983", event: "Clark Fork Superfund site designated — among the largest in the U.S." },
      { year: "2019", event: "Butte / Anaconda remediation milestones reached; long-term groundwater monitoring continues." },
    ],
    notableUtilities: [
      { name: "Billings Public Works", city: "Billings", populationServed: 120_000 },
      { name: "Mountain Water Company", city: "Missoula", populationServed: 80_000 },
      { name: "Bozeman Water Department", city: "Bozeman", populationServed: 55_000 },
    ],
    privateWellShare: "~30% on private wells — one of the highest in the U.S.",
    whoIsAtRisk:
      "Residents in the Butte / Anaconda / Helena copper-corridor face the most-documented heavy-metal exposure. Rural well users face arsenic.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis is the most universal solution for Montana's combined arsenic + heavy-metal profile.",
  },
  {
    slug: "nebraska",
    name: "Nebraska",
    abbreviation: "NE",
    population: 1_990_000,
    utilityCount: 590,
    servedPopulation: 1_800_000,
    primarySourceMix: "~85% groundwater (Ogallala), ~15% surface water",
    topContaminants: ["nitrate", "arsenic", "tthm"],
    context:
      "Nebraska's almost-total reliance on the Ogallala Aquifer makes nitrate exposure from corn agriculture the dominant concern. Multiple small systems regularly exceed the federal nitrate MCL.",
    majorCities: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
    regulator: {
      name: "Nebraska Department of Environment and Energy — Drinking Water Section",
      websiteUrl: "https://dee.ne.gov/Publica.nsf/Pages/WAT104",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Long-running political dispute over agricultural nitrate accountability.",
    timeline: [
      { year: "2018", event: "Multiple small Sandhills communities exceed nitrate MCL." },
      { year: "2023", event: "Cedar County 'cancer cluster' formally linked to longstanding nitrate exposure." },
    ],
    notableUtilities: [
      { name: "Metropolitan Utilities District", city: "Omaha", populationServed: 600_000 },
      { name: "Lincoln Water System", city: "Lincoln", populationServed: 290_000 },
    ],
    privateWellShare: "~16% on private wells, with significant nitrate exposure in central and eastern agricultural zones.",
    whoIsAtRisk:
      "Rural farm families on private wells face the highest nitrate exposure. Infants on formula are at acute risk.",
    filterRecommendation:
      "Reverse osmosis (NSF/ANSI 58) for nitrate. Boiling does NOT remove nitrate — it concentrates it.",
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbreviation: "NV",
    population: 3_180_000,
    utilityCount: 470,
    servedPopulation: 3_000_000,
    primarySourceMix: "~75% Colorado River + Lake Mead, ~25% groundwater",
    topContaminants: ["arsenic", "tthm", "chromium-6", "pfas"],
    context:
      "Las Vegas draws nearly all of its water from Lake Mead (Colorado River). Natural arsenic from desert geology affects groundwater systems. Henderson and the I-15 corridor have legacy industrial groundwater contamination.",
    majorCities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
    regulator: {
      name: "Nevada Division of Environmental Protection — Bureau of Safe Drinking Water",
      websiteUrl: "https://ndep.nv.gov/water/drinking-water",
      complaintsUrl: "https://ndep.nv.gov/about/contact-us",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active Colorado River drought planning dominates state water policy.",
    timeline: [
      { year: "1980s", event: "Henderson perchlorate contamination identified — among the first major U.S. perchlorate cases." },
      { year: "2023", event: "Lake Mead reaches lowest level since impoundment; Las Vegas drought planning escalates." },
    ],
    notableUtilities: [
      { name: "Las Vegas Valley Water District", city: "Las Vegas metro", populationServed: 1_500_000 },
      { name: "Truckee Meadows Water Authority", city: "Reno metro", populationServed: 410_000 },
      { name: "City of Henderson Public Works", city: "Henderson", populationServed: 320_000 },
    ],
    privateWellShare: "~7% on private wells.",
    whoIsAtRisk:
      "Rural Nevada residents on groundwater wells face the highest geologic arsenic exposure. Henderson industrial-corridor residents face legacy contamination.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis for arsenic, chromium-6, and TTHMs in one system.",
  },
  {
    slug: "new-hampshire",
    name: "New Hampshire",
    abbreviation: "NH",
    population: 1_400_000,
    utilityCount: 700,
    servedPopulation: 900_000,
    primarySourceMix: "~50% groundwater, ~50% surface water (high private well share)",
    topContaminants: ["pfas", "arsenic", "lead"],
    context:
      "New Hampshire has the strictest state-level PFAS limits in the country (12 ng/L for PFOA, 15 ng/L for PFOS). The Saint-Gobain plant in Merrimack drove early state PFAS regulation. Natural arsenic in private wells is widespread.",
    flagshipStory:
      "New Hampshire was first in the U.S. to set drinking-water limits for four PFAS compounds.",
    majorCities: ["Manchester", "Nashua", "Concord", "Portsmouth"],
    regulator: {
      name: "New Hampshire Department of Environmental Services — Drinking Water and Groundwater Bureau",
      websiteUrl: "https://www.des.nh.gov/water/drinking-water",
      complaintsUrl: "https://www.des.nh.gov/about/contact",
    },
    regulatoryPosture:
      "Among the strictest in the U.S. NH MCLs: PFOA 12 ng/L, PFOS 15 ng/L, PFHxS 18 ng/L, PFNA 11 ng/L. Universal lead service line inventory complete.",
    timeline: [
      { year: "2016", event: "Saint-Gobain Performance Plastics in Merrimack identified as PFOA source affecting hundreds of households." },
      { year: "2019", event: "New Hampshire sets first-in-U.S. MCLs for four PFAS compounds." },
      { year: "2023", event: "Statewide PFAS-treatment grant program expanded." },
    ],
    notableUtilities: [
      { name: "Manchester Water Works", city: "Manchester", populationServed: 160_000 },
      { name: "Pennichuck Water", city: "Nashua", populationServed: 145_000 },
      { name: "Portsmouth Water Department", city: "Portsmouth", populationServed: 80_000 },
    ],
    privateWellShare: "~40% on private wells — among the highest in the country. Significant geologic arsenic.",
    whoIsAtRisk:
      "Merrimack-area households face the most-documented PFAS exposure. Statewide rural well users face natural arsenic.",
    filterRecommendation:
      "For PFAS: NSF/ANSI P473 or reverse osmosis. For private-well arsenic: NSF/ANSI 58 RO.",
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbreviation: "NJ",
    population: 9_290_000,
    utilityCount: 600,
    servedPopulation: 8_900_000,
    primarySourceMix: "~50% surface water, ~50% groundwater",
    topContaminants: ["pfas", "chromium-6", "lead", "tthm"],
    context:
      "New Jersey was the first state to regulate PFOA in drinking water (2018) after decades of industrial contamination from DuPont and Chemours facilities. The state's chromium-6 standards are among the strictest in the country.",
    flagshipStory:
      "New Jersey's PFAS regulation predates federal action by six years.",
    majorCities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Trenton"],
    regulator: {
      name: "New Jersey Department of Environmental Protection — Bureau of Safe Drinking Water",
      websiteUrl: "https://www.nj.gov/dep/watersupply/g_sdw.html",
      complaintsUrl: "https://www.nj.gov/dep/enforcement/violation.html",
    },
    regulatoryPosture:
      "Among the strictest in the U.S. NJ MCLs: PFOA 14 ng/L, PFOS 13 ng/L, PFNA 13 ng/L. Aggressive Lead and Copper Rule enforcement post-Newark crisis.",
    timeline: [
      { year: "2009", event: "DuPont Chambers Works PFOA contamination identified along Delaware River." },
      { year: "2016–2019", event: "Newark lead-in-water crisis: federal action level exceedances; emergency filter distribution." },
      { year: "2018", event: "New Jersey sets first U.S. state MCL for PFOA (14 ng/L)." },
      { year: "2024", event: "Newark completes 23,000+ lead service line replacements in 3 years — fastest in U.S. history." },
    ],
    notableUtilities: [
      { name: "Newark Department of Water and Sewer", city: "Newark", populationServed: 280_000 },
      { name: "New Jersey American Water", city: "Multi-region", populationServed: 2_800_000 },
      { name: "Suez Water New Jersey", city: "Hackensack metro", populationServed: 750_000 },
      { name: "Jersey City Municipal Utilities Authority", city: "Jersey City", populationServed: 290_000 },
    ],
    leadServiceLines: {
      approxCount: 180_000,
      notes: "Newark's rapid full-replacement is a national model.",
    },
    privateWellShare: "~12% on private wells, mostly rural northwestern NJ.",
    whoIsAtRisk:
      "Newark residents in pre-1986 housing faced acute lead exposure 2016–2019. Camden / South Jersey communities face PFAS and industrial contamination.",
    filterRecommendation:
      "For lead: NSF/ANSI 53. For PFAS: NSF/ANSI P473 or reverse osmosis. New Jersey provides filters in confirmed contamination zones.",
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbreviation: "NM",
    population: 2_120_000,
    utilityCount: 630,
    servedPopulation: 1_900_000,
    primarySourceMix: "~80% groundwater, ~20% surface water",
    topContaminants: ["arsenic", "pfas", "nitrate"],
    context:
      "Natural arsenic in desert groundwater affects systems statewide. Cannon Air Force Base PFAS contamination near Clovis has driven major regional litigation. Multiple Native American communities face exceedances.",
    majorCities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
    regulator: {
      name: "New Mexico Environment Department — Drinking Water Bureau",
      websiteUrl: "https://www.env.nm.gov/drinking-water/",
      complaintsUrl: "https://www.env.nm.gov/file-a-complaint/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State leads multi-state Cannon AFB litigation. No state MCLs stricter than federal.",
    timeline: [
      { year: "2018", event: "Cannon AFB PFAS contamination identified in Clovis-area dairy operations." },
      { year: "2019", event: "New Mexico sues Department of Defense over Cannon AFB PFAS damages." },
      { year: "2023", event: "Multi-million-dollar federal settlement reached for Cannon-area dairy losses." },
    ],
    notableUtilities: [
      { name: "Albuquerque Bernalillo County Water Utility Authority", city: "Albuquerque", populationServed: 660_000 },
      { name: "Las Cruces Utilities", city: "Las Cruces", populationServed: 105_000 },
      { name: "Santa Fe Water Division", city: "Santa Fe", populationServed: 85_000 },
    ],
    privateWellShare: "~12% on private wells, with significant tribal-land coverage gaps.",
    whoIsAtRisk:
      "Navajo Nation communities face the highest combined uranium, arsenic, and infrastructure-gap exposure in the U.S. Cannon-area residents face PFAS.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis is the most reliable for arsenic, PFAS, and nitrate in one system.",
  },
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    population: 19_500_000,
    utilityCount: 2_500,
    servedPopulation: 18_500_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "NYC drinks from the unfiltered Catskill/Delaware watershed — among the highest-quality municipal water in the world. Yet upstate communities have severe PFAS contamination (Hoosick Falls, Newburgh) and pre-war housing stock means widespread lead exposure.",
    flagshipStory:
      "Hoosick Falls became the first nationally publicized PFAS contamination event in 2014.",
    majorCities: ["New York", "Buffalo", "Yonkers", "Rochester", "Syracuse", "Albany"],
    regulator: {
      name: "New York State Department of Health — Bureau of Water Supply Protection",
      websiteUrl: "https://www.health.ny.gov/environmental/water/drinking/",
      complaintsUrl: "https://www.health.ny.gov/environmental/water/drinking/regulations/index.htm",
    },
    regulatoryPosture:
      "Among the strictest in the U.S. NY MCLs: PFOA 10 ng/L, PFOS 10 ng/L, 1,4-Dioxane 1 ppb. NYC has the largest unfiltered water supply in the U.S. Aggressive watershed-protection regime.",
    timeline: [
      { year: "2014", event: "PFOA contamination identified in Hoosick Falls — the first national PFAS-in-drinking-water story." },
      { year: "2016", event: "Newburgh's water supply contaminated by Stewart Air National Guard Base PFAS." },
      { year: "2020", event: "NY sets state MCLs for PFOA (10 ng/L), PFOS (10 ng/L), and 1,4-Dioxane (1 ppb)." },
      { year: "2024", event: "Lead service line inventory deadline triggers replacement push statewide." },
    ],
    notableUtilities: [
      { name: "New York City Department of Environmental Protection", city: "New York City", populationServed: 9_500_000, notes: "Largest unfiltered municipal water supply in the U.S." },
      { name: "Erie County Water Authority", city: "Buffalo metro", populationServed: 550_000 },
      { name: "Monroe County Water Authority", city: "Rochester metro", populationServed: 700_000 },
      { name: "Suffolk County Water Authority", city: "Long Island", populationServed: 1_200_000 },
    ],
    leadServiceLines: {
      approxCount: 360_000,
      notes: "NYC alone has 134,000+ lead service lines; Buffalo, Rochester, and Syracuse add another 100,000+.",
    },
    privateWellShare: "~10% on private wells, mostly upstate.",
    whoIsAtRisk:
      "Hoosick Falls and Newburgh residents face the most-documented PFAS exposure in the state. NYC and upstate pre-war housing residents face lead from older service lines.",
    filterRecommendation:
      "For lead: NSF/ANSI 53. For PFAS upstate: NSF/ANSI P473 or RO. State provides filters in confirmed contamination communities.",
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbreviation: "NC",
    population: 10_800_000,
    utilityCount: 2_100,
    servedPopulation: 9_700_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["pfas", "chromium-6", "tthm", "lead"],
    context:
      "The Cape Fear River basin downstream of Chemours' Fayetteville Works is one of the most contaminated PFAS watersheds in the country, with the discovery of GenX driving 2017 federal attention. Coal-ash contamination from Duke Energy sites adds heavy-metal exposure in multiple regions.",
    flagshipStory:
      "GenX was discovered in the Cape Fear River in 2017 and helped reshape U.S. PFAS policy.",
    majorCities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"],
    regulator: {
      name: "North Carolina Department of Environmental Quality — Division of Water Resources",
      websiteUrl: "https://www.deq.nc.gov/about/divisions/water-resources/water-resources-data/public-water-supply",
      complaintsUrl: "https://www.deq.nc.gov/contact",
    },
    regulatoryPosture:
      "Federal SDWA primacy. Active Chemours consent order requires GenX remediation. No state MCLs stricter than federal but aggressive enforcement in Cape Fear.",
    timeline: [
      { year: "2017", event: "GenX (HFPO-DA) discovered in the Cape Fear River — first major news of next-generation PFAS." },
      { year: "2019", event: "Chemours signs consent order requiring source reduction and household filter provision." },
      { year: "2023", event: "Multi-state Chemours / DuPont PFAS settlement reaches $1B." },
    ],
    notableUtilities: [
      { name: "Charlotte Water", city: "Charlotte metro", populationServed: 1_200_000 },
      { name: "Raleigh Water", city: "Raleigh metro", populationServed: 600_000 },
      { name: "Cape Fear Public Utility Authority", city: "Wilmington", populationServed: 200_000, notes: "Primary affected utility downstream of Chemours." },
      { name: "Greensboro Water Resources", city: "Greensboro", populationServed: 300_000 },
    ],
    privateWellShare: "~25% on private wells — one of the highest in the U.S. — concentrated in rural agricultural areas.",
    whoIsAtRisk:
      "Lower Cape Fear residents in Wilmington / Brunswick / New Hanover face the most-documented GenX and PFAS exposure. Coal-ash-affected communities face heavy-metal risk.",
    filterRecommendation:
      "For PFAS / GenX: NSF/ANSI P473 or reverse osmosis. Chemours-provided POE systems available to affected households.",
  },
  {
    slug: "north-dakota",
    name: "North Dakota",
    abbreviation: "ND",
    population: 780_000,
    utilityCount: 350,
    servedPopulation: 700_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["arsenic", "tthm", "nitrate"],
    context:
      "North Dakota's source water includes the Missouri River and shallow groundwater wells. Natural arsenic and agricultural runoff are the dominant concerns; oil-and-gas wastewater incidents add localized risk.",
    majorCities: ["Fargo", "Bismarck", "Grand Forks", "Minot"],
    regulator: {
      name: "North Dakota Department of Environmental Quality — Division of Municipal Facilities",
      websiteUrl: "https://deq.nd.gov/MF/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Bakken oil-and-gas wastewater spills are a recurring contamination concern.",
    timeline: [
      { year: "2015", event: "Bakken oil-and-gas wastewater spills contaminate multiple Western ND surface water sources." },
      { year: "2023", event: "Federal infrastructure funding directed to small-system arsenic-treatment upgrades." },
    ],
    notableUtilities: [
      { name: "Fargo Public Works", city: "Fargo", populationServed: 130_000 },
      { name: "Bismarck Water Treatment Plant", city: "Bismarck", populationServed: 75_000 },
    ],
    privateWellShare: "~20% on private wells. Bakken-region wells have documented hydrocarbon and brine contamination.",
    whoIsAtRisk:
      "Bakken-region residents (Williston, Watford City, Tioga) face the highest oil-and-gas-wastewater exposure. Rural well users face arsenic.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis covers arsenic, nitrate, and most VOCs from oil-and-gas contamination.",
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbreviation: "OH",
    population: 11_770_000,
    utilityCount: 1_290,
    servedPopulation: 11_100_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Lake Erie supplies most of northern Ohio. The 2014 Toledo algal-bloom crisis left 500,000 residents without tap water for three days. East Palestine's 2023 train-derailment chemical contamination remains an active concern. PFAS plumes from DuPont's Washington Works in Parkersburg affect Ohio River systems.",
    flagshipStory:
      "Toledo's 2014 microcystin shutdown was the first major U.S. tap water crisis caused by algal blooms.",
    majorCities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
    regulator: {
      name: "Ohio Environmental Protection Agency — Division of Drinking and Ground Waters",
      websiteUrl: "https://epa.ohio.gov/divisions-and-offices/drinking-and-ground-waters",
      complaintsUrl: "https://epa.ohio.gov/about/contact-us",
    },
    regulatoryPosture:
      "Federal SDWA primacy. Post-Toledo, statewide harmful-algal-bloom monitoring program. PFAS Action Plan adopted 2020.",
    timeline: [
      { year: "2014", event: "Toledo's Microcystin shutdown — 500,000 residents lose tap water for 3 days due to Lake Erie algal bloom." },
      { year: "2020", event: "Ohio EPA launches PFAS Action Plan with statewide community-system sampling." },
      { year: "2023", event: "East Palestine train derailment releases vinyl chloride and other chemicals; long-term groundwater monitoring ongoing." },
    ],
    notableUtilities: [
      { name: "City of Columbus Department of Public Utilities", city: "Columbus", populationServed: 1_200_000 },
      { name: "Cleveland Water", city: "Cleveland metro", populationServed: 1_500_000 },
      { name: "Greater Cincinnati Water Works", city: "Cincinnati metro", populationServed: 1_100_000 },
      { name: "City of Toledo Public Utilities", city: "Toledo", populationServed: 500_000 },
    ],
    privateWellShare: "~15% on private wells, mostly rural eastern and southern Ohio.",
    whoIsAtRisk:
      "Toledo and Lake Erie shoreline residents face recurring HAB risk. East Palestine and surrounding areas face derailment-related long-term contamination. Ohio River cities face PFAS.",
    filterRecommendation:
      "For algal toxins: NSF/ANSI 53 + 401. For PFAS: NSF/ANSI P473. For East Palestine vinyl chloride concerns: NSF/ANSI 53 certified for VOC reduction.",
  },
  {
    slug: "oklahoma",
    name: "Oklahoma",
    abbreviation: "OK",
    population: 4_080_000,
    utilityCount: 950,
    servedPopulation: 3_800_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["arsenic", "tthm", "nitrate", "lead"],
    context:
      "Oklahoma's reservoirs and shallow groundwater systems face arsenic and disinfection-byproduct exposure. Tar Creek Superfund area has decades of mining-related water contamination.",
    majorCities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
    regulator: {
      name: "Oklahoma Department of Environmental Quality — Water Quality Division",
      websiteUrl: "https://www.deq.ok.gov/water-quality-division/drinking-water/",
      complaintsUrl: "https://www.deq.ok.gov/about-deq/contact-us/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Tar Creek Superfund remains a long-running remediation case.",
    timeline: [
      { year: "1983", event: "Tar Creek (Picher) designated EPA Superfund site over lead and zinc mining contamination." },
      { year: "2018", event: "Oklahoma City and Tulsa complete lead-service-line inventories ahead of federal mandate." },
    ],
    notableUtilities: [
      { name: "Oklahoma City Utilities Department", city: "Oklahoma City", populationServed: 700_000 },
      { name: "City of Tulsa Water and Sewer", city: "Tulsa", populationServed: 410_000 },
    ],
    privateWellShare: "~15% on private wells, concentrated in central and western OK.",
    whoIsAtRisk:
      "Tar Creek-area residents (Ottawa County) face the most-documented mining-related contamination. Rural well users face arsenic.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis for arsenic, lead, and nitrate.",
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbreviation: "OR",
    population: 4_240_000,
    utilityCount: 880,
    servedPopulation: 3_900_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["lead", "tthm", "pfas", "chromium-6"],
    context:
      "Portland's Bull Run watershed is one of the highest-quality unfiltered municipal sources in the U.S. The state's 2017 statewide lead-in-school-water testing program found widespread fixture-level exposure that didn't show up in utility-level reports.",
    majorCities: ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro"],
    regulator: {
      name: "Oregon Health Authority — Drinking Water Services",
      websiteUrl: "https://www.oregon.gov/oha/PH/HEALTHYENVIRONMENTS/DRINKINGWATER/Pages/index.aspx",
      complaintsUrl: "https://www.oregon.gov/oha/PH/HEALTHYENVIRONMENTS/DRINKINGWATER/COMPLAINTS/Pages/index.aspx",
    },
    regulatoryPosture:
      "Federal SDWA primacy. Statewide lead-in-school-water testing program operational since 2017. No state MCLs stricter than federal.",
    timeline: [
      { year: "2016", event: "Portland Public Schools lead exposure scandal triggers statewide testing." },
      { year: "2017", event: "Oregon launches statewide school lead-in-water testing program." },
      { year: "2024", event: "Federal LCRI replaces lead service lines mandate aligns with existing Oregon work." },
    ],
    notableUtilities: [
      { name: "Portland Water Bureau", city: "Portland", populationServed: 1_000_000 },
      { name: "Eugene Water and Electric Board", city: "Eugene", populationServed: 200_000 },
      { name: "Salem Public Works", city: "Salem", populationServed: 190_000 },
    ],
    privateWellShare: "~20% on private wells. Rural Coast Range has the most documented arsenic.",
    whoIsAtRisk:
      "School-age children in pre-1986 school buildings face the most-documented lead exposure. Rural well users face arsenic.",
    filterRecommendation:
      "For lead: NSF/ANSI 53. For rural private-well arsenic: NSF/ANSI 58 RO.",
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbreviation: "PA",
    population: 13_000_000,
    utilityCount: 1_960,
    servedPopulation: 11_700_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Pennsylvania's older industrial cities (Pittsburgh, Philadelphia) have among the country's highest lead service line counts. Fracking-related groundwater contamination affects multiple rural communities. PFAS plumes from military bases (Willow Grove, Warminster) are well-documented.",
    flagshipStory:
      "Pittsburgh's lead-in-water exceedances in 2016 triggered a multi-year emergency response.",
    majorCities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"],
    regulator: {
      name: "Pennsylvania Department of Environmental Protection — Bureau of Safe Drinking Water",
      websiteUrl: "https://www.dep.pa.gov/Business/Water/BureauSafeDrinkingWater/Pages/default.aspx",
      complaintsUrl: "https://www.dep.pa.gov/Citizens/Pages/Lodging-a-Complaint.aspx",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State PFAS MCLs adopted 2023: PFOA 14 ng/L, PFOS 18 ng/L. Active lead-line-replacement programs in Pittsburgh and Philadelphia.",
    timeline: [
      { year: "2014", event: "PFAS contamination identified at Willow Grove and Warminster Naval Air Stations." },
      { year: "2016", event: "Pittsburgh's water authority exceeds lead action level; emergency filter distribution begins." },
      { year: "2023", event: "Pennsylvania sets state MCLs for PFOA and PFOS." },
    ],
    notableUtilities: [
      { name: "Philadelphia Water Department", city: "Philadelphia", populationServed: 1_600_000 },
      { name: "Pittsburgh Water and Sewer Authority", city: "Pittsburgh", populationServed: 300_000 },
      { name: "Aqua Pennsylvania", city: "Multi-region", populationServed: 1_400_000 },
    ],
    leadServiceLines: {
      approxCount: 200_000,
      notes: "Pittsburgh and Philadelphia each have tens of thousands of lead service lines.",
    },
    privateWellShare: "~17% on private wells, with significant fracking-related contamination in Marcellus shale region.",
    whoIsAtRisk:
      "Pittsburgh and Philadelphia residents in pre-1986 housing face significant lead exposure. Bucks and Montgomery County residents face military-base PFAS. Marcellus Shale region faces fracking contamination.",
    filterRecommendation:
      "For lead: NSF/ANSI 53 carbon block. For PFAS in PA: NSF/ANSI P473 or RO.",
  },
  {
    slug: "rhode-island",
    name: "Rhode Island",
    abbreviation: "RI",
    population: 1_100_000,
    utilityCount: 80,
    servedPopulation: 1_050_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["lead", "pfas", "tthm"],
    context:
      "Providence's pre-war housing stock means lead service lines remain a real concern. PFAS contamination in southern Rhode Island affects multiple water systems.",
    majorCities: ["Providence", "Cranston", "Warwick", "Pawtucket"],
    regulator: {
      name: "Rhode Island Department of Health — Center for Drinking Water Quality",
      websiteUrl: "https://health.ri.gov/water/about/drinkingwater/",
      complaintsUrl: "https://health.ri.gov/water/about/drinkingwater/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State PFAS MCL adopted 2022: 20 ng/L combined for six PFAS compounds.",
    timeline: [
      { year: "2017", event: "PFAS contamination identified at Pawtuxet River systems." },
      { year: "2022", event: "Rhode Island sets state PFAS MCL of 20 ng/L combined." },
    ],
    notableUtilities: [
      { name: "Providence Water Supply Board", city: "Providence", populationServed: 600_000 },
      { name: "Kent County Water Authority", city: "Warwick metro", populationServed: 200_000 },
    ],
    leadServiceLines: {
      approxCount: 22_000,
      notes: "Providence has ~22,000 lead service lines.",
    },
    privateWellShare: "~12% on private wells.",
    whoIsAtRisk:
      "Providence residents in pre-1986 housing face significant lead exposure. Southern RI residents face PFAS.",
    filterRecommendation:
      "For lead: NSF/ANSI 53 carbon block. For PFAS: NSF/ANSI P473.",
  },
  {
    slug: "south-carolina",
    name: "South Carolina",
    abbreviation: "SC",
    population: 5_400_000,
    utilityCount: 660,
    servedPopulation: 4_900_000,
    primarySourceMix: "~70% surface water, ~30% groundwater",
    topContaminants: ["pfas", "tthm", "lead", "chromium-6"],
    context:
      "Cape Fear basin PFAS contamination from upstream North Carolina affects multiple South Carolina systems. Coastal groundwater faces saltwater intrusion. Charleston and Columbia draw from river-fed surface systems with consistent TTHM exposure.",
    majorCities: ["Charleston", "Columbia", "Greenville", "Mount Pleasant", "Rock Hill"],
    regulator: {
      name: "South Carolina Department of Health and Environmental Control — Bureau of Water",
      websiteUrl: "https://scdhec.gov/environment/water-quality/drinking-water",
      complaintsUrl: "https://scdhec.gov/about-dhec/contact-dhec",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. PFAS testing expanding under 2024 federal rule.",
    timeline: [
      { year: "2018", event: "PFAS contamination from upstream Chemours documented in Lake Wateree and Catawba basin." },
      { year: "2024", event: "Federal PFAS rule triggers expanded testing across SC systems." },
    ],
    notableUtilities: [
      { name: "Charleston Water System", city: "Charleston metro", populationServed: 480_000 },
      { name: "Columbia Water", city: "Columbia", populationServed: 375_000 },
      { name: "Greenville Water", city: "Greenville", populationServed: 500_000 },
    ],
    privateWellShare: "~17% on private wells, concentrated in rural Lowcountry and Midlands.",
    whoIsAtRisk:
      "Catawba River downstream communities face Chemours PFAS exposure. Coastal communities face saltwater intrusion.",
    filterRecommendation:
      "For PFAS in Catawba region: NSF/ANSI P473 or RO. For TTHMs in Lowcountry: NSF/ANSI 53 carbon block.",
  },
  {
    slug: "south-dakota",
    name: "South Dakota",
    abbreviation: "SD",
    population: 920_000,
    utilityCount: 430,
    servedPopulation: 820_000,
    primarySourceMix: "~55% surface water (Missouri), ~45% groundwater",
    topContaminants: ["arsenic", "tthm", "nitrate"],
    context:
      "South Dakota's mix of Missouri River systems and rural groundwater wells produces arsenic and nitrate exposure as the dominant concerns. Several tribal water systems face significant contaminant exceedances.",
    majorCities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
    regulator: {
      name: "South Dakota Department of Agriculture and Natural Resources — Drinking Water Program",
      websiteUrl: "https://danr.sd.gov/OfficeofWater/DrinkingWater/default.aspx",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Tribal water system support is a recurring federal funding priority.",
    timeline: [
      { year: "2015", event: "Multiple Pine Ridge and Rosebud Reservation systems flagged for nitrate and arsenic." },
      { year: "2023", event: "Federal infrastructure funding targets tribal water system upgrades." },
    ],
    notableUtilities: [
      { name: "City of Sioux Falls Public Works", city: "Sioux Falls", populationServed: 200_000 },
      { name: "Rapid City Public Works", city: "Rapid City", populationServed: 75_000 },
    ],
    privateWellShare: "~25% on private wells.",
    whoIsAtRisk:
      "Tribal community residents on Pine Ridge, Rosebud, and Cheyenne River Reservations face among the worst combined infrastructure and contaminant exposure in the U.S.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis for arsenic, nitrate, and bacterial pathogens.",
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    abbreviation: "TN",
    population: 7_130_000,
    utilityCount: 480,
    servedPopulation: 6_700_000,
    primarySourceMix: "~80% surface water, ~20% groundwater",
    topContaminants: ["tthm", "pfas", "lead", "chromium-6"],
    context:
      "Memphis sits on the Memphis Sand Aquifer — extraordinary natural source water. East Tennessee's reliance on Tennessee River and tributaries means TTHMs dominate exposure. The 2008 Kingston coal-ash spill remains the largest U.S. industrial environmental disaster.",
    majorCities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
    regulator: {
      name: "Tennessee Department of Environment and Conservation — Division of Water Resources",
      websiteUrl: "https://www.tn.gov/environment/program-areas/wr-water-resources.html",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active coal-ash and TVA-site remediation oversight.",
    timeline: [
      { year: "2008", event: "Kingston coal-ash spill — 1.1B gallons of coal ash slurry breach — largest U.S. industrial environmental disaster." },
      { year: "2019", event: "Kingston cleanup workers' health crisis becomes national news." },
    ],
    notableUtilities: [
      { name: "Nashville Metro Water Services", city: "Nashville", populationServed: 700_000 },
      { name: "Memphis Light, Gas and Water", city: "Memphis", populationServed: 870_000, notes: "Draws from the Memphis Sand Aquifer." },
      { name: "Knoxville Utilities Board", city: "Knoxville", populationServed: 280_000 },
    ],
    privateWellShare: "~15% on private wells, mostly rural east TN.",
    whoIsAtRisk:
      "Roane County residents downstream of Kingston coal-ash spill face long-term arsenic, mercury, and selenium exposure. Memphis residents have exceptional source water but pre-1986 lead in housing.",
    filterRecommendation:
      "For TTHMs and PFAS in east TN: NSF/ANSI 53 + P473 carbon. For Memphis lead: NSF/ANSI 53.",
  },
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    population: 30_500_000,
    utilityCount: 7_000,
    servedPopulation: 28_900_000,
    primarySourceMix: "~50% surface water, ~50% groundwater (varies by region)",
    topContaminants: ["arsenic", "tthm", "pfas", "chromium-6", "nitrate"],
    context:
      "Texas spans every U.S. water profile — Edwards Aquifer in central Texas, Rio Grande surface water in the west, Houston ship channel industrial corridor in the southeast. Natural arsenic is widespread in groundwater across the state.",
    flagshipStory:
      "Houston's 2017 Hurricane Harvey flooding overwhelmed dozens of Superfund sites, mixing contaminated soil and water across the metro.",
    majorCities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso"],
    regulator: {
      name: "Texas Commission on Environmental Quality (TCEQ) — Public Drinking Water",
      websiteUrl: "https://www.tceq.texas.gov/drinkingwater",
      complaintsUrl: "https://www.tceq.texas.gov/agency/decisions/complaints",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Among the most permissive state environmental regimes in the country.",
    timeline: [
      { year: "2017", event: "Hurricane Harvey floods 13 EPA Superfund sites in Houston metro; cross-contamination unprecedented." },
      { year: "2021", event: "Statewide power-grid failure leaves millions without safe tap water for days; thousands of boil-water advisories." },
      { year: "2023", event: "Texas-wide PFAS sampling under federal UCMR 5 identifies widespread detection." },
    ],
    notableUtilities: [
      { name: "Houston Public Works", city: "Houston", populationServed: 2_300_000 },
      { name: "San Antonio Water System", city: "San Antonio", populationServed: 1_900_000 },
      { name: "Dallas Water Utilities", city: "Dallas metro", populationServed: 2_600_000 },
      { name: "Austin Water", city: "Austin", populationServed: 1_000_000 },
      { name: "El Paso Water", city: "El Paso", populationServed: 700_000 },
    ],
    privateWellShare: "~14% on private wells, with significant rural West TX and Hill Country coverage gaps.",
    whoIsAtRisk:
      "Colonias residents along the Texas-Mexico border face among the worst infrastructure gaps in the U.S. Houston ship-channel-area residents face cumulative industrial exposure.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis is the most universal solution for Texas' diverse contaminant profile.",
  },
  {
    slug: "utah",
    name: "Utah",
    abbreviation: "UT",
    population: 3_420_000,
    utilityCount: 970,
    servedPopulation: 3_200_000,
    primarySourceMix: "~55% surface water, ~45% groundwater",
    topContaminants: ["arsenic", "tthm", "pfas", "chromium-6"],
    context:
      "Utah's Wasatch Front draws from snowmelt rivers and reservoirs. Natural arsenic in groundwater affects multiple smaller systems. Industrial PFAS contamination from Hill Air Force Base is a regional concern.",
    majorCities: ["Salt Lake City", "West Valley City", "Provo", "Orem", "Sandy"],
    regulator: {
      name: "Utah Division of Drinking Water",
      websiteUrl: "https://drinkingwater.utah.gov/",
      complaintsUrl: "https://drinkingwater.utah.gov/contact-us/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Great Salt Lake decline is an emerging regional water-quality concern.",
    timeline: [
      { year: "2018", event: "PFAS contamination identified at Hill Air Force Base — among the largest western U.S. military PFAS sites." },
      { year: "2023", event: "Great Salt Lake reaches historic low, raising dust-toxicity and source-water concerns." },
    ],
    notableUtilities: [
      { name: "Salt Lake City Department of Public Utilities", city: "Salt Lake City", populationServed: 360_000 },
      { name: "Jordan Valley Water Conservancy District", city: "Salt Lake County", populationServed: 800_000 },
    ],
    privateWellShare: "~7% on private wells.",
    whoIsAtRisk:
      "Davis County residents (Layton, Clearfield) face Hill AFB PFAS exposure. Rural well users face geologic arsenic.",
    filterRecommendation:
      "For PFAS: NSF/ANSI P473. For arsenic: NSF/ANSI 58 reverse osmosis.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbreviation: "VT",
    population: 650_000,
    utilityCount: 450,
    servedPopulation: 470_000,
    primarySourceMix: "~50% surface water, ~50% groundwater (high private well share)",
    topContaminants: ["pfas", "arsenic", "lead"],
    context:
      "Vermont's Bennington PFAS contamination from former Saint-Gobain operations remains under active remediation. Significant private-well exposure to natural arsenic across the state.",
    majorCities: ["Burlington", "South Burlington", "Rutland", "Montpelier"],
    regulator: {
      name: "Vermont Department of Environmental Conservation — Drinking Water and Groundwater Protection Division",
      websiteUrl: "https://dec.vermont.gov/water/drinking-water",
      complaintsUrl: "https://dec.vermont.gov/water/drinking-water/dws-contact-us",
    },
    regulatoryPosture:
      "Among the strictest state PFAS frameworks. Vermont MCL of 20 ng/L combined for five PFAS compounds (2020).",
    timeline: [
      { year: "2016", event: "Bennington PFOA contamination from Saint-Gobain identified; emergency filter distribution to hundreds of households." },
      { year: "2020", event: "Vermont sets state MCL of 20 ng/L combined for five PFAS compounds." },
    ],
    notableUtilities: [
      { name: "Champlain Water District", city: "Burlington metro", populationServed: 75_000 },
      { name: "Burlington Department of Public Works", city: "Burlington", populationServed: 45_000 },
    ],
    privateWellShare: "~35% on private wells — one of the highest in the U.S.",
    whoIsAtRisk:
      "Bennington and North Bennington households served by impacted wells face the most-documented PFAS exposure in the state.",
    filterRecommendation:
      "For PFAS: NSF/ANSI P473 or RO. State of Vermont provides POE filtration to confirmed impacted households.",
  },
  {
    slug: "virginia",
    name: "Virginia",
    abbreviation: "VA",
    population: 8_700_000,
    utilityCount: 1_290,
    servedPopulation: 8_100_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "chromium-6"],
    context:
      "Northern Virginia draws Potomac River water shared with DC; coastal systems face saltwater intrusion. Military-base PFAS contamination (Naval Air Station Oceana, Joint Base Langley-Eustis) is documented.",
    majorCities: ["Virginia Beach", "Norfolk", "Richmond", "Arlington", "Newport News"],
    regulator: {
      name: "Virginia Department of Health — Office of Drinking Water",
      websiteUrl: "https://www.vdh.virginia.gov/drinking-water/",
      complaintsUrl: "https://www.vdh.virginia.gov/contact-vdh/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Chesapeake Bay watershed-protection regime adds water-source-quality enforcement.",
    timeline: [
      { year: "2017", event: "PFAS contamination identified at multiple Virginia military bases under federal site investigation." },
      { year: "2023", event: "Virginia adopts statewide community-system PFAS sampling program." },
    ],
    notableUtilities: [
      { name: "Fairfax Water", city: "Northern Virginia", populationServed: 2_000_000 },
      { name: "Hampton Roads Sanitation District / Newport News Waterworks", city: "Hampton Roads", populationServed: 1_400_000 },
      { name: "Richmond Department of Public Utilities", city: "Richmond", populationServed: 230_000 },
    ],
    privateWellShare: "~18% on private wells, predominantly rural western VA.",
    whoIsAtRisk:
      "Hampton Roads military-base communities face PFAS exposure. Coastal residents face saltwater intrusion. Pre-1986 Richmond housing faces lead.",
    filterRecommendation:
      "For lead: NSF/ANSI 53. For PFAS in Hampton Roads: NSF/ANSI P473.",
  },
  {
    slug: "washington",
    name: "Washington",
    abbreviation: "WA",
    population: 7_800_000,
    utilityCount: 2_310,
    servedPopulation: 7_200_000,
    primarySourceMix: "~70% surface water (Cascade snowmelt), ~30% groundwater",
    topContaminants: ["lead", "pfas", "tthm", "arsenic"],
    context:
      "Seattle and Tacoma draw pristine Cascade snowmelt — among the highest-quality U.S. municipal source water. PFAS contamination from Joint Base Lewis-McChord affects multiple Pierce County systems. Hanford Site groundwater plumes are a generational issue.",
    majorCities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    regulator: {
      name: "Washington State Department of Health — Office of Drinking Water",
      websiteUrl: "https://doh.wa.gov/community-and-environment/drinking-water",
      complaintsUrl: "https://doh.wa.gov/about-us/contact-us",
    },
    regulatoryPosture:
      "Among the stricter states. Washington State Action Levels for five PFAS compounds (2022). Active Hanford radioactive-groundwater remediation.",
    timeline: [
      { year: "1989", event: "Hanford Federal Facility Agreement initiates massive radioactive-groundwater cleanup." },
      { year: "2017", event: "PFAS contamination identified at Joint Base Lewis-McChord." },
      { year: "2022", event: "Washington adopts State Action Levels for five PFAS compounds." },
    ],
    notableUtilities: [
      { name: "Seattle Public Utilities", city: "Seattle metro", populationServed: 1_500_000 },
      { name: "Tacoma Water", city: "Tacoma", populationServed: 320_000 },
      { name: "City of Spokane Water Department", city: "Spokane", populationServed: 220_000 },
    ],
    privateWellShare: "~17% on private wells, mostly rural eastern WA.",
    whoIsAtRisk:
      "Pierce County residents near Joint Base Lewis-McChord face the most-documented PFAS exposure. Tri-Cities residents face Hanford legacy contamination.",
    filterRecommendation:
      "For PFAS: NSF/ANSI P473 or RO. For Hanford-area concerns: certified reverse osmosis.",
  },
  {
    slug: "west-virginia",
    name: "West Virginia",
    abbreviation: "WV",
    population: 1_770_000,
    utilityCount: 380,
    servedPopulation: 1_500_000,
    primarySourceMix: "~75% surface water, ~25% groundwater",
    topContaminants: ["pfas", "tthm", "chromium-6", "lead"],
    context:
      "Parkersburg-area PFOA contamination from DuPont's Washington Works was the original U.S. PFAS public-health crisis, documented in The Devil We Know and Dark Waters. The 2014 Elk River chemical spill left 300,000 Charlestonians without safe tap water for over a week.",
    flagshipStory:
      "Parkersburg's DuPont PFOA contamination was the first publicly litigated PFAS catastrophe in U.S. history.",
    majorCities: ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
    regulator: {
      name: "West Virginia Department of Health and Human Resources — Office of Environmental Health Services",
      websiteUrl: "https://oeh.wvdhhr.org/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active Parkersburg PFAS Health Studies oversight.",
    timeline: [
      { year: "1998", event: "Robert Bilott files Parkersburg-area lawsuit against DuPont — the case that exposed PFAS publicly." },
      { year: "2014", event: "Elk River chemical spill: 10,000 gallons of MCHM leak; 300,000 Charlestonians without safe tap water for over a week." },
      { year: "2017", event: "DuPont and Chemours settle Parkersburg-area C8 personal injury cases for $670M." },
    ],
    notableUtilities: [
      { name: "West Virginia American Water", city: "Multi-region (incl. Charleston)", populationServed: 575_000 },
      { name: "City of Huntington Water Quality Board", city: "Huntington", populationServed: 75_000 },
    ],
    privateWellShare: "~25% on private wells, with significant mining-related contamination in coal regions.",
    whoIsAtRisk:
      "Mid-Ohio Valley residents (Parkersburg / Vienna / Lubeck) face the most-documented PFAS exposure in the U.S. Coal-region residents face heavy-metal exposure.",
    filterRecommendation:
      "For PFAS in Mid-Ohio Valley: NSF/ANSI P473 or RO. DuPont-funded POE filter systems available for confirmed impacted households.",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    abbreviation: "WI",
    population: 5_910_000,
    utilityCount: 600,
    servedPopulation: 5_500_000,
    primarySourceMix: "~50% surface water (Lake Michigan + Lake Superior), ~50% groundwater",
    topContaminants: ["lead", "pfas", "nitrate", "tthm"],
    context:
      "Milwaukee and the southeast draw Lake Michigan water. The 1993 Milwaukee Cryptosporidium outbreak — affecting 400,000 people — remains the largest U.S. waterborne disease outbreak in modern history. Madison and Marinette face active PFAS contamination concerns.",
    flagshipStory:
      "Milwaukee's 1993 Cryptosporidium outbreak remains the largest documented waterborne disease event in U.S. history.",
    majorCities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
    regulator: {
      name: "Wisconsin Department of Natural Resources — Drinking Water and Groundwater Program",
      websiteUrl: "https://dnr.wisconsin.gov/topic/DrinkingWater",
      complaintsUrl: "https://dnr.wisconsin.gov/about/contact",
    },
    regulatoryPosture:
      "Federal SDWA primacy. State PFAS standards adopted 2022 (PFOA 70 ng/L, PFOS 70 ng/L individually). Active Marinette / Tyco firefighting-foam remediation.",
    timeline: [
      { year: "1993", event: "Milwaukee Cryptosporidium outbreak — 400,000 sick, 50+ deaths — largest U.S. waterborne disease event in modern history." },
      { year: "2017", event: "Marinette PFAS contamination from Tyco firefighting foam identified." },
      { year: "2022", event: "Wisconsin sets state MCLs for PFOA and PFOS." },
    ],
    notableUtilities: [
      { name: "Milwaukee Water Works", city: "Milwaukee", populationServed: 870_000 },
      { name: "Madison Water Utility", city: "Madison", populationServed: 270_000 },
      { name: "Green Bay Water Utility", city: "Green Bay", populationServed: 200_000 },
    ],
    leadServiceLines: {
      approxCount: 175_000,
      notes: "Milwaukee alone has ~70,000 lead service lines.",
    },
    privateWellShare: "~25% on private wells. Northeastern WI agricultural region (Kewaunee County) has the most-documented nitrate exposure.",
    whoIsAtRisk:
      "Milwaukee residents in pre-1986 housing face significant lead exposure. Marinette / Peshtigo residents face PFAS. Kewaunee County dairy-farm region faces nitrate.",
    filterRecommendation:
      "For lead: NSF/ANSI 53. For Marinette PFAS: state of Wisconsin provides bottled water and POE filtration to confirmed impacted households.",
  },
  {
    slug: "wyoming",
    name: "Wyoming",
    abbreviation: "WY",
    population: 580_000,
    utilityCount: 370,
    servedPopulation: 510_000,
    primarySourceMix: "~50% surface water, ~50% groundwater",
    topContaminants: ["arsenic", "tthm", "nitrate"],
    context:
      "Wyoming's small populations and geologically high natural arsenic produce localized exposure across many systems. Oil-and-gas wastewater incidents add risk in extraction regions.",
    majorCities: ["Cheyenne", "Casper", "Laramie", "Gillette"],
    regulator: {
      name: "Wyoming Department of Environmental Quality — Water Quality Division",
      websiteUrl: "https://deq.wyoming.gov/water-quality/",
      complaintsUrl: "https://deq.wyoming.gov/about/contact-us/",
    },
    regulatoryPosture:
      "Federal SDWA primacy. No state MCLs stricter than federal. Active oil-and-gas wastewater oversight in Powder River Basin.",
    timeline: [
      { year: "2011", event: "EPA links Pavillion-area groundwater contamination to nearby fracking — first federal acknowledgment." },
      { year: "2016", event: "Federal Pavillion fracking-contamination investigation handed back to state under industry pressure." },
    ],
    notableUtilities: [
      { name: "Cheyenne Board of Public Utilities", city: "Cheyenne", populationServed: 65_000 },
      { name: "Casper Public Utilities", city: "Casper", populationServed: 60_000 },
    ],
    privateWellShare: "~25% on private wells. Pavillion-area wells have documented fracking-related contamination.",
    whoIsAtRisk:
      "Pavillion-area residents face the most-documented fracking-related water contamination in the U.S. Rural well users statewide face geologic arsenic.",
    filterRecommendation:
      "NSF/ANSI 58 reverse osmosis for arsenic, nitrate, and most VOC contamination.",
  },
];

export function getStateBySlug(slug: string): StateProfile | null {
  return STATES.find((s) => s.slug === slug) ?? null;
}

export function getStateByAbbreviation(abbr: string): StateProfile | null {
  return STATES.find((s) => s.abbreviation === abbr.toUpperCase()) ?? null;
}
