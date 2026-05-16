"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ArrowUpRight } from "lucide-react";
import { STATES } from "@/lib/states";
import { FIPS_TO_ABBR } from "@/lib/fips";

const GEO_URL = "/data/us-states-10m.json";

type ConcernLevel = "low" | "medium" | "high" | "severe";

const FILL: Record<ConcernLevel, string> = {
  low: "#7DD3FC", // cyan-300
  medium: "#FCD34D", // amber-300
  high: "#FB923C", // orange-400
  severe: "#EF4444", // red-500
};

const STROKE = "#FFFFFF";

const LEGEND: { level: ConcernLevel; label: string }[] = [
  { level: "low", label: "Moderate concern" },
  { level: "medium", label: "Elevated" },
  { level: "high", label: "High" },
  { level: "severe", label: "Severe / flagship" },
];

function concernFor(slugLookup: Map<string, (typeof STATES)[number]>, abbr: string): {
  level: ConcernLevel;
  state: (typeof STATES)[number] | null;
} {
  const state = Array.from(slugLookup.values()).find((s) => s.abbreviation === abbr) ?? null;
  if (!state) return { level: "low", state: null };
  const count = state.topContaminants.length;
  const hasFlagship = !!state.flagshipStory;
  let level: ConcernLevel = "low";
  if (count >= 5 || (count >= 4 && hasFlagship)) level = "severe";
  else if (count >= 4 || (count >= 3 && hasFlagship)) level = "high";
  else if (count >= 3) level = "medium";
  return { level, state };
}

export function USMap() {
  const router = useRouter();
  const [hover, setHover] = useState<{
    abbr: string;
    x: number;
    y: number;
  } | null>(null);

  const slugLookup = useMemo(
    () => new Map(STATES.map((s) => [s.slug, s])),
    []
  );

  const hovered = hover
    ? concernFor(slugLookup, hover.abbr).state
    : null;

  return (
    <div className="relative">
      {/* Map */}
      <div className="relative rounded-3xl bg-gradient-to-br from-midnight via-ocean-800 to-midnight shadow-lift overflow-hidden border border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
        </div>

        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={960}
          height={560}
          style={{ width: "100%", height: "auto", position: "relative" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = String(geo.id).padStart(2, "0");
                const abbr = FIPS_TO_ABBR[fips];
                if (!abbr) return null; // skip DC + territories
                const { level, state } = concernFor(slugLookup, abbr);
                const fill = FILL[level];
                const isHovered = hover?.abbr === abbr;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      const rect = (e.currentTarget as SVGElement)
                        .ownerSVGElement?.getBoundingClientRect();
                      setHover({
                        abbr,
                        x: e.clientX - (rect?.left ?? 0),
                        y: e.clientY - (rect?.top ?? 0),
                      });
                    }}
                    onMouseMove={(e) => {
                      const rect = (e.currentTarget as SVGElement)
                        .ownerSVGElement?.getBoundingClientRect();
                      setHover({
                        abbr,
                        x: e.clientX - (rect?.left ?? 0),
                        y: e.clientY - (rect?.top ?? 0),
                      });
                    }}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      if (state) router.push(`/water/${state.slug}`);
                    }}
                    style={{
                      default: {
                        fill,
                        fillOpacity: 0.85,
                        stroke: STROKE,
                        strokeOpacity: 0.4,
                        strokeWidth: 0.75,
                        outline: "none",
                        cursor: state ? "pointer" : "default",
                        transition: "all 0.2s ease",
                      },
                      hover: {
                        fill,
                        fillOpacity: 1,
                        stroke: STROKE,
                        strokeOpacity: 1,
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: state ? "pointer" : "default",
                        filter: "brightness(1.15)",
                      },
                      pressed: {
                        fill,
                        fillOpacity: 1,
                        stroke: STROKE,
                        strokeOpacity: 1,
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip */}
        {hover && hovered && (
          <div
            className="absolute pointer-events-none z-10 transition-opacity"
            style={{
              left: Math.min(hover.x + 14, 720),
              top: Math.max(hover.y - 8, 8),
            }}
          >
            <div className="rounded-xl bg-white shadow-lift border border-line p-4 min-w-[220px] max-w-[280px]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                    {hovered.abbreviation}
                  </div>
                  <div className="font-serif text-lg text-ocean-700 leading-tight">
                    {hovered.name}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-cyan-600 flex-shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-1.5">
                Top concerns
              </div>
              <div className="flex flex-wrap gap-1">
                {hovered.topContaminants.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center px-2 py-0.5 rounded-full bg-canvas border border-line text-[10px] uppercase tracking-[0.15em] text-ink/70 font-bold"
                  >
                    {c.replace("-", " ")}
                  </span>
                ))}
              </div>
              {hovered.flagshipStory && (
                <div className="mt-2 pt-2 border-t border-line/70 text-[11px] text-ink/70 leading-snug italic">
                  {hovered.flagshipStory}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
        <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
          Concern level
        </span>
        {LEGEND.map((l) => (
          <div key={l.level} className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-6 rounded-sm shadow-sm"
              style={{ background: FILL[l.level] }}
            />
            <span className="text-ink/75 text-xs">{l.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Tap or click any state to see the full profile. Concern level reflects
        the count of EWG-flagged contaminants and the presence of a flagship
        regional story.
      </p>
    </div>
  );
}
