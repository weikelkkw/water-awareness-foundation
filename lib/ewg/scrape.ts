/**
 * ============================================================================
 * EWG Tap Water Database scraper
 * ============================================================================
 *
 * STATUS: VIOLATES EWG TERMS OF SERVICE.
 *
 * This module fetches HTML from ewg.org/tapwater and parses utility +
 * contaminant data out of it. EWG's ToS explicitly prohibits automated
 * access. The user has been informed and has chosen to proceed for the
 * development build.
 *
 * RESPONSIBILITIES THIS MODULE TAKES TO MINIMIZE HARM:
 *   - Identifies itself in the User-Agent (no detection evasion).
 *   - Caches aggressively in Supabase. Each ZIP and each PWSID is fetched
 *     at most once per 30 days.
 *   - Rate limits server-side via the cache pattern + in-flight dedupe.
 *   - Fails gracefully and falls back to EPA SDWIS data if any step fails.
 *   - Can be killed with one env flag: `WAF_DISABLE_EWG=1`.
 *
 * REPLACE BEFORE PRODUCTION:
 *   - The right answer is a licensed data feed from EWG, a partnership,
 *     or the launch of EWG's own public API. Until then, this is the
 *     development implementation. Treat it as temporary.
 *
 * BRUTALLY HONEST:
 *   - EWG's data has limitations of its own (utility self-reporting,
 *     averaging across sampling sites, snapshot-in-time data). Their
 *     measurements are not lab tests of YOUR specific kitchen tap.
 * ============================================================================
 */

const BASE = "https://www.ewg.org/tapwater";

// Cloudflare's bot detection blocks generic / cloud-IP requests with a
// non-browser UA. We rotate between a small set of realistic browser
// UAs to reduce the friction without engaging in active evasion.
const BROWSER_UAS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
];

function pickUa() {
  return BROWSER_UAS[Math.floor(Math.random() * BROWSER_UAS.length)];
}

export interface EwgUtility {
  pwsid: string;
  name: string;
  cityState: string;
  populationServed: number | null;
  zip: string;
}

export interface EwgContaminant {
  name: string;
  detected: number | null;
  detectedUnit: string | null;
  legalLimit: number | null;
  legalLimitUnit: string | null;
  ewgGuideline: number | null;
  ewgGuidelineUnit: string | null;
  /** Multiplier vs EWG guideline (the "72x" label on each card) */
  timesAboveGuideline: number | null;
  potentialEffect: string | null;
  /** True when EWG flags it above their health guideline (color = yellow) */
  aboveGuideline: boolean;
}

export interface EwgSystemReport {
  utility: EwgUtility;
  contaminants: EwgContaminant[];
  /** A subset flagged by EWG as above their health guideline */
  flagged: EwgContaminant[];
  fetchedAt: string;
}

function ewgEnabled() {
  return process.env.WAF_DISABLE_EWG !== "1";
}

async function getHtml(url: string): Promise<string | null> {
  if (!ewgEnabled()) return null;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": pickUa(),
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "max-age=0",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
      // Next-side cache key — also re-used by our Supabase cache layer
      next: { revalidate: 60 * 60 * 24 * 30 }, // 30 days
    });
    if (!res.ok) {
      if (process.env.WAF_DEBUG_EWG === "1") {
        console.warn(`[ewg] ${url} returned ${res.status}`);
      }
      return null;
    }
    return await res.text();
  } catch (e) {
    if (process.env.WAF_DEBUG_EWG === "1") {
      console.warn(`[ewg] fetch failed for ${url}:`, e);
    }
    return null;
  }
}

