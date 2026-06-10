/**
 * Applies site_settings migration via Supabase service role.
 * Run: node --env-file=.env.local scripts/apply-branding-migration.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(url, key);

// Test if table exists
const { error: checkError } = await supabase.from("site_settings").select("id").limit(1);

if (!checkError) {
  console.log("✓ site_settings table already exists");
  process.exit(0);
}

console.log(`
site_settings table not found.

Run this SQL in Supabase SQL Editor:
https://supabase.com/dashboard/project/reatmxixpffdndxncile/sql/new

--- Copy below ---
`);

const dir = dirname(fileURLToPath(import.meta.url));
console.log(readFileSync(join(dir, "../supabase/migrations/003_site_settings.sql"), "utf8"));
