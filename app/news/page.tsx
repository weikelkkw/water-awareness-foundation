import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { getAllNews } from "@/lib/content/news";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Water News",
  description:
    "Editorial summaries of recent developments in U.S. drinking water — policy, science, regional incidents — with WAF perspective.",
};

export default function NewsPage() {
  const all = getAllNews();
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
              <Eyebrow className="text-brass-300">Water News</Eyebrow>
            </div>
            <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
              Editorial coverage of
              <em className="not-italic italic font-light text-cyan-300"> what&apos;s actually changing.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              We summarize the policy and science developments that matter, link
              to the primary source, and add the foundation&apos;s honest read.
              No press releases reprinted. No clickbait headlines.
            </p>
          </div>
        </Container>
      </section>
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="grid gap-5 md:gap-6">
            {all.map((post, i) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group relative block rounded-3xl border border-line bg-white p-7 md:p-9 shadow-soft hover:shadow-lift hover:border-cyan-300/60 transition-all overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 text-sm text-muted">
                    <div className="font-serif text-3xl text-ocean-700/40 leading-none mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-ink/70">{formatDate(post.publishedAt)}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-brass-500 font-bold mt-2">
                      {post.topic}
                      {post.region && ` · ${post.region}`}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-3 text-balance leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-ink/75 leading-relaxed">{post.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
