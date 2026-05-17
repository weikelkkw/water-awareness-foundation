"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Heart,
  PawPrint,
  Sprout,
  Users,
  Home,
  AlertTriangle,
  Search,
} from "lucide-react";

const HOME_AGES = [
  { value: "pre-1986", label: "Before 1986", hint: "Lead solder permitted" },
  { value: "1986-2014", label: "1986–2014", hint: "Brass fixtures may contain lead up to 0.25%" },
  { value: "after-2014", label: "After 2014", hint: "Modern lead-free standards" },
  { value: "unknown", label: "I don't know", hint: "We'll assume worst-case" },
];

const HOUSEHOLD = [
  { value: "kids", label: "Children under 6", icon: Baby },
  { value: "pregnant", label: "Pregnant or trying", icon: Heart },
  { value: "older", label: "Adults 65 and older", icon: Users },
  { value: "pets", label: "Cats or dogs", icon: PawPrint },
  { value: "garden", label: "Indoor gardening / hydroponics", icon: Sprout },
  { value: "appliance", label: "I care about appliance lifespan", icon: Home },
];

const CONCERNS = [
  { value: "lead", label: "Lead from old pipes" },
  { value: "pfas", label: "PFAS / forever chemicals" },
  { value: "fluoride", label: "Fluoride" },
  { value: "chlorine", label: "Chlorine taste / smell" },
  { value: "hard", label: "Hard water / scaling" },
  { value: "everything", label: "Honestly, everything" },
];

export function WaterFileIntake() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState<string | null>(null);
  const [homeAge, setHomeAge] = useState<string | null>(null);
  const [household, setHousehold] = useState<Set<string>>(new Set());
  const [concerns, setConcerns] = useState<Set<string>>(new Set());

  const totalSteps = 4;

  const submit = () => {
    if (!/^\d{5}$/.test(zip)) {
      setZipError("Please enter a valid 5-digit ZIP.");
      setStep(0);
      return;
    }
    const params = new URLSearchParams();
    if (homeAge) params.set("age", homeAge);
    if (household.size > 0) params.set("h", Array.from(household).join(","));
    if (concerns.size > 0) params.set("c", Array.from(concerns).join(","));
    // Plausible custom event
    if (typeof window !== "undefined") {
      const w = window as unknown as {
        plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
      };
      w.plausible?.("Water File Generate", {
        props: {
          homeAge: homeAge ?? "unspecified",
          householdCount: String(household.size),
          concernsCount: String(concerns.size),
        },
      });
    }
    router.push(`/your-water-file/${zip}?${params.toString()}`);
  };

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  return (
    <div className="relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />

      {/* Progress */}
      <div className="px-6 sm:px-10 pt-8 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted ml-auto">
            ~30 seconds total
          </span>
        </div>
        <div className="h-1 bg-canvas rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-ocean-600 transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 sm:px-10 md:px-14 py-10 md:py-14 min-h-[420px]">
        {/* Step 0: ZIP */}
        {step === 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-4 w-4 text-cyan-600" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                Where you live
              </span>
            </div>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-3 text-balance leading-tight">
              What&apos;s your ZIP code?
            </h2>
            <p className="text-ink/75 leading-relaxed mb-8 max-w-md">
              We&apos;ll look up the public water systems serving your area
              and pull live EWG contaminant data.
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                setZipError(null);
              }}
              placeholder="80918"
              className="w-full sm:w-64 h-14 px-5 rounded-xl text-xl font-medium bg-canvas border border-line text-ocean-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              autoFocus
            />
            {zipError && (
              <p className="mt-3 text-sm text-amber-500">{zipError}</p>
            )}
          </div>
        )}

        {/* Step 1: Home age */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Home className="h-4 w-4 text-cyan-600" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                Your home
              </span>
            </div>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-3 text-balance leading-tight">
              When was your home built?
            </h2>
            <p className="text-ink/75 leading-relaxed mb-8 max-w-md">
              This drives our lead-risk read. Older plumbing carries
              dramatically more lead exposure than post-2014 construction.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {HOME_AGES.map((opt) => {
                const active = homeAge === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHomeAge(opt.value)}
                    className={
                      "text-left rounded-2xl border p-5 transition-all " +
                      (active
                        ? "bg-ocean-700 text-white border-ocean-700 shadow-lift"
                        : "bg-white border-line hover:border-ocean-200 hover:shadow-soft")
                    }
                  >
                    <div
                      className={
                        "font-serif text-xl mb-1 " +
                        (active ? "text-white" : "text-ocean-700")
                      }
                    >
                      {opt.label}
                    </div>
                    <div
                      className={
                        "text-xs " +
                        (active ? "text-white/75" : "text-muted")
                      }
                    >
                      {opt.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Household composition */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-4 w-4 text-cyan-600" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                Who lives there
              </span>
            </div>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-3 text-balance leading-tight">
              Who&apos;s drinking the water?
            </h2>
            <p className="text-ink/75 leading-relaxed mb-8 max-w-md">
              Pick everything that applies. We use this to rank what matters
              most for your file — children and pregnancy raise priority on
              several contaminants.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {HOUSEHOLD.map((opt) => {
                const Icon = opt.icon;
                const active = household.has(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(household, opt.value, setHousehold)}
                    className={
                      "flex items-center gap-3 text-left rounded-2xl border p-5 transition-all " +
                      (active
                        ? "bg-cyan-50 border-cyan-300 shadow-soft"
                        : "bg-white border-line hover:border-ocean-200")
                    }
                  >
                    <span
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl " +
                        (active
                          ? "bg-cyan-600 text-white"
                          : "bg-canvas text-ocean-600")
                      }
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className={
                        "font-serif text-lg " +
                        (active ? "text-ocean-700" : "text-ocean-700")
                      }
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Concerns */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-4 w-4 text-cyan-600" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold">
                What worries you
              </span>
            </div>
            <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-3 text-balance leading-tight">
              Anything specifically on your mind?
            </h2>
            <p className="text-ink/75 leading-relaxed mb-8 max-w-md">
              Optional — we&apos;ll pull these contaminants to the top of your
              file even if your utility hasn&apos;t flagged them yet.
            </p>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((c) => {
                const active = concerns.has(c.value);
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => toggle(concerns, c.value, setConcerns)}
                    className={
                      "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border " +
                      (active
                        ? "bg-ocean-600 text-white border-ocean-600 shadow-soft"
                        : "bg-white text-ink/70 border-line hover:border-ocean-200 hover:text-ocean-700")
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-8 text-sm text-muted">
              You can skip this step — the rest of the file is still
              personalized to your household.
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-4 px-6 sm:px-10 py-5 border-t border-line bg-canvas/60">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-ocean-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 0 && !/^\d{5}$/.test(zip)) {
                setZipError("Please enter a valid 5-digit ZIP.");
                return;
              }
              setStep((s) => Math.min(totalSteps - 1, s + 1));
            }}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all shadow-soft"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-brass-300 text-ocean-700 font-medium hover:bg-brass-400 transition-all shadow-soft"
          >
            Generate my file <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
