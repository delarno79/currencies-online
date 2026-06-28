import { getCountriesFromApi } from "./countries-api"
import {
  getCurrenciesFromApi,
  getExchangeRatesMatrixFromApi,
} from "./currencies-api"
import { getHistoricalRates } from "./historical-rates"
import { db } from "./db"

export async function getCachedSystemSettings() {
  return db.systemSetting.findMany().catch(() => [])
}

export async function getCachedCountries() {
  return getCountriesFromApi()
}

export async function getCachedCountry(id: string) {
  const allCountries = await getCachedCountries()
  const cleanId = id.endsWith("-currency") ? id.slice(0, -9) : id
  return allCountries.find((c) => c.id === cleanId)
}

export async function getCachedCurrencies() {
  return getCurrenciesFromApi()
}

export async function getCachedCurrency(id: string) {
  const allCurrencies = await getCachedCurrencies()
  return allCurrencies.find((c) => c.id === id)
}

export async function getCachedExchangeRates() {
  return getExchangeRatesMatrixFromApi()
}

export async function getCachedHistoricalRates(
  fromCode: string,
  toCode: string,
  fallbackRate = 1
) {
  return getHistoricalRates(fromCode, toCode, 30, fallbackRate)
}
