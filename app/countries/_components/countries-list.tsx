"use client"

import { Globe } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import type { Country } from "@/lib/data"
import { CountryCard } from "./country-card"
import { SearchFilter } from "./search-filter"

interface CountriesListProps {
  countries: Country[]
}

export function CountriesList({ countries }: CountriesListProps) {
  const searchParams = useSearchParams()
  const q = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState(q)
  const [selectedRegion, setSelectedRegion] = useState<string>("All")

  const regions = useMemo(() => {
    const list = new Set(countries.map((c) => c.region))
    return ["All", ...Array.from(list)]
  }, [countries])

  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.currencyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.currencyName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion =
        selectedRegion === "All" || c.region === selectedRegion

      return matchesSearch && matchesRegion
    })
  }, [countries, searchTerm, selectedRegion])

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
      />

      {/* Grid List */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-border bg-card py-20 text-center">
          <Globe className="mb-4 h-12 w-12 animate-bounce text-muted-foreground/40" />
          <h3 className="font-bold text-foreground text-lg">
            No Countries Found
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground text-sm">
            We couldn't find any country matching your search criteria. Try
            modifying your filters or search terms.
          </p>
        </div>
      )}
    </div>
  )
}
