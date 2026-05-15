import { Check } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";

export const metadata = {
  title: "The Sunday Email",
  description:
    "One Sunday email. New contaminants explained, policy updates, regional water alerts. Free, no spam, one-click unsubscribe.",
};

const PROMISES = [
  "One email per week, every Sunday. No mid-week blasts.",
  "Plain-English coverage of new water science and policy.",
  "Regional alerts when a contamination event hits the news.",
  "A short reading list — three articles we read so you don't have to.",
  "No affiliate links. We don't sell filters. We don't sell anything.",
  "One-click unsubscribe at the bottom of every email.",
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
            week. Written for the person who wants to be informed without being
            inundated. About 5 minutes of reading.
          </p>
          <div className="rounded-3xl bg-white/95 backdrop-blur p-8 md:p-10 shadow-lift">
            <NewsletterCapture pitch=" " />
          </div>
        </Container>
      </section>

      <Section className="py-16 bg-canvas">
        <Container size="tight">
          <Eyebrow className="mb-4">What you get</Eyebrow>
          <h2 className="display text-3xl md:text-4xl text-ocean-700 mb-8 text-balance">
            The deal, plainly.
          </h2>
          <ul className="space-y-4">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-3 text-lg text-ink/85">
                <span className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 mt-0.5">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="py-16 bg-ocean-50/40 border-t border-line">
        <Container size="tight">
          <Eyebrow variant="muted" className="mb-3">Sample subject lines</Eyebrow>
          <h2 className="display text-3xl text-ocean-700 mb-8 text-balance">
            Recent issues looked like this.
          </h2>
          <ul className="space-y-3 text-lg text-ink/85">
            <li className="rounded-xl bg-white border border-line px-5 py-3.5">
              The 4 parts per trillion question — what the new PFAS rule means
              for your utility
            </li>
            <li className="rounded-xl bg-white border border-line px-5 py-3.5">
              The NTP fluoride monograph in 600 words (and what it doesn&apos;t say)
            </li>
            <li className="rounded-xl bg-white border border-line px-5 py-3.5">
              Maine&apos;s biosolids ban: why your state is probably contaminated too
            </li>
            <li className="rounded-xl bg-white border border-line px-5 py-3.5">
              How to read your utility&apos;s Consumer Confidence Report without
              falling asleep
            </li>
          </ul>
        </Container>
      </Section>
    </>
  );
}
