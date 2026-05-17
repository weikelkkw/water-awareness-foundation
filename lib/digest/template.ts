/**
 * HTML + plain-text renderer for the Sunday digest.
 *
 * Matches the foundation's brand: brass top bar, Fraunces serif
 * headings, ocean blue, restrained palette. Designed to render in
 * Gmail / Apple Mail / Outlook without breaking.
 */

import type { DigestPayload } from "./build";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://waterawarenessfoundation.com";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface RenderOpts {
  unsubscribeToken: string;
  recipientEmail: string;
}

export function digestSubject(p: DigestPayload): string {
  if (p.override?.title) return p.override.title;
  if (p.lead?.title) return p.lead.title;
  return `The Sunday digest · Issue ${String(p.issueNumber).padStart(3, "0")}`;
}

export function digestHtml(p: DigestPayload, opts: RenderOpts): string {
  const unsubscribeUrl = `${BASE}/api/unsubscribe?token=${encodeURIComponent(opts.unsubscribeToken)}`;
  const utm = `?utm_source=newsletter&utm_medium=email&utm_campaign=${p.issueKey}`;

  const overrideBody = p.override
    ? `
      <tr><td style="padding:0 36px 24px 36px;font-size:16px;line-height:1.7;color:#1A1A2E;">
        ${markdownishToHtml(p.override.body, utm)}
      </td></tr>`
    : "";

  const slotHtml = (slot: typeof p.lead) =>
    slot
      ? `
      <tr><td style="padding:0 36px 8px 36px;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A88947;font-weight:700;margin-bottom:6px;">${escape(slot.eyebrow)}</div>
        <a href="${slot.href}${utm}" style="text-decoration:none;color:#0B3D5C;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;color:#0B3D5C;margin-bottom:6px;">${escape(slot.title)}</div>
        </a>
        <div style="font-size:15px;line-height:1.55;color:#1A1A2E;">${escape(slot.blurb)}</div>
        <div style="margin-top:10px;">
          <a href="${slot.href}${utm}" style="display:inline-block;font-size:13px;color:#1F6E94;text-decoration:none;border-bottom:1px solid #1F6E94;padding-bottom:1px;">Read →</a>
        </div>
      </td></tr>
      <tr><td style="padding:24px 36px;"><div style="height:1px;background:#E5E8EC;"></div></td></tr>`
      : "";

  const factHtml = p.factOfTheWeek
    ? `
      <tr><td style="padding:0 36px 24px 36px;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A88947;font-weight:700;margin-bottom:8px;">Fact of the week</div>
        <div style="background:#F0F6FB;border-left:3px solid #C9A663;padding:18px 22px;border-radius:0 8px 8px 0;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#0B3D5C;">${escape(p.factOfTheWeek.fact)}</div>
          <div style="margin-top:10px;font-size:12px;color:#5C6470;">Source: <a href="${p.factOfTheWeek.sourceUrl}" style="color:#1F6E94;text-decoration:underline;">${escape(p.factOfTheWeek.sourceTitle)}</a></div>
        </div>
      </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${escape(digestSubject(p))}</title></head>
<body style="margin:0;padding:0;background:#FAFBFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1A1A2E;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FAFBFC;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width:640px;background:#ffffff;border-radius:16px;border:1px solid #E5E8EC;overflow:hidden;">

        <!-- Brass top bar -->
        <tr><td style="background:linear-gradient(90deg, rgba(201,166,99,0) 0%, #C9A663 50%, rgba(201,166,99,0) 100%);height:4px;"></td></tr>

        <!-- Issue header -->
        <tr><td style="padding:36px 36px 12px 36px;">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A88947;font-weight:700;margin-bottom:8px;">The Sunday Digest · Issue ${String(p.issueNumber).padStart(3, "0")}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:#0B3D5C;">${escape(p.override?.title ?? "What changed in U.S. drinking water this week.")}</div>
        </td></tr>
        <tr><td style="padding:0 36px 24px 36px;"><div style="height:1px;background:#E5E8EC;"></div></td></tr>

        ${overrideBody}
        ${slotHtml(p.lead)}
        ${slotHtml(p.deepRead)}
        ${slotHtml(p.contaminantOfTheWeek)}
        ${factHtml}

        <!-- Primary CTA -->
        <tr><td style="padding:8px 36px 32px 36px;text-align:center;">
          <a href="${BASE}/report${utm}" style="display:inline-block;padding:14px 28px;background:#0B3D5C;color:#fff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:500;">Check your tap water →</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 36px 32px 36px;font-size:13px;color:#5C6470;border-top:1px solid #E5E8EC;line-height:1.6;">
          You're getting this because you signed up at waterawarenessfoundation.com. We're an independent, non-commercial foundation — no advertising, no affiliate revenue, no filter sales.
          <br /><br />
          <a href="${unsubscribeUrl}" style="color:#5C6470;text-decoration:underline;">Unsubscribe in one click</a> · <a href="${BASE}${utm}" style="color:#5C6470;text-decoration:underline;">waterawarenessfoundation.com</a>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#A8B0BB;margin-top:16px;">Water Awareness Foundation · Sunday Digest ${p.issueKey}</div>
    </td></tr>
  </table>
</body></html>`;
}

