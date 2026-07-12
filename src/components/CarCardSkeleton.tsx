export default function CarCardSkeleton() {
  return (
    <div className="card flex h-full w-full flex-col overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-neutral-200" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
        <div className="h-3 w-full rounded bg-neutral-200" />
        <div className="h-3 w-2/3 rounded bg-neutral-200" />
        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
          <div className="h-5 w-20 rounded bg-neutral-200" />
          <div className="h-8 w-24 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}