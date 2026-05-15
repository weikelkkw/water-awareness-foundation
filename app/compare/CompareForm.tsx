"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { isValidZip } from "@/lib/utils";

export function CompareForm({
  initialA,
  initialB,
}: {
  initialA?: string;
  initialB?: string;
}) {
  const router = useRouter();
  const [a, setA] = useState(initialA ?? "");
  const [b, setB] = useState(initialB ?? "");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidZip(a) || !isValidZip(b)) {
      setErr("Please enter two valid 5-digit ZIP codes.");
      return;
    }
    if (a === b) {
      setErr("Pick two different ZIP codes to compare.");
      return;
    }
    setErr(null);
    router.push(`/compare?a=${a}&b=${b}`);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Input value={a} onChange={setA} placeholder="ZIP A" />
        <span className="hidden md:inline-flex items-center justify-center text-muted">
          <ArrowRight className="h-5 w-5" />
        </span>
        <Input value={b} onChange={setB} placeholder="ZIP B" />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all shadow-soft"
      >
        <Search className="h-4 w-4" /> Compare
      </button>
      {err && <p className="text-sm text-amber-500">{err}</p>}
    </form>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={5}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
      placeholder={placeholder}
      className="w-full h-14 px-5 rounded-xl text-lg font-medium bg-white border border-line shadow-soft focus:outline-none focus:ring-2 focus:ring-cyan-400"
    />
  );
}
