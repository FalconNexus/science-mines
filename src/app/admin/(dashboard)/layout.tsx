import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar logoUrl={settings.logo_url} />
      <div className="ml-64 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
