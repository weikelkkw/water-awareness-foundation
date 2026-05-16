import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { buildSearchIndex } from "@/lib/search/index";
import { SearchPageClient } from "./SearchPageClient";

export const metadata = {
  title: "Search the foundation",
  description:
    "Search every contaminant, article, news post, fact, and foundation page in one place.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const index = buildSearchIndex();
  const initialQuery = (searchParams.q ?? "").trim();

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-12 md:pb-16">
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
            <Eyebrow className="text-brass-300">Search</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-4 text-balance leading-[1.02]">
            Search the
            <em className="not-italic italic font-light text-cyan-300"> foundation.</em>
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic max-w-2xl">
            Every contaminant, article, news post, fact, and foundation page —
            in one place. Press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[11px] font-mono text-white not-italic">
              ⌘ K
            </kbd>{" "}
            from anywhere to open it again.
          </p>
        </Container>
      </section>

      <Section
        className="relative pt-12 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <SearchPageClient index={index} initialQuery={initialQuery} />
        </Container>
      </Section>
    </>
  );
}
