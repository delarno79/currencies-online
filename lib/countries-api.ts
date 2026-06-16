import countriesData from "./countries-data.json"
import { type Country, countries as staticCountries } from "./data"

function slugify(name: string) {
  let slug = name
    .toLowerCase()
    .normalize("NFD") // Split accented characters into base and accent
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Deduplicate hyphens

  // Map to align with static data overrides
  if (slug === "turkiye") {
    slug = "turkey"
  }
  return slug
}

function formatPopulation(pop: number) {
  if (pop >= 1_000_000_000) {
    return `${(pop / 1_000_000_000).toFixed(1)} billion`
  }
  if (pop >= 1_000_000) {
    return `${(pop / 1_000_000).toFixed(1)} million`
  }
  return pop.toLocaleString()
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 15000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(id)
  }
}

export async function getLiveRates(): Promise<Record<string, number>> {
  try {
    const ratesResponse = await fetchWithTimeout(
      "https://open.er-api.com/v6/latest/USD",
      {},
      15000
    )
    if (ratesResponse.ok) {
      const ratesData = await ratesResponse.json()
      return ratesData.rates || {}
    }
  } catch (e) {
    console.warn("Failed to fetch live exchange rates:", e)
  }
  return {}
}

interface RawApiCountry {
  names?: {
    common?: string
    official?: string
  }
  codes?: {
    alpha_3?: string
  }
  capitals?: {
    name?: string
  }[]
  flag?: {
    emoji?: string
  }
  population?: number
  currencies?: {
    code?: string
    name?: string
    symbol?: string
  }[]
  region?: string
  subregion?: string
  borders?: string[]
}

export async function getCountriesFromApi(): Promise<Country[]> {
  try {
    // 1. Fetch live exchange rates from Open Exchange Rates API
    const rates = await getLiveRates()

    // 2. Load countries from local snapshot data
    const rawCountries = countriesData as RawApiCountry[]

    /*
    // Legacy REST Countries API v5 pagination fetch - commented out as backup
    const apiKey = process.env.REST_COUNTRIES_API_KEY
    if (!apiKey) {
      console.warn(
        "REST_COUNTRIES_API_KEY environment variable is not defined. Falling back to static data."
      )
      return staticCountries
    }

    const rawCountriesApi: RawApiCountry[] = []
    let offset = 0
    const limit = 100
    let hasMore = true
    const fields =
      "names.common,names.official,codes.alpha_3,flag.emoji,capitals,population,currencies,region,subregion,borders"

    while (hasMore) {
      const url = `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}&response_fields=${fields}`
      const countriesResponse = await fetchWithTimeout(
        url,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
        15000
      )

      if (!countriesResponse.ok) {
        console.warn(
          `REST Countries API v5 responded with status ${countriesResponse.status}. Falling back to static data.`
        )
        return staticCountries
      }

      const resJson = await countriesResponse.json()
      const pageObjects = resJson?.data?.objects
      if (!Array.isArray(pageObjects) || pageObjects.length === 0) {
        if (rawCountriesApi.length === 0) {
          console.warn(
            "Invalid response format or empty objects from REST Countries API v5. Falling back to static data."
          )
          return staticCountries
        }
        break
      }

      rawCountriesApi.push(...pageObjects)

      const meta = resJson?.data?.meta
      if (meta && typeof meta.more === "boolean") {
        hasMore = meta.more
      } else {
        hasMore = pageObjects.length === limit
      }
      offset += limit
    }
    */

    // Create a lookup map for static countries for metadata matching
    const staticMap = new Map<string, Country>()
    for (const c of staticCountries) {
      staticMap.set(c.id, c)
    }

    // Create a lookup map of codes.alpha_3 to country slugs for resolving related countries (borders)
    const cca3ToIdMap = new Map<string, string>()
    for (const raw of rawCountries) {
      if (raw.names?.common && raw.codes?.alpha_3) {
        cca3ToIdMap.set(raw.codes.alpha_3, slugify(raw.names.common))
      }
    }

    const mappedCountries: Country[] = rawCountries.map((raw) => {
      const name = raw.names?.common || ""
      const id = slugify(name)
      const staticCountry = staticMap.get(id)

      const flag = raw.flag?.emoji || staticCountry?.flag || "🏳️"
      const capital = raw.capitals?.[0]?.name || staticCountry?.capital || "N/A"
      const population = raw.population
        ? formatPopulation(raw.population)
        : staticCountry?.population || "0"

      // Extract currency information
      let currencyCode = ""
      let currencyName = ""
      let currencySymbol = ""

      if (Array.isArray(raw.currencies) && raw.currencies.length > 0) {
        const curObj = raw.currencies[0]
        currencyCode = curObj.code || ""
        currencyName = curObj.name || ""
        currencySymbol = curObj.symbol || currencyCode
      }

      if (!currencyCode && staticCountry) {
        currencyCode = staticCountry.currencyCode
        currencyName = staticCountry.currencyName
        currencySymbol = staticCountry.currencySymbol
      }

      // Resolve live exchange rate (base is USD)
      let usdRate = 1.0
      if (currencyCode) {
        const rate = rates[currencyCode.toUpperCase()]
        if (typeof rate === "number") {
          usdRate = Number(rate.toFixed(4))
        } else if (staticCountry) {
          usdRate = staticCountry.usdRate
        }
      }

      // Map related countries: borders first, then other countries in the same region
      const relatedCountries: string[] = []
      if (raw.borders && Array.isArray(raw.borders)) {
        for (const border of raw.borders) {
          const mappedId = cca3ToIdMap.get(border)
          if (mappedId) {
            relatedCountries.push(mappedId)
          }
        }
      }

      if (relatedCountries.length < 4) {
        const region = raw.region || staticCountry?.region || ""
        const sameRegion = rawCountries
          .filter(
            (other) =>
              other.region === region &&
              other.codes?.alpha_3 !== raw.codes?.alpha_3 &&
              !relatedCountries.includes(
                cca3ToIdMap.get(other.codes?.alpha_3 || "") || ""
              )
          )
          .slice(0, 4 - relatedCountries.length)

        for (const other of sameRegion) {
          const mappedId = cca3ToIdMap.get(other.codes?.alpha_3 || "")
          if (mappedId) {
            relatedCountries.push(mappedId)
          }
        }
      }

      // Merge and construct detailed metadata
      const description =
        staticCountry?.description ||
        `${name} is a sovereign country situated in the ${raw.region || "world"} region. It has a capital city of ${capital}, a population of approximately ${population}, and uses the ${currencyName || "local currency"} (${currencyCode || "N/A"}) as its legal tender.`

      const region = raw.region || staticCountry?.region || "Unknown"
      const purchasingPowerIndex = staticCountry?.purchasingPowerIndex ?? 50.0
      const inflationRate = staticCountry?.inflationRate ?? 3.0

      return {
        id,
        name,
        flag,
        capital,
        population,
        currencyCode: currencyCode || "N/A",
        currencyName: currencyName || "N/A",
        currencySymbol: currencySymbol || "",
        usdRate,
        relatedCountries: relatedCountries.slice(0, 4),
        description,
        region,
        purchasingPowerIndex,
        inflationRate,
      }
    })

    // Sort alphabetically by name
    return mappedCountries.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.warn(
      "Failed to fetch dynamic country details, using static data:",
      error
    )
    return staticCountries
  }
}
