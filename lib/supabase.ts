import { createClient } from "@supabase/supabase-js";

export function getAdminClient() {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function getPublicClient() {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_ANON_KEY as string;
  return createClient(url, key, { auth: { persistSession: false } });
}