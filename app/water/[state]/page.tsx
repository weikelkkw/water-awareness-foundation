import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Building2,
  Droplet,
  AlertTriangle,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Clock,
  Landmark,
  Home,
  Filter,
  Mail,
  Waves,
  Factory,
  School,
  Wind,
  HelpCircle,
  Scroll,
  CheckCircle2,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import { ZipCodeHero } from "@/components/water/ZipCodeHero";
import { STATES, getStateBySlug } from "@/lib/states";
import { getStateExtendedBySlug } from "@/lib/states-extended";
import { getContaminant } from "@/lib/contaminants";
import { getAllNews } from "@/lib/content/news";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }) {
  const s = getStateBySlug(params.state);
  if (!s) return {};
  return {
    title: `Water in ${s.name}`,
    description: `Independent public profile of drinking water in ${s.name} — top contaminants, key utilities, regulatory posture, historical timeline, and what to do about it. Drawn from EPA SDWIS and EWG.`,
  };
}

export default function StatePage({
  params,
}: {
  params: { state: string };
}) {
  const s = getStateBySlug(params.state);
  if (!s) notFound();

  const ext = getStateExtendedBySlug(params.state);

  const contaminants = s.topContaminants
    .map((slug) => getContaminant(slug))
    .filter((c): c is NonNullable<ReturnType<typeof getContaminant>> => !!c);

  const stateNews = getAllNews().filter(
    (n) => n.region === s.name || n.region === s.abbreviation
  );

  // Max population for utility bar scaling
  const maxUtilityPop = Math.max(
    1,
    ...(s.notableUtilities?.map((u) => u.populationServed) ?? [1])
  );

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-24">
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
        <Container size="tight" className="relative">
          <Link
            href="/water"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All states
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">
              State profile · {s.abbreviation}
            </Eyebrow>
          </div>
          <h1 className="display text-display-xl text-white mb-6 text-balance leading-[0.98]">
            Water in{" "}
            <em className="not-italic italic font-light text-cyan-300">
              {s.name}.
            </em>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-serif italic max-w-3xl">
            {s.context}
          </p>

          {/* In-hero ZIP CTA — primary above-the-fold action */}
          <div className="mt-10">
            <div className="rounded-3xl bg-white/95 backdrop-blur p-5 md:p-6 shadow-lift relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0" />
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                Live {s.name} ZIP lookup
              </div>
              <ZipCodeHero />
            </div>
          </div>

          {/* State stats strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            <DarkStat
              icon={<Users className="h-4 w-4" />}
              label="State population"
              value={`${(s.population / 1_000_000).toFixed(1)}M`}
            />
            <DarkStat
              icon={<Building2 className="h-4 w-4" />}
              label="Public water systems"
              value={s.utilityCount.toLocaleString()}
            />
            <DarkStat
              icon={<Droplet className="h-4 w-4" />}
              label="Served by PWS"
              value={
                s.servedPopulation
                  ? `${(s.servedPopulation / 1_000_000).toFixed(1)}M`
                  : "—"
              }
              accent
            />
            <DarkStat
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Top concerns"
              value={String(s.topContaminants.length)}
            />
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* FLAGSHIP STORY (if any)                                      */}
      {/* ============================================================ */}
      {s.flagshipStory && (
        <Section className="relative py-14 md:py-16 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="relative rounded-3xl bg-white border border-line shadow-lift p-8 md:p-12 overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400/0 via-red-500 to-red-400/0" />
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] uppercase tracking-[0.22em] font-bold">
                  <AlertTriangle className="h-3 w-3" /> Flagship story
                </span>
              </div>
              <p className="display text-2xl md:text-3xl text-ocean-700 leading-snug text-balance">
                {s.flagshipStory}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* REGULATORY POSTURE + STATE REGULATOR                         */}
      {/* ============================================================ */}
      {(s.regulatoryPosture || s.regulator) && (
        <Section className="relative py-16 md:py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="mixed" />
          <Container size="tight" className="relative">
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              {s.regulatoryPosture && (
                <div className="md:col-span-7 relative rounded-3xl bg-white border border-line shadow-soft p-7 md:p-10 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-300 via-ocean-500 to-ocean-300" />
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-700 mb-5">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    Regulatory posture
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 mb-4 leading-tight text-balance">
                    How {s.name} regulates drinking water.
                  </h2>
                  <p className="text-[15px] md:text-base text-ink/80 leading-relaxed">
                    {s.regulatoryPosture}
                  </p>
                </div>
              )}

              <div className="md:col-span-5 relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white shadow-lift p-7 md:p-10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute -top-1/4 -right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full blur-3xl opacity-25"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
                </div>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-300 font-bold mb-3">
                    State regulator
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-white leading-tight mb-5 text-balance">
                    {s.regulator.name}
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={s.regulator.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white group"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Visit regulator website
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    {s.regulator.complaintsUrl && (
                      <a
                        href={s.regulator.complaintsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white group"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        File a complaint
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* TIMELINE                                                     */}
      {/* ============================================================ */}
      {s.timeline && s.timeline.length > 0 && (
        <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Historical timeline</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              {s.name}&apos;s water history, in order.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed mb-12 max-w-2xl">
              The contamination events, regulatory shifts, and major
              settlements that define how this state thinks about drinking
              water today.
            </p>

            <ol className="relative space-y-6 md:space-y-7 before:absolute before:left-[15px] md:before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-brass-300 before:via-brass-400/60 before:to-brass-300/0">
              {s.timeline.map((t, i) => (
                <li
                  key={i}
                  className="relative pl-10 md:pl-16"
                >
                  <span className="absolute left-0 top-1.5 inline-flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full bg-white border-2 border-brass-300 shadow-soft">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-brass-500" />
                  </span>
                  <div className="rounded-2xl bg-white border border-line p-5 md:p-6 shadow-soft">
                    <div className="display text-2xl md:text-3xl text-ocean-700 font-light leading-none mb-2">
                      {t.year}
                    </div>
                    <p className="text-[15px] md:text-base text-ink/85 leading-relaxed">
                      {t.event}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* SOURCE WATERSHEDS — physical water bodies                    */}
      {/* ============================================================ */}
      {ext?.sourceWatersheds && ext.sourceWatersheds.length > 0 && (
        <Section className="relative py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="cyan" />
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Source watersheds</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              The actual water you drink.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed mb-10 max-w-2xl">
              The physical rivers, aquifers, lakes, and reservoirs that feed
              {" "}{s.name}&apos;s public water systems. Source quality is the
              foundation of tap quality — and where the long-term protection
              fights happen.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 md:gap-5">
              {ext.sourceWatersheds.map((w, i) => (
                <li
                  key={i}
                  className="relative rounded-2xl bg-white border border-line p-6 shadow-soft overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 flex-shrink-0">
                      <Waves className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-brass-500 font-bold">
                          {w.type}
                        </span>
                      </div>
                      <div className="font-serif text-lg text-ocean-700 leading-snug mb-1.5">
                        {w.name}
                      </div>
                      {w.notes && (
                        <p className="text-[13px] text-ink/70 leading-relaxed">
                          {w.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* SOURCE MIX + MAJOR CITIES                                    */}
      {/* ============================================================ */}
      <Section className="relative py-16 md:py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <div className="rounded-3xl bg-white border border-line p-7 md:p-8 shadow-soft relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 mb-5">
                <Droplet className="h-5 w-5" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                Where the water comes from
              </div>
              <h3 className="font-serif text-xl text-ocean-700 mb-3 leading-snug">
                Source-water mix
              </h3>
              <p className="text-[15px] text-ink/75 leading-relaxed">
                {s.primarySourceMix}
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-line p-7 md:p-8 shadow-soft relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-300 via-brass-400 to-brass-300" />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brass-50 text-brass-600 mb-5">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                Population centers
              </div>
              <h3 className="font-serif text-xl text-ocean-700 mb-3 leading-snug">
                Major cities served
              </h3>
              <p className="text-[15px] text-ink/75 leading-relaxed">
                {s.majorCities.join(" · ")}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* NOTABLE UTILITIES                                            */}
      {/* ============================================================ */}
      {s.notableUtilities && s.notableUtilities.length > 0 && (
        <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Notable utilities</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              Who actually serves the water.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed mb-10 max-w-2xl">
              The largest public water systems in {s.name} by population
              served. Click your ZIP after to see the full live EWG report
              for your specific utility.
            </p>
            <ul className="space-y-3 md:space-y-3.5">
              {s.notableUtilities.map((u, i) => {
                const widthPct = (u.populationServed / maxUtilityPop) * 100;
                return (
                  <li
                    key={i}
                    className="relative rounded-2xl bg-white border border-line shadow-soft overflow-hidden"
                  >
                    {/* Population bar fill */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-ocean-50/0 via-ocean-50 to-cyan-50/70 pointer-events-none"
                      style={{ width: `${widthPct}%` }}
                    />
                    <div className="relative flex items-center justify-between gap-4 p-5 md:p-6">
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-lg md:text-xl text-ocean-700 leading-tight">
                          {u.name}
                        </div>
                        <div className="text-xs text-muted mt-1 flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {u.city}
                          {u.notes && (
                            <span className="hidden md:inline text-ink/55 italic">
                              · {u.notes}
                            </span>
                          )}
                        </div>
                        {u.notes && (
                          <div className="md:hidden text-xs text-ink/55 italic mt-1">
                            {u.notes}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-serif text-2xl md:text-3xl text-ocean-700 font-light leading-none">
                          {(u.populationServed / 1_000).toLocaleString(undefined, { maximumFractionDigits: 0 })}K
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mt-1">
                          served
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* INDUSTRY CONTAMINATION PROFILE                               */}
      {/* ============================================================ */}
      {ext?.industryProfile && (
        <Section className="relative py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="mixed" />
          <Container size="tight" className="relative">
            <div className="grid md:grid-cols-12 gap-6 md:gap-8">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-400/70" />
                  <Eyebrow>Industry profile</Eyebrow>
                </div>
                <h2 className="display text-display-md text-ocean-700 mb-4 text-balance leading-[1.05]">
                  Where the contamination comes from.
                </h2>
                <p className="text-base text-ink/75 leading-relaxed">
                  Every state has a different industrial fingerprint. The
                  industries below are the dominant historical and
                  active contamination sources in {s.name}&apos;s drinking
                  water systems.
                </p>
              </div>
              <div className="md:col-span-7 relative rounded-3xl bg-white border border-line shadow-soft p-7 md:p-9 overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
                  <Factory className="h-5 w-5" />
                </div>
                <p className="text-base md:text-lg text-ink/85 leading-relaxed">
                  {ext.industryProfile}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* TOP CONTAMINANTS                                             */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <Container className="relative">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Top contaminants of concern in {s.name}</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              What state data flags most consistently.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed">
              Drawn from EPA SDWIS sampling records, EWG state summaries, and
              regional regulatory action over the past five years. Read the
              full deep dive on each.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contaminants.map((c) => (
              <ContaminantPillCard key={c.slug} contaminant={c} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* RISK GROUPS + INFRASTRUCTURE                                 */}
      {/* ============================================================ */}
      {(s.whoIsAtRisk || s.leadServiceLines || s.privateWellShare) && (
        <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Who&apos;s most exposed</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-8 text-balance leading-[1.05]">
              Risk isn&apos;t evenly distributed.
            </h2>

            {s.whoIsAtRisk && (
              <div className="relative rounded-3xl bg-white border border-line shadow-soft p-7 md:p-10 overflow-hidden mb-5">
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                  Demographic risk read
                </div>
                <p className="text-base md:text-lg text-ink/85 leading-relaxed font-serif italic">
                  {s.whoIsAtRisk}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              {s.leadServiceLines && (
                <div className="rounded-2xl bg-white border border-line p-6 shadow-soft relative overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-4">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    Lead service lines
                  </div>
                  <div className="font-serif text-3xl text-ocean-700 font-light mb-2">
                    {s.leadServiceLines.approxCount
                      ? `~${s.leadServiceLines.approxCount.toLocaleString()}`
                      : "—"}
                  </div>
                  {s.leadServiceLines.notes && (
                    <p className="text-[13px] text-ink/70 leading-relaxed">
                      {s.leadServiceLines.notes}
                    </p>
                  )}
                </div>
              )}
              {s.privateWellShare && (
                <div className="rounded-2xl bg-white border border-line p-6 shadow-soft relative overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4">
                    <Home className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    Private wells
                  </div>
                  <p className="text-[15px] text-ink/85 leading-relaxed">
                    {s.privateWellShare}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* CLIMATE THREATS + SCHOOLS LEAD TESTING                       */}
      {/* ============================================================ */}
      {(ext?.climateThreats || ext?.schoolsLeadTesting) && (
        <Section className="relative py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="mixed" />
          <Container size="tight" className="relative">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {ext.climateThreats && (
                <div className="relative rounded-3xl bg-white border border-line shadow-soft p-7 md:p-8 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
                    <Wind className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    Climate threats
                  </div>
                  <h3 className="font-serif text-xl text-ocean-700 mb-3 leading-snug">
                    What&apos;s coming for {s.name}&apos;s water.
                  </h3>
                  <p className="text-[15px] text-ink/75 leading-relaxed">
                    {ext.climateThreats}
                  </p>
                </div>
              )}

              {ext.schoolsLeadTesting && (
                <div className="relative rounded-3xl bg-white border border-line shadow-soft p-7 md:p-8 overflow-hidden">
                  <span
                    className={
                      "absolute top-0 left-0 right-0 h-0.5 " +
                      (ext.schoolsLeadTesting.status === "mandated"
                        ? "bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-300"
                        : "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300")
                    }
                  />
                  <div
                    className={
                      "inline-flex h-11 w-11 items-center justify-center rounded-2xl mb-5 " +
                      (ext.schoolsLeadTesting.status === "mandated"
                        ? "bg-cyan-50 text-cyan-700"
                        : "bg-amber-50 text-amber-600")
                    }
                  >
                    <School className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    Schools lead testing
                  </div>
                  <h3 className="font-serif text-xl text-ocean-700 mb-2 leading-snug capitalize">
                    {ext.schoolsLeadTesting.status === "mandated"
                      ? "Statewide mandate"
                      : ext.schoolsLeadTesting.status === "voluntary"
                      ? "Voluntary statewide"
                      : ext.schoolsLeadTesting.status === "limited"
                      ? "Limited program"
                      : "No statewide program"}
                  </h3>
                  <p className="text-[15px] text-ink/75 leading-relaxed">
                    {ext.schoolsLeadTesting.detail}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* WHAT TO ASK YOUR UTILITY                                     */}
      {/* ============================================================ */}
      {ext?.whatToAsk && ext.whatToAsk.length > 0 && (
        <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>What to ask your utility</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              Five questions for your next Consumer Confidence Report.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed mb-10 max-w-2xl">
              Your utility is required to send you a Consumer Confidence
              Report annually. Most are dense and procedural. These are the
              questions worth following up on for {s.name} specifically.
            </p>
            <ol className="space-y-3 md:space-y-4">
              {ext.whatToAsk.map((q, i) => (
                <li
                  key={i}
                  className="relative rounded-2xl bg-white border border-line shadow-soft p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 flex-shrink-0 font-serif text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-base md:text-lg text-ocean-700 leading-snug font-serif text-balance pt-1">
                      {q}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted">
              Most state regulators allow public records requests for the
              underlying lab reports behind your CCR — your utility should be
              able to provide them on request.
            </p>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* RECENT LEGISLATION                                           */}
      {/* ============================================================ */}
      {ext?.recentLegislation && ext.recentLegislation.length > 0 && (
        <Section className="relative py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="brass" />
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>Recent state legislation</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
              What&apos;s changed in {s.name} water law.
            </h2>
            <p className="text-lg text-ink/75 leading-relaxed mb-10 max-w-2xl">
              Drinking water regulation moves at the state level as much as
              the federal level. Below are notable recent bills and
              regulatory actions specific to {s.name}.
            </p>
            <ul className="space-y-3">
              {ext.recentLegislation.map((law, i) => (
                <li
                  key={i}
                  className="relative rounded-2xl bg-white border border-line shadow-soft p-5 md:p-6 flex items-start gap-4 overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0" />
                  <div className="display text-2xl md:text-3xl text-ocean-700 font-light leading-none w-16 flex-shrink-0">
                    {law.year}
                  </div>
                  <p className="text-[15px] md:text-base text-ink/85 leading-snug pt-1">
                    {law.title}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* FILTER RECOMMENDATION                                        */}
      {/* ============================================================ */}
      {s.filterRecommendation && (
        <Section className="relative py-16 md:py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-50 to-ocean-50/60 border border-cyan-100 p-8 md:p-12 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="h-4 w-4 text-cyan-700" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-cyan-700 font-bold">
                  Filter recommendation for {s.name}
                </span>
              </div>
              <p className="display text-2xl md:text-3xl text-ocean-700 leading-snug text-balance">
                {s.filterRecommendation}
              </p>
              <p className="mt-5 text-xs text-muted">
                We don&apos;t recommend brands — the NSF/ANSI certification
                number matters more than the name on the box.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* NEWS FOR THIS STATE                                          */}
      {/* ============================================================ */}
      {stateNews.length > 0 && (
        <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
          <Container size="tight" className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>From the {s.name} desk</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-8 text-balance leading-[1.05]">
              Recent coverage.
            </h2>
            <div className="grid gap-5">
              {stateNews.map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group relative block rounded-3xl border border-line bg-white p-7 md:p-8 shadow-soft hover:shadow-lift hover:border-cyan-300/60 transition-all overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                    {n.topic} · {formatDate(n.publishedAt)}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-2 leading-snug text-balance">
                    {n.title}
                  </h3>
                  <p className="text-[15px] text-ink/75 leading-relaxed">
                    {n.description}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ============================================================ */}
      {/* CTA                                                          */}
      {/* ============================================================ */}
      <Section className="py-16 bg-canvas">
        <Container size="tight">
          <div className="relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
            </div>
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-300" />
                  <Eyebrow className="text-brass-300">Your utility</Eyebrow>
                </div>
                <h2 className="display text-3xl md:text-4xl text-white mb-4 text-balance leading-[1.1]">
                  This is the state.
                  <em className="not-italic italic font-light text-cyan-300">
                    {" "}Your address is the answer.
                  </em>
                </h2>
                <p className="text-white/75 leading-relaxed font-serif italic text-lg max-w-xl">
                  State-level patterns don&apos;t tell you about your specific
                  tap. Run your ZIP for the live EWG contaminant report on
                  your utility — or build a personalized Water File for your
                  household.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right flex flex-col gap-3 md:items-end">
                <Link href="/report">
                  <Button variant="secondary" size="lg">
                    Get my ZIP report <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link
                  href="/your-water-file"
                  className="text-sm text-cyan-200 hover:text-white inline-flex items-center gap-1"
                >
                  or build my Water File
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* META FOOTER                                                  */}
      {/* ============================================================ */}
      <Section className="py-10 bg-canvas border-t border-line">
        <Container size="tight">
          <div className="flex items-start gap-3 text-sm text-muted leading-relaxed">
            <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0 text-cyan-500" />
            <p>
              Source-water mix, utility counts, lead-service-line estimates,
              and private-well shares are approximate, drawn from EPA SDWIS
              public data and state primacy-agency summaries. Contaminant
              rankings reflect EWG state-level monitoring data and regional
              regulatory action — they are not exhaustive. Timeline events
              are publicly documented. See{" "}
              <Link href="/methodology" className="text-cyan-600 hover:underline">
                methodology
              </Link>{" "}
              for the full sourcing.{" "}
              <a
                href={`https://www.epa.gov/enviro/sdwis-search?state=${s.abbreviation}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline inline-flex items-center gap-1"
              >
                Search EPA SDWIS for {s.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

function DarkStat({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
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
          "flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold mb-2 " +
          (accent ? "text-cyan-200" : "text-brass-300/90")
        }
      >
        {icon}
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
