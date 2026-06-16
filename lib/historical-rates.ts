import { fetchWithTimeout } from "./countries-api"
import { generateHistory } from "./data"

export type HistoryPoint = {
  date: string
  rate: number
  inverseRate: number
}

/**
 * Currency codes supported by frankfurter.app (ECB data).
 * For unsupported codes we fall back to the deterministic generator.
 */
const FRANKFURTER_SUPPORTED = new Set([
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
])

/**
 * Fetch real 30-day historical exchange rate data from frankfurter.app.
 * Falls back to a deterministic generator for currencies not covered by the API.
 *
 * @param fromCode  Source currency code (e.g. "USD")
 * @param toCode    Target currency code (e.g. "EUR")
 * @param days      Number of calendar days to look back (default 30)
 * @param fallbackRate  Rate to use for the deterministic fallback generator
 */
export async function getHistoricalRates(
  fromCode: string,
  toCode: string,
  days = 30,
  fallbackRate = 1
): Promise<HistoryPoint[]> {
  const from = fromCode.toUpperCase()
  const to = toCode.toUpperCase()

  // Identical codes → trivial 1:1 history
  if (from === to) {
    return generateHistoryPoints(1, days)
  }

  // If either code is unsupported by frankfurter, use deterministic generator
  if (!FRANKFURTER_SUPPORTED.has(from) || !FRANKFURTER_SUPPORTED.has(to)) {
    return generateHistoryPoints(fallbackRate, days)
  }

  try {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days)

    const endStr = endDate.toISOString().slice(0, 10)
    const startStr = startDate.toISOString().slice(0, 10)

    const url = `https://api.frankfurter.app/${startStr}..${endStr}?base=${from}&symbols=${to}`
    const res = await fetchWithTimeout(url, {}, 10000)

    if (!res.ok) {
      throw new Error(`frankfurter responded ${res.status}`)
    }

    const data = await res.json()
    if (!data.rates || typeof data.rates !== "object") {
      throw new Error("unexpected response shape")
    }

    const ratesMap = data.rates as Record<string, Record<string, number>>

    const points: HistoryPoint[] = Object.entries(ratesMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dateStr, dayRates]) => {
        const rate = dayRates[to]
        const formatted = new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
        return {
          date: formatted,
          rate: Number(rate.toFixed(4)),
          inverseRate: Number((1 / rate).toFixed(4)),
        }
      })

    if (points.length === 0) {
      throw new Error("empty rates array")
    }

    return points
  } catch (err) {
    console.warn(
      `Failed to fetch historical rates for ${from}/${to}, using generated data:`,
      err
    )
    return generateHistoryPoints(fallbackRate, days)
  }
}

/** Convert generateHistory output into the shared HistoryPoint shape */
function generateHistoryPoints(baseRate: number, days: number): HistoryPoint[] {
  return generateHistory(baseRate, days)
}
