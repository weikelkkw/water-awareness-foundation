import Link from "next/link";
import { CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata = {
  title: "Unsubscribed · Water Awareness Foundation",
  description: "You've been removed from the Sunday digest.",
  robots: { index: false, follow: false },
};

const STATUS_COPY: Record<
  string,
  { eyebrow: string; title: string; body: string; tone: "ok" | "warn" }
> = {
  ok: {
    eyebrow: "Unsubscribed",
    title: "You're off the list.",
    body: "We've removed your address from the Sunday digest. No more emails from us. If you ever change your mind, the signup form on the site will bring you right back.",
    tone: "ok",
  },
  "not-found": {
    eyebrow: "Already removed",
    title: "We couldn't find that subscription.",
    body: "The unsubscribe link may have already been used, or the address has been removed previously. Either way — you're not on the list.",
    tone: "warn",
  },
  "missing-token": {
    eyebrow: "Link incomplete",
    title: "That unsubscribe link is missing its token.",
    body: "Please open the Sunday digest email and click the unsubscribe link at the bottom directly. If it keeps failing, reply to any issue and we'll remove you manually.",
    tone: "warn",
  },
  "db-error": {
    eyebrow: "Something went wrong",
    title: "We hit a snag removing you.",
    body: "Please try the unsubscribe link again in a minute. If the problem persists, reply to any digest and we'll remove you by hand.",
    tone: "warn",
  },
};

export default function UnsubscribedPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status ?? "ok";
  const copy = STATUS_COPY[status] ?? STATUS_COPY.ok;
  const ok = copy.tone === "ok";

  return (
    <section className="relative overflow-hidden bg-midnight text-white min-h-[85vh] flex items-center pt-20 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-30"
          style={{
            background: ok
              ? "radial-gradient(circle at center, rgba(0,180,216,0.45), transparent 60%)"
              : "radial-gradient(circle at center, rgba(201,166,99,0.45), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
      </div>
      <Container size="tight" className="relative w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 mx-auto ${
              ok
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-brass-500/20 text-brass-300"
            }`}
          >
            {ok ? (
              <CheckCircle2 className="h-8 w-8" />
            ) : (
              <AlertTriangle className="h-8 w-8" />
            )}
          </div>
          <div className="flex items-center gap-3 mb-5 justify-center">
            <span className="h-px w-10 bg-brass-300" />
            <Eyebrow className="text-brass-300">{copy.eyebrow}</Eyebrow>
            <span className="h-px w-10 bg-brass-300" />
          </div>
          <h1 className="display text-display-lg text-white mb-5 text-balance leading-[1.02]">
            {copy.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif italic mb-10">
            {copy.body}
          </p>

          <div className="mt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-brass-300 text-ocean-700 font-medium hover:bg-brass-400 transition-all shadow-soft"
            >
              Back to the foundation
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all"
            >
              <Mail className="h-4 w-4" />
              Resubscribe later
            </Link>
          </div>

          <p className="mt-12 text-xs text-white/50 leading-relaxed max-w-md mx-auto">
            We're an independent, non-commercial foundation. No advertising,
            no affiliate revenue, no filter sales — and now, no more email
            from us.
          </p>
        </div>
      </Container>
    </section>
  );
}
