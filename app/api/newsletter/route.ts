import { NextResponse } from "next/server";
import { z } from "zod";
import { saveNewsletterSignup } from "@/lib/db/queries";
import { sendWelcomeEmail } from "@/lib/email/resend";

const Schema = z.object({
  email: z.string().email(),
  zip: z
    .string()
    .regex(/^\d{5}$/)
    .optional(),
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
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const { email, zip } = parsed.data;

  const save = await saveNewsletterSignup(email, zip);
  if (!save.ok) {
    return NextResponse.json(
      { error: save.error ?? "Could not save signup." },
      { status: 500 }
    );
  }

  // Send the welcome email. We don't block the response on a send failure —
  // the subscriber is still persisted, and we surface the email status so
  // an admin tool could re-send.
  const send = await sendWelcomeEmail(email, { zip });

  return NextResponse.json({
    ok: true,
    persisted: save.persisted,
    emailSent: send.ok && !send.skipped,
    emailSkipped: send.skipped ?? false,
  });
}
