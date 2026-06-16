import {
  ArrowLeft,
  ArrowRight,
  Coins,
  Globe,
  MapPin,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Country } from "@/lib/data"
import { getCachedCountries, getCachedCurrencies } from "@/lib/data-cache"

interface CountryDetailProps {
  country: Country
}

export async function CountryDetail({ country }: CountryDetailProps) {
  const [allCountries, allCurrencies] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
  ])

  // Find related country details from dynamic database
  const relatedList = country.relatedCountries
    .map((id) => allCountries.find((c) => c.id === id))
    .filter((c): c is Country => !!c)

  const matchingCurrency = allCurrencies.find(
    (c) => c.code.toUpperCase() === country.currencyCode.toUpperCase()
  )

  const isInflationHigh = country.inflationRate > 5.0

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link href="/countries">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Countries Directory
          </Button>
        </Link>
      </div>

      {/* Main Country Card Profile */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: General Profile Card */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6 sm:p-8">
              {/* Profile Header */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <span
                    className="text-6xl leading-none sm:text-7xl"
                    role="img"
                    aria-label={`Flag of ${country.name}`}
                  >
                    {country.flag}
                  </span>
                  <div>
                    <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
                      {country.name}
                    </h1>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-semibold text-muted-foreground text-xs">
                      <Globe className="h-3 w-3" />
                      {country.region}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {country.description}
              </p>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 border-border border-t pt-4 sm:grid-cols-3">
                <div className="border border-border bg-muted/30 p-4">
                  <span className="mb-1.5 flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Capital City
                  </span>
                  <div className="font-bold text-base text-foreground">
                    {country.capital}
                  </div>
                </div>

                <div className="border border-border bg-muted/30 p-4">
                  <span className="mb-1.5 flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Population
                  </span>
                  <div className="font-bold text-base text-foreground">
                    {country.population}
                  </div>
                </div>

                <div className="col-span-2 border border-border bg-muted/30 p-4 sm:col-span-1">
                  <span className="mb-1.5 flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
                    <Coins className="h-3.5 w-3.5 text-primary" />
                    Official Currency
                  </span>
                  <div className="font-bold text-base text-foreground">
                    {country.currencyCode}{" "}
                    <span className="font-medium text-primary">
                      ({country.currencySymbol})
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Countries Section */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
              Related Countries
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedList.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/country/${rel.id}`}
                  className="group"
                >
                  <Card className="border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/40 hover:shadow-sm">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">
                          {rel.flag}
                        </span>
                        <div>
                          <h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-primary">
                            {rel.name}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {rel.capital}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Currency Exchange Rates stats Card */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6">
              <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Currency Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-muted-foreground text-xs">
                    Currency Name
                  </div>
                  <div className="font-bold text-base text-foreground">
                    {country.currencyName}
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground text-xs">
                    Currency Code & Symbol
                  </div>
                  <div className="flex items-center gap-2 font-bold font-mono text-base text-primary">
                    <span>{country.currencyCode}</span>
                    <span className="font-sans text-muted-foreground/40">
                      |
                    </span>
                    <span>{country.currencySymbol}</span>
                  </div>
                </div>

                <div className="border-border border-t pt-4">
                  <div className="text-muted-foreground text-xs">
                    Live Exchange Rate vs USD
                  </div>
                  <div className="mt-1 font-black font-mono text-foreground text-xl">
                    1 USD ={" "}
                    <span className="text-primary">{country.usdRate}</span>{" "}
                    {country.currencyCode}
                  </div>
                  <div className="mt-1 font-mono text-muted-foreground text-xs">
                    1 {country.currencyCode} ={" "}
                    {(1 / country.usdRate).toFixed(4)} USD
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-border border-t pt-4">
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Purchasing Power
                    </div>
                    <div className="mt-0.5 font-bold text-foreground text-sm">
                      {country.purchasingPowerIndex} / 100
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Inflation Rate
                    </div>
                    <div
                      className={`mt-0.5 flex items-center gap-0.5 font-bold text-sm ${isInflationHigh ? "text-destructive" : "text-emerald-500"}`}
                    >
                      {isInflationHigh ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {country.inflationRate}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-border border-t pt-4">
                {/* Convert link */}
                <Link
                  href={`/converter?from=USD&to=${country.currencyCode}`}
                  className="block w-full"
                >
                  <Button className="w-full gap-2 py-4 text-xs">
                    Convert USD to {country.currencyCode}
                  </Button>
                </Link>

                {/* Currency Detail Link */}
                {matchingCurrency && (
                  <Link
                    href={`/currency/${matchingCurrency.id}`}
                    className="block w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-border py-4 text-xs"
                    >
                      View {country.currencyCode} Analysis
                    </Button>
                  </Link>
                )}

                {/* Compare Country Link */}
                <Link
                  href={`/compare?type=countries&c1=${country.id}`}
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-border py-4 text-xs"
                  >
                    Compare {country.name} with others
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Verification Badge */}
          <div className="flex items-start gap-3 border border-border bg-muted/20 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-bold text-foreground text-xs">
                Verified Information
              </h4>
              <p className="mt-1 text-[11px] text-muted-foreground">
                This country data is cross-referenced using international codes
                and exchange rate databases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
