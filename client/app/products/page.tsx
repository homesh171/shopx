import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/productcard";

async function getProducts() {
  const res = await fetch("https://shopx-server-pk50.onrender.com/api/products", { cache: "no-store" });
  return res.json();
}

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="relative w-full px-6 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">All Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((p: any) => (
              <ProductCard key={p._id} id={p._id} name={p.name} price={p.price} image={p.image} category={p.category} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}