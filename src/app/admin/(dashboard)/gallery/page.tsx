import { getAllGalleryAdmin } from "@/lib/data";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const images = await getAllGalleryAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Lab Gallery</h1>
        <p className="text-muted mt-1">
          Manage photos shown on the homepage Innovation Lab section
        </p>
      </div>
      <GalleryManager images={images} />
    </div>
  );
}
