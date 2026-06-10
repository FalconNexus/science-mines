import { getSiteSettings } from "@/lib/data";
import { BrandingManager } from "@/components/admin/BrandingManager";

export default async function AdminBrandingPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Branding</h1>
        <p className="text-muted mt-1">
          Upload your ScienceMines logo and favicon for the public site
        </p>
      </div>
      <BrandingManager settings={settings} />
    </div>
  );
}
