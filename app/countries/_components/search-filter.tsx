"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input as UiInput } from "@/components/ui/input"

interface SearchFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedRegion: string
  setSelectedRegion: (region: string) => void
  regions: string[]
}

export function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-4 border border-border bg-card p-4 md:flex-row md:items-center">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <UiInput
          type="text"
          placeholder="Search by country, capital, currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-border bg-background/50 pl-9"
        />
      </div>

      {/* Region Tabs */}
      <div className="flex flex-nowrap gap-1.5 overflow-x-auto overflow-y-hidden pb-1 md:flex-wrap md:overflow-x-visible md:overflow-y-visible md:pb-0">
        {regions.map((region) => (
          <Button
            key={region}
            variant={selectedRegion === region ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedRegion(region)}
            className="px-4 py-1.5 font-semibold text-xs"
          >
            {region}
          </Button>
        ))}
      </div>
    </div>
  )
}
