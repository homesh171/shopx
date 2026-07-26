"use client";

import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      <Navbar />
      <main className="relative w-full px-6 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Your Cart</h2>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <p className="text-white/50 text-lg">Your cart is empty.</p>
              <Link href="/products" className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition">
                Shop Now ↗
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="flex flex-col gap-4 lg:col-span-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-red-500 font-bold">£{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="h-8 w-8 rounded-full border border-white/10 text-white hover:border-red-500 transition">-</button>
                      <span className="w-6 text-center text-white">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="h-8 w-8 rounded-full border border-white/10 text-white hover:border-red-500 transition">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-500 transition text-lg">✕</button>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-fit">
                <h3 className="mb-6 text-xl font-bold text-white">Order Summary</h3>
                <div className="flex flex-col gap-3 text-sm text-white/50">
                  <div className="flex justify-between"><span>Subtotal</span><span className="text-white">£{total.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="text-white">Free</span></div>
                  <div className="my-2 border-t border-white/10" />
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Total</span><span className="text-red-500">£{total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="mt-6 block rounded-full bg-red-500 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition">
                  Checkout ↗
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}