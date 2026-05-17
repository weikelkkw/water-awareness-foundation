"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Send, AlertCircle } from "lucide-react";

interface Props {
  source: string | null;
}

export function EmailReportForm({ source }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [digestOptIn, setDigestOptIn] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email.includes("@")) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setErr("Please enter a valid 5-digit U.S. ZIP code.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zip, source, digestOptIn, hp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Network error");
      }
      // Plausible custom event
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          plausible?: (
            event: string,
            opts?: { props?: Record<string, string> }
          ) => void;
        };
        w.plausible?.("Email Report Request", {
          props: {
            zip,
            source: source ?? "direct",
            digestOptIn: String(digestOptIn),
          },
        });
      }
      router.push(`/free-water-report/sent?zip=${encodeURIComponent(zip)}`);
    } catch (e) {
      setStatus("err");
      setErr((e as Error).message);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          width: 0,
        }}
      />

      <div className="relative">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="email"
          inputMode="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 pl-10 pr-3 rounded-xl text-[15px] bg-canvas text-ocean-700 border border-line focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-500" />
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          pattern="\d{5}"
          required
          placeholder="Your 5-digit ZIP"
          value={zip}
          onChange={(e) =>
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
          }
          className="w-full h-12 pl-10 pr-3 rounded-xl text-[15px] bg-canvas text-ocean-700 border border-line focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
      </div>

      <label className="flex items-start gap-2.5 text-[13px] text-ink/75 leading-snug cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={digestOptIn}
          onChange={(e) => setDigestOptIn(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-line text-cyan-600 focus:ring-cyan-400 flex-shrink-0"
        />
        <span>
          Also send me the Sunday digest — one weekly email summarizing
          what changed in U.S. drinking water. Unsubscribe anytime.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all shadow-soft disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <span className="relative inline-flex h-4 w-4">
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ripple" />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Email me my report
          </>
        )}
      </button>

      {err && (
        <p
          className="text-xs text-amber-500 inline-flex items-center gap-1.5"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          {err}
        </p>
      )}

      <p className="text-[11px] text-muted leading-relaxed pt-1">
        Independent foundation. We do not sell, share, or rent your email.
        See our{" "}
        <a href="/privacy" className="text-cyan-600 hover:underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
