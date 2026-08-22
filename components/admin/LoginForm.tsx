"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login gagal.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root flex min-h-screen items-center justify-center bg-[#F3F2EE] px-4">
      <div className="w-full max-w-md rounded-3xl border border-charcoal/8 bg-cream p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex justify-center">
            <BrandLogo variant="framed" className="h-14" priority />
          </div>
          <h1 className="font-serif text-2xl text-charcoal">Admin Login</h1>
          <p className="mt-2 text-sm text-charcoal/50">
            Content Manager
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/45">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-sage/50"
              placeholder="Masukkan password admin"
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-charcoal px-4 py-3 text-sm font-medium text-cream transition hover:bg-charcoal/90 disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
