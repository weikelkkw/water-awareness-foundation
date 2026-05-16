import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { STATES } from "@/lib/states";

export const metadata = {
  title: "Browse by state",
  description:
    "State-by-state water profiles for all 50 U.S. states — top contaminants of concern, source-water mix, key utilities, and recent news.",
};

const TOTAL_POP = STATES.reduce((sum, s) => sum + s.population, 0);
const TOTAL_UTILS = STATES.reduce((sum, s) => sum + s.utilityCount, 0);
const TOTAL_FLAGSHIP = STATES.filter((s) => s.flagshipStory).length;

const REGIONS: { label: string; states: string[] }[] = [
  {
    label: "Northeast",
    states: [
      "connecticut",
      "maine",
      "massachusetts",
      "new-hampshire",
      "new-jersey",
      "new-york",
      "pennsylvania",
      "rhode-island",
      "vermont",
    ],
  },
  {
    label: "Midwest",
    states: [
      "illinois",
      "indiana",
      "iowa",
      "kansas",
      "michigan",
      "minnesota",
      "missouri",
      "nebraska",
      "north-dakota",
      "ohio",
      "south-dakota",
      "wisconsin",
    ],
  },
  {
    label: "South",
    states: [
      "alabama",
      "arkansas",
      "delaware",
      "florida",
      "georgia",
      "kentucky",
      "louisiana",
      "maryland",
      "mississippi",
      "north-carolina",
      "oklahoma",
      "south-carolina",
      "tennessee",
      "texas",
      "virginia",
      "west-virginia",
    ],
  },
  {
    label: "West",
    states: [
      "alaska",
      "arizona",
      "california",
      "colorado",
      "hawaii",
      "idaho",
      "montana",
      "nevada",
      "new-mexico",
      "oregon",
      "utah",
      "washington",
      "wyoming",
    ],
  },
];

export default function WaterIndexPage() {
  const bySlug = new Map(STATES.map((s) => [s.slug, s]));

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow className="text-brass-300">Browse by state</Eyebrow>
            </div>
            <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
              Water in
              <em className="not-italic italic font-light text-cyan-300"> all fifty states.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              Every state has its own water story — geology, infrastructure
              age, industrial legacy, and regulatory posture. Start with the
              state-level profile, then drill into your specific utility.
            </p>
          </div>

          {/* Stats ribbon */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            <HeroStat label="States profiled" value={String(STATES.length)} accent />
            <HeroStat
              label="Population covered"
              value={`${(TOTAL_POP / 1_000_000).toFixed(0)}M`}
            />
            <HeroStat
              label="Public water systems"
              value={TOTAL_UTILS.toLocaleString()}
            />
            <HeroStat
              label="Flagship water stories"
              value={String(TOTAL_FLAGSHIP)}
            />
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* REGIONS                                                      */}
      {/* ============================================================ */}
      {REGIONS.map((region, i) => {
        const tinted = i % 2 === 1;
        return (
          <Section
            key={region.label}
            className={
              "relative py-16 overflow-hidden " +
              (tinted
                ? "bg-ocean-50/40 border-y border-ocean-100/50"
                : "bg-canvas")
            }
          >
            {!tinted && <BodyAtmosphere variant="mixed" />}
            <Container className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-brass-400/70" />
                <Eyebrow>{region.label}</Eyebrow>
                <span className="text-xs text-muted font-mono">
                  {String(region.states.length).padStart(2, "0")} states
                </span>
              </div>
              <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
                The {region.label.toLowerCase()}.
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {region.states.map((slug) => {
                  const s = bySlug.get(slug);
                  if (!s) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/water/${slug}`}
                      className="group relative block rounded-2xl border border-line bg-white p-6 shadow-soft hover:shadow-lift hover:border-cyan-300/60 transition-all overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
                            {s.abbreviation}
                          </div>
                          <h3 className="font-serif text-2xl text-ocean-700 group-hover:text-cyan-600 transition-colors leading-tight">
                            {s.name}
                          </h3>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 text-muted group-hover:text-cyan-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                        <MapPin className="h-3 w-3" />
                        {s.majorCities[0]}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.topContaminants.slice(0, 3).map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center px-2 py-0.5 rounded-full bg-canvas border border-line text-[10px] uppercase tracking-[0.18em] text-ink/65 font-bold"
                          >
                            {c.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}

function HeroStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "p-5 md:p-6 " + (accent ? "bg-cyan-500/15" : "bg-white/[0.04]")
      }
    >
      <div
        className={
          "text-[10px] uppercase tracking-[0.18em] font-bold mb-2 " +
          (accent ? "text-cyan-200" : "text-brass-300/90")
        }
      >
        {label}
      </div>
      <div
        className={
          "font-serif text-3xl md:text-4xl font-light leading-none " +
          (accent ? "text-cyan-200" : "text-white")
        }
      >
        {value}
      </div>
    </div>
  );
}
