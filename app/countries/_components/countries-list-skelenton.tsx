import { Skeleton } from "@/components/ui/skeleton"
import { generateKeys } from "@/lib/utils"

export function CountriesListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search & Filter bar Skeleton */}
      <div className="flex flex-col items-stretch justify-between gap-4 border border-border bg-card p-4 md:flex-row md:items-center">
        <Skeleton className="h-10 max-w-md flex-1" />
        <div className="flex flex-wrap gap-1.5">
          {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
            (region) => (
              <Skeleton key={region} className="h-8 w-20" />
            )
          )}
        </div>
      </div>

      {/* Grid of country cards Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {generateKeys("skeleton-card", 6).map((key) => (
          <div key={key} className="space-y-5 border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3.5 w-1/3" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-border border-t border-b py-3">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-3.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
