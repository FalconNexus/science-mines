import { getAllCoursesAdmin } from "@/lib/data";
import { CoursesManager } from "@/components/admin/CoursesManager";

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Courses</h1>
        <p className="text-muted mt-1">
          Manage courses shown on the{" "}
          <a href="/booking#courses" className="text-primary hover:underline">
            Booking page → Book a Course
          </a>
        </p>
      </div>
      <CoursesManager courses={courses} />
    </div>
  );
}
