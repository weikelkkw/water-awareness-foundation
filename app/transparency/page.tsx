import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "Transparency",
  description:
    "How the Water Awareness Foundation is funded, who we accept money from, and how editorial decisions are made.",
};

export default function TransparencyPage() {
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
            <Eyebrow className="text-brass-300">Transparency</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            Where the money
            <em className="not-italic italic font-light text-cyan-300"> comes from.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            A standing record of foundation funding, editorial independence
            commitments, and the things we will not do.
          </p>
          <p className="mt-6 text-sm text-white/55">
            First report period: foundation incorporation through fiscal year
            close.
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
          <article className="relative rounded-3xl bg-white shadow-lift border border-line overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
            <div className="prose-editorial px-6 sm:px-10 md:px-14 lg:px-16 py-12 md:py-16">
              <h2>Funding sources to date</h2>
          <p>
            The foundation was incorporated in 2026. As of this report, the
            organization is operating on founder contributions and a small
            number of individual donations.
          </p>
          <ul>
            <li>
              <strong>Founder contribution:</strong> initial operating capital
              for site development, hosting, and incorporation costs.
            </li>
            <li>
              <strong>Individual donations:</strong> 0 received as of report
              period.
            </li>
            <li>
              <strong>Foundation grants:</strong> 0 received as of report period.
              Outreach to several environmental-health foundations in progress.
            </li>
            <li>
              <strong>Earned revenue:</strong> 0. The foundation does not sell
              products, run advertising, or accept affiliate compensation.
            </li>
          </ul>

          <h2>Sources we will not accept</h2>
          <p>
            The foundation does not and will not accept funding from:
          </p>
          <ul>
            <li>Water utility associations or individual public or private water utilities</li>
            <li>Bottled water companies or their parent corporations</li>
            <li>Water-filter manufacturers or distributors</li>
            <li>Pharmaceutical or chemical manufacturers regulated under SDWA</li>
            <li>Industrial discharge permit holders within five years of any active foundation editorial work covering them</li>
            <li>Companies whose business performance depends on the level of public concern about water quality</li>
            <li>Any entity requesting editorial influence as a condition of giving</li>
          </ul>

          <h2>Editorial independence commitments</h2>
          <ul>
            <li>
              <strong>No paid sponsorship of editorial content.</strong> No
              article, contaminant page, or news piece is written in coordination
              with or at the request of any external party.
            </li>
            <li>
              <strong>No advance review.</strong> No funder, partner, or external
              party reviews articles before publication.
            </li>
            <li>
              <strong>No takedowns by request.</strong> Once published, articles
              are corrected only for factual error, not for funder discomfort.
              Corrections are logged publicly at{" "}
              <Link href="/methodology#corrections">/methodology#corrections</Link>.
            </li>
            <li>
              <strong>Disclosure when relevant.</strong> Any potential conflict
              of interest will be disclosed in the article itself, not buried
              in a footer.
            </li>
          </ul>

          <h2>Operating costs</h2>
          <p>
            The foundation runs lean. The largest line items are hosting
            (Vercel, Supabase), email service (Resend), domain registration,
            and any commissioned editorial review. The foundation does not
            currently compensate editorial reviewers; this will change as
            funding allows.
          </p>

          <h2>Annual reporting cadence</h2>
          <p>
            We publish a transparency update at minimum once per fiscal year.
            Material changes (a new institutional funder, a change in funding
            policy, a personnel change affecting editorial control) are
            disclosed within 30 days of the change.
          </p>

          <h2>Questions</h2>
          <p>
            Email{" "}
            <a href="mailto:transparency@waterawarenessfoundation.com">
              transparency@waterawarenessfoundation.com
            </a>{" "}
            with any question about funding, governance, or editorial
            independence. We will respond and, where appropriate, update this
            page.
          </p>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
