import { getHistoricalRates } from "@/lib/historical-rates"

/**
 * GET /api/historical-rates?from=USD&to=EUR&fallback=1.08
 *
 * Client-side endpoint used by interactive charts (e.g. the converter calculator)
 * where the currency pair changes dynamically and cannot be pre-fetched on the server.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = (searchParams.get("from") || "USD").toUpperCase()
  const to = (searchParams.get("to") || "EUR").toUpperCase()
  const fallback = Number.parseFloat(searchParams.get("fallback") || "1") || 1

  const data = await getHistoricalRates(from, to, 30, fallback)

  return Response.json(data, {
    headers: {
      // Cache at CDN/browser for 1 hour — rates only change daily
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
