import { getDashboardStats, getAnalyticsEvents } from "@/lib/data";
import { StatCard, DashboardCharts } from "@/components/admin/DashboardCharts";

function buildChartData(
  events: Awaited<ReturnType<typeof getAnalyticsEvents>>
) {
  const days: Record<string, { visits: number; bookings: number }> = {};

  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    days[key] = { visits: 0, bookings: 0 };
  }

  events.forEach((event) => {
    const key = new Date(event.created_at).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    if (!days[key]) return;
    if (event.event_type === "visit" || event.event_type === "page_view") {
      days[key].visits++;
    }
    if (event.event_type === "conversion") {
      days[key].bookings++;
    }
  });

  return Object.entries(days).map(([date, data]) => ({
    date,
    ...data,
  }));
}

export default async function AdminDashboardPage() {
  const [stats, events] = await Promise.all([
    getDashboardStats(),
    getAnalyticsEvents(30),
  ]);

  const chartData = buildChartData(events);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your innovation lab</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visits" value={stats.totalVisits} />
        <StatCard label="Unique Visitors" value={stats.uniqueVisitors} />
        <StatCard label="Total Bookings" value={stats.totalBookings} />
        <StatCard label="Contact Requests" value={stats.contactRequests} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Course Registrations" value={stats.courseRegistrations} />
        <StatCard label="Demo Bookings" value={stats.demoBookings} />
        <StatCard label="3D Print Requests" value={stats.printRequests} />
        <StatCard label="Product Orders" value={stats.productOrders} />
      </div>

      <DashboardCharts data={chartData} />
    </div>
  );
}
