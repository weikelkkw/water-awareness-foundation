/**
 * Sends the assembled digest to all confirmed, non-unsubscribed
 * recipients. One Resend send per recipient (Resend handles the
 * rate limiting internally; we keep the loop sequential so a single
 * Vercel function invocation stays well under the 60s budget for
 * lists under ~1000).
 *
 * Logs each send to `digest_sends` for analytics + dedup.
 * Bumps `last_digest_sent_at` on the signup.
 */

import { resend, FROM_NEWSLETTER } from "@/lib/email/resend";
import { supabaseAdmin } from "@/lib/db/supabase";
import { buildDigest, type DigestPayload } from "./build";
import { digestHtml, digestSubject, digestText } from "./template";

export interface SendDigestOpts {
  /** Send only to a single explicit recipient (preview / test). */
  testTo?: string;
  /** Limit per-run (for safety during early testing). */
  maxRecipients?: number;
  /** Build for a specific date (preview future / past issue). */
  now?: Date;
}

export interface SendDigestResult {
  issueKey: string;
  totalRecipients: number;
  sent: number;
  failed: number;
  skippedAlreadySent: number;
  testMode: boolean;
  emailEnabled: boolean;
  supabaseEnabled: boolean;
  errors: { email: string; error: string }[];
}

interface Subscriber {
  id: string;
  email: string;
  unsubscribe_token: string | null;
  last_digest_sent_at: string | null;
}

async function loadRecipients(issueKey: string): Promise<Subscriber[]> {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("newsletter_signups")
    .select("id, email, unsubscribe_token, last_digest_sent_at")
    .is("unsubscribed_at", null)
    .eq("confirmed", true);
  if (error) {
    console.warn("[digest] failed to load recipients:", error.message);
    return [];
  }
  // De-dup: skip anyone already sent this issue
  if (!supabaseAdmin) return data ?? [];
  const { data: alreadySent } = await supabaseAdmin
    .from("digest_sends")
    .select("email")
    .eq("issue_key", issueKey)
    .eq("status", "sent");
  const sentSet = new Set((alreadySent ?? []).map((s) => s.email.toLowerCase()));
  return (data ?? []).filter(
    (s) => !sentSet.has(s.email.toLowerCase())
  );
}

async function logSend(
  issueKey: string,
  email: string,
  resendId: string | null,
  status: "sent" | "failed",
  error?: string
) {
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("digest_sends").insert({
    issue_key: issueKey,
    email,
    resend_id: resendId,
    status,
    error,
  });
}

async function bumpLastSent(signupId: string) {
  if (!supabaseAdmin) return;
  await supabaseAdmin
    .from("newsletter_signups")
    .update({ last_digest_sent_at: new Date().toISOString() })
    .eq("id", signupId);
}

export async function sendDigest(
  opts: SendDigestOpts = {}
): Promise<SendDigestResult> {
  const now = opts.now ?? new Date();
  const payload: DigestPayload = buildDigest(now);
  const issueKey = payload.issueKey;

  const result: SendDigestResult = {
    issueKey,
    totalRecipients: 0,
    sent: 0,
    failed: 0,
    skippedAlreadySent: 0,
    testMode: !!opts.testTo,
    emailEnabled: !!resend,
    supabaseEnabled: !!supabaseAdmin,
    errors: [],
  };

  // Build the recipient list
  let subscribers: Subscriber[];
  if (opts.testTo) {
    subscribers = [
      {
        id: "test",
        email: opts.testTo,
        unsubscribe_token: "test-token-not-real",
        last_digest_sent_at: null,
      },
    ];
  } else {
    subscribers = await loadRecipients(issueKey);
  }

  if (opts.maxRecipients && subscribers.length > opts.maxRecipients) {
    subscribers = subscribers.slice(0, opts.maxRecipients);
  }
  result.totalRecipients = subscribers.length;

  if (subscribers.length === 0) {
    return result;
  }

  const subject = digestSubject(payload);

  for (const sub of subscribers) {
    if (!resend) {
      console.log(
        `[digest:SKIP] would send "${subject}" to ${sub.email} (Resend not configured)`
      );
      continue;
    }
    const renderOpts = {
      unsubscribeToken: sub.unsubscribe_token ?? "",
      recipientEmail: sub.email,
    };
    try {
      const send = await resend.emails.send({
        from: FROM_NEWSLETTER,
        to: sub.email,
        subject,
        html: digestHtml(payload, renderOpts),
        text: digestText(payload, renderOpts),
        headers: sub.unsubscribe_token
          ? {
              "List-Unsubscribe": `<${process.env.NEXT_PUBLIC_SITE_URL ?? "https://waterawarenessfoundation.com"}/api/unsubscribe?token=${sub.unsubscribe_token}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            }
          : undefined,
      });
      if (send.error) {
        result.failed++;
        result.errors.push({ email: sub.email, error: send.error.message });
        await logSend(issueKey, sub.email, null, "failed", send.error.message);
      } else {
        result.sent++;
        await logSend(issueKey, sub.email, send.data?.id ?? null, "sent");
        if (!opts.testTo) await bumpLastSent(sub.id);
      }
    } catch (e) {
      result.failed++;
      result.errors.push({ email: sub.email, error: (e as Error).message });
      await logSend(issueKey, sub.email, null, "failed", (e as Error).message);
    }
  }

  return result;
}
