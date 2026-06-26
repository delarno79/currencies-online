"use client"

import { ArrowRight, MapPin, Search, Navigation } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

interface CityItem {
  name: string
  slug: string
  state: string | null
}

interface DirectorySearchProps {
  cities: CityItem[]
  title?: string
  subtitle?: string
}

export function DirectorySearch({ cities, title, subtitle }: DirectorySearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<CityItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [activeTab, setActiveTab] = useState<"city" | "zip">("city")
  const [zipQuery, setZipQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.")
      return
    }

    setIsLocating(true)
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Coordinates for seeded cities
        const cityCoords = [
          { slug: "new-york-ny", name: "New York", state: "NY", lat: 40.7128, lng: -74.0060 },
          { slug: "miami-fl", name: "Miami", state: "FL", lat: 25.7617, lng: -80.1918 },
          { slug: "los-angeles-ca", name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437 }
        ]

        let closestCity = cityCoords[0]
        let minDistance = Infinity

        for (const city of cityCoords) {
          const distance = Math.sqrt(
            Math.pow(city.lat - latitude, 2) + Math.pow(city.lng - longitude, 2)
          )
          if (distance < minDistance) {
            minDistance = distance
            closestCity = city
          }
        }

        setQuery(`${closestCity.name}, ${closestCity.state}`)
        router.push(`/currency-exchange/${closestCity.slug}`)
        setIsLocating(false)
      },
      (error) => {
        console.error("Geolocation error:", error)
        setLocationError("Unable to retrieve your location.")
        setIsLocating(false)
      }
    )
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter suggestions
  useEffect(() => {
    if (query.trim().length < 1) {
      setSuggestions([])
      return
    }

    const filtered = cities
      .filter((city) => {
        const searchStr = `${city.name} ${city.state ?? ""}`.toLowerCase()
        return searchStr.includes(query.toLowerCase())
      })
      .slice(0, 5)

    setSuggestions(filtered)
    setIsOpen(true)
  }, [query, cities])

  const handleSelect = (city: CityItem) => {
    setQuery(`${city.name}${city.state ? `, ${city.state}` : ""}`)
    setIsOpen(false)
    router.push(`/currency-exchange/${city.slug}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // If there's an exact match or first suggestion, go to it
    if (suggestions.length > 0) {
      handleSelect(suggestions[0])
    } else {
      // Slugify user query and go there
      const slug = query
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      router.push(`/currency-exchange/${slug}`)
    }
  }

  return (
    <section
      className="relative px-4 py-12"
      style={{
        background: "var(--hero-bg)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-lg flex-col items-center space-y-6">
          
          {/* Description Text */}
          <div className="text-center">
            <p className="max-w-lg font-semibold text-slate-500 text-sm leading-relaxed dark:text-slate-400">
              {subtitle || "Find physical currency exchange stores, bureaus, and local offices across the United States. Search by city or ZIP code to view listings, directions, ratings, and phone numbers."}
            </p>
          </div>

          {/* Boxed Menu Container */}
          <div className="w-full rounded-lg border border-[#0a74b9]/25 bg-background shadow-md text-center">
            
            {/* Header Cell */}
            <div className="border-b border-[#0a74b9]/20 bg-blue-50/20 py-4 dark:bg-[#0a74b9]/10 rounded-t-lg">
              <h2 className="font-bold text-[#0a74b9] text-xl tracking-tight dark:text-blue-400">
                {title || "Currency Exchange Near Me"}
              </h2>
            </div>

            {/* Bottom Row / Tabs Cell */}
            <div className="grid grid-cols-2 border-b border-[#0a74b9]/20">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("city")
                  setLocationError("")
                }}
                className={cn(
                  "py-3 font-bold text-sm transition-all duration-200 border-r border-[#0a74b9]/20 cursor-pointer",
                  activeTab === "city"
                    ? "bg-[#0a74b9]/10 text-[#0a74b9] dark:text-blue-400 font-extrabold"
                    : "text-slate-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                )}
              >
                Search by City
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("zip")
                  setLocationError("")
                }}
                className={cn(
                  "py-3 font-bold text-sm transition-all duration-200 cursor-pointer",
                  activeTab === "zip"
                    ? "bg-[#0a74b9]/10 text-[#0a74b9] dark:text-blue-400 font-extrabold"
                    : "text-slate-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                )}
              >
                Search by Zip Code
              </button>
            </div>

            {/* Form Container */}
            <div className="p-6 text-left relative" ref={containerRef}>
              {activeTab === "city" ? (
                /* City Search Form */
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <InputGroup className="h-12 flex-1 rounded-lg border border-primary/50 bg-background transition duration-200 focus-within:border-blue-500/50">
                    <InputGroupInput
                      type="text"
                      placeholder="Enter city name (e.g. New York, Miami)..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => query.trim().length >= 1 && setIsOpen(true)}
                      className="pl-4 pr-24"
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end" className="pr-1.5 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleLocateMe}
                        disabled={isLocating}
                        className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-slate-500 transition"
                        title="Detect my location"
                      >
                        <Navigation className={`h-3.5 w-3.5 ${isLocating ? "animate-spin text-blue-500" : ""}`} />
                      </button>
                      <InputGroupButton
                        type="submit"
                        variant="default"
                        className="h-9 cursor-pointer gap-1 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-500"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Find
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              ) : (
                /* Zip Code Search Form */
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const cleaned = zipQuery.trim()
                    if (!cleaned) return
                    if (/^\d{5}$/.test(cleaned)) {
                      router.push(`/currency-exchange/${cleaned}`)
                    } else {
                      setLocationError("Please enter a valid 5-digit US zip code.")
                    }
                  }}
                  className="relative flex items-center"
                >
                  <InputGroup className="h-12 flex-1 rounded-lg border border-primary/50 bg-background transition duration-200 focus-within:border-blue-500/50">
                    <InputGroupInput
                      type="text"
                      placeholder="Enter 5-digit US Zip Code (e.g. 10001)..."
                      value={zipQuery}
                      onChange={(e) => {
                        setZipQuery(e.target.value)
                        if (locationError) setLocationError("")
                      }}
                      className="pl-4 pr-16"
                      autoComplete="off"
                      maxLength={5}
                    />
                    <InputGroupAddon align="inline-end" className="pr-1.5 flex items-center">
                      <InputGroupButton
                        type="submit"
                        variant="default"
                        className="h-9 cursor-pointer gap-1 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white transition hover:bg-blue-500"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Find
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              )}

              {locationError && (
                <p className="text-destructive text-xs font-semibold mt-2 text-center">
                  {locationError}
                </p>
              )}

              {/* Suggestions Dropdown */}
              {activeTab === "city" && isOpen && suggestions.length > 0 && (
                <div className="fade-in slide-in-from-top-2 absolute right-6 left-6 z-50 mt-2 animate-in rounded-md border border-border bg-background/95 p-2 text-left shadow-2xl backdrop-blur-md duration-150">
                  <div className="px-3 py-1.5 font-semibold text-muted-foreground/70 text-xs uppercase tracking-wider">
                    Select a City
                  </div>
                  <div className="mt-1 divide-y divide-border/20">
                    {suggestions.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => handleSelect(city)}
                        type="button"
                        className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-blue-500" />
                          <span className="font-medium">
                            {city.name}
                            {city.state ? `, ${city.state}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-primary text-xs">
                          <span>View Listings</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
