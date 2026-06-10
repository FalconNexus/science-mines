export type BookingStatus = "new" | "contacted" | "completed" | "cancelled";

export type ProductCategory =
  | "Arduino"
  | "ESP32"
  | "Sensors"
  | "Modules"
  | "Robotics Parts"
  | "Electronics Components"
  | "STEM Kits";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: ProductCategory;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: BookingStatus;
  created_at: string;
}

export interface CourseBooking {
  id: string;
  course_id: string | null;
  course_title: string;
  name: string;
  phone: string;
  email: string;
  status: BookingStatus;
  created_at: string;
}

export interface DemoBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  course_interested: string;
  status: BookingStatus;
  created_at: string;
}

export interface LabBooking {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  booking_date: string;
  status: BookingStatus;
  created_at: string;
}

export interface PrintRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  file_url: string | null;
  file_name: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: "page_view" | "visit" | "conversion";
  page_path: string | null;
  visitor_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  totalBookings: number;
  courseRegistrations: number;
  demoBookings: number;
  printRequests: number;
  contactRequests: number;
  productOrders: number;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Arduino",
  "ESP32",
  "Sensors",
  "Modules",
  "Robotics Parts",
  "Electronics Components",
  "STEM Kits",
];

export const BOOKING_STATUSES: BookingStatus[] = [
  "new",
  "contacted",
  "completed",
  "cancelled",
];
