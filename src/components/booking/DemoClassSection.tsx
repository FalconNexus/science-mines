"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/booking/CourseBookingSection";

export function DemoClassSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/bookings/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          course_interested: formData.get("course_interested"),
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
    <section id="demo" className="section-padding bg-surface">
      <div className="container-wide px-6 max-w-2xl mx-auto">
        <SectionHeader
          label="Free Demo"
          title="Book a Free Demo Class"
          subtitle="Experience our innovation lab firsthand."
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
                Demo Booked!
              </p>
              <p className="text-muted text-sm">
                We&apos;ll reach out to schedule your session.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSuccess(false)}
              >
                Book Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" label="Name" required />
              <Input name="phone" label="Phone" required />
              <Input name="email" label="Email" type="email" required />
              <Input
                name="course_interested"
                label="Course Interested In"
                required
                placeholder="e.g. Robotics, AI, 3D Printing"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Book Free Demo"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
