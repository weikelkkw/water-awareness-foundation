"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  X,
  AlertTriangle,
  FlaskConical,
  Droplet,
  Microscope,
  Beaker,
  Leaf,
  Mountain,
  Bug,
  Pill as PillIcon,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import {
  CONTAMINANTS,
  getContaminant,
  type ContaminantCategory,
  type HealthEffect,
} from "@/lib/contaminants";
import { cn } from "@/lib/utils";

const CATEGORIES: {
  value: ContaminantCategory;
  label: string;
  icon: typeof Beaker;
  accent: string;
  description: string;
}[] = [
  {
    value: "metal",
    label: "Heavy metals",
    icon: Mountain,
    accent: "text-brass-500",
    description:
      "Lead, arsenic, copper — old infrastructure and geology, with developmental and cardiovascular stakes.",
  },
  {
    value: "industrial",
    label: "Industrial contaminants",
    icon: FlaskConical,
    accent: "text-ocean-600",
    description:
      "Synthetic chemicals from manufacturing, firefighting foam, and plastics that drift into water tables.",
  },
  {
    value: "disinfectant",
    label: "Disinfectants",
    icon: Droplet,
    accent: "text-cyan-600",
    description:
      "Chlorine and chloramine — necessary for safety, but with their own tradeoffs in long-term exposure.",
  },
  {
    value: "disinfection-byproduct",
    label: "Disinfection byproducts",
    icon: Beaker,
    accent: "text-amber-500",
    description:
      "Compounds formed when disinfectants react with organic matter — many are probable carcinogens.",
  },
  {
    value: "agricultural",
    label: "Agricultural runoff",
    icon: Leaf,
    accent: "text-cyan-700",
    description:
      "Fertilizer-derived nitrate, pesticides, herbicides. Heaviest in farming corridors and well water.",
  },
  {
    value: "natural",
    label: "Naturally occurring",
    icon: Mountain,
    accent: "text-brass-500",
    description:
      "Fluoride, geologic arsenic, radon — present in source water before any human input.",
  },
  {
    value: "microbial",
    label: "Microbial",
    icon: Bug,
    accent: "text-cyan-600",
    description:
      "Pathogens — the original reason public water systems exist. Rare in U.S. tap, devastating when present.",
  },
  {
    value: "pharmaceutical",
    label: "Pharmaceuticals",
    icon: PillIcon,
    accent: "text-ocean-600",
    description:
      "Drug residues passing through wastewater treatment. Levels are tiny; long-term effects largely unknown.",
  },
];

const HEALTH: { value: HealthEffect; label: string }[] = [
  { value: "cancer", label: "Cancer" },
  { value: "developmental", label: "Developmental" },
  { value: "neurological", label: "Neurological" },
  { value: "hormonal", label: "Hormonal" },
  { value: "cardiovascular", label: "Cardiovascular" },
  { value: "kidney", label: "Kidney" },
  { value: "liver", label: "Liver" },
  { value: "reproductive", label: "Reproductive" },
  { value: "thyroid", label: "Thyroid" },
  { value: "immune", label: "Immune" },
  { value: "skin", label: "Skin" },
];

