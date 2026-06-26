import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { BrowseRegions } from "@/app/_components/browse-regions"
import { CurrencyFacts } from "@/app/_components/currency-facts"
import { DirectorySearch } from "@/app/_components/directory-search"
import { ExchangeMistakes } from "@/app/_components/exchange-mistakes"
import { FeaturesCards } from "@/app/_components/features-cards"
import { Hero } from "@/app/_components/hero"
import { LatestRates } from "@/app/_components/latest-rates"
import { PopularCurrencies } from "@/app/_components/popular-currencies"
import { PopularPairs } from "@/app/_components/popular-pairs"
import { getCachedCountries, getCachedCurrencies, getCachedSystemSettings } from "@/lib/data-cache"

export const metadata: Metadata = {
  title:
    "Currencies.global | World's Currency Directory & Exchange Rates Database",
  description:
    "Search any country's official currency, currency code, symbol, and live exchange rates. Your ultimate world currency directory and exchange rate database.",
  alternates: {
    canonical: "https://currencies.global",
  },
}

import { db } from "@/lib/db"

function resolveCurrencyCode(name: string): string | null {
  const clean = name.trim().replace(/^[•\s\-\*\d\.]+/g, "").toLowerCase()
  if (!clean) return null

  const directMap: Record<string, string> = {
    usd: "USD",
    "us dollar": "USD",
    "us dollars": "USD",
    "united states dollar": "USD",
    "united states dollars": "USD",
    dollar: "USD",
    dollars: "USD",
    eur: "EUR",
    euro: "EUR",
    euros: "EUR",
    gbp: "GBP",
    pound: "GBP",
    pounds: "GBP",
    "british pound": "GBP",
    "british pounds": "GBP",
    sterling: "GBP",
    inr: "INR",
    rupee: "INR",
    rupees: "INR",
    "indian rupee": "INR",
    "indian rupees": "INR",
    cad: "CAD",
    "canadian dollar": "CAD",
    "canadian dollars": "CAD",
    aud: "AUD",
    "australian dollar": "AUD",
    "australian dollars": "AUD",
    jpy: "JPY",
    yen: "JPY",
    "japanese yen": "JPY",
    php: "PHP",
    "philippine peso": "PHP",
    "philippine pesos": "PHP",
    pkr: "PKR",
    "pakistani rupee": "PKR",
    "pakistani rupees": "PKR",
    cop: "COP",
    "colombian peso": "COP",
    "colombian pesos": "COP",
    mxn: "MXN",
    "mexican peso": "MXN",
    "mexican pesos": "MXN",
    cny: "CNY",
    yuan: "CNY",
    "chinese yuan": "CNY",
    nzd: "NZD",
    "new zealand dollar": "NZD",
    sgd: "SGD",
    "singapore dollar": "SGD",
    hkd: "HKD",
    "hong kong dollar": "HKD",
    zar: "ZAR",
    rand: "ZAR",
    aed: "AED",
    dirham: "AED",
  }

  if (directMap[clean]) return directMap[clean]

  if (clean.includes("colombian") || clean.includes("cop")) return "COP"
  if (clean.includes("philippine") || clean.includes("php")) return "PHP"
  if (clean.includes("mexican") || clean.includes("mxn")) return "MXN"
  if (clean.includes("indian") || clean.includes("inr") || clean.includes("rupee")) return "INR"
  if (clean.includes("pakistan") || clean.includes("pkr")) return "PKR"
  if (clean.includes("british") || clean.includes("gbp") || clean.includes("pound")) return "GBP"
  if (clean.includes("united states") || clean.includes("usd") || clean.includes("dollar")) return "USD"
  if (clean.includes("euro") || clean.includes("eur")) return "EUR"
  if (clean.includes("yen") || clean.includes("jpy")) return "JPY"
  if (clean.includes("canadian") || clean.includes("cad")) return "CAD"
  if (clean.includes("australian") || clean.includes("aud")) return "AUD"
  if (clean.includes("singapore") || clean.includes("sgd")) return "SGD"
  if (clean.includes("hong kong") || clean.includes("hkd")) return "HKD"
  if (clean.includes("new zealand") || clean.includes("nzd")) return "NZD"
  if (clean.includes("rand") || clean.includes("zar")) return "ZAR"

  if (clean.length === 3) return clean.toUpperCase()
  return null
}

