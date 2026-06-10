"use client";

import type { BookingStatus } from "@/types/database";
import { BOOKING_STATUSES } from "@/types/database";

export function StatusBadge({ status }: { status: BookingStatus }) {
  const colors: Record<BookingStatus, string> = {
    new: "bg-primary/10 text-primary border-primary/20",
    contacted: "bg-secondary/10 text-secondary border-secondary/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export function StatusSelect({
  value,
  onChange,
}: {
  value: BookingStatus;
  onChange: (status: BookingStatus) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as BookingStatus)}
      className="!py-1.5 !px-3 text-sm !w-auto"
    >
      {BOOKING_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {headers.map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-muted font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
