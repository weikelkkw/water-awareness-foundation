import type { MetadataRoute } from "next";
import { CONTAMINANTS } from "@/lib/contaminants";
import { getAllSlugs } from "@/lib/content/mdx";
import { getAllNewsSlugs } from "@/lib/content/news";
import { STATES } from "@/lib/states";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://waterawarenessfoundation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const fixed = [
    "",
    "/about",
    "/methodology",
    "/newsletter",
    "/report",
    "/compare",
    "/learn",
    "/explore",
    "/water",
    "/your-water-file",
    "/news",
    "/facts",
    "/authors",
    "/press",
    "/transparency",
    "/donate",
    "/search",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const contaminants = CONTAMINANTS.map((c) => ({
    url: `${BASE}/explore/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articles = getAllSlugs().map(({ category, slug }) => ({
    url: `${BASE}/learn/${category}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const news = getAllNewsSlugs().map((slug) => ({
    url: `${BASE}/news/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const states = STATES.map((s) => ({
    url: `${BASE}/water/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...fixed, ...contaminants, ...articles, ...news, ...states];
}
