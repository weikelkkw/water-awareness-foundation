import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { CompareForm } from "./CompareForm";
import { CompareResults } from "./CompareResults";

export const metadata = {
  title: "Compare two ZIPs side-by-side",
  description:
    "Useful when you're moving, comparing schools, or just curious how a friend's water stacks up. Compare any two U.S. ZIPs head-to-head.",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { a?: string; b?: string };
}) {
  const a = searchParams.a;
  const b = searchParams.b;
  const hasBoth = !!a && !!b && /^\d{5}$/.test(a) && /^\d{5}$/.test(b);

  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
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
            <Eyebrow className="text-brass-300">Compare</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            Two ZIPs,
            <em className="not-italic italic font-light text-cyan-300"> side-by-side.</em>
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 font-serif italic">
            Useful when you&apos;re moving, comparing schools, or just curious
            how a friend&apos;s water stacks up. Both columns use the same data
            sources and the same scoring methodology.
          </p>
          <CompareForm initialA={a} initialB={b} />
        </Container>
      </section>

      {hasBoth && <CompareResults zipA={a!} zipB={b!} />}
    </>
  );
}
