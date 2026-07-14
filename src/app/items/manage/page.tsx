"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Car } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRouter";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price);

function ManageItemsContent() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyCars = () => {
    if (!user) return;
    setLoading(true);
    api
      .get<Car[]>("/cars/mine/list", user.token)
      .then(setCars)
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchMyCars, [user]);

  const handleDelete = async (id: string) => {
    if (!user || !confirm("Are you sure you want to delete this listing? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/cars/${id}`, user.token);
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  };

  const statusStyles: Record<string, string> = {
    approved: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <div className="container-x py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="section-title">Manage My Listings</h1>
          <p className="section-subtitle">View and manage all the cars you have listed for sale.</p>
        </div>
        <Link href="/items/add" className="btn-primary hidden sm:inline-flex">+ Add New Car</Link>
      </div>

      {loading ? (
        <p className="py-16 text-center text-neutral-500">Loading your listings...</p>
      ) : cars.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 p-16 text-center">
          <p className="text-neutral-600">You haven&apos;t listed any cars yet.</p>
          <Link href="/items/add" className="btn-primary">List Your First Car</Link>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-5 py-3">Car</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Listed On</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {cars.map((car) => (
                <tr key={car._id}>
                  <td className="flex items-center gap-3 px-5 py-4">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image src={car.images[0]} alt={car.title} fill className="object-cover" />
                    </div>
                    <span className="line-clamp-1 font-semibold text-neutral-900">{car.title}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">৳{formatPrice(car.price)}</td>
                  <td className="px-5 py-4 text-neutral-600">{car.location}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[car.status]}`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-neutral-500">
                    {new Date(car.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/cars/${car._id}`} className="btn-outline !px-3 !py-1.5 text-xs">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(car._id)}
                        disabled={deletingId === car._id}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === car._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}