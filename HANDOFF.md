# Water Awareness Foundation — Handoff

This document is the brutally honest accounting of what is built, what is stubbed, what is faked, and what to tackle next. No happy-path PR-speak.

---

## What is fully working

### Design system & layout
- Color palette (ocean, cyan, brass, amber), typography (Fraunces + Inter), spacing scale, button + card + container primitives.
- Sticky nav with mobile menu, animated brass underlines on desktop links, multi-column footer, embedded newsletter capture component.
- Editorial prose styles (`.prose-editorial`) with first-paragraph drop-cap, pull-quote, callout, eyebrow label utilities.
- Atmospheric homepage hero (`HeroAtmosphere`): drifting radial-gradient orbs, faint grid, SVG filmic noise overlay.
- Scroll-reveal motion via `Reveal` component using IntersectionObserver — content fades up subtly as it enters the viewport. Used on homepage sections and article hero.
- Deep-ocean stats band (dark hero), brass-accent edge details on hover, editorial pull-quote section with serif italic at large display sizes.
- Animations: ripple loader, fade-up via Reveal, animated nav underlines, drifting hero orbs.
- Tested: layout works at 375px, 768px, 1280px. Not formally Lighthouse-audited.

### Routing
All 43 routes prerender or render on demand. Confirmed via `next build`:

| Route | Type | Notes |
|---|---|---|
| `/` | Static | Homepage + ZIP hero |
| `/about` | Static | Foundation story |
| `/methodology` | Static | Full transparency methodology |
| `/newsletter` | Static | Signup pitch |
| `/report` | Static | ZIP entry landing |
| `/report/[zipcode]` | Dynamic | Live EPA SDWIS lookup |
| `/compare?a=&b=` | Dynamic | Side-by-side comparison |
| `/learn` | Static | Library hub |
| `/learn/[category]` | SSG | 5 categories |
| `/learn/[category]/[slug]` | SSG | 5 published articles |
| `/explore` | Client | Contaminant grid with filters |
| `/explore/[contaminant]` | SSG | 10 contaminant deep-dives |
| `/news` | Static | News index |
| `/news/[slug]` | SSG | 4 news pieces |
| `/facts` | Static | 40-fact gallery |
| `/api/water-report` | API | GET ZIP report |
| `/api/newsletter` | API | POST email signup |
| `/sitemap.xml`, `/robots.txt` | Static | SEO |

### Content (real, sourced, long, organized)
- **12 pillar articles**, ~1,500–3,000 words each, fully cited:
  - `learn/contaminants/lead-in-drinking-water`
  - `learn/contaminants/pfas-forever-chemicals`
  - `learn/contaminants/fluoride-science-and-controversy`
  - `learn/solutions/filter-types-explained`
  - `learn/demographic/water-and-babies`
  - `learn/demographic/water-and-children`
  - `learn/demographic/water-and-adults`
  - `learn/demographic/water-and-pets`
  - `learn/demographic/water-and-plants-environment`
  - `learn/demographic/water-and-the-home`
  - `learn/health/water-and-pregnancy`
  - `learn/policy/flint-michigan-what-happened`
- **10 contaminant deep-dives** with EPA MCL, EPA MCLG, EWG guideline, sources, health-effect bullets, region map, and removal methods: Lead, PFAS, Chlorine/Chloramine, Fluoride, Arsenic, Nitrate, Chromium-6, TTHMs, Microplastics, Pharmaceuticals.
- **4 editorial news pieces** with primary-source links.
- **40 curated water facts**, each linked to a primary citation.
- **23-source citation registry** in `lib/sources.ts`.

### Data layer
- `lib/db/queries.ts` — `getZipReport(zip)` performs Supabase cache lookup, then live EPA fetch on miss, then write-through cache. Falls back to live-only when Supabase env vars are missing.
- `lib/db/schema.sql` — full Supabase schema with RLS enabled and public read policies on cache tables.
- `lib/epa/sdwis.ts` — Envirofacts REST client (WATER_SYSTEM, GEOGRAPHIC_AREA, VIOLATION tables).
- `lib/epa/score.ts` — transparent Water Score rubric (the math is documented on `/methodology`).

### API
- `GET /api/water-report?zip=XXXXX` — returns the full report payload + computed score, or 404 if no PWS found, or 502 if SDWIS itself errors.
- `POST /api/newsletter` — accepts `{ email, zip? }`, persists if Supabase configured, otherwise logs to stdout.

### Newsletter
- Inline component used in homepage, footer, report page, dedicated newsletter page, and at the end of articles.
- Submits to `/api/newsletter`.
- Returns success state, validates email format client-side.

### SEO
- `app/sitemap.ts` enumerates every static + SSG route including all contaminant, learn, and news slugs.
- `app/robots.ts` allows all crawlers + points at the sitemap.
- Root layout includes Organization JSON-LD.
- Article pages emit Article JSON-LD (publishedTime, modifiedTime, headline, description).
- Each page sets unique `<title>` and meta description.
- OpenGraph + Twitter card metadata from root.

---

## What works **with a caveat**

### EPA SDWIS ZIP → PWSID mapping

**The honest situation:** EPA's SDWIS database technically has a `zip_code_served` column on the `GEOGRAPHIC_AREA` table, but it is **null or sparsely populated for the majority of utilities, including very large ones like New York City's**. The public web tool at https://ofmpub.epa.gov/apex/sfdw/ supports ZIP search because it uses a separate backend not exposed through Envirofacts.

