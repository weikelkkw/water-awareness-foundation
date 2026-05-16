import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { WaterFileIntake } from "./WaterFileIntake";

export const metadata = {
  title: "Your Water File",
  description:
    "A personalized water profile for your address — ranked by what matters most for your household. Free, no signup, downloadable.",
};

export default function YourWaterFilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-14 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
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
            <Eyebrow className="text-brass-300">Your Water File</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            A water profile,
            <em className="not-italic italic font-light text-cyan-300"> built for your household.</em>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed font-serif italic max-w-2xl">
            Five short questions. We&apos;ll cross-reference your ZIP&apos;s
            water data with what actually matters for who lives at your
            address — and produce a downloadable file you can keep.
          </p>
        </Container>
      </section>

      <Section
        className="relative pt-12 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <WaterFileIntake />
        </Container>
      </Section>
    </>
  );
}
