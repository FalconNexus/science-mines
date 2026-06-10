"use client";

import { motion } from "framer-motion";
import { TECH_AREAS } from "@/lib/constants";

export function TechAreas() {
  return (
    <section id="tech" className="section-padding bg-surface">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Eight disciplines. One playground.
          </h2>
          <p className="text-muted text-lg">
            Explore the technologies powering tomorrow — taught by practitioners,
            built in our lab.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-6 rounded-2xl border border-border bg-black hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{area.icon}</span>
              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {area.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
