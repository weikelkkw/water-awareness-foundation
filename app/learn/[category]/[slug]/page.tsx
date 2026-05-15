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

      <Section className="relative pt-12 pb-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24">
              <div className="eyebrow-muted mb-4">In this article</div>
              <nav className="space-y-2">
                {toc.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={
                      h.level === 2
                        ? "block text-sm text-ink/75 hover:text-ocean-700 leading-relaxed"
                        : "block text-sm pl-3 text-muted hover:text-ocean-700 leading-relaxed"
                    }
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* BODY */}
          <article className="lg:col-span-9 order-1 lg:order-2">
            <div className="prose-editorial">
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

            <div className="mt-16 rounded-3xl bg-ocean-700 text-white p-8 md:p-10">
              <Eyebrow className="mb-3 text-cyan-200">Newsletter</Eyebrow>
              <h3 className="display text-2xl md:text-3xl text-white mb-3 text-balance">
                Get one Sunday email like this — sourced, calm, no spam.
              </h3>
              <p className="text-white/80 leading-relaxed mb-6 max-w-xl">
                We send a single weekly digest summarizing what changed in U.S.
                drinking water that week. Free, one-click unsubscribe.
              </p>
              <NewsletterCapture variant="dark" pitch=" " />
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
