"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Search as SearchIcon,
  FlaskConical,
  BookOpen,
  Newspaper,
  Quote,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { SearchDoc, SearchKind } from "@/lib/search/index";

const KIND_META: Record<
  SearchKind,
  { label: string; icon: typeof SearchIcon; accent: string }
> = {
  contaminant: { label: "Contaminants", icon: FlaskConical, accent: "text-cyan-600" },
  article: { label: "Articles", icon: BookOpen, accent: "text-ocean-600" },
  news: { label: "News", icon: Newspaper, accent: "text-brass-500" },
  fact: { label: "Facts", icon: Quote, accent: "text-cyan-700" },
  page: { label: "Foundation pages", icon: FileText, accent: "text-muted" },
};

const ALL_KINDS: SearchKind[] = ["contaminant", "article", "news", "page", "fact"];

export function SearchPageClient({
  index,
  initialQuery,
}: {
  index: SearchDoc[];
  initialQuery: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [filter, setFilter] = useState<SearchKind | "all">("all");

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.25 },
          { name: "meta", weight: 0.15 },
          { name: "body", weight: 0.1 },
        ],
        threshold: 0.36,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [index]
  );

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return fuse.search(q).map((r) => r.item);
  }, [q, fuse]);

  const visible = useMemo(
    () => (filter === "all" ? results : results.filter((r) => r.kind === filter)),
    [results, filter]
  );

  const counts = useMemo(() => {
    const map = new Map<SearchKind, number>();
    for (const r of results) map.set(r.kind, (map.get(r.kind) ?? 0) + 1);
    return map;
  }, [results]);

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="rounded-3xl bg-white border border-line shadow-lift overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
        <div className="flex items-center gap-3 px-5 py-4">
          <SearchIcon className="h-5 w-5 text-muted flex-shrink-0" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search contaminants, articles, news…"
            className="flex-1 bg-transparent text-lg text-ocean-700 placeholder:text-muted focus:outline-none"
            autoFocus
            spellCheck={false}
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="text-xs text-muted hover:text-ocean-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      {q.trim() && results.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All <span className="ml-1 text-muted">({results.length})</span>
          </FilterPill>
          {ALL_KINDS.filter((k) => counts.has(k)).map((k) => {
            const meta = KIND_META[k];
            const Icon = meta.icon;
            return (
              <FilterPill
                key={k}
                active={filter === k}
                onClick={() => setFilter(k)}
              >
                <Icon className={`h-3 w-3 inline mr-1 ${meta.accent}`} />
                {meta.label}{" "}
                <span className="ml-1 text-muted">({counts.get(k) ?? 0})</span>
              </FilterPill>
            );
          })}
        </div>
      )}

      {/* Results */}
      {!q.trim() ? (
        <div className="rounded-3xl bg-white border border-line shadow-soft p-10 text-center">
          <p className="text-ink/70">
            Start typing to search every contaminant, article, news post, and
            foundation page.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-3xl bg-white border border-line shadow-soft p-10 text-center">
          <p className="text-lg text-ink/70 mb-2">No results for &ldquo;{q}&rdquo;.</p>
          <p className="text-sm text-muted">Try a shorter or simpler query.</p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {visible.map((item, i) => {
            const meta = KIND_META[item.kind];
            const Icon = meta.icon;
            return (
              <li key={`${item.href}-${i}`}>
                <Link
                  href={item.href}
                  className="group relative block rounded-2xl bg-white border border-line p-6 md:p-7 shadow-soft hover:shadow-lift hover:border-cyan-300/60 transition-all overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-canvas border border-line flex-shrink-0">
                      <Icon className={`h-4 w-4 ${meta.accent}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1.5">
                        {meta.label}
                        {item.meta && <span> · {item.meta}</span>}
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-2 leading-snug text-balance">
                        {item.title}
                      </h2>
                      <p className="text-[15px] text-ink/75 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted mt-2 flex-shrink-0 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border " +
        (active
          ? "bg-ocean-600 text-white border-ocean-600 shadow-soft"
          : "bg-white text-ink/70 border-line hover:border-ocean-200 hover:text-ocean-700")
      }
    >
      {children}
    </button>
  );
}
