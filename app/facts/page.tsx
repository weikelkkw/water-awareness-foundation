import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { FACTS } from "@/lib/facts";
import { SOURCES } from "@/lib/sources";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Water Facts",
  description:
    "Curated, fully cited facts about U.S. drinking water — infrastructure, biology, contaminants, policy, and history.",
};

const TONES = [
  {
    bg: "bg-white border-line",
    stripe: "from-cyan-300/0 via-cyan-400 to-cyan-300/0",
    dot: "bg-cyan-400",
  },
  {
    bg: "bg-cyan-50/60 border-cyan-100",
    stripe: "from-cyan-300/0 via-cyan-500 to-cyan-300/0",
    dot: "bg-cyan-500",
  },
  {
    bg: "bg-ocean-50/60 border-ocean-100",
    stripe: "from-brass-300/0 via-brass-400 to-brass-300/0",
    dot: "bg-brass-400",
  },
];

export default function FactsPage() {
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
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow className="text-brass-300">Did You Know</Eyebrow>
            </div>
            <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
              <span className="display">{FACTS.length}</span>{" "}
              <em className="not-italic italic font-light text-cyan-300">sourced facts</em>{" "}
              about American water.
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              Curated to be genuinely educational, evenly split across the fun,
              the alarming, and the fascinating. Every fact below is linked back
              to a primary source on its individual card.
            </p>
          </div>
        </Container>
      </section>

      <Section
        className="relative pt-12 md:pt-16 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {FACTS.map((f, i) => {
              const src = SOURCES[f.sourceId];
              const tone = TONES[i % TONES.length];
              return (
                <article
                  key={i}
                  id={`fact-${i + 1}`}
                  className={cn(
                    "group relative rounded-3xl border p-7 md:p-8 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all overflow-hidden",
                    tone.bg
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                      tone.stripe
                    )}
                  />
                  <span
                    aria-hidden
                    className="absolute -top-3 -right-2 font-serif text-[120px] leading-none text-ocean-700/[0.05] pointer-events-none select-none font-light"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={cn(
                          "inline-block h-1.5 w-1.5 rounded-full",
                          tone.dot
                        )}
                      />
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                        {f.category}
                      </div>
                    </div>
                    <p className="font-serif text-lg md:text-xl text-ocean-700 leading-snug mb-6 text-balance">
                      {f.fact}
                    </p>
                    {src && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-cyan-600 hover:text-cyan-700 hover:underline inline-flex items-center gap-1 leading-snug"
                      >
                        Source: {src.title} — {src.publisher}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
