import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How the Water Awareness Foundation collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
            <Eyebrow className="text-brass-300">Privacy Policy</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            How we handle
            <em className="not-italic italic font-light text-cyan-300"> your data.</em>
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            We collect as little as possible, sell none of it, and explain in plain
            language what we do and don&apos;t keep.
          </p>
          <p className="mt-6 text-sm text-white/55">Last updated: May 15, 2026</p>
        </Container>
      </section>

      <Section className="relative py-16 bg-canvas overflow-hidden">
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative prose-editorial">
          <h2>The short version</h2>
          <ul>
            <li>
              We do <strong>not</strong> sell your data. We never have, we never
              will.
            </li>
            <li>
              We collect your <strong>email address</strong> if you subscribe to
              the newsletter, and optionally your <strong>ZIP code</strong> to
              tailor the digest.
            </li>
            <li>
              We collect <strong>anonymous, aggregated usage statistics</strong>{" "}
              (page views, ZIP-code-search counts) via a privacy-respecting
              analytics provider. No cross-site tracking, no third-party
              advertising cookies.
            </li>
            <li>
              We use cached EWG and EPA-published utility data to generate water
              reports. That data is public and is not tied to you as an
              individual.
            </li>
            <li>
              You can request deletion of your subscriber record at any time by
              emailing{" "}
              <a href="mailto:privacy@wateraware.org">
                privacy@wateraware.org
              </a>
              .
            </li>
          </ul>

          <h2>What we collect, specifically</h2>

          <h3>If you subscribe to the newsletter</h3>
          <p>
            We store your email address, the optional ZIP code you provided, the
            timestamp you subscribed, and whether you have confirmed your
            subscription. That is the entirety of the personally-identifying data
            we hold for subscribers.
          </p>

          <h3>If you generate a water report</h3>
          <p>
            We log the ZIP code you searched and cache the corresponding utility
            data so the next visitor for the same ZIP gets a faster response. We
            do not store an association between a specific ZIP-code search and a
            specific visitor or device unless you also subscribe to the
            newsletter and link a ZIP to it.
          </p>

          <h3>Automatically collected (analytics)</h3>
          <p>
            We use a privacy-respecting analytics provider (Plausible or
            equivalent) configured to collect:
          </p>
          <ul>
            <li>Page URL, referrer URL, browser type, country (from IP)</li>
            <li>
              <strong>Nothing</strong> tied to a user identifier or cookie. No
              cross-site tracking. No advertising network is loaded.
            </li>
          </ul>

          <h3>Cookies</h3>
          <p>
            The foundation site does not use marketing cookies. It uses functional
            cookies only where strictly necessary (for example, to remember if
            you have dismissed an alert). No advertising or tracking cookies are
            set by the foundation.
          </p>

          <h2>How we use your data</h2>
          <ul>
            <li>
              <strong>Email address:</strong> to send you the weekly Sunday
              digest, and (rarely) operational emails about the foundation.
            </li>
            <li>
              <strong>ZIP code (subscribers):</strong> to tailor the regional
              alerts section of the weekly digest. Never disclosed to third
              parties.
            </li>
            <li>
              <strong>Aggregated usage data:</strong> to understand which articles
              and contaminants are most read, so we can prioritize future
              editorial work.
            </li>
          </ul>

          <h2>Who we share data with</h2>
          <p>
            Nobody, in any meaningful sense. Specifically:
          </p>
          <ul>
            <li>
              <strong>No advertisers.</strong> The foundation does not run
              advertising and does not sell space.
            </li>
            <li>
              <strong>No data brokers.</strong> Period.
            </li>
            <li>
              <strong>Service providers</strong> who help us operate the site
              (Supabase for our database, Resend or Postmark for transactional
              email, Vercel for hosting) process data on our behalf under their
              own privacy policies. They are not permitted to use foundation data
              for any purpose other than delivering the service.
            </li>
          </ul>

          <h2>Your rights</h2>
          <p>
            If you are in the European Union, the United Kingdom, California, or
            another jurisdiction with comparable data-protection law, you have
            the right to:
          </p>
          <ul>
            <li>Request a copy of the data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time (unsubscribe is one click)</li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a href="mailto:privacy@wateraware.org">privacy@wateraware.org</a>.
            We will respond within 30 days, typically much faster.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            The site is intended for a general adult audience. We do not knowingly
            collect data from anyone under 13. If you believe we have, contact us
            at{" "}
            <a href="mailto:privacy@wateraware.org">privacy@wateraware.org</a>{" "}
            and we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We will update this page if our practices change. Material changes
            will be disclosed in the Sunday newsletter at least 14 days before
            they take effect.
          </p>

          <h2>Contact</h2>
          <p>
            Email <a href="mailto:privacy@wateraware.org">privacy@wateraware.org</a>{" "}
            with any privacy question or request. For general contact, see{" "}
            <Link href="/about">/about</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
