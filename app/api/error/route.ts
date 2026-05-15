import { NextResponse } from "next/server";

/**
 * Error beacon receiver. The global error boundary `sendBeacon`s here
 * with minimal context. In production this would forward to Sentry/your
 * APM of choice; for now we just log.
 */
export async function POST(req: Request) {
  try {
    const body = await req.text();
    console.error("[client-error]", body);
  } catch {
    /* swallow */
  }
  return NextResponse.json({ ok: true });
}
