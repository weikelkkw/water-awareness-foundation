import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Beaker,
  BookOpen,
  Droplet,
  Layers,
  Microscope,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ZipCodeHero } from "@/components/water/ZipCodeHero";
import { FactRotator } from "@/components/water/FactRotator";
import { HeroAtmosphere } from "@/components/water/HeroAtmosphere";
import { NewsletterCapture } from "@/components/water/NewsletterCapture";
import { ContaminantPillCard } from "@/components/water/ContaminantPillCard";
import { CONTAMINANTS } from "@/lib/contaminants";

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

export default function HomePage() {
  return (
    <>
      {/* ============================================================ */}
      {/* HERO — cinematic, atmospheric, layered                       */}
      {/* ============================================================ */}
      <section
        id="check-your-water"
        className="relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-36"
      >
        <HeroAtmosphere />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-line/70 shadow-soft mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-ripple opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-ocean-700 font-semibold">
                  An independent foundation · est. 2026
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="display text-display-xl text-ocean-700 text-balance mb-8 leading-[0.98]">
                What&apos;s actually <em className="not-italic font-light italic text-cyan-600">in</em>
                <br className="hidden md:inline" /> your tap water?
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-2xl mx-auto mb-12 text-pretty">
                Clear, science-backed reports on the drinking water in every
                U.S. ZIP code — sourced from EWG&apos;s Tap Water Database,
                written in plain English, and brutally honest about what we
                know and what we don&apos;t.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <ZipCodeHero />
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs md:text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-cyan-500" />
                  Live EWG contaminant data
                </span>
                <span className="hidden md:inline text-line">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Beaker className="h-4 w-4 text-cyan-500" />
                  Reviewed by environmental health experts
                </span>
                <span className="hidden md:inline text-line">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-cyan-500" />
                  Citations on every claim
                </span>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Brass accent line — small, intentional */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-brass-300 to-brass-300 opacity-60" />
      </section>

      {/* ============================================================ */}
      {/* DEEP OCEAN STATS BAND — dark, dramatic, breaks the rhythm   */}
      {/* ============================================================ */}
      <section className="relative bg-ocean-700 text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/2 left-1/3 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.6), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <span className="inline-block text-xs uppercase tracking-[0.22em] text-brass-300 font-semibold mb-5">
                The Honest Numbers
              </span>
              <h2 className="display text-display-md text-white text-balance leading-[1.05]">
                Your water is regulated.
                <br />
                That&apos;s not the same as safe.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden">
            <BigStat
              value="9.2M"
              label="Lead service lines still in U.S. homes"
              source="EWG Tap Water Database"
              delay={0}
            />
            <BigStat
              value="45%"
              label="Of U.S. tap water samples with PFAS detected"
              source="USGS, 2023"
              delay={100}
            />
            <BigStat
              value="~90"
              label="Contaminants regulated by the Safe Drinking Water Act"
              source="Safe Drinking Water Act"
              delay={200}
            />
            <BigStat
              value="0"
              label="Safe blood-lead level in children"
              source="CDC, AAP, WHO"
              delay={300}
            />
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* CATEGORY GRID — premium card treatment                       */}
      {/* ============================================================ */}
      <Section className="relative bg-ocean-wash overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.4), transparent 65%)",
            }}
          />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <Eyebrow className="mb-4">Start here</Eyebrow>
              <h2 className="display text-display-md text-ocean-700 text-balance leading-[1.05]">
                Four ways into the data.
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              icon={<Droplet className="h-5 w-5" />}
              label="Reports"
              title="Your ZIP, scored"
              body="Utility name, population served, violation history, and a transparent score. Free, no signup."
              href="/report"
              delay={0}
            />
            <FeatureCard
              icon={<Microscope className="h-5 w-5" />}
              label="Contaminants"
              title="What's actually in there"
              body="Plain-English explainers on lead, PFAS, fluoride, arsenic, chlorine byproducts, and more."
              href="/explore"
              delay={100}
            />
            <FeatureCard
              icon={<BookOpen className="h-5 w-5" />}
              label="Learn"
              title="Long-read library"
              body="Editorial deep-dives on health effects, filtration, policy, and history. Every claim cited."
              href="/learn"
              delay={200}
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              label="Compare"
              title="Two ZIPs, side-by-side"
              body="Useful when you're moving, comparing schools, or just curious how a friend's water stacks up."
              href="/compare"
              delay={300}
            />
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* WHO IT'S FOR — demographic links, deep ocean atmosphere      */}
      {/* ============================================================ */}
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
                <Eyebrow className="mb-4 text-brass-300">Who it&apos;s for</Eyebrow>
                <h2 className="display text-display-md text-white text-balance leading-[1.05] mb-6">
                  Water doesn&apos;t affect everyone the same way.
                </h2>
                <p className="text-lg text-white/75 leading-relaxed">
                  An eight-pound newborn, a sixty-pound dog, and a sixty-year-old
                  with a coffee habit are answering different questions. Each
                  guide below is written for the specific biology, behavior,
                  and stakes of that life stage or context.
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
                          <div className="font-serif text-2xl md:text-3xl text-white group-hover:text-cyan-300 transition-colors mb-1">
                            {d.label}
                          </div>
                          <div className="text-[15px] text-white/65">
                            {d.caption}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/15 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white group-hover:text-ocean-700 transition-colors" />
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

      {/* ============================================================ */}
      {/* CONTAMINANTS PREVIEW                                         */}
      {/* ============================================================ */}
      <Section className="relative bg-ocean-wash overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.35), transparent 65%)",
            }}
          />
        </div>
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <Eyebrow className="mb-4">The Contaminants</Eyebrow>
                <h2 className="display text-display-md text-ocean-700 text-balance leading-[1.05]">
                  The chemicals worth understanding.
                </h2>
                <p className="mt-5 text-lg text-ink/70 leading-relaxed">
                  Each entry links to a sourced deep-dive: what it is, where it
                  comes from, what the science says, and exactly which filter
                  types remove it.
                </p>
              </div>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 text-cyan-500 hover:text-cyan-600 font-medium whitespace-nowrap group"
              >
                See all contaminants
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTAMINANTS.slice(0, 6).map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <ContaminantPillCard contaminant={c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* EDITORIAL PULL QUOTE — deep ocean editorial moment           */}
      {/* ============================================================ */}
      <section className="relative bg-midnight text-white py-32 md:py-44 overflow-hidden">
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
            <Quote className="h-10 w-10 text-brass-300 mb-8 mx-auto" strokeWidth={1.5} />
            <blockquote className="display font-serif text-3xl md:text-5xl text-white text-balance text-center leading-[1.1] italic">
              &ldquo;Your utility being in compliance with the Safe Drinking
              Water Act is the start of the public-safety conversation,
              <span className="not-italic"> not the end.</span>&rdquo;
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-3 text-sm text-white/60">
              <span className="h-px w-8 bg-brass-300" />
              <span className="uppercase tracking-[0.22em] font-semibold text-brass-300">
                From our Flint, Michigan retrospective
              </span>
              <span className="h-px w-8 bg-brass-300" />
            </div>
            <div className="mt-6 text-center">
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

      {/* ============================================================ */}
      {/* FACT ROTATOR                                                 */}
      {/* ============================================================ */}
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
                className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
              >
                Browse all water facts →
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* LEARN TEASER — editorial image moment                        */}
      {/* ============================================================ */}
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
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ocean-700/80 via-ocean-700/30 to-transparent">
                  <div className="text-xs uppercase tracking-[0.22em] text-brass-200 font-semibold mb-2">
                    From the Library
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-white text-balance">
                    &ldquo;Lead in drinking water: what the science actually says.&rdquo;
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-5" delay={150}>
              <Eyebrow className="mb-4">Library</Eyebrow>
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

      {/* ============================================================ */}
      {/* NEWSLETTER — dark close                                      */}
      {/* ============================================================ */}
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
              <Eyebrow className="mb-5 text-brass-300">The Sunday Email</Eyebrow>
              <h2 className="display text-display-md text-white mb-5 text-balance leading-[1.05]">
                One email per week.
                <br />
                <em className="not-italic font-light italic text-cyan-300">
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

function FeatureCard({
  icon,
  label,
  title,
  body,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  href: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="group relative block rounded-2xl border border-line bg-white p-7 hover:border-cyan-300 hover:shadow-lift transition-all h-full overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brass-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 mb-5 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-all">
          {icon}
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted mb-2 font-semibold">
          {label}
        </div>
        <h3 className="font-serif text-xl text-ocean-700 mb-2.5">{title}</h3>
        <p className="text-[15px] text-ink/70 leading-relaxed">{body}</p>
        <div className="mt-5 inline-flex items-center gap-1 text-cyan-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Open <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </Reveal>
  );
}

function BigStat({
  value,
  label,
  source,
  delay = 0,
}: {
  value: string;
  label: string;
  source: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="bg-ocean-700 p-8 md:p-10 h-full">
        <div className="display text-5xl md:text-6xl text-white font-light mb-4 tracking-tight">
          {value}
        </div>
        <div className="text-white/85 leading-snug text-[15px] mb-4 text-balance">
          {label}
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-brass-300 font-semibold">
          {source}
        </div>
      </div>
    </Reveal>
  );
}
