"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (adminOnly && user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, adminOnly, router]);

  if (loading || !user || (adminOnly && user.role !== "admin")) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}