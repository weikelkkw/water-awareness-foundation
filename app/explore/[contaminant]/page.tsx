import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
      <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 bg-canvas overflow-hidden">
        <div className="absolute inset-0 bg-hero-wash opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-faint opacity-30 pointer-events-none" />
        <Container size="tight" className="relative">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ocean-700 mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All contaminants
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow>
              {c.category.replace("-", " ")}
              {c.formula && <span className="text-muted normal-case ml-2">· {c.formula}</span>}
            </Eyebrow>
          </div>
          <h1 className="display text-display-xl text-ocean-700 mb-6 text-balance leading-[0.98]">
            {c.name}
          </h1>
          <p className="text-xl md:text-2xl text-ink/75 leading-relaxed font-serif italic max-w-3xl">
            {c.oneLine}
          </p>
        </Container>
      </section>

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="grid gap-12">
            {/* WHAT IT IS */}
            <div>
              <h2 className="display text-3xl text-ocean-700 mb-4">What it is</h2>
              <p className="text-lg text-ink/85 leading-[1.75]">{c.whatItIs}</p>
            </div>

            {/* SOURCES */}
            <div>
              <h2 className="display text-3xl text-ocean-700 mb-4">Where it comes from</h2>
              <ul className="space-y-3">
                {c.sources.map((s, i) => (
                  <li key={i} className="flex gap-3 text-lg text-ink/85">
                    <span className="mt-2.5 flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HEALTH EFFECTS */}
            <div>
              <h2 className="display text-3xl text-ocean-700 mb-4">Health effects</h2>
              <p className="text-lg text-ink/85 leading-[1.75] mb-8">
                {c.healthEffects.summary}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {c.healthEffects.bullets.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-line bg-white p-6">
                    <h3 className="font-serif text-lg text-ocean-700 mb-2">
                      {b.label}
                    </h3>
                    <p className="text-[15px] text-ink/75 leading-relaxed">
                      {b.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REGULATION */}
            <div>
              <h2 className="display text-3xl text-ocean-700 mb-4">Regulation</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <RegBlock
                  label="EPA legal limit (MCL)"
                  value={
                    c.regulation.mclLabel ??
                    (c.regulation.mcl
                      ? `${c.regulation.mcl.value} ${c.regulation.mcl.unit}`
                      : "Not regulated")
                  }
                  tone="ocean"
                />
                <RegBlock
                  label="EPA health goal (MCLG)"
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
                <p className="text-sm text-ink/70 italic leading-relaxed">
                  Note: {c.regulation.note}
                </p>
              )}
            </div>

            {/* REGIONS */}
            {c.regionsAffected && (
              <div>
                <h2 className="display text-3xl text-ocean-700 mb-4">Regions most affected</h2>
                <p className="text-lg text-ink/85 leading-[1.75]">{c.regionsAffected}</p>
              </div>
            )}

            {/* REMOVED BY */}
            <div>
              <h2 className="display text-3xl text-ocean-700 mb-4">How to remove it</h2>
              <div className="callout">
                <span className="callout-label">Effective filtration</span>
                <ul>
                  {c.removedBy.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-muted leading-relaxed mt-4">
                We don&apos;t recommend brands. The certification on the box
                matters more than the brand printed on it. Look for the actual
                NSF/ANSI standard number specific to the contaminant you&apos;re
                removing.
              </p>
            </div>

            {/* SOURCES */}
            <div className="border-t border-line pt-8">
              <h2 className="font-serif text-xl text-ocean-700 mb-3 flex items-center gap-2">
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
            </div>
          </div>
        </Container>
      </Section>
    </>
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
          ? "rounded-2xl bg-cyan-50 border border-cyan-100 p-5"
          : "rounded-2xl bg-ocean-50 border border-ocean-100 p-5"
      }
    >
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-2 font-semibold">
        {label}
      </div>
      <div
        className={
          tone === "cyan" ? "font-serif text-lg text-cyan-700" : "font-serif text-lg text-ocean-700"
        }
      >
        {value}
      </div>
      {note && <p className="mt-2 text-xs text-ink/65 leading-relaxed">{note}</p>}
    </div>
  );
}
