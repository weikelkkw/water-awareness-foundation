/**
 * EPA Safe Drinking Water Information System (SDWIS) client.
 *
 * SDWIS Federal Reports are exposed via the Envirofacts REST endpoint:
 *   https://data.epa.gov/efservice/{table}/{column}/{operator}/{value}/JSON
 *
 * The two tables we need:
 *   WATER_SYSTEM       — utility metadata (name, population served, source)
 *   VIOLATION          — reported regulatory violations
 *
 * SDWIS does NOT directly map ZIP → utility. We use the
 * GEOGRAPHIC_AREA table to find ZIP-to-PWSID candidates and then enrich
 * each candidate with WATER_SYSTEM data.
 *
 * In production we cache every successful lookup in Supabase so the next
 * visitor for the same ZIP gets a sub-100ms response. See lib/db/queries.ts.
 *
 * BRUTALLY HONEST CAVEAT:
 *   SDWIS reports lag actual sampling by 1–6 quarters. Violations data
 *   reflects what utilities self-reported AND what state regulators
 *   forwarded to EPA. Many small contaminants of concern (PFAS, micro-
 *   plastics, Cr-6) are not yet routinely reported. Our scoring blends
 *   reported violations with a baseline national risk profile when SDWIS
 *   data is sparse — which is honest, but is not the same as a real,
 *   recent lab test of the user's tap.
 */

const SDWIS_BASE = "https://data.epa.gov/efservice";

export interface WaterSystem {
  pwsid: string;
  name: string;
  state: string;
  populationServed: number | null;
  primarySource:
    | "Surface water"
    | "Groundwater"
    | "Groundwater under direct influence"
    | "Purchased"
    | "Unknown";
  ownerType: string | null;
  countiesServed: string[];
  citiesServed: string[];
}

export interface SdwisViolation {
  pwsid: string;
  contaminant: string;
  contaminantCode: string;
  category: string;
  beginDate: string | null;
  endDate: string | null;
  status: "Resolved" | "Unaddressed" | "Addressed" | "Archived" | "Unknown";
  isHealthBased: boolean;
}

// EPA Envirofacts returns lowercase field names in JSON. The URL column
// names accept either case, but response keys are always lowercase.
interface SdwisGeoRow {
  pwsid?: string;
  zip_code_served?: string;
  city_served?: string;
  county_served?: string;
  state_served?: string;
}

interface SdwisSystemRow {
  pwsid?: string;
  pws_name?: string;
  population_served_count?: string | number;
  primary_source_code?: string;
  gw_sw_code?: string;
  owner_type_code?: string;
  state_code?: string;
  pws_type_code?: string;
  pws_activity_code?: string;
}

interface SdwisViolationRow {
  pwsid?: string;
  contaminant_code?: string;
  contaminant_name?: string;
  violation_category_code?: string;
  violation_category?: string;
  compl_per_begin_date?: string;
  compl_per_end_date?: string;
  violation_status?: string;
  is_health_based_ind?: string;
}

const SOURCE_MAP: Record<string, WaterSystem["primarySource"]> = {
  SW: "Surface water",
  GW: "Groundwater",
  GU: "Groundwater under direct influence",
  GWP: "Purchased",
  SWP: "Purchased",
};

