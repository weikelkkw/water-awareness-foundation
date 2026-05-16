import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Droplet,
  Layers,
  Microscope,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ZipCodeHero } from "@/components/water/ZipCodeHero";
import { FactRotator } from "@/components/water/FactRotator";
import { HeroAtmosphere } from "@/components/water/HeroAtmosphere";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import { Marquee } from "@/components/water/Marquee";
import { AnimatedNumber } from "@/components/water/AnimatedNumber";
import { CONTAMINANTS, getContaminant } from "@/lib/contaminants";

export const metadata = {
  title: "Know what's in your water.",
  description:
    "Enter your ZIP code for an independent, science-backed report on the tap water in your area — drawn from EWG's Tap Water Database and explained in plain English.",
};

const DEMOGRAPHIC_LINKS = [
  { href: "/learn/demographic/water-and-babies", label: "Babies", caption: "The formula years, brutally honestly." },
  { href: "/learn/demographic/water-and-children", label: "Children", caption: "Lead, school taps, and the IQ math." },
  { href: "/learn/demographic/water-and-adults", label: "Adults", caption: "Cumulative exposure and the 40-year math." },
  { href: "/learn/health/water-and-pregnancy", label: "Pregnancy", caption: "Lead, PFAS, and what to filter for." },
  { href: "/learn/demographic/water-and-pets", label: "Pets", caption: "What the dog is actually drinking." },
  { href: "/learn/demographic/water-and-plants-environment", label: "Plants", caption: "Fluoride tip-burn, chlorine, hydroponics." },
  { href: "/learn/demographic/water-and-the-home", label: "Your home", caption: "Appliances, scaling, corrosion." },
];

const MARQUEE_ITEMS = [
  "9.2 million lead service lines still in U.S. homes",
  "45% of U.S. taps with PFAS detected",
  "90+ federally regulated contaminants",
  "Zero safe blood-lead level in children",
  "Every U.S. ZIP code covered",
  "Independent · Non-commercial · Citation-first",
];