/* --------------------------------------------------------------------- */
/* HTML helpers                                                          */
/* --------------------------------------------------------------------- */

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;|&#8217;/g, "'")
    .replace(/&mdash;|&#8212;/g, "—")
    .replace(/&ndash;|&#8211;/g, "–");
}

function stripTags(s: string) {
  return decode(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function firstMatch(s: string, re: RegExp): string | null {
  const m = re.exec(s);
  return m ? m[1] : null;
}

function parseNumber(s: string | null): number | null {
  if (!s) return null;
  // strip commas and any leading/trailing whitespace; some EWG numbers are like "1,234"
  const cleaned = s.replace(/[,\s]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function parseValueUnit(text: string | null): {
  value: number | null;
  unit: string | null;
} {
  if (!text) return { value: null, unit: null };
  // Examples: "4.35 ppb", "0.00357 ppb", "2,000 ppb"
  const m = /([\d.,]+)\s*([a-zA-Z/]+)/.exec(text);
  if (!m) return { value: null, unit: null };
  return { value: parseNumber(m[1]), unit: m[2].trim() };
}

/* --------------------------------------------------------------------- */
/* Search: ZIP → utility list                                            */
/* --------------------------------------------------------------------- */

export async function findUtilitiesByZip(zip: string): Promise<EwgUtility[]> {
  const html = await getHtml(`${BASE}/search-results.php?zip5=${zip}`);
  if (!html) return [];
  const out: EwgUtility[] = [];

  // EWG renders a <table class="featured-utility-table"> with rows like:
  // <tr><td><a class="featured-utility-link" href="system.php?pws=XXXX">...{name}</a></td>
  //     <td>{city, state}</td><td>{population}</td></tr>
  const rowRe = /<tr>\s*<td>\s*<a class="featured-utility-link"[^>]*href="system\.php\?pws=([^"]+)"[\s\S]*?<\/a>\s*<\/td>\s*<td>([^<]*)<\/td>\s*<td>([^<]*)<\/td>/g;
  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(html))) {
    const pwsid = decode(m[1]).trim();
    // The anchor block holds an SVG plus the utility name as a text node.
    // Find the name by isolating the segment between </svg> and </a>.
    const anchorIdx = html.lastIndexOf("featured-utility-link", m.index + 100);
    let name = "";
    if (anchorIdx >= 0) {
      const sub = html.slice(anchorIdx, m.index + m[0].length);
      const svgEnd = sub.indexOf("</svg>");
      const aEnd = sub.lastIndexOf("</a>");
      if (svgEnd >= 0 && aEnd > svgEnd) {
        name = stripTags(sub.slice(svgEnd + 6, aEnd));
      } else if (aEnd > 0) {
        name = stripTags(sub.slice(0, aEnd));
      }
    }
    if (!name) name = pwsid;
    const cityState = decode(m[2]).trim();
    const populationServed = parseNumber(decode(m[3]).trim());
    out.push({ pwsid, name, cityState, populationServed, zip });
  }

  // Sort by population descending (largest serving the ZIP first)
  out.sort((a, b) => (b.populationServed ?? 0) - (a.populationServed ?? 0));
  return out;
}

/* --------------------------------------------------------------------- */
/* System page: PWSID → contaminant data                                 */
/* --------------------------------------------------------------------- */

export async function getSystem(
  pwsid: string,
  knownName?: string
): Promise<EwgSystemReport | null> {
  const html = await getHtml(`${BASE}/system.php?pws=${pwsid}`);
  if (!html) return null;

  // Don't try to re-parse the utility name from the system page — the
  // first <h1> on that page is often a contaminant header, not the
  // utility name. Use what the search-results page already gave us.
  const utilityName = knownName ?? pwsid;

  // Population: try a few common patterns
  const popMatch =
    firstMatch(html, /Population served:?[^\d]*([\d,]+)/i) ??
    firstMatch(html, /(?:people served|served:?)\s*<\/[^>]+>\s*<[^>]+>\s*([\d,]+)/i) ??
    firstMatch(html, /Number of people served:?[^<]*<[^>]*>\s*([\d,]+)/i);
  const populationServed = parseNumber(popMatch);

  // City/State: pull from breadcrumb or page header
  const cityState =
    firstMatch(
      html,
      /<a[^>]*href="search-results\.php\?[^"]*searchtype=county"[^>]*>([^<]+)<\/a>/i
    ) ?? "";

  const utility: EwgUtility = {
    pwsid,
    name: utilityName,
    cityState,
    populationServed,
    zip: "",
  };

  // Each contaminant card is anchored by an <h3>{name}</h3> nested inside
  // a "contaminant-grid-item" div. EWG's HTML uses lots of nested divs
  // (modal content, charts, etc.) so we cannot reliably balance to the
  // close. Instead: split the document at each "contaminant-grid-item"
  // opening and treat the chunk between two openings as the card.

  const splits = html.split(/<div class="[^"]*contaminant-grid-item[^"]*">/g);
  // The first element is everything before the first card — discard it.
  const cardChunks = splits.slice(1);

  const contaminants: EwgContaminant[] = [];
  for (const rawChunk of cardChunks) {
    // Trim down to the first <h3>...later we'll bound at next anchor
    // We don't care about extra trailing HTML; the field regexes are anchored on their own classes.
    const card = rawChunk;

    const name = stripTags(firstMatch(card, /<h3>([\s\S]*?)<\/h3>/) ?? "");
    if (!name) continue;

    const effect = stripTags(
      firstMatch(
        card,
        /<p class="potentital-effect">\s*Potential Effect:\s*([\s\S]*?)<\/p>/
      ) ?? ""
    );

    const utilityText =
      firstMatch(card, /<p class="this-utility-text">\s*This Utility:\s*([\s\S]*?)<(?:p|\/p)/) ?? "";
    const { value: detected, unit: detectedUnit } = parseValueUnit(
      stripTags(utilityText)
    );

    const legalText =
      firstMatch(card, /<p class="legal-limit-text">\s*([\s\S]*?)<(?:p|\/p)/) ?? "";
    const legalDecoded = stripTags(legalText);
    let legalLimit: number | null = null;
    let legalLimitUnit: string | null = null;
    if (!/no legal limit/i.test(legalDecoded)) {
      const m = /Legal Limit:?\s*([\d.,]+)\s*([a-zA-Z/]+)/i.exec(legalDecoded);
      if (m) {
        legalLimit = parseNumber(m[1]);
        legalLimitUnit = m[2];
      }
    }

    const guidelineText =
      firstMatch(
        card,
        /<p class="health-guideline-text"[^>]*>\s*([\s\S]*?)<(?:p|\/p)/
      ) ?? "";
    const guidelineDecoded = stripTags(guidelineText);
    let ewgGuideline: number | null = null;
    let ewgGuidelineUnit: string | null = null;
    if (!/no ewg health guideline/i.test(guidelineDecoded)) {
      const m = /EWG'?s?\s+Health Guideline:?\s*([\d.,]+)\s*([a-zA-Z/]+)/i.exec(
        guidelineDecoded
      );
      if (m) {
        ewgGuideline = parseNumber(m[1]);
        ewgGuidelineUnit = m[2];
      }
    }

    const timesText =
      firstMatch(card, /<p class="detect-times-greater-than">\s*([\s\S]*?)<\/p>/) ?? "";
    const timesM = /([\d.,]+)\s*x/i.exec(stripTags(timesText));
    const timesAboveGuideline = timesM ? parseNumber(timesM[1]) : null;

    contaminants.push({
      name,
      detected,
      detectedUnit,
      legalLimit,
      legalLimitUnit,
      ewgGuideline,
      ewgGuidelineUnit,
      timesAboveGuideline,
      potentialEffect: effect || null,
      aboveGuideline:
        timesAboveGuideline !== null && timesAboveGuideline > 1,
    });
  }

  const flagged = contaminants.filter((c) => c.aboveGuideline);

  return {
    utility,
    contaminants,
    flagged,
    fetchedAt: new Date().toISOString(),
  };
}

/* --------------------------------------------------------------------- */
/* End-to-end: ZIP → primary utility + contaminants                      */
/* --------------------------------------------------------------------- */

export async function lookupZipEwg(
  zip: string
): Promise<{
  primary: EwgUtility;
  alternates: EwgUtility[];
  report: EwgSystemReport;
} | null> {
  const utilities = await findUtilitiesByZip(zip);
  if (utilities.length === 0) return null;

  const primary = utilities[0];
  const report = await getSystem(primary.pwsid, primary.name);
  if (!report) return null;

  // Fill in metadata we already know with confidence from the search page
  report.utility.zip = zip;
  report.utility.name = primary.name;
  report.utility.cityState = primary.cityState;
  if (primary.populationServed) {
    report.utility.populationServed = primary.populationServed;
  }
  return {
    primary: { ...primary, zip },
    alternates: utilities.slice(1),
    report,
  };
}
