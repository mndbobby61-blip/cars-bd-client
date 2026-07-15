"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Booking } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRouter";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price);

function BookingRequestsContent() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);

  const fetchBookings = () => {
    if (!user) return;
    setLoading(true);
    api
      .get<Booking[]>("/bookings/seller", user.token)
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchBookings, [user]);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    if (!user) return;
    setActioningId(id);
    try {
      await api.put(`/bookings/${id}/status`, { status }, user.token);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update booking");
    } finally {
      setActioningId(null);
    }
  };

  const statusStyles: Record<string, string> = {
    approved: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <div className="container-1200 py-10">
      <h1 className="section-title">Booking Requests</h1>
      <p className="section-subtitle">Review and respond to booking requests for your car listings.</p>

      {loading ? (
        <p className="mt-10 py-16 text-center text-neutral-500">Loading booking requests...</p>
      ) : bookings.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-2 p-16 text-center">
          <p className="text-neutral-600">No booking requests yet.</p>
          <p className="text-sm text-neutral-400">When a buyer books one of your cars, it will show up here.</p>
        </div>
      ) : (
        <div className="card mt-8 overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-5 py-3">Car</th>
                <th className="px-5 py-3">Buyer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Move-in Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="flex items-center gap-3 px-5 py-4">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      {b.car?.images?.[0] && (
                        <Image src={b.car.images[0]} alt={b.car.title} fill className="object-cover" />
                      )}
                    </div>
                    <span className="line-clamp-1 font-semibold text-neutral-900">{b.car?.title}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-neutral-800">{b.buyer?.name}</p>
                    <p className="text-xs text-neutral-500">{b.buyer?.email}</p>
                    <p className="text-xs text-neutral-500">{b.contactNumber}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">৳{formatPrice(b.amount)}</td>
                  <td className="px-5 py-4 text-neutral-600">
                    {new Date(b.moveInDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {b.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAction(b._id, "approved")}
                          disabled={actioningId === b._id}
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(b._id, "rejected")}
                          disabled={actioningId === b._id}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="text-right text-xs text-neutral-400">No action needed</p>
                    )}
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

export default function BookingRequestsPage() {
  return (
    <ProtectedRoute>
      <BookingRequestsContent />
    </ProtectedRoute>
  );
}