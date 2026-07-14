"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Car, Review } from "@/lib/types";
import CarCard from "@/components/CarCard";
import CarCardSkeleton from "@/components/CarCardSkeleton";


const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price);

export default function CarDetailsPage() {
    const params = useParams();
    const { user } = useAuth();
    const id = params?.id as string;

    const [car, setCar] = useState<Car | null>(null);
    const [related, setRelated] = useState<Car[]>([]);
    const [activeImage, setActiveImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isFavorited, setIsFavorited] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingAmount, setBookingAmount] = useState("");
    const [moveInDate, setMoveInDate] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [notes, setNotes] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);
const [reviewRating, setReviewRating] = useState(5);
const [reviewComment, setReviewComment] = useState("");
const [reviewLoading, setReviewLoading] = useState(false);
const [reviewError, setReviewError] = useState("");

    useEffect(() => {
  if (!id) return;
  setLoading(true);
  Promise.all([
    api.get<Car>(`/cars/${id}`),
    api.get<Car[]>(`/cars/${id}/related`).catch(() => []),
    api.get<Review[]>(`/reviews/${id}`).catch(() => []),
  ])
    .then(([carData, relatedData, reviewData]) => {
      setCar(carData);
      setRelated(relatedData);
      setReviews(reviewData);
    })
    .catch(() => setError("This car listing could not be found."))
    .finally(() => setLoading(false));
}, [id]);



const handleReviewSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) {
    window.location.href = "/login";
    return;
  }
  setReviewLoading(true);
  setReviewError("");
  try {
    const newReview = await api.post<Review>(
      "/reviews",
      { carId: id, rating: reviewRating, comment: reviewComment },
      user.token
    );
    setReviews((prev) => [newReview, ...prev]);
    setReviewComment("");
    setReviewRating(5);
  } catch (err) {
    setReviewError(err instanceof Error ? err.message : "Failed to submit review");
  } finally {
    setReviewLoading(false);
  }
};
    const toggleFavorite = async () => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        setFavLoading(true);
        try {
            const result = await api.post<{ favorited: boolean }>(`/favorites/${id}`, {}, user.token);
            setIsFavorited(result.favorited);
        } catch {
            // silently ignore
        } finally {
            setFavLoading(false);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            window.location.href = "/login";
            return;
        }
        setBookingLoading(true);
        setBookingError("");
        try {
            await api.post("/bookings", {
                carId: id,
                amount: Number(bookingAmount),
                moveInDate,
                contactNumber,
                notes,
            }, user.token);
            setBookingSuccess(true);
        } catch (err) {
            setBookingError(err instanceof Error ? err.message : "Failed to submit booking request");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container-1200 py-16">
                <div className="h-96 animate-pulse rounded-card bg-neutral-200" />
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="container-1200 py-24 text-center">
                <h2 className="text-2xl font-bold text-neutral-900">Listing Not Found</h2>
                <p className="mt-2 text-neutral-600">{error || "This car may have been removed."}</p>
                <Link href="/cars" className="btn-primary mt-6 inline-flex">Back to Explore</Link>
            </div>
        );
    }

    const seller = typeof car.seller === "object" ? car.seller : null;

    return (
        <div className="container-1200 py-10">
            <nav className="mb-6 text-sm text-neutral-500">
                <Link href="/cars" className="hover:text-primary">Explore</Link> / <span className="text-neutral-800">{car.title}</span>
            </nav>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* MEDIA + DETAILS */}
                <div className="lg:col-span-2">
                    <div className="relative h-80 w-full overflow-hidden rounded-card bg-neutral-100 sm:h-96">
                        <Image src={car.images[activeImage]} alt={car.title} fill className="object-cover" priority />
                        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                            {car.condition}
                        </span>
                        <button
                            onClick={toggleFavorite}
                            disabled={favLoading}
                            aria-label="Add to favorites"
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-105 disabled:opacity-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill={isFavorited ? "#F59E0B" : "none"}
                                stroke={isFavorited ? "#F59E0B" : "#334155"}
                                strokeWidth="1.75"
                            >
                                <path d="M12 21s-7.5-4.6-10-9.3C0.3 8 2 4.5 5.6 4c2-.3 3.8.6 4.9 2.2C11.6 4.6 13.4 3.7 15.4 4c3.6.5 5.3 4 3.6 7.7C16.5 16.4 12 21 12 21Z" />
                            </svg>
                        </button>
                    </div>

                    {car.images.length > 1 && (
                        <div className="mt-3 flex gap-3 overflow-x-auto">
                            {car.images.map((img, i) => (
                                <button
                                    key={img + i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${activeImage === i ? "border-primary" : "border-transparent"
                                        }`}
                                >
                                    <Image src={img} alt={`${car.title} ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{car.title}</h1>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                        <span>📍 {car.location}</span>
                        <span className="flex items-center gap-1">
                            {"★".repeat(Math.round(car.rating))}
                            {"☆".repeat(5 - Math.round(car.rating))}
                            <span className="ml-1 font-semibold text-neutral-700">{car.rating.toFixed(1)}</span>
                        </span>
                        <span>Posted {new Date(car.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold text-neutral-900">Description / Overview</h2>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{car.fullDescription}</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold text-neutral-900">Key Information / Specifications</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 rounded-card border border-neutral-200 p-5 sm:grid-cols-3">
                            {[
                                ["Brand", car.brand],
                                ["Model", car.carModel],
                                ["Year", car.year],
                                ["Mileage", `${car.mileage.toLocaleString()} km`],
                                ["Fuel Type", car.fuelType],
                                ["Transmission", car.transmission],
                            ].map(([label, value]) => (
                                <div key={label as string}>
                                    <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
                                    <p className="mt-1 text-sm font-semibold text-neutral-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8">
  <h2 className="text-lg font-bold text-neutral-900">Reviews &amp; Ratings</h2>

  <div className="mt-4 flex items-center gap-4 rounded-card border border-neutral-200 p-5">
    <span className="text-3xl font-extrabold text-primary">{car.rating.toFixed(1)}</span>
    <div>
      <div className="flex text-accent">
        {"★".repeat(Math.round(car.rating))}
        {"☆".repeat(5 - Math.round(car.rating))}
      </div>
      <p className="mt-1 text-xs text-neutral-500">Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
    </div>
  </div>

  {/* Review Form */}
  <div className="mt-5 rounded-card border border-neutral-200 p-5">
    <h3 className="text-sm font-bold text-neutral-900">Write a Review</h3>
    {reviewError && (
      <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{reviewError}</p>
    )}
    <form onSubmit={handleReviewSubmit} className="mt-3 space-y-3">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-neutral-700">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setReviewRating(star)}
              className={`text-2xl ${star <= reviewRating ? "text-accent" : "text-neutral-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-neutral-700">Comment</label>
        <textarea
          required
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          className="input-field min-h-[80px]"
          placeholder="Share your experience with this car or seller"
        />
      </div>
      <button type="submit" disabled={reviewLoading} className="btn-primary !px-5 !py-2 text-sm">
        {reviewLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  </div>

  {/* Review List */}
  <div className="mt-5 space-y-4">
    {reviews.length === 0 ? (
      <p className="text-sm text-neutral-500">No reviews yet. Be the first to review this car.</p>
    ) : (
      reviews.map((r) => (
        <div key={r._id} className="rounded-card border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-neutral-900">{r.userName}</p>
            <span className="text-xs text-neutral-400">
              {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <p className="text-xs text-neutral-500">{r.userEmail}</p>
          <div className="mt-1 flex text-accent text-sm">
            {"★".repeat(r.rating)}
            {"☆".repeat(5 - r.rating)}
          </div>
          <p className="mt-2 text-sm text-neutral-600">{r.comment}</p>
        </div>
      ))
    )}
  </div>
</section>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-1">
                    <div className="card sticky top-24 p-6">
                        <p className="text-sm text-neutral-500">Asking Price</p>
                        <p className="text-3xl font-extrabold text-primary">৳{formatPrice(car.price)}</p>

                        <div className="mt-6 border-t border-neutral-100 pt-6">
                            <p className="text-xs uppercase tracking-wide text-neutral-400">Seller Information</p>
                            <p className="mt-2 font-semibold text-neutral-900">{seller?.name || "CarsBD Seller"}</p>
                            <p className="text-sm text-neutral-500">{seller?.email}</p>
                            {seller?.phone && <p className="text-sm text-neutral-500">{seller.phone}</p>}
                        </div>

                        <button onClick={() => setShowBookingModal(true)} className="btn-primary mt-6 w-full">
                            Buy This Car
                        </button>
                        <a href={`mailto:${seller?.email || ""}`} className="btn-outline mt-3 w-full">
                            Contact Seller
                        </a>
                        <a href={`tel:${seller?.phone || ""}`} className="btn-outline mt-3 w-full">
                            Call Now
                        </a>
                    </div>
                </div>
            </div>

            {/* RELATED ITEMS */}
            <section className="mt-14">
                <h2 className="section-title">Related Cars</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {related.length > 0
                        ? related.map((c) => <CarCard key={c._id} car={c} />)
                        : Array.from({ length: 4 }).map((_, i) => <CarCardSkeleton key={i} />)}
                </div>
            </section>

            {/* BOOKING MODAL */}
            {showBookingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        {bookingSuccess ? (
                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl">✓</div>
                                <h3 className="mt-4 text-lg font-bold text-neutral-900">Booking Request Sent</h3>
                                <p className="mt-2 text-sm text-neutral-500">
                                    The seller will review your request and respond soon. You can check the status from your dashboard.
                                </p>
                                <button
                                    onClick={() => { setShowBookingModal(false); setBookingSuccess(false); setBookingAmount(""); }}
                                    className="btn-primary mt-6 w-full"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-neutral-900">Book This Car</h3>
                                <p className="mt-1 text-sm text-neutral-500">
                                    Submit a booking amount to reserve <span className="font-semibold">{car.title}</span>. The seller will approve or reject your request.
                                </p>

                                {bookingError && (
                                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{bookingError}</p>
                                )}

                                <form onSubmit={handleBooking} className="mt-4 space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Booking Amount (৳)</label>
                                        <input
                                            type="number"
                                            required
                                            min={1}
                                            value={bookingAmount}
                                            onChange={(e) => setBookingAmount(e.target.value)}
                                            className="input-field"
                                            placeholder="e.g. 50000"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Move-in / Pickup Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={moveInDate}
                                            onChange={(e) => setMoveInDate(e.target.value)}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Contact Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            className="input-field"
                                            placeholder="+8801XXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">Additional Notes (optional)</label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="input-field min-h-[80px]"
                                            placeholder="Any special request or note for the seller"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setShowBookingModal(false)} className="btn-outline w-full">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={bookingLoading} className="btn-primary w-full">
                                            {bookingLoading ? "Submitting..." : "Continue to Payment"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}