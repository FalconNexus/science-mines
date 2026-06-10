"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Course } from "@/types/database";

interface CourseBookingSectionProps {
  courses: Course[];
}

export function CourseBookingSection({ courses }: CourseBookingSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourse) return;

    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/bookings/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: selectedCourse.id,
          course_title: selectedCourse.title,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setSelectedCourse(null);
      e.currentTarget.reset();
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="courses" className="section-padding bg-black">
      <div className="container-wide px-6">
        <SectionHeader
          label="Courses"
          title="Book a Course"
          subtitle="Choose from our admin-managed course catalog."
        />

        {courses.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl">
            <p className="text-muted mb-2">Courses coming soon.</p>
            <p className="text-sm text-muted">
              Check back shortly — new programs are added regularly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                  selectedCourse?.id === course.id
                    ? "border-primary ring-1 ring-primary/30"
                    : "border-border hover:border-primary/20"
                }`}
                onClick={() => {
                  setSelectedCourse(course);
                  setSuccess(false);
                }}
              >
                <div className="relative aspect-video bg-surface">
                  {course.image_url ? (
                    <Image
                      src={course.image_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted">
                      Course Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">
                    {course.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">
                      {formatPrice(course.price)}
                    </span>
                    <span className="text-muted text-sm">{course.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto p-8 rounded-2xl border border-border bg-surface"
          >
            <h3 className="font-display text-xl font-bold mb-1">
              Book: {selectedCourse.title}
            </h3>
            <p className="text-muted text-sm mb-6">
              Fill in your details to register.
            </p>

            {success ? (
              <div className="text-center py-8">
                <p className="text-primary font-semibold text-lg mb-2">
                  Booking Submitted!
                </p>
                <p className="text-muted text-sm">
                  We&apos;ll contact you shortly to confirm.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" label="Name" required />
                <Input name="phone" label="Phone" required />
                <Input name="email" label="Email" type="email" required />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Submitting..." : "Book Course"}
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-primary text-sm uppercase tracking-widest mb-3">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
        {title}
      </h2>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  );
}

export { SectionHeader };
