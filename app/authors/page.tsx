import Link from "next/link";
import { ShieldCheck, Users, BookOpen } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/Container";
import { BodyAtmosphere } from "@/components/water/BodyAtmosphere";
import { AUTHORS } from "@/lib/authors";

export const metadata = {
  title: "Authors & Reviewers",
  description:
    "The people behind the Water Awareness Foundation's editorial work.",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 3);
}

export default function AuthorsPage() {
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
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-20"
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
            <Eyebrow className="text-brass-300">Authors & Reviewers</Eyebrow>
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            The people who
            <em className="not-italic italic font-light text-cyan-300"> stand behind</em> the work.
          </h1>
          <p className="text-xl text-white/75 leading-relaxed font-serif italic">
            Every article on the foundation site passes through a named,
            reviewable chain of editorial and scientific responsibility before
            it appears publicly.
          </p>

          {/* Trust stats */}
          <div className="mt-12 grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            <DarkStat label="Editorial roles" value={String(AUTHORS.length)} />
            <DarkStat label="Review cycles per article" value="3" accent />
            <DarkStat label="Conflicts of interest" value="None" />
          </div>
        </Container>
      </section>

      <Section
        className="relative pt-16 md:pt-20 pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,61,92,0.04) 0%, rgba(240,246,251,0.55) 35%, rgba(240,246,251,0.65) 100%)",
        }}
      >
        <BodyAtmosphere variant="mixed" />
        <Container size="tight" className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-brass-400/70" />
            <Eyebrow>Editorial team</Eyebrow>
          </div>
          <h2 className="display text-display-md text-ocean-700 mb-10 text-balance leading-[1.05]">
            Named roles, reviewable work.
          </h2>

          <div className="space-y-6 md:space-y-7">
            {AUTHORS.map((a, i) => (
              <article
                key={a.id}
                className="group relative rounded-3xl border border-line bg-white p-7 md:p-10 shadow-soft hover:shadow-lift transition-all overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-300/0 via-brass-400/70 to-brass-300/0" />
                <span
                  aria-hidden
                  className="absolute -top-2 -right-1 font-serif text-[140px] leading-none text-ocean-700/[0.04] pointer-events-none select-none font-light"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Avatar plinth */}
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-br from-ocean-700 to-midnight text-white shadow-lift relative overflow-hidden">
                      <span className="absolute inset-0 bg-grid-faint opacity-20" />
                      <span className="relative display text-2xl md:text-3xl text-cyan-200 font-light">
                        {initials(a.name)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-brass-500 font-bold mb-1.5">
                          {a.role}
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl text-ocean-700 mb-1 leading-tight">
                          {a.name}
                        </h2>
                        {a.credentials && (
                          <p className="text-sm text-muted italic font-serif">
                            {a.credentials}
                          </p>
                        )}
                      </div>
                      {a.placeholder && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[10px] uppercase tracking-[0.18em] font-bold">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 animate-ping opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                          </span>
                          Real attribution pending
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] text-ink/80 leading-relaxed">
                      {a.bio}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Anonymity card */}
          <div className="mt-16 relative rounded-3xl bg-gradient-to-br from-ocean-700 via-ocean-800 to-midnight text-white p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-1/3 -right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 bg-grid-faint opacity-[0.05]" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-brass-300" />
                <Eyebrow className="text-brass-300">A note on anonymity</Eyebrow>
              </div>
              <p className="text-white/85 leading-relaxed font-serif text-lg max-w-2xl">
                We will publish individual reviewer identities as the
                foundation matures past the early operating period.
                Environmental-health journalism attracts more lawsuits than
                most reporting, and we would rather build a defensible review
                pipeline before naming the individuals who staff it. See{" "}
                <Link
                  href="/about"
                  className="text-cyan-200 hover:text-white underline-offset-4 hover:underline"
                >
                  /about
                </Link>{" "}
                for the foundation&apos;s broader transparency policy.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function DarkStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "p-5 md:p-6 " + (accent ? "bg-cyan-500/15" : "bg-white/[0.04]")
      }
    >
      <div
        className={
          "text-[10px] uppercase tracking-[0.18em] font-bold mb-2 " +
          (accent ? "text-cyan-200" : "text-brass-300/90")
        }
      >
        {label}
      </div>
      <div
        className={
          "font-serif text-2xl md:text-3xl font-light leading-none " +
          (accent ? "text-cyan-200" : "text-white")
        }
      >
        {value}
      </div>
    </div>
  );
}
