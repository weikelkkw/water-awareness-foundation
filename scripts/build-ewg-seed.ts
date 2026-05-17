/**
 * Builds a static EWG seed cache for production use.
 *
 * Cloudflare's bot detection blocks Vercel's serverless IPs from fetching
 * the EWG site, so live lookups fail in production. This script runs
 * locally (where requests succeed) and writes a deduplicated cache.
 *
 * Storage shape (efficient — utilities stored once even if 50 ZIPs share
 * the same utility):
 *
 *   {
 *     zipMap: { "80918": { primary: EwgUtility, alternates: EwgUtility[] } },
 *     utilities: { "CO0121300": EwgSystemReport }
 *   }
 *
 * To run:        npm run seed:ewg
 * To extend:     edit TARGET_ZIPS + STATE_RANGES below and re-run.
 */

import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  findUtilitiesByZip,
  getSystem,
  type EwgUtility,
  type EwgSystemReport,
} from "../lib/ewg/scrape";

// Fixed demo + flagship-community ZIPs — guaranteed to be in the cache.
const TARGET_ZIPS: string[] = [
  // Major metros
  "10001", "10128", "11201",
  "90001", "90210", "94102", "94110",
  "60601", "60614", "77001", "75201",
  "85001", "85701", "98101", "98109", "97201",
  "02108", "02139", "30301", "33101", "32801",
  "20001", "20002", "19102", "15222",
  "44113", "43215", "48201", "48502",
  "55401", "55101", "53202", "63101", "64108", "73102",
  "70112", "70801", "37201", "37902", "38103",
  "21201", "23219", "27601", "28202", "29401",
  "84101", "89101", "96813",
  // Flagship-story communities
  "12090", "12550", "26101", "39201", "28401",
];

// State ranges to crawl in their entirety. Use sparingly — each adds a
// few minutes of fetch time. Use bounds matching the zipToState() map.
interface StateRange {
  state: string;
  from: number;
  to: number;
}
const STATE_RANGES: StateRange[] = [
  { state: "Colorado", from: 80000, to: 81699 },
];

interface SeedCache {
  zipMap: Record<string, { primary: EwgUtility; alternates: EwgUtility[] }>;
  utilities: Record<string, EwgSystemReport>;
}

async function main() {
  const outputPath = join(process.cwd(), "lib", "ewg", "seed-cache.json");

  // Resume from existing cache so partial runs don't lose progress.
  let cache: SeedCache = { zipMap: {}, utilities: {} };
  if (existsSync(outputPath)) {
    try {
      const raw = readFileSync(outputPath, "utf-8");
      const parsed = JSON.parse(raw);
      // Handle migration from old per-ZIP shape to deduped shape.
      if (parsed.zipMap && parsed.utilities) {
        cache = parsed as SeedCache;
        console.log(
          `Resuming from existing cache: ${Object.keys(cache.zipMap).length} ZIPs, ${Object.keys(cache.utilities).length} utilities`
        );
      } else {
        console.log("Found legacy seed cache shape; starting fresh.");
      }
    } catch {
      console.log("Couldn't parse existing cache; starting fresh.");
    }
  }

  // Build the target ZIP list.
  const allZips = new Set<string>(TARGET_ZIPS);
  for (const range of STATE_RANGES) {
    for (let z = range.from; z <= range.to; z++) {
      allZips.add(z.toString().padStart(5, "0"));
    }
  }
  const zipList = Array.from(allZips).sort();
  console.log(
    `Seeding ${zipList.length} ZIPs (skipping ${
      zipList.filter((z) => z in cache.zipMap).length
    } already cached)...\n`
  );

  let zipHits = 0;
  let zipMisses = 0;
  let utilityFetches = 0;
  const startedAt = Date.now();
  const total = zipList.length;
  let processed = 0;

  // Filter out ZIPs we already have (resume support)
  const todo = zipList.filter((z) => !cache.zipMap[z]);
  console.log(`Actually fetching ${todo.length} new ZIPs.\n`);

  const CONCURRENCY = 5;
  const PROGRESS_EVERY = 50;

  async function processZip(zip: string) {
    try {
      const utilities = await findUtilitiesByZip(zip);
      if (utilities.length === 0) {
        zipMisses++;
        return;
      }
      const primary = utilities[0];
      const alternates = utilities.slice(1);
      cache.zipMap[zip] = {
        primary: { ...primary, zip },
        alternates: alternates.map((u) => ({ ...u, zip })),
      };
      zipHits++;

      // Fetch any utility we haven't seen yet
      const pwsidsToFetch = [primary.pwsid, ...alternates.map((a) => a.pwsid)]
        .filter((p) => !(p in cache.utilities));
      for (const pwsid of pwsidsToFetch) {
        if (pwsid in cache.utilities) continue; // race-safe re-check
        const utility = utilities.find((u) => u.pwsid === pwsid)!;
        try {
          const report = await getSystem(pwsid, utility.name);
          if (report && !(pwsid in cache.utilities)) {
            cache.utilities[pwsid] = report;
            utilityFetches++;
          }
        } catch {
          // Skip individual utility failures
        }
      }
    } catch {
      zipMisses++;
    } finally {
      processed++;
      if (processed % PROGRESS_EVERY === 0 || processed === todo.length) {
        const elapsed = (Date.now() - startedAt) / 1000;
        const rate = processed / Math.max(1, elapsed);
        const remaining = ((todo.length - processed) / Math.max(rate, 0.01)).toFixed(0);
        console.log(
          `[${processed}/${todo.length}] ${zipHits} hits, ${zipMisses} misses, ${utilityFetches} utilities · ${elapsed.toFixed(0)}s elapsed · ~${remaining}s remaining`
        );
        writeFileSync(outputPath, JSON.stringify(cache), "utf-8");
      }
    }
  }

  // Simple worker-pool: each worker pulls from the queue until empty
  const queue = [...todo];
  const workers: Promise<void>[] = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(
      (async () => {
        while (queue.length > 0) {
          const zip = queue.shift();
          if (!zip) break;
          await processZip(zip);
        }
      })()
    );
  }
  await Promise.all(workers);

  // Final pretty write
  writeFileSync(outputPath, JSON.stringify(cache, null, 2), "utf-8");

  const sizeKb = (
    Buffer.byteLength(JSON.stringify(cache), "utf-8") / 1024
  ).toFixed(0);
  console.log(
    `\nDone. ${Object.keys(cache.zipMap).length} ZIPs cached across ${Object.keys(cache.utilities).length} utilities. (${sizeKb} KB)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
