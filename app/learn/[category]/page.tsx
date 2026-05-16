import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import {
  CATEGORY_META,
  getArticlesByCategory,
  type Category,
} from "@/lib/content/mdx";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { formatDate } from "@/lib/utils";

const VALID: Category[] = ["contaminants", "health", "demographic", "solutions", "policy"];

export function generateStaticParams() {
  return VALID.map((c) => ({ category: c }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const cat = params.category as Category;
  if (!VALID.includes(cat)) return {};
  return {
    title: CATEGORY_META[cat].title,
    description: CATEGORY_META[cat].tagline,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = params.category as Category;
  if (!VALID.includes(cat)) notFound();
  const articles = getArticlesByCategory(cat);
  const meta = CATEGORY_META[cat];

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.45), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> The Library
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">{meta.eyebrow}</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            {meta.title}
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl font-serif italic">
            {meta.tagline}
          </p>
        </Container>
      </section>

      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          {articles.length === 0 ? (
            <p className="text-ink/70">No published articles in this section yet.</p>
          ) : (
            <div className="grid gap-5 md:gap-6">
              {articles.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/learn/${cat}/${a.slug}`}
                  className="group relative block rounded-3xl border border-line bg-white p-7 md:p-9 shadow-soft hover:shadow-lift hover:border-cyan-300/60 transition-all overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-3 text-sm text-muted">
                      <div className="font-serif text-3xl text-ocean-700/40 leading-none mb-3">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" /> {a.readingTime} min read
                      </div>
                      <div className="mt-1">{formatDate(a.publishedAt)}</div>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-3 text-balance leading-snug">
                        {a.title}
                      </h2>
                      <p className="text-ink/75 leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