export function digestText(p: DigestPayload, opts: RenderOpts): string {
  const unsubscribeUrl = `${BASE}/api/unsubscribe?token=${encodeURIComponent(opts.unsubscribeToken)}`;
  const lines: string[] = [];
  lines.push(
    `THE SUNDAY DIGEST · Issue ${String(p.issueNumber).padStart(3, "0")} · ${p.issueKey}`
  );
  lines.push("");
  if (p.override) {
    if (p.override.title) lines.push(p.override.title);
    lines.push("");
    lines.push(p.override.body);
  } else {
    if (p.lead) {
      lines.push(`LEAD — ${p.lead.title}`);
      lines.push(p.lead.blurb);
      lines.push(p.lead.href);
      lines.push("");
    }
    if (p.deepRead) {
      lines.push(`DEEP READ — ${p.deepRead.title}`);
      lines.push(p.deepRead.blurb);
      lines.push(p.deepRead.href);
      lines.push("");
    }
    if (p.contaminantOfTheWeek) {
      lines.push(`CONTAMINANT OF THE WEEK — ${p.contaminantOfTheWeek.title}`);
      lines.push(p.contaminantOfTheWeek.blurb);
      lines.push(p.contaminantOfTheWeek.href);
      lines.push("");
    }
    if (p.factOfTheWeek) {
      lines.push(`FACT — ${p.factOfTheWeek.fact}`);
      lines.push(`(${p.factOfTheWeek.sourceTitle}: ${p.factOfTheWeek.sourceUrl})`);
      lines.push("");
    }
  }
  lines.push("Check your tap water: " + BASE + "/report");
  lines.push("");
  lines.push("---");
  lines.push("Unsubscribe in one click: " + unsubscribeUrl);
  lines.push("Water Awareness Foundation · waterawarenessfoundation.com");
  return lines.join("\n");
}

/** Minimal markdown for override bodies: paragraphs + links + bold. */
function markdownishToHtml(md: string, utm: string): string {
  const blocks = md
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // H2
      if (trimmed.startsWith("## ")) {
        return `<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#0B3D5C;margin:24px 0 10px 0;">${escape(trimmed.slice(3))}</h2>`;
      }
      // Bullet list
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .map((l) => l.replace(/^- /, ""))
          .map((l) => `<li style="margin-bottom:6px;">${inline(l, utm)}</li>`)
          .join("");
        return `<ul style="padding-left:20px;margin:12px 0;">${items}</ul>`;
      }
      // Paragraph
      return `<p style="margin:14px 0;">${inline(trimmed, utm)}</p>`;
    })
    .join("");
  return blocks;
}

function inline(s: string, utm: string): string {
  // Bold **text**
  let out = escape(s).replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0B3D5C;">$1</strong>');
  // Links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
    const fullUrl = url.startsWith("http") ? `${url}${url.includes("?") ? "&" : "?"}${utm.slice(1)}` : url;
    return `<a href="${fullUrl}" style="color:#1F6E94;text-decoration:underline;">${text}</a>`;
  });
  return out;
}
