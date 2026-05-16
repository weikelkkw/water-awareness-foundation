"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Search as SearchIcon,
  X,
  FlaskConical,
  BookOpen,
  Newspaper,
  Quote,
  FileText,
  ArrowRight,
  Command,
} from "lucide-react";
import type { SearchDoc, SearchKind } from "@/lib/search/index";

const KIND_META: Record<
  SearchKind,
  { label: string; icon: typeof SearchIcon; accent: string }
> = {
  contaminant: { label: "Contaminant", icon: FlaskConical, accent: "text-cyan-600" },
  article: { label: "Article", icon: BookOpen, accent: "text-ocean-600" },
  news: { label: "News", icon: Newspaper, accent: "text-brass-500" },
  fact: { label: "Fact", icon: Quote, accent: "text-cyan-700" },
  page: { label: "Page", icon: FileText, accent: "text-muted" },
};

const SUGGESTED = [
  { label: "PFAS", q: "PFAS" },
  { label: "Lead", q: "lead" },
  { label: "Fluoride", q: "fluoride" },
  { label: "Filters", q: "filter" },
  { label: "Pregnancy", q: "pregnancy" },
];

export function SearchModal({ index }: { index: SearchDoc[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Global cmd+K / ctrl+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Listen for custom open events from the nav trigger
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("waf:search:open", handler);
    return () => window.removeEventListener("waf:search:open", handler);
  }, []);

  // Focus input + lock body scroll when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return fuse.search(q).slice(0, 28).map((r) => r.item);
  }, [q, fuse]);

  // Group results by kind for display
  const grouped = useMemo(() => {
    const order: SearchKind[] = ["contaminant", "article", "news", "page", "fact"];
    const map = new Map<SearchKind, SearchDoc[]>();
    for (const r of results) {
      const arr = map.get(r.kind) ?? [];
      arr.push(r);
      map.set(r.kind, arr);
    }
    return order
      .filter((k) => map.has(k))
      .map((k) => ({ kind: k, items: map.get(k) ?? [] }));
  }, [results]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] md:pt-[14vh] px-4"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-midnight/75 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-lift border border-line overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brass top accent */}
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <SearchIcon className="h-5 w-5 text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search contaminants, articles, news, ZIPs…"
            className="flex-1 bg-transparent text-lg text-ocean-700 placeholder:text-muted focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-line bg-canvas text-[10px] text-muted font-mono">
            ESC
          </kbd>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ocean-700 hover:bg-ocean-50"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results / empty / suggested */}
        <div className="max-h-[60vh] md:max-h-[55vh] overflow-y-auto">
          {!q.trim() ? (
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-3">
                Try searching for
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {SUGGESTED.map((s) => (
                  <button
                    key={s.q}
                    type="button"
                    onClick={() => setQ(s.q)}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-canvas border border-line text-ink/70 hover:border-ocean-200 hover:text-ocean-700 transition-all"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="text-xs text-muted leading-relaxed">
                Press{" "}
                <kbd className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded border border-line bg-canvas text-[10px] text-ink/75 font-mono">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>{" "}
                from anywhere on the site to open this dialog.
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted">
              <p className="text-sm">
                No results for{" "}
                <span className="font-medium text-ocean-700">
                  &ldquo;{q}&rdquo;
                </span>
                .
              </p>
              <p className="mt-2 text-xs">
                Try a shorter query, or{" "}
                <Link
                  href="/search"
                  className="text-cyan-600 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  browse all results
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="py-2">
              {grouped.map((g) => {
                const meta = KIND_META[g.kind];
                const Icon = meta.icon;
                return (
                  <div key={g.kind} className="px-2 py-2">
                    <div className="px-3 pt-2 pb-1 flex items-center gap-2">
                      <Icon className={`h-3 w-3 ${meta.accent}`} />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                        {meta.label} ({g.items.length})
                      </span>
                    </div>
                    <ul>
                      {g.items.map((item, i) => (
                        <li key={`${g.kind}-${i}`}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-ocean-50/70 transition-colors"
                          >
                            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-canvas border border-line flex-shrink-0 group-hover:bg-white">
                              <Icon className={`h-3.5 w-3.5 ${meta.accent}`} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="font-serif text-base text-ocean-700 group-hover:text-cyan-600 transition-colors leading-snug text-balance">
                                {item.title}
                              </div>
                              {item.description && (
                                <div className="text-xs text-muted mt-0.5 line-clamp-2 leading-relaxed">
                                  {item.description}
                                </div>
                              )}
                              {item.meta && (
                                <div className="text-[10px] uppercase tracking-[0.18em] text-brass-500/80 font-bold mt-1">
                                  {item.meta}
                                </div>
                              )}
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-muted mt-2 flex-shrink-0 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="px-5 py-3 border-t border-line/70 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  See all results <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
