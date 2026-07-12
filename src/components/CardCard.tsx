import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price);

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="card group flex h-full w-full flex-col overflow-hidden">
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={car.images[0]}
          alt={car.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {car.condition}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-base font-bold text-neutral-900">{car.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{car.shortDescription}</p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">📍 {car.location}</span>
          <span className="inline-flex items-center gap-1">⭐ {car.rating.toFixed(1)}</span>
          <span className="inline-flex items-center gap-1">📅 {car.year}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-lg font-extrabold text-primary">৳{formatPrice(car.price)}</span>
          <Link href={`/cars/${car._id}`} className="btn-outline !px-3 !py-1.5 text-xs">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}