"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => addItem({ id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 })}
        className="flex-1 rounded-full bg-red-500 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition"
      >
        Add to Cart
      </button>
      <button className="flex-1 rounded-full border border-white/20 py-3 text-sm font-semibold text-white/70 hover:border-red-500 hover:text-white transition">
        Buy Now
      </button>
    </div>
  );
}