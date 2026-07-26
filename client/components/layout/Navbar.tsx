"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <nav className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Shop<span className="text-red-500">X.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium tracking-widest text-white/70 md:flex uppercase">
          <li><Link href="/" className="hover:text-white transition">Home</Link></li>
          <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
          {user && <li><Link href="/orders" className="hover:text-white transition">Orders</Link></li>}
        </ul>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-white/70 hover:text-white transition">
            🛒 Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">{count}</span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50">Hi, {user.name}</span>
              <button onClick={logout} className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/70 hover:border-red-500 hover:text-white transition">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="rounded-full border border-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 transition">
              Login ↗
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}