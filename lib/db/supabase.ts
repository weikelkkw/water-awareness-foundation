import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * The app is designed to work WITHOUT Supabase configured — we just
 * skip the cache layer and hit SDWIS directly. That's honest dev DX.
 */
export const supabasePublic: SupabaseClient | null =
  url && anon ? createClient(url, anon) : null;

export const supabaseAdmin: SupabaseClient | null =
  url && service ? createClient(url, service, { auth: { persistSession: false } }) : null;

export function hasSupabase() {
  return !!supabaseAdmin;
}
