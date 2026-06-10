"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/booking/CourseBookingSection";

export function PrintRequestSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    try {
      let fileUrl = null;
      let uploadedName = null;

      if (file && file.size > 0) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("bucket", "print-files");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (uploadRes.ok) {
          const result = await uploadRes.json();
          fileUrl = result.url;
          uploadedName = file.name;
        }
      }

      const res = await fetch("/api/bookings/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          description: formData.get("description"),
          file_url: fileUrl,
          file_name: uploadedName,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setFileName("");
      e.currentTarget.reset();
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="print" className="section-padding bg-black">
      <div className="container-wide px-6 max-w-2xl mx-auto">
        <SectionHeader
          label="3D Printing"
          title="Request a Quote"
          subtitle="Upload your STL, OBJ, or STEP file for a custom quote."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl border border-border bg-surface"
        >
          {success ? (
            <div className="text-center py-8">
              <p className="text-primary font-semibold text-lg mb-2">
                Request Submitted!
              </p>
              <p className="text-muted text-sm">
                We&apos;ll review your file and send a quote.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSuccess(false)}
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" label="Name" required />
              <Input name="phone" label="Phone" required />
              <Input name="email" label="Email" type="email" required />
              <Textarea
                name="description"
                label="Description"
                required
                placeholder="Material, quantity, dimensions..."
              />

              <div className="space-y-2">
                <label className="block text-sm text-muted">
                  Upload File (STL, OBJ, STEP)
                </label>
                <label className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border hover:border-primary/30 cursor-pointer transition-colors">
                  <Upload className="text-muted mb-2" size={24} />
                  <span className="text-sm text-muted">
                    {fileName || "Click to upload"}
                  </span>
                  <input
                    type="file"
                    name="file"
                    accept=".stl,.obj,.step,.stp"
                    className="hidden"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name || "")
                    }
                  />
                </label>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Request Quote"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
