"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon, Command } from "lucide-react";

interface Props {
  /** "compact" = small icon button only (for tight nav). "bar" = full search-bar look. */
  variant?: "compact" | "bar";
  className?: string;
}

export function SearchTrigger({ variant = "compact", className = "" }: Props) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.platform));
    }
  }, []);

  const open = () => {
    window.dispatchEvent(new Event("waf:search:open"));
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={open}
        className={`group inline-flex items-center justify-center h-9 w-9 rounded-lg text-ink/65 hover:text-ocean-700 hover:bg-ocean-50 transition-all ${className}`}
        aria-label="Open search"
        title="Search (⌘K)"
      >
        <SearchIcon className="h-4 w-4" strokeWidth={2.25} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={`group inline-flex items-center gap-3 h-10 px-3.5 rounded-xl bg-canvas border border-line text-ink/55 hover:border-ocean-200 hover:text-ocean-700 transition-all min-w-[220px] ${className}`}
      aria-label="Open search"
    >
      <SearchIcon className="h-4 w-4" strokeWidth={2.25} />
      <span className="text-sm flex-1 text-left">Search the foundation…</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-line bg-white text-[10px] text-muted font-mono">
        {isMac ? <Command className="h-2.5 w-2.5" /> : "Ctrl"}K
      </kbd>
    </button>
  );
}
