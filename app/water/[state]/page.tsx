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
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import { STATES, getStateBySlug } from "@/lib/states";
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
    description: `Independent profile of drinking water in ${s.name} — top contaminants of concern, key utilities, and recent news. Drawn from EPA SDWIS and EWG.`,
  };
}

export default function StatePage({
  params,
}: {
  params: { state: string };
}) {
  const s = getStateBySlug(params.state);
  if (!s) notFound();

  const contaminants = s.topContaminants
    .map((slug) => getContaminant(slug))
    .filter((c): c is NonNullable<ReturnType<typeof getContaminant>> => !!c);

  const stateNews = getAllNews().filter(
    (n) => n.region === s.name || n.region === s.abbreviation
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
      {/* NEWS FOR THIS STATE                                          */}
      {/* ============================================================ */}
      {stateNews.length > 0 && (
        <Section className="relative py-20 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="mixed" />
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
                  your utility.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link href="/report">
                  <Button variant="secondary" size="lg">
                    Get my ZIP report <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
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
          <p className="text-sm text-muted leading-relaxed">
            Source-water mix and utility counts are approximate, drawn from
            EPA SDWIS public data and state primacy-agency summaries.
            Contaminant rankings reflect EWG state-level monitoring data and
            regional regulatory action — they are not exhaustive. See{" "}
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
