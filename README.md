# Water Awareness Foundation

An independent foundation website publishing clear, science-backed information about U.S. tap water.

## What you get

- **Per-ZIP water reports** wired directly to EPA's SDWIS API (with caveats — see HANDOFF.md).
- **Contaminant explorer** — 10 fully fleshed-out contaminant deep-dives with EPA limits, EWG guidelines, sources, health effects, and filtration guidance.
- **Education library** — 12 long-form pillar articles spanning contaminants (Lead, PFAS, Fluoride), solutions (filter types), demographic impact (babies, children, adults, pets, plants, the home), health (pregnancy), and policy (Flint retrospective). Each written long, organized, and brutally honest.
- **News editorial** — 4 published pieces on the 2024 PFAS rule, the 2024 Lead and Copper Rule Improvements, the 2024 NTP fluoride monograph, and Maine's biosolids ban.
- **Facts gallery** — 40 curated, fully-cited water facts.
- **Compare tool** — side-by-side ZIP comparison.
- **About / Methodology / Newsletter** marketing pages.
- **API routes** for water reports and newsletter signups.
- **Sitemap, robots, JSON-LD** SEO.
- **Premium UI:** atmospheric animated hero with drifting gradient orbs and filmic noise, scroll-reveal motion on content, deep-ocean dark stats band, brass accent details, editorial drop-cap on articles, animated nav underlines.

---

## Stack

- **Next.js 14** App Router, TypeScript, Tailwind CSS
- **MDX** for articles + news (via `next-mdx-remote`)
- **Supabase** for cached water data + newsletter signups (optional — app works without it)
- **EPA SDWIS Federal Reports** via `https://data.epa.gov/efservice/` for the live water data
- **lucide-react** for icons, **Fraunces + Inter** font pairing

---

## Setup

```bash
git clone <this repo>
cd water-awareness-foundation
npm install
cp .env.example .env.local      # optional — see below
npm run dev                     # http://localhost:3000
```

### Environment variables

All optional. The app runs without any of them; you just lose the cache layer and newsletter persistence.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Used in sitemap, OG tags, and JSON-LD. Defaults to `https://waterawarenessfoundation.com`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for cache + newsletter. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only). |

To enable Supabase caching:

1. Create a project at https://app.supabase.com.
2. Run `lib/db/schema.sql` in the Supabase SQL editor.
3. Fill in the three Supabase env vars.

---

## Architecture map

```
/app
  /(marketing)          → page.tsx (home), about, methodology, newsletter
  /report               → ZIP landing + /report/[zipcode]/page.tsx
  /compare              → side-by-side comparison tool
  /learn                → /learn, /learn/[category], /learn/[category]/[slug]
  /explore              → /explore + /explore/[contaminant]
  /news                 → /news + /news/[slug]
  /facts                → curated facts gallery
  /api
    /water-report       → GET ?zip=XXXXX
    /newsletter         → POST { email, zip? }
  layout.tsx            → root layout with fonts + JSON-LD + nav/footer
  sitemap.ts, robots.ts → SEO

/components
  /ui                   → Container, Button, Card, Eyebrow
  /water                → SiteNav, SiteFooter, ZipCodeHero, ScoreVisualization,
                          ContaminantCard, FactRotator, NewsletterCapture, MdxComponents

/content
  /articles/<category>/*.mdx
  /news/*.mdx

/lib
  /db
    supabase.ts         → typed clients, gracefully nil if env missing
    queries.ts          → getZipReport(zip) write-through cache, saveNewsletterSignup
    schema.sql          → run in Supabase to enable caching
  /epa
    sdwis.ts            → EPA Envirofacts REST client
    score.ts            → Water Score rubric (transparent — see /methodology)
  /content
    mdx.ts              → MDX article loader, TOC extractor
    news.ts             → MDX news loader
  contaminants.ts       → 10 canonical contaminant records (Lead, PFAS, Chlorine, Fluoride,
                          Arsenic, Nitrate, Chromium-6, TTHMs, Microplastics, Pharmaceuticals)
  facts.ts              → 40 curated facts, each citing a source
  sources.ts            → central citation registry
  utils.ts              → cn, isValidZip, formatDate, slugify, readingTime
```

---

## Scripts

- `npm run dev` — local dev server on port 3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint via `next lint`

---

## Honest status: what is and isn't done

See **HANDOFF.md** for the full punch list. The TL;DR:

- **Working end-to-end:** every page route, navigation, design system, contaminant explorer + 10 deep-dives, library + 5 pillar articles, news + 4 pieces, facts + 40 entries, comparison tool, about/methodology/newsletter pages, newsletter API (logs without Supabase, persists with), sitemap/robots/SEO.
- **Working with caveat:** EPA SDWIS API is correctly wired and live; EPA itself just doesn't expose a reliable ZIP-to-utility mapping through Envirofacts. The fallback "no data" page renders cleanly when that happens. Real production needs a supplementary ZIP→PWSID dataset (see HANDOFF.md).
- **Scaffolded, not implemented:** site-wide search (FlexSearch/Fuse.js dependency installed but no UI wired), email service integration (newsletter saves to Supabase but doesn't actually send confirmation email — wire to Resend/Postmark when needed), PDF report generation (button copy exists, route does not).

---

## Editorial policy

Every numeric claim, regulatory limit, and health effect on the site traces to a primary source in `lib/sources.ts`. New claims require new citations. "Studies show" is not a citation.

Corrections go to `corrections@waterawarenessfoundation.com` and are logged at `/methodology#corrections`.

---

## License

Editorial use of the published content is encouraged with attribution. Code is MIT.
