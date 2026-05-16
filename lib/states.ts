/**
 * Per-state water profiles. Each state has a curated profile drawn from
 * EPA SDWIS public data, EWG state summaries, and major regional water
 * stories. These power /water/[state] pages.
 *
 * Numbers are conservative, public-data-derived approximations. Top
 * contaminants reflect what state regulators and EWG have flagged most
 * frequently — not exhaustive lists.
 */

export interface StateProfile {
  slug: string; // lowercase, hyphenated
  name: string;
  abbreviation: string;
  population: number; // approximate, millions are fine
  utilityCount: number; // approximate public water system count
  servedPopulation?: number; // approximate population on public water systems
  primarySourceMix: string; // e.g., "60% surface water, 40% groundwater"
  topContaminants: string[]; // 2-4 contaminant slugs most-flagged in this state
  context: string; // 2-3 sentence regional water-quality context
  flagshipStory?: string; // optional one-line: the headline issue
  majorCities: string[]; // 2-5 representative cities
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
  },
];

export function getStateBySlug(slug: string): StateProfile | null {
  return STATES.find((s) => s.slug === slug) ?? null;
}

export function getStateByAbbreviation(abbr: string): StateProfile | null {
  return STATES.find((s) => s.abbreviation === abbr.toUpperCase()) ?? null;
}
