"use client"

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input as UiInput } from "@/components/ui/input"
import { type Currency, currencies as staticCurrencies } from "@/lib/data"

interface RatesTableProps {
  initialCurrencies?: Currency[]
}

export function RatesTable({ initialCurrencies }: RatesTableProps) {
  const currencies = initialCurrencies || staticCurrencies
  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [searchQuery, setSearchQuery] = useState("")

  const majorCodes = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "CAD",
    "AUD",
    "CHF",
    "INR",
    "CNY",
    "MXN",
  ]

  const baseRateData = useMemo(() => {
    return currencies.find((c) => c.code === baseCurrency) || { usdRate: 1.0 }
  }, [baseCurrency, currencies])

  // Compute exchange rates for all currencies relative to selected base currency
  const calculatedRates = useMemo(() => {
    return currencies.map((curr) => {
      // usdRate is units per 1 USD
      // Rate from base to curr: (curr.usdRate) / (base.usdRate)
      const rate = curr.usdRate / baseRateData.usdRate

      // Deterministic fluctuation for changes
      const seed = curr.usdRate + baseRateData.usdRate
      const dailyChange = Number((Math.sin(seed) * 0.45).toFixed(2))
      const weeklyChange = Number((Math.cos(seed * 0.8) * 0.95).toFixed(2))
      const monthlyChange = Number((Math.sin(seed * 0.4) * 1.85).toFixed(2))

      return {
        ...curr,
        rate,
        dailyChange,
        weeklyChange,
        monthlyChange,
      }
    })
  }, [baseRateData, currencies])

  // Filter based on search query
  const filteredRates = useMemo(() => {
    return calculatedRates.filter((r) => {
      if (r.code === baseCurrency) return false // Hide base currency vs itself

      const text = `${baseCurrency} to ${r.code} ${baseCurrency}-${r.code} ${r.name}`
      return text.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [calculatedRates, searchQuery, baseCurrency])

  return (
    <div className="space-y-10">
      {/* Base Selector and Search */}
      <div className="flex flex-col items-stretch justify-between gap-6 rounded-lg border border-border bg-card p-5 lg:flex-row">
        {/* Base Currency Select Tabs */}
        <div>
          <span className="mb-2.5 block font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Select Base Currency
          </span>
          <div className="flex flex-wrap gap-1.5">
            {majorCodes.slice(0, 6).map((code) => (
              <Button
                key={code}
                variant={baseCurrency === code ? "default" : "outline"}
                size="sm"
                onClick={() => setBaseCurrency(code)}
                className="border-border px-4 font-bold font-mono"
              >
                {code}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-md flex-1">
          <span className="mb-2.5 block font-bold text-muted-foreground text-xs uppercase tracking-wider">
            Search Pairs
          </span>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <UiInput
              type="text"
              placeholder={`Search (e.g. ${baseCurrency} to EUR, JPY)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border bg-background/50 pl-9"
            />
          </div>
        </div>
      </div>

      {/* Main rates grid layout */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Left/Center: Pairs List */}
        <div className="space-y-4 xl:col-span-2">
          <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Live Currency Pairs (Base: {baseCurrency})
          </h2>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-muted-foreground text-sm">
                <thead>
                  <tr className="border-border border-b bg-muted/30 font-medium text-foreground">
                    <th className="px-6 py-4">Currency Pair</th>
                    <th className="px-6 py-4">Exchange Rate</th>
                    <th className="px-6 py-4">Daily Change</th>
                    <th className="hidden px-6 py-4 sm:table-cell">
                      Weekly Change
                    </th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {filteredRates.map((r) => {
                    const isUp = r.dailyChange >= 0
                    const isWeeklyUp = r.weeklyChange >= 0
                    const pairSlug = `${baseCurrency.toLowerCase()}-to-${r.code.toLowerCase()}`

                    return (
                      <tr
                        key={r.code}
                        className="group transition-colors hover:bg-accent/25"
                      >
                        <td className="px-6 py-4 font-semibold text-foreground">
                          <div className="flex items-center gap-2">
                            <span>{baseCurrency}</span>
                            <span className="font-normal text-muted-foreground/40">
                              /
                            </span>
                            <span className="text-primary">{r.code}</span>
                            <span className="hidden font-normal text-muted-foreground text-xs sm:inline">
                              ({r.name})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold font-mono text-foreground">
                          {r.rate.toFixed(4)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs ${isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
                          >
                            {isUp ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {isUp ? "+" : ""}
                            {r.dailyChange}%
                          </span>
                        </td>
                        <td className="hidden px-6 py-4 sm:table-cell">
                          <span
                            className={`inline-flex items-center gap-1 font-medium text-xs ${isWeeklyUp ? "text-emerald-500" : "text-destructive"}`}
                          >
                            {isWeeklyUp ? "+" : ""}
                            {r.weeklyChange}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/exchange-rates/${pairSlug}`}
                            className="inline-flex items-center gap-1 font-semibold text-primary text-xs group-hover:underline"
                          >
                            <span>Analyze</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right side: Interbank Cross Rates Matrix */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
            Cross Rates Matrix
          </h2>

          <Card className="border border-border shadow-sm">
            <CardContent className="overflow-x-auto p-4">
              <table className="w-full border-collapse text-center text-xs">
                <thead>
                  <tr className="border-border border-b bg-muted/40 font-bold text-foreground">
                    <th className="p-2.5 text-left font-bold text-muted-foreground uppercase">
                      Base
                    </th>
                    {majorCodes.slice(0, 5).map((c) => (
                      <th key={c} className="p-2.5 font-mono">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {majorCodes.slice(0, 5).map((rowCode) => {
                    const rowData = currencies.find(
                      (c) => c.code === rowCode
                    ) || { usdRate: 1.0 }
                    return (
                      <tr key={rowCode} className="hover:bg-accent/20">
                        <td className="p-2.5 text-left font-bold font-mono text-foreground">
                          {rowCode}
                        </td>
                        {majorCodes.slice(0, 5).map((colCode) => {
                          const colData = currencies.find(
                            (c) => c.code === colCode
                          ) || { usdRate: 1.0 }
                          const crossRate = colData.usdRate / rowData.usdRate
                          return (
                            <td
                              key={colCode}
                              className="p-2.5 font-mono text-muted-foreground"
                            >
                              {rowCode === colCode ? (
                                <span className="font-semibold text-muted-foreground/30">
                                  1.000
                                </span>
                              ) : (
                                crossRate.toFixed(3)
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="flex items-start gap-3.5 p-5">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h4 className="font-bold text-foreground text-xs">
                  Dynamic Calculations
                </h4>
                <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                  Our matrix updates dynamically based on reference prices.
                  Select a base currency on the left to recalculate all list
                  pairs instantly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
