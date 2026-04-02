import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoading() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-48 rounded-[2rem]" />
      <div className="grid gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-[2rem]" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Skeleton className="h-[360px] rounded-[2rem]" />
        <Skeleton className="h-[360px] rounded-[2rem]" />
      </div>
    </div>
  );
}
