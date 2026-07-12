import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-neutral-900 sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-neutral-600">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you
        back on track.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home Page
      </Link>
    </div>
  );
}