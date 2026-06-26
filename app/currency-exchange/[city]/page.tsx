import { ArrowLeft, Globe, MapPin, Navigation, Phone, Star } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Adsense } from "@/app/_components/adsense"
import { db } from "@/lib/db"

async function getCityBySlug(slug: string) {
  let city = await db.city.findUnique({
    where: { slug },
  })
  if (!city) {
    city = await db.city.findFirst({
      where: {
        OR: [{ slug: { startsWith: `${slug}-` } }, { slug: { equals: slug } }],
      },
    })
  }
  return city
}

function parseCityFromSlug(slug: string) {
  const match = slug.match(/^([a-z0-9-]+)-([a-z]{2})$/i)
  if (match) {
    const cityPart = match[1]
    const statePart = match[2].toUpperCase()
    const cityName = cityPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    return {
      name: cityName,
      slug: slug,
      state: statePart,
      country: "United States",
      countryCode: "US",
    }
  }

  const words = slug.split("-")
  const cityName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return {
    name: cityName,
    slug: slug,
    state: null,
    country: "United States",
    countryCode: "US",
  }
}

async function getOrCreateCity(slug: string) {
  const isZipCode = /^\d{5}$/.test(slug)
  if (isZipCode) {
    return {
      name: `Zip Code ${slug}`,
      slug: slug,
      state: "US",
      country: "United States",
      countryCode: "US",
    }
  }

  let city = await getCityBySlug(slug)
  if (!city) {
    const parsed = parseCityFromSlug(slug)
    try {
      city = await db.city.create({
        data: parsed,
      })
    } catch (e) {
      console.error("Failed to dynamically seed city from slug:", slug, e)
      city = parsed as any
    }
  }
  return city
}

interface PlaceDetail {
  name: string
  formatted_address: string
  rating?: number
  user_ratings_total?: number
  formatted_phone_number?: string
  website?: string
  place_id: string
}

async function fetchLocalExchanges(
  cityName: string,
  state: string | null
): Promise<PlaceDetail[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.error("Missing GOOGLE_PLACES_API_KEY in environment variables.")
    return []
  }

  let query = `currency exchange in ${cityName} ${state || ""}`
  
  // Clean query for zip codes to optimize Google Places API results
  const zipMatch = cityName.match(/Zip Code (\d{5})/i)
  if (zipMatch) {
    query = `currency exchange in ${zipMatch[1]}`
  }

  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`

  try {
    const res = await fetch(searchUrl, { next: { revalidate: 3600 } }) // Cache listings for 1 hour
    const data = await res.json()

    if (data.status !== "OK" || !data.results) {
      console.error(
        `Google Places Search failed for query "${query}":`,
        data.status,
        data.error_message
      )
      return []
    }

    const places = data.results.slice(0, 8) as any[]

    // Fetch detail info (phone, website) in parallel for the top places
    const detailedPlaces = await Promise.all(
      places.map(async (place) => {
        try {
          const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=formatted_phone_number,website&key=${apiKey}`
          const detailRes = await fetch(detailUrl, {
            next: { revalidate: 3600 },
          })
          const detailData = await detailRes.json()

          const details = detailData.result || {}
          return {
            name: place.name,
            formatted_address: place.formatted_address,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            formatted_phone_number: details.formatted_phone_number || undefined,
            website: details.website || undefined,
            place_id: place.place_id,
          }
        } catch (detailErr) {
          console.error(
            `Failed to fetch details for place ID ${place.place_id}:`,
            detailErr
          )
          return {
            name: place.name,
            formatted_address: place.formatted_address,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            place_id: place.place_id,
          }
        }
      })
    )

    return detailedPlaces
  } catch (err) {
    console.error(`Error loading local exchanges for ${cityName}:`, err)
    return []
  }
}

export async function generateMetadata(props: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: citySlug } = await props.params
  const city = await getOrCreateCity(citySlug)

  if (!city) {
    return {
      title: "City Not Found | Currencies.global",
    }
  }

  const cityName = city.name
  const stateName = city.state ? `, ${city.state}` : ""

  return {
    title: `Best Currency Exchange in ${cityName}${stateName} | Local Directory`,
    description: `Find the best currency exchange stores in ${cityName}${stateName}. View live addresses, contact phone numbers, google ratings, and map directions.`,
  }
}

export default function CityDirectoryPage(props: {
  params: Promise<{ city: string }>
}) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-[1440px] px-4 py-20 text-center text-muted-foreground sm:px-6 lg:px-8">
          Loading currency exchange directory...
        </div>
      }
    >
      <CityDirectoryPageContent params={props.params} />
    </Suspense>
  )
}

