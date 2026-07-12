"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Explore Cars" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Explore Cars" },
    { href: "/items/add", label: "Sell a Car" },
    { href: "/items/manage", label: "My Listings" },
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin Panel" }] : [{ href: "/about", label: "About" }]),
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-700 text-lg font-extrabold text-white shadow-md shadow-primary-100">
            CB
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-neutral-900">
              Cars<span className="text-accent">BD</span>
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-neutral-400">
              Buy · Sell · Trust
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-semibold transition hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-neutral-600"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-neutral-600">
                Hi, <span className="font-semibold text-neutral-900">{user.name.split(" ")[0]}</span>
              </span>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline !px-4 !py-2">
                Login
              </Link>
              <Link href="/register" className="btn-primary !px-4 !py-2">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-neutral-100 pt-3">
              {user ? (
                <button onClick={handleLogout} className="btn-outline w-full">
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="btn-outline w-full" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary w-full" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}