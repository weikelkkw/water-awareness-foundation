import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { getAllNewsSlugs, getNewsPost } from "@/lib/content/news";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/water/MdxComponents";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getNewsPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default function NewsPost({ params }: { params: { slug: string } }) {
  const post = getNewsPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-24 pb-14 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.45), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All news
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">
              {post.topic}{post.region && ` · ${post.region}`}
            </Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-serif italic">{post.description}</p>
          <div className="mt-8 text-sm text-white/55">{formatDate(post.publishedAt)}</div>
        </Container>
      </section>
      <Section className="relative pt-10 pb-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <article className="prose-editorial">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>
          {post.sourceUrl && (
            <div className="mt-10 rounded-2xl border border-line bg-ocean-50 p-5 text-sm">
              <span className="text-muted">Primary source: </span>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline inline-flex items-center gap-1"
              >
                {post.sourcePublisher ?? post.sourceUrl}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