export default function ExplorePage() {
  const [cats, setCats] = useState<Set<ContaminantCategory>>(new Set());
  const [tags, setTags] = useState<Set<HealthEffect>>(new Set());

  const filterActive = cats.size > 0 || tags.size > 0;

  const filtered = useMemo(() => {
    return CONTAMINANTS.filter((c) => {
      if (cats.size > 0 && !cats.has(c.category)) return false;
      if (tags.size > 0) {
        const hit = c.healthEffects.tags.some((t) => tags.has(t));
        if (!hit) return false;
      }
      return true;
    });
  }, [cats, tags]);

  const featured = getContaminant("lead")!;

  // For the grouped view, exclude the featured contaminant
  const grouped = useMemo(() => {
    const out = new Map<ContaminantCategory, typeof CONTAMINANTS>();
    for (const c of filtered) {
      if (c.slug === featured.slug && !filterActive) continue;
      const bucket = out.get(c.category) ?? [];
      bucket.push(c);
      out.set(c.category, bucket);
    }
    return out;
  }, [filtered, filterActive, featured.slug]);

  const reset = () => {
    setCats(new Set());
    setTags(new Set());
  };

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/3 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow className="text-brass-300">Contaminant Explorer</Eyebrow>
            </div>
            <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
              The periodic table of
              <em className="not-italic italic font-light text-cyan-300"> tap water threats.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              Every contaminant worth understanding — what it is, where it
              comes from, what the science actually says, the legal limit,
              EWG&apos;s health-protective guideline, and exactly which filter
              types remove it.
            </p>
          </div>

          {/* Stats ribbon */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            <HeroStat label="Contaminants tracked" value={String(CONTAMINANTS.length)} />
            <HeroStat label="Source categories" value={String(CATEGORIES.length)} accent />
            <HeroStat label="2024 federal rules" value="2" />
            <HeroStat label="Sources cited" value="40+" />
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* FEATURED SPOTLIGHT — magazine cover style                    */}
      {/* ============================================================ */}
      <Section className="relative py-16 md:py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(0,180,216,0.10), transparent 60%)",
          }}
        />
        <Container className="relative">
          <FeaturedSpotlight contaminant={featured} />
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* FILTER STRIP                                                 */}
      {/* ============================================================ */}
      <Section className="py-10 bg-canvas border-b border-line">
        <Container>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              Source category
            </span>
            {filterActive && (
              <button
                onClick={reset}
                className="ml-auto inline-flex items-center gap-1 text-xs text-cyan-500 hover:text-cyan-600"
              >
                Clear filters <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((c) => (
              <Pill
                key={c.value}
                active={cats.has(c.value)}
                onClick={() => toggle(cats, c.value, setCats)}
              >
                {c.label}
              </Pill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              Health effect
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {HEALTH.map((h) => (
              <Pill
                key={h.value}
                active={tags.has(h.value)}
                onClick={() => toggle(tags, h.value, setTags)}
              >
                {h.label}
              </Pill>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* BODY — grouped by category (no filter) or flat (filter on)   */}
      {/* ============================================================ */}
      {filterActive ? (
        <Section className="relative py-16 bg-canvas overflow-hidden">
          <BodyAtmosphere variant="mixed" />
          <Container className="relative">
            <div className="text-sm text-muted mb-8">
              Showing {filtered.length} of {CONTAMINANTS.length} contaminants
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-line bg-white p-12 text-center shadow-soft">
                <p className="text-lg text-ink/70 mb-4">
                  No contaminants match this combination.
                </p>
                <button
                  onClick={reset}
                  className="text-cyan-600 hover:underline text-sm font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((c) => (
                  <ContaminantPillCard key={c.slug} contaminant={c} />
                ))}
              </div>
            )}
          </Container>
        </Section>
      ) : (
        <>
          {CATEGORIES.filter((cat) => grouped.has(cat.value)).map((cat, i) => {
            const items = grouped.get(cat.value) ?? [];
            const Icon = cat.icon;
            const tinted = i % 2 === 1;
            return (
              <Section
                key={cat.value}
                className={
                  "relative py-16 overflow-hidden " +
                  (tinted
                    ? "bg-ocean-50/40 border-y border-ocean-100/50"
                    : "bg-canvas")
                }
              >
                {!tinted && <BodyAtmosphere variant="mixed" />}
                <Container className="relative">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-soft border border-line">
                          <Icon className={cn("h-5 w-5", cat.accent)} />
                        </span>
                        <Eyebrow className={cat.accent}>{cat.label}</Eyebrow>
                        <span className="text-xs text-muted font-mono">
                          {String(items.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="display text-display-md text-ocean-700 mb-3 text-balance leading-[1.05]">
                        {cat.label}.
                      </h2>
                      <p className="text-lg text-ink/75 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((c) => (
                      <ContaminantPillCard key={c.slug} contaminant={c} />
                    ))}
                  </div>
                </Container>
              </Section>
            );
          })}
        </>
      )}

      {/* ============================================================ */}
      {/* CTA                                                          */}
      {/* ============================================================ */}
      <Section className="py-16 bg-canvas">
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
              <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
            </div>
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-300" />
                  <Eyebrow className="text-brass-300">From the lab to your tap</Eyebrow>
                </div>
                <h2 className="display text-3xl md:text-4xl text-white mb-4 text-balance leading-[1.1]">
                  Which of these is actually in
                  <em className="not-italic italic font-light text-cyan-300"> your water?</em>
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
                    Run my ZIP report <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ----------------------------------------------------------------- */
