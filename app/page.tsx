import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { BrowseRegions } from "@/app/_components/browse-regions"
import { CurrencyFacts } from "@/app/_components/currency-facts"
import { ExchangeMistakes } from "@/app/_components/exchange-mistakes"
import { FeaturesCards } from "@/app/_components/features-cards"
import { Hero } from "@/app/_components/hero"
import { LatestRates } from "@/app/_components/latest-rates"
import { PopularCurrencies } from "@/app/_components/popular-currencies"
import { PopularPairs } from "@/app/_components/popular-pairs"
import { getCachedCountries, getCachedCurrencies } from "@/lib/data-cache"

export const metadata: Metadata = {
  title:
    "Currencies.online | World's Currency Directory & Exchange Rates Database",
  description:
    "Search any country's official currency, currency code, symbol, and live exchange rates. Your ultimate world currency directory and exchange rate database.",
  alternates: {
    canonical: "https://currencies.online",
  },
}

export default async function Home() {
  const [countries, currencies] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
  ])

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* 1. Hero Search Area & Animated Globe */}
      <Hero initialCountries={countries} initialCurrencies={currencies} />

      {/* 2. Adsense Block (Immediately below search area) */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Adsense slot="home-top-banner" format="horizontal" />
      </div>

      {/* 3. Navigation Features Cards */}
      <FeaturesCards />

      {/* 4. Popular Currency Section */}
      <PopularCurrencies />

      {/* 5. Live Exchange Rates Section */}
      <LatestRates />

      {/* 6. Adsense Bottom Spot */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Adsense slot="home-bottom-banner" format="horizontal" />
      </div>

      {/* 7. Most Popular Currency Pairs Section */}
      <PopularPairs />

      {/* 8. 8 Common Currency Exchange Mistakes to Avoid Section */}
      <ExchangeMistakes />

      {/* 9. 8 Fascinating Currency Facts Section */}
      <CurrencyFacts />

      {/* 10. Browse Countries by Region Section */}
      <BrowseRegions />
    </div>
  )
}
