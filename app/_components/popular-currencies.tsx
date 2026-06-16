import { ArrowRight, Coins } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCachedCountries, getCachedCurrencies } from "@/lib/data-cache"

export async function PopularCurrencies() {
  const [countries, currencies] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
  ])

  // Mockup order of popular currencies
  const order = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
    "INR",
    "MXN",
    "BRL",
    "SGD",
    "NZD",
    "HKD",
    "SEK",
    "KRW",
  ]

  // Filter and sort currencies based on order
  const popularList = order
    .map((code) => currencies.find((c) => c.code === code))
    .filter((c): c is NonNullable<typeof c> => !!c)

  // Ensure we have exactly 16 items to align perfectly on all grid layouts
  // (2 columns on mobile, 4 columns on tablet, 8 columns on desktop)
  const targetCount = 16
  if (popularList.length < targetCount) {
    const remainingCurrencies = currencies.filter(
      (c) => !popularList.some((p) => p.code === c.code)
    )
    popularList.push(
      ...remainingCurrencies.slice(0, targetCount - popularList.length)
    )
  } else if (popularList.length > targetCount) {
    popularList.splice(targetCount)
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-end">
        <div>
          <h2 className="flex items-center gap-2 font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
            <Coins className="h-6 w-6 text-primary" />
            Popular Currencies
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Explore the world's most used currencies.
          </p>
        </div>
        <Link
          href="/currencies"
          className="group mt-4 inline-flex items-center gap-1.5 font-bold text-primary text-xs uppercase tracking-wider sm:mt-0"
        >
          <span>View all currencies</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {popularList.map((currency) => {
          // Find country flag
          const firstCountry = countries.find(
            (c) => c.currencyCode === currency.code
          )
          const flag = firstCountry ? firstCountry.flag : "🏳️"

          // Format value vs USD: 1 unit of currency = X USD
          // For USD, value is 1.0000 USD
          let rateDisplay = ""
          if (currency.code === "USD") {
            rateDisplay = "1.0000 USD"
          } else {
            const valueVsUsd = 1 / currency.usdRate
            // Determine decimal places dynamically: e.g. KRW (0.00074) has 5 decimals, others have 4
            const decimals = valueVsUsd < 0.01 ? 5 : 4
            rateDisplay = `${valueVsUsd.toFixed(decimals)} USD`
          }

          return (
            <Link
              key={currency.id}
              href={`/currency/${currency.id}`}
              className="group block"
            >
              <Card className="h-full border border-border bg-card/40 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center justify-between gap-3 p-4 text-center">
                  {/* Country Flag */}
                  <span
                    className="text-3xl leading-none transition-transform duration-300 group-hover:scale-110"
                    role="img"
                    aria-label="Flag"
                  >
                    {flag}
                  </span>

                  {/* Currency Info */}
                  <div className="space-y-0.5">
                    <h3 className="max-w-[85px] truncate font-bold text-foreground text-xs transition-colors group-hover:text-primary">
                      {currency.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 font-semibold text-[10px] text-muted-foreground">
                      <span>{currency.code}</span>
                      <span>•</span>
                      <span className="font-mono">{currency.symbol}</span>
                    </div>
                  </div>

                  {/* Inverse exchange rate vs USD in green pill */}
                  <div className="w-full select-none rounded-lg bg-emerald-500/10 py-1 text-center font-bold font-mono text-[10px] text-emerald-600 dark:text-emerald-500">
                    {rateDisplay}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/currencies">
          <Button
            variant="outline"
            className="gap-2 border-border px-6 py-5 font-semibold shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            <span>View All 30+ Currencies</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
