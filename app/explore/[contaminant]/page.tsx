import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CONTAMINANTS, getContaminant } from "@/lib/contaminants";
import { SOURCES } from "@/lib/sources";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export function generateStaticParams() {
  return CONTAMINANTS.map((c) => ({ contaminant: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { contaminant: string };
}) {
  const c = getContaminant(params.contaminant);
  if (!c) return {};
  return {
    title: `${c.name} in drinking water`,
    description: c.oneLine,
  };
}

export default function ContaminantPage({
  params,
}: {
  params: { contaminant: string };
}) {
  const c = getContaminant(params.contaminant);
  if (!c) notFound();

  const sources = c.sourceIds.map((id) => SOURCES[id]).filter(Boolean);

  return (
    <>
      {/* ============================================================ */}
      {/* DARK MIDNIGHT HERO                                           */}
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
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All contaminants
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">
              {c.category.replace("-", " ")}
              {c.formula && (
                <span className="text-white/55 normal-case ml-2 tracking-normal">
                  · {c.formula}
                </span>
              )}
            </Eyebrow>
          </div>
          <h1 className="display text-display-xl text-white mb-7 text-balance leading-[0.98]">
            {c.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-serif italic max-w-3xl">
            {c.oneLine}
          </p>

          {/* Hero-anchored regulation stats — instantly visible */}
          <div className="mt-12 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            <DarkRegStat
              label="Federal legal limit (MCL)"
              value={
                c.regulation.mclLabel ??
                (c.regulation.mcl
                  ? `${c.regulation.mcl.value} ${c.regulation.mcl.unit}`
                  : "Not regulated")
              }
            />
            <DarkRegStat
              label="Federal health goal"
              value={
                c.regulation.mclgLabel ??
                (c.regulation.mclg
                  ? `${c.regulation.mclg.value} ${c.regulation.mclg.unit}`
                  : "—")
              }
            />
            <DarkRegStat
              label="EWG health guideline"
              value={
                c.regulation.ewgGuideline
                  ? `${c.regulation.ewgGuideline.value} ${c.regulation.ewgGuideline.unit}`
                  : "—"
              }
              accent
            />
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* WHAT IT IS — canvas band                                     */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>What it is</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-6 text-balance leading-[1.05]">
            The science, plainly.
          </h2>
          <p className="text-xl text-ink/85 leading-[1.75] font-serif text-pretty">
            {c.whatItIs}
          </p>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* SOURCES — ocean-tinted band                                  */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(0,180,216,0.10), transparent 60%)",
          }}
        />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>Where it comes from</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-8 text-balance leading-[1.05]">
            The pathways into the tap.
          </h2>
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5">
            {c.sources.map((s, i) => (
              <li
                key={i}
                className="flex gap-4 text-lg text-ink/85 leading-relaxed"
              >
                <span className="mt-2.5 flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-100" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* HEALTH EFFECTS — canvas band                                 */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="cyan" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>Health effects</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-6 text-balance leading-[1.05]">
            What the evidence shows.
          </h2>
          <p className="text-xl text-ink/85 leading-[1.75] font-serif mb-12 text-pretty max-w-3xl">
            {c.healthEffects.summary}
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {c.healthEffects.bullets.map((b, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white border border-line p-7 shadow-soft overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
                <h3 className="font-serif text-xl text-ocean-700 mb-3 mt-1">
                  {b.label}
                </h3>
                <p className="text-[15px] text-ink/75 leading-relaxed">
                  {b.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* REGULATION DETAIL — dark band                                */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-ocean-700 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
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
            <Eyebrow className="text-brass-300">Regulation</Eyebrow>
          </div>
          <h2 className="display text-display-md text-white mb-8 text-balance leading-[1.05]">
            What the law allows vs. what&apos;s
            <em className="not-italic italic font-light text-cyan-300"> actually safe.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <RegBlock
              label="Federal legal limit (MCL)"
              value={
                c.regulation.mclLabel ??
                (c.regulation.mcl
                  ? `${c.regulation.mcl.value} ${c.regulation.mcl.unit}`
                  : "Not regulated")
              }
              tone="ocean"
            />
            <RegBlock
              label="Federal health goal (MCLG)"
              value={
                c.regulation.mclgLabel ??
                (c.regulation.mclg
                  ? `${c.regulation.mclg.value} ${c.regulation.mclg.unit}`
                  : "—")
              }
              tone="ocean"
            />
            <RegBlock
              label="EWG health guideline"
              value={
                c.regulation.ewgGuideline
                  ? `${c.regulation.ewgGuideline.value} ${c.regulation.ewgGuideline.unit}`
                  : "—"
              }
              tone="cyan"
              note={c.regulation.ewgNote}
            />
          </div>
          {c.regulation.note && (
            <p className="text-sm text-white/70 italic leading-relaxed mt-6 max-w-3xl">
              Note: {c.regulation.note}
            </p>
          )}
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* REGIONS + FILTRATION — split canvas band                     */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          {c.regionsAffected && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-brass-400/70" />
                <Eyebrow>Regions most affected</Eyebrow>
              </div>
              <h2 className="display text-display-md text-ocean-700 mb-6 text-balance leading-[1.05]">
                Where exposure is highest.
              </h2>
              <p className="text-xl text-ink/85 leading-[1.75] font-serif text-pretty">
                {c.regionsAffected}
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-400/70" />
              <Eyebrow>How to remove it</Eyebrow>
            </div>
            <h2 className="display text-display-md text-ocean-700 mb-8 text-balance leading-[1.05]">
              Filtration that actually works.
            </h2>
            <div className="rounded-3xl bg-gradient-to-br from-cyan-50 to-ocean-50/60 border border-cyan-100 p-8 md:p-10 mb-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-700 font-bold mb-5">
                Effective filtration
              </div>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3">
                {c.removedBy.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-lg text-ink/85 leading-relaxed"
                  >
                    <span className="mt-2.5 flex-shrink-0 w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              We don&apos;t recommend brands. The certification on the box
              matters more than the brand printed on it. Look for the actual
              NSF/ANSI standard number specific to the contaminant you&apos;re
              removing.
            </p>
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* CTA — premium ocean card                                     */}
      {/* ============================================================ */}
      <Section className="py-16 bg-ocean-50/40 border-y border-ocean-100/50">
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
            </div>
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <Eyebrow className="text-brass-300 mb-3">
                  Check your tap
                </Eyebrow>
                <h2 className="display text-3xl md:text-4xl text-white mb-4 text-balance leading-[1.1]">
                  Is {c.name.toLowerCase()} a problem at your address?
                </h2>
                <p className="text-white/75 leading-relaxed font-serif italic text-lg max-w-xl">
                  Enter your ZIP and we&apos;ll pull every contaminant your
                  utility has reported — measured against EWG&apos;s
                  health-protective guidelines.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link href="/report">
                  <Button variant="secondary" size="lg">
                    Get your report <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* SOURCES — quiet meta band                                    */}
      {/* ============================================================ */}
      <Section className="py-14 bg-canvas border-t border-line">
        <Container size="tight">
          <h2 className="font-serif text-xl text-ocean-700 mb-5 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-500" /> Sources
          </h2>
          <ol className="space-y-2 list-decimal pl-5">
            {sources.map((s) => (
              <li key={s.id} className="text-sm text-ink/75">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline inline-flex items-center gap-1"
                >
                  {s.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-muted"> — {s.publisher}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}

function DarkRegStat({
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
        "p-5 md:p-6 " +
        (accent ? "bg-cyan-500/15" : "bg-white/[0.04]")
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
          "font-serif text-2xl md:text-3xl font-light leading-tight " +
          (accent ? "text-cyan-200" : "text-white")
        }
      >
        {value}
      </div>
    </div>
  );
}

function RegBlock({
  label,
  value,
  tone,
  note,
}: {
  label: string;
  value: string;
  tone: "ocean" | "cyan";
  note?: string;
}) {
  return (
    <div
      className={
        tone === "cyan"
          ? "rounded-2xl bg-cyan-500/15 border border-cyan-300/30 p-6"
          : "rounded-2xl bg-white/[0.04] border border-white/10 p-6"
      }
    >
      <div
        className={
          "text-[10px] uppercase tracking-[0.18em] mb-3 font-bold " +
          (tone === "cyan" ? "text-cyan-200" : "text-brass-300/90")
        }
      >
        {label}
      </div>
      <div
        className={
          "font-serif text-xl md:text-2xl font-light leading-tight " +
          (tone === "cyan" ? "text-cyan-200" : "text-white")
        }
      >
        {value}
      </div>
      {note && <p className="mt-3 text-xs text-white/65 leading-relaxed">{note}</p>}
    </div>
  );
}
