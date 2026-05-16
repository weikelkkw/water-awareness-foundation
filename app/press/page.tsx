import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "Press",
  description:
    "Press kit, expert availability, and contact details for journalists covering U.S. drinking water.",
};

const TOPICS = [
  {
    title: "Lead in drinking water",
    detail:
      "9.2M lead service lines, 2024 Lead and Copper Rule Improvements, school water testing, Flint and post-Flint policy.",
    href: "/learn/contaminants/lead-in-drinking-water",
  },
  {
    title: "PFAS / forever chemicals",
    detail:
      "April 2024 EPA rule, ongoing utility litigation, USGS 45% detection finding, Maine biosolids investigation.",
    href: "/learn/contaminants/pfas-forever-chemicals",
  },
  {
    title: "Fluoride and the 2024 NTP monograph",
    detail:
      "Honest read of the moderate-confidence finding above 1.5 mg/L vs. U.S. fluoridation at 0.7 mg/L.",
    href: "/learn/contaminants/fluoride-science-and-controversy",
  },
  {
    title: "Pharmaceuticals in tap water",
    detail:
      "AP 2008 investigation, EPA UCMR4 data, antibiotic resistance and endocrine concerns.",
    href: "/learn/contaminants/pharmaceuticals-in-tap-water",
  },
  {
    title: "Water and pregnancy / infants / children",
    detail:
      "Demographic-specific exposure science across the first 18 years of life.",
    href: "/learn/demographic/water-and-children",
  },
];

export default function PressPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
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
            <Eyebrow className="text-brass-300">Press</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            For journalists covering
            <em className="not-italic italic font-light text-cyan-300"> U.S. drinking water.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            Sourced background, on-the-record commentary, custom data pulls
            for specific utilities, and quick turnaround on deadline.
          </p>
        </Container>
      </section>

      <Section
        className="relative pt-14 md:pt-20 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          {/* CONTACT CARD */}
          <div className="rounded-3xl border border-line bg-white p-7 md:p-10 shadow-lift mb-10 relative overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-brass-300" />
              <Eyebrow>Press contact</Eyebrow>
            </div>
            <h2 className="display text-3xl text-ocean-700 mb-3">
              Email <a href="mailto:press@waterawarenessfoundation.com" className="text-cyan-600 hover:underline">press@waterawarenessfoundation.com</a>
            </h2>
            <p className="text-ink/75 leading-relaxed">
              Include your outlet, topic, and deadline. We respond within 24
              hours on weekdays. For deadline-day requests, write &quot;DEADLINE&quot;
              in the subject line.
            </p>
          </div>

          {/* WHAT WE CAN PROVIDE */}
          <div className="relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
            <div className="prose-editorial px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-16">
              <h2>What we can provide</h2>
            <ul>
              <li>
                <strong>On-the-record commentary</strong> from the foundation
                review board on water-policy and contaminant stories
              </li>
              <li>
                <strong>Custom utility data pulls</strong> for any U.S. ZIP code
                — typically delivered within 24 hours
              </li>
              <li>
                <strong>Background briefings</strong> for reporters new to the
                beat
              </li>
              <li>
                <strong>Citation-ready statistics</strong> with primary-source
                links
              </li>
              <li>
                <strong>Image/data licensing</strong> for editorial use of our
                visual assets — free with attribution
              </li>
            </ul>

              <h2>Topics we cover in depth</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 my-10">
            {TOPICS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group block rounded-2xl border border-line bg-white p-6 hover:border-cyan-300 hover:shadow-lift transition-all"
              >
                <h3 className="font-serif text-xl text-ocean-700 group-hover:text-cyan-600 transition-colors mb-2">
                  {t.title}
                </h3>
                <p className="text-[15px] text-ink/70 leading-relaxed">
                  {t.detail}
                </p>
              </Link>
            ))}
          </div>

          <div className="relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
            <div className="prose-editorial px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-16">
              <h2>Citation guidance</h2>
            <p>
              Articles may be cited as &quot;Water Awareness Foundation&quot; with a link
              to the source page. For long-form attribution: &quot;Water Awareness
              Foundation, an independent non-commercial educational
              organization (waterawarenessfoundation.com).&quot;
            </p>

            <h2>Boilerplate</h2>
            <blockquote>
              The Water Awareness Foundation is an independent, non-commercial
              educational organization publishing science-backed information
              about U.S. drinking water. The foundation accepts no advertising,
              no affiliate revenue, and no funding from utilities, bottled
              water companies, or filtration manufacturers. Editorial work is
              reviewed by the foundation&apos;s internal review board prior to
              publication. waterawarenessfoundation.com.
            </blockquote>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
