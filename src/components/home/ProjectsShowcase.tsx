"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS, PRODUCT_FILTERS } from "@/lib/constants";

export function ProjectsShowcase() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Built in this lab. By people like you.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === f
                  ? "bg-primary text-black font-semibold"
                  : "border border-border text-muted hover:text-foreground hover:border-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-border bg-surface hover:border-primary/20 transition-colors"
            >
              <span className="text-xs text-primary font-medium">
                {project.category}
              </span>
              <h3 className="font-display font-bold mt-2 mb-2">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
