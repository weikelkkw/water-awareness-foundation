import { Check, BookOpen, AlertTriangle, ShieldCheck, Sparkles, Mail } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";

export const metadata = {
  title: "The Sunday Email",
  description:
    "One Sunday email. New contaminants explained, policy updates, regional water alerts. Free, no spam, one-click unsubscribe.",
};

const PROMISES = [
  {
    icon: Mail,
    title: "One email per week",
    detail:
      "Every Sunday. No mid-week blasts, no breaking-news anxiety drips, no marketing automation.",
  },
  {
    icon: BookOpen,
    title: "Plain-English coverage",
    detail:
      "New water science, regulatory shifts, contamination incidents — translated for a literate adult, not a lobbyist.",
  },
  {
    icon: AlertTriangle,
    title: "Regional alerts",
    detail:
      "When a contamination event affects your state or utility, you're notified the Sunday after, with context.",
  },
  {
    icon: Sparkles,
    title: "A short reading list",
    detail:
      "Three external articles we read that week, with our one-line take. The reading you would've done anyway.",
  },
  {
    icon: ShieldCheck,
    title: "Zero monetization",
    detail:
      "No affiliate links. We don't sell filters. We don't sell anything. Donations + grants only.",
  },
  {
    icon: Check,
    title: "One-click unsubscribe",
    detail:
      "Every email. Always. No re-engagement campaigns, no skip-options, no friction.",
  },
];

const SAMPLES = [
  {
    eyebrow: "Issue 014",
    subject:
      "The 4 parts per trillion question — what the new PFAS rule means for your utility",
  },
  {
    eyebrow: "Issue 013",
    subject:
      "The NTP fluoride monograph in 600 words (and what it doesn't say)",
  },
  {
    eyebrow: "Issue 012",
    subject:
      "Maine's biosolids ban: why your state is probably contaminated too",
  },
  {
    eyebrow: "Issue 011",
    subject:
      "How to read your utility's Consumer Confidence Report without falling asleep",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">The Sunday Email</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            One Sunday email.
            <em className="not-italic italic font-light text-cyan-300"> No spam, ever.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed text-pretty mb-10 font-serif italic">
            A calm, sourced summary of what changed in U.S. drinking water that
            week. Written for the person who wants to be informed without
            being inundated. About 5 minutes of reading.
          </p>
          <div className="rounded-3xl bg-white/95 backdrop-blur p-8 md:p-10 shadow-lift relative overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
            <NewsletterCapture pitch=" " />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
              Independent foundation
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-cyan-300" /> No tracking
              pixels
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-cyan-300" /> Unsubscribe in
              one click
            </span>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* PROMISES — six premium cards                                 */}
      {/* ============================================================ */}
      <Section
        className="relative pt-16 md:pt-20 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>What you get</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            The deal, plainly.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROMISES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="relative rounded-3xl bg-white border border-line p-7 shadow-soft overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300/0 via-cyan-400 to-cyan-300/0" />
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg text-ocean-700 mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-ink/75 leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* SAMPLE SUBJECT LINES — magazine-table feel                   */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>What recent issues looked like</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            Four real Sunday subject lines.
          </h2>
          <ul className="space-y-3 md:space-y-4">
            {SAMPLES.map((s) => (
              <li
                key={s.subject}
                className="relative rounded-2xl bg-white border border-line shadow-soft overflow-hidden hover:shadow-lift transition-all"
              >
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0 opacity-60" />
                <div className="flex items-start gap-4 md:gap-6 p-5 md:p-6">
                  <div className="flex-shrink-0 w-24 md:w-28">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1">
                      {s.eyebrow}
                    </div>
                    <div className="font-mono text-xs text-muted">Subject</div>
                  </div>
                  <p className="flex-1 font-serif text-lg md:text-xl text-ocean-700 leading-snug text-balance pt-0.5">
                    {s.subject}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* SECOND CTA — gradient ocean for repeat conversion            */}
      {/* ============================================================ */}
      <Section className="py-16 bg-canvas">
        <Container size="tight">
          <div className="relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                }}
              />
            </div>
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-brass-300" />
                <Eyebrow className="text-brass-300">Ready to join?</Eyebrow>
              </div>
              <h2 className="display text-3xl md:text-4xl text-white mb-4 text-balance leading-[1.1]">
                Sunday morning, a sourced 5-minute read.
              </h2>
              <p className="text-white/75 leading-relaxed mb-7 font-serif italic max-w-xl">
                Drop your email below. No marketing automation. No filter
                affiliate codes. Just the foundation&apos;s weekly digest.
              </p>
              <NewsletterCapture variant="dark" pitch=" " />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
