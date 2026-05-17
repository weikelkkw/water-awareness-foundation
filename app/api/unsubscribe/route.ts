/**
 * One-click unsubscribe endpoint.
 *
 * Supports both GET (footer link) and POST (RFC 8058 List-Unsubscribe=One-Click).
 * We flip `unsubscribed_at` on the signup matching the opaque token, then
 * redirect to `/unsubscribed` (GET) or return 200 (POST).
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";

export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://waterawarenessfoundation.com";

async function unsubscribe(token: string): Promise<{ ok: boolean; reason?: string }> {
  if (!token) return { ok: false, reason: "missing-token" };
  if (!supabaseAdmin) {
    console.log(`[unsubscribe SKIPPED] token=${token} (Supabase not configured)`);
    // Don't punish the user — we still want their click to feel resolved.
    return { ok: true };
  }
  const { data, error } = await supabaseAdmin
    .from("newsletter_signups")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .select("id");
  if (error) {
    console.warn("[unsubscribe] supabase error:", error.message);
    return { ok: false, reason: "db-error" };
  }
  if (!data || data.length === 0) return { ok: false, reason: "not-found" };
  return { ok: true };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const result = await unsubscribe(token);
  const target = new URL("/unsubscribed", SITE);
  if (!result.ok) target.searchParams.set("status", result.reason ?? "error");
  return NextResponse.redirect(target, { status: 302 });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  let token = url.searchParams.get("token") ?? "";
  if (!token) {
    try {
      const form = await req.formData();
      token = String(form.get("token") ?? "");
    } catch {
      // body wasn't form-data; ignore
    }
  }
  const result = await unsubscribe(token);
  return NextResponse.json({ ok: result.ok, reason: result.reason });
}
