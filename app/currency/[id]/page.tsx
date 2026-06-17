import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Adsense } from "@/app/_components/adsense"
import {
  getCachedCountries,
  getCachedCurrencies,
  getCachedCurrency,
  getCachedHistoricalRates,
} from "@/lib/data-cache"
import { CurrencyDetail } from "./_components/currency-detail"

// Pre-render currency routes
export async function generateStaticParams() {
  const currencies = await getCachedCurrencies()
  return currencies.map((c) => ({
    id: c.id,
  }))
}

// Metadata builder
export async function generateMetadata(
  props: PageProps<"/currency/[id]">
): Promise<Metadata> {
  const { id } = await props.params
  const currency = await getCachedCurrency(id)

  if (!currency) {
    return {
      title: "Currency Not Found | Currencies.global",
      description:
        "The requested currency information page could not be located in our database.",
    }
  }

  return {
    title: `${currency.name} (${currency.code}) Overview and Exchange Rates | Currencies.global`,
    description: `Official currency overview for ${currency.name} (${currency.code}). See active symbol (${currency.symbol}), countries using it, live USD conversion rates, 30-day historical chart, and detailed FAQs.`,
    alternates: {
      canonical: `https://currencies.global/currency/${currency.id}`,
    },
  }
}

export default async function CurrencyPage(props: PageProps<"/currency/[id]">) {
  const { id } = await props.params
  const [currency, countries] = await Promise.all([
    getCachedCurrency(id),
    getCachedCountries(),
  ])

  if (!currency) {
    notFound()
  }

  // Fetch real 30-day history (frankfurter.app for supported pairs, generated fallback otherwise)
  const historyData = await getCachedHistoricalRates(
    "USD",
    currency.code,
    currency.usdRate
  )

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-8">
        <Adsense slot="currency-detail-top" format="horizontal" />
      </div>

      {/* Detail Block */}
      <CurrencyDetail
        currency={currency}
        initialCountries={countries}
        historyData={historyData}
      />

      {/* Bottom Banner */}
      <div className="mt-12">
        <Adsense slot="currency-detail-bottom" format="horizontal" />
      </div>
    </div>
  )
}
