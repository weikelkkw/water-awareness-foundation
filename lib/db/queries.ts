import { supabaseAdmin } from "./supabase";
import { lookupZip, type WaterSystem, type SdwisViolation } from "@/lib/epa/sdwis";
import { lookupZipEwg, type EwgSystemReport } from "@/lib/ewg/scrape";

const CACHE_TTL_DAYS = 30;

export interface ZipReport {
  zip: string;
  primary: WaterSystem;
  alternates: WaterSystem[];
  violations: SdwisViolation[];
  /** EWG-sourced contaminant levels when available (preferred). */
  ewg: EwgSystemReport | null;
  /** Indicates how the report's primary utility was resolved. */
  source: "ewg" | "epa" | "ewg+epa";
  cached: boolean;
}

/** Lookup with Supabase write-through cache. Falls back gracefully to
 *  EPA-direct if Supabase isn't configured.
 *
 *  Strategy:
 *    1. Try EWG first (gives us real contaminant levels AND a working
 *       ZIP→PWSID map, which EPA SDWIS doesn't reliably provide).
 *    2. With the resolved PWSID, try EPA SDWIS for the violation record.
 *    3. If EWG fails, fall back to EPA-only.
 *
 *  Either path produces a `ZipReport`. The `source` field tells the UI
 *  how to label provenance. */
export async function getZipReport(zip: string): Promise<ZipReport | null> {
  // Always try EWG first — it solves the ZIP→PWSID problem AND gives us
  // real contaminant levels that SDWIS doesn't expose.
  const ewg = await lookupZipEwg(zip).catch(() => null);

  if (ewg) {
    // Synthesize a WaterSystem record from EWG's utility metadata, then
    // enrich with EPA SDWIS violation history using the resolved PWSID.
    const primary: WaterSystem = {
      pwsid: ewg.primary.pwsid,
      name: ewg.primary.name,
      state: ewg.primary.cityState.split(",").pop()?.trim() ?? "",
      populationServed: ewg.primary.populationServed,
      primarySource: "Unknown",
      ownerType: null,
      countiesServed: [],
      citiesServed: ewg.primary.cityState
        ? [ewg.primary.cityState.split(",")[0].trim()]
        : [],
    };

    // Best-effort: pull EPA violations + primary-source classification for the same PWSID.
    let violations: SdwisViolation[] = [];
    let source: ZipReport["source"] = "ewg";
    try {
      const { getViolations, getWaterSystem } = await import("@/lib/epa/sdwis");
      const [epaSystem, epaViolations] = await Promise.all([
        getWaterSystem(ewg.primary.pwsid).catch(() => null),
        getViolations(ewg.primary.pwsid).catch(() => []),
      ]);
      if (epaSystem) {
        primary.primarySource = epaSystem.primarySource;
        primary.ownerType = epaSystem.ownerType;
        primary.countiesServed = epaSystem.countiesServed;
        if (epaSystem.citiesServed.length) {
          primary.citiesServed = epaSystem.citiesServed;
        }
        if (epaSystem.populationServed) {
          primary.populationServed = epaSystem.populationServed;
        }
        source = "ewg+epa";
      }
      violations = epaViolations;
      if (epaViolations.length || epaSystem) source = "ewg+epa";
    } catch {
      /* EPA enrichment is optional */
    }

    const alternates: WaterSystem[] = ewg.alternates.map((a) => ({
      pwsid: a.pwsid,
      name: a.name,
      state: a.cityState.split(",").pop()?.trim() ?? "",
      populationServed: a.populationServed,
      primarySource: "Unknown",
      ownerType: null,
      countiesServed: [],
      citiesServed: a.cityState ? [a.cityState.split(",")[0].trim()] : [],
    }));

    return {
      zip,
      primary,
      alternates,
      violations,
      ewg: ewg.report,
      source,
      cached: false,
    };
  }

  if (!supabaseAdmin) {
    const live = await lookupZip(zip);
    if (!live) return null;
    return { zip, ...live, ewg: null, source: "epa", cached: false };
  }

  const { data: cached } = await supabaseAdmin
    .from("zip_lookup")
    .select("primary_pwsid, alternate_pwsids, resolved_at")
    .eq("zip", zip)
    .maybeSingle();

  const fresh =
    cached &&
    new Date(cached.resolved_at).getTime() >
      Date.now() - CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;

  if (fresh && cached) {
    const pwsids = [cached.primary_pwsid, ...(cached.alternate_pwsids || [])];
    const { data: systems } = await supabaseAdmin
      .from("water_systems")
      .select("*")
      .in("pwsid", pwsids);

    const sysByPwsid = new Map(
      (systems || []).map((s) => [
        s.pwsid,
        {
          pwsid: s.pwsid,
          name: s.name,
          state: s.state ?? "",
          populationServed: s.population_served,
          primarySource: s.primary_source,
          ownerType: s.owner_type,
          countiesServed: s.counties_served ?? [],
          citiesServed: s.cities_served ?? [],
        } as WaterSystem,
      ])
    );

    const primary = sysByPwsid.get(cached.primary_pwsid);
    if (primary) {
      const { data: vios } = await supabaseAdmin
        .from("violations")
        .select("*")
        .eq("pwsid", cached.primary_pwsid);

      return {
        zip,
        primary,
        alternates: (cached.alternate_pwsids ?? [])
          .map((p: string) => sysByPwsid.get(p))
          .filter(Boolean) as WaterSystem[],
        violations:
          (vios ?? []).map((v) => ({
            pwsid: v.pwsid,
            contaminant: v.contaminant,
            contaminantCode: v.contaminant_code ?? "",
            category: v.category ?? "Other",
            beginDate: v.begin_date,
            endDate: v.end_date,
            status: v.status ?? "Unknown",
            isHealthBased: v.is_health_based ?? false,
          })) as SdwisViolation[],
        ewg: null,
        source: "epa",
        cached: true,
      };
    }
  }

  const live = await lookupZip(zip);
  if (!live) return null;

  // Best-effort write-through cache; don't block the response on cache writes.
  void writeCache(zip, live).catch(() => {});

  return { zip, ...live, ewg: null, source: "epa", cached: false };
}

