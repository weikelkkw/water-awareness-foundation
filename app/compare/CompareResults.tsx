import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { getZipReport } from "@/lib/db/queries";

interface Props {
  zipA: string;
  zipB: string;
}

export async function CompareResults({ zipA, zipB }: Props) {
  const [a, b] = await Promise.all([
    getZipReport(zipA).catch(() => null),
    getZipReport(zipB).catch(() => null),
  ]);

  return (
    <Section
      className="relative pt-12 md:pt-16 pb-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
      }}
    >
      <BodyAtmosphere variant="mixed" />
      <Container className="relative">
        {/* Result header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-brass-400/70" />
          <Eyebrow>Comparison result</Eyebrow>
        </div>
        <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
          ZIP {zipA} vs ZIP {zipB}.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ColumnCard report={a} zip={zipA} side="A" />
          <ColumnCard report={b} zip={zipB} side="B" />
        </div>

        {/* Methodology note */}
        <div className="mt-14 max-w-3xl mx-auto relative rounded-3xl border border-line bg-white p-7 md:p-9 shadow-soft overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0" />
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 text-cyan-500 mt-1 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
                A note on comparison
              </div>
              <p className="text-ink/75 leading-relaxed text-[15px]">
                This comparison shows contaminant counts and the worst-case
                multiplier vs. EWG&apos;s health-protective guideline for each
                utility. Two ZIPs with similar counts can have very different
                lead exposure depending on the age of your housing stock, and
                similar PFAS exposure that neither utility has been required
                to fully sample yet. Use this as a starting point, not a
                verdict.
              </p>
            </div>
          </div>
        </div>

        {/* CTA pair */}
        <div className="mt-10 max-w-3xl mx-auto relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
              }}
            />
          </div>
          <div className="relative grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-brass-300" />
                <Eyebrow className="text-brass-300">Next step</Eyebrow>
              </div>
              <h3 className="display text-2xl md:text-3xl text-white mb-3 text-balance leading-tight">
                Want the deep version for{" "}
                <em className="not-italic italic font-light text-cyan-300">
                  your address?
                </em>
              </h3>
              <p className="text-white/75 leading-relaxed font-serif italic text-base max-w-xl">
                Build a personalized Water File ranked by who lives at your
                address — kids, pregnancy, pets, gardener.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/your-water-file">
                <Button variant="secondary" size="lg">
                  Build my Water File <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ColumnCard({
  report,
  zip,
  side,
}: {
  report: Awaited<ReturnType<typeof getZipReport>>;
  zip: string;
  side: "A" | "B";
}) {
  if (!report) {
    return (
      <div className="relative rounded-3xl border border-line bg-white p-7 md:p-9 shadow-soft overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-line via-muted/30 to-line" />
        <div className="display text-5xl text-ocean-700/30 font-light leading-none mb-3">
          {side}
        </div>
        <Eyebrow variant="muted" className="mb-2">
          ZIP {zip}
        </Eyebrow>
        <h3 className="font-serif text-2xl text-ocean-700 mb-3">
          No data yet
        </h3>
        <p className="text-ink/75 leading-relaxed text-[15px]">
          We couldn&apos;t find a public water system serving this ZIP in our
          utility database.
        </p>
      </div>
    );
  }

  const ewg = report.ewg;
  const flagged = ewg?.flagged.length ?? 0;
  const total = ewg?.contaminants.length ?? 0;
  const worst = Math.max(
    0,
    ...(ewg?.flagged.map((c) => c.timesAboveGuideline ?? 0) ?? [])
  );

  const tier =
    flagged >= 5 || worst >= 100
      ? "severe"
      : flagged >= 2 || worst >= 10
      ? "elevated"
      : flagged > 0
      ? "above"
      : "ok";

  const flaggedColor =
    tier === "severe"
      ? "text-red-600"
      : tier === "elevated"
      ? "text-red-500"
      : tier === "above"
      ? "text-amber-500"
      : "text-cyan-600";

  return (
    <div className="relative rounded-3xl border border-line bg-white p-7 md:p-9 shadow-lift hover:shadow-lift transition-all overflow-hidden">
      <span
        className={
          "absolute top-0 left-0 right-0 h-1 " +
          (tier === "severe"
            ? "bg-gradient-to-r from-red-500 via-red-600 to-red-500"
            : tier === "elevated"
            ? "bg-gradient-to-r from-red-400 via-red-500 to-red-400"
            : tier === "above"
            ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300"
            : "bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300")
        }
      />
      <span
        aria-hidden
        className="absolute -top-2 -right-1 font-serif text-[140px] leading-none text-ocean-700/[0.04] pointer-events-none select-none font-light"
      >
        {side}
      </span>

      <div className="relative">
        <Eyebrow variant="muted" className="mb-2 mt-1">
          ZIP {zip}
        </Eyebrow>
        <h3 className="font-serif text-2xl md:text-3xl text-ocean-700 mb-1 text-balance leading-tight">
          {report.primary.name}
        </h3>
        <p className="text-sm text-muted mb-7 italic font-serif">
          {report.primary.citiesServed[0] &&
            `${report.primary.citiesServed[0]}, `}
          {report.primary.state} ·{" "}
          {report.primary.populationServed?.toLocaleString() ?? "—"} served
        </p>

        {ewg ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl bg-canvas border border-line p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
                Detected
              </div>
              <div className="font-serif text-4xl text-ocean-700 font-light leading-none">
                {total}
              </div>
            </div>
            <div
              className={
                "rounded-2xl border p-4 " +
                (tier === "severe" || tier === "elevated"
                  ? "bg-red-50 border-red-200"
                  : tier === "above"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-cyan-50 border-cyan-100")
              }
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
                Flagged
              </div>
              <div
                className={`font-serif text-4xl font-light leading-none ${flaggedColor}`}
              >
                {flagged}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-canvas border border-line p-4 mb-6 text-sm text-muted">
            No EWG contaminant data for this utility yet.
          </div>
        )}

        {flagged > 0 && worst > 0 && (
          <div className="flex items-center gap-2 mb-6 text-sm rounded-xl bg-canvas border border-line px-4 py-3">
            <AlertTriangle className={`h-3.5 w-3.5 ${flaggedColor}`} />
            <span className="text-ink/75">
              Worst-case:{" "}
              <span className={`font-serif font-medium ${flaggedColor}`}>
                {worst}×
              </span>{" "}
              EWG&apos;s health-protective level
            </span>
          </div>
        )}

        <Link
          href={`/report/${zip}`}
          className="inline-flex items-center gap-1.5 text-cyan-600 hover:text-cyan-700 text-sm font-medium group"
        >
          Full report for {zip}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
