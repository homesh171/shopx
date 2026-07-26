"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const { items, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "", city: "", postcode: "", phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      await api.post("/orders", {
        items: items.map((i) => ({ product: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total,
        shippingAddress: form,
      });
      router.push("/orders");
    } catch (err) {
      alert("Please login to place an order");
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative w-full px-6 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-white">Checkout</h2>

          {/* Steps */}
          <div className="mb-10 flex items-center gap-4">
            {["Shipping", "Payment", "Review"].map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${step === i + 1 ? "bg-red-500 text-white" : step > i + 1 ? "bg-red-500/30 text-red-400" : "border border-white/20 text-white/30"}`}>
                  {i + 1}
                </div>
                <span className={`text-sm font-medium ${step === i + 1 ? "text-white" : "text-white/30"}`}>{s}</span>
                {i < 2 && <div className="h-px w-10 bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-6 text-lg font-bold text-white">Shipping Details</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                      <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    </div>
                    <input name="address" value={form.address} onChange={handleChange} type="text" placeholder="Address" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    <div className="grid grid-cols-2 gap-4">
                      <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="City" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                      <input name="postcode" value={form.postcode} onChange={handleChange} type="text" placeholder="Postcode" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    </div>
                    <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone Number" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                  </div>
                  <button onClick={() => setStep(2)} className="mt-6 rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition">
                    Continue ↗
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-6 text-lg font-bold text-white">Payment Details</h3>
                  <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Cardholder Name" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    <input type="text" placeholder="Card Number" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM / YY" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                      <input type="text" placeholder="CVV" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition" />
                    </div>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button onClick={() => setStep(1)} className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/70 hover:border-red-500 hover:text-white transition">Back</button>
                    <button onClick={() => setStep(3)} className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition">Continue ↗</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-6 text-lg font-bold text-white">Review Order</h3>
                  <div className="flex flex-col gap-3 text-sm text-white/50 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="text-white">£{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="my-2 border-t border-white/10" />
                    <div className="flex justify-between text-base font-bold text-white">
                      <span>Total</span><span className="text-red-500">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/70 hover:border-red-500 hover:text-white transition">Back</button>
                    <button onClick={placeOrder} disabled={loading} className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition disabled:opacity-50">
                      {loading ? "Placing..." : "Place Order ↗"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-fit">
              <h3 className="mb-6 text-xl font-bold text-white">Order Summary</h3>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="text-white">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="my-2 border-t border-white/10" />
                <div className="flex justify-between"><span>Shipping</span><span className="text-white">Free</span></div>
                <div className="flex justify-between text-base font-bold text-white">
                  <span>Total</span><span className="text-red-500">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}