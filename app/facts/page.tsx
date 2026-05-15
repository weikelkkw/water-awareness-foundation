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
  "bg-white border-line",
  "bg-cyan-50/60 border-cyan-100",
  "bg-ocean-50/60 border-ocean-100",
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

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACTS.map((f, i) => {
              const src = SOURCES[f.sourceId];
              return (
                <article
                  key={i}
                  className={cn(
                    "rounded-2xl border p-7 transition-all hover:shadow-soft",
                    TONES[i % TONES.length]
                  )}
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-3">
                    {f.category}
                  </div>
                  <p className="font-serif text-lg text-ocean-700 leading-snug mb-5 text-balance">
                    {f.fact}
                  </p>
                  {src && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-600 hover:underline"
                    >
                      Source: {src.title} — {src.publisher}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
