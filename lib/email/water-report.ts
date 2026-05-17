/**
 * "Your water report" transactional email.
 *
 * Sent immediately after a visitor enters their email + ZIP on the
 * /free-water-report landing page. Contains the utility name,
 * top-line stats, top 3 flagged contaminants, and a deep link to
 * the full report.
 */

import { resend, FROM_NEWSLETTER, type SendResult } from "./resend";
import { getZipReport } from "@/lib/db/queries";

interface SendReportOpts {
  to: string;
  zip: string;
  source?: string; // utm_source, etc.
}

export async function sendWaterReportEmail({
  to,
  zip,
  source,
}: SendReportOpts): Promise<SendResult & { hadData?: boolean }> {
  const report = await getZipReport(zip).catch(() => null);
  const hadData = !!report?.ewg;

  if (!resend) {
    console.log(
      `[email:water-report SKIPPED] to=${to} zip=${zip} hadData=${hadData}`
    );
    return { ok: true, skipped: true, hadData };
  }

  const subject = report?.primary?.name
    ? `Your water report for ${report.primary.name} (ZIP ${zip})`
    : `Your water report for ZIP ${zip}`;

  try {
    const result = await resend.emails.send({
      from: FROM_NEWSLETTER,
      to,
      subject,
      html: reportHtml(zip, report, source),
      text: reportText(zip, report),
    });
    if (result.error) {
      return { ok: false, error: result.error.message, hadData };
    }
    return { ok: true, id: result.data?.id, hadData };
  } catch (err) {
    return { ok: false, error: (err as Error).message, hadData };
  }
}

