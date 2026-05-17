import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { USMap } from "@/components/water/USMap";
import { STATES, type StateProfile } from "@/lib/states";

export const metadata = {
  title: "Browse by state",
  description:
    "State-by-state water profiles for all 50 U.S. states — top contaminants of concern, source-water mix, key utilities, and recent news.",
};

const TOTAL_POP = STATES.reduce((sum, s) => sum + s.population, 0);
const TOTAL_UTILS = STATES.reduce((sum, s) => sum + s.utilityCount, 0);
const TOTAL_FLAGSHIP = STATES.filter((s) => s.flagshipStory).length;

const REGION_TAGLINES: Record<string, string> = {
  Northeast:
    "Aging colonial-era service lines, NYC's unfiltered Catskill watershed, and the original Saint-Gobain PFAS communities that put the chemical class on the national map.",
  Midwest:
    "The Great Lakes and Mississippi corridor share the regulatory stage with Ogallala depletion and the most-cited U.S. water crisis — Flint.",
  South:
    "Florida's Floridan aquifer and Texas's Edwards Aquifer at the geological extremes; Chemours Cape Fear PFAS, Cancer Alley refineries, and Jackson's emergency reform in between.",
  West:
    "Megadrought reshapes everything from Phoenix to the Colorado River compact. Military firefighting-foam PFAS in Colorado, Utah, Washington, New Mexico — plus Hawaii's volcanic exception to almost every U.S. water pattern.",
};

type ConcernTier = "ok" | "elevated" | "high" | "severe";

interface ConcernStyle {
  stripe: string;
  wash: string;
  chipText: string;
  dotBg: string;
  label: string;
}

const CONCERN_STYLE: Record<ConcernTier, ConcernStyle> = {
  ok: {
    stripe: "from-cyan-300/0 via-cyan-400 to-cyan-300/0",
    wash: "from-cyan-50/50 via-white to-white",
    chipText: "text-cyan-700",
    dotBg: "bg-cyan-400",
    label: "Moderate concern",
  },
  elevated: {
    stripe: "from-amber-300/0 via-amber-400 to-amber-300/0",
    wash: "from-amber-50/50 via-white to-white",
    chipText: "text-amber-600",
    dotBg: "bg-amber-400",
    label: "Elevated concern",
  },
  high: {
    stripe: "from-orange-300/0 via-orange-500 to-orange-300/0",
    wash: "from-orange-50/40 via-white to-white",
    chipText: "text-orange-600",
    dotBg: "bg-orange-500",
    label: "High concern",
  },
  severe: {
    stripe: "from-red-400/0 via-red-500 to-red-400/0",
    wash: "from-red-50/40 via-white to-white",
    chipText: "text-red-600",
    dotBg: "bg-red-500",
    label: "Severe concern",
  },
};

function concernTier(state: StateProfile): ConcernTier {
  const count = state.topContaminants.length;
  const flagship = !!state.flagshipStory;
  if (count >= 5 || (count >= 4 && flagship)) return "severe";
  if (count >= 4 || (count >= 3 && flagship)) return "high";
  if (count >= 3) return "elevated";
  return "ok";
}

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
      {/* INTERACTIVE MAP                                              */}
      {/* ============================================================ */}
      <Section className="relative py-16 md:py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>The map</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              The national picture, at a glance.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed">
              States colored by the count of EWG-flagged contaminants and the
              presence of a flagship regional water story. Hover to see top
              concerns; click to open the state profile.
            </p>
          </div>
          <USMap />
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* REGIONS                                                      */}
      {/* ============================================================ */}
      {REGIONS.map((region, i) => {
        const tinted = i % 2 === 1;
        return (
          <Section
            key={region.label}
            className={
              "relative py-20 overflow-hidden " +
              (tinted
                ? "bg-ocean-50/40 border-y border-ocean-100/50"
                : "bg-canvas")
            }
          >
            {!tinted && <BodyAtmosphere variant="mixed" />}
            <Container className="relative">
              <div className="max-w-3xl mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-400/70" />
                  <Eyebrow>{region.label}</Eyebrow>
                  <span className="text-xs text-muted font-mono">
                    {String(region.states.length).padStart(2, "0")} states
                  </span>
                </div>
                <h2 className="display text-display-md text-ocean-700 mb-4 text-balance leading-[1.05]">
                  The {region.label.toLowerCase()}.
                </h2>
                <p className="text-lg text-ink/75 leading-relaxed">
                  {REGION_TAGLINES[region.label]}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {region.states.map((slug, stateIdx) => {
                  const s = bySlug.get(slug);
                  if (!s) return null;
                  const tier = concernTier(s);
                  const style = CONCERN_STYLE[tier];
                  return (
                    <Link
                      key={slug}
                      href={`/water/${slug}`}
                      className="group relative block rounded-3xl border border-line bg-white shadow-soft hover:shadow-lift hover:border-cyan-300/60 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                      {/* Concern stripe — always visible */}
                      <span
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.stripe} opacity-90`}
                      />
                      {/* Subtle concern wash that intensifies on hover */}
                      <span
                        className={`absolute inset-0 bg-gradient-to-br ${style.wash} opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />
                      {/* Serial-number watermark — magazine-cover feel */}
                      <span
                        aria-hidden
                        className="absolute -top-3 -right-1 font-serif text-[140px] leading-none text-ocean-700/[0.04] pointer-events-none select-none font-light"
                      >
                        {String(stateIdx + 1).padStart(2, "0")}
                      </span>

                      <div className="relative p-7 md:p-8">
                        {/* Header row: big abbreviation + flagship badge + arrow */}
                        <div className="flex items-start justify-between gap-3 mb-5">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="display text-5xl md:text-6xl text-ocean-700 font-light leading-none">
                              {s.abbreviation}
                            </div>
                            {s.flagshipStory && (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-100 text-[9px] uppercase tracking-[0.22em] text-red-600 font-bold">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                                </span>
                                Flagship
                              </span>
                            )}
                          </div>
                          <ArrowUpRight
                            className="h-4 w-4 text-muted group-hover:text-cyan-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2"
                            strokeWidth={2.5}
                          />
                        </div>

                        {/* State name */}
                        <h3 className="font-serif text-2xl md:text-3xl text-ocean-700 group-hover:text-cyan-600 transition-colors leading-tight mb-2 text-balance">
                          {s.name}
                        </h3>

                        {/* Major cities — italic serif */}
                        <p className="text-[13px] text-muted italic font-serif mb-6 leading-snug">
                          {s.majorCities.slice(0, 3).join(" · ")}
                        </p>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 gap-3 mb-6 pb-5 border-b border-line/70">
                          <div>
                            <div className="text-[9px] uppercase tracking-[0.22em] text-muted font-bold mb-1.5">
                              Served
                            </div>
                            <div className="font-serif text-lg text-ocean-700 leading-none">
                              {s.servedPopulation
                                ? `${(s.servedPopulation / 1_000_000).toFixed(1)}M`
                                : "—"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-[0.22em] text-muted font-bold mb-1.5">
                              Systems
                            </div>
                            <div className="font-serif text-lg text-ocean-700 leading-none">
                              {s.utilityCount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Concern indicator + top contaminants */}
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${style.dotBg}`}
                            />
                            <span
                              className={`text-[10px] uppercase tracking-[0.22em] font-bold ${style.chipText}`}
                            >
                              {style.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {s.topContaminants.slice(0, 3).map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-line text-[10px] uppercase tracking-[0.15em] text-ink/65 font-bold"
                              >
                                {c.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
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
