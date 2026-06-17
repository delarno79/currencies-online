import { ArrowLeftRight } from "lucide-react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Adsense } from "@/app/_components/adsense"
import {
  getCachedCountries,
  getCachedCurrencies,
  getCachedExchangeRates,
} from "@/lib/data-cache"
import { ComparisonDashboard } from "./_components/comparison-dashboard"

export const metadata: Metadata = {
  title:
    "Compare Countries, Currencies, and Exchange Rates | Currencies.global",
  description:
    "Compare world currencies, countries, and exchange rates side-by-side. Analyze currency strength, purchasing power indices, and inflation rates.",
  alternates: {
    canonical: "https://currencies.global/compare",
  },
}

export default async function ComparePage() {
  const [countries, currencies, rates] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
    getCachedExchangeRates(),
  ])
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <ArrowLeftRight className="h-3 w-3" />
            Comparison Center
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Side-by-Side Comparison Database
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Analyze differences between world currencies, country metrics, and
            live trading rates. View dynamic purchasing power ratings and
            currency strength side-by-side.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="compare-top-ad" format="horizontal" />
      </div>

      {/* Comparison Dashboard */}
      <Suspense
        fallback={
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg border border-border bg-card">
            <div className="animate-pulse text-muted-foreground text-sm">
              Initializing Comparison Dashboard...
            </div>
          </div>
        }
      >
        <ComparisonDashboard
          initialCountries={countries}
          initialCurrencies={currencies}
          initialExchangeRates={rates}
        />
      </Suspense>

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="compare-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
