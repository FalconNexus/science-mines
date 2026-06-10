"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadFieldProps {
  name?: string;
  label?: string;
  bucket: string;
  defaultUrl?: string | null;
  onUrlChange?: (url: string) => void;
}

export function ImageUploadField({
  name = "image_url",
  label = "Image",
  bucket,
  defaultUrl,
  onUrlChange,
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function updateUrl(next: string) {
    setUrl(next);
    onUrlChange?.(next);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      updateUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-muted">{label}</label>
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-black">
          <Image src={url} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => updateUrl("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-500/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border border-dashed border-border hover:border-primary/40 cursor-pointer transition-colors bg-black/40">
          <Upload className="text-muted mb-2" size={22} />
          <span className="text-sm text-muted">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
      )}

      {!url && (
        <label className="inline-flex items-center px-4 py-2 rounded-full border border-border text-sm cursor-pointer hover:border-primary/30 transition-colors">
          {uploading ? "Uploading..." : "Choose file"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
