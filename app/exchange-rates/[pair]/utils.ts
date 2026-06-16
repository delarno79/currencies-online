import { type Currency, currencies as staticCurrencies } from "@/lib/data"

export function parsePair(pairSlug: string, currenciesList?: Currency[]) {
  const currencies = currenciesList || staticCurrencies
  const parts = pairSlug.split("-to-")
  if (parts.length !== 2) return null
  const [fromCode, toCode] = parts.map((p) => p.toUpperCase())

  const fromCurrency = currencies.find((c) => c.code === fromCode)
  const toCurrency = currencies.find((c) => c.code === toCode)

  if (!fromCurrency || !toCurrency) return null

  return {
    fromCurrency,
    toCurrency,
  }
}
