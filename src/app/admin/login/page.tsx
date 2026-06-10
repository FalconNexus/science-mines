import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import AdminLoginPage from "./AdminLoginClient";

export default async function LoginPage() {
  const supabase = await createClient();
  const supabaseConfigured = Boolean(supabase);

  return (
    <Suspense>
      <AdminLoginPage supabaseConfigured={supabaseConfigured} />
    </Suspense>
  );
}
