import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Contaminant, ContaminantCategory } from "@/lib/contaminants";

interface Props {
  contaminant: Contaminant;
  /** Optional override for the visible category label */
  eyebrow?: string;
}

/**
 * Premium contaminant pill card used on the homepage preview grid and
 * the /explore grid. Editorial-tier treatment:
 *
 *   - Brass top accent stripe (always visible, intensifies on hover)
 *   - Category eyebrow + chemical formula in opposing corners
 *   - Massive serif name as the focal point
 *   - Subtle category-tinted background wash
 *   - Brass corner ornament on hover
 *   - "Read deep dive →" CTA with arrow that lifts on hover
 *   - Per-category accent tone for visual differentiation
 */

const CATEGORY_ACCENT: Record<
  ContaminantCategory,
  { stripe: string; wash: string; chip: string }
> = {
  metal: {
    stripe: "from-brass-300 via-brass-400 to-brass-300",
    wash: "from-brass-50/60 via-white to-white",
    chip: "text-brass-500",
  },
  industrial: {
    stripe: "from-ocean-400 via-ocean-600 to-ocean-400",
    wash: "from-ocean-50/70 via-white to-white",
    chip: "text-ocean-600",
  },
  disinfectant: {
    stripe: "from-cyan-300 via-cyan-400 to-cyan-300",
    wash: "from-cyan-50/60 via-white to-white",
    chip: "text-cyan-600",
  },
  "disinfection-byproduct": {
    stripe: "from-amber-300 via-amber-400 to-amber-300",
    wash: "from-amber-50/60 via-white to-white",
    chip: "text-amber-500",
  },
  agricultural: {
    stripe: "from-cyan-300 via-ocean-400 to-cyan-300",
    wash: "from-cyan-50/40 via-white to-white",
    chip: "text-ocean-600",
  },
  natural: {
    stripe: "from-brass-200 via-brass-400 to-brass-200",
    wash: "from-brass-50/50 via-white to-white",
    chip: "text-brass-500",
  },
  microbial: {
    stripe: "from-cyan-300 via-cyan-500 to-cyan-300",
    wash: "from-cyan-50/60 via-white to-white",
    chip: "text-cyan-600",
  },
  pharmaceutical: {
    stripe: "from-ocean-300 via-cyan-400 to-ocean-300",
    wash: "from-ocean-50/60 via-white to-white",
    chip: "text-ocean-600",
  },
};

export function ContaminantPillCard({ contaminant: c, eyebrow }: Props) {
  const accent = CATEGORY_ACCENT[c.category];
  const label = (eyebrow ?? c.category).replace("-", " ");

  return (
    <Link
      href={`/explore/${c.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-line bg-white p-7 md:p-8 shadow-soft hover:shadow-lift hover:border-ocean-200 transition-all duration-300 h-full"
    >
      {/* Top accent stripe — always visible, intensifies on hover */}
      <span
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.stripe} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Subtle category-tinted wash, layered behind content */}
      <span
        className={`absolute inset-0 bg-gradient-to-br ${accent.wash} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Brass corner mark — appears on hover, top-right */}
      <svg
        className="absolute top-3 right-3 h-3.5 w-3.5 text-brass-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path d="M0 0 L12 0 L12 12 Z" fill="currentColor" opacity="0.18" />
        <path d="M12 0 L12 6" stroke="currentColor" strokeWidth="1" />
        <path d="M12 0 L6 0" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative">
        {/* Header row: category eyebrow + chemical formula */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-brass-300/60" />
            <span
              className={`text-[10px] uppercase tracking-[0.22em] font-bold ${accent.chip}`}
            >
              {label}
            </span>
          </div>
          {c.formula && (
            <span className="font-serif text-2xl text-ocean-700/30 leading-none -mt-1">
              {c.formula}
            </span>
          )}
        </div>

        {/* Massive serif name — the focal point */}
        <h3 className="font-serif text-3xl md:text-4xl text-ocean-700 leading-[1.02] mb-5 group-hover:text-ocean-700 transition-colors">
          {c.name}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-ink/70 leading-relaxed mb-7">
          {c.oneLine}
        </p>

        {/* Brass divider before CTA */}
        <span className="block h-px w-full bg-gradient-to-r from-brass-300/40 via-line to-line mb-4" />

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-muted font-semibold group-hover:text-ocean-700 transition-colors">
            Read deep dive
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-canvas border border-line group-hover:bg-ocean-600 group-hover:border-ocean-600 transition-all duration-300">
            <ArrowUpRight
              className="h-3.5 w-3.5 text-ocean-700 group-hover:text-white transition-all duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