function reportHtml(
  zip: string,
  report: Awaited<ReturnType<typeof getZipReport>> | null,
  source?: string
): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://waterawarenessfoundation.com";
  const reportUrl = `${baseUrl}/report/${zip}${source ? `?utm_source=${encodeURIComponent(source)}&utm_medium=email&utm_campaign=report` : ""}`;
  const fileUrl = `${baseUrl}/your-water-file${source ? `?utm_source=${encodeURIComponent(source)}&utm_medium=email` : ""}`;

  const utilityName =
    report?.primary?.name ?? "the utility serving your area";
  const cityState = report?.primary?.state
    ? `${report.primary.citiesServed?.[0] ?? ""}${
        report.primary.citiesServed?.[0] ? ", " : ""
      }${report.primary.state}`
    : "";
  const pop = report?.primary?.populationServed?.toLocaleString();

  const ewg = report?.ewg;
  const flagged = ewg?.flagged ?? [];
  const totalDetected = ewg?.contaminants?.length ?? 0;
  const top3 = flagged
    .slice()
    .sort(
      (a, b) =>
        (b.timesAboveGuideline ?? 0) - (a.timesAboveGuideline ?? 0)
    )
    .slice(0, 3);
  const worst = Math.max(0, ...flagged.map((c) => c.timesAboveGuideline ?? 0));

  const headlineColor =
    flagged.length >= 5 || worst >= 100
      ? "#DC2626" // red
      : flagged.length >= 2 || worst >= 10
      ? "#F59E0B" // amber
      : flagged.length > 0
      ? "#F59E0B"
      : "#06B6D4"; // cyan-ok

  const headlineNumber = flagged.length;
  const headlineLabel =
    flagged.length === 0
      ? "No contaminants above EWG guideline"
      : `${flagged.length} contaminant${flagged.length === 1 ? "" : "s"} above EWG guideline`;

  // Top-3 contaminant rows
  const topRows = top3
    .map(
      (c) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #E5E8EC;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#0B3D5C;">${escape(
            c.name
          )}</div>
          ${
            c.timesAboveGuideline
              ? `<div style="font-size:13px;color:#DC2626;font-weight:500;margin-top:2px;">${c.timesAboveGuideline}× above EWG's health-protective guideline</div>`
              : `<div style="font-size:13px;color:#5C6470;margin-top:2px;">Detected above EWG guideline</div>`
          }
        </td>
      </tr>`
    )
    .join("");

  const noDataBlock = report
    ? ""
    : `
      <tr><td style="padding:16px 0;background:#FFF7E6;border:1px solid #FCE7BD;border-radius:12px;text-align:left;padding:16px 20px;">
        <div style="font-size:13px;color:#92400E;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">Heads up</div>
        <div style="font-size:14px;color:#1A1A2E;line-height:1.55;">We didn't find a utility for ZIP ${escape(
          zip
        )} in our cache yet. The link below will still open your live report — and we'll notify you when this area is indexed.</div>
      </td></tr>
      <tr><td style="height:16px;"></td></tr>`;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Your water report</title></head>
<body style="margin:0;padding:0;background:#FAFBFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1A1A2E;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FAFBFC;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;border:1px solid #E5E8EC;overflow:hidden;">

        <!-- Brand bar -->
        <tr><td style="background:linear-gradient(90deg, rgba(201,166,99,0) 0%, #C9A663 50%, rgba(201,166,99,0) 100%);height:4px;"></td></tr>

        <!-- Header -->
        <tr><td style="padding:36px 36px 8px 36px;">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A88947;font-weight:700;margin-bottom:8px;">Water Awareness Foundation</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:#0B3D5C;margin-bottom:4px;">Your water report</div>
          <div style="font-size:14px;color:#5C6470;">ZIP ${escape(
            zip
          )}${cityState ? ` · ${escape(cityState)}` : ""}</div>
        </td></tr>

        <!-- Utility headline -->
        ${
          report
            ? `<tr><td style="padding:24px 36px 0 36px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#0B3D5C;line-height:1.3;">${escape(
                  utilityName
                )}</div>
                ${
                  pop
                    ? `<div style="font-size:13px;color:#5C6470;margin-top:4px;">${pop} people served</div>`
                    : ""
                }
              </td></tr>`
            : ""
        }

        <!-- Headline number block -->
        ${
          ewg
            ? `<tr><td style="padding:24px 36px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#F8FAFC;border:1px solid #E5E8EC;border-radius:12px;padding:20px 24px;">
                  <tr>
                    <td>
                      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5C6470;font-weight:600;">Headline</div>
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:48px;line-height:1;color:${headlineColor};font-weight:300;margin:6px 0;">${headlineNumber}</div>
                      <div style="font-size:14px;color:#1A1A2E;">${escape(
                        headlineLabel
                      )}</div>
                      ${
                        worst > 0
                          ? `<div style="font-size:13px;color:#5C6470;margin-top:8px;">Worst-case: <strong style="color:${headlineColor};">${worst}×</strong> the EWG health-protective level. <strong>${totalDetected}</strong> contaminants total detected.</div>`
                          : `<div style="font-size:13px;color:#5C6470;margin-top:8px;"><strong>${totalDetected}</strong> contaminants detected.</div>`
                      }
                    </td>
                  </tr>
                </table>
              </td></tr>`
            : ""
        }

        ${noDataBlock}

        <!-- Top contaminants -->
        ${
          top3.length > 0
            ? `<tr><td style="padding:8px 36px 8px 36px;">
                <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A88947;font-weight:700;margin-bottom:8px;">Top priorities</div>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${topRows}</table>
              </td></tr>`
            : ""
        }

        <!-- Primary CTA -->
        <tr><td style="padding:28px 36px 8px 36px;">
          <a href="${reportUrl}" style="display:inline-block;padding:14px 28px;background:#0B3D5C;color:#fff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:500;">Open the full report →</a>
        </td></tr>

        <!-- Secondary CTA -->
        <tr><td style="padding:8px 36px 24px 36px;font-size:14px;color:#5C6470;line-height:1.6;">
          Want it personalized for your household (kids, pregnancy, pets, garden)? <a href="${fileUrl}" style="color:#1F6E94;text-decoration:underline;">Build your Water File →</a>
        </td></tr>

        <!-- Footnote -->
        <tr><td style="padding:24px 36px 32px 36px;font-size:13px;color:#5C6470;border-top:1px solid #E5E8EC;line-height:1.6;">
          Data from EWG's Tap Water Database, cross-referenced with EPA SDWIS. This is utility-reported data — not a lab test of your specific tap. For your kitchen tap, a $30 certified at-home test is the only definitive answer.
          <br /><br />
          We're an independent, non-commercial foundation. We don't sell filters. We don't share your email. <a href="${baseUrl}/newsletter" style="color:#1F6E94;text-decoration:underline;">Join the Sunday digest</a> if you want one calm email per week summarizing what changed in U.S. drinking water.
        </td></tr>
      </table>
      <div style="font-size:11px;color:#A8B0BB;margin-top:16px;">Water Awareness Foundation · waterawarenessfoundation.com</div>
    </td></tr>
  </table>
</body></html>`;
}

function reportText(
  zip: string,
  report: Awaited<ReturnType<typeof getZipReport>> | null
): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://waterawarenessfoundation.com";
  const ewg = report?.ewg;
  const flagged = ewg?.flagged ?? [];
  const total = ewg?.contaminants?.length ?? 0;
  const lines: string[] = [];
  lines.push(`Your water report for ZIP ${zip}`);
  if (report?.primary?.name) lines.push(`Utility: ${report.primary.name}`);
  if (report?.primary?.populationServed)
    lines.push(`${report.primary.populationServed.toLocaleString()} served`);
  lines.push("");
  if (ewg) {
    lines.push(
      `${flagged.length} contaminants above EWG's health-protective guideline (${total} total detected).`
    );
    if (flagged.length > 0) {
      lines.push("\nTop priorities:");
      for (const c of flagged.slice(0, 3)) {
        lines.push(
          `  - ${c.name}${
            c.timesAboveGuideline
              ? ` (${c.timesAboveGuideline}× guideline)`
              : ""
          }`
        );
      }
    }
  } else {
    lines.push(
      `We didn't find a utility for ZIP ${zip} in our cache yet — the link below will open your live report.`
    );
  }
  lines.push(`\nFull report: ${baseUrl}/report/${zip}`);
  lines.push(`Personalized Water File: ${baseUrl}/your-water-file`);
  lines.push(
    `\n— Water Awareness Foundation · An independent, non-commercial foundation. Reply if you have questions.`
  );
  return lines.join("\n");
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
