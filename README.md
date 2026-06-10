# ScienceMines

Premium Innovation Lab website with booking system and admin dashboard.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_initial_schema.sql` via the SQL Editor
3. Create storage buckets: `course-images`, `product-images`, `gallery-images`, `print-files` (all public)
4. Copy `.env.local.example` to `.env.local` and fill in your keys

### 3. Create admin user

1. Create a user in Supabase Auth (Authentication → Users)
2. Insert an admin profile:

```sql
INSERT INTO profiles (id, email, role)
VALUES ('YOUR_USER_UUID', 'admin@sciencemines.com', 'admin');
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — cinematic storytelling with 7 sections |
| `/booking` | Courses, demo, 3D printing, lab access, products |
| `/about` | Mission, vision, philosophy, timeline |
| `/admin` | Dashboard with analytics and management |
| `/admin/login` | Admin authentication |

## Brand Colors

- Primary Orange: `#FF7A00`
- Secondary Yellow: `#FFC61A`
- Background: `#000000`
- Surface: `#0A0A0A`

## Deploy on Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local.example`
4. Deploy

## Logo

Replace the placeholder "S" logo in `Navbar.tsx`, `Footer.tsx`, and admin components with your ScienceMines logo asset.

## Hero Video

Add your hero video as `public/hero-video.mp4` for the homepage background.
