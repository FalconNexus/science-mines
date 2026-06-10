-- Site branding settings (logo, favicon)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  logo_url TEXT,
  favicon_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage site settings" ON site_settings FOR ALL USING (is_admin());
