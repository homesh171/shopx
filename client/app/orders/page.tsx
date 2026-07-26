"use client";

import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColor: Record<string, string> = {
    Delivered: "text-green-400 border-green-400/30 bg-green-400/10",
    Processing: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    Cancelled: "text-red-400 border-red-400/30 bg-red-400/10",
  };

  return (
    <>
      <Navbar />
      <main className="relative w-full px-6 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Your Orders</h2>
          {loading ? (
            <p className="text-white/50">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <p className="text-white/50 text-lg">No orders yet.</p>
              <Link href="/products" className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition">
                Shop Now ↗
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full">
              {orders.map((order) => (
                <div key={order._id} className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-sm text-white/40">{new Date(order.createdAt).toDateString()}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mb-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                    {order.items.map((item: any) => (
                      <div key={item._id} className="flex justify-between text-sm">
                        <span className="text-white/60">{item.name} x{item.quantity}</span>
                        <span className="text-white">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm text-white/40">Total</span>
                    <span className="text-lg font-bold text-red-500">£{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}