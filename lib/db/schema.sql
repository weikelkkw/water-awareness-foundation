-- ============================================================================
-- Water Awareness Foundation — Supabase schema
-- ============================================================================
-- Run in the Supabase SQL editor for any new project.
-- Designed so the app is FULLY FUNCTIONAL without these tables (we skip
-- the cache layer when Supabase env vars are missing), but production
-- should have these for sub-100ms cached lookups.

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- ZIP-to-utility lookup cache
-- ----------------------------------------------------------------------------
create table if not exists zip_lookup (
  zip text primary key check (length(zip) = 5),
  primary_pwsid text not null,
  alternate_pwsids text[] default '{}'::text[],
  resolved_at timestamptz not null default now()
);

create index if not exists zip_lookup_resolved_at_idx on zip_lookup(resolved_at);

-- ----------------------------------------------------------------------------
-- Water systems (utilities) — cached EPA SDWIS WATER_SYSTEM rows
-- ----------------------------------------------------------------------------
create table if not exists water_systems (
  pwsid text primary key,
  name text not null,
  state text,
  population_served integer,
  primary_source text,
  owner_type text,
  counties_served text[] default '{}'::text[],
  cities_served text[] default '{}'::text[],
  fetched_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Violations — cached SDWIS VIOLATION rows
-- ----------------------------------------------------------------------------
create table if not exists violations (
  id uuid primary key default gen_random_uuid(),
  pwsid text not null references water_systems(pwsid) on delete cascade,
  contaminant text not null,
  contaminant_code text,
  category text,
  begin_date date,
  end_date date,
  status text,
  is_health_based boolean default false,
  fetched_at timestamptz not null default now()
);

create index if not exists violations_pwsid_idx on violations(pwsid);
create index if not exists violations_begin_idx on violations(begin_date);

-- ----------------------------------------------------------------------------
-- Newsletter signups
-- ----------------------------------------------------------------------------
create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  zip text,
  source text default 'website',
  confirmed boolean default false,
  unsubscribed_at timestamptz,
  unsubscribe_token text unique default encode(gen_random_bytes(18), 'hex'),
  last_digest_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_email_idx on newsletter_signups(lower(email));
create index if not exists newsletter_unsub_token_idx on newsletter_signups(unsubscribe_token);

-- ----------------------------------------------------------------------------
-- Digest send log (one row per email per issue) — for analytics + dedup
-- ----------------------------------------------------------------------------
create table if not exists digest_sends (
  id uuid primary key default gen_random_uuid(),
  issue_key text not null,        -- e.g. "2026-W21"
  email text not null,
  resend_id text,
  status text not null,           -- 'sent' | 'failed'
  error text,
  sent_at timestamptz not null default now()
);

create index if not exists digest_sends_issue_idx on digest_sends(issue_key);
create index if not exists digest_sends_email_idx on digest_sends(lower(email));

-- ----------------------------------------------------------------------------
-- Row-Level Security
-- ----------------------------------------------------------------------------
-- Public can READ cached water data — it's all already public EPA data.
-- Inserts go through the service role from server actions only.

alter table zip_lookup enable row level security;
alter table water_systems enable row level security;
alter table violations enable row level security;
alter table newsletter_signups enable row level security;

create policy "public read zip_lookup"
  on zip_lookup for select using (true);
create policy "public read water_systems"
  on water_systems for select using (true);
create policy "public read violations"
  on violations for select using (true);
-- newsletter signups are write-only from the public side; no read policy.
