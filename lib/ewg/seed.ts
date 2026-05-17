/**
 * Static EWG seed cache. Pre-fetched locally (where requests aren't
 * Cloudflare-blocked) and bundled into the build. `getZipReport()`
 * checks this first before attempting a live fetch — making seeded
 * ZIPs render instantly in production with zero upstream calls.
 *
 * Regenerate with: npx tsx scripts/build-ewg-seed.ts
 */

import type { EwgSystemReport, EwgUtility } from "./scrape";
import seedJson from "./seed-cache.json";

export interface SeedEntry {
  fetchedAt: string;
  result: {
    primary: EwgUtility;
    alternates: EwgUtility[];
    report: EwgSystemReport;
  };
}

const SEED = seedJson as Record<string, SeedEntry>;

export function getSeededReport(
  zip: string
): SeedEntry["result"] | null {
  const entry = SEED[zip];
  return entry?.result ?? null;
}

export function isSeededZip(zip: string): boolean {
  return zip in SEED;
}

export function listSeededZips(): string[] {
  return Object.keys(SEED);
}
