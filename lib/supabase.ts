import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export type SupabaseClientType = SupabaseClient<Database>;

function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

/** Browser client for form submissions + admin (use in Client Components).
 * Uses @supabase/ssr so the session lives in cookies the server + middleware
 * can read (enables real server-side gating of /admin). Singleton — one
 * GoTrueClient per browser context. */
let browserClient: SupabaseClientType | null = null;
export function createBrowserSupabaseClient(): SupabaseClientType | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  if (!browserClient) browserClient = createBrowserClient<Database>(url, key);
  return browserClient;
}

/** Server client for data fetching (use in Server Components). */
export function createServerSupabaseClient(): SupabaseClientType | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
