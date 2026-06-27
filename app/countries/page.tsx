import { Globe } from "lucide-react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCountries } from "@/lib/data-cache"
import { CountriesList } from "./_components/countries-list"
import { CountriesListSkeleton } from "./_components/countries-list-skelenton"

export const metadata: Metadata = {
  title: "World Countries and Currencies Directory | Currencies.global",
  description:
    "Browse the complete directory of global countries. Find capital cities, population figures, official flags, currency codes, and live exchange rates.",
}
export const dynamic = "force-dynamic"

export default async function CountriesPage() {
  const countries = await getCachedCountries()

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <Globe className="h-3 w-3" />
            Global Directory
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Countries & Currencies Database
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Explore the relationship between countries, capitals, populations,
            and their official money systems. Search any country to view its
            local currency conversions.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="countries-top-ad" format="horizontal" />
      </div>

      {/* Main interactive countries engine (Suspended for PPR streaming) */}
      <Suspense fallback={<CountriesListSkeleton />}>
        <CountriesList countries={countries} />
      </Suspense>

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="countries-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
