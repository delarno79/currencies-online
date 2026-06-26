import { unstable_cache } from "next/cache"
import { getCountriesFromApi } from "./countries-api"
import {
  getCurrenciesFromApi,
  getExchangeRatesMatrixFromApi,
} from "./currencies-api"
import { getHistoricalRates } from "./historical-rates"
import { db } from "./db"

export const getCachedSystemSettings = unstable_cache(
  async () => {
    return db.systemSetting.findMany().catch(() => [])
  },
  ["system-settings"],
  { revalidate: 3600, tags: ["system-settings"] }
)

export const getCachedCountries = unstable_cache(
  async () => {
    return getCountriesFromApi()
  },
  ["countries"],
  { revalidate: 3600 }
)

export async function getCachedCountry(id: string) {
  const allCountries = await getCachedCountries()
  return allCountries.find((c) => c.id === id)
}

export const getCachedCurrencies = unstable_cache(
  async () => {
    return getCurrenciesFromApi()
  },
  ["currencies"],
  { revalidate: 3600 }
)

export async function getCachedCurrency(id: string) {
  const allCurrencies = await getCachedCurrencies()
  return allCurrencies.find((c) => c.id === id)
}

export const getCachedExchangeRates = unstable_cache(
  async () => {
    return getExchangeRatesMatrixFromApi()
  },
  ["exchange-rates"],
  { revalidate: 3600 }
)

export async function getCachedHistoricalRates(
  fromCode: string,
  toCode: string,
  fallbackRate = 1
) {
  const cacheFn = unstable_cache(
    async () => {
      return getHistoricalRates(fromCode, toCode, 30, fallbackRate)
    },
    [`historical-${fromCode}-${toCode}`],
    { revalidate: 3600 }
  )
  return cacheFn()
}
