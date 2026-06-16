"use client"

import { Coins, Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input as UiInput } from "@/components/ui/input"
import {
  type Country,
  type Currency,
  countries as staticCountries,
  currencies as staticCurrencies,
} from "@/lib/data"

interface CurrenciesListProps {
  initialCurrencies?: Currency[]
  initialCountries?: Country[]
}

export function CurrenciesList({
  initialCurrencies,
  initialCountries,
}: CurrenciesListProps) {
  const currencies = initialCurrencies || staticCurrencies
  const countries = initialCountries || staticCountries
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCurrencies = useMemo(() => {
    return currencies.filter((curr) => {
      const matchesSearch =
        curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curr.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curr.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curr.overview.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [searchTerm, currencies])

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="flex flex-col items-stretch justify-between gap-4 border border-border bg-card p-4 md:flex-row md:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <UiInput
            type="text"
            placeholder="Search by currency name, code, symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-border bg-background/50 pl-9"
          />
        </div>
        <div className="font-medium text-muted-foreground text-xs">
          Showing {filteredCurrencies.length} currencies from directory
        </div>
      </div>

      {/* Grid List */}
      {filteredCurrencies.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCurrencies.map((curr) => {
            // Find flags of all countries that use this currency
            const usingCountries = countries.filter(
              (c) => c.currencyCode === curr.code
            )

            return (
              <Link
                key={curr.id}
                href={`/currency/${curr.id}`}
                className="group block"
              >
                <Card className="h-full border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/30 hover:shadow-md">
                  <CardContent className="flex h-full flex-col justify-between gap-5 p-6">
                    {/* Top row: Symbol and Code */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center border border-primary/10 bg-primary/10 font-bold text-lg text-primary shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          {curr.symbol}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground transition-colors group-hover:text-primary">
                            {curr.name}
                          </h3>
                          <span className="font-mono font-semibold text-muted-foreground text-xs tracking-wider">
                            {curr.code}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 text-muted-foreground/80 text-xs leading-relaxed">
                      {curr.overview}
                    </p>

                    {/* Countries using it */}
                    <div className="space-y-1.5 pt-2">
                      <span className="font-bold text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                        Used in Countries
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {usingCountries.slice(0, 3).map((country) => (
                          <span
                            key={country.id}
                            className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 font-medium text-foreground text-xs"
                          >
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        ))}
                        {usingCountries.length > 3 && (
                          <span className="inline-flex items-center bg-muted px-2 py-0.5 font-bold text-[10px] text-muted-foreground">
                            +{usingCountries.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="flex items-center justify-between border-border border-t pt-3 text-xs">
                      <span className="text-muted-foreground">
                        Value vs USD
                      </span>
                      <span className="font-bold font-mono text-foreground transition-colors group-hover:text-primary">
                        1 USD = {curr.usdRate} {curr.code}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-border bg-card py-20 text-center">
          <Coins className="mb-4 h-12 w-12 animate-bounce text-muted-foreground/40" />
          <h3 className="font-bold text-foreground text-lg">
            No Currencies Found
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground text-sm">
            We couldn't find any currency matching your search. Try adjusting
            your search query.
          </p>
        </div>
      )}
    </div>
  )
}
