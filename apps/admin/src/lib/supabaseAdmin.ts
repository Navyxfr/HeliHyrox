import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasAdminSupabaseConfig = Boolean(supabaseUrl && serviceRoleKey);

export function getSupabaseAdmin() {
  if (!hasAdminSupabaseConfig) {
    return null;
  }

  return createClient(supabaseUrl!, serviceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
