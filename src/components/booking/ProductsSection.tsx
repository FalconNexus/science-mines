"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { PRODUCT_CATEGORIES } from "@/types/database";
import type { Product, ProductCategory } from "@/types/database";

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [category, setCategory] = useState<ProductCategory | "All">("All");

  const filtered =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <section id="products" className="section-padding bg-black">
      <div className="container-wide px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Store
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            All Products
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <CategoryPill
            label="All"
            active={category === "All"}
            onClick={() => setCategory("All")}
          />
          {PRODUCT_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted text-center py-12">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
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
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary">{product.category}</span>
                  <h3 className="font-semibold mt-1 mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-muted text-xs mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <p className="text-primary font-bold mb-4">
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
        )}
      </div>
    </section>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all ${
        active
          ? "bg-primary text-black font-semibold"
          : "border border-border text-muted hover:text-foreground hover:border-primary/30"
      }`}
    >
      {label}
    </button>
  );
}