export default function HomePage() {
  const lead = getContaminant("lead")!;
  const otherContaminants = CONTAMINANTS.filter((c) => c.slug !== "lead").slice(0, 5);

  return (
    <>
      {/* ================================================================ */}
      {/* HERO — full-bleed cinematic image + frosted glass card           */}
      {/* ================================================================ */}
      <section
        id="check-your-water"
        className="relative overflow-hidden min-h-[100vh] flex items-center pt-24 pb-20 md:pt-32 md:pb-28"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559825481-12a05cc00344?w=2400&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark cinematic scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/85 via-ocean-800/75 to-ocean-900/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/60 via-transparent to-ocean-900/40" />
        </div>

        {/* Atmospheric blooms + bubbles layered on top of image */}
        <HeroAtmosphere />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center text-white flex flex-col items-center">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lift mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 animate-ripple opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-brass-300 font-bold">
                  An independent foundation · est. 2026
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1
                className="display text-white text-balance mb-8 leading-[0.94] mx-auto"
                style={{ fontSize: "clamp(3.25rem, 8.5vw, 7.5rem)" }}
              >
                What&apos;s actually
                <br />
                <em className="not-italic italic font-light text-cyan-300">in</em> your tap water?
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-12 text-pretty font-serif italic">
                Clear, science-backed reports on the drinking water in every
                U.S. ZIP code — sourced from EWG, written in plain English,
                brutally honest about what we know and what we don&apos;t.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="w-full max-w-2xl mx-auto">
                <ZipCodeHero />
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs md:text-sm text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  Live EWG contaminant data
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-cyan-300" />
                  Citations on every claim
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Microscope className="h-4 w-4 text-cyan-300" />
                  Reviewed by environmental health experts
                </span>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-12 inline-flex items-center gap-4 text-white/75">
                <span className="h-px w-10 bg-brass-400/70" />
                <span className="display text-2xl md:text-3xl font-light text-white">
                  330M
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-brass-300 font-bold">
                  Americans covered
                </span>
                <span className="h-px w-10 bg-brass-400/70" />
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Brass accent line at the very bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-brass-400/60 to-brass-400/80" />
      </section>

      {/* ================================================================ */}
      {/* MARQUEE — announcement strip                                     */}
      {/* ================================================================ */}
      <Marquee items={MARQUEE_ITEMS} speed={70} />

      {/* ================================================================ */}
      {/* PROBLEM STATEMENT — oversized editorial moment                   */}
      {/* ================================================================ */}
      <section className="relative bg-canvas py-32 md:py-44 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,180,216,0.12), transparent 60%)",
          }}
        />
        <Container className="relative">
          <Reveal>
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-10">
                <span className="h-px w-12 bg-brass-400/70" />
                <span className="text-xs uppercase tracking-[0.28em] text-brass-500 font-bold">
                  The honest version
                </span>
                <span className="h-px w-12 bg-brass-400/70" />
              </div>
              <h2
                className="display text-ocean-700 text-balance leading-[1.02] mb-10"
                style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
              >
                Your tap water is{" "}
                <em className="not-italic italic font-light text-cyan-600">
                  regulated.
                </em>
                <br />
                That is not the same as <em className="not-italic italic font-light text-brass-500">safe.</em>
              </h2>
              <p className="text-xl md:text-2xl text-ink/70 leading-relaxed max-w-3xl mx-auto text-pretty">
                The Safe Drinking Water Act covers roughly 90 contaminants.
                Your utility tests for them on a schedule. If they pass, the
                water is &ldquo;in compliance.&rdquo; Most American water passes
                most tests, most of the time. That is{" "}
                <span className="text-ocean-700 font-medium">
                  not the whole story.
                </span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* STATS — animated count-up, oversized, asymmetric                 */}
      {/* ================================================================ */}
      <section className="relative bg-ocean-900 text-white overflow-hidden py-28 md:py-40 border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/3 left-1/4 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.55), transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.55), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-brass-400/70" />
                <span className="text-xs uppercase tracking-[0.28em] text-brass-300 font-bold">
                  The honest numbers
                </span>
              </div>
              <h2
                className="display text-white text-balance leading-[1.02]"
                style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
              >
                The data that should be a{" "}
                <em className="not-italic italic font-light text-cyan-300">
                  national conversation.
                </em>
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-10 lg:gap-14">
              <Reveal delay={0}>
                <BigStatNumber
                  value={9200000}
                  format="millions"
                  label="Lead service lines still in U.S. homes"
                  source="EWG Tap Water Database"
                />
              </Reveal>
              <Reveal delay={120}>
                <BigStatNumber
                  value={45}
                  format="percent"
                  label="Of U.S. tap water samples with PFAS detected"
                  source="USGS, 2023"
                />
              </Reveal>
              <Reveal delay={240}>
                <BigStatNumber
                  value={617}
                  format="times"
                  label="The worst single contaminant flag we've seen vs. EWG's health-protective level"
                  source="EWG · NYC, HAA9"
                />
              </Reveal>
              <Reveal delay={360}>
                <BigStatNumber
                  value={0}
                  format="plain"
                  label="Demonstrated safe blood-lead level in children"
                  source="CDC, AAP, WHO"
                />
              </Reveal>
            </div>

            {/* Right pull-quote column */}
            <div className="lg:col-span-5 flex">
              <Reveal delay={300} className="self-end">
                <div className="border-l-2 border-brass-400/80 pl-8">
                  <Quote className="h-8 w-8 text-brass-300 mb-5" strokeWidth={1.5} />
                  <p className="font-serif italic text-2xl md:text-3xl leading-snug text-white text-balance mb-6">
                    A utility can be in legal compliance and still post
                    contaminant levels hundreds of times above what
                    independent scientists consider health-protective.
                  </p>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-brass-300 font-bold">
                    The foundation, on what your water report shows
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WHO IT'S FOR — demographic links, deep ocean atmosphere          */}
      {/* ================================================================ */}
      <section className="relative bg-ocean-700 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/3 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-12 bg-brass-400/70" />
                  <span className="text-xs uppercase tracking-[0.28em] text-brass-300 font-bold">
                    Who it&apos;s for
                  </span>
                </div>
                <h2 className="display text-display-md text-white text-balance leading-[1.05] mb-6">
                  Water doesn&apos;t affect everyone the same way.
                </h2>
                <p className="text-lg text-white/75 leading-relaxed">
                  An eight-pound newborn, a sixty-pound dog, and a sixty-year-old
                  with a coffee habit are answering different questions. Each
                  guide below is written for the specific biology, behavior,
                  and stakes of that life stage.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-white/10">
                {DEMOGRAPHIC_LINKS.map((d, i) => (
                  <li key={d.href}>
                    <Reveal delay={i * 60}>
                      <Link
                        href={d.href}
                        className="group flex items-center justify-between gap-6 py-6 transition-all"
                      >
                        <div className="flex-1">
                          <div className="font-serif text-2xl md:text-4xl text-white group-hover:text-cyan-300 transition-colors mb-1 leading-tight">
                            {d.label}
                          </div>
                          <div className="text-[15px] text-white/65">
                            {d.caption}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/15 group-hover:bg-brass-400 group-hover:border-brass-400 transition-all flex items-center justify-center">
                          <ArrowUpRight className="h-4 w-4 text-white group-hover:text-ocean-700 transition-colors" strokeWidth={2.5} />
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CONTAMINANTS — asymmetric: featured + grid                       */}
      {/* ================================================================ */}
      <Section className="relative bg-canvas overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.35), transparent 65%)",
            }}
          />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-12 bg-brass-400/70" />
                  <span className="text-xs uppercase tracking-[0.28em] text-brass-500 font-bold">
                    The Contaminants
                  </span>
                </div>
                <h2
                  className="display text-ocean-700 text-balance leading-[1.02]"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  The chemicals worth understanding.
                </h2>
              </div>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 text-cyan-600 hover:text-cyan-700 font-medium whitespace-nowrap group"
              >
                See all contaminants
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-5">
            {/* Featured card — lead, spanning 5 columns */}
            <Reveal className="lg:col-span-5" delay={0}>
              <FeaturedContaminantCard contaminant={lead} />
            </Reveal>

            {/* Other 5 in a 7-col grid (2x2 with one row of 3) */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 h-full">
              {otherContaminants.map((c, i) => (
                <Reveal key={c.slug} delay={(i + 1) * 80}>
                  <ContaminantPillCard contaminant={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* EDITORIAL PULL QUOTE — deep ocean editorial moment              */}
      {/* ================================================================ */}
      <section className="relative bg-midnight text-white py-36 md:py-48 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.4), transparent 60%)",
            }}
          />
          <div
            className="absolute -top-1/4 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.45), transparent 65%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container size="tight" className="relative">
          <Reveal>
            <Quote className="h-12 w-12 text-brass-300 mb-10 mx-auto" strokeWidth={1.5} />
            <blockquote
              className="display font-serif text-white text-balance text-center leading-[1.05] italic"
              style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)" }}
            >
              &ldquo;Your utility being in compliance with the Safe Drinking
              Water Act is the start of the public-safety conversation,
              <span className="not-italic"> not the end.</span>&rdquo;
            </blockquote>
            <div className="mt-12 flex items-center justify-center gap-3 text-sm text-white/60">
              <span className="h-px w-10 bg-brass-300" />
              <span className="uppercase tracking-[0.22em] font-bold text-brass-300">
                From our Flint, Michigan retrospective
              </span>
              <span className="h-px w-10 bg-brass-300" />
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/learn/policy/flint-michigan-what-happened"
                className="text-cyan-300 hover:text-cyan-200 font-medium inline-flex items-center gap-1.5"
              >
                Read the piece <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* FACT ROTATOR                                                     */}
      {/* ================================================================ */}
      <Section className="relative bg-ocean-wash overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.35), transparent 65%)",
            }}
          />
        </div>
        <Container size="tight" className="relative">
          <Reveal>
            <FactRotator />
            <div className="text-center mt-8">
              <Link
                href="/facts"
                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Browse all water facts →
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* STATE BROWSER — entry point into /water                          */}
      {/* ================================================================ */}
      <section className="relative bg-ocean-700 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-1/3 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
        </div>
        <Container className="relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-end">
            <Reveal className="md:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-12 bg-brass-400/70" />
                <span className="text-xs uppercase tracking-[0.28em] text-brass-300 font-bold">
                  Browse by state
                </span>
              </div>
              <h2 className="display text-display-md text-white text-balance leading-[1.05] mb-6">
                Every state has its
                <em className="not-italic italic font-light text-cyan-300"> own water story.</em>
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-8">
                Fifty profiles, each with the source-water mix, the
                contaminants state regulators flag most, the flagship
                regional story, and the recent news.
              </p>
              <Link
                href="/water"
                className="inline-flex items-center gap-2 text-cyan-200 hover:text-white text-base font-medium group"
              >
                Browse all 50 states
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
            <div className="md:col-span-7">
              <Reveal delay={120}>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-2.5">
                  {[
                    "california",
                    "texas",
                    "florida",
                    "new-york",
                    "michigan",
                    "illinois",
                    "pennsylvania",
                    "ohio",
                    "north-carolina",
                    "georgia",
                    "new-jersey",
                    "massachusetts",
                  ].map((slug) => {
                    const name = slug
                      .split("-")
                      .map((w) => w[0].toUpperCase() + w.slice(1))
                      .join(" ");
                    return (
                      <Link
                        key={slug}
                        href={`/water/${slug}`}
                        className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.10] hover:border-white/20 transition-all"
                      >
                        <span className="font-serif text-sm text-white group-hover:text-cyan-200 transition-colors truncate">
                          {name}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-white/40 group-hover:text-cyan-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                          strokeWidth={2.5}
                        />
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* YOUR WATER FILE CTA — personalized intake driver                 */}
      {/* ================================================================ */}
      <Section className="relative py-20 md:py-24 bg-canvas overflow-hidden">
        <Container>
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute -top-1/3 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                  }}
                />
                <div
                  className="absolute -bottom-1/3 -left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-25"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
              </div>
              <div className="relative grid md:grid-cols-12 gap-10 items-center p-10 md:p-16">
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-12 bg-brass-300" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-brass-300 font-bold">
                      Personalized · downloadable
                    </span>
                  </div>
                  <h2 className="display text-display-md md:text-display-lg text-white mb-5 text-balance leading-[1.02]">
                    Your Water File —
                    <em className="not-italic italic font-light text-cyan-300">
                      {" "}built for your household.
                    </em>
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl font-serif italic">
                    Five questions about your home and who lives there.
                    We&apos;ll cross-reference your ZIP&apos;s contaminant
                    data with what actually matters for your household — and
                    produce a downloadable file you can keep, print, or send
                    to your landlord.
                  </p>
                  <Link href="/your-water-file">
                    <Button variant="secondary" size="lg">
                      Build my Water File <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <p className="mt-5 text-xs text-white/55">
                    Takes ~30 seconds · free · no signup · nothing stored
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="relative rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur p-6 md:p-7 shadow-lift">
                    <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brass-300/0 via-brass-400 to-brass-300/0" />
                    <div className="text-[10px] uppercase tracking-[0.22em] text-brass-300 font-bold mb-4">
                      Inside your file
                    </div>
                    <ul className="space-y-3 text-[15px] text-white/85">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 flex-shrink-0" />
                        Contaminants ranked for your household
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 flex-shrink-0" />
                        Concrete next steps for your home age and family
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 flex-shrink-0" />
                        Filter certifications that actually work
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 flex-shrink-0" />
                        Print or save as PDF, branded
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* LIBRARY TEASER — editorial image moment                          */}
      {/* ================================================================ */}
      <Section className="relative bg-gradient-to-b from-ocean-wash to-canvas overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <Reveal className="md:col-span-7">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-lift">
                <Image
                  src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&q=80"
                  alt="Close-up of water droplets falling into a clear glass"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ocean-700/85 via-ocean-700/30 to-transparent">
                  <div className="text-xs uppercase tracking-[0.22em] text-brass-200 font-bold mb-2">
                    From the Library
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-white text-balance">
                    &ldquo;Lead in drinking water: what the science actually says.&rdquo;
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-5" delay={150}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-12 bg-brass-400/70" />
                <span className="text-xs uppercase tracking-[0.28em] text-brass-500 font-bold">
                  The Library
                </span>
              </div>
              <h2 className="display text-display-md text-ocean-700 mb-6 text-balance leading-[1.05]">
                The most thorough, honest water library on the internet.
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed mb-8">
                Pillar articles on contaminants, health effects, filtration, and
                policy — written to be the last thing you have to read on each
                topic. Every claim cites a primary source.
              </p>
              <Link href="/learn">
                <Button size="lg">
                  Enter the library <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* NEWSLETTER — dark close                                          */}
      {/* ================================================================ */}
      <Section className="relative bg-ocean-700 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
            }}
          />
        </div>
        <Container size="tight" className="relative">
          <Reveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-brass-400/70" />
                <span className="text-xs uppercase tracking-[0.28em] text-brass-300 font-bold">
                  The Sunday Email
                </span>
                <span className="h-px w-12 bg-brass-400/70" />
              </div>
              <h2 className="display text-display-md text-white mb-5 text-balance leading-[1.02]">
                One email per week.
                <br />
                <em className="not-italic italic font-light text-cyan-300">
                  No spam, ever.
                </em>
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
                A calm, sourced summary of what changed in U.S. drinking water
                that week — new regulations, new contaminants under review,
                regional alerts. Unsubscribe in one click.
              </p>
              <div className="max-w-md mx-auto text-left">
                <NewsletterCapture variant="dark" pitch=" " />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function BigStatNumber({
  value,
  format,
  label,
  source,
}: {
  value: number;
  format: "plain" | "comma" | "millions" | "percent" | "times";
  label: string;
  source: string;
}) {
  return (
    <div>
      <div
        className="display text-white font-light leading-[0.95] tracking-tight mb-5"
        style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
      >
        <AnimatedNumber value={value} format={format} />
      </div>
      <div className="text-white/85 leading-snug text-[15px] md:text-base mb-4 text-balance max-w-sm">
        {label}
      </div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-brass-300 font-bold">
        {source}
      </div>
    </div>
  );
}

