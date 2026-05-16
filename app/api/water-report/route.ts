import { NextResponse } from "next/server";
import { z } from "zod";
import { getZipReport } from "@/lib/db/queries";
import { computeScore } from "@/lib/epa/score";

const Schema = z.object({
  zip: z.string().regex(/^\d{5}$/),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = Schema.safeParse({ zip: searchParams.get("zip") });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid ZIP code. Provide a 5-digit U.S. ZIP." },
      { status: 400 }
    );
  }
  try {
    const report = await getZipReport(parsed.data.zip);
    if (!report) {
      return NextResponse.json(
        { error: "No public water system found for that ZIP." },
        { status: 404 }
      );
    }
    const score = computeScore(report.primary, report.violations);
    return NextResponse.json({ ...report, score }, { status: 200 });
  } catch (err) {
    console.error("[water-report]", err);
    return NextResponse.json(
      { error: "Upstream data source failed. Try again shortly." },
      { status: 502 }
    );
  }
}
