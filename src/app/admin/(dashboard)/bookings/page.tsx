import {
  getAllCourseBookings,
  getAllDemoBookings,
  getAllLabBookings,
  getAllPrintRequests,
} from "@/lib/data";
import { BookingsManager } from "@/components/admin/BookingsManager";

export default async function AdminBookingsPage() {
  const [courseBookings, demoBookings, labBookings, printRequests] =
    await Promise.all([
      getAllCourseBookings(),
      getAllDemoBookings(),
      getAllLabBookings(),
      getAllPrintRequests(),
    ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Bookings</h1>
        <p className="text-muted mt-1">
          Manage all course, demo, lab, and 3D print bookings
        </p>
      </div>
      <BookingsManager
        courseBookings={courseBookings}
        demoBookings={demoBookings}
        labBookings={labBookings}
        printRequests={printRequests}
      />
    </div>
  );
}
