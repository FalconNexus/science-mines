"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";

export function PillarsSection() {
  return (
    <section id="pillars" className="section-padding bg-black">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            One lab. Four ways to build the future.
          </h2>
          <p className="text-muted text-lg">
            Whether you&apos;re learning your first sensor or prototyping a
            product, ScienceMines meets you exactly where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={pillar.href}
                className="block h-full p-8 rounded-2xl border border-border bg-surface hover:border-primary/25 transition-all duration-300 group"
              >
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs border border-border text-muted bg-black/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
