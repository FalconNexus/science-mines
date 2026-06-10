"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ChartData {
  date: string;
  visits: number;
  bookings: number;
}

export function DashboardCharts({ data }: { data: ChartData[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl border border-border bg-surface">
        <h3 className="font-semibold mb-6">Daily Visits</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="#A3A3A3" fontSize={12} />
            <YAxis stroke="#A3A3A3" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#FF7A00"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-surface">
        <h3 className="font-semibold mb-6">Bookings</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="date" stroke="#A3A3A3" fontSize={12} />
            <YAxis stroke="#A3A3A3" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="bookings" fill="#FFC61A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-surface">
      <p className="text-muted text-sm mb-2">{label}</p>
      <p className="font-display text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
