/**
 * Auto-assembles the Sunday digest from the foundation's existing
 * content store. Picks one featured item per slot:
 *
 *   - 1 lead story (most recent news post)
 *   - 1 deep-read of the week (most recent article)
 *   - 1 contaminant of the week (rotates by ISO week number across the
 *     full CONTAMINANTS array — deterministic, no repeats inside a year)
 *   - 1 sourced fact of the week (rotates the same way)
 *
 * The system also checks for a hand-curated override at
 * `content/digest/{YYYY}-W{WW}.mdx`. If present, that file's body is
 * used verbatim instead of the auto-assembled content.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { CONTAMINANTS } from "@/lib/contaminants";
import { FACTS } from "@/lib/facts";
import { SOURCES } from "@/lib/sources";
import { getAllArticles, CATEGORY_META } from "@/lib/content/mdx";
import { getAllNews } from "@/lib/content/news";

export interface DigestItem {
  eyebrow: string;
  title: string;
  blurb: string;
  href: string;
}

export interface DigestPayload {
  issueKey: string; // "2026-W21"
  weekNumber: number;
  issueNumber: number; // ordinal across foundation history
  publishedAt: string; // ISO
  override: { title?: string; body: string } | null;
  lead: DigestItem | null;
  deepRead: DigestItem | null;
  contaminantOfTheWeek: DigestItem | null;
  factOfTheWeek: { fact: string; sourceTitle: string; sourceUrl: string } | null;
}

function isoWeek(date: Date): { year: number; week: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Thursday in current week decides the year
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://waterawarenessfoundation.com";

export function buildDigest(now: Date = new Date()): DigestPayload {
  const { year, week } = isoWeek(now);
  const issueKey = `${year}-W${String(week).padStart(2, "0")}`;

  // Foundation issue ordinal — week 1 of 2026 = Issue 001.
  const FOUNDING_YEAR = 2026;
  const FOUNDING_WEEK = 1;
  const issueNumber =
    (year - FOUNDING_YEAR) * 52 + (week - FOUNDING_WEEK) + 1;

  // Manual override path
  const overridePath = join(
    process.cwd(),
    "content",
    "digest",
    `${issueKey}.mdx`
  );
  if (existsSync(overridePath)) {
    try {
      const raw = readFileSync(overridePath, "utf-8");
      const parsed = matter(raw);
      return {
        issueKey,
        weekNumber: week,
        issueNumber,
        publishedAt: now.toISOString(),
        override: {
          title: parsed.data?.title as string | undefined,
          body: parsed.content,
        },
        lead: null,
        deepRead: null,
        contaminantOfTheWeek: null,
        factOfTheWeek: null,
      };
    } catch {
      // Fall through to auto-assembly on parse failure
    }
  }

  // Lead: most recent news post
  const news = getAllNews();
  const lead = news[0]
    ? {
        eyebrow: "Lead",
        title: news[0].title,
        blurb: news[0].description,
        href: `${BASE}/news/${news[0].slug}`,
      }
    : null;

  // Deep read: most recent article
  const articles = getAllArticles();
  const deepRead = articles[0]
    ? {
        eyebrow: `Deep read · ${CATEGORY_META[articles[0].category].eyebrow}`,
        title: articles[0].title,
        blurb: articles[0].description,
        href: `${BASE}/learn/${articles[0].category}/${articles[0].slug}`,
      }
    : null;

  // Contaminant of the week — rotate deterministically
  const cIndex = week % CONTAMINANTS.length;
  const c = CONTAMINANTS[cIndex];
  const contaminantOfTheWeek = c
    ? {
        eyebrow: "Contaminant of the week",
        title: c.name,
        blurb: c.oneLine,
        href: `${BASE}/explore/${c.slug}`,
      }
    : null;

  // Fact of the week
  const fIndex = (week * 7) % FACTS.length;
  const f = FACTS[fIndex];
  const src = f ? SOURCES[f.sourceId] : null;
  const factOfTheWeek =
    f && src
      ? {
          fact: f.fact,
          sourceTitle: src.title,
          sourceUrl: src.url,
        }
      : null;

  return {
    issueKey,
    weekNumber: week,
    issueNumber,
    publishedAt: now.toISOString(),
    override: null,
    lead,
    deepRead,
    contaminantOfTheWeek,
    factOfTheWeek,
  };
}