function FeaturedContaminantCard({
  contaminant: c,
}: {
  contaminant: ReturnType<typeof getContaminant> extends infer T
    ? T extends undefined
      ? never
      : NonNullable<T>
    : never;
}) {
  return (
    <Link
      href={`/explore/${c.slug}`}
      className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-800 text-white p-9 md:p-11 h-full min-h-[26rem] shadow-lift hover:shadow-glass transition-all duration-500"
    >
      {/* Atmospheric blooms */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.45), transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 w-3/4 h-3/4 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.45), transparent 65%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
      </div>

      {/* Top accent stripe */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brass-300 via-brass-400 to-brass-300" />

      {/* Massive watermark formula */}
      {c.formula && (
        <span
          className="absolute top-6 right-7 font-serif leading-none pointer-events-none select-none"
          style={{
            fontSize: "clamp(8rem, 14vw, 14rem)",
            color: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {c.formula}
        </span>
      )}

      <div className="relative h-full flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-brass-300/80" />
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-brass-300">
            Featured · {c.category.replace("-", " ")}
          </span>
        </div>

        <h3
          className="display font-serif text-white leading-[0.98] mb-6"
          style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
        >
          {c.name}
        </h3>

        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-md text-pretty">
          {c.oneLine}
        </p>

        <div className="mt-auto">
          <div className="h-px w-full bg-gradient-to-r from-brass-300/40 via-white/15 to-transparent mb-6" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brass-300 font-bold mb-1">
                Affected
              </div>
              <div className="font-serif text-2xl text-white">
                9.2M U.S. homes
              </div>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brass-400/10 border border-brass-300/40 group-hover:bg-brass-400 group-hover:border-brass-400 transition-all duration-300">
              <ArrowUpRight
                className="h-5 w-5 text-brass-300 group-hover:text-ocean-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
