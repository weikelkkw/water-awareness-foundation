import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const SHORTCUTS = [
  {
    href: "/report",
    label: "Find your ZIP report",
    detail: "EWG-flagged contaminants for any U.S. ZIP code",
  },
  {
    href: "/explore",
    label: "Contaminant explorer",
    detail: "Deep dives on every chemical worth understanding",
  },
  {
    href: "/learn",
    label: "The Library",
    detail: "Long-form, fully sourced articles",
  },
  {
    href: "/news",
    label: "Water news",
    detail: "Editorial coverage of what's changing",
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white min-h-[80vh] flex items-center pt-20 pb-20">
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
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">404</Eyebrow>
            <span className="h-px w-10 bg-brass-300" />
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            We couldn&apos;t find
            <em className="not-italic italic font-light text-cyan-300"> that page.</em>
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed font-serif italic mb-10">
            The link may have moved, or the page never existed. Try one of
            the shortcuts below — or head back to the homepage.
          </p>
          <div className="flex justify-center gap-3 mb-14">
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
            <Link href="/report">
              <Button variant="outline" className="bg-transparent border-white/25 text-white hover:bg-white/10 hover:border-white/40">
                Find your ZIP
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-5 justify-center">
            <span className="h-px w-8 bg-brass-300/60" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-brass-300/90 font-bold inline-flex items-center gap-1.5">
              <Compass className="h-3 w-3" /> Where to next
            </span>
            <span className="h-px w-8 bg-brass-300/60" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur p-5 hover:bg-white/[0.08] hover:border-white/25 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-serif text-lg text-white group-hover:text-cyan-200 transition-colors mb-1">
                      {s.label}
                    </div>
                    <div className="text-xs text-white/65 leading-relaxed">
                      {s.detail}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
