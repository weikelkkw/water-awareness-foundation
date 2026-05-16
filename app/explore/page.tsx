"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, X } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import {
  CONTAMINANTS,
  type ContaminantCategory,
  type HealthEffect,
} from "@/lib/contaminants";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: ContaminantCategory; label: string }[] = [
  { value: "metal", label: "Heavy metal" },
  { value: "industrial", label: "Industrial" },
  { value: "disinfectant", label: "Disinfectant" },
  { value: "disinfection-byproduct", label: "Disinfection byproduct" },
  { value: "agricultural", label: "Agricultural" },
  { value: "natural", label: "Natural" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
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
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
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
              Every contaminant worth understanding,
              <em className="not-italic italic font-light text-cyan-300"> in plain English.</em>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic">
              Filter by source category or health effect. Every entry is a
              fully-sourced deep dive — what it is, where it comes from, what
              the science actually says, the legal limit, EWG&apos;s
              health-protective guideline, and exactly which filter types
              remove it.
            </p>
          </div>
        </Container>
      </section>

      <Section className="py-8 bg-canvas border-b border-line">
        <Container>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              Source category
            </span>
            {(cats.size > 0 || tags.size > 0) && (
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

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container className="relative">
          <div className="text-sm text-muted mb-6">
            Showing {filtered.length} of {CONTAMINANTS.length} contaminants
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <ContaminantPillCard key={c.slug} contaminant={c} />
            ))}
          </div>
        </Container>
      </Section>
    </>
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
