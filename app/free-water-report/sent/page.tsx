import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Your report is on the way",
  description: "Check your inbox.",
  robots: { index: false, follow: false },
};

export default function ReportSentPage({
  searchParams,
}: {
  searchParams: { zip?: string };
}) {
  const zip = searchParams.zip;
  return (
    <section className="relative overflow-hidden bg-midnight text-white min-h-[85vh] flex items-center pt-20 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-35"
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
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 mb-6 mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="flex items-center gap-3 mb-5 justify-center">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">Sent</Eyebrow>
            <span className="h-px w-10 bg-brass-300" />
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            Your water report
            <em className="not-italic italic font-light text-cyan-300">
              {" "}is on the way.
            </em>
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif italic mb-10">
            Check your inbox in the next minute or two. If it doesn&apos;t
            arrive, look in promotions / spam and mark us as not spam —
            future digests will land in your primary inbox.
          </p>

          {zip && (
            <div className="mt-2 mb-10 flex justify-center">
              <Link
                href={`/report/${zip}`}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-brass-300 text-ocean-700 font-medium hover:bg-brass-400 transition-all shadow-soft"
              >
                Open report for ZIP {zip} now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Next steps */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3 text-left">
            <NextCard
              icon={Sparkles}
              title="Personalize it"
              href="/your-water-file"
              body="Build a Water File with kids, pregnancy, pets, or gardening priorities."
            />
            <NextCard
              icon={BookOpen}
              title="Read the science"
              href="/learn"
              body="Long-form deep dives on every contaminant in your report."
            />
            <NextCard
              icon={Mail}
              title="Sunday digest"
              href="/newsletter"
              body="One email per week summarizing what changed in U.S. drinking water."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function NextCard({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof Mail;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur p-5 hover:bg-white/[0.08] hover:border-white/25 transition-all"
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 mb-3">
        <Icon className="h-4 w-4" />
      </div>
      <div className="font-serif text-lg text-white group-hover:text-cyan-200 transition-colors mb-1.5 leading-snug">
        {title}
      </div>
      <p className="text-xs text-white/65 leading-relaxed">{body}</p>
    </Link>
  );
}
