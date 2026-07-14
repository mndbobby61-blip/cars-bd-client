"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Car } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRouter";

interface Stats {
  totalCars: number;
  totalUsers: number;
  pendingCars: number;
  approvedCars: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price);

function AdminContent() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"overview" | "listings" | "users">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [s, c, u] = await Promise.all([
        api.get<Stats>("/admin/stats", user.token),
        api.get<Car[]>("/admin/cars", user.token),
        api.get<AdminUser[]>("/admin/users", user.token),
      ]);
      setStats(s);
      setCars(c);
      setUsers(u);
    } catch {
      // silently fail; UI shows empty states
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, [user]);

  const handleDeleteCar = async (id: string) => {
    if (!user || !confirm("Remove this listing from the platform?")) return;
    try {
      await api.delete(`/cars/${id}`, user.token);
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete listing");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!user || !confirm("Remove this user account? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${id}`, user.token);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "listings", label: "All Listings" },
    { id: "users", label: "All Users" },
  ] as const;

  return (
    <div className="container-x py-10">
      <h1 className="section-title">Admin Dashboard</h1>
      <p className="section-subtitle">Monitor platform activity and manage listings and users.</p>

      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition ${
              tab === t.id ? "border-b-2 border-primary text-primary" : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-16 text-center text-neutral-500">Loading dashboard data...</p>
      ) : (
        <div className="mt-8">
          {tab === "overview" && stats && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Listings", value: stats.totalCars },
                { label: "Total Users", value: stats.totalUsers },
                { label: "Approved Listings", value: stats.approvedCars },
                { label: "Pending Listings", value: stats.pendingCars },
              ].map((s) => (
                <div key={s.label} className="card p-6">
                  <p className="text-sm text-neutral-500">{s.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-primary">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "listings" && (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
                  <tr>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Seller</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {cars.map((c) => (
                    <tr key={c._id}>
                      <td className="px-5 py-4 font-semibold text-neutral-900">{c.title}</td>
                      <td className="px-5 py-4 text-neutral-600">
                        {typeof c.seller === "object" ? c.seller.name : "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-primary">৳{formatPrice(c.price)}</td>
                      <td className="px-5 py-4 capitalize text-neutral-600">{c.status}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCar(c._id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "users" && (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="px-5 py-4 font-semibold text-neutral-900">{u.name}</td>
                      <td className="px-5 py-4 text-neutral-600">{u.email}</td>
                      <td className="px-5 py-4 capitalize text-neutral-600">{u.role}</td>
                      <td className="px-5 py-4 text-right">
                        {u.role !== "admin" && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}