/**
 * Builds a static EWG seed cache for popular demo ZIPs.
 *
 * Cloudflare's bot detection blocks Vercel's serverless IPs from fetching
 * the EWG site, so live lookups fail in production. This script runs
 * locally (where requests succeed), fetches the top demo ZIPs, and writes
 * the results to `lib/ewg/seed-cache.json`. The static cache is checked
 * first by `getZipReport()` — making all seeded ZIPs work reliably in
 * production with zero upstream calls.
 *
 * To run:    npx tsx scripts/build-ewg-seed.ts
 * To extend: add ZIPs to DEMO_ZIPS below and re-run.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { lookupZipEwg } from "../lib/ewg/scrape";

// Top demo ZIPs by combination of population, name recognition, and
// likely ad-campaign targeting. ~50 ZIPs covers most major U.S. cities
// and the flagship-story communities (Flint, Hoosick Falls, Newburgh,
// Parkersburg, Cancer Alley, Jackson, etc.).
const DEMO_ZIPS = [
  // Major metros
  "10001", // NYC Manhattan
  "10128", // NYC Upper East
  "11201", // Brooklyn
  "90001", // LA
  "90210", // Beverly Hills
  "94102", // SF
  "94110", // SF Mission
  "60601", // Chicago Loop
  "60614", // Chicago Lincoln Park
  "77001", // Houston
  "75201", // Dallas
  "85001", // Phoenix
  "85701", // Tucson
  "98101", // Seattle
  "98109", // Seattle Queen Anne
  "97201", // Portland
  "02108", // Boston Beacon Hill
  "02139", // Cambridge
  "30301", // Atlanta
  "33101", // Miami
  "32801", // Orlando
  "20001", // DC
  "20002", // DC NE
  "19102", // Philadelphia
  "15222", // Pittsburgh
  "44113", // Cleveland
  "43215", // Columbus
  "48201", // Detroit
  "48502", // Flint (flagship)
  "55401", // Minneapolis
  "55101", // St. Paul
  "53202", // Milwaukee
  "63101", // St. Louis
  "64108", // Kansas City
  "73102", // OKC
  "70112", // New Orleans
  "70801", // Baton Rouge
  "37201", // Nashville
  "37902", // Knoxville
  "38103", // Memphis
  "21201", // Baltimore
  "23219", // Richmond
  "27601", // Raleigh
  "28202", // Charlotte
  "29401", // Charleston SC
  "80202", // Denver
  "80918", // Colorado Springs (PFAS flagship)
  "84101", // Salt Lake City
  "89101", // Las Vegas
  "96813", // Honolulu
  // Flagship-story communities for the storytelling
  "12090", // Hoosick Falls NY (PFOA)
  "12550", // Newburgh NY (military PFAS)
  "26101", // Parkersburg WV (PFOA original)
  "39201", // Jackson MS (2022 crisis)
  "28401", // Wilmington NC (Cape Fear GenX)
];

interface CacheEntry {
  fetchedAt: string;
  result: Awaited<ReturnType<typeof lookupZipEwg>>;
}

async function main() {
  const cache: Record<string, CacheEntry> = {};
  let success = 0;
  let failed = 0;

  for (const zip of DEMO_ZIPS) {
    process.stdout.write(`Fetching ${zip}... `);
    try {
      const result = await lookupZipEwg(zip);
      if (result) {
        cache[zip] = { fetchedAt: new Date().toISOString(), result };
        console.log(
          `✓ ${result.primary.name} (${result.report.contaminants.length} contaminants, ${result.report.flagged.length} flagged)`
        );
        success++;
      } else {
        console.log("✗ no result");
        failed++;
      }
    } catch (e) {
      console.log(`✗ error: ${(e as Error).message}`);
      failed++;
    }
    // Polite delay
    await new Promise((r) => setTimeout(r, 800));
  }

  const outputPath = join(process.cwd(), "lib", "ewg", "seed-cache.json");
  writeFileSync(outputPath, JSON.stringify(cache, null, 2), "utf-8");

  console.log(
    `\nWrote ${success}/${DEMO_ZIPS.length} ZIPs to ${outputPath} (${failed} failed)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
