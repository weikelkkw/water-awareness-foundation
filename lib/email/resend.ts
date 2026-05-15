import { Resend } from "resend";

/**
 * Resend client. Initialized lazily so the app builds and runs even if
 * RESEND_API_KEY is not set in the environment — in that case all email
 * functions log to stdout instead of sending.
 */

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export const FROM_NEWSLETTER =
  process.env.RESEND_FROM_NEWSLETTER ??
  "Water Awareness Foundation <newsletter@wateraware.org>";

export function emailEnabled() {
  return !!resend;
}

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
  /** True when no email was sent because Resend isn't configured. */
  skipped?: boolean;
}

export async function sendWelcomeEmail(
  to: string,
  opts?: { zip?: string }
): Promise<SendResult> {
  if (!resend) {
    console.log(`[email:welcome SKIPPED] to=${to} zip=${opts?.zip ?? ""}`);
    return { ok: true, skipped: true };
  }
  try {
    const result = await resend.emails.send({
      from: FROM_NEWSLETTER,
      to,
      subject: "Welcome to the Water Awareness Foundation",
      html: welcomeHtml(opts?.zip),
      text: welcomeText(opts?.zip),
    });
    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

function welcomeHtml(zip?: string) {
  const zipLine = zip
    ? `<p style="margin:0 0 16px 0;color:#5C6470;">We'll tailor the regional alerts in your weekly digest to ZIP code <strong style="color:#0B3D5C;">${zip}</strong>.</p>`
    : "";
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Welcome</title></head>
<body style="margin:0;padding:0;background:#FAFBFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1A1A2E;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FAFBFC;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #E5E8EC;padding:40px 32px;">
        <tr><td style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.1;color:#0B3D5C;padding-bottom:8px;">Welcome to the Water Awareness Foundation.</td></tr>
        <tr><td style="padding-bottom:20px;">
          <span style="display:inline-block;padding:4px 10px;background:#F0F6FB;border:1px solid #D9E8F2;border-radius:999px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#1F6E94;font-weight:600;">The Sunday Email</span>
        </td></tr>
        <tr><td style="font-size:16px;line-height:1.6;color:#1A1A2E;padding-bottom:16px;">
          You'll receive one calm, sourced email every Sunday — new contaminants explained, policy updates, regional alerts. No spam. No advertising. One-click unsubscribe at the bottom of every issue.
        </td></tr>
        <tr><td>${zipLine}</td></tr>
        <tr><td style="padding:24px 0 16px 0;">
          <a href="https://wateraware.org/report" style="display:inline-block;padding:14px 24px;background:#0B3D5C;color:#fff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:500;">Check your tap water</a>
        </td></tr>
        <tr><td style="font-size:14px;line-height:1.6;color:#5C6470;border-top:1px solid #E5E8EC;padding-top:24px;margin-top:24px;">
          The foundation is non-commercial. We don't sell products, we don't take affiliate revenue, and we don't share your email. If this ever stops being useful, unsubscribe at the bottom of any issue — no questions asked.
        </td></tr>
        <tr><td style="font-size:12px;color:#A8B0BB;padding-top:24px;">
          Water Awareness Foundation · An independent educational foundation · wateraware.org
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function welcomeText(zip?: string) {
  return `Welcome to the Water Awareness Foundation.

You'll receive one calm, sourced email every Sunday — new contaminants explained, policy updates, regional alerts.${zip ? `\n\nWe'll tailor regional alerts to ZIP code ${zip}.` : ""}

Check your tap water: https://wateraware.org/report

The foundation is non-commercial. We don't sell products, we don't take affiliate revenue, and we don't share your email. Unsubscribe anytime — link is at the bottom of every email.

— Water Awareness Foundation`;
}
