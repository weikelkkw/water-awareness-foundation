/**
 * Vercel Cron endpoint — fires Sundays at 13:00 UTC (see vercel.json).
 *
 * Vercel cron requests arrive with a Bearer header set to CRON_SECRET.
 * We also accept a manual test invocation:
 *
 *   GET /api/cron/send-digest?to=admin@example.com&secret=...
 *
 * which sends a single preview message to that address (does not write
 * to the digest_sends log so it can be re-run).
 */

import { NextResponse } from "next/server";
import { sendDigest } from "@/lib/digest/send";

export const runtime = "nodejs";
export const maxDuration = 60;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // No secret configured — in dev this lets us hit the endpoint locally.
    return process.env.NODE_ENV !== "production";
  }
  const auth = req.headers.get("authorization") ?? "";
  if (auth === `Bearer ${secret}`) return true;
  const url = new URL(req.url);
  if (url.searchParams.get("secret") === secret) return true;
  return false;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const testTo = url.searchParams.get("to") ?? undefined;
  const maxRecipients = url.searchParams.get("max")
    ? Number(url.searchParams.get("max"))
    : undefined;

  const result = await sendDigest({ testTo, maxRecipients });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  return GET(req);
}
