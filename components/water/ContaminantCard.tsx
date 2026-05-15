import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Contaminant } from "@/lib/contaminants";

interface Props {
  contaminant: Contaminant;
  reason?: string;
  /** Detected concentration in this utility, if known (otherwise null = baseline concern). */
  detected?: { value: number; unit: string } | null;
}

export function ContaminantCard({ contaminant: c, reason, detected }: Props) {
  const mcl = c.regulation.mcl;
  const ewg = c.regulation.ewgGuideline;

  const bar = (() => {
    if (!detected || !mcl) return null;
    const ratio = Math.min(1.5, detected.value / mcl.value);
    return { ratio, exceeds: ratio > 1 };
  })();

  return (
    <article className="rounded-2xl border border-line bg-white p-6 md:p-7 shadow-soft">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1">
            {c.category.replace("-", " ")}
          </div>
          <h3 className="font-serif text-xl text-ocean-700">{c.name}</h3>
        </div>
        <Link
          href={`/explore/${c.slug}`}
          className="text-xs text-cyan-500 hover:text-cyan-600 inline-flex items-center gap-1 whitespace-nowrap"
        >
          Deep dive <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <p className="text-[15px] text-ink/75 leading-relaxed mb-5">{c.oneLine}</p>

      {bar && (
        <div className="mb-5">
          <div className="flex items-end justify-between text-xs mb-1.5">
            <span className="text-muted">Detected</span>
            <span className="font-medium text-ocean-700">
              {detected!.value} {detected!.unit}
            </span>
          </div>
          <div className="h-2 rounded-full bg-line overflow-hidden relative">
            <div
              className={`absolute left-0 top-0 h-full rounded-full ${bar.exceeds ? "bg-red-500" : "bg-cyan-400"}`}
              style={{ width: `${Math.min(100, (bar.ratio / 1.5) * 100)}%` }}
            />
            <div
              className="absolute top-0 h-full w-px bg-ocean-600"
              style={{ left: `${(1 / 1.5) * 100}%` }}
              title="EPA legal limit"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted mt-1">
            <span>0</span>
            <span>EPA limit: {mcl!.value} {mcl!.unit}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        {mcl && (
          <div className="rounded-lg bg-ocean-50 px-3 py-2">
            <div className="text-muted">EPA legal limit</div>
            <div className="font-medium text-ocean-700">{c.regulation.mclLabel ?? `${mcl.value} ${mcl.unit}`}</div>
          </div>
        )}
        {ewg && (
          <div className="rounded-lg bg-cyan-50 px-3 py-2">
            <div className="text-muted">EWG health guideline</div>
            <div className="font-medium text-cyan-700">{ewg.value} {ewg.unit}</div>
          </div>
        )}
      </div>

      {reason && (
        <p className="text-sm text-ink/70 border-l-2 border-cyan-300 pl-3">
          <span className="font-medium text-ocean-700">Why this is listed:</span>{" "}
          {reason}
        </p>
      )}
    </article>
  );
}
