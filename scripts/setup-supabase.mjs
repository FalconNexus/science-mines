/**
 * One-time Supabase setup: create storage buckets + verify DB tables.
 * Run: node scripts/setup-supabase.mjs
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const BUCKETS = [
  { id: "course-images", public: true },
  { id: "product-images", public: true },
  { id: "gallery-images", public: true },
  { id: "print-files", public: true },
  { id: "branding", public: true },
];

async function createBucket(id, isPublic) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
    },
    body: JSON.stringify({ id, name: id, public: isPublic }),
  });

  if (res.ok) {
    console.log(`✓ Created bucket: ${id}`);
    return;
  }

  const body = await res.json().catch(() => ({}));
  if (body?.message?.includes("already exists") || res.status === 409) {
    console.log(`· Bucket already exists: ${id}`);
    return;
  }

  console.warn(`✗ Bucket ${id}:`, body?.message || res.statusText);
}

async function checkTable(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      apikey: ANON_KEY,
    },
  });

  if (res.ok) return true;
  const err = await res.json().catch(() => ({}));
  if (err?.code === "PGRST205" || err?.message?.includes("does not exist")) {
    return false;
  }
  console.log(`  ${table}: ${res.status} ${JSON.stringify(err)}`);
  return res.ok;
}

async function main() {
  console.log("\n📦 Creating storage buckets...\n");
  for (const b of BUCKETS) {
    await createBucket(b.id, b.public);
  }

  console.log("\n🗄️  Checking database tables...\n");
  const tables = [
    "courses",
    "products",
    "gallery_images",
    "contact_requests",
    "course_bookings",
    "profiles",
    "site_settings",
  ];

  let allExist = true;
  for (const t of tables) {
    const exists = await checkTable(t);
    console.log(exists ? `✓ ${t}` : `✗ ${t} — missing`);
    if (!exists) allExist = false;
  }

  if (!allExist) {
    console.log(`
⚠️  Database tables not found. Run the migration:

1. Open https://supabase.com/dashboard/project/reatmxixpffdndxncile/sql/new
2. Paste contents of: supabase/migrations/001_initial_schema.sql
3. Click Run

Then create an admin user in Authentication → Users, and run:

  INSERT INTO profiles (id, email, role)
  VALUES ('YOUR_USER_UUID', 'your@email.com', 'admin');
`);
  } else {
    console.log("\n✅ Supabase is configured and tables exist.\n");
  }
}

main().catch(console.error);
