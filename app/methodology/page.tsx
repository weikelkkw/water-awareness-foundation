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
          <h3>Primary: EPA Safe Drinking Water Information System (SDWIS)</h3>
          <p>
            Every ZIP report draws first from EPA&apos;s SDWIS Federal Reports,
            accessed through the public Envirofacts REST endpoint. The specific
            tables we pull from:
          </p>
          <ul>
            <li>
              <strong>WATER_SYSTEM</strong> — utility metadata: name, population
              served, primary source water type, ownership.
            </li>
            <li>
              <strong>GEOGRAPHIC_AREA</strong> — the mapping from ZIP codes to
              public water system IDs (PWSIDs). When multiple utilities serve a
              ZIP, we report the one with the largest population served as the
              primary, and list the others.
            </li>
            <li>
              <strong>VIOLATION</strong> — every reported regulatory violation in
              the past 5 years.
            </li>
          </ul>
          <p>
            We cache successful lookups in Supabase for 30 days. The first
            visitor for a given ZIP triggers a live EPA lookup; subsequent
            visitors get a sub-100ms cached response.
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
              Where useful, Environmental Working Group&apos;s Tap Water Database
              for health-protective guideline values that go beyond EPA&apos;s
              regulatory limits. We treat EWG guidelines as health-protective
              reference points, not as enforceable standards.
            </li>
          </ul>
          <p>
            Every numeric claim and citation on the site maps to an entry in our
            <Link href="#sources"> source registry</Link>.
          </p>

          <h2>The Water Score, in detail</h2>
          <p>
            The score is a transparent rubric, not a black box. It begins at 100
            and applies the following deductions, based on the past 5 years of
            SDWIS violation data for the primary utility serving the ZIP:
          </p>
          <ul>
            <li>
              <strong>−12 points</strong> per active, health-based MCL violation.
            </li>
            <li>
              <strong>−6 points</strong> per resolved health-based violation.
            </li>
            <li>
              <strong>−3 points</strong> per active monitoring or reporting
              violation.
            </li>
            <li>
              <strong>−1.5 points</strong> per resolved monitoring or reporting
              violation.
            </li>
            <li>
              <strong>−4 points</strong> if the primary source water is surface
              water, reflecting elevated disinfection byproduct exposure on
              average compared to groundwater systems.
            </li>
          </ul>
          <p>The score is then floored at 25 and ceilinged at 100. Letter grades:</p>
          <ul>
            <li><strong>A</strong>: 92–100</li>
            <li><strong>B</strong>: 82–91</li>
            <li><strong>C</strong>: 70–81</li>
            <li><strong>D</strong>: 55–69</li>
            <li><strong>F</strong>: under 55</li>
          </ul>

          <h2>What the Water Score does NOT measure</h2>
          <p>
            This is the most important section of this page. Please read it.
          </p>
          <p>
            <strong>The Water Score is a regulatory-compliance proxy.</strong> It
            measures how well your utility follows the rules, weighted by how
            severe the failures are. A score of 100 means &quot;this utility has
            no reported violations in SDWIS for the past 5 years and uses
            groundwater.&quot; That is meaningful — but it is not the same as
            &quot;the water at your tap is safe.&quot;
          </p>
          <p>Specifically, the score does not measure:</p>
          <ul>
            <li>
              <strong>Lead in your own home.</strong> Lead enters water from
              service lines, lead solder, and brass fittings inside your house —
              after the utility&apos;s responsibility ends. Two homes on the
              same block can have wildly different lead levels.
            </li>
            <li>
              <strong>PFAS exposure.</strong> The PFAS MCL is in effect but
              compliance sampling is just beginning at most utilities. SDWIS
              data through 2026 substantially undercounts PFAS contamination.
            </li>
            <li>
              <strong>Contaminants without federal limits.</strong>{" "}
              Chromium-6, microplastics, and pharmaceuticals are not federally
              regulated. SDWIS does not contain comprehensive data on them.
            </li>
            <li>
              <strong>Seasonal variation.</strong> Many contaminants — especially
              disinfection byproducts and nitrate — vary significantly through
              the year. Annual averages can hide real spikes.
            </li>
            <li>
              <strong>Sampling reliability.</strong> Pre-2024 lead sampling rules
              allowed practices (pre-flushing, sample exclusion) that biased
              reported lead levels low. The 2024 LCRI fixes some of this but the
              historical violation record reflects the older sampling regime.
            </li>
          </ul>
          <p>
            Our recommendation to readers: the score is the start of the
            conversation, not the end. If you want certainty about your own tap,
            the only path is a certified laboratory test. Most state health
            departments maintain a list of certified labs.
          </p>

          <h2>The big honest caveat: ZIP-to-utility mapping</h2>
          <p>
            EPA&apos;s SDWIS database does not directly map ZIP codes to public
            water systems for most utilities. The GEOGRAPHIC_AREA table contains
            a <code>zip_code_served</code> column, but it is null or sparsely
            populated for the majority of records — even for very large systems
            like New York City&apos;s. The web-based EPA Drinking Water Lookup
            tool that does support ZIP search uses a different backend not
            exposed through the public Envirofacts REST API.
          </p>
          <p>
            <strong>This means that for many ZIPs, our live SDWIS lookup will
            return &quot;no data found&quot; even though the EPA website would
            return a result for the same query.</strong> We&apos;d rather show
            that fallback page honestly than fake a result.
          </p>
          <p>
            We are actively building a supplementary ZIP-to-PWSID mapping
            (combining U.S. Census place geography, ANSI county codes, and
            community water system service-area boundary data published by some
            state primacy agencies) and will roll it into the report builder as
            coverage improves. The data layer is already structured so this
            mapping can be added without changing the article or report
            templates.
          </p>

          <h2>Reporting lag</h2>
          <p>
            EPA SDWIS reports lag actual sampling by 1–6 quarters depending on
            the state. Violations data reflects what utilities self-reported AND
            what state regulators forwarded to EPA. When we say &quot;past 5
            years,&quot; we mean the past 5 years as reported in SDWIS, which is
            roughly the past 4.5 years of sampling.
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
