"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import {
  ArrowUpRight,
  AlertTriangle,
  Search as SearchIcon,
  Layers,
  Building2,
  Home,
  Droplet,
  Sparkles,
} from "lucide-react";
import { STATES, type StateProfile } from "@/lib/states";
import { FIPS_TO_ABBR } from "@/lib/fips";

const GEO_URL = "/data/us-states-10m.json";

type ViewMode = "concern" | "lead" | "wells" | "source";

interface ViewDef {
  id: ViewMode;
  label: string;
  short: string;
  icon: typeof Layers;
  description: string;
  scaleLabel: string;
  buckets: { label: string; color: string }[];
}

const VIEWS: ViewDef[] = [
  {
    id: "concern",
    label: "Overall concern level",
    short: "Concern",
    icon: AlertTriangle,
    description:
      "Composite of EWG-flagged contaminant count and the presence of a flagship water story.",
    scaleLabel: "Concern",
    buckets: [
      { label: "Moderate", color: "#7DD3FC" },
      { label: "Elevated", color: "#FCD34D" },
      { label: "High", color: "#FB923C" },
      { label: "Severe", color: "#EF4444" },
    ],
  },
  {
    id: "lead",
    label: "Lead service lines",
    short: "Lead lines",
    icon: Building2,
    description:
      "Approximate count of lead service lines per state (EPA & state inventories).",
    scaleLabel: "Lines",
    buckets: [
      { label: "Not estimated", color: "#E5EAF0" },
      { label: "Under 50K", color: "#BFDBFE" },
      { label: "50–200K", color: "#60A5FA" },
      { label: "200K–500K", color: "#2563EB" },
      { label: "500K+", color: "#1D4ED8" },
    ],
  },
  {
    id: "wells",
    label: "Private well share",
    short: "Wells",
    icon: Home,
    description:
      "Approximate share of state households drinking from private wells (mostly unregulated).",
    scaleLabel: "% wells",
    buckets: [
      { label: "Under 10%", color: "#BBF7D0" },
      { label: "10–20%", color: "#86EFAC" },
      { label: "20–30%", color: "#22C55E" },
      { label: "30%+", color: "#15803D" },
    ],
  },
  {
    id: "source",
    label: "Source water dominance",
    short: "Source",
    icon: Droplet,
    description:
      "Whether the state's drinking water is dominated by surface water (rivers, lakes, reservoirs) or groundwater (aquifers, wells).",
    scaleLabel: "Source",
    buckets: [
      { label: "Surface-dominant", color: "#0EA5E9" },
      { label: "Balanced", color: "#A78BFA" },
      { label: "Groundwater-dominant", color: "#C9A663" },
      { label: "Unique source", color: "#06B6D4" },
    ],
  },
];

const STROKE = "#FFFFFF";

interface StateValueMeta {
  bucketIndex: number;
  color: string;
  label?: string;
  raw?: number | string;
}

function parseWellPct(text?: string): number | null {
  if (!text) return null;
  const m = /~?(\d+)\s*%/.exec(text);
  return m ? Number(m[1]) : null;
}

function categorizeSource(text: string): {
  bucketIndex: number;
  label: string;
} {
  const lower = text.toLowerCase();
  const surface = /(\d+)\s*%\s*surface/.exec(lower);
  const ground = /(\d+)\s*%\s*ground/.exec(lower);
  const sPct = surface ? Number(surface[1]) : null;
  const gPct = ground ? Number(ground[1]) : null;
  if (lower.includes("volcanic") || lower.includes("snowmelt") && (sPct ?? 0) < 20) {
    return { bucketIndex: 3, label: "Unique source" };
  }
  if (sPct !== null && sPct >= 65) return { bucketIndex: 0, label: "Surface-dominant" };
  if (gPct !== null && gPct >= 65) return { bucketIndex: 2, label: "Groundwater-dominant" };
  return { bucketIndex: 1, label: "Balanced" };
}

