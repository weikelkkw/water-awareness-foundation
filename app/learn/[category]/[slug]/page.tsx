import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import {
  CATEGORY_META,
  extractToc,
  getAllSlugs,
  getArticle,
  type Category,
} from "@/lib/content/mdx";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/water/MdxComponents";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export function generateStaticParams() {
  return getAllSlugs();
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const a = getArticle(params.category as Category, params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const cat = params.category as Category;
  const a = getArticle(cat, params.slug);
  if (!a) notFound();

  const toc = extractToc(a.content);
  const meta = CATEGORY_META[cat];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: {
      "@type": "Organization",
      name: "Water Awareness Foundation",
    },
    publisher: {
      "@type": "Organization",
      name: "Water Awareness Foundation",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-24 bg-midnight text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.55), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative">
          <Link
            href={`/learn/${cat}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {meta.title}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">{meta.eyebrow}</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-7 text-balance leading-[1.02]">
            {a.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed text-pretty font-serif italic">
            {a.description}
          </p>
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> {a.readingTime} min read
            </span>
            <span>Published {formatDate(a.publishedAt)}</span>
            {a.updatedAt && <span>Updated {formatDate(a.updatedAt)}</span>}
            {a.reviewedBy && (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
                Reviewed by {a.reviewedBy}
              </span>
            )}
          </div>
        </Container>
      </section>

      {a.heroImage && (
        <figure className="relative bg-midnight">
          <div className="relative h-[44vw] max-h-[520px] min-h-[260px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.heroImage}
              alt={a.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/0 to-midnight/40" />
          </div>
          {a.heroCredit && (
            <figcaption className="absolute bottom-2 right-3 text-[11px] tracking-wide text-white/65 mix-blend-luminosity">
              {a.heroCredit}
            </figcaption>
          )}
        </figure>
      )}

      <Section
        className="relative pt-16 md:pt-20 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-10">
          {/* TOC sidebar — premium card */}
          <aside className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-5">
              {/* Article meta card */}
              <div className="rounded-2xl border border-line bg-white/85 backdrop-blur p-5 shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-3">
                  Reading
                </div>
                <div className="flex items-center gap-1.5 text-sm text-ink/80 mb-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-cyan-500" />
                  {a.readingTime} min read
                </div>
                <div className="text-xs text-muted leading-relaxed">
                  Published {formatDate(a.publishedAt)}
                  {a.updatedAt && (
                    <>
                      <br />
                      Updated {formatDate(a.updatedAt)}
                    </>
                  )}
                </div>
                {a.reviewedBy && (
                  <div className="mt-3 pt-3 border-t border-line/70 flex items-start gap-1.5 text-xs text-ink/75">
                    <ShieldCheck className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Reviewed by {a.reviewedBy}
                    </span>
                  </div>
                )}
              </div>

              {/* TOC */}
              <div className="rounded-2xl border border-line bg-white/85 backdrop-blur p-5 shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-4 flex items-center gap-2">
                  <span className="h-px w-6 bg-brass-300" />
                  In this article
                </div>
                <nav className="space-y-2.5">
                  {toc.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={
                        h.level === 2
                          ? "group flex items-start gap-2 text-sm text-ink/75 hover:text-ocean-700 leading-snug transition-colors"
                          : "group flex items-start gap-2 text-sm pl-4 text-muted hover:text-ocean-700 leading-snug transition-colors"
                      }
                    >
                      {h.level === 2 && (
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brass-300/70 group-hover:bg-brass-500 transition-colors flex-shrink-0" />
                      )}
                      <span>{h.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* BODY — paper card */}
          <article className="lg:col-span-9 order-1 lg:order-2">
            <div className="relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
              {/* Subtle brass top accent */}
              <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
              <div className="prose-editorial px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-16">
                <MDXRemote
                  source={a.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug],
                    },
                  }}
                />
              </div>
            </div>

            <div className="mt-10 relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                  }}
                />
              </div>
              <div className="relative">
                <Eyebrow className="mb-3 text-cyan-200">Newsletter</Eyebrow>
                <h3 className="display text-2xl md:text-3xl text-white mb-3 text-balance leading-[1.1]">
                  Get one Sunday email like this — sourced, calm, no spam.
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 max-w-xl font-serif italic">
                  We send a single weekly digest summarizing what changed in U.S.
                  drinking water that week. Free, one-click unsubscribe.
                </p>
                <NewsletterCapture variant="dark" pitch=" " />
              </div>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