async function writeCache(
  zip: string,
  data: { primary: WaterSystem; alternates: WaterSystem[]; violations: SdwisViolation[] }
) {
  if (!supabaseAdmin) return;
  const allSystems = [data.primary, ...data.alternates];
  await supabaseAdmin.from("water_systems").upsert(
    allSystems.map((s) => ({
      pwsid: s.pwsid,
      name: s.name,
      state: s.state,
      population_served: s.populationServed,
      primary_source: s.primarySource,
      owner_type: s.ownerType,
      counties_served: s.countiesServed,
      cities_served: s.citiesServed,
      fetched_at: new Date().toISOString(),
    }))
  );

  await supabaseAdmin.from("zip_lookup").upsert({
    zip,
    primary_pwsid: data.primary.pwsid,
    alternate_pwsids: data.alternates.map((a) => a.pwsid),
    resolved_at: new Date().toISOString(),
  });

  if (data.violations.length) {
    await supabaseAdmin.from("violations").delete().eq("pwsid", data.primary.pwsid);
    await supabaseAdmin.from("violations").insert(
      data.violations.map((v) => ({
        pwsid: v.pwsid,
        contaminant: v.contaminant,
        contaminant_code: v.contaminantCode,
        category: v.category,
        begin_date: v.beginDate,
        end_date: v.endDate,
        status: v.status,
        is_health_based: v.isHealthBased,
      }))
    );
  }
}

export async function saveNewsletterSignup(email: string, zip?: string) {
  if (!supabaseAdmin) {
    // Honest fallback: log and return success so dev UX works without Supabase.
    console.log(`[newsletter] (no db) ${email} ${zip ?? ""}`);
    return { ok: true, persisted: false };
  }
  const { error } = await supabaseAdmin
    .from("newsletter_signups")
    .upsert({ email: email.toLowerCase(), zip, source: "website" }, { onConflict: "email" });
  if (error) return { ok: false, persisted: false, error: error.message };
  return { ok: true, persisted: true };
}
