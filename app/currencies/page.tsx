import { Coins } from "lucide-react"
import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCountries, getCachedCurrencies } from "@/lib/data-cache"
import { CurrenciesList } from "./_components/currencies-list"

export const metadata: Metadata = {
  title: "World Currencies Directory and Codes | Currencies.global",
  description:
    "Browse the complete database of world currencies. Access official ISO currency codes, symbols, countries using them, and live exchange rates.",
}

export default async function CurrenciesPage() {
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
            <Coins className="h-3 w-3" />
            Currencies Directory
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            World Currencies Database
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Complete registry of world fiat currencies. Select a currency code
            to explore historical charts, details of using countries, FAQs, and
            exchange calculators.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="currencies-top-ad" format="horizontal" />
      </div>

      {/* Main interactive currencies directory */}
      <CurrenciesList
        initialCurrencies={currencies}
        initialCountries={countries}
      />

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="currencies-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
