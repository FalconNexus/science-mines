/**
 * Create admin user for ScienceMines dashboard.
 * Usage: node --env-file=.env.local scripts/create-admin.mjs
 * Optional: ADMIN_EMAIL=you@email.com ADMIN_PASSWORD=YourPassword123 node --env-file=.env.local scripts/create-admin.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL = process.env.ADMIN_EMAIL || "admin@sciencemines.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "ScienceMines@2025";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing Supabase env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`\nCreating admin: ${EMAIL}\n`);

  // Check if user already exists
  const { data: list } = await supabase.auth.admin.listUsers();
  const existing = list?.users?.find((u) => u.email === EMAIL);

  let userId = existing?.id;

  if (existing) {
    console.log("· User already exists, updating password and profile...");
    await supabase.auth.admin.updateUserById(existing.id, { password: PASSWORD });
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.error("Failed to create user:", error.message);
      process.exit(1);
    }
    userId = data.user.id;
    console.log("✓ Auth user created");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    { id: userId, email: EMAIL, role: "admin" },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("Failed to set admin profile:", profileError.message);
    process.exit(1);
  }

  console.log("✓ Admin profile set");
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Admin login ready!

  URL:      http://localhost:3000/admin/login
  Email:    ${EMAIL}
  Password: ${PASSWORD}

  Change your password after first login.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(console.error);
