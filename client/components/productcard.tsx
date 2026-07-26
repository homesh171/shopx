"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: Product) {
  const { addItem } = useCart();

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-red-500/50 transition">
      <img src={image} alt={name} className="h-52 w-full rounded-t-xl object-cover opacity-90" />
      <div className="p-4">
        <span className="text-xs font-medium tracking-widest text-red-400 uppercase">{category}</span>
        <h3 className="mt-1 text-lg font-semibold text-white">{name}</h3>
        <p className="mt-1 text-xl font-bold text-red-500">£{price}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addItem({ id, name, price, image, quantity: 1 })}
            className="flex-1 rounded-full bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
          >
            Add to Cart
          </button>
          <Link href={`/products/${id}`} className="flex-1 rounded-full border border-white/20 py-2 text-center text-sm font-semibold text-white/70 hover:border-red-500 hover:text-white transition">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}