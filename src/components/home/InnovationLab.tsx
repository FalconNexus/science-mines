"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LAB_ZONES } from "@/lib/constants";
import type { GalleryImage } from "@/types/database";

interface InnovationLabProps {
  images: GalleryImage[];
}

export function InnovationLab({ images }: InnovationLabProps) {
  const displayImages = images.slice(0, 6);

  return (
    <section id="innovation-lab" className="section-padding bg-black">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Step inside a working innovation lab.
          </h2>
          <p className="text-muted text-lg">
            Every zone designed for hands-on building — from first prototype to
            production-ready device.
          </p>
        </motion.div>

        {displayImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {displayImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border"
              >
                <Image
                  src={img.image_url}
                  alt={img.alt_text || "Lab gallery"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAB_ZONES.map((zone, i) => (
            <motion.div
              key={zone.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border bg-surface"
            >
              <div className="w-8 h-0.5 bg-primary rounded-full mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">
                {zone.title}
              </h3>
              <p className="text-muted text-sm">{zone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