export default async function Home() {
  const [countries, currencies, settings, cities] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
    getCachedSystemSettings(),
    db.city.findMany({
      select: { name: true, slug: true, state: true },
      orderBy: { name: "asc" },
    }),
  ])

  const getSetting = (key: string, defaultValue: string) => {
    return settings.find((s) => s.key === key)?.value ?? defaultValue
  }

  const heroTitle = getSetting("hero_title", "")
  const heroSubtitle = getSetting("hero_subtitle", "")
  const popularPairsSetting = getSetting("popular_pairs", "")

  const parsedPairs = popularPairsSetting
    ? popularPairsSetting
        .split(/,|\n/)
        .flatMap((p) => {
          const cleanedLine = p.trim().replace(/^[•\s\-\*\d\.]+/g, "")
          if (!cleanedLine) return []

          const parts = cleanedLine.split("|").map((part) => part.trim()).filter(Boolean)
          if (parts.length === 0) return []

          const results: { label: string; from: string; to: string; href: string }[] = []

          for (let i = 0; i < parts.length; i++) {
            const current = parts[i]
            const pairCodes = current.split(/\s+to\s+|-/i)

            if (pairCodes.length === 2) {
              const fromCode = resolveCurrencyCode(pairCodes[0])
              const toCode = resolveCurrencyCode(pairCodes[1])

              if (fromCode && toCode) {
                let label = `${fromCode} to ${toCode}`
                const nextPart = parts[i + 1]
                if (nextPart) {
                  const nextPairCodes = nextPart.split(/\s+to\s+|-/i)
                  let isNextPartAnotherPair = false
                  if (nextPairCodes.length === 2) {
                    const nextFrom = resolveCurrencyCode(nextPairCodes[0])
                    const nextTo = resolveCurrencyCode(nextPairCodes[1])
                    if (nextFrom && nextTo && (nextFrom !== fromCode || nextTo !== toCode)) {
                      isNextPartAnotherPair = true
                    }
                  }
                  if (!isNextPartAnotherPair) {
                    label = nextPart
                    i++ // consume nextPart as custom label
                  }
                }

                results.push({
                  label,
                  from: fromCode,
                  to: toCode,
                  href: `/exchange-rates/${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`,
                })
              }
            }
          }
          return results
        })
    : undefined

  // Retrieve custom props for home components
  const card1Title = getSetting("card_1_title", "")
  const card1Desc = getSetting("card_1_desc", "")
  const card1Btn = getSetting("card_1_btn", "")
  const card1Href = getSetting("card_1_href", "")

  const card2Title = getSetting("card_2_title", "")
  const card2Desc = getSetting("card_2_desc", "")
  const card2Btn = getSetting("card_2_btn", "")
  const card2Href = getSetting("card_2_href", "")

  const card3Title = getSetting("card_3_title", "")
  const card3Desc = getSetting("card_3_desc", "")
  const card3Btn = getSetting("card_3_btn", "")
  const card3Href = getSetting("card_3_href", "")

  const card4Title = getSetting("card_4_title", "")
  const card4Desc = getSetting("card_4_desc", "")
  const card4Btn = getSetting("card_4_btn", "")
  const card4Href = getSetting("card_4_href", "")

  const directoryTitle = getSetting("directory_title", "")
  const directorySubtitle = getSetting("directory_subtitle", "")

  const popcurrencyTitle = getSetting("popcurrency_title", "")
  const popcurrencySubtitle = getSetting("popcurrency_subtitle", "")

  const liveRatesTitle = getSetting("live_rates_title", "")
  const liveRatesSubtitle = getSetting("live_rates_subtitle", "")

  const factsTitle = getSetting("facts_title", "")
  const factsSubtitle = getSetting("facts_subtitle", "")
  const factsContent = getSetting("facts_content", "")
  const parsedFacts = factsContent
    ? factsContent
        .split("\n")
        .map((line, idx) => {
          const parts = line.split("|")
          if (parts.length < 2) return null
          let icon = "🌎"
          let title = ""
          let desc = ""
          if (parts.length >= 3) {
            icon = parts[0].trim()
            title = parts[1].trim()
            desc = parts[2].trim()
          } else {
            title = parts[0].trim()
            desc = parts[1].trim()
          }
          return {
            id: idx + 1,
            icon,
            title,
            description: desc,
          }
        })
        .filter((item): item is NonNullable<typeof item> => !!item)
    : undefined

  const mistakesTitle = getSetting("mistakes_title", "")
  const mistakesSubtitle = getSetting("mistakes_subtitle", "")
  const mistakesContent = getSetting("mistakes_content", "")
  const parsedMistakes = mistakesContent
    ? mistakesContent
        .split("\n")
        .map((line, idx) => {
          const parts = line.split("|")
          if (parts.length < 2) return null
          const title = parts[0].trim()
          const desc = parts[1].trim()
          return {
            id: idx + 1,
            title,
            description: desc,
          }
        })
        .filter((item): item is NonNullable<typeof item> => !!item)
    : undefined

  const regionsTitle = getSetting("regions_title", "")
  const regionsSubtitle = getSetting("regions_subtitle", "")

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* 1. Hero Search Area & Animated Globe */}
      <Hero
        initialCountries={countries}
        initialCurrencies={currencies}
        title={heroTitle || undefined}
        subtitle={heroSubtitle || undefined}
      />

      {/* 2. Adsense Block (Immediately below search area) */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Adsense slot="home-top-banner" format="horizontal" />
      </div>

      {/* 3. Navigation Features Cards */}
      <FeaturesCards
        card1Title={card1Title || undefined}
        card1Desc={card1Desc || undefined}
        card1Btn={card1Btn || undefined}
        card1Href={card1Href || undefined}
        card2Title={card2Title || undefined}
        card2Desc={card2Desc || undefined}
        card2Btn={card2Btn || undefined}
        card2Href={card2Href || undefined}
        card3Title={card3Title || undefined}
        card3Desc={card3Desc || undefined}
        card3Btn={card3Btn || undefined}
        card3Href={card3Href || undefined}
        card4Title={card4Title || undefined}
        card4Desc={card4Desc || undefined}
        card4Btn={card4Btn || undefined}
        card4Href={card4Href || undefined}
      />

      {/* Directory Search Section */}
      <DirectorySearch
        cities={cities}
        title={directoryTitle || undefined}
        subtitle={directorySubtitle || undefined}
      />

      {/* 4. Popular Currency Section */}
      <PopularCurrencies
        title={popcurrencyTitle || undefined}
        subtitle={popcurrencySubtitle || undefined}
      />

      {/* 6. Adsense Bottom Spot */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Adsense slot="home-bottom-banner" format="horizontal" />
      </div>

      {/* 7. Most Popular Currency Pairs Section */}
      <PopularPairs initialPairs={parsedPairs} />

      {/* 5. Live Exchange Rates Section (Block 2) */}
      <LatestRates
        title={liveRatesTitle || undefined}
        subtitle={liveRatesSubtitle || undefined}
      />

      {/* 8. 8 Common Currency Exchange Mistakes to Avoid Section */}
      <ExchangeMistakes
        title={mistakesTitle || undefined}
        subtitle={mistakesSubtitle || undefined}
        mistakes={parsedMistakes}
      />

      {/* 9. 8 Fascinating Currency Facts Section */}
      <CurrencyFacts
        title={factsTitle || undefined}
        subtitle={factsSubtitle || undefined}
        facts={parsedFacts}
      />

      {/* 10. Browse Countries by Region Section */}
      <BrowseRegions
        title={regionsTitle || undefined}
        subtitle={regionsSubtitle || undefined}
      />
    </div>
  )
}
