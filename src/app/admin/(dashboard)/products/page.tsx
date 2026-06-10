import { getAllProductsAdmin } from "@/lib/data";
import { ProductsManager } from "@/components/admin/ProductsManager";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Products</h1>
        <p className="text-muted mt-1">Manage product catalog</p>
      </div>
      <ProductsManager products={products} />
    </div>
  );
}
