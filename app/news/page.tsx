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
      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <ul className="divide-y divide-line">
            {all.map((post) => (
              <li key={post.slug} className="py-8">
                <Link
                  href={`/news/${post.slug}`}
                  className="grid md:grid-cols-12 gap-6 group"
                >
                  <div className="md:col-span-3 text-sm text-muted">
                    <div>{formatDate(post.publishedAt)}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] mt-1">
                      {post.topic}
                      {post.region && ` · ${post.region}`}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-2 text-balance">
                      {post.title}
                    </h2>
                    <p className="text-ink/75 leading-relaxed">{post.description}</p>
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
