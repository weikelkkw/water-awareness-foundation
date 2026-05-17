/**
 * Static EWG seed cache loader. Reads the deduplicated cache built by
 * `scripts/build-ewg-seed.ts` and exposes a fast lookup by ZIP.
 *
 * Cache shape (deduped):
 *   {
 *     zipMap:    { [zip]: { primary: EwgUtility, alternates: EwgUtility[] } },
 *     utilities: { [pwsid]: EwgSystemReport }
 *   }
 *
 * Storing utilities once means a state with 500 ZIPs sharing 30 utilities
 * costs ~30× a single utility report, not 500×. Makes the cache scale to
 * entire states without bloating the JS bundle.
 *
 * Regenerate with: npm run seed:ewg
 */

import type { EwgSystemReport, EwgUtility } from "./scrape";
import seedJson from "./seed-cache.json";

interface SeedCacheShape {
  zipMap: Record<string, { primary: EwgUtility; alternates: EwgUtility[] }>;
  utilities: Record<string, EwgSystemReport>;
}

const SEED = seedJson as unknown as SeedCacheShape;

export interface SeededResult {
  primary: EwgUtility;
  alternates: EwgUtility[];
  report: EwgSystemReport;
}

export function getSeededReport(zip: string): SeededResult | null {
  const zipEntry = SEED.zipMap?.[zip];
  if (!zipEntry) return null;
  const report = SEED.utilities?.[zipEntry.primary.pwsid];
  if (!report) return null;
  return {
    primary: zipEntry.primary,
    alternates: zipEntry.alternates,
    report,
  };
}

export function isSeededZip(zip: string): boolean {
  return !!SEED.zipMap?.[zip];
}

export function listSeededZips(): string[] {
  return Object.keys(SEED.zipMap ?? {});
}

export function seededUtilityCount(): number {
  return Object.keys(SEED.utilities ?? {}).length;
}
