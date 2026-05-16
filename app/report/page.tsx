import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { ZipCodeHero } from "@/components/water/ZipCodeHero";

export const metadata = {
  title: "Find your water report",
  description:
    "Enter your U.S. ZIP code for an independent water quality report — drawn from EWG's Tap Water Database.",
};

export default function ReportLandingPage() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white py-24 md:py-32 min-h-[70vh] flex items-center">
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
      <Container size="tight" className="relative text-center w-full">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-brass-300" />
          <Eyebrow className="text-brass-300">Reports</Eyebrow>
          <span className="h-px w-10 bg-brass-300" />
        </div>
        <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
          Find your
          <em className="not-italic italic font-light text-cyan-300"> tap water report.</em>
        </h1>
        <p className="text-lg md:text-xl text-white/75 mb-12 leading-relaxed font-serif italic max-w-xl mx-auto">
          Enter any 5-digit U.S. ZIP code. We look up the public water systems
          serving that ZIP, surface the EWG-flagged contaminants, and score
          the compliance record.
        </p>
        <ZipCodeHero />
      </Container>
    </section>
  );
}
