import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "About the Foundation",
  description:
    "Who we are, what we publish, how we're funded, and why we don't sell anything.",
};

export default function AboutPage() {
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
            <Eyebrow className="text-brass-300">About</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            We are the foundation we wish
            <em className="not-italic italic font-light text-cyan-300"> had existed</em> when we started looking up our own water.
          </h1>
          <p className="text-xl text-white/75 leading-relaxed text-pretty font-serif italic">
            The Water Awareness Foundation is an independent, non-commercial
            educational organization. We publish plain-English, fully-sourced
            information about drinking water in the United States — what&apos;s
            in it, what the science says about health effects, and what an
            informed person can reasonably do about it.
          </p>
        </Container>
      </section>

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative prose-editorial">
          <h2>Why we exist</h2>
          <p>
            U.S. drinking water is some of the most heavily regulated water on the
            planet. It is also imperfect, and the gap between &quot;in compliance&quot;
            and &quot;safe to drink without thinking about it&quot; is wider than most
            people realize. The Safe Drinking Water Act covers about 90
            contaminants. EPA&apos;s Contaminant Candidate List names hundreds more
            that may need regulation. Until 2024, none of the PFAS class was
            federally regulated at all.
          </p>
          <p>
            For a long time, the two main public sources of information about
            U.S. tap water have been (a) your utility&apos;s annual Consumer
            Confidence Report — a procedural document, not a health-protective one
            — and (b) consumer advocacy groups whose mission is often to mobilize
            concern rather than to give a balanced read.
          </p>
          <p>
            We sit in between. We take regulatory data seriously, including its
            limits. We take the advocacy critiques seriously, including their
            limits. We try to tell readers what the evidence shows — and where it
            doesn&apos;t show anything yet.
          </p>

          <h2>What we publish</h2>
          <ul>
            <li>
              <strong>Per-ZIP water reports</strong> using EPA&apos;s Safe Drinking
              Water Information System (SDWIS) as the primary source, scored
              against our published methodology.
            </li>
            <li>
              <strong>Contaminant deep-dives</strong> on every substance regulated
              under the Safe Drinking Water Act, plus the major unregulated
              contaminants of concern (microplastics, pharmaceuticals,
              chromium-6).
            </li>
            <li>
              <strong>Pillar articles</strong> on health effects, demographic
              impact, filtration, and policy — written to be the last thing you
              need to read on each topic.
            </li>
            <li>
              <strong>Editorial news coverage</strong> when policy or science
              changes meaningfully — like the 2024 PFAS rule, the 2024 Lead and
              Copper Rule Improvements, and the 2024 NTP fluoride monograph.
            </li>
            <li>
              <strong>A free weekly newsletter</strong> summarizing all of the
              above.
            </li>
          </ul>

          <h2 id="funding">How we&apos;re funded</h2>
          <p>
            We accept individual donations and unrestricted philanthropic grants
            from foundations and family offices interested in public-health
            literacy. We do <strong>not</strong> accept money from:
          </p>
          <ul>
            <li>Water utility associations or individual utilities.</li>
            <li>Bottled water companies or water-filter manufacturers.</li>
            <li>
              Companies whose business performance depends on the level of public
              concern about water quality.
            </li>
            <li>
              Affiliate programs of any kind. We do not earn commissions on
              filter purchases. We do not link out to e-commerce.
            </li>
          </ul>
          <p>
            We will publish an annual transparency report listing all donors
            above a low threshold. The first such report will appear at the end
            of our first full fiscal year.
          </p>

          <h2>How we work</h2>
          <p>
            Every numeric claim, regulatory limit, and health effect cited on
            the site traces back to a primary source. Our citation registry
            lives at <Link href="/methodology">/methodology</Link>. If we
            can&apos;t cite a primary source, we don&apos;t print the claim.
            &quot;Studies show&quot; doesn&apos;t count.
          </p>
          <p>
            Articles are dated. Articles are also updated when the science or
            regulation moves; the update date is published openly. We do not
            silently edit articles to make older predictions look better.
          </p>
          <p>
            Where the science is genuinely uncertain, we say so. The honest
            answer to a lot of water-health questions in 2026 is &quot;the
            association is real but the magnitude is debated&quot; or &quot;the
            mechanism is plausible but the human data is thin.&quot; We try to
            mark those questions clearly rather than papering over them with
            confident language.
          </p>

          <h2 id="corrections">Corrections</h2>
          <p>
            If you spot an error — a misquoted limit, a stale citation, a
            misleading framing — write to{" "}
            <a href="mailto:corrections@wateraware.org">
              corrections@wateraware.org
            </a>
            . We publish every correction we make at{" "}
            <Link href="/methodology#corrections">/methodology#corrections</Link>{" "}
            with the original wording, the corrected wording, and the date.
          </p>

          <h2>Who we are</h2>
          <p>
            The foundation was incorporated in 2026 as a nonprofit educational
            organization. Our editorial team includes researchers, public-health
            practitioners, and writers with backgrounds in environmental health,
            water engineering, and science journalism. We are deliberately
            opaque about individual identities for the early period of the
            foundation&apos;s existence — partly because we want the work to be
            judged on its merits, and partly because environmental-health
            reporting attracts more lawsuits than most journalism. We will name
            our team publicly when we are confident we can do so without
            chilling honest reporting.
          </p>

          <h2>What we are not</h2>
          <p>
            We are not a substitute for a certified laboratory test of your own
            tap. We are not a regulatory agency. We are not a litigation source.
            We will not tell you which filter to buy. We will tell you which
            certifications matter, and we will be honest about the limits of our
            own analysis.
          </p>
        </Container>

        <Container size="tight" className="mt-16">
          <div className="rounded-3xl bg-ocean-700 text-white p-8 md:p-12 text-center">
            <Eyebrow className="text-cyan-200 mb-4">Start here</Eyebrow>
            <h2 className="display text-3xl md:text-4xl text-white mb-5 text-balance">
              Curious what&apos;s in your water?
            </h2>
            <p className="text-white/80 leading-relaxed mb-6 max-w-xl mx-auto">
              The fastest way to get a sense of our work is to run your own ZIP
              through the report builder. It&apos;s free, no signup, and shows
              you exactly what we know and what we don&apos;t.
            </p>
            <Link href="/report">
              <Button variant="secondary" size="lg">
                Find your water report
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
