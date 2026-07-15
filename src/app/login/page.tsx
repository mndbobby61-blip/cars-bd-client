"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: "user" | "admin") => {
    if (role === "admin") {
      setEmail("admin@carsbd.com");
      setPassword("Admin@123");
    } else {
      setEmail("user@carsbd.com");
      setPassword("User@123");
    }
    setErrors({});
  };

  return (
    <div className="container-1200 flex min-h-[75vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
        <p className="mt-1 text-sm text-neutral-500">Login to manage your listings and buy cars.</p>

        {errors.form && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{errors.form}</p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => fillDemo("user")} className="btn-outline !py-2 text-xs">
            Fill Demo User
          </button>
          <button type="button" onClick={() => fillDemo("admin")} className="btn-outline !py-2 text-xs">
            Fill Demo Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">Or continue with google </span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <div className="mt-4">
          <GoogleSignInButton
            onSuccess={() => router.push("/")}
            onError={(msg) => setErrors({ form: msg })}
          />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}