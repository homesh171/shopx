import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex h-[90vh] flex-col items-center justify-center gap-6 overflow-hidden">
        {/* Red glow */}
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />

        <span className="rounded-full border border-red-500/40 px-4 py-1 text-xs tracking-widest text-red-400 uppercase">
          ● New Arrivals Available
        </span>
        <h1 className="text-center text-6xl font-bold leading-tight text-white">
          Welcome to <span className="text-red-500">ShopX.</span>
        </h1>
        <p className="text-center text-lg text-white/50">
          Premium products, delivered to your door.
        </p>
        <Link
          href="/products"
          className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition"
        >
          Shop Now ↗
        </Link>
      </main>
    </>
  );
}