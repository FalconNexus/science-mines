"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/types/database";
import type { Product } from "@/types/database";

export function ProductsManager({ products }: { products: Product[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function openCreate() {
    setEditing(null);
    setFormKey((k) => k + 1);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setFormKey((k) => k + 1);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (editing) {
        await updateProduct(editing.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowForm(false);
      setEditing(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted text-sm">{products.length} products</p>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </div>

      {showForm && (
        <form
          key={formKey}
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-2xl border border-border bg-surface space-y-4"
        >
          <h3 className="font-semibold">
            {editing ? "Edit Product" : "New Product"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Name"
              required
              defaultValue={editing?.name}
            />
            <Input
              name="price"
              label="Price (INR)"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={editing?.price}
            />
            <Select
              name="category"
              label="Category"
              defaultValue={editing?.category || PRODUCT_CATEGORIES[0]}
              options={PRODUCT_CATEGORIES.map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </div>
          <ImageUploadField
            bucket="product-images"
            defaultUrl={editing?.image_url}
            label="Product Image (upload)"
          />
          <Textarea
            name="description"
            label="Description"
            defaultValue={editing?.description || ""}
          />
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {products.length === 0 && !showForm ? (
        <div className="text-center py-16 border border-border rounded-2xl">
          <p className="text-muted mb-4">No products yet.</p>
          <Button size="sm" onClick={openCreate}>
            Add your first product
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
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
              <div className="p-4">
                <span className="text-xs text-primary">{product.category}</span>
                <h3 className="font-semibold mt-1 mb-1">{product.name}</h3>
                <p className="text-primary font-bold mb-3">
                  {formatPrice(product.price)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-border text-xs hover:border-primary/30"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-2 py-2 rounded-lg border border-border text-red-400 hover:border-red-400/30"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
