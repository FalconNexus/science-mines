import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteSettings } from "@/types/database";

const BRANDING_FILE = "settings.json";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 1,
  logo_url: null,
  favicon_url: null,
  updated_at: new Date().toISOString(),
};

export function getFaviconHref(settings: SiteSettings): string {
  if (!settings.favicon_url) return "/favicon.svg";
  const separator = settings.favicon_url.includes("?") ? "&" : "?";
  return `${settings.favicon_url}${separator}v=${encodeURIComponent(settings.updated_at)}`;
}

export async function getBrandingFromStorage(): Promise<SiteSettings | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(
        `${baseUrl}/storage/v1/object/public/branding/${BRANDING_FILE}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const json = await res.json();
        return { ...DEFAULT_SITE_SETTINGS, ...json };
      }
    } catch {
      /* fall through */
    }
  }

  const admin = createAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.storage
    .from("branding")
    .download(BRANDING_FILE);

  if (error || !data) return null;

  try {
    const text = await data.text();
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(text) };
  } catch {
    return null;
  }
}

export async function saveBrandingToStorage(
  settings: Pick<SiteSettings, "logo_url" | "favicon_url">
): Promise<void> {
  const admin = createAdminClient();
  if (!admin) throw new Error("Storage not configured");

  const payload = {
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
    updated_at: new Date().toISOString(),
  };

  const { error } = await admin.storage
    .from("branding")
    .upload(BRANDING_FILE, JSON.stringify(payload), {
      upsert: true,
      contentType: "application/json",
    });

  if (error) throw new Error(error.message);
}

export function isMissingTableError(message?: string): boolean {
  if (!message) return false;
  return (
    message.includes("schema cache") ||
    message.includes("does not exist") ||
    message.includes("PGRST205") ||
    message.includes("Could not find the table")
  );
}
