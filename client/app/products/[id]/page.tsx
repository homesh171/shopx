import Navbar from "@/components/layout/Navbar";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string) {
  const res = await fetch(`https://shopx-server-pk50.onrender.com/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex h-[90vh] items-center justify-center">
          <p className="text-white/50 text-lg">Product not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative w-full px-6 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-6">
              <span className="text-xs font-medium tracking-widest text-red-400 uppercase">{product.category}</span>
              <h1 className="text-4xl font-bold text-white">{product.name}</h1>
              <p className="text-white/50 text-base leading-relaxed">{product.description}</p>
              <p className="text-3xl font-bold text-red-500">£{product.price}</p>
              <p className="text-sm text-white/30">Stock: {product.stock}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}