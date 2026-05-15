import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ScoreVisualization } from "@/components/water/ScoreVisualization";
import { getZipReport } from "@/lib/db/queries";
import { computeScore } from "@/lib/epa/score";

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
    <Section className="py-16 bg-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ColumnCard report={a} zip={zipA} />
          <ColumnCard report={b} zip={zipB} />
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-line bg-ocean-50 p-6 md:p-8">
          <Eyebrow variant="muted" className="mb-2">A note on comparison</Eyebrow>
          <p className="text-ink/75 leading-relaxed text-[15px]">
            The Water Score compares regulatory compliance, not the actual
            chemistry of your kitchen tap. Two ZIPs scoring identically can have
            very different lead exposure depending on the age of your housing
            stock, and similar PFAS exposure that neither utility has been
            required to fully sample yet. Use this comparison as a starting
            point, not a verdict.
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
          EPA&apos;s SDWIS database.
        </p>
      </Card>
    );
  }
  const score = computeScore(report.primary, report.violations);
  const healthBased = report.violations.filter((v) => v.isHealthBased).length;

  return (
    <Card hover={false}>
      <Eyebrow variant="muted" className="mb-1">ZIP {zip}</Eyebrow>
      <h3 className="font-serif text-2xl text-ocean-700 mb-1 text-balance">
        {report.primary.name}
      </h3>
      <p className="text-sm text-muted mb-6">
        {report.primary.citiesServed[0] && `${report.primary.citiesServed[0]}, `}
        {report.primary.state} · {report.primary.populationServed?.toLocaleString() ?? "—"} served
      </p>

      <div className="flex items-center gap-6 mb-6">
        <ScoreVisualization score={score} />
        <div>
          <div className="text-xs uppercase tracking-wider text-muted mb-1">
            Primary source
          </div>
          <div className="font-medium text-ocean-700 mb-3">
            {report.primary.primarySource}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted mb-1">
            Violations (5 yr)
          </div>
          <div className="font-medium text-ocean-700">
            {report.violations.length}
            {healthBased > 0 && (
              <span className="inline-flex items-center gap-1 ml-2 text-amber-500 text-sm">
                <AlertTriangle className="h-3 w-3" /> {healthBased} health-based
              </span>
            )}
          </div>
        </div>
      </div>

      <Link
        href={`/report/${zip}`}
        className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 text-sm font-medium"
      >
        Full report <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}
