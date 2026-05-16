import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Droplet,
  ExternalLink,
  Info,
  Users,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { ZipCodeHero } from "@/components/water/ZipCodeHero";
import { ContaminantCard } from "@/components/water/ContaminantCard";
import { EwgContaminantCard } from "@/components/water/EwgContaminantCard";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";
import { getZipReport } from "@/lib/db/queries";
import { baselineConcerns } from "@/lib/epa/score";
import { CONTAMINANTS, getContaminant } from "@/lib/contaminants";
import { isValidZip } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 60 * 60 * 24; // 1 day at the route level

type Props = { params: { zipcode: string } };

export async function generateMetadata({ params }: Props) {
  return {
    title: `Water Report for ${params.zipcode}`,
    description: `Independent tap water report for ZIP code ${params.zipcode} — utility, contaminant findings vs. EWG's health-protective guidelines, and what to do about it.`,
  };
}

export default async function ReportPage({ params }: Props) {
  const zip = params.zipcode;
  if (!isValidZip(zip)) notFound();

  const report = await getZipReport(zip).catch(() => null);

  if (!report) return <NoDataFallback zip={zip} />;

  const { primary, alternates, ewg, cached } = report;
  const concerns = baselineConcerns(primary);

  return (
    <>
      {/* HEADER — deep ocean with atmosphere */}
      <section className="relative overflow-hidden bg-ocean-700 text-white pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.6), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <span className="eyebrow text-brass-300">Water Report</span>
          </div>
          <h1 className="display text-display-lg text-white mb-3 text-balance leading-[1.02]">
            {primary.name}
          </h1>
          <p className="text-lg text-white/75 mb-12 font-serif italic">
            ZIP {zip} {primary.citiesServed[0] ? `· ${primary.citiesServed[0]}, ` : "· "}
            {primary.state}
          </p>

          <div className="grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden mb-12">
            <DarkStat
              icon={<Users className="h-4 w-4" />}
              label="Population served"
              value={primary.populationServed?.toLocaleString() ?? "—"}
            />
            <DarkStat
              icon={<Droplet className="h-4 w-4" />}
              label="Primary source"
              value={primary.primarySource}
            />
            <DarkStat
              icon={<Building2 className="h-4 w-4" />}
              label="PWS ID"
              value={primary.pwsid}
            />
          </div>

          {/* EWG HEADLINE INSIDE THE HERO — the primary finding */}
          {ewg && ewg.contaminants.length > 0 && (() => {
            const flaggedCount = ewg.flagged.length;
            const maxMultiplier = Math.max(
              0,
              ...ewg.flagged.map((c) => c.timesAboveGuideline ?? 0)
            );
            // Severity drives the headline tone
            const severe = flaggedCount >= 5 || maxMultiplier >= 100;
            const elevated = !severe && (flaggedCount >= 2 || maxMultiplier >= 10);
            const bg = severe
              ? "bg-gradient-to-br from-white via-white to-red-50"
              : elevated
              ? "bg-gradient-to-br from-white via-white to-amber-50"
              : "bg-white";
            const stripe = severe
              ? "bg-gradient-to-r from-red-500 via-red-600 to-red-500"
              : elevated
              ? "bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"
              : "bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300";
            const numColor = severe
              ? "text-red-600"
              : elevated
              ? "text-amber-500"
              : "text-cyan-600";
            return (
              <div className={`relative rounded-3xl overflow-hidden shadow-lift backdrop-blur ${bg}`}>
                <span className={`absolute top-0 left-0 right-0 h-1.5 ${stripe}`} />
                <div className="p-7 md:p-10 pt-9 md:pt-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-10 bg-brass-400" />
                    <span className="eyebrow text-brass-500">
                      From EWG&apos;s Tap Water Database
                    </span>
                  </div>
                  <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
                    <div className="md:col-span-7">
                      <h2 className="display text-3xl md:text-5xl text-ocean-700 text-balance leading-[1.02]">
                        {flaggedCount > 0 ? (
                          <>
                            <span className={`${numColor} font-light`}>
                              {flaggedCount}
                            </span>{" "}
                            contaminant{flaggedCount === 1 ? "" : "s"}{" "}
                            <em className="not-italic italic font-light">
                              {severe ? "severely above" : "above"}
                            </em>{" "}
                            EWG&apos;s health-protective level.
                          </>
                        ) : (
                          <>
                            No contaminants above
                            <br />
                            EWG&apos;s health guideline.
                          </>
                        )}
                      </h2>
                      {flaggedCount > 0 && maxMultiplier > 0 && (
                        <p className="mt-4 text-base md:text-lg text-ink/75 leading-relaxed">
                          Worst-case finding:{" "}
                          <span className={`font-serif ${numColor} font-medium`}>
                            {maxMultiplier}×
                          </span>{" "}
                          the level EWG considers protective. EWG guidelines
                          are typically{" "}
                          <em className="italic">far stricter</em> than the EPA&apos;s
                          enforceable legal limits — which is why a utility
                          can be in legal compliance and still post numbers
                          like these.
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-ocean-50 px-5 py-4 border border-ocean-100">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1">
                          Detected
                        </div>
                        <div className="font-serif text-4xl text-ocean-700 font-light">
                          {ewg.contaminants.length}
                        </div>
                      </div>
                      <div
                        className={
                          "rounded-2xl px-5 py-4 border " +
                          (severe
                            ? "bg-red-50 border-red-200"
                            : elevated
                            ? "bg-amber-50 border-amber-200"
                            : "bg-cyan-50 border-cyan-100")
                        }
                      >
                        <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1">
                          Flagged
                        </div>
                        <div
                          className={`font-serif text-4xl font-light ${numColor}`}
                        >
                          {flaggedCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-7 text-[15px] md:text-base text-ink/70 leading-relaxed max-w-3xl">
                    EWG&apos;s health guidelines are based on cancer-risk
                    thresholds and other health-protective criteria from
                    California OEHHA, peer-reviewed science, and EWG&apos;s
                    own analyses. &quot;Above guideline&quot; does not mean
                    the water is in legal violation; it means the level
                    exceeds what EWG considers safe.
                  </p>
                </div>
              </div>
            );
          })()}
        </Container>
      </section>

      {/* EWG CONTAMINANT FINDINGS — the data EWG actually has */}
      {ewg && ewg.contaminants.length > 0 && (
        <Section className="bg-canvas">
          <Container>
            {ewg.flagged.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-brass-300" />
                  <Eyebrow>Flagged at this utility</Eyebrow>
                </div>
                <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-8 text-balance leading-[1.05]">
                  {ewg.flagged.length} contaminant{ewg.flagged.length === 1 ? "" : "s"}{" "}
                  exceed{ewg.flagged.length === 1 ? "s" : ""} EWG&apos;s
                  health-protective level.
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ewg.flagged.map((c, i) => (
                    <EwgContaminantCard key={`${c.name}-${i}`} contaminant={c} />
                  ))}
                </div>
              </div>
            )}

            {ewg.contaminants.length > ewg.flagged.length && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-brass-300" />
                  <Eyebrow>Other contaminants detected</Eyebrow>
                </div>
                <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-8 text-balance leading-[1.05]">
                  Detected but below EWG&apos;s guideline.
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ewg.contaminants
                    .filter((c) => !c.aboveGuideline)
                    .map((c, i) => (
                      <EwgContaminantCard key={`${c.name}-${i}`} contaminant={c} />
                    ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* CONTAMINANT FOCUS — foundation-curated guidance, not EPA */}
      <Section className="py-16 bg-ocean-wash border-y border-ocean-100/50">
        <Container>
          <div className="max-w-3xl mb-10">
            <Eyebrow className="mb-3">Worth understanding here</Eyebrow>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-4 text-balance">
              The contaminants we&apos;d be reading up on if this were our water.
            </h2>
            <p className="text-ink/75 leading-relaxed">
              Even when a sampling database is silent, certain contaminants are
              worth taking seriously — lead enters after the utility&apos;s
              pipes (inside your home), PFAS sampling is still rolling out,
              and several health-relevant compounds are simply unregulated. The
              cards below are the foundation&apos;s honest baseline read on
              what to focus on regardless of what does or doesn&apos;t appear
              in any single utility&apos;s record.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {concerns.map((c) => {
              const data = getContaminant(c.slug);
              if (!data) return null;
              return (
                <ContaminantCard key={c.slug} contaminant={data} reason={c.reason} />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* WHAT YOU CAN DO */}
      <Section className="py-16 bg-canvas">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <Eyebrow className="mb-3">What you can do</Eyebrow>
              <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-5 text-balance">
                Reasonable, non-paranoid next steps.
              </h2>
              <p className="text-ink/75 leading-relaxed">
                We don&apos;t recommend specific filter brands. We do recommend
                getting NSF-certified filtration that targets the contaminants
                most relevant to your situation. The list to the right is sorted
                by how much risk it reduces per dollar.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 font-medium"
                >
                  Browse every contaminant <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <br />
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 font-medium"
                >
                  Filter types, decoded <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-7 space-y-3">
              <ActionRow
                step="1"
                title="Run the cold tap before drinking or cooking"
                detail="In any home built before 1986 — or any home with unknown plumbing history — let cold water run 30 to 120 seconds after it's been sitting. This is free and removes the highest-lead first-draw water."
              />
              <ActionRow
                step="2"
                title="Get a pitcher or faucet filter certified to NSF/ANSI 53"
                detail="NSF 53 covers lead and many disinfection byproducts. NSF 42 (the more common cert) is only taste/odor. Check the box."
              />
              <ActionRow
                step="3"
                title="If you're in a PFAS-impacted area, step up to reverse osmosis or NSF P473"
                detail="Standard activated carbon does not reliably remove PFAS. Reverse osmosis units, or carbon specifically rated NSF/ANSI 53 P473, do."
              />
              <ActionRow
                step="4"
                title="If you have an infant, mix formula with filtered or bottled water"
                detail="Especially in homes with old plumbing, agricultural areas with nitrate, or anywhere with active health-based violations."
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ALTERNATES */}
      {alternates.length > 0 && (
        <Section className="py-12 bg-white">
          <Container>
            <Eyebrow variant="muted" className="mb-3">Also serving this ZIP</Eyebrow>
            <p className="text-ink/75 mb-4 max-w-2xl">
              ZIP {zip} is partially served by these additional utilities — your
              actual water comes from whichever connects to your address.
            </p>
            <ul className="space-y-2">
              {alternates.map((a) => (
                <li key={a.pwsid} className="text-sm text-ink/80">
                  <span className="font-medium text-ocean-700">{a.name}</span>
                  <span className="text-muted">
                    {" "}
                    · {a.pwsid} · {a.populationServed?.toLocaleString() ?? "—"} served
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* SOFT EMAIL CAPTURE */}
      <Section className="py-16 bg-ocean-700 text-white">
        <Container size="tight">
          <div className="text-center mb-8">
            <Eyebrow className="mb-3 text-cyan-200">Stay updated</Eyebrow>
            <h2 className="display text-3xl md:text-4xl text-white mb-3 text-balance">
              Send me a printable PDF + monthly updates.
            </h2>
            <p className="text-white/80 leading-relaxed">
              We&apos;ll email you a clean PDF of this report and ping you when
              new contaminant findings or regulations land in your area.
            </p>
          </div>
          <div className="max-w-md mx-auto text-left">
            <NewsletterCapture variant="dark" pitch=" " />
          </div>
        </Container>
      </Section>

      {/* META */}
      <Section className="py-10 bg-canvas border-t border-line">
        <Container size="tight">
          <div className="flex items-start gap-3 text-sm text-muted">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              {ewg && ewg.contaminants.length > 0 ? (
                <>
                  Contaminant levels from{" "}
                  <a
                    href={`https://www.ewg.org/tapwater/system.php?pws=${encodeURIComponent(primary.pwsid)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:underline inline-flex items-center gap-0.5"
                  >
                    EWG&apos;s Tap Water Database
                    <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  for {primary.pwsid}.{" "}
                </>
              ) : (
                <>
                  EWG&apos;s Tap Water Database doesn&apos;t have contaminant
                  sampling for this utility yet. You can search for nearby
                  systems on{" "}
                  <a
                    href={`https://www.ewg.org/tapwater/search-results.php?zip5=${encodeURIComponent(zip)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:underline inline-flex items-center gap-0.5"
                  >
                    EWG
                    <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  directly.{" "}
                </>
              )}
              {cached ? "Served from our cache." : "Live lookup."}{" "}
              These findings are not a substitute for an at-home lab test of
              your tap. See{" "}
              <Link href="/methodology" className="text-cyan-500 hover:underline">
                methodology
              </Link>{" "}
              for the full sourcing.
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-ocean-700 px-6 py-5">
      <div className="flex items-center gap-2 text-[11px] text-brass-300 uppercase tracking-[0.18em] font-semibold mb-1.5">
        {icon} {label}
      </div>
      <div className="font-serif text-lg md:text-xl text-white">{value}</div>
    </div>
  );
}

function ActionRow({
  step,
  title,
  detail,
}: {
  step: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 font-semibold">
          {step}
        </span>
        <div>
          <h3 className="font-serif text-lg text-ocean-700 mb-1">{title}</h3>
          <p className="text-[15px] text-ink/75 leading-relaxed">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function NoDataFallback({ zip }: { zip: string }) {
  return (
    <>
      <Section className="bg-ocean-fade pb-12">
        <Container size="tight" className="text-center">
          <Eyebrow className="mb-4">No data yet</Eyebrow>
          <h1 className="display text-display-md text-ocean-700 mb-5 text-balance">
            We&apos;re still building data for ZIP {zip}.
          </h1>
          <p className="text-lg text-ink/75 leading-relaxed mb-8">
            We couldn&apos;t find a public water system serving this ZIP in
            our utility database. That doesn&apos;t necessarily mean anything
            is wrong — small systems, private wells, and recently-connected
            areas are sometimes slow to appear. Try a nearby ZIP, or sign up
            below and we&apos;ll notify you when this area is indexed.
          </p>
          <ZipCodeHero />
          <div className="max-w-md mx-auto mt-12 text-left">
            <NewsletterCapture />
          </div>
        </Container>
      </Section>

      <Section className="py-16 bg-canvas">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">In the meantime</Eyebrow>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-5 text-balance">
              The contaminants worth understanding regardless of ZIP.
            </h2>
            <p className="text-ink/75 leading-relaxed mb-8">
              These are the contaminants that account for the majority of
              health-relevant exposure in U.S. tap water. The deep-dive pages
              break each down with sources, health effects, regulatory limits,
              and which filter types actually remove them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTAMINANTS.slice(0, 6).map((c) => (
              <ContaminantCard key={c.slug} contaminant={c} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
