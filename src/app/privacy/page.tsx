"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">
          Have a question about buying or selling a car? Our team is happy to help.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-bold text-neutral-900">Contact Details</h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600">
            <li>📍 House 12, Road 5, Gulshan-1, Dhaka 1212</li>
            <li>📞 +880 1700-000000</li>
            <li>✉️ support@autobazaar.com.bd</li>
            <li>🕒 Saturday - Thursday, 10:00 AM - 8:00 PM</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6" noValidate>
          {sent && (
            <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
              Thanks for reaching out! We&apos;ll get back to you shortly.
            </p>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Your Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your full name" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Email Address</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field min-h-[100px]" placeholder="How can we help you?" />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}