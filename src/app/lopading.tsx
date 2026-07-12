export default async function Loading() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // শুধু টেস্টের জন্য

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-primary" />
      <p className="text-sm font-medium text-neutral-500">Loading, please wait...</p>
    </div>
  );
}