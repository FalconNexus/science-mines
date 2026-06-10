"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Course } from "@/types/database";

interface ProgramsSectionProps {
  courses: Course[];
}

export function ProgramsSection({ courses }: ProgramsSectionProps) {
  return (
    <section id="programs" className="section-padding bg-surface">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Programs that build real engineers.
            </h2>
            <p className="text-muted max-w-xl">
              Hands-on workshops and courses — book your slot and start building.
            </p>
          </div>
          <Link
            href="/booking#courses"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors shrink-0"
          >
            View all programs <ArrowRight size={16} />
          </Link>
        </motion.div>

        {courses.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl bg-black">
            <p className="text-muted mb-4">Programs launching soon.</p>
            <Link
              href="/booking#demo"
              className="inline-flex px-6 py-3 rounded-full bg-primary text-black font-semibold text-sm"
            >
              Book a Free Demo
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href="/booking#courses"
                  className="block h-full rounded-2xl border border-border bg-black overflow-hidden hover:border-primary/30 transition-all group"
                >
                  <div className="relative aspect-[4/3] bg-surface">
                    {course.image_url ? (
                      <Image
                        src={course.image_url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                        {course.title}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted text-xs line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary font-bold">
                        {formatPrice(course.price)}
                      </span>
                      <span className="text-muted">{course.duration}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-secondary transition-colors"
          >
            Book Your Slot <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
