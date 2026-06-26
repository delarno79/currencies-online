import { notFound } from "next/navigation"
import { Adsense } from "@/app/_components/adsense"
import {
  getCachedCurrencies,
  getCachedExchangeRates,
  getCachedHistoricalRates,
} from "@/lib/data-cache"
import { RatePairDetail } from "./_components/rate-pair-detail"
import { parsePair } from "./utils"

// Pre-render exactly one pair for Next.js Cache Components validation, others are generated on-demand
export async function generateStaticParams() {
  return [{ pair: "usd-to-eur" }]
}

// Build SEO Metadata
export async function generateMetadata(props: {
  params: Promise<{ pair: string }>
}) {
  const { pair } = await props.params
  const currencies = await getCachedCurrencies()
  const parsed = parsePair(pair, currencies)

  if (!parsed) {
    return {
      title: "Exchange Rate Pair Not Found | Currencies.global",
      description:
        "The requested currency exchange rate pair could not be resolved.",
    }
  }

  const { fromCurrency, toCurrency } = parsed
  const rate = toCurrency.usdRate / fromCurrency.usdRate

  return {
    title: `${fromCurrency.code} to ${toCurrency.code} Exchange Rate - Live Chart | Currencies.global`,
    description: `Analyze ${fromCurrency.name} to ${toCurrency.name} (${fromCurrency.code} to ${toCurrency.code}) conversion rates. View current rate of ${rate.toFixed(4)}, daily percent trends, interactive 30-day line graphs, and conversion lookup tables.`,
    alternates: {
      canonical: `https://currencies.global/exchange-rates/${pair}`,
    },
  }
}

export default async function ExchangeRatePairPage(props: {
  params: Promise<{ pair: string }>
}) {
  const { pair } = await props.params
  const currencies = await getCachedCurrencies()
  const parsed = parsePair(pair, currencies)

  if (!parsed) {
    notFound()
  }

  const { fromCurrency, toCurrency } = parsed
  const rate = toCurrency.usdRate / fromCurrency.usdRate

  // Fetch real 30-day history server-side
  const historyData = await getCachedHistoricalRates(
    fromCurrency.code,
    toCurrency.code,
    rate
  )

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-8">
        <Adsense slot="pair-detail-top" format="horizontal" />
      </div>

      {/* Main Details and Widgets */}
      <RatePairDetail
        fromCode={fromCurrency.code}
        toCode={toCurrency.code}
        fromName={fromCurrency.name}
        toName={toCurrency.name}
        rate={rate}
        historyData={historyData}
      />

      {/* Bottom Banner */}
      <div className="mt-12">
        <Adsense slot="pair-detail-bottom" format="horizontal" />
      </div>
    </div>
  )
}
