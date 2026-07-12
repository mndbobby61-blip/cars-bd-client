"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Car, CarListResponse } from "@/lib/types";
import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";

const conditions = ["New", "Used"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function CarsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [brands, setBrands] = useState<string[]>([]);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");
  const [fuelType, setFuelType] = useState(searchParams.get("fuelType") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    api.get<string[]>("/cars/brands/list").then(setBrands).catch(() => setBrands([]));
  }, []);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (brand) params.set("brand", brand);
    if (condition) params.set("condition", condition);
    if (fuelType) params.set("fuelType", fuelType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "8");

    try {
      const data = await api.get<CarListResponse>(`/cars?${params.toString()}`);
      setCars(data.cars);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [search, brand, condition, fuelType, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    fetchCars();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (brand) params.set("brand", brand);
    if (condition) params.set("condition", condition);
    if (fuelType) params.set("fuelType", fuelType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("sort", sort);
    params.set("page", String(page));
    router.replace(`/cars?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCars]);

  const resetFilters = () => {
    setSearch("");
    setBrand("");
    setCondition("");
    setFuelType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="container-x py-10">
      <div className="mb-8">
        <h1 className="section-title">Explore Cars</h1>
        <p className="section-subtitle">{total} listings available across Bangladesh</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* FILTER SIDEBAR */}
        <aside className="card h-fit space-y-5 p-5 lg:col-span-1">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Search</label>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Brand, model, location..."
              className="input-field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Brand</label>
            <select value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }} className="input-field">
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Condition</label>
            <select value={condition} onChange={(e) => { setCondition(e.target.value); setPage(1); }} className="input-field">
              <option value="">Any Condition</option>
              {conditions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Fuel Type</label>
            <select value={fuelType} onChange={(e) => { setFuelType(e.target.value); setPage(1); }} className="input-field">
              <option value="">Any Fuel Type</option>
              {fuelTypes.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Price Range (৳)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                placeholder="Min"
                className="input-field"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                placeholder="Max"
                className="input-field"
              />
            </div>
          </div>

          <button onClick={resetFilters} className="btn-outline w-full">
            Reset Filters
          </button>
        </aside>

        {/* RESULTS */}
        <div className="lg:col-span-3">
          <div className="mb-5 flex items-center justify-end">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="input-field w-auto"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <CarCardSkeleton key={i} />)
              : cars.length > 0
              ? cars.map((car) => <CarCard key={car._id} car={car} />)
              : (
                <p className="col-span-full py-16 text-center text-neutral-500">
                  No cars matched your search. Try adjusting the filters.
                </p>
              )}
          </div>

          {pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn-outline !px-3 !py-1.5 text-xs disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                    page === i + 1 ? "bg-primary text-white" : "border border-neutral-200 text-neutral-600 hover:border-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="btn-outline !px-3 !py-1.5 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="container-x py-20 text-center text-neutral-500">Loading...</div>}>
      <CarsPageContent />
    </Suspense>
  );
}