"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const CONFIG_ERROR =
  "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY to your hosting environment, then redeploy.";

export async function adminLogin(email: string, password: string) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: CONFIG_ERROR };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return { error: "Login succeeded but no session was created. Please try again." };
  }

  const admin = createAdminClient();
  if (!admin) {
    await supabase.auth.signOut();
    return { error: CONFIG_ERROR };
  }

  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return {
      error:
        "This account is not an admin. Run npm run setup:admin or contact the site owner.",
    };
  }

  return { success: true as const };
}

export async function adminLogout() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
}