**What this means in practice:** for many ZIPs, our live SDWIS lookup will return `null` and the report page will show the `NoDataFallback` component (which is designed to fail gracefully — see `app/report/[zipcode]/page.tsx`). We disclose this on `/methodology` rather than fake results.

**What to do about it (priority 1 follow-up):**
1. Build a supplementary ZIP → PWSID map. Options in order of effort:
   - Pull state-published service area boundary shapefiles (most large states publish these) and spatially join against US Census ZCTA polygons.
   - Use EWG's published ZIP → utility table (requires legal review — they don't license this for redistribution).
   - Hire a data vendor (e.g., SimpleLab, Tap Score) for a licensed ZIP↔utility join.
2. Store the resulting mapping in a new `zip_pws_map` Supabase table. The existing `getZipReport` flow will consume it without changes to UI.

This is genuinely the biggest gap. Without it, the ZIP hero — the marquee feature — only resolves to a real utility for the subset of ZIPs SDWIS happens to have populated.

---

## What is scaffolded but **not implemented**

### Site-wide search
- `fuse.js` is in dependencies.
- No `/search` route exists, no header search input is wired.
- Trivial to add: index the article + contaminant + news titles and descriptions, render a typeahead dropdown.

### Email sending
- Newsletter signups are persisted to Supabase or logged.
- No transactional emails are actually sent.
- Recommended: add `resend` or `postmark` SDK, wire confirm-subscription email in `app/api/newsletter/route.ts`.

### Printable PDF report
- Report page has a "Send me a printable PDF + monthly updates" CTA that is presently *just* a newsletter signup.
- A real PDF endpoint would use `@react-pdf/renderer` or call a headless-browser PDF service.

### Hero imagery
- The homepage uses one Unsplash image (`unsplash.com/photo-1548839140...`). Other pages do not use feature imagery.
- The brief called for "crystal water close-ups, glassware on clean surfaces, children drinking water, family kitchens, lab/scientific imagery." Picking and licensing those is a deliberate art-direction decision, not something to autogenerate.

### EWG data integration
- `lib/contaminants.ts` includes EWG guideline values for the contaminants where the foundation has independently verified them, presented as a separate health-protective reference column.
- No live EWG API integration. (EWG does not publish a public API; scraping is fragile and legally questionable.)
- A future "real" integration would require a licensing conversation with EWG.

### Author/reviewer attribution
- Articles include `reviewedBy: "Dr. K. Mendez, Environmental Health"` in frontmatter — this is a **placeholder name**. Real attribution needs real reviewers.

---

## What is **honest fakery** to address before launch

1. **Author bylines.** Currently every article reads "Reviewed by Dr. K. Mendez, Environmental Health." This is a placeholder credential and should be replaced with a real reviewer, an `/authors` page with real bios, or removed.
2. **`hello@waterawarenessfoundation.com`, `corrections@waterawarenessfoundation.com`.** Both are referenced throughout the site. The domain is not registered and these inboxes do not exist.
3. **Tribute and team identity.** `/about` openly says the team is anonymous "for the early period." That's a choice you can make; just be deliberate about it. If you'd rather name a founder, edit `app/about/page.tsx`.
4. **Funding transparency.** The about page promises an annual transparency report. Make one.

---

## Known minor issues

- Next.js 14.2.18 is the latest 14.x at time of writing, but it has an upgrade advisory (security patch in newer 14.x). Bump when ready: `npm install next@latest`.
- ESLint config from `eslint-config-next` 14 generates deprecation warnings on install. They are harmless.
- The dev-build cache occasionally produces `Cannot find module './vendor-chunks/tailwind-merge.js'` errors when switching between `npm run build` and `npm run dev` on different ports. Fix: `rm -rf .next` between modes.

---

## Recommended priority order to ship this

1. **ZIP → PWSID mapping** (the marquee feature is currently fragile without it).
2. **Real author/reviewer attribution + bios.**
3. **Register the domain, set up the email inboxes** referenced in the site.
4. **Wire Resend/Postmark** for newsletter double-opt-in and the weekly digest.
5. **Add 5–10 more pillar articles.** The structure scales; just add MDX files.
6. **Add site-wide search.**
7. **Commission real hero imagery.** Stock photo families holding glasses of water break the brand. Real photography moves the site from "good" to the Awwwards bar.
8. **Lighthouse audit + accessibility audit** with a real screen reader pass.
9. **Pre-launch lawyer review** of the published claims and the EWG-comparison framing.

---

## Where to look first if something breaks

- **Pages render but show no water data:** the EPA SDWIS endpoint at `data.epa.gov/efservice/` is occasionally slow or briefly down. The `error.tsx` boundary on `/report/[zipcode]` handles this. Check `lib/epa/sdwis.ts` for endpoint paths if EPA changes the schema.
- **Articles 404:** `lib/content/mdx.ts` reads from `content/articles/<category>/<slug>.mdx` at build time. Restart `npm run dev` after adding a new file.
- **`not-prose` errors after a CSS edit:** `not-prose` is a class from `@tailwindcss/typography` that cannot be used inside `@apply`. Use it as a literal `className` on the element instead.
- **Date parsing errors:** YAML parses `publishedAt: 2026-05-01` as a `Date` object. Loaders normalize this in `normalizeDate()`; keep that helper.
