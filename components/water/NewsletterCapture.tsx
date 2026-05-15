"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "light" | "dark";
  pitch?: string;
}

export function NewsletterCapture({ variant = "light", pitch }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("err");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("ok");
      setMsg("You're in. Check your inbox for a confirmation.");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Something went wrong. Please try again.");
    }
  }

  const dark = variant === "dark";

  return (
    <div>
      <div
        className={cn(
          "text-xs uppercase tracking-[0.18em] mb-2 font-semibold",
          dark ? "text-cyan-200/90" : "text-cyan-500"
        )}
      >
        Newsletter
      </div>
      <p
        className={cn(
          "text-[15px] mb-3 leading-relaxed",
          dark ? "text-white/75" : "text-ink/75"
        )}
      >
        {pitch ??
          "One Sunday email. New contaminants explained, policy updates, regional water alerts. No spam, ever."}
      </p>
      <form onSubmit={submit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail
            className={cn(
              "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4",
              dark ? "text-white/50" : "text-muted"
            )}
          />
          <input
            type="email"
            inputMode="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full h-11 pl-10 pr-3 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-cyan-400",
              dark
                ? "bg-white/10 text-white placeholder:text-white/50 border border-white/10"
                : "bg-white text-ink placeholder:text-muted border border-line"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "h-11 px-5 rounded-xl text-[15px] font-medium transition disabled:opacity-50",
            dark
              ? "bg-cyan-400 text-ocean-700 hover:bg-cyan-300"
              : "bg-ocean-600 text-white hover:bg-ocean-700"
          )}
        >
          {status === "loading" ? "..." : status === "ok" ? <Check className="h-4 w-4" /> : "Join"}
        </button>
      </form>
      {msg && (
        <p
          className={cn(
            "text-xs mt-2",
            status === "err"
              ? dark ? "text-amber-200" : "text-amber-500"
              : dark ? "text-cyan-200" : "text-cyan-500"
          )}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
