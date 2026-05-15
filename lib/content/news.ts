import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export interface NewsFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  region?: string;
  topic: string;
  sourceUrl?: string;
  sourcePublisher?: string;
}

export interface NewsSummary extends NewsFrontmatter {
  slug: string;
}

export interface NewsPost extends NewsSummary {
  content: string;
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function normalizeDate(d: unknown): string {
  if (!d) return "";
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d);
}

export function getNewsPost(slug: string): NewsPost | null {
  const file = path.join(NEWS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as NewsFrontmatter;
  return {
    ...fm,
    publishedAt: normalizeDate(fm.publishedAt),
    slug,
    content,
  };
}

export function getAllNews(): NewsSummary[] {
  return getAllNewsSlugs()
    .map((slug) => getNewsPost(slug))
    .filter((p): p is NewsPost => !!p)
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