/* Sub-components                                                    */
/* ----------------------------------------------------------------- */

function HeroStat({
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
        "p-5 md:p-6 " + (accent ? "bg-cyan-500/15" : "bg-white/[0.04]")
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
          "font-serif text-3xl md:text-4xl font-light leading-none " +
          (accent ? "text-cyan-200" : "text-white")
        }
      >
        {value}
      </div>
    </div>
  );
}

function FeaturedSpotlight({
  contaminant: c,
}: {
  contaminant: ReturnType<typeof getContaminant> & object;
}) {
  return (
    <div className="relative grid md:grid-cols-12 gap-8 md:gap-10 items-stretch">
      {/* Left — text card */}
      <div className="md:col-span-7 relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden p-8 md:p-12">
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400/0 via-red-500 to-red-400/0" />
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] uppercase tracking-[0.22em] font-bold">
            <AlertTriangle className="h-3 w-3" /> Highest priority
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
            Featured
          </span>
        </div>
        <h2 className="display text-display-lg text-ocean-700 mb-5 text-balance leading-[0.98]">
          {c.name}
        </h2>
        <p className="text-lg md:text-xl text-ink/80 leading-relaxed font-serif italic mb-8 max-w-xl">
          {c.oneLine}
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <SpotlightStat
            label="EWG guideline"
            value={
              c.regulation.ewgGuideline
                ? `${c.regulation.ewgGuideline.value} ${c.regulation.ewgGuideline.unit}`
                : "—"
            }
          />
          <SpotlightStat
            label="EPA action level"
            value={
              c.regulation.mclLabel?.split("(")[0].trim() ??
              (c.regulation.mcl
                ? `${c.regulation.mcl.value} ${c.regulation.mcl.unit}`
                : "—")
            }
          />
          <SpotlightStat label="Health goal" value="0 ppb" accent />
        </div>
        <Link
          href={`/explore/${c.slug}`}
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium group"
        >
          <Microscope className="h-4 w-4" />
          Read the full {c.name.toLowerCase()} deep dive
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Right — atomic tile */}
      <div className="md:col-span-5 relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white shadow-lift overflow-hidden p-8 md:p-12 flex flex-col justify-between min-h-[340px]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.6), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <div className="relative flex items-start justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-brass-300 font-bold">
            {c.category.replace("-", " ")}
          </div>
          <div className="text-xs font-mono text-white/55">01 / {String(CONTAMINANTS.length).padStart(2, "0")}</div>
        </div>
        <div className="relative text-center py-4">
          <div
            className="display font-light text-cyan-200 leading-none"
            style={{ fontSize: "clamp(7rem, 18vw, 12rem)" }}
          >
            {c.formula ?? c.name.charAt(0)}
          </div>
          <div className="mt-4 font-serif text-2xl text-white">{c.name}</div>
        </div>
        <div className="relative grid grid-cols-2 gap-4 text-xs text-white/70">
          <div>
            <div className="text-brass-300/90 uppercase tracking-[0.18em] font-bold mb-1">
              In ~
            </div>
            <div className="text-white text-sm">9.2M U.S. homes</div>
          </div>
          <div>
            <div className="text-brass-300/90 uppercase tracking-[0.18em] font-bold mb-1">
              Safe level
            </div>
            <div className="text-white text-sm">Zero</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightStat({
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
        "rounded-2xl border p-4 " +
        (accent
          ? "bg-cyan-50 border-cyan-100"
          : "bg-canvas border-line")
      }
    >
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-1.5">
        {label}
      </div>
      <div
        className={
          "font-serif text-base leading-tight " +
          (accent ? "text-cyan-700" : "text-ocean-700")
        }
      >
        {value}
      </div>
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border",
        active
          ? "bg-ocean-600 text-white border-ocean-600 shadow-soft"
          : "bg-white text-ink/70 border-line hover:border-ocean-200 hover:text-ocean-700"
      )}
    >
      {children}
    </button>
  );
}
