import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCountries, getCachedCountry } from "@/lib/data-cache"
import { CountryDetail } from "./_components/country-detail"

// Pre-render exactly one path for Next.js Cache Components validation, others are generated on-demand
export async function generateStaticParams() {
  return [{ id: "italy-currency" }]
}

// Generate dynamic metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await props.params
  const country = await getCachedCountry(id)

  if (!country) {
    return {
      title: "Country Not Found | Currencies.global",
      description:
        "The requested country information page could not be located in our directory.",
    }
  }

  return {
    title: `${country.name} Currency, Flag, and USD Exchange Rate | Currencies.global`,
    description: `Official currency information for ${country.name}. Find capital city (${country.capital}), population (${country.population}), flag (${country.flag}), official currency code (${country.currencyCode}), and live USD exchange rates.`,
    alternates: {
      canonical: `https://currencies.global/country/${country.id}-currency`,
    },
  }
}

export default async function CountryPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  if (!id.endsWith("-currency")) {
    redirect(`/country/${id}-currency`)
  }

  const country = await getCachedCountry(id)

  if (!country) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-8">
        <Adsense slot="country-detail-top" format="horizontal" />
      </div>

      {/* Main Country Info Profile */}
      <CountryDetail country={country} />

      {/* Bottom Banner */}
      <div className="mt-12">
        <Adsense slot="country-detail-bottom" format="horizontal" />
      </div>
    </div>
  )
}
