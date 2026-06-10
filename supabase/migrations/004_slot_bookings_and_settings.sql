-- Site branding settings
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  logo_url TEXT,
  favicon_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Time-slot bookings (11am–7pm, max 10 per slot)
CREATE TABLE IF NOT EXISTS slot_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_date DATE NOT NULL,
  slot_hour INTEGER NOT NULL CHECK (slot_hour >= 11 AND slot_hour <= 18),
  booking_type TEXT NOT NULL CHECK (booking_type IN ('demo', 'workshop', 'course')),
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  course_title TEXT,
  course_interested TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_slot_bookings_date_hour ON slot_bookings(booking_date, slot_hour);
CREATE INDEX IF NOT EXISTS idx_slot_bookings_status ON slot_bookings(status);

-- RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Public insert slot bookings" ON slot_bookings;
DROP POLICY IF EXISTS "Admin read slot bookings" ON slot_bookings;
DROP POLICY IF EXISTS "Admin update slot bookings" ON slot_bookings;

CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage site settings" ON site_settings FOR ALL USING (is_admin());

CREATE POLICY "Public insert slot bookings" ON slot_bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public read slot counts" ON slot_bookings FOR SELECT USING (TRUE);
CREATE POLICY "Admin update slot bookings" ON slot_bookings FOR UPDATE USING (is_admin());
