"use client"

import { Coins, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Country } from "@/lib/data"

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.id}`} className="group block">
      <Card className="h-full border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/30 hover:shadow-md">
        <CardContent className="flex h-full flex-col justify-between gap-5 p-6">
          {/* Top: Flag and Name */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-4xl leading-none"
                role="img"
                aria-label={`Flag of ${country.name}`}
              >
                {country.flag}
              </span>
              <div>
                <h3 className="font-bold text-foreground text-lg transition-colors group-hover:text-primary">
                  {country.name}
                </h3>
                <span className="mt-0.5 flex items-center gap-1 font-medium text-muted-foreground text-xs">
                  <MapPin className="h-3 w-3" />
                  {country.capital}
                </span>
              </div>
            </div>
          </div>

          {/* Mid details */}
          <div className="grid grid-cols-2 gap-4 border-border border-t border-b py-3 text-xs">
            <div>
              <div className="mb-1 flex items-center gap-1 font-medium text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-muted-foreground/80" />
                Population
              </div>
              <div className="font-semibold text-foreground">
                {country.population}
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 font-medium text-muted-foreground">
                <Coins className="h-3.5 w-3.5 text-muted-foreground/80" />
                Currency
              </div>
              <div className="font-bold text-foreground">
                {country.currencyCode}{" "}
                <span className="font-medium text-primary">
                  ({country.currencySymbol})
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: rate and link */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-muted-foreground">USD Exchange Rate</span>
            <span className="font-bold font-mono text-foreground transition-colors group-hover:text-primary">
              1 USD = {country.usdRate} {country.currencyCode}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
