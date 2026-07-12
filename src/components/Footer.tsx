import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore Cars" },
  { href: "/items/add", label: "Sell a Car" },
  { href: "/about", label: "About Us" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy & Terms" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Create Account" },
];

const socials = [
  { label: "Facebook", icon: "f" },
  { label: "YouTube", icon: "▶" },
  { label: "Instagram", icon: "◎" },
  { label: "LinkedIn", icon: "in" },
];

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

const contactInfo = [
  { Icon: LocationIcon, text: "House 12, Road 5, Gulshan-1, Dhaka 1212" },
  { Icon: PhoneIcon, text: "+880 1700-000000" },
  { Icon: MailIcon, text: "support@carsbd.com" },
  { Icon: ClockIcon, text: "Sat - Thu: 10:00 AM - 8:00 PM" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-neutral-800 bg-neutral-900 text-neutral-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="container-1200 grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-700 text-lg font-extrabold text-white shadow-md shadow-primary-900/50">
              CB
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-extrabold text-white">
                Cars<span className="text-accent">BD</span>
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                Buy · Sell · Trust
              </span>
            </span>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
            Bangladesh&apos;s trusted online marketplace to buy and sell new and used cars with verified listings and secure transactions.
          </p>

          <div className="mt-6 flex gap-2.5">
            {socials.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-xs font-semibold text-neutral-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Quick Links</h4>
          <ul className="mt-6 space-y-3.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-neutral-400 transition hover:pl-1 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Support</h4>
          <ul className="mt-6 space-y-3.5 text-sm">
            {supportLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-neutral-400 transition hover:pl-1 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact Info</h4>
          <ul className="mt-6 space-y-4 text-sm text-neutral-400">
            {contactInfo.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-neutral-400">
                  <Icon />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="container-1200 flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} CarsBD. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            <Link href="/privacy" className="transition hover:text-accent">Privacy Policy</Link>
            <span className="h-1 w-1 rounded-full bg-neutral-700" />
            <Link href="/privacy" className="transition hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}