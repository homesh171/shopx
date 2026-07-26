"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export default function ProductCard({ id, name, price, image, category, description }: Product) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);

  const originalPrice = (price * 1.3).toFixed(2);

  return (
    <Link href={`/products/${id}`}>
      <div className="relative rounded-2xl border border-white/10 bg-[#111111] overflow-hidden hover:border-red-500/30 transition group mx-2 cursor-pointer">
        {/* NEW badge */}
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          NEW
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWished(!wished);
          }}
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hover:border-red-500 transition"
        >
          <span className={wished ? "text-red-500" : "text-white"}>♥</span>
        </button>

        {/* Image */}
        <div className="h-[500px] w-full overflow-hidden bg-[#1a1a1a]">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        </div>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pt-24">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          {description && (
            <p className="mt-1 text-sm text-white/50 line-clamp-2">{description}</p>
          )}

          {/* Stars */}
          <div className="mt-2 flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★★★★</span>
            <span className="text-yellow-400/50 text-sm">★</span>
            <span className="text-white/40 text-xs ml-1">(128)</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold text-white">£{price}</span>
            <span className="text-sm text-white/30 line-through">£{originalPrice}</span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-red-500 transition flex-shrink-0"
            >
              🛒
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ id, name, price, image, quantity: 1 });
              }}
              className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}