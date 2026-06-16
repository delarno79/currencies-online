import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Adsense } from "@/app/_components/adsense"
import { getCachedCountries, getCachedCountry } from "@/lib/data-cache"
import { CountryDetail } from "./_components/country-detail"

// Statically pre-render all country paths
export async function generateStaticParams() {
  const allCountries = await getCachedCountries()
  return allCountries.map((country) => ({
    id: country.id,
  }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  props: PageProps<"/country/[id]">
): Promise<Metadata> {
  const { id } = await props.params
  const country = await getCachedCountry(id)

  if (!country) {
    return {
      title: "Country Not Found | Currencies.online",
      description:
        "The requested country information page could not be located in our directory.",
    }
  }

  return {
    title: `${country.name} Currency, Flag, and USD Exchange Rate | Currencies.online`,
    description: `Official currency information for ${country.name}. Find capital city (${country.capital}), population (${country.population}), flag (${country.flag}), official currency code (${country.currencyCode}), and live USD exchange rates.`,
    alternates: {
      canonical: `https://currencies.online/country/${country.id}`,
    },
  }
}

export default async function CountryPage(props: PageProps<"/country/[id]">) {
  const { id } = await props.params
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
