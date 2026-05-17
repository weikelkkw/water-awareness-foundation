import { NextResponse } from "next/server";
import { z } from "zod";
import { saveNewsletterSignup } from "@/lib/db/queries";
import { sendWaterReportEmail } from "@/lib/email/water-report";

const Schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  zip: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit U.S. ZIP."),
  // Honeypot field — should always be empty when submitted by a human.
  hp: z.string().max(0).optional(),
  // UTM / campaign attribution (optional).
  source: z.string().max(64).optional(),
  // Optional opt-in to weekly digest in addition to the report.
  digestOptIn: z.boolean().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }
  const { email, zip, source, digestOptIn, hp } = parsed.data;
  // Silent honeypot reject (bots get a 200 so they don't retry).
  if (hp) return NextResponse.json({ ok: true });

  // Optional newsletter persistence (only if opted in). Don't block on this.
  if (digestOptIn) {
    void saveNewsletterSignup(email, zip).catch(() => {});
  }

  const send = await sendWaterReportEmail({ to: email, zip, source });

  if (!send.ok) {
    return NextResponse.json(
      { error: send.error ?? "Couldn't send the report. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    hadData: send.hadData,
    emailSkipped: send.skipped ?? false,
  });
}
