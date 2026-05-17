import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { EmailReportForm } from "./EmailReportForm";
import {
  ShieldCheck,
  Mail,
  AlertTriangle,
  FlaskConical,
  Droplet,
} from "lucide-react";

export const metadata = {
  title: "Get your free water report",
  description:
    "Enter your email and ZIP code. We'll send your tap water report — every contaminant your utility has reported above EWG's health-protective guidelines, with sources.",
  openGraph: {
    title: "Get your free water report",
    description:
      "Enter your email + ZIP. Your tap water report — emailed in seconds. Independent foundation, no spam.",
  },
};

export default function FreeWaterReportPage({
  searchParams,
}: {
  searchParams: { utm_source?: string; src?: string };
}) {
  const source = searchParams.utm_source ?? searchParams.src ?? null;

  return (
    <>
      {/* ============================================================ */}
      {/* HERO — single-purpose conversion                             */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-midnight text-white pt-16 md:pt-20 pb-12 md:pb-16 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.55), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative w-full">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 text-white">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-brass-300" />
                <Eyebrow className="text-brass-300">
                  Free water report · Emailed in 30 seconds
                </Eyebrow>
              </div>
              <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
                What&apos;s actually
                <em className="not-italic italic font-light text-cyan-300">
                  {" "}in your tap water?
                </em>
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif italic mb-8 max-w-xl">
                Enter your email and ZIP. We&apos;ll send your independent
                tap-water report — every contaminant your utility has
                reported above EWG&apos;s health-protective guideline, with
                sources, in plain English.
              </p>
              <ul className="space-y-2.5 text-[15px] text-white/85 mb-2">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-300 mt-1 flex-shrink-0" />
                  Independent foundation · no filter affiliates · no ads
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-cyan-300 mt-1 flex-shrink-0" />
                  No spam — your email is only used to send the report
                </li>
                <li className="flex items-start gap-2">
                  <FlaskConical className="h-4 w-4 text-cyan-300 mt-1 flex-shrink-0" />
                  Data from EWG&apos;s Tap Water Database + EPA SDWIS
                </li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-3xl bg-white shadow-lift p-7 md:p-8 overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0" />
                <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
                  Send my report
                </div>
                <h2 className="font-serif text-2xl text-ocean-700 mb-1 leading-tight">
                  Where should we send it?
                </h2>
                <p className="text-sm text-muted mb-5">
                  Takes ~30 seconds. Independent foundation. No tracking.
                </p>
                <EmailReportForm source={source} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* WHAT'S IN THE EMAIL                                          */}
      {/* ============================================================ */}
      <Section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>Inside your report</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            What lands in your inbox.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            <Tile
              icon={Droplet}
              title="Your utility, identified"
              body="Name, population served, water source — pulled live from your ZIP."
            />
            <Tile
              icon={AlertTriangle}
              title="Every contaminant above guideline"
              body="EWG-flagged with severity multiplier (e.g. ‘72× above the health-protective level’)."
            />
            <Tile
              icon={FlaskConical}
              title="Sources + deep-dive links"
              body="Each contaminant linked to its full deep dive — health effects, filter types, regulatory limits."
            />
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* TRUST / FOOTER                                               */}
      {/* ============================================================ */}
      <Section className="py-12 bg-canvas border-t border-line">
        <Container size="tight">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
              Independent foundation, est. 2026
            </span>
            <span>·</span>
            <span>No advertising</span>
            <span>·</span>
            <span>No filter affiliate links</span>
            <span>·</span>
            <span>No utility funding</span>
            <span>·</span>
            <span>One-click unsubscribe</span>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Tile({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Droplet;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-3xl bg-white border border-line p-7 shadow-soft overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 mb-5">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-lg text-ocean-700 mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-[14px] text-ink/75 leading-relaxed">{body}</p>
    </div>
  );
}
