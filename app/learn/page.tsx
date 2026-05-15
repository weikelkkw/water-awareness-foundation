import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import {
  CATEGORY_META,
  getAllArticles,
  getArticlesByCategory,
  type Category,
} from "@/lib/content/mdx";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "The Library",
  description:
    "Long-form, deeply sourced articles on drinking water contaminants, health effects, filtration, and policy.",
};

const ORDER: Category[] = [
  "contaminants",
  "health",
  "demographic",
  "solutions",
  "policy",
];

export default function LearnPage() {
  const all = getAllArticles();
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow className="text-brass-300">The Library</Eyebrow>
            </div>
            <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
              Long reads on what&apos;s in your water —
              <em className="not-italic italic font-light text-cyan-300"> and what to do about it.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              Pillar articles written to be the last thing you have to read on
              each topic. Every claim cites a primary source. Every article is
              dated and updated as the science moves.
            </p>
          </div>
        </Container>
      </section>

      {ORDER.map((cat) => {
        const articles = getArticlesByCategory(cat);
        const meta = CATEGORY_META[cat];
        if (articles.length === 0) return null;
        return (
          <Section key={cat} className="py-16 bg-canvas even:bg-ocean-wash even:border-y even:border-ocean-100/50">
            <Container>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <Eyebrow className="mb-3">{meta.eyebrow}</Eyebrow>
                  <h2 className="display text-display-md text-ocean-700 mb-4 text-balance">
                    {meta.title}
                  </h2>
                  <p className="text-lg text-ink/75 leading-relaxed">{meta.tagline}</p>
                </div>
                <Link
                  href={`/learn/${cat}`}
                  className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 font-medium whitespace-nowrap"
                >
                  All {meta.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {articles.slice(0, 3).map((a) => (
                  <ArticleCard key={a.slug} category={cat} article={a} />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">Most recent</Eyebrow>
            <h2 className="display text-display-md text-ocean-700 mb-4 text-balance">
              Latest from the Library.
            </h2>
          </div>
          <ul className="mt-10 divide-y divide-line">
            {all.slice(0, 8).map((a) => (
              <li key={a.slug} className="py-6">
                <Link
                  href={`/learn/${a.category}/${a.slug}`}
                  className="grid md:grid-cols-12 gap-6 group"
                >
                  <div className="md:col-span-3 text-sm text-muted">
                    <div>{formatDate(a.publishedAt)}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] mt-1">
                      {CATEGORY_META[a.category].eyebrow}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-2xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-1 text-balance">
                      {a.title}
                    </h3>
                    <p className="text-ink/75 leading-relaxed">{a.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

function ArticleCard({
  category,
  article,
}: {
  category: Category;
  article: ReturnType<typeof getAllArticles>[number];
}) {
  return (
    <Link
      href={`/learn/${category}/${article.slug}`}
      className="group block rounded-2xl border border-line bg-white p-7 hover:border-cyan-300 hover:shadow-lift transition-all"
    >
      <div className="flex items-center gap-2 text-xs text-muted mb-3">
        <BookOpen className="h-3.5 w-3.5" />
        <span>{article.readingTime} min read</span>
        <span>·</span>
        <span>{formatDate(article.publishedAt, { year: "numeric", month: "short", day: "numeric" })}</span>
      </div>
      <h3 className="font-serif text-xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-2 text-balance">
        {article.title}
      </h3>
      <p className="text-[15px] text-ink/75 leading-relaxed line-clamp-3">
        {article.description}
      </p>
    </Link>
  );
}