async function CityDirectoryPageContent({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const isZipCode = /^\d{5}$/.test(citySlug)

  const city = await getOrCreateCity(citySlug)

  if (!city) {
    notFound()
  }

  if (!isZipCode && city.slug !== citySlug) {
    redirect(`/currency-exchange/${city.slug}`)
  }

  const listings = await fetchLocalExchanges(city.name, city.state)

  // JSON-LD SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://currencies.global",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Currency Exchange in ${city.name}`,
            item: `https://currencies.global/currency-exchange/${city.slug}`,
          },
        ],
      },
      ...listings.map((item, idx) => ({
        "@type": "FinancialService",
        "@id": `https://currencies.global/currency-exchange/${city.slug}#listing-${idx}`,
        name: item.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: item.formatted_address,
          addressLocality: city.name,
          addressRegion: city.state || undefined,
          addressCountry: "US",
        },
        telephone: item.formatted_phone_number || undefined,
        url: item.website || undefined,
        aggregateRating: item.rating
          ? {
              "@type": "AggregateRating",
              ratingValue: item.rating,
              reviewCount: item.user_ratings_total || 1,
            }
          : undefined,
      })),
    ],
  }

  return (
    <div className="container mx-auto max-w-[1440px] space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-1.5 font-semibold text-muted-foreground text-xs">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Currency Exchange</span>
          <span>/</span>
          <span className="font-bold text-foreground">
            {city.name}
            {city.state ? `, ${city.state}` : ""}
          </span>
        </div>
      </div>

      {/* Header Block */}
      <div
        className="relative overflow-hidden rounded-2xl border border-primary/10 p-6 text-left shadow-sm sm:p-10"
        style={{
          background: "var(--hero-bg)",
        }}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-bold text-blue-600 text-xs uppercase tracking-wider dark:text-blue-400">
            Local Directory
          </span>
          <h1 className="font-extrabold text-3xl text-[#0a1f44] tracking-tight sm:text-4xl dark:text-white">
            Best Currency Exchange Near Me
          </h1>
          <p className="font-semibold text-slate-500 text-sm leading-relaxed sm:text-base dark:text-slate-400">
            Compare local currency exchange providers, banks, and currency
            booths near {city.name}. Find store addresses, contact telephone
            details, Google ratings, and get driving directions.
          </p>
        </div>
      </div>

      {/* Adsense Top Spot */}
      <div className="w-full">
        <Adsense slot="city-top-banner" format="horizontal" />
      </div>

      {/* Listings Section */}
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 font-bold text-foreground text-xl">
          <MapPin className="h-5 w-5 text-blue-500" />
          Local Exchange Locations ({listings.length})
        </h2>

        {listings.length === 0 ? (
          <Card className="border border-border bg-card/40 py-16 text-center text-muted-foreground">
            <CardContent className="space-y-4">
              <MapPin className="mx-auto h-10 w-10 text-slate-500" />
              <div className="font-semibold text-lg">No Listings Found</div>
              <p className="mx-auto max-w-md text-sm">
                We couldn&apos;t retrieve currency exchange locations for this
                city. Please verify your internet connection or try another
                location.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {listings.map((item) => (
              <Card
                key={item.place_id}
                className="border border-border bg-card/40 shadow-sm transition hover:border-primary/20 hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col justify-between space-y-6 p-6">
                  {/* Name and Rating */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-base text-foreground leading-tight transition hover:text-primary">
                        {item.name}
                      </h3>
                      {item.rating && (
                        <div className="flex items-center gap-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-0.5 font-bold text-xs text-yellow-500">
                          <Star className="h-3 w-3 fill-yellow-500" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="font-semibold text-[10px] text-yellow-500/60">
                            ({item.user_ratings_total})
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="flex items-start gap-1.5 text-muted-foreground text-xs leading-relaxed">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                      <span>{item.formatted_address}</span>
                    </p>
                  </div>

                  {/* Contact Info and Buttons */}
                  <div className="flex flex-col gap-4 border-border border-t pt-4">
                    {item.formatted_phone_number && (
                      <a
                         href={`tel:${item.formatted_phone_number.replace(/\s+/g, "")}`}
                        className="flex items-center gap-2 font-medium text-muted-foreground text-xs transition hover:text-primary"
                      >
                        <Phone className="h-3.5 w-3.5 text-blue-500" />
                        <span>{item.formatted_phone_number}</span>
                      </a>
                    )}

                    <div className="flex flex-wrap gap-2.5">
                      <a
                         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + " " + item.formatted_address)}&query_place_id=${item.place_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[120px] flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full gap-1.5 border-border py-2.5 font-bold text-xs"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          Directions
                        </Button>
                      </a>
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-[120px] flex-1"
                        >
                          <Button
                            variant="default"
                            className="w-full gap-1.5 bg-blue-600 py-2.5 font-bold text-white text-xs hover:bg-blue-500"
                          >
                            <Globe className="h-3.5 w-3.5" />
                            Website
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Adsense Bottom Spot */}
      <div className="w-full pt-4">
        <Adsense slot="city-bottom-banner" format="horizontal" />
      </div>
    </div>
  )
}