function computeStateValue(
  state: StateProfile,
  view: ViewMode,
  bucketsLength: number
): StateValueMeta {
  const buckets = VIEWS.find((v) => v.id === view)!.buckets;

  if (view === "concern") {
    const count = state.topContaminants.length;
    const hasFlagship = !!state.flagshipStory;
    let idx = 0;
    if (count >= 5 || (count >= 4 && hasFlagship)) idx = 3;
    else if (count >= 4 || (count >= 3 && hasFlagship)) idx = 2;
    else if (count >= 3) idx = 1;
    return { bucketIndex: idx, color: buckets[idx].color, label: buckets[idx].label };
  }

  if (view === "lead") {
    const n = state.leadServiceLines?.approxCount;
    if (n == null) return { bucketIndex: 0, color: buckets[0].color, label: "Not estimated" };
    let idx = 1;
    if (n >= 500_000) idx = 4;
    else if (n >= 200_000) idx = 3;
    else if (n >= 50_000) idx = 2;
    return {
      bucketIndex: idx,
      color: buckets[idx].color,
      label: buckets[idx].label,
      raw: n,
    };
  }

  if (view === "wells") {
    const pct = parseWellPct(state.privateWellShare);
    if (pct == null) return { bucketIndex: 0, color: buckets[0].color, label: "<10%" };
    let idx = 0;
    if (pct >= 30) idx = 3;
    else if (pct >= 20) idx = 2;
    else if (pct >= 10) idx = 1;
    return {
      bucketIndex: idx,
      color: buckets[idx].color,
      label: `${pct}%`,
      raw: pct,
    };
  }

  // source
  const cat = categorizeSource(state.primarySourceMix);
  return { bucketIndex: cat.bucketIndex, color: buckets[cat.bucketIndex].color, label: cat.label };
}

