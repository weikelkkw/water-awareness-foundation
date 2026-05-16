/**
 * Static search index. Built fresh on every server render, then handed
 * to the client search modal as a single JSON payload. Keeps Fuse.js
 * + ranking on the client so search is sub-50ms with zero round trips.
 */

import { CONTAMINANTS } from "@/lib/contaminants";
import { FACTS } from "@/lib/facts";
import { getAllArticles, CATEGORY_META } from "@/lib/content/mdx";
import { getAllNews } from "@/lib/content/news";

export type SearchKind =
  | "contaminant"
  | "article"
  | "news"
  | "fact"
  | "page";

export interface SearchDoc {
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  meta?: string;
  body?: string;
}

const STATIC_PAGES: SearchDoc[] = [
  {
    kind: "page",
    title: "Find your water report",
    description:
      "Enter your U.S. ZIP code for an independent water quality report — drawn from EWG's Tap Water Database.",
    href: "/report",
    meta: "ZIP report · live EWG data",
  },
  {
    kind: "page",
    title: "Compare two ZIPs",
    description:
      "Side-by-side comparison of any two U.S. ZIPs — contaminant counts, worst-case multipliers, and severity.",
    href: "/compare",
    meta: "Comparison tool",
  },
  {
    kind: "page",
    title: "The Library",
    description:
      "Long-form, deeply sourced articles on drinking water contaminants, health effects, filtration, and policy.",
    href: "/learn",
    meta: "Education",
  },
  {
    kind: "page",
    title: "Contaminant Explorer",
    description:
      "Every contaminant worth understanding — periodic-table-style explorer of what's in U.S. tap water.",
    href: "/explore",
    meta: "Contaminants",
  },
  {
    kind: "page",
    title: "Water News",
    description:
      "Editorial coverage of what's changing in U.S. drinking water — policy, science, regional incidents.",
    href: "/news",
    meta: "News",
  },
  {
    kind: "page",
    title: "Water Facts",
    description:
      "Curated, fully cited facts about U.S. drinking water — infrastructure, biology, contaminants, policy.",
    href: "/facts",
    meta: "Facts",
  },
  {
    kind: "page",
    title: "Browse by state",
    description:
      "State-by-state water profiles — top contaminants of concern, key utilities, and recent news.",
    href: "/water",
    meta: "Geography",
  },
  {
    kind: "page",
    title: "About the foundation",
    description:
      "Independent, non-commercial educational organization publishing science-backed water reporting.",
    href: "/about",
    meta: "Foundation",
  },
  {
    kind: "page",
    title: "Methodology",
    description:
      "How we generate water reports, where the data comes from, and what the score does and doesn't measure.",
    href: "/methodology",
    meta: "Foundation",
  },
  {
    kind: "page",
    title: "Transparency",
    description:
      "Funding sources, editorial independence commitments, and the things we will not do.",
    href: "/transparency",
    meta: "Foundation",
  },
  {
    kind: "page",
    title: "Press",
    description:
      "Press kit, expert availability, and contact details for journalists covering U.S. drinking water.",
    href: "/press",
    meta: "Foundation",
  },
  {
    kind: "page",
    title: "Donate",
    description:
      "How to support the foundation. No ads, no affiliates — the work runs on donations.",
    href: "/donate",
    meta: "Support",
  },
  {
    kind: "page",
    title: "The Sunday email",
    description:
      "One weekly email. New contaminants explained, policy updates, regional water alerts. Free, no spam.",
    href: "/newsletter",
    meta: "Newsletter",
  },
];

export function buildSearchIndex(): SearchDoc[] {
  const out: SearchDoc[] = [];

  // Contaminants
  for (const c of CONTAMINANTS) {
    out.push({
      kind: "contaminant",
      title: c.name,
      description: c.oneLine,
      href: `/explore/${c.slug}`,
      meta: `${c.category.replace("-", " ")}${c.formula ? ` · ${c.formula}` : ""}`,
      body: [
        c.whatItIs,
        c.sources.join(" · "),
        c.healthEffects.summary,
        c.healthEffects.tags.join(" "),
        c.regionsAffected ?? "",
      ].join(" "),
    });
  }

  // Articles
  for (const a of getAllArticles()) {
    out.push({
      kind: "article",
      title: a.title,
      description: a.description,
      href: `/learn/${a.category}/${a.slug}`,
      meta: `${CATEGORY_META[a.category].eyebrow} · ${a.readingTime} min`,
    });
  }

  // News
  for (const n of getAllNews()) {
    out.push({
      kind: "news",
      title: n.title,
      description: n.description,
      href: `/news/${n.slug}`,
      meta: `${n.topic}${n.region ? ` · ${n.region}` : ""}`,
    });
  }

  // Facts — collapse multiple into one searchable per-fact entry
  for (let i = 0; i < FACTS.length; i++) {
    const f = FACTS[i];
    out.push({
      kind: "fact",
      title: f.fact,
      description: `Sourced water fact in the ${f.category} category.`,
      href: `/facts#fact-${i + 1}`,
      meta: f.category,
    });
  }

  // Foundation pages
  out.push(...STATIC_PAGES);

  return out;
}
