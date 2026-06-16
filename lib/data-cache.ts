import { cacheLife, cacheTag } from "next/cache"
import { getCountriesFromApi } from "./countries-api"
import {
  getCurrenciesFromApi,
  getExchangeRatesMatrixFromApi,
} from "./currencies-api"
import { getHistoricalRates } from "./historical-rates"

export async function getCachedCountries() {
  "use cache"
  cacheLife("hours")
  cacheTag("countries")
  return getCountriesFromApi()
}

export async function getCachedCountry(id: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("countries", `country-${id}`)
  const allCountries = await getCachedCountries()
  return allCountries.find((c) => c.id === id)
}

export async function getCachedCurrencies() {
  "use cache"
  cacheLife("hours")
  cacheTag("currencies")
  return getCurrenciesFromApi()
}

export async function getCachedCurrency(id: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("currencies", `currency-${id}`)
  const allCurrencies = await getCachedCurrencies()
  return allCurrencies.find((c) => c.id === id)
}

export async function getCachedExchangeRates() {
  "use cache"
  cacheLife("hours")
  cacheTag("exchange-rates")
  return getExchangeRatesMatrixFromApi()
}

export async function getCachedHistoricalRates(
  fromCode: string,
  toCode: string,
  fallbackRate = 1
) {
  "use cache"
  cacheLife("hours")
  cacheTag(`historical-${fromCode}-${toCode}`)
  return getHistoricalRates(fromCode, toCode, 30, fallbackRate)
}
