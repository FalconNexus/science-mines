"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/database";

interface ProductsPreviewProps {
  products: Product[];
}

function matchesFilter(product: Product, filter: string): boolean {
  if (filter === "All") return true;
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  const desc = (product.description || "").toLowerCase();

  switch (filter) {
    case "AI":
      return cat.includes("ai") || name.includes("ai") || desc.includes("ai");
    case "Robotics":
      return cat.includes("robot") || name.includes("robot");
    case "Electronics":
      return (
        cat.includes("electronic") ||
        cat.includes("arduino") ||
        cat.includes("esp32") ||
        cat.includes("sensor") ||
        cat.includes("module")
      );
    case "IoT":
      return (
        cat.includes("esp32") ||
        name.includes("iot") ||
        desc.includes("iot")
      );
    case "3D Printing":
      return name.includes("print") || desc.includes("print");
    default:
      return true;
  }
}

const FILTERS = ["All", "AI", "Robotics", "Electronics", "IoT", "3D Printing"];

export function ProductsPreview({ products }: ProductsPreviewProps) {
  const [filter, setFilter] = useState("All");
  const filtered = products.filter((p) => matchesFilter(p, filter));

  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-black border-t border-border">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Shop Components
          </h2>
          <p className="text-muted">
            Curated parts and kits — order on WhatsApp for pickup.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === f
                  ? "bg-primary text-black font-semibold"
                  : "border border-border text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <div className="relative aspect-square bg-black">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                    {product.name}
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-primary">{product.category}</span>
                <h3 className="font-semibold mt-1 mb-2">{product.name}</h3>
                <p className="text-primary font-bold mb-3">
                  {formatPrice(product.price)}
                </p>
                <a
                  href={generateWhatsAppOrderUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 rounded-full bg-primary text-black text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/booking#products"
            className="text-primary hover:text-secondary text-sm font-semibold transition-colors"
          >
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
