/**
 * Apply pending SQL migrations via direct Postgres connection.
 * Add to .env.local: DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
 * Run: node --env-file=.env.local scripts/run-migrations.mjs
 */

import postgres from "postgres";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.log(`
DATABASE_URL not set. Apply migrations manually:

1. Open https://supabase.com/dashboard/project/reatmxixpffdndxncile/sql/new
2. Paste and run: supabase/migrations/004_slot_bookings_and_settings.sql

Or add DATABASE_URL to .env.local (Supabase → Settings → Database → Connection string)
then run: node --env-file=.env.local scripts/run-migrations.mjs
`);
  process.exit(0);
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "../supabase/migrations");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const sql = postgres(DATABASE_URL, { ssl: "require" });

for (const file of files) {
  const path = join(dir, file);
  const content = readFileSync(path, "utf8");
  console.log(`Running ${file}...`);
  try {
    await sql.unsafe(content);
    console.log(`✓ ${file}`);
  } catch (err) {
    console.warn(`· ${file}: ${err.message}`);
  }
}

await sql.end();
console.log("\nDone.");
