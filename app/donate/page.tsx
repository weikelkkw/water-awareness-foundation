import Link from "next/link";
import {
  Heart,
  Calendar,
  Mail,
  ShieldCheck,
  BookOpen,
  Microscope,
  Banknote,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "Support the foundation",
  description:
    "How to support the Water Awareness Foundation. We don't sell anything. We don't run ads. The work runs on donations.",
};

const ONETIME_URL = process.env.NEXT_PUBLIC_DONATE_URL_ONETIME ?? "";
const MONTHLY_URL = process.env.NEXT_PUBLIC_DONATE_URL_MONTHLY ?? "";

const GIVING_LEVELS = [
  {
    amount: "$25",
    title: "A reader",
    detail:
      "Covers a month of hosting + database for one U.S. state's worth of cached water reports.",
  },
  {
    amount: "$100",
    title: "A donor",
    detail:
      "Funds the research, fact-check, and primary-source verification cycle for one published article.",
  },
  {
    amount: "$1,000+",
    title: "A patron",
    detail:
      "Underwrites a full month of editorial operations. Named in the annual transparency report at your option.",
  },
];

const WHAT_YOUR_GIFT_DOES = [
  {
    icon: BookOpen,
    title: "Pays writers, not advertisers",
    detail:
      "Every dollar funds researchers, science journalists, and editors. Zero advertising spend, zero affiliate revenue.",
  },
  {
    icon: Microscope,
    title: "Buys access to primary literature",
    detail:
      "Peer-reviewed access fees, regulatory documents, FOIA filings, and the time to actually read them.",
  },
  {
    icon: ShieldCheck,
    title: "Keeps us independent of utilities",
    detail:
      "We will never accept money from water utilities, bottled-water companies, or filtration manufacturers. Donor-funded means we can stay that way.",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
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
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">Support the work</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            We don&apos;t sell anything.
            <br />
            <em className="not-italic italic font-light text-cyan-300">
              The work runs on you.
            </em>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed font-serif italic max-w-2xl">
            The Water Awareness Foundation is donor-supported, period. No
            advertising, no affiliate revenue, no money from utilities or
            filter companies. If the reporting matters to you, this is how it
            keeps existing.
          </p>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* PRIMARY CTAs                                                 */}
      {/* ============================================================ */}
      <Section className="relative py-16 md:py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(0,180,216,0.10), transparent 60%)",
          }}
        />
        <Container size="tight" className="relative">
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <GiveCard
              icon={Heart}
              eyebrow="One-time gift"
              title="Give once"
              detail="A single contribution, any amount. Tax receipt sent by email within 24 hours."
              cta="Give now"
              href={ONETIME_URL || "mailto:donate@waterawarenessfoundation.com?subject=One-time%20gift"}
              isLink={!!ONETIME_URL}
              accent="brass"
            />
            <GiveCard
              icon={Calendar}
              eyebrow="Recurring gift"
              title="Become a monthly supporter"
              detail="The most useful kind of giving. Predictable revenue lets us plan editorial cycles instead of scrambling for funding."
              cta="Give monthly"
              href={MONTHLY_URL || "mailto:donate@waterawarenessfoundation.com?subject=Monthly%20gift"}
              isLink={!!MONTHLY_URL}
              accent="cyan"
            />
          </div>

          {(!ONETIME_URL || !MONTHLY_URL) && (
            <p className="mt-6 text-xs text-muted text-center max-w-xl mx-auto leading-relaxed">
              Card processing goes live shortly. Until then the buttons above
              open an email to{" "}
              <a
                href="mailto:donate@waterawarenessfoundation.com"
                className="text-cyan-600 hover:underline"
              >
                donate@waterawarenessfoundation.com
              </a>{" "}
              — we&apos;ll send wire / check instructions.
            </p>
          )}
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* GIVING LEVELS                                                */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>What your gift covers</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            Direct line from a dollar to a published article.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {GIVING_LEVELS.map((g) => (
              <div
                key={g.amount}
                className="relative rounded-3xl bg-white border border-line p-7 md:p-8 shadow-soft overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300 via-brass-400 to-brass-300" />
                <div className="display text-5xl text-ocean-700 mb-2 font-light leading-none">
                  {g.amount}
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-4">
                  {g.title}
                </div>
                <p className="text-[15px] text-ink/75 leading-relaxed">
                  {g.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* WHAT YOUR GIFT DOES                                          */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-ocean-50/40 border-y border-ocean-100/50 overflow-hidden">
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>What we do with the money</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            Three things, plainly.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {WHAT_YOUR_GIFT_DOES.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="relative rounded-3xl bg-white border border-line p-7 md:p-8 shadow-soft overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300" />
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl text-ocean-700 mb-2 leading-snug">
                    {w.title}
                  </h3>
                  <p className="text-[15px] text-ink/75 leading-relaxed">
                    {w.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* MAJOR / FOUNDATION GIVING                                    */}
      {/* ============================================================ */}
      <Section className="relative py-20 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
            </div>
            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-brass-300" />
                  <Eyebrow className="text-brass-300">
                    Foundations & major gifts
                  </Eyebrow>
                </div>
                <h2 className="display text-3xl md:text-4xl text-white mb-4 text-balance leading-[1.1]">
                  Funding the next year of editorial work.
                </h2>
                <p className="text-white/75 leading-relaxed font-serif italic text-lg max-w-xl">
                  Family offices, philanthropic foundations, and donor-advised
                  funds — we&apos;re actively raising for a 12-month
                  unrestricted operating budget. Happy to share the editorial
                  roadmap and incorporation paperwork.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a href="mailto:donate@waterawarenessfoundation.com?subject=Major%20gift%20inquiry">
                  <Button variant="secondary" size="lg">
                    <Mail className="h-4 w-4 mr-1" /> Email the foundation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* TRANSPARENCY FOOTNOTE                                        */}
      {/* ============================================================ */}
      <Section className="py-14 bg-canvas border-t border-line">
        <Container size="tight">
          <div className="flex items-start gap-3 text-sm text-ink/75 leading-relaxed">
            <Banknote className="h-4 w-4 mt-0.5 flex-shrink-0 text-cyan-500" />
            <p>
              The foundation publishes an annual transparency report listing
              all donors above a low threshold (with consent). See our full{" "}
              <Link href="/transparency" className="text-cyan-600 hover:underline">
                funding policy
              </Link>{" "}
              and the list of organizations we will not accept money from.
              U.S. donors: tax-deductibility under our 501(c)(3) determination
              is pending; receipts will reflect current status at the time of
              your gift.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

function GiveCard({
  icon: Icon,
  eyebrow,
  title,
  detail,
  cta,
  href,
  isLink,
  accent,
}: {
  icon: typeof Heart;
  eyebrow: string;
  title: string;
  detail: string;
  cta: string;
  href: string;
  isLink: boolean;
  accent: "brass" | "cyan";
}) {
  const stripe =
    accent === "brass"
      ? "from-brass-300 via-brass-400 to-brass-300"
      : "from-cyan-300 via-cyan-400 to-cyan-300";
  const iconBg =
    accent === "brass"
      ? "bg-brass-50 text-brass-600"
      : "bg-cyan-50 text-cyan-600";

  return (
    <div className="relative rounded-3xl bg-white border border-line p-8 md:p-10 shadow-lift overflow-hidden">
      <span className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stripe}`} />
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} mb-6`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-2">
        {eyebrow}
      </div>
      <h3 className="display text-2xl md:text-3xl text-ocean-700 mb-3 text-balance leading-tight">
        {title}
      </h3>
      <p className="text-ink/75 leading-relaxed mb-7 text-[15px]">{detail}</p>
      <a
        href={href}
        target={isLink ? "_blank" : undefined}
        rel={isLink ? "noopener noreferrer" : undefined}
        className={`plausible-event-name=Donate+Click plausible-event-tier=${eyebrow.replace(/\s+/g, "+")}`}
      >
        <Button size="md" className="w-full sm:w-auto">
          {cta}
        </Button>
      </a>
    </div>
  );
}
