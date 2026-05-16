"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, MapPin, AlertCircle } from "lucide-react";
import { isValidZip } from "@/lib/utils";

export function ZipCodeHero() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const z = zip.trim();
    if (!isValidZip(z)) {
      setErr("Please enter a valid 5-digit U.S. ZIP code.");
      return;
    }
    setErr(null);
    startTransition(() => {
      router.push(`/report/${z}`);
    });
  }

  return (
    <form
      onSubmit={submit}
      className="relative mx-auto max-w-2xl"
      aria-label="Look up your tap water by ZIP code"
    >
      <div className="relative flex items-stretch gap-2 p-2 rounded-2xl bg-white shadow-lift border border-line">
        <div className="relative flex-1 flex items-center">
          <MapPin className="ml-3 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{5}"
            maxLength={5}
            placeholder="Enter your 5-digit ZIP code"
            value={zip}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 5);
              setZip(v);
              if (err) setErr(null);
            }}
            className="w-full px-3 h-14 text-lg md:text-xl font-medium text-ocean-700 bg-transparent focus:outline-none placeholder:text-muted/70"
            aria-label="ZIP code"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 h-14 px-5 md:px-7 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all shadow-soft hover:shadow-lift disabled:opacity-70"
        >
          {isPending ? (
            <span className="relative inline-flex h-5 w-5">
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ripple" />
              <span className="absolute inset-0 rounded-full bg-white/60 animate-ripple [animation-delay:0.4s]" />
              <span className="relative m-auto h-2 w-2 rounded-full bg-white" />
            </span>
          ) : (
            <Search className="h-5 w-5" />
          )}
          <span className="hidden md:inline">Get my report</span>
          <span className="md:hidden">Go</span>
        </button>
      </div>

      {err && (
        <div className="mt-3 inline-flex items-center gap-2 text-sm text-amber-500" role="alert">
          <AlertCircle className="h-4 w-4" />
          {err}
        </div>
      )}

      <p className="mt-4 text-xs md:text-sm text-muted">
        Free. No signup. Data from EWG&apos;s Tap Water Database, refreshed monthly.
      </p>
    </form>
  );
}
