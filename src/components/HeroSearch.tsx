"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/cars?search=${encodeURIComponent(query)}` : "/cars");
  };

  return (
    <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-xl gap-2 rounded-xl bg-white p-2 shadow-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by brand, model, or location..."
        className="w-full rounded-lg border-0 px-4 py-2.5 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-primary-100"
      />
      <button type="submit" className="btn-primary shrink-0">
        Search
      </button>
    </form>
  );
}