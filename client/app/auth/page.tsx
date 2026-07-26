"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  setError("");
  setLoading(true);
  try {
    if (isLogin) {
      const res = await api.post("/auth/login", { email: form.email, password: form.password });
      setUser(res.data.user);
    } else {
      if (form.password !== form.confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }
      const res = await api.post("/auth/signup", { name: form.name, email: form.email, password: form.password });
      setUser(res.data.user);
    }
    router.push("/");
  } catch (err: any) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />

        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          {/* Toggle */}
          <div className="mb-8 flex rounded-full border border-white/10 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${isLogin ? "bg-red-500 text-white" : "text-white/50 hover:text-white"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${!isLogin ? "bg-red-500 text-white" : "text-white/50 hover:text-white"}`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            {isLogin ? "Welcome back." : "Create account."}
          </h2>

          {error && <p className="mb-4 rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>}

          <div className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-red-500 transition"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 rounded-full bg-red-500 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login ↗" : "Sign Up ↗"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white/40">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-400 hover:text-red-300 transition"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </main>
    </>
  );
}