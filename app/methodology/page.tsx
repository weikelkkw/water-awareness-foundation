import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { SOURCES } from "@/lib/sources";

export const metadata = {
  title: "Methodology",
  description:
    "How we generate water reports, where the data comes from, what the score does and does not measure, and the limits we openly acknowledge.",
};

export default function MethodologyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
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
            <Eyebrow className="text-brass-300">Methodology</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-6 text-balance leading-[1.02]">
            How we make the reports —
            <em className="not-italic italic font-light text-cyan-300"> and what they don&apos;t tell you.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed text-pretty font-serif italic">
            This page is the full audit trail. It explains where our data comes
            from, how the Water Score is calculated, what the score does and
            doesn&apos;t measure, and the limits we openly acknowledge. If you
            spot a problem, write to{" "}
            <a href="mailto:corrections@waterawarenessfoundation.com" className="text-cyan-300 hover:underline">
              corrections@waterawarenessfoundation.com
            </a>
            .
          </p>
        </Container>
      </section>

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative prose-editorial">
          <h2>Data sources</h2>
          <h3>Primary: Environmental Working Group&apos;s Tap Water Database</h3>
          <p>
            Every ZIP report draws first from the{" "}
            <a
              href="https://www.ewg.org/tapwater/"
              target="_blank"
              rel="noopener noreferrer"
            >
              EWG Tap Water Database
            </a>
            , which compiles utility-reported contaminant sampling data
            covering nearly every public water system in the United States.
            EWG&apos;s health-protective guidelines — typically stricter than
            federal legal limits — are the reference points we display
            against measured concentrations on every report.
          </p>
          <p>
            We cache successful lookups for 30 days. The first visitor for a
            given ZIP triggers a live lookup; subsequent visitors get a
            sub-100ms cached response.
          </p>

          <h3>Secondary sources, integrated into article content</h3>
          <p>
            Articles and contaminant pages additionally draw on:
          </p>
          <ul>
            <li>CDC environmental health publications</li>
            <li>U.S. Geological Survey water-quality surveys (especially the 2023 PFAS national tap-water study)</li>
            <li>NIEHS, ATSDR, and NTP toxicological assessments</li>
            <li>WHO Guidelines for Drinking-water Quality (4th ed.)</li>
            <li>Peer-reviewed primary literature via PubMed</li>
            <li>
              U.S. federal regulations (Safe Drinking Water Act, Lead and
              Copper Rule, etc.) cited for legal-limit context alongside the
              EWG health-protective guidelines we treat as the reference for
              actual safety.
            </li>
          </ul>
          <p>
            Every numeric claim and citation on the site maps to an entry in our
            <Link href="#sources"> source registry</Link>.
          </p>

          <h2>How contaminants are flagged</h2>
          <p>
            For each utility, we display every contaminant EWG has measured
            against two reference values:
          </p>
          <ul>
            <li>
              <strong>The EWG health-protective guideline</strong> — typically
              based on California OEHHA public-health goals, peer-reviewed
              cancer-risk thresholds, or EWG&apos;s own analyses. These are
              far stricter than federal legal limits in nearly every case.
            </li>
            <li>
              <strong>The federal legal limit (MCL)</strong> — shown for
              context. &quot;Above guideline&quot; does not mean the water
              is in legal violation; it means the level exceeds what EWG
              considers health-protective.
            </li>
          </ul>
          <p>
            A contaminant is flagged on the report when the measured level
            exceeds the EWG guideline. Severity tiers:
          </p>
          <ul>
            <li>
              <strong>Severe</strong>: 100× or more above the guideline
            </li>
            <li>
              <strong>Elevated</strong>: 10×–100× above the guideline
            </li>
            <li>
              <strong>Above</strong>: 1×–10× above the guideline
            </li>
            <li>
              <strong>Detected</strong>: present but below the guideline
            </li>
          </ul>

          <h2>What the report does NOT measure</h2>
          <p>
            This is the most important section of this page. Please read it.
          </p>
          <p>
            <strong>EWG&apos;s data is utility-reported sampling, averaged
            and made comparable across systems.</strong> It is more health-
            protective than legal-compliance data, but it is still not a lab
            test of the water at your specific kitchen tap.
          </p>
          <p>Specifically, the report does not measure:</p>
          <ul>
            <li>
              <strong>Lead in your own home.</strong> Lead enters water from
              service lines, lead solder, and brass fittings inside your house —
              after the utility&apos;s responsibility ends. Two homes on the
              same block can have wildly different lead levels.
            </li>
            <li>
              <strong>PFAS exposure in real-time.</strong> The 2024 federal
              PFAS rule triggered new utility sampling that is still rolling
              out. Reports through 2026 may undercount PFAS at your utility.
            </li>
            <li>
              <strong>Contaminants without federal sampling requirements.</strong>{" "}
              Microplastics and most pharmaceuticals are not routinely
              measured at the utility scale.
            </li>
            <li>
              <strong>Seasonal variation.</strong> Many contaminants —
              especially disinfection byproducts and nitrate — vary
              significantly through the year. Annual averages can hide real
              spikes.
            </li>
          </ul>
          <p>
            Our recommendation to readers: the report is the start of the
            conversation, not the end. If you want certainty about your own
            tap, the only path is a certified laboratory test. Most state
            health departments maintain a list of certified labs.
          </p>

          <h2>Reporting lag</h2>
          <p>
            Contaminant-sampling data lags actual sampling by 1–6 quarters
            depending on the state. The latest report you see for a given
            utility reflects what that utility has reported to its state
            regulator and what has been ingested into our upstream data
            source. When we say &quot;recent,&quot; we mean recent as
            reported, which is roughly the past 4–5 years of sampling.
          </p>

          <h2>Updates and corrections</h2>
          <p id="corrections">
            We publish every correction we make. The first correction log will
            appear here once we have made one. The policy:
          </p>
          <ul>
            <li>
              Article text is updated in place, with the <em>updated</em> date
              published in the article header.
            </li>
            <li>
              Substantive corrections (numeric values, conclusions) are logged
              on this page with the original wording, the corrected wording,
              and the date.
            </li>
            <li>
              Stylistic edits and minor copy fixes are not logged.
            </li>
            <li>
              We do not silently edit articles to change their conclusions. If
              we update our position, we say so.
            </li>
          </ul>

          <h2 id="sources">Source registry</h2>
          <p>
            Every numeric claim, regulatory limit, and health effect cited on
            the site traces back to one of these primary sources. New sources
            are added as articles require them.
          </p>
          <ol>
            {Object.values(SOURCES).map((s) => (
              <li key={s.id} className="text-base">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:underline"
                >
                  {s.title}
                </a>
                <span className="text-muted"> — {s.publisher}</span>
                {s.accessed && (
                  <span className="text-muted"> (accessed {s.accessed})</span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
