"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

interface FormState {
  title: string;
  brand: string;
  carModel: string;
  year: string;
  price: string;
  condition: "New" | "Used";
  fuelType: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  mileage: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
}

const initialState: FormState = {
  title: "",
  brand: "",
  carModel: "",
  year: "",
  price: "",
  condition: "Used",
  fuelType: "Petrol",
  transmission: "Manual",
  mileage: "",
  location: "",
  shortDescription: "",
  fullDescription: "",
  imageUrl: "",
};

function AddItemForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.carModel.trim()) e.carModel = "Model is required";
    if (!form.year || Number(form.year) < 1980 || Number(form.year) > new Date().getFullYear() + 1)
      e.year = "Enter a valid manufacturing year";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.shortDescription.trim() || form.shortDescription.length > 200)
      e.shortDescription = "Short description is required (max 200 characters)";
    if (!form.fullDescription.trim()) e.fullDescription = "Full description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post(
        "/cars",
        {
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage) || 0,
          images: form.imageUrl ? [form.imageUrl] : [],
        },
        user?.token
      );
      setSuccess(true);
      setForm(initialState);
      setTimeout(() => router.push("/items/manage"), 1200);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Failed to add listing" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x max-w-3xl py-12">
      <h1 className="section-title">List Your Car for Sale</h1>
      <p className="section-subtitle">Fill in accurate details to attract genuine buyers quickly.</p>

      {success && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Listing added successfully! Redirecting to your listings...
        </p>
      )}
      {errors.form && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{errors.form}</p>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Listing Title</label>
          <input value={form.title} onChange={(e) => update("title", e.target.value)} className="input-field" placeholder="e.g. Toyota Premio 2018 - Excellent Condition" />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Brand</label>
            <input value={form.brand} onChange={(e) => update("brand", e.target.value)} className="input-field" placeholder="Toyota" />
            {errors.brand && <p className="mt-1 text-xs text-red-600">{errors.brand}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Model</label>
            <input value={form.carModel} onChange={(e) => update("carModel", e.target.value)} className="input-field" placeholder="Premio" />
            {errors.carModel && <p className="mt-1 text-xs text-red-600">{errors.carModel}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Manufacturing Year</label>
            <input type="number" value={form.year} onChange={(e) => update("year", e.target.value)} className="input-field" placeholder="2018" />
            {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Price (৳)</label>
            <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-field" placeholder="2650000" />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Mileage (km)</label>
            <input type="number" value={form.mileage} onChange={(e) => update("mileage", e.target.value)} className="input-field" placeholder="42000" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Condition</label>
            <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className="input-field">
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Fuel Type</label>
            <select value={form.fuelType} onChange={(e) => update("fuelType", e.target.value)} className="input-field">
              {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Transmission</label>
            <select value={form.transmission} onChange={(e) => update("transmission", e.target.value)} className="input-field">
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Location</label>
          <input value={form.location} onChange={(e) => update("location", e.target.value)} className="input-field" placeholder="Gulshan, Dhaka" />
          {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Short Description</label>
          <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="input-field" placeholder="One-line summary (max 200 characters)" maxLength={200} />
          {errors.shortDescription && <p className="mt-1 text-xs text-red-600">{errors.shortDescription}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Full Description</label>
          <textarea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} className="input-field min-h-[120px]" placeholder="Describe the car's condition, history, and features in detail" />
          {errors.fullDescription && <p className="mt-1 text-xs text-red-600">{errors.fullDescription}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Image URL (optional)</label>
          <input value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className="input-field" placeholder="https://example.com/car-photo.jpg" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Submitting..." : "Submit Listing"}
          </button>
          <button type="button" onClick={() => setForm(initialState)} className="btn-outline">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}