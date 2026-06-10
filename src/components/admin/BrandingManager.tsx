"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateBranding } from "@/lib/actions/admin";
import type { SiteSettings } from "@/types/database";

export function BrandingManager({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState(settings.logo_url || "");
  const [faviconUrl, setFaviconUrl] = useState(settings.favicon_url || "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.set("logo_url", logoUrl);
    formData.set("favicon_url", faviconUrl);

    try {
      await updateBranding(formData);
      router.refresh();
      alert("Branding updated! Refresh the homepage to see changes.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!confirm("Reset to default ScienceMines logo and favicon?")) return;
    setLogoUrl("");
    setFaviconUrl("");
    const formData = new FormData();
    formData.set("logo_url", "");
    formData.set("favicon_url", "");
    try {
      await updateBranding(formData);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reset");
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
      <div className="p-6 rounded-2xl border border-border bg-surface space-y-6">
        <div>
          <h3 className="font-semibold mb-1">Site Logo</h3>
          <p className="text-sm text-muted mb-4">
            Shown in the header and footer. Recommended: PNG or SVG with
            transparent background, ~200×40px.
          </p>
          <ImageUploadField
            name="logo_url_field"
            label="Upload Logo"
            bucket="branding"
            defaultUrl={logoUrl || null}
            onUrlChange={setLogoUrl}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-1">Favicon</h3>
          <p className="text-sm text-muted mb-4">
            Browser tab icon. Recommended: square PNG or SVG, 32×32px or
            512×512px.
          </p>
          <ImageUploadField
            name="favicon_url_field"
            label="Upload Favicon"
            bucket="branding"
            defaultUrl={faviconUrl || null}
            onUrlChange={setFaviconUrl}
          />
          {(faviconUrl || !settings.favicon_url) && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-muted">Preview:</span>
              <Image
                src={faviconUrl || "/favicon.svg"}
                alt="Favicon preview"
                width={32}
                height={32}
                className="rounded-lg border border-border"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Branding"}
        </Button>
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset to Default
        </Button>
      </div>
    </form>
  );
}
