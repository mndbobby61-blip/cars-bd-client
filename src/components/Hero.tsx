"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
];

const trustBadges = [
  { label: "Verified Listings", value: "4,500+" },
  { label: "Happy Customers", value: "12,000+" },
  { label: "Cities Covered", value: "24" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex h-screen min-h-[640px] w-[1200px] items-center overflow-hidden bg-neutral-900">
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Car showcase"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-neutral-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-transparent to-transparent" />

      <div className="container-x relative z-10">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium text-accent animate-fade-in-up">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Bangladesh&apos;s #1 Car Marketplace
        </p>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-up animation-delay-150">
          Find Your Perfect Car,{" "}
          <span className="bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
            Buy or Sell
          </span>{" "}
          with Confidence
        </h1>

        <p className="mt-5 max-w-xl text-base text-neutral-200 sm:text-lg animate-fade-in-up animation-delay-300">
          Browse thousands of verified new and used cars from trusted sellers across Bangladesh, or list
          your own car in minutes.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up animation-delay-500">
          <Link href="/cars" className="btn-accent !px-7 !py-3 text-base">Explore Cars</Link>
          <Link
            href="/items/add"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Sell Your Car
          </Link>
        </div>

        <div className="mt-14 hidden gap-4 sm:flex animate-fade-in-up animation-delay-500">
          {trustBadges.map((b, i) => (
            <div
              key={b.label}
              className="rounded-xl border border-white/15 bg-white/10 backdrop-blur px-6 py-4 animate-float"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              <p className="text-2xl font-extrabold text-white">{b.value}</p>
              <p className="text-xs text-neutral-200">{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-accent" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}