import { TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCurrencies } from "@/lib/data-cache"
import { RatesTable } from "./_components/rates-table"

export const metadata: Metadata = {
  title: "Live Foreign Exchange Rates Database | Currencies.online",
  description:
    "Access live interbank foreign exchange rates. Calculate dynamic cross rates and view daily percentage fluctuations for major global currencies.",
  alternates: {
    canonical: "https://currencies.online/exchange-rates",
  },
}

export default async function ExchangeRatesPage() {
  const currencies = await getCachedCurrencies()
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <TrendingUp className="h-3 w-3" />
            Live Market Rates
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Exchange Rates Directory
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Live cross-currency reference values. Select any base currency to
            compute cross-rate lists instantly and analyze individual trading
            pairs.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="rates-top-ad" format="horizontal" />
      </div>

      {/* Main interactive rates matrix */}
      <RatesTable initialCurrencies={currencies} />

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="rates-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
