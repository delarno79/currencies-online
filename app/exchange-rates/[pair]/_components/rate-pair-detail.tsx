"use client"

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowLeftRight,
  ArrowUpRight,
  Calculator,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { HistoryPoint } from "@/lib/historical-rates"
import { RateChart } from "./rate-chart"

interface RatePairDetailProps {
  fromCode: string
  toCode: string
  fromName: string
  toName: string
  rate: number
  historyData?: HistoryPoint[]
}

export function RatePairDetail({
  fromCode,
  toCode,
  fromName,
  toName,
  rate,
  historyData,
}: RatePairDetailProps) {
  const [amount, setAmount] = useState<string>("100")

  const inverseRate = 1 / rate

  // Deterministic fluctuation for changes (matching RatesTable)
  const seed = (fromCode.charCodeAt(0) + toCode.charCodeAt(0)) * rate
  const dailyChange = Number((Math.sin(seed) * 0.45).toFixed(2))
  const weeklyChange = Number((Math.cos(seed * 0.8) * 0.95).toFixed(2))
  const monthlyChange = Number((Math.sin(seed * 0.4) * 1.85).toFixed(2))

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only numbers and decimal
    const val = e.target.value
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setAmount(val)
    }
  }

  const numericAmount = parseFloat(amount) || 0
  const convertedAmount = numericAmount * rate
  const inverseConvertedAmount = numericAmount * inverseRate

  // Quick values table data
  const quickAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000]

  return (
    <div className="space-y-8">
      {/* Back link */}
      <div>
        <Link href="/exchange-rates">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exchange Rates Directory
          </Button>
        </Link>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col justify-between gap-6 border border-border bg-card p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
        <div className="space-y-1.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            Exchange Rate Analysis
          </span>
          <h1 className="font-extrabold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
            {fromCode} to {toCode} Exchange Rate
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Convert {fromName} ({fromCode}) to {toName} ({toCode}) at live
            reference interbank rates.
          </p>
        </div>

        <div className="shrink-0 text-left md:text-right">
          <div className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">
            Current Rate
          </div>
          <div className="mt-1 font-black font-mono text-3xl text-foreground">
            1 {fromCode} ={" "}
            <span className="text-primary">{rate.toFixed(4)}</span> {toCode}
          </div>
          <div className="mt-0.5 text-muted-foreground text-xs">
            1 {toCode} = {inverseRate.toFixed(4)} {fromCode}
          </div>

          {/* Change Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 md:justify-end">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-[10px] ${dailyChange >= 0 ? "animate-pulse bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
              title="Daily Fluctuation"
            >
              {dailyChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              D: {dailyChange >= 0 ? "+" : ""}
              {dailyChange}%
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-[10px] ${weeklyChange >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
              title="Weekly Fluctuation"
            >
              {weeklyChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              W: {weeklyChange >= 0 ? "+" : ""}
              {weeklyChange}%
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-[10px] ${monthlyChange >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
              title="Monthly Fluctuation"
            >
              {monthlyChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              M: {monthlyChange >= 0 ? "+" : ""}
              {monthlyChange}%
            </span>
          </div>
        </div>
      </div>

      {/* Calculator and Chart Row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Calculator Widget */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-5 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <Calculator className="h-4.5 w-4.5 text-primary" />
                Quick Conversion Calculator
              </h2>

              {/* Input from */}
              <div className="space-y-2">
                <label
                  htmlFor="amount-input"
                  className="font-semibold text-muted-foreground text-xs uppercase"
                >
                  From Amount ({fromCode})
                </label>
                <div className="relative">
                  <Input
                    id="amount-input"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="h-12 border-border pr-16 font-bold font-mono"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 font-bold font-mono text-muted-foreground text-sm">
                    {fromCode}
                  </div>
                </div>
              </div>

              {/* Output to */}
              <div className="space-y-2 border border-border bg-muted/30 p-4">
                <div className="font-semibold text-muted-foreground text-xs uppercase">
                  To Amount ({toCode})
                </div>
                <div className="mt-1.5 font-black font-mono text-primary text-xl">
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </div>
                <div className="mt-0.5 font-medium text-[10px] text-muted-foreground">
                  Reference Rate: 1 {fromCode} = {rate.toFixed(4)} {toCode}
                </div>
              </div>

              {/* Inverse conversion view */}
              <div className="space-y-2 border-border border-t pt-3 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Inverse converter ({toCode} to {fromCode}):
                  </span>
                </div>
                <div className="border border-border bg-muted/20 p-2.5 font-mono font-semibold text-foreground">
                  {numericAmount} {toCode} ={" "}
                  {inverseConvertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}{" "}
                  {fromCode}
                </div>
              </div>

              <div className="pt-2">
                {/* Swap Link */}
                <Link
                  href={`/exchange-rates/${toCode.toLowerCase()}-to-${fromCode.toLowerCase()}`}
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-border py-4 text-xs"
                  >
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                    Switch Conversion Direction
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Verification Box */}
          <div className="flex items-start gap-3 border border-border bg-muted/20 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-bold text-foreground text-xs">
                Reference Rates
              </h4>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Rates represent interbank calculations. High-volume commercial
                exchange rates may carry spreads or retail fees.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Recharts Chart */}
        <div className="lg:col-span-2">
          <RateChart
            rate={rate}
            fromCode={fromCode}
            toCode={toCode}
            historyData={historyData}
          />
        </div>
      </div>

      {/* Grid of Conversion Reference Tables (SEO goldmines) */}
      <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
        {/* Table 1: From to To */}
        <div className="space-y-4">
          <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider">
            {fromCode} to {toCode} Quick Conversion Table
          </h3>
          <div className="overflow-hidden border border-border bg-card">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-border border-b bg-muted/40 font-bold text-foreground">
                  <th className="p-3">{fromCode} Amount</th>
                  <th className="p-3">{toCode} Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 font-mono text-muted-foreground">
                {quickAmounts.map((amt) => (
                  <tr key={amt} className="hover:bg-accent/20">
                    <td className="p-3 font-semibold text-foreground">
                      {amt.toLocaleString()} {fromCode}
                    </td>
                    <td className="p-3 font-bold text-primary">
                      {(amt * rate).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}{" "}
                      {toCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: To to From */}
        <div className="space-y-4">
          <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider">
            {toCode} to {fromCode} Quick Conversion Table
          </h3>
          <div className="overflow-hidden border border-border bg-card">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-border border-b bg-muted/40 font-bold text-foreground">
                  <th className="p-3">{toCode} Amount</th>
                  <th className="p-3">{fromCode} Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 font-mono text-muted-foreground">
                {quickAmounts.map((amt) => (
                  <tr key={amt} className="hover:bg-accent/20">
                    <td className="p-3 font-semibold text-foreground">
                      {amt.toLocaleString()} {toCode}
                    </td>
                    <td className="p-3 font-bold text-primary">
                      {(amt * inverseRate).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}{" "}
                      {fromCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
