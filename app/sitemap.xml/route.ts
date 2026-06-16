import { NextResponse } from "next/server"
import { blogs } from "@/lib/data"
import {
  getCachedCountries,
  getCachedCurrencies,
  getCachedExchangeRates,
} from "@/lib/data-cache"

const BASE_URL = "https://currencies.online"

export async function GET() {
  const [countries, currencies, exchangeRatesMatrix] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
    getCachedExchangeRates(),
  ])
  const xmlUrls: string[] = []

  // 1. Core pages
  const corePages = [
    "",
    "/countries",
    "/currencies",
    "/exchange-rates",
    "/converter",
    "/compare",
    "/blog",
    "/about",
    "/contact",
    "/faqs",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/sitemap",
  ]
  for (const page of corePages) {
    xmlUrls.push(
      `<url><loc>${BASE_URL}${page}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`
    )
  }

  // 2. Country pages
  for (const country of countries) {
    xmlUrls.push(
      `<url><loc>${BASE_URL}/country/${country.id}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
  }

  // 3. Currency pages
  for (const currency of currencies) {
    xmlUrls.push(
      `<url><loc>${BASE_URL}/currency/${currency.id}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
  }

  // 4. Exchange rate pair pages (all pairs in the matrix)
  for (const pair of exchangeRatesMatrix) {
    const slug = `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`
    xmlUrls.push(
      `<url><loc>${BASE_URL}/exchange-rates/${slug}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`
    )
  }

  // 5. Blog pages
  for (const post of blogs) {
    xmlUrls.push(
      `<url><loc>${BASE_URL}/blog/${post.id}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    )
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join("\n")}
</urlset>`

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
