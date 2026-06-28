import { Info, Scale, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getCachedCountries } from "@/lib/data-cache"

export async function CurrencyRankings() {
  const countries = await getCachedCountries()
  // Compute rankings statically from data
  const strengthRankings = [...countries]
    .sort(
      (a, b) =>
        b.purchasingPowerIndex -
        b.inflationRate -
        (a.purchasingPowerIndex - a.inflationRate)
    )
    .slice(0, 10)

  const purchasingPowerRankings = [...countries]
    .sort((a, b) => b.purchasingPowerIndex - a.purchasingPowerIndex)
    .slice(0, 10)

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
          <Trophy className="h-6 w-6 text-primary" />
          Global Currency Rankings
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Compare currency metrics globally. Browse the strongest currencies and
          nations with the highest purchasing power scores below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Column 1: Strongest Currencies */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-1.5 font-bold text-muted-foreground text-sm uppercase tracking-wider">
            <Scale className="h-4 w-4 text-primary" />
            Top 10 Strongest Currencies
          </h3>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-border border-b bg-muted/40 font-bold text-foreground">
                    <th className="w-12 p-4">Rank</th>
                    <th className="p-4">Country / Currency</th>
                    <th className="p-4 text-right">Power Index</th>
                    <th className="p-4 text-right">Inflation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-mono text-muted-foreground">
                  {strengthRankings.map((country, idx) => (
                    <tr
                      key={country.id}
                      className="group transition-colors duration-150 hover:bg-accent/25"
                    >
                      <td className="p-4 font-bold text-foreground">
                        #{idx + 1}
                      </td>
                      <td className="p-4 font-sans font-semibold text-foreground">
                        <Link
                          href={`/country/${country.id}-currency`}
                          className="flex items-center gap-2 transition-colors hover:text-primary"
                        >
                          <span className="text-lg leading-none">
                            {country.flag}
                          </span>
                          <span>
                            {country.currencyCode} - {country.name} Currency
                          </span>
                        </Link>
                      </td>
                      <td className="p-4 text-right">
                        {country.purchasingPowerIndex}
                      </td>
                      <td className="p-4 text-right text-emerald-500">
                        {country.inflationRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2: Purchasing Power */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-1.5 font-bold text-muted-foreground text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-primary" />
            Top 10 Purchasing Power Index
          </h3>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-border border-b bg-muted/40 font-bold text-foreground">
                    <th className="w-12 p-4">Rank</th>
                    <th className="p-4">Country</th>
                    <th className="p-4 text-right">Index Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-mono text-muted-foreground">
                  {purchasingPowerRankings.map((country, idx) => (
                    <tr
                      key={country.id}
                      className="group transition-colors duration-150 hover:bg-accent/25"
                    >
                      <td className="p-4 font-bold text-foreground">
                        #{idx + 1}
                      </td>
                      <td className="p-4 font-sans font-semibold text-foreground">
                        <Link
                          href={`/country/${country.id}-currency`}
                          className="flex items-center gap-2 transition-colors hover:text-primary"
                        >
                          <span className="text-lg leading-none">
                            {country.flag}
                          </span>
                          <span>{country.name} Currency</span>
                        </Link>
                      </td>
                      <td className="p-4 text-right font-bold text-primary">
                        {country.purchasingPowerIndex} / 100
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mt-8 border border-border bg-muted/20">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
          <p className="text-[11px] text-muted-foreground leading-normal">
            <strong>Rankings Explanation:</strong> Currency Strength is
            evaluated using localized purchasing power parity metrics combined
            with domestic inflation data. A higher purchasing power index
            implies a greater capacity to acquire goods and services compared to
            the US Dollar baseline (score 100.0).
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
