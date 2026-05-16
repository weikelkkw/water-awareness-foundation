import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
    <Section className="relative py-16 bg-canvas overflow-hidden">
      <BodyAtmosphere variant="mixed" />
      <Container className="relative">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ColumnCard report={a} zip={zipA} />
          <ColumnCard report={b} zip={zipB} />
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-line bg-ocean-50 p-6 md:p-8">
          <Eyebrow variant="muted" className="mb-2">A note on comparison</Eyebrow>
          <p className="text-ink/75 leading-relaxed text-[15px]">
            This comparison shows contaminant counts and the worst-case
            multiplier vs. EWG&apos;s health-protective guideline for each
            utility. Two ZIPs with similar counts can have very different
            lead exposure depending on the age of your housing stock, and
            similar PFAS exposure that neither utility has been required to
            fully sample yet. Use this as a starting point, not a verdict.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function ColumnCard({
  report,
  zip,
}: {
  report: Awaited<ReturnType<typeof getZipReport>>;
  zip: string;
}) {
  if (!report) {
    return (
      <Card hover={false}>
        <Eyebrow variant="muted" className="mb-2">ZIP {zip}</Eyebrow>
        <h3 className="font-serif text-2xl text-ocean-700 mb-3">No data yet</h3>
        <p className="text-ink/75 leading-relaxed text-[15px]">
          We couldn&apos;t find a public water system serving this ZIP in
          our utility database.
        </p>
      </Card>
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
    <Card hover={false} className="relative overflow-hidden">
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
      <Eyebrow variant="muted" className="mb-1 mt-1">ZIP {zip}</Eyebrow>
      <h3 className="font-serif text-2xl text-ocean-700 mb-1 text-balance">
        {report.primary.name}
      </h3>
      <p className="text-sm text-muted mb-7">
        {report.primary.citiesServed[0] && `${report.primary.citiesServed[0]}, `}
        {report.primary.state} · {report.primary.populationServed?.toLocaleString() ?? "—"} served
      </p>

      {ewg ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-canvas border border-line p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1">
              Detected
            </div>
            <div className="font-serif text-3xl text-ocean-700 font-light">
              {total}
            </div>
          </div>
          <div
            className={
              "rounded-xl border p-4 " +
              (tier === "severe" || tier === "elevated"
                ? "bg-red-50 border-red-200"
                : tier === "above"
                ? "bg-amber-50 border-amber-200"
                : "bg-cyan-50 border-cyan-100")
            }
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1">
              Flagged
            </div>
            <div className={`font-serif text-3xl font-light ${flaggedColor}`}>
              {flagged}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-canvas border border-line p-4 mb-6 text-sm text-muted">
          No EWG contaminant data for this utility yet.
        </div>
      )}

      {flagged > 0 && worst > 0 && (
        <div className="flex items-center gap-2 mb-5 text-sm">
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
        className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 text-sm font-medium"
      >
        Full report <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}
