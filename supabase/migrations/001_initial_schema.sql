-- ScienceMines Database Schema

-- Profiles (extends Supabase auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  duration TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN (
    'Arduino', 'ESP32', 'Sensors', 'Modules',
    'Robotics Parts', 'Electronics Components', 'STEM Kits'
  )),
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Requests
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course Bookings
CREATE TABLE IF NOT EXISTS course_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  course_title TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Demo Bookings
CREATE TABLE IF NOT EXISTS demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  course_interested TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lab Bookings
CREATE TABLE IF NOT EXISTS lab_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  purpose TEXT NOT NULL,
  booking_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3D Print Requests
CREATE TABLE IF NOT EXISTS print_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'visit', 'conversion')),
  page_path TEXT,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON analytics_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_course_bookings_status ON course_bookings(status);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_status ON demo_bookings(status);
CREATE INDEX IF NOT EXISTS idx_lab_bookings_status ON lab_bookings(status);
CREATE INDEX IF NOT EXISTS idx_print_requests_status ON print_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE print_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public read for active courses and products
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (TRUE);

-- Public insert for forms
CREATE POLICY "Public insert contacts" ON contact_requests FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert course bookings" ON course_bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert demo bookings" ON demo_bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert lab bookings" ON lab_bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert print requests" ON print_requests FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert analytics" ON analytics_events FOR INSERT WITH CHECK (TRUE);

-- Admin full access
CREATE POLICY "Admin manage courses" ON courses FOR ALL USING (is_admin());
CREATE POLICY "Admin manage products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admin manage gallery" ON gallery_images FOR ALL USING (is_admin());
CREATE POLICY "Admin read contacts" ON contact_requests FOR SELECT USING (is_admin());
CREATE POLICY "Admin update contacts" ON contact_requests FOR UPDATE USING (is_admin());
CREATE POLICY "Admin read course bookings" ON course_bookings FOR SELECT USING (is_admin());
CREATE POLICY "Admin update course bookings" ON course_bookings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin read demo bookings" ON demo_bookings FOR SELECT USING (is_admin());
CREATE POLICY "Admin update demo bookings" ON demo_bookings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin read lab bookings" ON lab_bookings FOR SELECT USING (is_admin());
CREATE POLICY "Admin update lab bookings" ON lab_bookings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin read print requests" ON print_requests FOR SELECT USING (is_admin());
CREATE POLICY "Admin update print requests" ON print_requests FOR UPDATE USING (is_admin());
CREATE POLICY "Admin read analytics" ON analytics_events FOR SELECT USING (is_admin());
CREATE POLICY "Admin read profiles" ON profiles FOR SELECT USING (is_admin() OR id = auth.uid());

-- Storage buckets (run in Supabase dashboard or via API)
-- course-images, product-images, gallery-images, print-files
