import { Calculator } from "lucide-react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCountries, getCachedCurrencies } from "@/lib/data-cache"
import { CalculatorWidget } from "./_components/calculator"

export const metadata: Metadata = {
  title: "Interactive Currency Converter Calculator | Currencies.global",
  description:
    "Convert any global currency instantly with our interactive calculator. Pre-fill conversion values, check daily rate fluctuations, and analyze trends.",
  alternates: {
    canonical: "https://currencies.global/converter",
  },
}

export default async function ConverterPage() {
  const [countries, currencies] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
  ])
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <Calculator className="h-3 w-3" />
            Calculator Engine
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Currency Converter Calculator
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Input amounts, select currency pairings, and convert instantly.
            Analyze historical trends and get access to detailed country
            references.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="converter-top-ad" format="horizontal" />
      </div>

      {/* Converter Widget with Suspense wrap for SearchParams */}
      <Suspense
        fallback={
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg border border-border bg-card">
            <div className="animate-pulse text-muted-foreground text-sm">
              Initializing Converter Engine...
            </div>
          </div>
        }
      >
        <CalculatorWidget
          initialCountries={countries}
          initialCurrencies={currencies}
        />
      </Suspense>

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="converter-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
