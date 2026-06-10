import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
