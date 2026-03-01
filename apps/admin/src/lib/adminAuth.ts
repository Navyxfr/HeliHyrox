import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function requireAdminUser() {
  const supabase = await getSupabaseServer();

  if (!supabase) {
    redirect(
      "/login?error=Configuration%20Supabase%20requise%20pour%20le%20back-office." as Route
    );
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login" as Route);
  }

  const { data: roles, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  if (error || !roles?.some((row) => row.role === "admin")) {
    redirect("/login" as Route);
  }

  return user;
}
