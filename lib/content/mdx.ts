import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Category =
  | "contaminants"
  | "health"
  | "demographic"
  | "solutions"
  | "policy";

export const CATEGORY_META: Record<
  Category,
  { title: string; tagline: string; eyebrow: string }
> = {
  contaminants: {
    title: "Contaminants Explained",
    tagline:
      "Deep dives on the chemicals worth understanding — what they are, what they do, and where the science is genuinely settled vs. genuinely uncertain.",
    eyebrow: "Contaminants",
  },
  health: {
    title: "Health Effects",
    tagline:
      "What chronic exposure to water contaminants does to the gut, skin, hormones, and developing brains — written without the wellness-industry hype.",
    eyebrow: "Health",
  },
  demographic: {
    title: "Demographic Impact",
    tagline:
      "Water doesn't affect everyone the same way. Tailored explainers for children, pregnancy, pets, indoor gardeners, and aging adults.",
    eyebrow: "Demographic",
  },
  solutions: {
    title: "Solutions & Filtration",
    tagline:
      "Filter types, certifications, and bottled-water marketing translated into what actually does what — without endorsing any specific brand.",
    eyebrow: "Solutions",
  },
  policy: {
    title: "Policy & History",
    tagline:
      "The Safe Drinking Water Act, Flint, EPA vs. EWG standards, and what the new 2024 rules actually change. Plain-English regulatory journalism.",
    eyebrow: "Policy",
  },
};

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: Category;
  publishedAt: string;
  updatedAt?: string;
  reviewedBy?: string;
  heroImage?: string;
  heroCredit?: string;
  readingTime?: number;
  draft?: boolean;
}

export interface ArticleSummary extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleSummary {
  content: string;
}

export function getAllSlugs(): { category: Category; slug: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const out: { category: Category; slug: string }[] = [];
  for (const cat of fs.readdirSync(ARTICLES_DIR)) {
    const dir = path.join(ARTICLES_DIR, cat);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".mdx")) continue;
      out.push({
        category: cat as Category,
        slug: f.replace(/\.mdx$/, ""),
      });
    }
  }
  return out;
}

function normalizeDate(d: unknown): string {
  if (!d) return "";
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d);
}

export function getArticle(category: Category, slug: string): Article | null {
  const file = path.join(ARTICLES_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  if (fm.draft) return null;

  const words = content.trim().split(/\s+/).length;
  const readingTime = fm.readingTime ?? Math.max(1, Math.round(words / 230));

  return {
    ...fm,
    publishedAt: normalizeDate(fm.publishedAt),
    updatedAt: fm.updatedAt ? normalizeDate(fm.updatedAt) : undefined,
    readingTime,
    slug,
    content,
  };
}

export function getArticlesByCategory(category: Category): ArticleSummary[] {
  return getAllSlugs()
    .filter((s) => s.category === category)
    .map((s) => getArticle(s.category, s.slug))
    .filter((a): a is Article => !!a)
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function getAllArticles(): ArticleSummary[] {
  return getAllSlugs()
    .map((s) => getArticle(s.category, s.slug))
    .filter((a): a is Article => !!a)
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

/**
 * Extract H2 headings from MDX source for the sticky table of contents.
 * Returns [{ id, text }] in document order.
 */
export function extractToc(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level: m[1].length });
    }
  }
  return headings;
}
