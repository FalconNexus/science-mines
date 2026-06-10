"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMissingTableError, saveBrandingToStorage } from "@/lib/branding";
import type { BookingStatus, ProductCategory } from "@/types/database";

async function requireAdmin() {
  const sessionClient = await createClient();
  if (!sessionClient) throw new Error("Supabase not configured");

  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  if (!user) throw new Error("Please log in at /admin/login");

  const adminClient = createAdminClient();
  if (!adminClient) throw new Error("Server configuration error");

  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error(
      "Your account is not an admin. Ask the site owner to run: npm run setup:admin"
    );
  }

  return adminClient;
}

export async function updateBookingStatus(
  table: string,
  id: string,
  status: BookingStatus
) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/bookings");
}

export async function createCourse(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("courses").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    duration: formData.get("duration") as string,
    image_url: (formData.get("image_url") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/booking");
}

export async function updateCourse(id: string, formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("courses")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      duration: formData.get("duration") as string,
      image_url: (formData.get("image_url") as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/booking");
}

export async function deleteCourse(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/booking");
}

export async function createProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").insert({
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || null,
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category") as ProductCategory,
    image_url: (formData.get("image_url") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/booking");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as ProductCategory,
      image_url: (formData.get("image_url") as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/booking");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/booking");
  revalidatePath("/");
}

export async function addGalleryImage(imageUrl: string, altText?: string) {
  const supabase = await requireAdmin();
  const { data: existing } = await supabase
    .from("gallery_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1;

  const { error } = await supabase.from("gallery_images").insert({
    image_url: imageUrl,
    alt_text: altText || null,
    sort_order: nextOrder,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function deleteGalleryImage(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function reorderGalleryImage(id: string, direction: "up" | "down") {
  const supabase = await requireAdmin();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!images) return;

  const index = images.findIndex((img) => img.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;

  if (swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swap = images[swapIndex];

  await supabase
    .from("gallery_images")
    .update({ sort_order: swap.sort_order })
    .eq("id", current.id);

  await supabase
    .from("gallery_images")
    .update({ sort_order: current.sort_order })
    .eq("id", swap.id);

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function updateContactStatus(id: string, status: BookingStatus) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("contact_requests")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contacts");
}

export async function updateBranding(formData: FormData) {
  const supabase = await requireAdmin();

  const payload = {
    logo_url: (formData.get("logo_url") as string) || null,
    favicon_url: (formData.get("favicon_url") as string) || null,
  };

  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    ...payload,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    if (isMissingTableError(error.message)) {
      await saveBrandingToStorage(payload);
    } else {
      throw new Error(error.message);
    }
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/booking");
  revalidatePath("/admin/branding");
  revalidatePath("/admin", "layout");
}
