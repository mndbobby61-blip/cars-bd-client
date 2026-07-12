import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
// import CarCard from "@/components/CarCard";
import StatsCounter from "@/components/StatsCounter";
// import { Car, CarListResponse } from "@/lib/types";

async function getFeaturedCars(): Promise<Car[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/cars?sort=rating&limit=8`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data: CarListResponse = await res.json();
    return data.cars;
  } catch {
    return [];
  }
}

/* ---------- Icon components ---------- */
function SedanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M3 13.5 5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5" />
      <path d="M3 13.5h18v3a1 1 0 0 1-1 1h-1.2M3 13.5v3a1 1 0 0 0 1 1h1.2" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}
function SuvIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M4 14 5.5 8.5A2 2 0 0 1 7.4 7h9.2a2 2 0 0 1 1.9 1.5L20 14" />
      <rect x="2.5" y="14" width="19" height="4" rx="1" />
      <circle cx="7" cy="18.5" r="1.5" />
      <circle cx="17" cy="18.5" r="1.5" />
    </svg>
  );
}
function HatchbackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M3 14 4.5 9.2A2 2 0 0 1 6.4 8h8.3a2 2 0 0 1 1.8 1.1L19 14" />
      <path d="M3 14h16v2.5a1 1 0 0 1-1 1h-1M3 14v2.5a1 1 0 0 0 1 1h1" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="15.5" cy="17.5" r="1.5" />
    </svg>
  );
}
function ElectricIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}
function LuxuryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M4 8 8 4l4 3 4-3 4 4-1.5 9h-13L4 8Z" />
      <path d="M6.5 17h11" />
    </svg>
  );
}
function PickupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M2.5 14 4 9a2 2 0 0 1 1.9-1.4H9v6.4" />
      <path d="M9 7.6h6.3A2 2 0 0 1 17 8.7L19.5 14" />
      <path d="M2.5 14h19v2a1 1 0 0 1-1 1h-1.2M2.5 14v2a1 1 0 0 0 1 1h1.2" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}
function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <rect x="4.5" y="11" width="15" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="13" width="5" height="7" rx="2" />
      <rect x="16.5" y="13" width="5" height="7" rx="2" />
      <path d="M19 20a4 4 0 0 1-4 3h-2" />
    </svg>
  );
}

const categories = [
  { name: "Sedan", Icon: SedanIcon, query: "Sedan" },
  { name: "SUV", Icon: SuvIcon, query: "SUV" },
  { name: "Hatchback", Icon: HatchbackIcon, query: "Hatchback" },
  { name: "Electric", Icon: ElectricIcon, query: "Electric" },
  { name: "Luxury", Icon: LuxuryIcon, query: "Luxury" },
  { name: "Pickup", Icon: PickupIcon, query: "Pickup" },
];

const features = [
  { title: "Verified Listings", desc: "Every listing is reviewed by our team before it goes live, so you only see genuine cars.", Icon: ShieldCheckIcon },
  { title: "Secure Transactions", desc: "We guide buyers and sellers through a safe, transparent transaction process.", Icon: LockIcon },
  { title: "Nationwide Reach", desc: "Thousands of active listings from sellers across every division in Bangladesh.", Icon: GlobeIcon },
  { title: "Expert Support", desc: "Our support team is available six days a week to help with any question.", Icon: HeadsetIcon },
];

const steps = [
  { title: "Create an Account", desc: "Sign up for free in under a minute with your name and email.", icon: "1" },
  { title: "List or Browse", desc: "Post your car for sale or browse thousands of verified listings.", icon: "2" },
  { title: "Connect & Deal", desc: "Message the seller, inspect the car, and finalize your deal safely.", icon: "3" },
];

const testimonials = [
  { name: "Nusrat Jahan", role: "Sold her Toyota Axio", quote: "I listed my car on a Friday and had three serious buyers by Sunday. The process was smooth from start to finish.", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200" },
  { name: "Kamal Hossain", role: "Bought a Honda CR-V", quote: "The verified listing badge gave me real confidence. I inspected the car and everything matched the description exactly.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { name: "Farhana Akter", role: "First-time car buyer", quote: "As a first-time buyer I was nervous, but the support team answered every question and helped me negotiate fairly.", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200" },
];

const faqs = [
  { q: "Is it free to list my car on CarsBD?", a: "Yes, creating an account and listing your car is completely free. There are no hidden charges to post a listing." },
  { q: "How are listings verified?", a: "Our team reviews every submitted listing for accuracy and completeness before it is published on the platform." },
  { q: "Can I negotiate the price directly with the seller?", a: "Absolutely. Once you view a car's details, you can contact the seller directly using the provided contact information." },
  { q: "What documents do I need to sell my car?", a: "You will need your original registration certificate, tax token, and a valid national ID to complete a sale." },
];

export default async function HomePage() {
  const featuredCars = await getFeaturedCars();

  return (
    <div>
      <Hero />

      {/* CATEGORIES SECTION */}
      <section className="container-1200 py-16">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Find the exact type of car that fits your lifestyle.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/cars?search=${encodeURIComponent(cat.query)}`}
              className="card flex flex-col items-center gap-3 px-4 py-7 text-center hover:border-primary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <cat.Icon />
              </span>
              <span className="text-sm font-semibold text-neutral-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED CARS SECTION */}
      <section className="bg-white py-16">
        <div className="container-1200">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured Listings</h2>
              <p className="section-subtitle">Top-rated cars handpicked from our marketplace.</p>
            </div>
            <Link href="/cars" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
              View All →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.length > 0 ? (
              featuredCars.slice(0, 4).map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="col-span-full text-center text-neutral-500">
                No listings available right now. Please check back soon.
              </p>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/cars" className="btn-outline">View All Cars</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="container-1200 py-16">
        <h2 className="section-title text-center">Why Choose CarsBD</h2>
        <p className="section-subtitle mx-auto max-w-xl text-center">
          We make buying and selling cars simple, safe, and transparent for everyone.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                <f.Icon />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-primary-700 py-16 text-white">
        <div className="container-1200">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How It Works</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-neutral-200">
            Getting started on CarsBD takes just three simple steps.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-200">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <StatsCounter />

      {/* TESTIMONIALS SECTION */}
      <section className="bg-white py-16">
        <div className="container-1200">
          <h2 className="section-title text-center">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto max-w-xl text-center">
            Real experiences from real buyers and sellers on our platform.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <p className="text-sm italic text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container-1200 py-16">
        <h2 className="section-title text-center">Frequently Asked Questions</h2>
        <p className="section-subtitle mx-auto max-w-xl text-center">
          Answers to common questions about buying and selling on CarsBD.
        </p>
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group px-5 py-4">
              <summary className="cursor-pointer list-none font-semibold text-neutral-900 marker:content-none">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="text-primary transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-neutral-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER / CTA SECTION */}
      <section className="bg-accent">
        <div className="container-1200 flex flex-col items-center justify-between gap-6 py-14 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to find your next car?</h2>
            <p className="mt-1 text-white/90">Join thousands of buyers and sellers on CarsBD today.</p>
          </div>
          <div className="flex w-full max-w-md gap-2 sm:w-auto">
            <Link href="/register" className="btn-primary whitespace-nowrap">Get Started Free</Link>
            <Link href="/cars" className="whitespace-nowrap rounded-lg border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Browse Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}