export function USMap() {
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("concern");
  const [hover, setHover] = useState<{
    abbr: string;
    x: number;
    y: number;
  } | null>(null);
  const [search, setSearch] = useState("");

  const slugLookup = useMemo(
    () => new Map(STATES.map((s) => [s.slug, s])),
    []
  );
  const abbrLookup = useMemo(
    () => new Map(STATES.map((s) => [s.abbreviation, s])),
    []
  );

  // Filter for search match (just used for highlighting)
  const searchHits = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return new Set<string>();
    return new Set(
      STATES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.abbreviation.toLowerCase() === q ||
          s.slug.includes(q)
      ).map((s) => s.abbreviation)
    );
  }, [search]);

  // Per-view computed values for each state
  const valuesByAbbr = useMemo(() => {
    const map = new Map<string, StateValueMeta>();
    for (const s of STATES) {
      map.set(s.abbreviation, computeStateValue(s, view, 4));
    }
    return map;
  }, [view]);

  const hoveredState = hover ? abbrLookup.get(hover.abbr) ?? null : null;
  const hoveredValue = hover ? valuesByAbbr.get(hover.abbr) : undefined;

  const currentView = VIEWS.find((v) => v.id === view)!;
  const flagshipStates = STATES.filter((s) => s.flagshipStory);

  // National aggregates per view
  const aggregates = useMemo(() => {
    if (view === "lead") {
      const total = STATES.reduce(
        (sum, s) => sum + (s.leadServiceLines?.approxCount ?? 0),
        0
      );
      const known = STATES.filter((s) => s.leadServiceLines?.approxCount).length;
      return [
        { label: "Documented lead lines", value: `~${(total / 1_000_000).toFixed(2)}M` },
        { label: "States with inventories", value: String(known) },
        { label: "Federal full-replace deadline", value: "2034" },
      ];
    }
    if (view === "wells") {
      const pcts = STATES.map((s) => parseWellPct(s.privateWellShare)).filter(
        (x): x is number => x !== null
      );
      const avg = pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : 0;
      const high = STATES.filter((s) => {
        const p = parseWellPct(s.privateWellShare);
        return p !== null && p >= 25;
      }).length;
      return [
        { label: "Avg private-well share", value: `${avg}%` },
        { label: "States with 25%+ on wells", value: String(high) },
        { label: "Most: Maine + New Hampshire", value: "~40%" },
      ];
    }
    if (view === "source") {
      const surface = STATES.filter(
        (s) => categorizeSource(s.primarySourceMix).bucketIndex === 0
      ).length;
      const ground = STATES.filter(
        (s) => categorizeSource(s.primarySourceMix).bucketIndex === 2
      ).length;
      const balanced = STATES.filter(
        (s) => categorizeSource(s.primarySourceMix).bucketIndex === 1
      ).length;
      return [
        { label: "Surface-dominant states", value: String(surface) },
        { label: "Groundwater-dominant", value: String(ground) },
        { label: "Balanced or unique", value: String(balanced + (STATES.length - surface - ground - balanced)) },
      ];
    }
    const severe = STATES.filter(
      (s) => valuesByAbbr.get(s.abbreviation)?.bucketIndex === 3
    ).length;
    const high = STATES.filter(
      (s) => valuesByAbbr.get(s.abbreviation)?.bucketIndex === 2
    ).length;
    return [
      { label: "Severe-concern states", value: String(severe) },
      { label: "High-concern states", value: String(high) },
      { label: "Flagship stories tracked", value: String(flagshipStates.length) },
    ];
  }, [view, valuesByAbbr, flagshipStates.length]);

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
        {/* View toggle */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-3.5 w-3.5 text-cyan-600" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
              Data view
            </span>
          </div>
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl bg-white border border-line p-1 shadow-soft">
            {VIEWS.map((v) => {
              const Icon = v.icon;
              const active = view === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  className={
                    "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all " +
                    (active
                      ? "bg-ocean-700 text-white shadow-soft"
                      : "text-ink/70 hover:text-ocean-700 hover:bg-ocean-50")
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {v.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a state…"
            className="w-full pl-10 pr-4 h-11 rounded-xl bg-white border border-line text-sm text-ocean-700 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 shadow-soft"
          />
        </div>
      </div>

      {/* View description */}
      <div className="mb-4 flex items-start gap-2 text-sm text-ink/70 leading-relaxed">
        <Sparkles className="h-3.5 w-3.5 text-brass-500 mt-1 flex-shrink-0" />
        <p>
          <span className="font-medium text-ocean-700">{currentView.label}.</span>{" "}
          {currentView.description}
        </p>
      </div>

      {/* Map container */}
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
                if (!abbr) return null;
                const state = abbrLookup.get(abbr);
                const value = valuesByAbbr.get(abbr);
                const fill = value?.color ?? "#3F4A5A";
                const isHovered = hover?.abbr === abbr;
                const matchesSearch =
                  searchHits.size > 0 && searchHits.has(abbr);
                const dimmedBySearch =
                  searchHits.size > 0 && !searchHits.has(abbr);
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
                        fillOpacity: dimmedBySearch ? 0.18 : 0.88,
                        stroke: STROKE,
                        strokeOpacity: matchesSearch ? 1 : 0.4,
                        strokeWidth: matchesSearch ? 2 : 0.75,
                        outline: "none",
                        cursor: state ? "pointer" : "default",
                        transition: "all 0.25s ease",
                      },
                      hover: {
                        fill,
                        fillOpacity: 1,
                        stroke: STROKE,
                        strokeOpacity: 1,
                        strokeWidth: 1.75,
                        outline: "none",
                        cursor: state ? "pointer" : "default",
                        filter: "brightness(1.15)",
                      },
                      pressed: {
                        fill,
                        fillOpacity: 1,
                        stroke: STROKE,
                        strokeOpacity: 1,
                        strokeWidth: 1.75,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* State abbreviation labels at centroid */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = String(geo.id).padStart(2, "0");
                const abbr = FIPS_TO_ABBR[fips];
                if (!abbr) return null;
                let centroid: [number, number] | null = null;
                try {
                  centroid = geoCentroid(geo) as [number, number];
                } catch {
                  return null;
                }
                if (!centroid) return null;
                const isHovered = hover?.abbr === abbr;
                return (
                  <Marker key={`label-${geo.rsmKey}`} coordinates={centroid}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: isHovered ? 13 : 10,
                        fill: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                        textShadow:
                          "0 1px 3px rgba(11,61,92,0.7), 0 0 8px rgba(11,61,92,0.6)",
                        pointerEvents: "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {abbr}
                    </text>
                  </Marker>
                );
              })
            }
          </Geographies>

          {/* Flagship story pulsing pins (only in concern view) */}
          {view === "concern" && (
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fips = String(geo.id).padStart(2, "0");
                  const abbr = FIPS_TO_ABBR[fips];
                  if (!abbr) return null;
                  const state = abbrLookup.get(abbr);
                  if (!state?.flagshipStory) return null;
                  let centroid: [number, number] | null = null;
                  try {
                    centroid = geoCentroid(geo) as [number, number];
                  } catch {
                    return null;
                  }
                  if (!centroid) return null;
                  return (
                    <Marker
                      key={`pin-${geo.rsmKey}`}
                      coordinates={[centroid[0], centroid[1] + 0.6]}
                    >
                      <g style={{ pointerEvents: "none" }}>
                        <circle r={4} fill="#FFFFFF" opacity={0.95} />
                        <circle r={6.5} fill="rgba(239,68,68,0.65)" />
                        <circle r={9} fill="none" stroke="rgba(239,68,68,0.8)" strokeWidth={1.5}>
                          <animate
                            attributeName="r"
                            from={5}
                            to={14}
                            dur="2.1s"
                            begin="0s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from={0.8}
                            to={0}
                            dur="2.1s"
                            begin="0s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </Marker>
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>

        {/* Tooltip */}
        {hover && hoveredState && (
          <div
            className="absolute pointer-events-none z-10 transition-opacity"
            style={{
              left: Math.min(hover.x + 14, 700),
              top: Math.max(hover.y - 8, 8),
            }}
          >
            <div className="rounded-2xl bg-white shadow-lift border border-line p-4 min-w-[260px] max-w-[320px]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                    {hoveredState.abbreviation}
                  </div>
                  <div className="font-serif text-xl text-ocean-700 leading-tight">
                    {hoveredState.name}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-1"
                  strokeWidth={2.5}
                />
              </div>

              {/* Current view value */}
              {hoveredValue && (
                <div className="rounded-xl border border-line bg-canvas p-3 mb-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold">
                      {currentView.scaleLabel}
                    </span>
                    <span
                      className="inline-block h-2.5 w-5 rounded-sm"
                      style={{ background: hoveredValue.color }}
                    />
                  </div>
                  <div className="font-serif text-base text-ocean-700 leading-tight">
                    {view === "lead" && hoveredValue.raw
                      ? `~${(Number(hoveredValue.raw) / 1000).toLocaleString()}K service lines`
                      : hoveredValue.label ?? "—"}
                  </div>
                </div>
              )}

              {/* Mini stats grid */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
                <div>
                  <div className="text-muted uppercase tracking-[0.15em] font-bold mb-0.5">
                    Top concerns
                  </div>
                  <div className="text-ink/80 font-serif text-sm">
                    {hoveredState.topContaminants.length}
                  </div>
                </div>
                <div>
                  <div className="text-muted uppercase tracking-[0.15em] font-bold mb-0.5">
                    Pop. served
                  </div>
                  <div className="text-ink/80 font-serif text-sm">
                    {hoveredState.servedPopulation
                      ? `${(hoveredState.servedPopulation / 1_000_000).toFixed(1)}M`
                      : "—"}
                  </div>
                </div>
              </div>

              {/* Top contaminant chips */}
              <div className="flex flex-wrap gap-1 mb-3">
                {hoveredState.topContaminants.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-canvas border border-line text-[10px] uppercase tracking-[0.12em] text-ink/70 font-bold"
                  >
                    {c.replace("-", " ")}
                  </span>
                ))}
              </div>

              {hoveredState.flagshipStory && (
                <div className="pt-2 border-t border-line/70 flex items-start gap-1.5 text-[11px] text-ink/70 leading-snug italic">
                  <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{hoveredState.flagshipStory}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Caption strip at bottom */}
        <div className="relative px-5 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
          <span>Click any state to open its full water profile.</span>
          {view === "concern" && (
            <span className="inline-flex items-center gap-1.5">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Pulsing pin = flagship water story
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-5 text-sm">
        <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
          {currentView.scaleLabel}
        </span>
        {currentView.buckets.map((b) => (
          <div key={b.label} className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-6 rounded-sm shadow-sm"
              style={{ background: b.color }}
            />
            <span className="text-ink/75 text-xs">{b.label}</span>
          </div>
        ))}
      </div>

      {/* National aggregates ribbon */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line">
        {aggregates.map((a, i) => (
          <div
            key={i}
            className="bg-white p-5 md:p-6 flex flex-col gap-1"
          >
            <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
              {a.label}
            </div>
            <div className="font-serif text-3xl md:text-4xl text-ocean-700 font-light leading-none">
              {a.value}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted leading-relaxed max-w-2xl mx-auto">
        Data drawn from EPA SDWIS, state primacy-agency inventories, USGS,
        and EWG state-level monitoring. Approximations, not exhaustive
        sampling. See the state-specific profile for full methodology.
      </p>
    </div>
  );
}
