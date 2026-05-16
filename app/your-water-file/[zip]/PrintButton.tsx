"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-brass-300 text-ocean-700 font-medium hover:bg-brass-400 transition-all shadow-soft text-[15px]"
    >
      <Printer className="h-4 w-4" />
      Print or save as PDF
    </button>
  );
}
