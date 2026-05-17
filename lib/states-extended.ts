/**
 * Extended state profiles — the deep-dive data. Keeps lib/states.ts
 * focused on the structured profile fields while this file carries the
 * editorial depth: physical source watersheds, schools lead testing
 * status, climate threats, industry contamination profile, the
 * questions a resident should ask their utility, and recent state-level
 * legislation.
 *
 * All entries are curated from EPA SDWIS, state primacy-agency reports,
 * USGS water-resource publications, NCSL state legislative tracking,
 * and reputable news coverage. Verify before quotation.
 */

export interface SourceWatershed {
  name: string;
  type: "river" | "aquifer" | "lake" | "reservoir" | "snowmelt";
  notes?: string;
}

export interface SchoolsLeadTesting {
  status: "mandated" | "voluntary" | "limited" | "none";
  detail: string;
}

export interface RecentLegislation {
  year: string;
  title: string;
}

export interface StateExtended {
  sourceWatersheds?: SourceWatershed[];
  schoolsLeadTesting?: SchoolsLeadTesting;
  climateThreats?: string;
  industryProfile?: string;
  whatToAsk?: string[];
  recentLegislation?: RecentLegislation[];
}

export const STATES_EXTENDED: Record<string, StateExtended> = {
  alabama: {
    sourceWatersheds: [
      { name: "Mobile-Tombigbee River Basin", type: "river", notes: "Coastal South Alabama's primary surface supply." },
      { name: "Tennessee River", type: "river", notes: "North Alabama and TVA-served communities." },
      { name: "Coosa-Alabama River", type: "river", notes: "Central state including Birmingham and Montgomery." },
      { name: "Chickasaw Aquifer", type: "aquifer", notes: "Eutaw and Selma chalk groundwater for west-central AL." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Alabama Department of Public Health provides voluntary school lead-testing guidance, but participation is not mandated. Fewer than 20% of districts have published full results.",
    },
    climateThreats: "Coastal Alabama faces accelerating saltwater intrusion threatening Mobile-area aquifers. Increased intensity of Gulf hurricanes disrupts surface-water treatment and can overload combined sewer systems. North Alabama drought cycles strain reservoir storage on the Coosa system.",
    industryProfile: "Decatur's 3M and Daikin plants drove decades of PFAS contamination in the Tennessee River corridor. Birmingham's steel and coke legacy left heavy-metal-contaminated groundwater. Statewide agricultural runoff (poultry and row crops) drives nitrate exposure in the Coastal Plain.",
    whatToAsk: [
      "Has my utility completed sampling for the six federally regulated PFAS compounds yet?",
      "What is the most recent TTHM running annual average for my system?",
      "Does my utility participate in voluntary lead-in-water sampling at schools and daycares?",
      "Where do I file a complaint if I see violations not appearing in my Consumer Confidence Report?",
    ],
    recentLegislation: [
      { year: "2023", title: "SB 137 — Lead Service Line Inventory Funding (passed; provides match to federal IIJA funds)." },
      { year: "2022", title: "Attempted PFAS drinking water standard legislation did not pass." },
    ],
  },

  alaska: {
    sourceWatersheds: [
      { name: "Eklutna Lake / Ship Creek", type: "lake", notes: "Anchorage municipal supply." },
      { name: "Chena River + Tanana River", type: "river", notes: "Fairbanks region." },
      { name: "Coastal aquifers", type: "aquifer", notes: "Most rural village systems." },
      { name: "Snowmelt drainages", type: "snowmelt", notes: "Southeast Alaska coastal communities including Juneau." },
    ],
    schoolsLeadTesting: {
      status: "limited",
      detail: "Alaska has no statewide mandate. Anchorage and Fairbanks school districts have voluntarily tested. Remote village schools largely untested due to logistical barriers.",
    },
    climateThreats: "Permafrost thaw is destabilizing pipe networks across Interior Alaska. Salmon-stream flow changes affect rural surface-water intakes. Coastal village erosion is forcing relocation of multiple Norton Sound communities (Newtok, Kivalina, Shishmaref).",
    industryProfile: "Military firefighting foam (Fairbanks International, Eielson AFB, Joint Base Elmendorf-Richardson) is the dominant PFAS source. Legacy mining contamination affects Fortymile and Yukon-Kuskokwim watersheds. Oil-and-gas infrastructure on the North Slope adds localized risk.",
    whatToAsk: [
      "Has my village or city system been tested for arsenic above the 10 ppb federal MCL?",
      "Does my utility have an active PFAS sampling agreement with the Alaska DEC?",
      "Are there any active boil-water advisories for my system?",
      "When was the last full sanitary survey of my treatment plant?",
    ],
    recentLegislation: [
      { year: "2022", title: "HB 196 — Statewide PFAS firefighting foam restrictions for non-emergency use." },
    ],
  },

  arizona: {
    sourceWatersheds: [
      { name: "Colorado River (CAP)", type: "river", notes: "Lake Mead/Powell water delivered via the Central Arizona Project." },
      { name: "Salt River Project reservoirs", type: "reservoir", notes: "Roosevelt, Apache, Saguaro for Phoenix metro." },
      { name: "Verde River", type: "river", notes: "Joins Salt River for Phoenix metro supply." },
      { name: "Basin and Range Aquifers", type: "aquifer", notes: "Deep desert groundwater across rural AZ." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Arizona Department of Environmental Quality provides voluntary screening; participation has expanded since 2019 but remains under 50% of districts.",
    },
    climateThreats: "Tier 2A Colorado River shortage declared 2023 — Arizona faces the largest CAP cutbacks. Aquifer depletion outpaces recharge in most rural basins. Extreme-heat-driven domestic demand stresses delivery infrastructure.",
    industryProfile: "Phoenix industrial corridor produced documented hexavalent chromium plumes; mining (copper, uranium) drives heavy-metal exposure across central and southeast AZ. Naturally occurring arsenic from desert geology contaminates groundwater statewide.",
    whatToAsk: [
      "Is my utility's arsenic running annual average below the 10 ppb federal MCL?",
      "Has my utility been impacted by the Colorado River Tier 2A shortage declaration?",
      "What is my utility doing about hexavalent chromium (Cr-6) — California regulates it; the EPA does not yet.",
      "Are private wells in my area tested for arsenic, and at what frequency?",
    ],
    recentLegislation: [
      { year: "2023", title: "Arizona Drought Contingency Plan extended; Tier 2A shortage triggers begin." },
      { year: "2021", title: "Groundwater management modernization bills considered; comprehensive reform did not pass." },
    ],
  },

  arkansas: {
    sourceWatersheds: [
      { name: "Beaver Lake (White River)", type: "lake", notes: "Northwest AR including Bentonville, Fayetteville, Springdale." },
      { name: "Lake Maumelle + Lake Winona", type: "lake", notes: "Central Arkansas Water supply for Little Rock." },
      { name: "Arkansas River", type: "river", notes: "Fort Smith and river corridor." },
      { name: "Mississippi River Alluvial Aquifer", type: "aquifer", notes: "Delta agriculture." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Arkansas Department of Health offers voluntary technical assistance but no mandate.",
    },
    climateThreats: "Mississippi Alluvial aquifer depletion threatens delta agriculture and downstream surface flow. More intense rainfall events overwhelm treatment plants. Lake-Maumelle algal bloom risk increases with summer heat.",
    industryProfile: "Tyson and other poultry operations drive Beaver Lake nutrient loading. Cotton and rice agriculture in the delta drives nitrate exposure. Limited heavy industry compared to neighboring states.",
    whatToAsk: [
      "Has my utility tested for the six federally regulated PFAS compounds?",
      "Has Beaver Water District or my supplier reported any harmful algal bloom advisories?",
      "What is my utility's TTHM running annual average?",
    ],
  },

  california: {
    sourceWatersheds: [
      { name: "Sacramento-San Joaquin Delta", type: "river", notes: "State Water Project + Central Valley Project hub serving 25M+ Californians." },
      { name: "Hetch Hetchy Reservoir", type: "reservoir", notes: "SF Bay Area pristine Sierra snowmelt." },
      { name: "Colorado River", type: "river", notes: "Southern CA via Metropolitan Water District." },
      { name: "Owens Valley Aqueduct", type: "river", notes: "LADWP system since 1913." },
      { name: "Central Valley Aquifer", type: "aquifer", notes: "Heavily depleted from decades of agricultural pumping." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "AB 746 (2017) requires every K-12 school in California to test drinking water for lead. Schools with results above 5 ppb must take corrective action. Results are publicly available.",
    },
    climateThreats: "Multi-year megadrought reshapes Sierra snowpack and Colorado River allocations. Wildfire-burn-scar runoff contaminates surface intakes (Camp Fire / Paradise documented). Sea-level rise threatens Delta levees and Bay Area shallow aquifers.",
    industryProfile: "Central Valley agriculture (nitrate, atrazine) is the dominant rural exposure source. Silicon Valley legacy semiconductor solvents drive multiple Superfund sites. Aerospace and military bases (especially Camp Pendleton, Edwards AFB, Travis AFB) are major PFAS sources.",
    whatToAsk: [
      "Is my system on California's SAFER Drinking Water Program failing-systems list?",
      "What is my utility's chromium-6 (Cr-6) average? California's MCL is 10 ppb.",
      "Are my school's most recent lead test results published on the SWRCB site?",
      "Does my utility have an Urban Water Management Plan accounting for State Water Project cutbacks?",
      "Are there any Public Health Goals (PHGs) my utility is exceeding even if it's not violating the federal MCL?",
    ],
    recentLegislation: [
      { year: "2024", title: "SB 1115 — Updated state PFAS response framework aligning with federal rule." },
      { year: "2023", title: "AB 685 implementation — Human Right to Water progress reporting requirements expanded." },
      { year: "2022", title: "SB 222 — Lead Service Line Replacement bond program established." },
    ],
  },

  colorado: {
    sourceWatersheds: [
      { name: "Colorado River (West Slope)", type: "river", notes: "Major raw-water source for Front Range via transbasin diversions." },
      { name: "South Platte River", type: "river", notes: "Denver metro." },
      { name: "Arkansas River", type: "river", notes: "Colorado Springs / Pueblo." },
      { name: "Cache la Poudre", type: "river", notes: "Fort Collins / Greeley." },
      { name: "Denver Basin Aquifer System", type: "aquifer", notes: "Front Range groundwater (heavily managed)." },
    ],
    schoolsLeadTesting: {
      status: "limited",
      detail: "CDPHE provides voluntary technical and lab assistance. No statewide mandate. Several Front Range districts have voluntarily tested.",
    },
    climateThreats: "Snowpack decline reshapes Front Range supply; Colorado River basin shortage cascades downstream. Wildfire burn-scar sediment events damaged Cameron Peak / East Troublesome watersheds. Earlier spring runoff stresses reservoir management.",
    industryProfile: "Peterson Space Force Base and other military bases drove PFAS contamination in the El Paso County corridor (Fountain, Widefield, Security). Oil and gas operations on the Front Range produce produced-water and air-quality concerns. Legacy mining (Leadville, Idaho Springs) drives ongoing heavy-metal Superfund work.",
    whatToAsk: [
      "Does my system source any water through the Colorado-Big Thompson or Fryingpan-Arkansas projects?",
      "If I live in El Paso County, is my system part of the PFAS-contaminated zone?",
      "What is my utility's lead and copper rule compliance status?",
      "Are there any active oil/gas pad concerns near my source water?",
    ],
    recentLegislation: [
      { year: "2022", title: "HB22-1345 — Restrictions on PFAS in consumer products (firefighting foam, cosmetics, food packaging)." },
      { year: "2020", title: "Colorado PFAS Action Plan launched." },
    ],
  },

  connecticut: {
    sourceWatersheds: [
      { name: "Connecticut River", type: "river", notes: "Hartford area." },
      { name: "Hemlock Reservoir System", type: "reservoir", notes: "Aquarion Bridgeport/Fairfield County supply." },
      { name: "Saugatuck Reservoir", type: "reservoir", notes: "Coastal Fairfield County." },
      { name: "Coastal Plain Aquifer", type: "aquifer", notes: "Eastern CT groundwater systems." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "CT Department of Public Health provides voluntary technical and lab support; many districts have voluntarily tested post-Flint.",
    },
    climateThreats: "Coastal sea-level rise threatens municipal wellfields in coastal Fairfield and New Haven counties. More frequent intense rainfall increases combined-sewer-overflow events near intakes. Storm-driven Long Island Sound salinity increases.",
    industryProfile: "Legacy manufacturing in Waterbury, New Britain, and Bridgeport drove industrial chlorinated solvents (TCE) contamination in groundwater. Bradley Airport firefighting foam (2019) introduced major PFAS contamination in Windsor Locks corridor. Naval Submarine Base New London is a documented PFAS site.",
    whatToAsk: [
      "Is my utility downstream of the 2019 Bradley Airport PFAS spill?",
      "When will my utility complete its mandated lead service line inventory?",
      "Has my system had any health-based violations in the past three years?",
      "Are private wells in my town routinely tested for PFAS?",
    ],
    recentLegislation: [
      { year: "2021", title: "HB 6502 — Lead Service Line Inventory mandate with 2027 deadline." },
      { year: "2021", title: "SB 837 — PFAS consumer product restrictions (firefighting foam, food packaging)." },
    ],
  },

  delaware: {
    sourceWatersheds: [
      { name: "Brandywine + Christina Rivers", type: "river", notes: "Wilmington area." },
      { name: "Cohansey-Mount Laurel Aquifer", type: "aquifer", notes: "Sussex County agricultural region." },
      { name: "Columbia Aquifer", type: "aquifer", notes: "Coastal Delaware." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Delaware Division of Public Health provides voluntary screening assistance.",
    },
    climateThreats: "Saltwater intrusion threatens Sussex County aquifers — among the most-vulnerable in the mid-Atlantic. Sea-level rise on the Delaware Bay coastline displaces shallow wellfields. Flooding events increase agricultural runoff into surface intakes.",
    industryProfile: "Dover Air Force Base PFAS contamination is the most-documented military site in DE. DuPont's legacy Chambers Works (across the Delaware River in NJ) affects Delaware River shoreline systems. Poultry operations in Sussex County drive nitrate exposure.",
    whatToAsk: [
      "Is my well at risk of saltwater intrusion if I'm in Sussex County?",
      "Has Dover-area PFAS sampling reached my neighborhood?",
      "What is my utility's nitrate running average?",
    ],
  },

  florida: {
    sourceWatersheds: [
      { name: "Floridan Aquifer System", type: "aquifer", notes: "One of the most productive aquifers in the world; supplies most of FL." },
      { name: "Biscayne Aquifer", type: "aquifer", notes: "Sole-source aquifer for Miami-Dade and Broward." },
      { name: "Hillsborough River", type: "river", notes: "Tampa surface supply." },
      { name: "C-43 Reservoir + Caloosahatchee", type: "river", notes: "Southwest FL." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Florida DOH provides voluntary screening. No mandate. Some district-level voluntary programs in Miami-Dade, Orange County.",
    },
    climateThreats: "Sea-level rise drives accelerating saltwater intrusion into Biscayne and Floridan aquifers along both coasts. Hurricane intensity (Ian, Idalia) overwhelms treatment plants and stormwater systems. Algal blooms (red tide, Lake Okeechobee blue-green) affect surface intakes in Southwest FL.",
    industryProfile: "Military firefighting foam (Tyndall, Eglin, MacDill, Patrick) created widespread PFAS contamination. Phosphate mining (Bone Valley) drives radium and gypsum contamination in central FL groundwater. Agricultural sugar runoff into Lake Okeechobee drives downstream algal blooms.",
    whatToAsk: [
      "Has saltwater intrusion affected my municipal well field?",
      "Does my system have a Class V injection well permit (common in FL)?",
      "Has my utility tested for PFAS near any of the major military bases?",
      "What is my system's radium 226/228 running average?",
    ],
    recentLegislation: [
      { year: "2024", title: "FL DEP PFAS Dynamic Plan rulemaking actively underway." },
      { year: "2022", title: "Coastal aquifer protection bill considered, did not pass." },
    ],
  },

  georgia: {
    sourceWatersheds: [
      { name: "Chattahoochee River", type: "river", notes: "Atlanta metro primary supply." },
      { name: "Lake Lanier", type: "reservoir", notes: "Storage reservoir on the Chattahoochee for metro Atlanta." },
      { name: "Floridan Aquifer", type: "aquifer", notes: "Coastal GA including Savannah, Brunswick." },
      { name: "Conasauga River", type: "river", notes: "Northwest GA carpet corridor — Rome, Dalton." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Georgia EPD offers voluntary lead-and-copper screening for schools. Atlanta Public Schools published district-wide testing 2017-2019.",
    },
    climateThreats: "Chattahoochee allocation disputes with Alabama and Florida intensify under drought. Coastal Floridan aquifer saltwater intrusion accelerates near Brunswick and Savannah. Hurricane-driven flooding affects coastal treatment plants.",
    industryProfile: "Northwest Georgia carpet and textile manufacturing in Dalton, Rome, and Calhoun is the dominant PFAS source — among the worst-documented in the Southeast. Coal-ash impoundments at Plant Scherer and other Georgia Power sites raise groundwater concerns.",
    whatToAsk: [
      "If I'm in NW Georgia, has Dalton-corridor PFAS reached my system?",
      "Does my Atlanta-area utility draw from the Chattahoochee or from a tributary?",
      "What is my system's coal-ash impoundment proximity score?",
    ],
    recentLegislation: [
      { year: "2022", title: "Carpet industry PFAS settlement triggers state-level water testing expansion." },
    ],
  },

  hawaii: {
    sourceWatersheds: [
      { name: "Oahu Basal Aquifer", type: "aquifer", notes: "Honolulu municipal supply." },
      { name: "Hilo Aquifer", type: "aquifer", notes: "Big Island east side." },
      { name: "Iao Aquifer", type: "aquifer", notes: "Maui central." },
      { name: "Mountain Spring Tunnels", type: "snowmelt", notes: "Windward Oahu high-rainfall recharge zones." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Hawaii DOH conducted school testing post-Red Hill. Findings published 2022-2023.",
    },
    climateThreats: "Sea-level rise threatens coastal Honolulu aquifer salinity. Stream flow changes affect Maui and Kauai municipal intakes. Coral reef loss is an indirect water-quality threat through erosion and sedimentation.",
    industryProfile: "Red Hill underground fuel facility (Navy) caused the 2021 jet-fuel contamination of Oahu's water — the dominant active concern. Legacy agricultural pesticide contamination from sugar cane and pineapple cultivation persists in groundwater across Oahu and Maui.",
    whatToAsk: [
      "Is my address served by Navy Water (Joint Base Pearl Harbor-Hickam zone)?",
      "Has Honolulu Board of Water Supply confirmed my well is outside the Red Hill plume?",
      "What pesticide residues has my utility tested for?",
    ],
    recentLegislation: [
      { year: "2024", title: "Long-term Red Hill remediation oversight legislation continues to evolve." },
      { year: "2022", title: "Defense Department ordered Red Hill closure; HI legislative oversight expanded." },
    ],
  },

  idaho: {
    sourceWatersheds: [
      { name: "Snake River Plain Aquifer", type: "aquifer", notes: "Dominant groundwater source for southern ID." },
      { name: "Boise River", type: "river", notes: "Boise metro." },
      { name: "Snake River", type: "river", notes: "Magic Valley and Treasure Valley." },
      { name: "Spokane Valley-Rathdrum Prairie Aquifer", type: "aquifer", notes: "Sole-source aquifer for Coeur d'Alene area (shared with WA)." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Idaho DEQ offers voluntary technical assistance. Boise School District has conducted voluntary testing.",
    },
    climateThreats: "Snake River Plain Aquifer drawdown accelerating under irrigation demand. Earlier snowmelt reduces Boise River summer supply. Wildfire burn-scar runoff threatens forest-watershed intakes in central ID.",
    industryProfile: "Agricultural nitrate (dairy and sugar beet operations) drives Magic Valley exposure. Idaho National Laboratory legacy radioactive groundwater plumes remain under federal monitoring. Coeur d'Alene basin mining contamination is among the largest Superfund sites in the U.S.",
    whatToAsk: [
      "If I'm in northern ID, is my well in the Coeur d'Alene mining-contamination zone?",
      "What is my Magic Valley utility's nitrate running annual average?",
      "Has my system been impacted by Snake River drought-driven supply cuts?",
    ],
  },

  illinois: {
    sourceWatersheds: [
      { name: "Lake Michigan", type: "lake", notes: "Chicago and most NE Illinois — among the best municipal source water in the U.S." },
      { name: "Mississippi River", type: "river", notes: "Quad Cities, downstate." },
      { name: "Cambrian-Ordovician Aquifer", type: "aquifer", notes: "Far western IL, NW Chicago suburbs." },
      { name: "Mahomet Aquifer", type: "aquifer", notes: "Central IL sole-source aquifer." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "PA 99-0922 (2017) requires all IL schools serving pre-K through 5 to test for lead. Results publicly available via the IL State Board of Education.",
    },
    climateThreats: "Great Lakes warming drives toxic algal blooms in southern Lake Michigan and Mississippi River. Combined sewer overflow events from intense rainfall affect Chicago intakes. Mahomet Aquifer drawdown is accelerating under industrial and agricultural demand.",
    industryProfile: "Pre-1986 Chicago and downstate housing accounts for ~1.05 million lead service lines statewide — the largest count in the U.S. Coal-ash impoundments at multiple Illinois Power sites threaten groundwater. East St. Louis legacy industrial contamination persists.",
    whatToAsk: [
      "When is my home scheduled for lead service line replacement under the 2042 mandate?",
      "Has my school district published its PA 99-0922 lead test results?",
      "Does my utility draw from Lake Michigan or a downstate source?",
      "Has my system had any harmful algal bloom advisories?",
    ],
    recentLegislation: [
      { year: "2024", title: "Federal LCRI accelerates IL replacement timeline; state continues with 2042 statutory deadline." },
      { year: "2021", title: "SB 119 — Lead Service Line Replacement Act mandates full replacement by 2042 (most aggressive in U.S.)." },
      { year: "2017", title: "PA 99-0922 — School Lead Testing mandate." },
    ],
  },

  indiana: {
    sourceWatersheds: [
      { name: "White River", type: "river", notes: "Indianapolis area." },
      { name: "Ohio River", type: "river", notes: "Evansville, southern IN." },
      { name: "St. Joseph River", type: "river", notes: "South Bend / Northern IN." },
      { name: "Teays Valley Aquifer System", type: "aquifer", notes: "Buried bedrock-valley aquifer across central IN." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "IDEM provides voluntary technical assistance. Indianapolis Public Schools conducted voluntary testing 2018-2020.",
    },
    climateThreats: "Ohio River algal bloom risk increases with summer warming. Tile-drained agricultural runoff intensifies in extreme rainfall events. Central Indiana aquifer recharge declines under shifting precipitation patterns.",
    industryProfile: "Lake County's industrial corridor (East Chicago, Gary, Hammond) is among the most contaminated industrial-residential overlap zones in the U.S. — heavy metals, PCBs, and lead exposure. Steel manufacturing legacy in northwest IN drives chromium and PFAS contamination.",
    whatToAsk: [
      "If I'm in Lake County, has my utility been part of the East Chicago / West Calumet remediation oversight?",
      "What is my Indianapolis-area utility's TTHM running annual average?",
      "Has my school district published lead testing results?",
    ],
  },

  iowa: {
    sourceWatersheds: [
      { name: "Des Moines River", type: "river", notes: "Des Moines metro." },
      { name: "Iowa + Cedar Rivers", type: "river", notes: "Cedar Rapids." },
      { name: "Jordan Aquifer System", type: "aquifer", notes: "Eastern IA bedrock aquifer." },
      { name: "Mississippi River", type: "river", notes: "Quad Cities." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Iowa DNR provides voluntary screening. Several urban districts have voluntarily tested.",
    },
    climateThreats: "Intensifying spring rainfall events overwhelm nitrate-removal treatment capacity (Des Moines documented). More-frequent extreme weather destabilizes well-water quality on private wells. Karst regions face increasing bacterial contamination risk.",
    industryProfile: "Iowa's corn-soy agriculture is the dominant U.S. nitrate-exposure driver. Manure-spread operations (dairy and hog confinement) drive bacterial and nitrate contamination in NE Iowa karst zones. Limited heavy industry compared to neighboring states.",
    whatToAsk: [
      "What is my system's nitrate running annual average?",
      "Does my utility have nitrate-removal treatment capacity, and what is its threshold trigger?",
      "If I'm in NE Iowa karst country, when was my private well last tested for bacteria?",
    ],
  },

  kansas: {
    sourceWatersheds: [
      { name: "Missouri River + Kansas River", type: "river", notes: "Kansas City metro." },
      { name: "Ogallala Aquifer", type: "aquifer", notes: "Western Kansas — depleting rapidly." },
      { name: "Equus Beds Aquifer", type: "aquifer", notes: "Wichita supply." },
      { name: "Cheney Reservoir", type: "reservoir", notes: "Wichita raw-water source." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "KDHE provides screening support; participation is uneven across districts.",
    },
    climateThreats: "Ogallala Aquifer depletion is the dominant long-term threat — western KS irrigation is rapidly outpacing recharge. Intensifying drought-flood cycles destabilize surface storage. Wildfire risk on the Flint Hills affects watershed quality.",
    industryProfile: "Western KS agriculture (corn, sorghum, cattle) drives nitrate exposure. Refining and petrochemical operations near Wichita and Coffeyville contribute groundwater contamination. Limited heavy mining presence.",
    whatToAsk: [
      "If I'm in western KS, what is my system's Ogallala drawdown rate?",
      "What is my utility's nitrate running annual average?",
      "Has my system reported any health-based violations in the past three years?",
    ],
  },

  kentucky: {
    sourceWatersheds: [
      { name: "Ohio River", type: "river", notes: "Louisville, Northern KY — primary supply." },
      { name: "Kentucky River", type: "river", notes: "Lexington metro." },
      { name: "Mississippian Limestone Aquifer", type: "aquifer", notes: "South-central KY karst." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Kentucky Division of Water provides voluntary screening assistance.",
    },
    climateThreats: "Ohio River algal bloom risk increases with summer warming. Karst region groundwater is increasingly vulnerable to contamination in extreme rainfall. Coalfield Appalachian floods damage Eastern KY treatment plants.",
    industryProfile: "Eastern KY coal mining drives selenium, sulfate, and heavy-metal contamination. Louisville Air National Guard PFAS contamination is documented. Industrial Ohio River corridor adds chlorinated solvent risks.",
    whatToAsk: [
      "If I'm in eastern KY coal country, has my well been tested for selenium and sulfate?",
      "What is my system's PFAS testing status?",
      "Are there any Ohio River intake advisories my utility is operating under?",
    ],
  },

  louisiana: {
    sourceWatersheds: [
      { name: "Mississippi River", type: "river", notes: "New Orleans, Baton Rouge — downstream of every major U.S. industrial corridor." },
      { name: "Sparta Aquifer", type: "aquifer", notes: "Northern LA." },
      { name: "Chicot Aquifer", type: "aquifer", notes: "Southwest LA." },
      { name: "Calcasieu River", type: "river", notes: "Lake Charles area." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Louisiana Department of Health provides voluntary technical assistance.",
    },
    climateThreats: "Sea-level rise + sinking land = some of the most-vulnerable coastal water infrastructure in the U.S. Hurricane intensity (Ida, Laura) regularly disables treatment plants. Saltwater intrusion up the Mississippi River reached New Orleans in 2023.",
    industryProfile: "Cancer Alley between Baton Rouge and New Orleans hosts 150+ petrochemical and refinery facilities — the highest cumulative-exposure corridor in the U.S. Offshore oil-and-gas brine discharge affects coastal groundwater. Chlor-alkali operations in Lake Charles drive mercury concerns.",
    whatToAsk: [
      "If I'm in Cancer Alley, what's my utility's full chemical-by-chemical contaminant report?",
      "Has my system experienced saltwater intrusion advisories?",
      "How does my utility respond to refinery upsets near my intake?",
    ],
    recentLegislation: [
      { year: "2023", title: "Cancer Alley federal civil rights investigation (EPA Title VI) reaches major settlement milestone." },
    ],
  },

  maine: {
    sourceWatersheds: [
      { name: "Sebago Lake", type: "lake", notes: "Portland Water District — among the best municipal source water in the U.S." },
      { name: "Penobscot River", type: "river", notes: "Bangor area." },
      { name: "Glaciofluvial Sand and Gravel Aquifers", type: "aquifer", notes: "Common groundwater source for rural ME." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "Maine LD 153 (2021) requires every K-12 school and licensed childcare to test for lead. Results posted publicly on Maine CDC site.",
    },
    climateThreats: "Coastal aquifer salinization affects southern Maine. Increasing intense rainfall events overwhelm small-system treatment. Forest pest die-offs reshape forested watershed hydrology.",
    industryProfile: "Statewide biosolids land application (historical) drove the country's most-documented agricultural PFAS contamination. Paper mill legacy chlorinated organics in Penobscot and Androscoggin basins. Brunswick Naval Air Station PFAS plume.",
    whatToAsk: [
      "If I'm on a private well, has it been tested for PFAS, arsenic, and uranium?",
      "Has my school posted recent LD 153 lead testing results?",
      "Has my farm or land received biosolids application historically (pre-2022 ban)?",
    ],
    recentLegislation: [
      { year: "2023", title: "LD 1503 — PFAS in consumer products statewide ban (most aggressive in U.S.)." },
      { year: "2022", title: "LD 1911 — Biosolids land application ban." },
      { year: "2021", title: "LD 153 — School Lead Testing mandate." },
      { year: "2021", title: "LD 129 — PFAS MCLs set at 20 ng/L combined for six compounds." },
    ],
  },

  maryland: {
    sourceWatersheds: [
      { name: "Patuxent + Patapsco Rivers", type: "river", notes: "Baltimore metro." },
      { name: "Potomac River", type: "river", notes: "DC + Montgomery / Prince George's." },
      { name: "Coastal Plain Aquifer System", type: "aquifer", notes: "Eastern Shore." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "Maryland HB 270 (2017) requires lead testing in all public schools. Results published on the MD State Department of Education site.",
    },
    climateThreats: "Chesapeake Bay sea-level rise threatens Eastern Shore wellfields. Increasing intense rainfall overwhelms Baltimore combined sewer system, affecting Patapsco intake quality. Higher summer temperatures increase Chesapeake harmful algal blooms.",
    industryProfile: "Joint Base Andrews and Patuxent Naval Air Station PFAS contamination documented. Baltimore industrial legacy drives chromium and chlorinated-solvent contamination. Poultry CAFO operations on Eastern Shore drive nitrate exposure.",
    whatToAsk: [
      "Has my school posted current HB 270 lead test results?",
      "Does my Eastern Shore well face saltwater intrusion risk?",
      "Has my Prince George's County system been impacted by Joint Base Andrews PFAS?",
    ],
    recentLegislation: [
      { year: "2022", title: "MD PFAS Restriction Act — bans PFAS in firefighting foam, food packaging, cosmetics." },
    ],
  },

  massachusetts: {
    sourceWatersheds: [
      { name: "Quabbin Reservoir + Wachusett Reservoir", type: "reservoir", notes: "MWRA system — among the best municipal source water in the U.S." },
      { name: "Connecticut River", type: "river", notes: "Western MA cities." },
      { name: "Plymouth-Carver Aquifer", type: "aquifer", notes: "Cape Cod / southeastern MA." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "MA Department of Environmental Protection runs Assistance Program for Lead in School Drinking Water since 2016 — voluntary participation but with mandatory reporting once tested. Most public schools have tested.",
    },
    climateThreats: "Cape Cod sole-source aquifer faces saltwater intrusion from sea-level rise. Coastal storm intensity affects southeastern MA treatment plants. Increasing harmful algal bloom risk in Connecticut River.",
    industryProfile: "Joint Base Cape Cod PFAS plume affects multiple Cape Cod communities. Massachusetts Military Reservation has decades of groundwater plume monitoring. Legacy manufacturing in Lowell, Lawrence, Springfield drove industrial-solvent contamination.",
    whatToAsk: [
      "If I'm on Cape Cod, is my well in the Joint Base Cape Cod PFAS plume?",
      "Has my MWRA-served community received its annual TTHM update?",
      "Where are my school's lead test results posted?",
    ],
    recentLegislation: [
      { year: "2022", title: "PFAS Trust Fund Act — establishes state PFAS remediation funding." },
      { year: "2020", title: "MA PFAS MCL of 20 ng/L combined for six compounds." },
    ],
  },

  michigan: {
    sourceWatersheds: [
      { name: "Lake Huron + Lake Michigan", type: "lake", notes: "Detroit metro via Great Lakes Water Authority." },
      { name: "Lake Superior", type: "lake", notes: "Upper Peninsula." },
      { name: "Saginaw Bay watershed", type: "lake" },
      { name: "Glacial Aquifers", type: "aquifer", notes: "Rural MI and statewide private wells." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "Michigan Filter First in Schools program (2023) requires hydration stations + filters in K-12 schools. Building on lessons from Flint.",
    },
    climateThreats: "Great Lakes warming drives toxic algal blooms in Saginaw Bay and western Lake Erie. Lake levels swing dramatically (record highs 2019, lows 2013). PFAS movement through groundwater is accelerating documentation.",
    industryProfile: "Wurtsmith AFB, Selfridge ANG, Camp Grayling PFAS contamination — among the highest documented military-base PFAS density in the U.S. Auto industry chlorinated-solvent legacy across Detroit, Lansing, Flint corridors. Wolverine Worldwide tannery (Rockford / Belmont) PFAS contamination affected thousands of households.",
    whatToAsk: [
      "Is my address in any of the Michigan PFAS Action Response Team (MPART) confirmed sites?",
      "When is my home scheduled for lead service line replacement?",
      "Has my system been impacted by Lake Erie algal bloom advisories?",
      "Does my school have Filter First-compliant hydration stations?",
    ],
    recentLegislation: [
      { year: "2023", title: "Filter First in Schools Act — mandatory hydration stations + lead-filtering systems in K-12 schools." },
      { year: "2020", title: "MI PFAS MCLs — strictest state framework with seven regulated compounds." },
      { year: "2018", title: "Lead and Copper Rule revisions — Michigan adopts strictest state LCR in U.S. (12 ppb action level)." },
    ],
  },

  minnesota: {
    sourceWatersheds: [
      { name: "Mississippi River", type: "river", notes: "Twin Cities supply." },
      { name: "Prairie du Chien-Jordan Aquifer", type: "aquifer", notes: "Twin Cities metro groundwater." },
      { name: "Lake Superior", type: "lake", notes: "Duluth area." },
      { name: "Karst aquifers (southeast)", type: "aquifer", notes: "Winona, Olmsted, Fillmore counties." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "MN Statute 121A.335 (2017) requires lead testing in all public school buildings. Minneapolis and St. Paul have completed multiple testing cycles with public results.",
    },
    climateThreats: "Earlier ice-out on northern lakes affects source-water temperature regimes. Increasing intense rainfall events drive nitrate spikes in karst-region groundwater. PFAS movement through aquifers continues mapping.",
    industryProfile: "3M's East Metro operations (Cottage Grove, Lake Elmo, Oakdale, Woodbury) — the original major U.S. PFAS contamination site. Mining (Iron Range) and forestry legacy in northern MN. Agricultural runoff drives nitrate in karst-region southeast.",
    whatToAsk: [
      "Is my East Metro home in the documented 3M PFAS contamination zone?",
      "If I'm in karst country, when was my well last tested for nitrate?",
      "Has my school district posted recent lead testing results?",
    ],
    recentLegislation: [
      { year: "2023", title: "Amara's Law (HF 2310) — bans intentionally added PFAS in 11 product categories by 2025, all by 2032." },
      { year: "2017", title: "MN Statute 121A.335 — School Lead Testing mandate." },
    ],
  },

  mississippi: {
    sourceWatersheds: [
      { name: "Sparta Aquifer + Memphis Sand", type: "aquifer", notes: "Statewide groundwater supply." },
      { name: "Pearl River", type: "river", notes: "Jackson surface supply." },
      { name: "Tennessee-Tombigbee Waterway", type: "river" },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "MS State Department of Health provides voluntary testing assistance.",
    },
    climateThreats: "Pearl River extreme flooding (2020, 2022) overwhelmed Jackson treatment plant — the central crisis driver. Coastal storm intensity affects Gulf Coast intakes. Aquifer drawdown in northwest MS accelerates with shifting agricultural patterns.",
    industryProfile: "Industrial chemical legacy is limited compared to neighboring LA. Agricultural runoff (cotton, corn, catfish) drives nitrate and pesticide exposure in the Delta. Coastal shipbuilding (Pascagoula) drives some PFAS concern.",
    whatToAsk: [
      "Is my Jackson address still under emergency boil-water advisories?",
      "Has my private well been tested for arsenic, nitrate, and bacterial pathogens?",
      "If I live in Hattiesburg or Gulf Coast, has my system reported any PFAS results?",
    ],
    recentLegislation: [
      { year: "2023", title: "Jackson Water Crisis federal third-party management framework established." },
    ],
  },

  missouri: {
    sourceWatersheds: [
      { name: "Missouri River", type: "river", notes: "Kansas City metro." },
      { name: "Mississippi River", type: "river", notes: "St. Louis metro." },
      { name: "Ozark Plateau Aquifer", type: "aquifer", notes: "Southern MO." },
      { name: "Lake of the Ozarks", type: "lake" },
    ],
    schoolsLeadTesting: {
      status: "limited",
      detail: "MO DNR provides voluntary technical assistance; some districts (especially St. Louis area) have conducted voluntary testing.",
    },
    climateThreats: "Missouri River flooding intensity affects KC and St. Louis treatment plants. Ozark groundwater karst contamination risk increases with extreme weather. Lake of the Ozarks algal bloom advisories increasing.",
    industryProfile: "Southeast MO lead-mining belt drives geologic-source lead exposure separate from infrastructure lead. St. Louis radiological legacy (West Lake Landfill, Mallinckrodt sites) affects groundwater. Agricultural runoff in northwest MO drives nitrate.",
    whatToAsk: [
      "If I'm in southeast MO, is my well in the lead-mining-belt geologic exposure zone?",
      "Has my St. Louis-area system been impacted by Coldwater Creek radiological contamination?",
      "When was my private well last tested?",
    ],
  },

  montana: {
    sourceWatersheds: [
      { name: "Clark Fork + Bitterroot Rivers", type: "river", notes: "Missoula, Western MT." },
      { name: "Missouri River", type: "river", notes: "Central MT including Helena, Great Falls." },
      { name: "Yellowstone River", type: "river", notes: "Eastern MT." },
      { name: "Madison Aquifer", type: "aquifer", notes: "Major groundwater supply across central MT." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Montana DEQ provides voluntary technical assistance.",
    },
    climateThreats: "Snowpack decline reshapes Clark Fork and Missouri River summer flows. Wildfire burn-scar runoff into Bitterroot and Blackfoot watersheds. Glacier loss in Glacier National Park affects downstream hydrology.",
    industryProfile: "Berkeley Pit (Butte) and Anaconda smelter legacy drove the country's largest Superfund site (Clark Fork). Coal extraction in the Powder River Basin adds groundwater concerns. Limited PFAS contamination relative to lower 48.",
    whatToAsk: [
      "If I'm in Butte / Anaconda corridor, is my system part of ongoing Superfund remediation?",
      "Has my private well been tested for arsenic and heavy metals?",
      "What is my system's pre-treatment turbidity range during spring runoff?",
    ],
  },

  nebraska: {
    sourceWatersheds: [
      { name: "Ogallala Aquifer (High Plains)", type: "aquifer", notes: "Western and central Nebraska groundwater." },
      { name: "Platte River", type: "river", notes: "Omaha + Lincoln supply." },
      { name: "Missouri River", type: "river", notes: "Omaha metro." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Nebraska DEE provides voluntary screening; participation is uneven.",
    },
    climateThreats: "Ogallala drawdown threatens long-term western NE water supply. Intensifying spring rainfall events drive nitrate spikes in shallow groundwater. Drought cycles stress Platte River flow.",
    industryProfile: "Corn and cattle agriculture drives the country's most-documented agricultural nitrate exposure. Limited heavy industrial contamination relative to peer states. Hexagon-area pesticide legacy in eastern NE.",
    whatToAsk: [
      "What is my system's nitrate running annual average?",
      "If I'm on a private well, when was it last tested for nitrate and atrazine?",
      "Has my Cedar County-area well been part of the cancer-cluster investigation?",
    ],
  },

  nevada: {
    sourceWatersheds: [
      { name: "Lake Mead (Colorado River)", type: "lake", notes: "Las Vegas Valley primary supply." },
      { name: "Truckee River", type: "river", notes: "Reno / Sparks." },
      { name: "Carson Basin Aquifer", type: "aquifer", notes: "Northern NV." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Nevada DEP provides voluntary screening; Clark County School District has tested.",
    },
    climateThreats: "Lake Mead historic-low levels threaten Las Vegas supply — Tier 2 shortage forces conservation. Wildfire risk affects Truckee River and Tahoe-area watersheds. Aquifer drawdown in northern NV accelerates.",
    industryProfile: "Henderson industrial corridor drove perchlorate contamination (one of the first major U.S. perchlorate cases). Defense Department PFAS at Nellis AFB. Mining (gold, silver) drives heavy-metal concerns in central NV.",
    whatToAsk: [
      "Has my Las Vegas-area utility activated any Lake Mead drought-trigger restrictions?",
      "Is my Henderson-area home in the perchlorate plume zone?",
      "When was my private well last tested for arsenic?",
    ],
  },

  "new-hampshire": {
    sourceWatersheds: [
      { name: "Pennichuck Brook + Watershed", type: "river", notes: "Nashua area." },
      { name: "Lake Massabesic", type: "lake", notes: "Manchester supply." },
      { name: "Merrimack River", type: "river", notes: "Central NH." },
      { name: "Crystalline Bedrock Aquifers", type: "aquifer", notes: "Statewide private well source." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "NH RSA 485:17-b (2018) requires testing in all schools and licensed childcare. Results submitted to NH DES.",
    },
    climateThreats: "Coastal sea-level rise affects southern NH shallow wells. Spring flooding intensity increases. Higher summer temperatures stress Massabesic and Pennichuck reservoir quality.",
    industryProfile: "Saint-Gobain Performance Plastics (Merrimack) PFAS contamination drove the state's leading-edge PFAS regulation. Pease Air Force Base / Pease Tradeport remains a major PFAS site. Limited other heavy-industry contamination.",
    whatToAsk: [
      "If I'm in Merrimack, Litchfield, or surrounding towns, has my well been included in Saint-Gobain PFAS remediation?",
      "What is my system's measured value vs. NH's 12 ng/L PFOA MCL?",
      "Has my private well been tested for arsenic and uranium?",
    ],
    recentLegislation: [
      { year: "2022", title: "HB 286 — Lead Service Line Inventory requirements + PFAS expansion." },
      { year: "2019", title: "First state in the U.S. to set drinking water MCLs for four PFAS compounds." },
    ],
  },

  "new-jersey": {
    sourceWatersheds: [
      { name: "Delaware River", type: "river", notes: "Central + South Jersey." },
      { name: "Passaic + Hackensack Rivers", type: "river", notes: "North Jersey metro." },
      { name: "Kirkwood-Cohansey Aquifer", type: "aquifer", notes: "Pine Barrens — sole-source aquifer." },
      { name: "Hackensack Valley reservoirs", type: "reservoir" },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "NJ N.J.A.C. 6A:26 requires triennial lead testing in all schools serving pre-K through 12. Results published.",
    },
    climateThreats: "Sea-level rise threatens coastal NJ wellfields (Pine Barrens edge). Combined sewer overflow events from intense rainfall affect Newark, Jersey City intakes. Saltwater intrusion accelerates in coastal aquifers.",
    industryProfile: "DuPont / Chemours Chambers Works (south Jersey on Delaware) drove decades of PFAS contamination. Newark / Jersey City legacy chlorinated-solvent contamination. South Jersey chromium-6 from industrial plating operations. Multiple Superfund sites per square mile.",
    whatToAsk: [
      "What are my system's PFOA and PFOS levels vs. NJ's 14 / 13 ng/L MCLs?",
      "When is my home scheduled for lead service line replacement (Newark model)?",
      "Has my school posted triennial lead test results?",
      "Is my system part of an active state-led chromium-6 sampling program?",
    ],
    recentLegislation: [
      { year: "2021", title: "Statewide Lead Service Line Replacement Act — 10-year full-replacement mandate." },
      { year: "2018", title: "NJ sets first U.S. state MCL for PFOA at 14 ng/L." },
    ],
  },

  "new-mexico": {
    sourceWatersheds: [
      { name: "Rio Grande", type: "river", notes: "Central + south NM including Albuquerque." },
      { name: "San Juan-Chama Diversion", type: "river", notes: "Diverted Colorado Basin water to Rio Grande Valley." },
      { name: "Santa Fe River + reservoirs", type: "reservoir", notes: "Santa Fe metro." },
      { name: "Ogallala Aquifer", type: "aquifer", notes: "Eastern NM agriculture." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "NM Environment Department provides voluntary technical assistance.",
    },
    climateThreats: "Rio Grande drought reaches historic levels; reservoir storage at multi-decade lows. Aquifer drawdown accelerates statewide. Wildfire burn-scar runoff (Hermits Peak / Calf Canyon 2022) damaged source watersheds.",
    industryProfile: "Cannon AFB and Holloman AFB PFAS contamination affect Clovis-area dairy and Alamogordo communities. Los Alamos National Lab and Sandia legacy radiological groundwater plumes. Uranium mining (Navajo Nation) — among the most-contaminated tribal-land water in the U.S.",
    whatToAsk: [
      "If I'm in Clovis or Curry County, is my well in the Cannon AFB PFAS zone?",
      "If I'm on Navajo Nation, has my well been tested for uranium and arsenic?",
      "Has my Rio Grande-served utility activated drought-related supply restrictions?",
    ],
    recentLegislation: [
      { year: "2022", title: "NM PFAS Defense Authorization legislation — multi-million federal settlement framework." },
    ],
  },

  "new-york": {
    sourceWatersheds: [
      { name: "Catskill / Delaware Watershed", type: "reservoir", notes: "NYC unfiltered supply — among the largest unfiltered municipal systems in the world." },
      { name: "Croton Watershed", type: "reservoir", notes: "Backup NYC supply." },
      { name: "Lake Erie + Lake Ontario", type: "lake", notes: "Western NY upstate." },
      { name: "Hudson River", type: "river" },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "NY Public Health Law 1110 (2016) requires lead testing in all schools. Action level: 15 ppb. Public results.",
    },
    climateThreats: "Catskill watershed flooding events challenge unfiltered supply. Long Island sole-source aquifer saltwater intrusion accelerates. Lake Erie algal bloom risk increases with summer warming.",
    industryProfile: "Hoosick Falls (Saint-Gobain) was the first nationally publicized PFAS event. Newburgh PFAS contamination from Stewart Air National Guard. Industrial Hudson River corridor drives legacy PCBs (GE remediation). Long Island 1,4-dioxane contamination from industrial sources.",
    whatToAsk: [
      "If I'm in Hoosick Falls or surrounding towns, what is my system's current PFOA level vs. NY's 10 ng/L MCL?",
      "Has my school posted its most recent NY PHL 1110 lead test results?",
      "If I'm on Long Island, has my well been tested for 1,4-dioxane?",
      "When is my lead service line scheduled for inventory and replacement?",
    ],
    recentLegislation: [
      { year: "2024", title: "Lead Pipe Right to Know Act expansion." },
      { year: "2020", title: "NY sets state MCLs for PFOA, PFOS, and 1,4-Dioxane." },
      { year: "2016", title: "Public Health Law 1110 — School Lead Testing mandate." },
    ],
  },

  "north-carolina": {
    sourceWatersheds: [
      { name: "Cape Fear River", type: "river", notes: "Lower Cape Fear including Wilmington — downstream of Chemours." },
      { name: "Catawba River", type: "river", notes: "Charlotte metro." },
      { name: "Neuse + Tar-Pamlico Rivers", type: "river", notes: "Raleigh metro + coastal NC." },
      { name: "Yadkin-Pee Dee", type: "river", notes: "Greensboro / Winston-Salem." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "NC Department of Health and Human Services provides voluntary technical assistance. Several districts have published voluntary results.",
    },
    climateThreats: "Hurricane intensity (Florence 2018, Matthew 2016) overwhelms eastern NC treatment plants and CAFO lagoons. Coastal sea-level rise threatens Outer Banks freshwater. Cape Fear basin drought-flood swings stress treatment.",
    industryProfile: "Chemours Fayetteville Works is the largest documented PFAS / GenX source in the U.S. Coal-ash impoundments at Duke Energy sites (Dan River 2014 spill, Goldsboro) raise heavy-metal concerns. Hog CAFOs in eastern NC drive nutrient and bacterial loading.",
    whatToAsk: [
      "If I'm in the lower Cape Fear, has my well been tested for GenX (HFPO-DA)?",
      "Has my system been impacted by any Duke Energy coal-ash basin?",
      "What is my utility's PFAS Phase 1 sampling status under EPA's 2024 rule?",
    ],
    recentLegislation: [
      { year: "2023", title: "PFAS NC Notification Act — utility customer notification requirements." },
    ],
  },

  "north-dakota": {
    sourceWatersheds: [
      { name: "Missouri River", type: "river", notes: "Bismarck supply." },
      { name: "Red River of the North", type: "river", notes: "Fargo / Grand Forks." },
      { name: "Garrison Diversion Project", type: "river", notes: "Federal water delivery." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "ND DEQ provides voluntary technical assistance.",
    },
    climateThreats: "Red River flooding intensity (2009, 2011) overwhelms Fargo / Grand Forks treatment infrastructure. Drought cycles in the western Bakken zone stress groundwater. Earlier spring runoff complicates Missouri River management.",
    industryProfile: "Bakken oil-and-gas wastewater spills are the dominant industrial contamination concern. Coal-fired power plants in western ND (lignite mining) drive groundwater quality concerns. Agricultural runoff in eastern ND.",
    whatToAsk: [
      "If I'm in the Bakken region, has my well been tested for hydrocarbons and brine?",
      "Has my utility had any health-based violations in the past three years?",
      "What is my system's arsenic running annual average?",
    ],
  },

  ohio: {
    sourceWatersheds: [
      { name: "Lake Erie", type: "lake", notes: "Toledo, Cleveland, NW Ohio — major HAB source." },
      { name: "Ohio River", type: "river", notes: "Cincinnati supply." },
      { name: "Great Miami River + Aquifer", type: "river", notes: "Dayton metro." },
      { name: "Scioto River", type: "river", notes: "Columbus area." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Ohio EPA provides voluntary technical assistance; major districts have voluntarily tested.",
    },
    climateThreats: "Lake Erie harmful algal bloom (microcystin) intensifies with agricultural runoff and warming — the Toledo 2014 shutdown remains the defining U.S. HAB tap-water event. Ohio River algal bloom risk increases. Extreme rainfall stresses combined sewer systems.",
    industryProfile: "DuPont Washington Works (Parkersburg WV) PFAS plumes affect Ohio River systems. East Palestine 2023 train derailment (vinyl chloride) contaminated multiple watersheds. Legacy steel and tire manufacturing in Akron, Youngstown, Cleveland drives chromium and PCB contamination.",
    whatToAsk: [
      "If I'm on the Lake Erie shoreline, has my utility activated HAB-related advisories this season?",
      "If I'm in East Palestine or downstream, has my private well been tested for vinyl chloride?",
      "What is my Cincinnati / Ohio River utility's PFAS testing status?",
    ],
    recentLegislation: [
      { year: "2023", title: "East Palestine Water Quality Monitoring Act (state and federal coordination)." },
      { year: "2020", title: "Ohio PFAS Action Plan launched." },
    ],
  },

  oklahoma: {
    sourceWatersheds: [
      { name: "Lake Hefner + Lake Stanley Draper", type: "lake", notes: "Oklahoma City." },
      { name: "Lake Murray + Arbuckle Aquifer", type: "lake", notes: "Southern OK." },
      { name: "Lake Eufaula + Lake Tenkiller", type: "lake", notes: "Eastern OK." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "OK DEQ provides voluntary technical assistance.",
    },
    climateThreats: "Drought cycles intensify, stressing reservoir storage and Arbuckle Aquifer recharge. Induced earthquakes (oil-and-gas wastewater injection) damaged groundwater infrastructure. Tornadoes regularly disable treatment plants.",
    industryProfile: "Tar Creek (Picher) Superfund — among the largest U.S. lead/zinc mining contamination zones. Oil-and-gas wastewater injection (induced seismicity) drives infrastructure concerns. Limited PFAS documentation compared to peer states.",
    whatToAsk: [
      "If I'm in Ottawa County, is my well in the Tar Creek Superfund zone?",
      "Has my utility had induced-seismicity-related infrastructure damage?",
      "What is my system's PFAS testing status under the federal 2024 rule?",
    ],
  },

  oregon: {
    sourceWatersheds: [
      { name: "Bull Run Watershed", type: "reservoir", notes: "Portland's pristine unfiltered supply." },
      { name: "McKenzie River", type: "river", notes: "Eugene." },
      { name: "Willamette River", type: "river", notes: "Salem, mid-valley." },
      { name: "Crystalline Bedrock Aquifers", type: "aquifer", notes: "Coast Range, eastern OR." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "OR Healthy and Safe Schools Plan (2017) requires lead testing in all public schools every six years. Results published.",
    },
    climateThreats: "Wildfire burn-scar runoff (2020 Labor Day fires, Bootleg 2021) threatens Bull Run + Cascade watersheds. Snowpack decline affects summer river supply. Coastal saltwater intrusion in shallow Pacific coastal wells.",
    industryProfile: "Hanford Site groundwater plume (across the Columbia from Tri-Cities WA) affects Oregon shoreline communities. Hillsboro / Beaverton Silicon Forest semiconductor industry adds 1,4-dioxane and chlorinated solvents. Limited PFAS contamination documented relative to peers.",
    whatToAsk: [
      "Has my Portland system been impacted by Bull Run watershed wildfire?",
      "Has my school posted current Healthy and Safe Schools Plan lead results?",
      "If I'm in Washington County, has my well been tested for 1,4-dioxane?",
    ],
    recentLegislation: [
      { year: "2017", title: "Healthy and Safe Schools Plan — Lead Testing mandate." },
    ],
  },

  pennsylvania: {
    sourceWatersheds: [
      { name: "Schuylkill River", type: "river", notes: "Philadelphia supply." },
      { name: "Allegheny + Monongahela Rivers", type: "river", notes: "Pittsburgh." },
      { name: "Delaware River", type: "river", notes: "Eastern PA + NJ shared supply." },
      { name: "Marcellus Shale Aquifer Zone", type: "aquifer", notes: "Western and northern PA with fracking contamination concerns." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "PA Department of Education + DEP provide voluntary testing assistance. Philadelphia and Pittsburgh school districts have published results.",
    },
    climateThreats: "Marcellus Shale fracking-related groundwater contamination intensifies with drought-flood cycles. Schuylkill flooding events disrupt Philadelphia treatment. Allegheny River algal bloom risk increases.",
    industryProfile: "Willow Grove and Warminster Naval Air Stations are major PFAS sources affecting Bucks and Montgomery counties. Pittsburgh / Philadelphia legacy lead service lines (200,000+ statewide). Marcellus Shale fracking-related groundwater contamination documented in multiple rural communities.",
    whatToAsk: [
      "If I'm in Bucks or Montgomery County, has my well been impacted by Willow Grove / Warminster PFAS?",
      "What is my Pittsburgh / Philadelphia lead service line replacement schedule?",
      "If I'm in Marcellus country, has my well been tested for methane and brine?",
    ],
    recentLegislation: [
      { year: "2023", title: "PA PFAS MCLs set — PFOA 14 ng/L, PFOS 18 ng/L." },
      { year: "2017", title: "PA Lead Service Line Replacement legislation expanded." },
    ],
  },

  "rhode-island": {
    sourceWatersheds: [
      { name: "Scituate Reservoir", type: "reservoir", notes: "Providence supply — among the best municipal source water." },
      { name: "Pawcatuck + Pawtuxet Rivers", type: "river" },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "RI Department of Health (2019 rules) requires lead testing in all public schools. Results published.",
    },
    climateThreats: "Coastal sea-level rise threatens shallow coastal wells. Combined sewer overflow events from intense rainfall affect Providence intake quality.",
    industryProfile: "Legacy textile and jewelry-manufacturing chlorinated solvents in Providence and Pawtucket. Pawtuxet River PFAS contamination from upstream industrial sources. Naval Station Newport documented PFAS site.",
    whatToAsk: [
      "What is my system's PFOA + PFOS measured value vs. RI's 20 ng/L combined MCL?",
      "If I'm in Providence, when is my lead service line scheduled for replacement?",
      "Has my school posted current lead testing results?",
    ],
    recentLegislation: [
      { year: "2022", title: "RI sets state PFAS MCL at 20 ng/L combined for six compounds." },
    ],
  },

  "south-carolina": {
    sourceWatersheds: [
      { name: "Catawba-Wateree River", type: "river", notes: "Columbia / Rock Hill / Lake Wateree." },
      { name: "Lake Murray", type: "reservoir", notes: "Columbia / Lexington." },
      { name: "Edisto + Saluda Rivers", type: "river" },
      { name: "Coastal Plain Aquifer", type: "aquifer", notes: "Charleston / Lowcountry." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "SC DHEC provides voluntary technical assistance.",
    },
    climateThreats: "Hurricane intensity (Florence, Matthew) overwhelms coastal SC treatment. Sea-level rise threatens Charleston / Beaufort wellfields. Catawba-Wateree drought-flood swings stress water-supply storage.",
    industryProfile: "Cape Fear basin PFAS / GenX contamination from upstream NC Chemours affects Lake Wateree and downstream Columbia. SCANA and Duke coal-ash impoundments raise heavy-metal concerns. Limited heavy industry compared to NC.",
    whatToAsk: [
      "Has my Catawba-Wateree-served utility tested for GenX / PFOA / PFOS?",
      "Has my coastal well been impacted by saltwater intrusion?",
      "Has my system been impacted by any SCANA coal-ash basin?",
    ],
  },

  "south-dakota": {
    sourceWatersheds: [
      { name: "Missouri River + reservoirs", type: "river", notes: "Sioux Falls and central SD." },
      { name: "Big Sioux Aquifer", type: "aquifer", notes: "Eastern SD." },
      { name: "Madison Aquifer", type: "aquifer", notes: "Western SD." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "SD DANR provides voluntary screening assistance.",
    },
    climateThreats: "Missouri River reservoir management challenges intensify under drought-flood swings. Aquifer drawdown in western SD accelerates. Tribal water-system infrastructure faces climate-vulnerability concerns.",
    industryProfile: "Limited heavy industry. Agricultural nitrate dominates rural exposure. Mining (Black Hills) drives legacy heavy-metal contamination in some western communities.",
    whatToAsk: [
      "If I'm on tribal land, has my system been part of recent federal infrastructure funding?",
      "What is my private well's nitrate level?",
      "If I'm in the Black Hills, has my well been tested for cyanide or heavy metals?",
    ],
  },

  tennessee: {
    sourceWatersheds: [
      { name: "Memphis Sand Aquifer", type: "aquifer", notes: "Memphis — extraordinary natural source." },
      { name: "Cumberland River", type: "river", notes: "Nashville supply." },
      { name: "Tennessee River", type: "river", notes: "East TN." },
      { name: "Holston + French Broad Rivers", type: "river", notes: "Knoxville." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "TN Department of Environment and Conservation provides voluntary technical assistance.",
    },
    climateThreats: "Cumberland River algal bloom risk increases. Memphis Sand Aquifer recharge concerns under shifting precipitation. Hurricane remnants flood eastern TN treatment plants.",
    industryProfile: "Kingston coal-ash spill (2008) was the largest U.S. industrial environmental disaster; long-term Roane County contamination persists. Oak Ridge National Laboratory radiological legacy. Eastman Chemical (Kingsport) industrial corridor.",
    whatToAsk: [
      "If I'm in Roane County, is my well in the Kingston coal-ash spill remediation zone?",
      "Has my Knoxville-area utility been impacted by Oak Ridge legacy contamination?",
      "What is my system's PFAS testing status?",
    ],
  },

  texas: {
    sourceWatersheds: [
      { name: "Edwards Aquifer", type: "aquifer", notes: "San Antonio + Central TX — among the largest karst aquifers in the world." },
      { name: "Trinity River + Lakes Lewisville/Ray Hubbard", type: "river", notes: "Dallas / Fort Worth metro." },
      { name: "Colorado River + Highland Lakes", type: "river", notes: "Austin." },
      { name: "Rio Grande", type: "river", notes: "El Paso, Lower Rio Grande Valley." },
      { name: "Ogallala Aquifer", type: "aquifer", notes: "Panhandle and West TX." },
      { name: "Carrizo-Wilcox Aquifer", type: "aquifer", notes: "Central TX." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "TCEQ provides voluntary screening; participation is uneven across the state's 1,000+ districts.",
    },
    climateThreats: "Megadrought reshapes Texas water supply across all major basins. Hurricane intensity (Harvey 2017, Beryl 2024) overwhelms treatment plants. Power-grid failure (Feb 2021) demonstrated water-system fragility. Aquifer drawdown accelerates Ogallala and Edwards.",
    industryProfile: "Houston Ship Channel cumulative industrial exposure — among the most-contaminated industrial-residential overlap zones in the U.S. Oil and gas operations across multiple basins drive produced-water contamination. Military firefighting foam at Joint Base San Antonio and others.",
    whatToAsk: [
      "Has my utility experienced any 2021 power-grid-related infrastructure damage that affects current operations?",
      "What is my system's drought-trigger water-restriction stage?",
      "If I'm in Houston ship channel area, has my water been impacted by Superfund site flooding?",
      "Has my colonias-area system been part of federal infrastructure funding?",
    ],
    recentLegislation: [
      { year: "2023", title: "HB 1565 — Statewide Water Plan update and Rural Water Supply Fund expansion." },
    ],
  },

  utah: {
    sourceWatersheds: [
      { name: "Wasatch Mountain Snowmelt", type: "snowmelt", notes: "Wasatch Front cities including Salt Lake City." },
      { name: "Great Salt Lake basin streams", type: "river" },
      { name: "Colorado River (Lake Powell)", type: "river", notes: "Washington County, southern UT." },
      { name: "Sevier River", type: "river" },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "UT Division of Drinking Water provides voluntary technical assistance.",
    },
    climateThreats: "Great Salt Lake historic-low levels expose dust-toxicity threats and reshape Wasatch Front water-supply calculus. Snowpack decline reduces Wasatch summer flow. Colorado River shortage affects southern UT.",
    industryProfile: "Hill Air Force Base PFAS contamination is among the largest western U.S. military PFAS sites. Tooele Army Depot legacy radioactive and chemical contamination. Mining (Bingham Canyon, central UT) drives heavy-metal contamination.",
    whatToAsk: [
      "If I'm in Davis County, is my system in the Hill AFB PFAS plume?",
      "Has my Wasatch Front utility activated drought-related supply restrictions?",
      "What is my private well's arsenic level?",
    ],
  },

  vermont: {
    sourceWatersheds: [
      { name: "Lake Champlain", type: "lake", notes: "Burlington area." },
      { name: "Connecticut River", type: "river", notes: "Eastern VT." },
      { name: "Crystalline Bedrock Aquifers", type: "aquifer", notes: "Statewide private well source." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "Act 66 (2019) requires lead testing in all schools and licensed childcare every three years.",
    },
    climateThreats: "Lake Champlain harmful algal blooms (cyanobacteria) increase with warming and phosphorus loading. Intense rainfall increases combined sewer overflows. Wells in flood-vulnerable valleys face contamination risk.",
    industryProfile: "Saint-Gobain Performance Plastics (Bennington / Hoosick Falls NY corridor) PFOA contamination is the dominant PFAS source. Limited heavy industry — most contamination is agricultural or historical.",
    whatToAsk: [
      "If I'm in Bennington area, is my well part of Saint-Gobain remediation oversight?",
      "What is my system's PFAS measured value vs. VT's 20 ng/L combined MCL?",
      "Has my school posted Act 66 lead testing results?",
    ],
    recentLegislation: [
      { year: "2021", title: "Act 36 — Statewide ban on PFAS in food packaging." },
      { year: "2020", title: "VT sets state PFAS MCL at 20 ng/L combined for five compounds." },
      { year: "2019", title: "Act 66 — School Lead Testing mandate." },
    ],
  },

  virginia: {
    sourceWatersheds: [
      { name: "Potomac River", type: "river", notes: "Northern VA shared with DC." },
      { name: "James River", type: "river", notes: "Richmond." },
      { name: "Roanoke River", type: "river", notes: "Southside VA." },
      { name: "Coastal Plain Aquifer", type: "aquifer", notes: "Hampton Roads + Eastern Shore." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "Virginia Department of Health provides voluntary technical assistance.",
    },
    climateThreats: "Hampton Roads sea-level rise — among the most-vulnerable U.S. coastal cities. Chesapeake watershed algal blooms increase. Coal-ash impoundment integrity threatened by Appalachian flooding.",
    industryProfile: "Naval Air Station Oceana and Joint Base Langley-Eustis are major PFAS sources. Dominion Energy coal-ash impoundments across central VA raise heavy-metal concerns. Limited heavy mining compared to West Virginia.",
    whatToAsk: [
      "If I'm in Hampton Roads, has my well been impacted by NAS Oceana or Langley-Eustis PFAS?",
      "Has my Northern VA utility's Potomac River intake been impacted by DC combined sewer overflows?",
      "Has my coastal well been impacted by saltwater intrusion?",
    ],
  },

  washington: {
    sourceWatersheds: [
      { name: "Cedar River + Tolt River Watersheds", type: "river", notes: "Seattle pristine Cascade snowmelt." },
      { name: "Green River", type: "river", notes: "Tacoma." },
      { name: "Spokane Valley-Rathdrum Prairie Aquifer", type: "aquifer", notes: "Spokane region." },
      { name: "Columbia River", type: "river", notes: "Tri-Cities (near Hanford)." },
    ],
    schoolsLeadTesting: {
      status: "mandated",
      detail: "Washington 2018 lead-in-schools rule requires testing in all schools and licensed childcare. Results published.",
    },
    climateThreats: "Wildfire burn-scar runoff threatens Cedar / Tolt watersheds. Snowpack decline affects Cascades-fed systems. Coastal saltwater intrusion in shallow Puget Sound wells.",
    industryProfile: "Hanford Site radioactive groundwater plumes — among the largest U.S. environmental remediation sites. Joint Base Lewis-McChord PFAS contamination affects Pierce County. Boeing manufacturing legacy chlorinated solvents.",
    whatToAsk: [
      "If I'm in Pierce County, is my system in the Joint Base Lewis-McChord PFAS zone?",
      "If I'm in Tri-Cities, has my Columbia River system been impacted by Hanford plumes?",
      "Has my school posted current lead testing results?",
    ],
    recentLegislation: [
      { year: "2022", title: "WA State Action Levels for five PFAS compounds." },
      { year: "2021", title: "Healthy Environment for All Act — water-quality equity requirements." },
    ],
  },

  "west-virginia": {
    sourceWatersheds: [
      { name: "Ohio River", type: "river", notes: "Northern panhandle and Mid-Ohio Valley." },
      { name: "Kanawha River", type: "river", notes: "Charleston metro." },
      { name: "Monongahela River", type: "river", notes: "Northern WV." },
      { name: "Greenbrier-Pocahontas Aquifer", type: "aquifer" },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "WV Department of Health and Human Resources provides voluntary technical assistance.",
    },
    climateThreats: "Appalachian flooding intensity (2016 June flood) overwhelms small-system infrastructure. Coalfield post-mining hydrology destabilization. Kanawha River chemical-corridor flooding risk.",
    industryProfile: "DuPont Washington Works (Parkersburg) PFOA contamination is the foundational U.S. PFAS public-health crisis. Kanawha River chemical corridor (Elk River 2014) drives chronic concerns. Coal mining and processing legacy across eastern WV.",
    whatToAsk: [
      "If I'm in Mid-Ohio Valley, am I in the C8 Health Project zone (eligible for ongoing monitoring)?",
      "Has my Charleston-area utility had any post-Elk-River chemical-spill protocol activations?",
      "If I'm in coal country, has my well been tested for selenium and sulfate?",
    ],
  },

  wisconsin: {
    sourceWatersheds: [
      { name: "Lake Michigan", type: "lake", notes: "Milwaukee and southeast WI." },
      { name: "Lake Superior", type: "lake", notes: "Duluth-Superior." },
      { name: "Mississippi River", type: "river", notes: "Western WI." },
      { name: "Sandstone Aquifers", type: "aquifer", notes: "Statewide groundwater." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "WI DNR provides voluntary technical assistance; Milwaukee and Madison have published voluntary results.",
    },
    climateThreats: "Great Lakes warming drives toxic algal blooms (Green Bay). Karst region (door county, southwest WI) groundwater faces contamination from extreme rainfall. Lake Superior thermal regime changes affect Duluth-area systems.",
    industryProfile: "Tyco Fire Products (Marinette / Peshtigo) firefighting-foam PFAS contamination affected hundreds of households. Kewaunee County dairy CAFOs drive nitrate exposure. Paper mill legacy in Fox River chlorinated organics.",
    whatToAsk: [
      "If I'm in Marinette / Peshtigo area, is my well in the Tyco PFAS contamination zone?",
      "What is my system's PFOA + PFOS measured value vs. WI's state MCLs (70 ng/L each)?",
      "If I'm in Kewaunee County, when was my well last tested for nitrate?",
    ],
    recentLegislation: [
      { year: "2022", title: "WI PFAS MCLs set — PFOA and PFOS at 70 ng/L individually." },
    ],
  },

  wyoming: {
    sourceWatersheds: [
      { name: "North Platte River", type: "river", notes: "Eastern WY supply." },
      { name: "Snake River (Yellowstone)", type: "river", notes: "NW WY." },
      { name: "Madison Aquifer", type: "aquifer", notes: "Major regional groundwater source." },
      { name: "Powder River Basin", type: "aquifer", notes: "NE WY with coal-bed methane impacts." },
    ],
    schoolsLeadTesting: {
      status: "voluntary",
      detail: "WY DEQ provides voluntary technical assistance.",
    },
    climateThreats: "Snowpack decline reshapes Snake and North Platte summer flow. Wildfire burn-scar runoff threatens forested watersheds. Powder River Basin coal-bed methane water-quality concerns.",
    industryProfile: "Pavillion-area fracking-related groundwater contamination was the first federally acknowledged case linking fracking to drinking-water contamination. Coal-bed methane operations in Powder River Basin drive water-quality concerns. Limited PFAS contamination documented.",
    whatToAsk: [
      "If I'm in Pavillion area, has my well been monitored under federal or state oversight?",
      "What is my private well's arsenic level?",
      "Has my system reported any health-based violations in the past three years?",
    ],
  },
};

export function getStateExtendedBySlug(slug: string): StateExtended | null {
  return STATES_EXTENDED[slug] ?? null;
}
