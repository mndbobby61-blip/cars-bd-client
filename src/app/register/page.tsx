"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (confirmPassword !== password) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await register(name, email, password, phone);
      router.push("/");
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x flex min-h-[75vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-neutral-900">Create Your Account</h1>
        <p className="mt-1 text-sm text-neutral-500">Join AutoBazaar BD to buy or sell cars.</p>

        {errors.form && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{errors.form}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Rahim Uddin" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Phone Number (optional)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+8801XXXXXXXXX" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" placeholder="••••••••" />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">Or continue with google</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <div className="mt-4">
          <GoogleSignInButton
            text="signup_with"
            onSuccess={() => router.push("/")}
            onError={(msg) => setErrors({ form: msg })}
          />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}