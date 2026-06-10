"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SCHOOL_SERVICES } from "@/lib/constants";

export function SchoolPartnerships() {
  return (
    <section id="schools" className="section-padding bg-surface">
      <div className="container-wide px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Build future-ready innovation labs.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              We partner with schools and institutions to design, equip and run
              innovation labs that actually get used — from infrastructure to
              teacher training to ongoing programs.
            </p>
            <Link
              href="#contact"
              className="inline-flex px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-secondary transition-colors"
            >
              Schedule Consultation
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {SCHOOL_SERVICES.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-black"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
