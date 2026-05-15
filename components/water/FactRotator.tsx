"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FACTS } from "@/lib/facts";

export function FactRotator({ intervalMs = 7500 }: { intervalMs?: number }) {
  // Start at 0 so server-rendered HTML and client's first render match
  // (avoids a hydration mismatch). Randomize after mount.
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * FACTS.length));
    const t = setInterval(
      () => setIdx((i) => (i + 1) % FACTS.length),
      intervalMs
    );
    return () => clearInterval(t);
  }, [intervalMs]);

  const f = FACTS[idx];

  return (
    <div className="rounded-3xl border border-line bg-white p-8 md:p-10 shadow-soft relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-wash opacity-50 pointer-events-none" />
      <div className="relative">
        <div className="eyebrow mb-4">Did You Know?</div>
        <p className="font-serif text-2xl md:text-3xl leading-snug text-ocean-700 text-balance min-h-[7rem]">
          {f.fact}
        </p>
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-muted">
            Source: <span className="text-ink/80">{f.sourceTitle}</span>
          </span>
          <Link
            href="/facts"
            className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-600 font-medium"
          >
            More facts <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
