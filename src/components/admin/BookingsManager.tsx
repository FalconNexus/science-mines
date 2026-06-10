"use client";

import { updateBookingStatus } from "@/lib/actions/admin";
import { AdminTable, StatusSelect } from "@/components/admin/AdminTable";
import { formatDateTime } from "@/lib/utils";
import type {
  CourseBooking,
  DemoBooking,
  LabBooking,
  PrintRequest,
  BookingStatus,
} from "@/types/database";

type BookingRow = {
  id: string;
  type: string;
  name: string;
  contact: string;
  details: string;
  status: BookingStatus;
  created_at: string;
  table: string;
};

function mapBookings(
  course: CourseBooking[],
  demo: DemoBooking[],
  lab: LabBooking[],
  print: PrintRequest[]
): BookingRow[] {
  const rows: BookingRow[] = [
    ...course.map((b) => ({
      id: b.id,
      type: "Course",
      name: b.name,
      contact: `${b.phone} · ${b.email}`,
      details: b.course_title,
      status: b.status,
      created_at: b.created_at,
      table: "course_bookings",
    })),
    ...demo.map((b) => ({
      id: b.id,
      type: "Demo",
      name: b.name,
      contact: `${b.phone} · ${b.email}`,
      details: b.course_interested,
      status: b.status,
      created_at: b.created_at,
      table: "demo_bookings",
    })),
    ...lab.map((b) => ({
      id: b.id,
      type: "Lab",
      name: b.name,
      contact: b.phone,
      details: `${b.purpose} · ${b.booking_date}`,
      status: b.status,
      created_at: b.created_at,
      table: "lab_bookings",
    })),
    ...print.map((b) => ({
      id: b.id,
      type: "3D Print",
      name: b.name,
      contact: `${b.phone} · ${b.email}`,
      details: b.description,
      status: b.status,
      created_at: b.created_at,
      table: "print_requests",
    })),
  ];

  return rows.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

interface BookingsManagerProps {
  courseBookings: CourseBooking[];
  demoBookings: DemoBooking[];
  labBookings: LabBooking[];
  printRequests: PrintRequest[];
}

export function BookingsManager({
  courseBookings,
  demoBookings,
  labBookings,
  printRequests,
}: BookingsManagerProps) {
  const rows = mapBookings(
    courseBookings,
    demoBookings,
    labBookings,
    printRequests
  );

  async function handleStatusChange(
    table: string,
    id: string,
    status: BookingStatus
  ) {
    await updateBookingStatus(table, id, status);
  }

  return (
    <AdminTable
      headers={["Type", "Name", "Contact", "Details", "Status", "Date"]}
    >
      {rows.length === 0 ? (
        <tr>
          <td colSpan={6} className="px-4 py-12 text-center text-muted">
            No bookings yet.
          </td>
        </tr>
      ) : (
        rows.map((row) => (
          <tr key={row.id} className="border-b border-border hover:bg-white/[0.02]">
            <td className="px-4 py-3">
              <span className="px-2 py-1 rounded-md bg-surface text-xs font-medium">
                {row.type}
              </span>
            </td>
            <td className="px-4 py-3 font-medium">{row.name}</td>
            <td className="px-4 py-3 text-muted text-xs">{row.contact}</td>
            <td className="px-4 py-3 text-muted text-xs max-w-xs truncate">
              {row.details}
            </td>
            <td className="px-4 py-3">
              <StatusSelect
                value={row.status}
                onChange={(s) => handleStatusChange(row.table, row.id, s)}
              />
            </td>
            <td className="px-4 py-3 text-muted text-xs">
              {formatDateTime(row.created_at)}
            </td>
          </tr>
        ))
      )}
    </AdminTable>
  );
}
