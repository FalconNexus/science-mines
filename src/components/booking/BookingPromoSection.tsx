"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/booking/CourseBookingSection";

interface BookingPromoSectionProps {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  badge?: string;
  perks: string[];
  variant?: "surface" | "black";
  children: React.ReactNode;
}

export function BookingPromoSection({
  id,
  label,
  title,
  subtitle,
  badge,
  perks,
  variant = "surface",
  children,
}: BookingPromoSectionProps) {
  return (
    <section
      id={id}
      className={variant === "black" ? "section-padding bg-black" : "section-padding bg-surface"}
    >
      <div className="container-wide px-6 max-w-2xl mx-auto">
        <SectionHeader label={label} title={title} subtitle={subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-2xl border border-primary/25 bg-black overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.12)_0%,transparent_55%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative">
            {badge && (
              <span className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                {badge}
              </span>
            )}

            <ul className="flex flex-wrap gap-2 mb-8">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="px-3 py-1.5 rounded-lg text-xs text-muted border border-border bg-surface/80"
                >
                  ✓ {perk}
                </li>
              ))}
            </ul>

            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
