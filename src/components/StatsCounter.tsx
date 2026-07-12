"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Cars Listed", value: 4500, suffix: "+" },
  { label: "Happy Customers", value: 12000, suffix: "+" },
  { label: "Cities Covered", value: 24, suffix: "" },
  { label: "Verified Dealers", value: 320, suffix: "+" },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return count;
}

function StatItem({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, active);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-extrabold text-white sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-neutral-200">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-primary py-14">
      <div className="container-x grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}