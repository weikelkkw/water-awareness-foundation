import { AlertTriangle } from "lucide-react";
import type { EwgContaminant } from "@/lib/ewg/scrape";

interface Props {
  contaminant: EwgContaminant;
}

/**
 * Severity tiers for visual treatment.
 * Designed to read as serious medical findings — not marketing.
 * The tier is driven by the multiplier vs EWG's health guideline.
 */
type Tier = "ok" | "amber" | "red" | "deep";

function tierFor(c: EwgContaminant): Tier {
  if (!c.aboveGuideline) return "ok";
  const x = c.timesAboveGuideline ?? 0;
  if (x >= 100) return "deep";
  if (x >= 10) return "red";
  return "amber";
}

const TIER_BG: Record<Tier, string> = {
  ok: "bg-white border-line",
  amber:
    "bg-gradient-to-br from-amber-50 via-white to-white border-amber-200",
  red: "bg-gradient-to-br from-red-50 via-white to-white border-red-200",
  deep: "bg-gradient-to-br from-red-50 via-red-50/50 to-white border-red-300",
};

const TIER_STRIPE: Record<Tier, string> = {
  ok: "bg-transparent",
  amber: "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300",
  red: "bg-gradient-to-r from-red-400 via-red-500 to-red-400",
  deep: "bg-gradient-to-r from-red-500 via-red-600 to-red-500",
};

const TIER_NUMBER: Record<Tier, string> = {
  ok: "text-cyan-600",
  amber: "text-amber-500",
  red: "text-red-500",
  deep: "text-red-600",
};

const TIER_LABEL: Record<Tier, string> = {
  ok: "text-cyan-600",
  amber: "text-amber-600",
  red: "text-red-600",
  deep: "text-red-700",
};

export function EwgContaminantCard({ contaminant: c }: Props) {
  const tier = tierFor(c);
  const above = c.aboveGuideline;

  const tierWord =
    tier === "deep" ? "SEVERE" : tier === "red" ? "ELEVATED" : tier === "amber" ? "ABOVE" : null;

  return (
    <article
      className={
        "relative rounded-2xl border p-6 md:p-7 shadow-soft transition-all hover:shadow-lift overflow-hidden " +
        TIER_BG[tier]
      }
    >
      {/* Top severity stripe */}
      <span
        className={"absolute top-0 left-0 right-0 h-1 " + TIER_STRIPE[tier]}
      />

      {above && tierWord && (
        <div className="flex items-center gap-2 mb-4 mt-1">
          <AlertTriangle
            className={
              "h-3.5 w-3.5 " +
              (tier === "deep"
                ? "text-red-600"
                : tier === "red"
                ? "text-red-500"
                : "text-amber-500")
            }
            strokeWidth={2.5}
          />
          <span
            className={
              "text-[10px] uppercase tracking-[0.22em] font-bold " +
              TIER_LABEL[tier]
            }
          >
            {tierWord} EWG&apos;s Health Guideline
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-5">
        <h3 className="font-serif text-xl md:text-2xl text-ocean-700 leading-tight">
          {c.name}
        </h3>
      </div>

      {above && c.timesAboveGuideline !== null && (
        <div className="mb-5 -mt-1 pb-5 border-b border-line/70">
          <div className="flex items-baseline gap-2">
            <span
              className={
                "font-serif font-light leading-none " +
                TIER_NUMBER[tier] +
                " text-5xl md:text-6xl"
              }
            >
              {c.timesAboveGuideline}
              <span className="text-3xl md:text-4xl font-light align-baseline">×</span>
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted font-semibold leading-tight max-w-[8rem]">
              the health-protective level
            </span>
          </div>
        </div>
      )}

      {c.potentialEffect && (
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold mb-1.5">
            Potential effect
          </div>
          <div
            className={
              "font-serif italic text-lg leading-snug " +
              (tier === "deep" || tier === "red"
                ? "text-red-700"
                : tier === "amber"
                ? "text-amber-600"
                : "text-ocean-700")
            }
          >
            {c.potentialEffect}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-ocean-50 px-3 py-2.5">
          <div className="text-muted">This utility</div>
          <div className="font-medium text-ocean-700 mt-0.5">
            {c.detected !== null
              ? `${c.detected} ${c.detectedUnit ?? ""}`
              : "Not detected"}
          </div>
        </div>
        <div className="rounded-lg bg-cyan-50 px-3 py-2.5">
          <div className="text-muted">EWG guideline</div>
          <div className="font-medium text-cyan-700 mt-0.5">
            {c.ewgGuideline !== null
              ? `${c.ewgGuideline} ${c.ewgGuidelineUnit ?? ""}`
              : "—"}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted">
        {c.legalLimit !== null
          ? `EPA legal limit: ${c.legalLimit} ${c.legalLimitUnit ?? ""}`
          : "No EPA legal limit"}
      </div>
    </article>
  );
}