async function sdwisGet<T>(
  table: string,
  filters: Array<[string, string, string | number]>,
  rows = 100
): Promise<T[]> {
  const path = filters
    .map(([col, op, val]) => `${col}/${op}/${encodeURIComponent(String(val))}`)
    .join("/");
  const url = `${SDWIS_BASE}/${table}/${path}/ROWS/0:${rows}/JSON`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 * 7 }, // cache 7 days at the fetch layer
  });

  if (!res.ok) {
    throw new Error(`SDWIS ${table} fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as T[] | { Results?: T[] };
  if (Array.isArray(data)) return data;
  return data.Results ?? [];
}

/** Find Public Water System IDs that report serving the given ZIP. */
export async function findPwsidsByZip(zip: string): Promise<string[]> {
  const rows = await sdwisGet<SdwisGeoRow>(
    "GEOGRAPHIC_AREA",
    [["ZIP_CODE_SERVED", "=", zip]],
    50
  );
  const ids = new Set<string>();
  for (const r of rows) {
    if (r.pwsid) ids.add(r.pwsid);
  }
  return Array.from(ids);
}

export async function getWaterSystem(pwsid: string): Promise<WaterSystem | null> {
  const rows = await sdwisGet<SdwisSystemRow>(
    "WATER_SYSTEM",
    [["PWSID", "=", pwsid]],
    1
  );
  const r = rows[0];
  if (!r || !r.pwsid) return null;

  const cities: string[] = [];
  const counties: string[] = [];
  try {
    const geos = await sdwisGet<SdwisGeoRow>(
      "GEOGRAPHIC_AREA",
      [["PWSID", "=", pwsid]],
      50
    );
    for (const g of geos) {
      if (g.city_served && !cities.includes(g.city_served))
        cities.push(g.city_served);
      if (g.county_served && !counties.includes(g.county_served))
        counties.push(g.county_served);
    }
  } catch {
    /* non-fatal — geography is enrichment */
  }

  // EPA also exposes gw_sw_code (Groundwater/Surface Water flag) which is
  // present even when primary_source_code is empty. Prefer the specific
  // primary_source_code; fall back to gw_sw_code.
  const sourceCode = r.primary_source_code ?? r.gw_sw_code ?? "";

  return {
    pwsid: r.pwsid,
    name: r.pws_name ?? "Unnamed water system",
    state: r.state_code ?? "",
    populationServed: r.population_served_count
      ? Number(r.population_served_count)
      : null,
    primarySource: SOURCE_MAP[sourceCode] ?? "Unknown",
    ownerType: r.owner_type_code ?? null,
    countiesServed: counties,
    citiesServed: cities,
  };
}

export async function getViolations(
  pwsid: string,
  sinceYear = new Date().getFullYear() - 5
): Promise<SdwisViolation[]> {
  const rows = await sdwisGet<SdwisViolationRow>(
    "VIOLATION",
    [["PWSID", "=", pwsid]],
    250
  );
  const out: SdwisViolation[] = [];
  for (const r of rows) {
    if (!r.pwsid) continue;
    const begin = r.compl_per_begin_date ?? null;
    if (begin) {
      const yr = new Date(begin).getFullYear();
      if (!isNaN(yr) && yr < sinceYear) continue;
    }
    out.push({
      pwsid: r.pwsid,
      contaminant: r.contaminant_name ?? "Unknown",
      contaminantCode: r.contaminant_code ?? "",
      category: r.violation_category ?? r.violation_category_code ?? "Other",
      beginDate: begin,
      endDate: r.compl_per_end_date ?? null,
      status: (r.violation_status as SdwisViolation["status"]) ?? "Unknown",
      isHealthBased: r.is_health_based_ind === "Y",
    });
  }
  return out;
}

/**
 * The end-to-end ZIP lookup. Returns the largest active system for the
 * ZIP plus its violations. If multiple utilities serve the ZIP, we pick
 * the one with the largest reported population.
 */
export async function lookupZip(zip: string) {
  const pwsids = await findPwsidsByZip(zip);
  if (pwsids.length === 0) return null;

  const systems = await Promise.all(pwsids.slice(0, 5).map(getWaterSystem));
  const valid = systems.filter((s): s is WaterSystem => !!s);
  if (valid.length === 0) return null;

  valid.sort(
    (a, b) => (b.populationServed ?? 0) - (a.populationServed ?? 0)
  );
  const primary = valid[0];

  const violations = await getViolations(primary.pwsid).catch(() => []);

  return {
    primary,
    alternates: valid.slice(1),
    violations,
  };
}
