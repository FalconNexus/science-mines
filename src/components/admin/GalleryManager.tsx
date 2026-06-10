"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ChevronUp, ChevronDown, Upload } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  addGalleryImage,
  deleteGalleryImage,
  reorderGalleryImage,
} from "@/lib/actions/admin";
import type { GalleryImage } from "@/types/database";

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "gallery-images");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      await addGalleryImage(data.url, altText || file.name);
      setAltText("");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this image from the homepage lab gallery?")) return;
    try {
      await deleteGalleryImage(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    try {
      await reorderGalleryImage(id, direction);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reorder");
    }
  }

  return (
    <div>
      <div className="mb-8 p-5 rounded-2xl border border-primary/20 bg-primary/5">
        <p className="text-sm text-foreground font-medium mb-1">
          Homepage Lab Gallery
        </p>
        <p className="text-sm text-muted">
          Images here appear in the &quot;NOT A CLASSROOM. AN INNOVATION
          LAB.&quot; section on the homepage and the About page. First 6 images
          show on the homepage. Use arrows to reorder.
        </p>
      </div>

      <div className="mb-8 p-6 rounded-2xl border border-border bg-surface space-y-4">
        <h3 className="font-semibold">Upload Lab Photo</h3>
        <Input
          label="Caption (optional)"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="e.g. Robotics Workstation"
        />
        <label className="flex flex-col items-center justify-center p-10 rounded-xl border border-dashed border-border hover:border-primary/40 cursor-pointer transition-colors bg-black/40">
          <Upload className="text-primary mb-3" size={28} />
          <span className="text-sm font-medium">
            {loading ? "Uploading..." : "Click to upload image"}
          </span>
          <span className="text-xs text-muted mt-1">JPG, PNG, WebP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={loading}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {images.length === 0 ? (
        <p className="text-muted text-center py-12 border border-border rounded-2xl">
          No lab photos yet. Upload images above — they will appear on the
          homepage immediately.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="rounded-xl border border-border overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || "Lab"}
                  fill
                  className="object-cover"
                />
                {i < 6 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-black text-[10px] font-bold">
                    Homepage
                  </span>
                )}
              </div>
              <div className="p-3 flex items-center justify-between bg-surface gap-2">
                <span className="text-xs text-muted truncate flex-1">
                  {img.alt_text || `Photo ${i + 1}`}
                </span>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleReorder(img.id, "up")}
                    disabled={i === 0}
                    className="p-1 rounded hover:bg-white/5 disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorder(img.id, "down")}
                    disabled={i === images.length - 1}
                    className="p-1 rounded hover:bg-white/5 disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="p-1 rounded text-red-400 hover:bg-red-400/10"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
