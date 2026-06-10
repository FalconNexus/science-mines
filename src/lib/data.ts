import { createClient } from "@/lib/supabase/server";
import type {
  Course,
  Product,
  GalleryImage,
  DashboardStats,
  AnalyticsEvent,
  CourseBooking,
  DemoBooking,
  LabBooking,
  PrintRequest,
  ContactRequest,
} from "@/types/database";

export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProducts(limit?: number): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      totalBookings: 0,
      courseRegistrations: 0,
      demoBookings: 0,
      printRequests: 0,
      contactRequests: 0,
      productOrders: 0,
    };
  }

  const [
    visits,
    uniqueVisitors,
    courseBookings,
    demoBookings,
    printRequests,
    contactRequests,
    labBookings,
  ] = await Promise.all([
    supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "visit"),
    supabase.from("analytics_events").select("visitor_id"),
    supabase.from("course_bookings").select("*", { count: "exact", head: true }),
    supabase.from("demo_bookings").select("*", { count: "exact", head: true }),
    supabase.from("print_requests").select("*", { count: "exact", head: true }),
    supabase.from("contact_requests").select("*", { count: "exact", head: true }),
    supabase.from("lab_bookings").select("*", { count: "exact", head: true }),
  ]);

  const uniqueIds = new Set(
    (uniqueVisitors.data ?? [])
      .map((e) => e.visitor_id)
      .filter(Boolean)
  );

  const totalBookings =
    (courseBookings.count ?? 0) +
    (demoBookings.count ?? 0) +
    (printRequests.count ?? 0) +
    (labBookings.count ?? 0);

  return {
    totalVisits: visits.count ?? 0,
    uniqueVisitors: uniqueIds.size,
    totalBookings,
    courseRegistrations: courseBookings.count ?? 0,
    demoBookings: demoBookings.count ?? 0,
    printRequests: printRequests.count ?? 0,
    contactRequests: contactRequests.count ?? 0,
    productOrders: 0,
  };
}

export async function getAnalyticsEvents(
  days = 30
): Promise<AnalyticsEvent[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getAllCourseBookings(): Promise<CourseBooking[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("course_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllDemoBookings(): Promise<DemoBooking[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("demo_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllLabBookings(): Promise<LabBooking[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("lab_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllPrintRequests(): Promise<PrintRequest[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("print_requests")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllContactRequests(): Promise<ContactRequest[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllCoursesAdmin(): Promise<Course[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getAllGalleryAdmin(): Promise<GalleryImage[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
