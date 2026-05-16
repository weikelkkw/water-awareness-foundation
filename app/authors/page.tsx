import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { AUTHORS } from "@/lib/authors";

export const metadata = {
  title: "Authors & Reviewers",
  description:
    "The people behind the Water Awareness Foundation's editorial work.",
};

export default function AuthorsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">Authors & Reviewers</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            The people who
            <em className="not-italic italic font-light text-cyan-300"> stand behind</em> the work.
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            Every article on the foundation site passes through a named, reviewable
            chain of editorial and scientific responsibility before it appears
            publicly.
          </p>
        </Container>
      </section>

      <Section
        className="relative pt-14 md:pt-20 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="space-y-12">
            {AUTHORS.map((a) => (
              <article
                key={a.id}
                className="rounded-2xl border border-line bg-white p-7 md:p-10 shadow-soft"
              >
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-semibold mb-2">
                      {a.role}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 mb-1">
                      {a.name}
                    </h2>
                    {a.credentials && (
                      <p className="text-sm text-muted italic">{a.credentials}</p>
                    )}
                  </div>
                  {a.placeholder && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[10px] uppercase tracking-wider font-semibold">
                      Pending real attribution
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-ink/80 leading-relaxed">{a.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-ocean-50 border border-ocean-100 p-7 md:p-9">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow variant="muted">A note on anonymity</Eyebrow>
            </div>
            <p className="text-ink/80 leading-relaxed">
              We will publish individual reviewer identities as the foundation
              matures past the early operating period. Environmental-health
              journalism attracts more lawsuits than most reporting, and we
              would rather build a defensible review pipeline before naming
              the individuals who staff it. See{" "}
              <Link href="/about" className="text-cyan-600 hover:underline">
                /about
              </Link>{" "}
              for the foundation&apos;s broader transparency policy.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
