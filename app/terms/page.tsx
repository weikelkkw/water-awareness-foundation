import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Water Awareness Foundation site and content.",
};

export default function TermsPage() {
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
            <Eyebrow className="text-brass-300">Terms of Use</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            The terms,
            <em className="not-italic italic font-light text-cyan-300"> plainly.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            Educational content, freely shared. Use with attribution, don&apos;t
            sell it, don&apos;t pretend it&apos;s medical advice.
          </p>
          <p className="mt-6 text-sm text-white/55">Last updated: May 15, 2026</p>
        </Container>
      </section>

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative prose-editorial">
          <h2>About the foundation</h2>
          <p>
            The Water Awareness Foundation (&quot;we,&quot; &quot;us,&quot; the
            &quot;Foundation&quot;) operates wateraware.org as a non-commercial,
            educational resource on U.S. drinking water. By using the site, you
            agree to the terms below.
          </p>

          <h2>Educational, not medical, advice</h2>
          <p>
            The content on this site is published for general educational and
            informational purposes. It is <strong>not</strong> a substitute for
            advice from a licensed physician, environmental engineer, certified
            water laboratory, or other qualified professional. Do not rely on
            this site as the sole basis for any health decision, water-treatment
            purchase, or legal action.
          </p>
          <p>
            If you have a documented health concern related to drinking water,
            consult a physician. If you need a definitive measurement of the
            water at your tap, use a state-certified laboratory.
          </p>

          <h2>Accuracy and limits of our data</h2>
          <p>
            We publish per-ZIP water reports drawn from publicly-available
            datasets, including but not limited to the EPA&apos;s Safe Drinking
            Water Information System and the Environmental Working Group&apos;s
            Tap Water Database. Those datasets carry their own limitations
            (sampling lag, self-reported violations, incomplete contaminant
            coverage). Our methodology is published in full at{" "}
            <Link href="/methodology">/methodology</Link>.
          </p>
          <p>
            We make no warranty that any specific report is current, complete,
            or applicable to the water at any specific tap. Lead exposure, in
            particular, depends substantially on internal plumbing the Foundation
            cannot measure.
          </p>

          <h2>Use of content</h2>
          <p>
            All editorial content on the site — articles, contaminant
            explainers, fact entries, news pieces — is published by the
            Foundation. You are welcome to:
          </p>
          <ul>
            <li>Read, share, link to, and quote from the site for personal or educational use</li>
            <li>
              Reuse content under the{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creative Commons Attribution-NonCommercial 4.0 International
              </a>{" "}
              license, with attribution to &quot;Water Awareness Foundation&quot;
              and a link back to the source article
            </li>
            <li>Cite the site as a source in journalism, academic work, or policy writing</li>
          </ul>
          <p>You may not, without explicit prior written permission:</p>
          <ul>
            <li>Reproduce site content for commercial purposes (advertising, paid newsletters, e-commerce listings)</li>
            <li>Use foundation content to imply our endorsement of any product or company</li>
            <li>Scrape the site in bulk for commercial redistribution</li>
          </ul>

          <h2>Trademarks and brand</h2>
          <p>
            &quot;Water Awareness Foundation,&quot; the foundation logo, and
            associated visual identity are owned by the foundation. Use of these
            marks requires written permission.
          </p>

          <h2>Third-party links and data</h2>
          <p>
            The site links to external sources (EPA, CDC, EWG, peer-reviewed
            studies, news organizations). We do not control those sites and are
            not responsible for their content or practices.
          </p>

          <h2>User submissions</h2>
          <p>
            If you submit a correction, question, or piece of feedback, you grant
            us a non-exclusive right to reproduce that submission in editorial
            context (for example, in a published corrections log). We will not
            publish your name or contact information without permission.
          </p>

          <h2>Disclaimers and limitation of liability</h2>
          <p>
            The site is provided &quot;as is.&quot; To the maximum extent permitted
            by law, the Foundation disclaims warranties of any kind, express or
            implied, including (but not limited to) warranties of accuracy,
            fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            The Foundation, its officers, employees, contributors, and
            volunteers are not liable for any indirect, incidental,
            consequential, or punitive damages arising from your use of the
            site or reliance on its content.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms occasionally. Material changes will be
            announced on the homepage and in the Sunday newsletter at least 14
            days before they take effect. Continued use of the site after the
            effective date constitutes acceptance of the updated terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Delaware,
            United States, without regard to conflict-of-law principles. Any
            dispute will be resolved in the state and federal courts located in
            Delaware.
          </p>

          <h2>Contact</h2>
          <p>
            For permission requests, licensing questions, or legal correspondence,
            email{" "}
            <a href="mailto:legal@wateraware.org">legal@wateraware.org</a>. For
            corrections, see{" "}
            <Link href="/methodology#corrections">/methodology#corrections</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
