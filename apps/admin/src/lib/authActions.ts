"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function signInAdmin(formData: FormData) {
  const supabase = await getSupabaseServer();

  if (!supabase) {
    redirect("/" as Route);
  }

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login" as Route);
  }

  redirect("/" as Route);
}

export async function signOutAdmin() {
  const supabase = await getSupabaseServer();

  if (!supabase) {
    redirect("/login" as Route);
  }

  await supabase.auth.signOut();
  redirect("/login" as Route);
}
