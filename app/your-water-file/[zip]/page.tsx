import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Droplet,
  Home,
  Users,
  Printer,
  Calendar,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { getZipReport } from "@/lib/db/queries";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { zip: string };
  searchParams: { age?: string; h?: string; c?: string };
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Your Water File · ZIP ${params.zip}`,
    description: `Personalized water profile for ZIP ${params.zip}, ranked by what matters most for your household.`,
    robots: { index: false, follow: false },
  };
}

const HOUSEHOLD_LABELS: Record<string, string> = {
  kids: "Children under 6",
  pregnant: "Pregnant or trying",
  older: "Adults 65+",
  pets: "Cats or dogs",
  garden: "Indoor gardening",
  appliance: "Appliance lifespan",
};

const HOME_AGE_LABELS: Record<string, string> = {
  "pre-1986": "Built before 1986",
  "1986-2014": "Built 1986–2014",
  "after-2014": "Built after 2014",
  unknown: "Year unknown",
};

const CONCERN_TO_KEYWORDS: Record<string, string[]> = {
  lead: ["lead"],
  pfas: ["pfas", "pfoa", "pfos", "perfluoro"],
  fluoride: ["fluoride"],
  chlorine: ["chlorine", "chloramine"],
  hard: ["hardness", "calcium"],
  everything: [],
};

// Per-demographic boost: which contaminant-name keywords matter for whom
const HOUSEHOLD_BOOSTS: Record<string, { keywords: string[]; boost: number }> = {
  kids: {
    keywords: ["lead", "fluoride", "nitrate", "trihalomethane", "tthm", "pfas"],
    boost: 6,
  },
  pregnant: {
    keywords: ["lead", "pfas", "nitrate", "trihalomethane", "tthm", "perchlorate"],
    boost: 6,
  },
  older: {
    keywords: ["arsenic", "uranium", "radium", "lead"],
    boost: 4,
  },
  pets: {
    keywords: ["chlorine", "chloramine", "nitrate"],
    boost: 3,
  },
  garden: {
    keywords: ["chlorine", "chloramine", "fluoride", "boron"],
    boost: 3,
  },
  appliance: {
    keywords: ["hardness", "iron", "manganese", "chloride"],
    boost: 2,
  },
};

interface ScoredContaminant {
  name: string;
  timesAboveGuideline: number | null;
  score: number;
  reasons: string[];
}

function scoreContaminants(
  flagged: {
    name: string;
    timesAboveGuideline: number | null;
  }[],
  household: string[],
  concerns: string[]
): ScoredContaminant[] {
  return flagged
    .map<ScoredContaminant>((c) => {
      const nameLower = c.name.toLowerCase();
      let score = Math.max(1, c.timesAboveGuideline ?? 1);
      const reasons: string[] = [];

      // Severity tier
      if ((c.timesAboveGuideline ?? 0) >= 100) {
        reasons.push("Severely above guideline");
      } else if ((c.timesAboveGuideline ?? 0) >= 10) {
        reasons.push("10×+ above guideline");
      }

      // Household boosts
      for (const h of household) {
        const boost = HOUSEHOLD_BOOSTS[h];
        if (!boost) continue;
        if (boost.keywords.some((k) => nameLower.includes(k))) {
          score += boost.boost;
          reasons.push(`Priority for ${HOUSEHOLD_LABELS[h]?.toLowerCase()}`);
        }
      }

      // Explicit concerns
      for (const concern of concerns) {
        const kws = CONCERN_TO_KEYWORDS[concern] ?? [];
        if (concern === "everything") {
          score += 1;
          continue;
        }
        if (kws.some((k) => nameLower.includes(k))) {
          score += 10;
          reasons.push("You flagged this as a concern");
        }
      }

      return { ...c, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

export default async function WaterFileResultPage({
  params,
  searchParams,
}: PageProps) {
  const zip = params.zip;
  if (!/^\d{5}$/.test(zip)) notFound();

  const report = await getZipReport(zip).catch(() => null);
  const homeAge = searchParams.age ?? "unknown";
  const household = (searchParams.h ?? "").split(",").filter(Boolean);
  const concerns = (searchParams.c ?? "").split(",").filter(Boolean);

  const flagged = report?.ewg?.flagged ?? [];
  const scored = scoreContaminants(
    flagged.map((c) => ({
      name: c.name,
      timesAboveGuideline: c.timesAboveGuideline,
    })),
    household,
    concerns
  );
  const topPriority = scored.slice(0, 5);
  const remaining = scored.slice(5);

  // Personalized recommendations based on profile
  const recs = buildRecommendations(homeAge, household, scored);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-24 pb-12 md:pb-16 print:hidden">
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
          <Link
            href="/your-water-file"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Edit my file
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">Your Water File</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-4 text-balance leading-[1.02]">
            ZIP {zip}
            {report?.primary?.name && (
              <>
                {" "}
                <em className="not-italic italic font-light text-cyan-300">
                  · {report.primary.name}
                </em>
              </>
            )}
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic max-w-2xl">
            Ranked for your household. Use the print or save buttons to keep a
            copy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
            <PrintButton />
            <Link href="/your-water-file">
              <Button variant="outline" className="bg-transparent border-white/25 text-white hover:bg-white/10 hover:border-white/40">
                Start over
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Print-only header */}
      <div className="hidden print:block px-8 pt-10 pb-6 border-b border-line">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
              Water Awareness Foundation · Your Water File
            </div>
            <div className="font-serif text-3xl text-ocean-700">
              ZIP {zip} {report?.primary?.name ? `· ${report.primary.name}` : ""}
            </div>
          </div>
          <div className="text-xs text-muted text-right">
            Generated {today}
            <br />
            waterawarenessfoundation.com
          </div>
        </div>
      </div>

      <Section
        className="relative pt-12 pb-20 overflow-hidden print:pt-6 print:pb-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative space-y-8 print:space-y-4">
          {/* Profile summary */}
          <ProfileSummary
            zip={zip}
            utility={report?.primary?.name ?? "Utility lookup unavailable"}
            homeAge={HOME_AGE_LABELS[homeAge] ?? "—"}
            household={household}
            concerns={concerns}
            today={today}
          />

          {/* If no EWG data */}
          {!report?.ewg && (
            <div className="rounded-3xl bg-white border border-amber-200 p-7 md:p-10 shadow-soft">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-serif text-xl text-ocean-700 mb-2">
                    EWG hasn&apos;t sampled this utility yet
                  </h2>
                  <p className="text-ink/75 leading-relaxed text-[15px]">
                    Your file is still personalized to your household — the
                    recommendations below apply broadly. For utility-specific
                    contaminant data, we suggest checking back as EWG&apos;s
                    next sampling cycle completes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Top priority */}
          {topPriority.length > 0 && (
            <div className="rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400/0 via-red-500 to-red-400/0" />
              <div className="p-7 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-400/70" />
                  <Eyebrow>Your top priorities</Eyebrow>
                </div>
                <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
                  Ranked for who lives at your address.
                </h2>
                <p className="text-ink/75 leading-relaxed mb-8 max-w-2xl">
                  Each flagged contaminant is scored by its level above
                  EWG&apos;s health-protective guideline, plus boosts based on
                  your household profile.
                </p>
                <ol className="space-y-4">
                  {topPriority.map((c, i) => (
                    <li
                      key={c.name}
                      className="relative rounded-2xl border border-line bg-canvas/60 p-5 md:p-6 overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className="font-serif text-4xl text-ocean-700/30 leading-none w-12 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-xl md:text-2xl text-ocean-700 mb-1 leading-snug">
                            {c.name}
                          </h3>
                          {(c.timesAboveGuideline ?? 0) > 0 && (
                            <div className="text-sm text-red-600 font-medium mb-2">
                              {c.timesAboveGuideline}× above EWG&apos;s
                              health-protective guideline
                            </div>
                          )}
                          {c.reasons.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {Array.from(new Set(c.reasons)).map((r) => (
                                <span
                                  key={r}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-brass-50 border border-brass-200 text-[10px] uppercase tracking-[0.15em] text-brass-600 font-bold"
                                >
                                  {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-brass-400/70" />
                <Eyebrow>What to do</Eyebrow>
              </div>
              <h2 className="display text-display-md text-ocean-700 mb-6 text-balance leading-[1.05]">
                Concrete next steps for your household.
              </h2>
              <ul className="space-y-4">
                {recs.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-base text-ink/85 leading-relaxed"
                  >
                    <span className="mt-2 flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm">
                      {i + 1}
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Remaining flagged */}
          {remaining.length > 0 && (
            <div className="rounded-3xl bg-white border border-line p-7 md:p-10 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-brass-400/70" />
                <Eyebrow>Also flagged</Eyebrow>
              </div>
              <h3 className="font-serif text-2xl text-ocean-700 mb-5">
                Other contaminants above the EWG guideline in your utility.
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {remaining.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between gap-3 py-1.5 border-b border-line/70 last:border-0"
                  >
                    <span className="font-serif text-base text-ocean-700 truncate">
                      {c.name}
                    </span>
                    {(c.timesAboveGuideline ?? 0) > 0 && (
                      <span className="text-xs text-amber-600 font-medium flex-shrink-0">
                        {c.timesAboveGuideline}× guideline
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="rounded-2xl bg-canvas border border-line p-5 md:p-6 text-xs text-muted leading-relaxed">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div>
                Data sourced from EWG&apos;s Tap Water Database and EPA SDWIS,
                cross-referenced with the foundation&apos;s contaminant
                registry. Rankings reflect your household profile and are not
                a substitute for a certified at-home water test. See{" "}
                <Link
                  href="/methodology"
                  className="text-cyan-600 hover:underline"
                >
                  methodology
                </Link>{" "}
                for the full sourcing. Your profile is not stored.
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ProfileSummary({
  zip,
  utility,
  homeAge,
  household,
  concerns,
  today,
}: {
  zip: string;
  utility: string;
  homeAge: string;
  household: string[];
  concerns: string[];
  today: string;
}) {
  return (
    <div className="rounded-3xl bg-white shadow-lift border border-line p-7 md:p-10 relative overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
      <div className="flex items-center gap-3 mb-5">
        <span className="h-px w-10 bg-brass-400/70" />
        <Eyebrow>Your profile</Eyebrow>
        <span className="ml-auto text-xs text-muted flex items-center gap-1 print:hidden">
          <Calendar className="h-3 w-3" />
          {today}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <ProfileTile icon={Droplet} label="ZIP" value={zip} />
        <ProfileTile icon={Home} label="Home age" value={homeAge} />
        <ProfileTile
          icon={Users}
          label="Household"
          value={
            household.length > 0
              ? household.map((h) => HOUSEHOLD_LABELS[h] ?? h).join(" · ")
              : "Not specified"
          }
        />
        <ProfileTile
          icon={BookOpen}
          label="Concerns"
          value={
            concerns.length > 0
              ? concerns.map((c) => c.toUpperCase()).join(" · ")
              : "None specified"
          }
        />
      </div>
      <div className="mt-5 text-xs text-muted">
        Serving: <span className="text-ink/80">{utility}</span>
      </div>
    </div>
  );
}

function ProfileTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Droplet;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-canvas border border-line p-4">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 mb-2">
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-1">
        {label}
      </div>
      <div className="font-serif text-sm text-ocean-700 leading-tight">
        {value}
      </div>
    </div>
  );
}

function buildRecommendations(
  homeAge: string,
  household: string[],
  scored: ScoredContaminant[]
): string[] {
  const recs: string[] = [];

  // Lead-pipe recommendation
  if (homeAge === "pre-1986" || homeAge === "unknown") {
    recs.push(
      "Your home likely predates the 1986 ban on lead solder. Run the cold tap for 30 seconds before drinking after any period of stagnation. Use only cold water for cooking and infant formula. Consider a NSF/ANSI 53 certified carbon filter for lead specifically — pitcher filters labeled \"lead reduction\" are the cheapest path."
    );
  }

  // Kids / pregnancy
  if (household.includes("kids") || household.includes("pregnant")) {
    recs.push(
      "If you have kids under 6 or are pregnant, a certified at-home tap test is worth $30–80 once. State health departments maintain lists of certified labs. The result is dramatically more reliable than any utility-level report for your specific tap."
    );
  }

  // PFAS in flagged list
  const hasPfas = scored.some((c) =>
    /pfas|pfoa|pfos|perfluoro/i.test(c.name)
  );
  if (hasPfas) {
    recs.push(
      "PFAS is flagged at your utility. For removal, look for NSF/ANSI P473 or NSF/ANSI 53 certification specifically listing PFOA/PFOS reduction — most generic carbon filters do NOT remove PFAS. Reverse osmosis is the most reliable home-scale solution."
    );
  }

  // Pets
  if (household.includes("pets")) {
    recs.push(
      "For pets: most municipal chlorine and chloramine levels are fine for cats and dogs, but if your dog drinks unusually large volumes, an inexpensive carbon filter pitcher noticeably improves taste and removes most chloramine. Aquarium tanks (fish) require dechlorination — chloramine is lethal."
    );
  }

  // Garden
  if (household.includes("garden")) {
    recs.push(
      "For indoor plants: chlorine evaporates from water left in an open container for 24 hours. Chloramine does not — it requires carbon filtration or a small dose of dechlorinator. Sensitive species (spider plants, dracaena, prayer plants) are notably damaged by fluoride above ~1 mg/L."
    );
  }

  // Always: get the foundation in your inbox
  if (recs.length < 4) {
    recs.push(
      "Subscribe to the foundation's Sunday newsletter to get notified when regulators change a contaminant limit that affects your utility, or when a new sampling cycle changes the data in this file."
    );
  }

  // Always: deep-dive link
  recs.push(
    "Read the full deep-dives on the contaminants above. Each one explains the science, the regulation, and exactly which filter types work."
  );

  return recs;
}
