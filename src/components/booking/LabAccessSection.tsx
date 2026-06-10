"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/booking/CourseBookingSection";

export function LabAccessSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/bookings/lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          purpose: formData.get("purpose"),
          booking_date: formData.get("booking_date"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="lab" className="section-padding bg-surface">
      <div className="container-wide px-6 max-w-2xl mx-auto">
        <SectionHeader
          label="Lab Access"
          title="Book Lab Equipment"
          subtitle="Reserve workstations and tools for your project."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl border border-border bg-black"
        >
          {success ? (
            <div className="text-center py-8">
              <p className="text-primary font-semibold text-lg mb-2">
                Lab Access Requested!
              </p>
              <p className="text-muted text-sm">
                We&apos;ll confirm your booking date soon.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSuccess(false)}
              >
                Book Again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" label="Name" required />
              <Input name="phone" label="Phone" required />
              <Textarea
                name="purpose"
                label="Purpose"
                required
                placeholder="What will you be working on?"
              />
              <Input
                name="booking_date"
                label="Date"
                type="date"
                required
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Book Lab Access"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
