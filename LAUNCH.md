# Launch Checklist

End-to-end pre-publish punch list. Owned by you, the founder. Each item
has a status; check them off as you go.

---

## TIER 0 — HARD BLOCKERS (cannot publish without)

- [ ] **EWG data path resolved.** Either (a) signed partnership / license,
      (b) replaced with another sourced provider (SimpleLab, EPA-only), or
      (c) explicit attorney-greenlit decision to continue scraping in the
      educational fair-use envelope. See `scripts/ewg-partnership-email.md`
      for the outreach template.
- [ ] **Domain `wateraware.org` registered.** Configure DNS to point at
      Vercel.
- [ ] **Inboxes provisioned:**
  - [ ] `hello@wateraware.org`
  - [ ] `press@wateraware.org`
  - [ ] `corrections@wateraware.org`
  - [ ] `privacy@wateraware.org`
  - [ ] `legal@wateraware.org`
  - [ ] `transparency@wateraware.org`
  - [ ] `newsletter@wateraware.org` (DKIM/SPF for Resend send)
- [ ] **Real reviewer attribution.** Either commission a real Environmental
      Health PhD/MPH/MD reviewer and update `lib/authors.ts`, or keep the
      "Foundation Review Board" framing and clearly explain on `/authors`.
- [ ] **Attorney review** of representative report (e.g., NYC, Colorado
      Springs) for litigation exposure — particularly the EWG-flagged
      contaminant claims tied to named utilities.

## TIER 1 — INFRASTRUCTURE

- [ ] **Supabase project created.** Run `lib/db/schema.sql` in the SQL
      editor. Add the three Supabase env vars to Vercel.
- [ ] **Resend account + verified sending domain.** Add `RESEND_API_KEY`
      and `RESEND_FROM_NEWSLETTER` to Vercel.
- [ ] **Plausible account** (optional but recommended). Add domain to
      `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel.
- [ ] **Sentry project** (optional). Add DSN to `NEXT_PUBLIC_SENTRY_DSN`.
- [ ] **Vercel deployment.** Connect GitHub repo, set env vars, deploy.
- [ ] **Custom domain attached** in Vercel project settings.
- [ ] **Test the full flow:** ZIP lookup → report renders → newsletter
      signup → welcome email arrives → in Supabase row appears.

## TIER 2 — CONTENT

- [ ] Replace the single Unsplash homepage hero photo with licensed
      original imagery, OR commit to a more-distinct atmospheric SVG
      (currently using `/components/water/HeroAtmosphere.tsx`, which is
      already brand-distinct).
- [ ] Write 5+ additional pillar articles to broaden topical coverage:
      arsenic, microplastics, water-and-skin, water-and-microbiome,
      bottled-vs-tap.
- [ ] Establish a news-piece publishing cadence (monthly at minimum;
      target weekly).
- [ ] Write the first "transparency report" actual entry on
      `/transparency` once you receive any donations, grants, or
      operational funding.
- [ ] Generate at least 3 sample newsletters and queue them in Resend.

## TIER 3 — PERFORMANCE & ACCESSIBILITY

- [ ] Run a **production Lighthouse audit** on the deployed site.
      Target ≥ 95 on all four scores. Address any < 90 issues before
      announcing.
- [ ] **Mobile QA pass** at 375px through every key flow:
  - [ ] Homepage hero ZIP entry
  - [ ] Report page (with EWG findings)
  - [ ] Article reader
  - [ ] Contaminant deep-dive
  - [ ] Filter pills on `/explore`
- [ ] **Screen reader pass** with VoiceOver:
  - [ ] Skip-link works (added in `app/layout.tsx`)
  - [ ] Headings are hierarchical
  - [ ] All `<img>` have alt text (mostly Unsplash decorative — verify)
  - [ ] Form inputs have visible labels
  - [ ] Color contrast on amber/red flagged cards meets WCAG AA
- [ ] **Cross-browser test:** Safari (mobile + desktop), Chrome, Firefox.
- [ ] **prefers-reduced-motion** respected on hero animations (already
      coded — verify in browser).

## TIER 4 — LAUNCH OPS

- [ ] **Submit `sitemap.xml`** to Google Search Console (URL:
      `https://wateraware.org/sitemap.xml`).
- [ ] **Verify ownership** of the domain in Search Console + Bing
      Webmaster Tools.
- [ ] **Press list compiled.** Target outlets: NYT Climate, Grist,
      ProPublica, Inside Climate News, Civil Eats, The Guardian US env
      desk, Mother Jones, local-paper environment reporters in
      water-impacted regions (Newark, Flint, Jackson MS, Phoenix).
- [ ] **Soft-launch beta:** share the deployed URL with 10–20 informed
      friends (env scientists, journalists, parents in lead-pipe
      neighborhoods). Collect criticism for one week before broad
      release.
- [ ] **Public launch announcement:**
  - [ ] Twitter/X thread
  - [ ] LinkedIn
  - [ ] Email to press list
  - [ ] HackerNews submission (front page possible)
  - [ ] Reddit: r/EnvironmentalScience, r/SeriousConversation, r/news
- [ ] **Open the Supabase realtime stream** to confirm signup volume
      stays sane. Increase Resend rate limit if needed.
- [ ] **Day-one backup**: snapshot the production database before any
      bulk email send.

---

## After-launch operating cadence

- **Weekly:** Sunday newsletter goes out via Resend (composed in advance,
  scheduled in the Resend dashboard).
- **Monthly:** at least one new pillar article and one news editorial
  piece published.
- **Quarterly:** transparency-report entry update.
- **Annually:** full transparency report and methodology re-audit.

---

## On the EWG question (re-reading what you actually built)

The current implementation in `lib/ewg/scrape.ts` carries an explicit
ToS warning and a kill switch (`WAF_DISABLE_EWG=1`). Until Tier 0 item 1
is resolved, set `WAF_DISABLE_EWG=1` in Vercel and serve report pages
from the EPA-only fallback (which still resolves utility metadata for
PWSIDs that EPA covers). When the EWG path is resolved, remove the env
flag.

That's the cleanest legal posture for the public launch window.
