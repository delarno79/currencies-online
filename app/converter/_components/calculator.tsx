"use client"

import { AlertCircle, ArrowLeftRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { parseAsString, useQueryState } from "nuqs"
import type React from "react"
import { useMemo, useState } from "react"
import { RateChart } from "@/app/exchange-rates/[pair]/_components/rate-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { InputGroupAddon } from "@/components/ui/input-group"
import {
  type Country,
  type Currency,
  countries as staticCountries,
  currencies as staticCurrencies,
} from "@/lib/data"
import { cn } from "@/lib/utils"

interface CalculatorWidgetProps {
  initialCurrencies?: Currency[]
  initialCountries?: Country[]
}

export function CalculatorWidget({
  initialCurrencies,
  initialCountries,
}: CalculatorWidgetProps = {}) {
  const currencies = initialCurrencies || staticCurrencies
  const countries = initialCountries || staticCountries
  const [fromCurr, setFromCurr] = useQueryState(
    "from",
    parseAsString
      .withDefault("USD")
      .withOptions({ shallow: true, throttleMs: 300 })
  )
  const [toCurr, setToCurr] = useQueryState(
    "to",
    parseAsString
      .withDefault("EUR")
      .withOptions({ shallow: true, throttleMs: 300 })
  )
  const [amount, setAmount] = useQueryState(
    "amount",
    parseAsString
      .withDefault("100")
      .withOptions({ shallow: true, throttleMs: 300 })
  )

  const [isRotated, setIsRotated] = useState(false)

  // Fetch currency details
  const fromData = useMemo(() => {
    const code = (fromCurr || "USD").toUpperCase()
    return currencies.find((c) => c.code === code) || currencies[0]
  }, [fromCurr, currencies])

  const toData = useMemo(() => {
    const code = (toCurr || "EUR").toUpperCase()
    return currencies.find((c) => c.code === code) || currencies[1]
  }, [toCurr, currencies])

  const activeFrom = fromData.code
  const activeTo = toData.code

  // Calculate rate: (toData.usdRate) / (fromData.usdRate)
  const exchangeRate = useMemo(() => {
    return toData.usdRate / fromData.usdRate
  }, [fromData, toData])

  const convertedValue = useMemo(() => {
    const num = parseFloat(amount || "0") || 0
    return num * exchangeRate
  }, [amount, exchangeRate])

  function handleSwap() {
    setIsRotated((prev) => !prev)
    setFromCurr(activeTo)
    setToCurr(activeFrom)
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setAmount(val)
    }
  }

  function setQuickAmount(val: number) {
    setAmount(val.toString())
  }

  function handleFromChange(val: string | null) {
    if (val) setFromCurr(val)
  }

  function handleToChange(val: string | null) {
    if (val) setToCurr(val)
  }

  // Find country flags
  const fromFlag =
    countries.find((c) => c.currencyCode === activeFrom)?.flag || "🏳️"
  const toFlag = countries.find((c) => c.currencyCode === activeTo)?.flag || "🏳️"

  return (
    <div className="space-y-8">
      {/* 1. Main Conversion Card */}
      <Card className="relative border border-border shadow-lg">
        {/* Background gradient line */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-primary via-emerald-400 to-primary" />

        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-end">
            {/* Input Amount */}
            <div className="flex-1 space-y-2">
              <label
                htmlFor="amount-input"
                className="font-semibold text-muted-foreground text-xs uppercase tracking-wider"
              >
                Amount
              </label>
              <Input
                id="amount-input"
                type="text"
                value={amount || ""}
                onChange={handleAmountChange}
                placeholder="Enter conversion amount..."
                className="h-14 font-bold font-mono text-base"
              />
            </div>

            {/* From Selector */}
            <div className="flex-1 space-y-2">
              <span className="block font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                From Currency
              </span>
              <div>
                <Combobox
                  value={activeFrom}
                  onValueChange={handleFromChange}
                  items={currencies.map((c) => c.code)}
                  itemToStringLabel={(code) => {
                    const c = currencies.find((curr) => curr.code === code)
                    return c ? `${c.code} - ${c.name}` : code || ""
                  }}
                  filter={(itemValue, query) => {
                    const c = currencies.find((curr) => curr.code === itemValue)
                    if (!c) return false
                    return (
                      c.code.toLowerCase().includes(query.toLowerCase()) ||
                      c.name.toLowerCase().includes(query.toLowerCase())
                    )
                  }}
                >
                  <ComboboxInput
                    placeholder="Select Currency"
                    className="h-14! w-full font-semibold text-sm"
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className="shrink-0 text-lg leading-none"
                    >
                      {fromFlag}
                    </InputGroupAddon>
                  </ComboboxInput>
                  <ComboboxContent className="max-h-[280px]">
                    <ComboboxEmpty>No currencies found</ComboboxEmpty>
                    <ComboboxList>
                      {(itemValue) => {
                        const c =
                          currencies.find((curr) => curr.code === itemValue) ||
                          currencies[0]
                        return (
                          <ComboboxItem key={c.code} value={c.code}>
                            {c.code} - {c.name}
                          </ComboboxItem>
                        )
                      }}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center py-2 md:py-0">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className={cn(
                  "h-14 w-14 transform rounded-full transition-transform duration-500",
                  "hover:scale-105 hover:bg-primary/5 hover:text-primary",
                  // The rotation class is cleanly injected here based on state
                  isRotated ? "rotate-180" : "rotate-0"
                )}
                title="Swap Currencies."
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            {/* To Selector */}
            <div className="flex-1 space-y-2">
              <span className="block font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                To Currency
              </span>
              <div>
                <Combobox
                  value={activeTo}
                  onValueChange={handleToChange}
                  items={currencies.map((c) => c.code)}
                  itemToStringLabel={(code) => {
                    const c = currencies.find((curr) => curr.code === code)
                    return c ? `${c.code} - ${c.name}` : code || ""
                  }}
                  filter={(itemValue, query) => {
                    const c = currencies.find((curr) => curr.code === itemValue)
                    if (!c) return false
                    return (
                      c.code.toLowerCase().includes(query.toLowerCase()) ||
                      c.name.toLowerCase().includes(query.toLowerCase())
                    )
                  }}
                >
                  <ComboboxInput
                    placeholder="Select Currency"
                    className="h-14! w-full font-semibold text-sm"
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className="shrink-0 text-lg leading-none"
                    >
                      {toFlag}
                    </InputGroupAddon>
                  </ComboboxInput>
                  <ComboboxContent className="max-h-[280px]">
                    <ComboboxEmpty>No currencies found</ComboboxEmpty>
                    <ComboboxList>
                      {(itemValue) => {
                        const c =
                          currencies.find((curr) => curr.code === itemValue) ||
                          currencies[0]
                        return (
                          <ComboboxItem key={c.code} value={c.code}>
                            {c.code} - {c.name}
                          </ComboboxItem>
                        )
                      }}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>
          </div>
          {/* Quick reference amounts tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground text-xs">
            <span className="mr-1 font-semibold">Quick Sizes:</span>
            {[10, 50, 100, 250, 500, 1000, 5000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setQuickAmount(val)}
                className="border border-border bg-card px-2.5 py-1 font-medium font-mono text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {val.toLocaleString()} {activeFrom}
              </button>
            ))}
          </div>

          {/* Interactive Examples */}
          <div className="flex flex-wrap items-center gap-1.5 border-border border-t pt-3 text-muted-foreground text-xs">
            <span className="mr-1 font-semibold">Examples:</span>
            {[
              { amount: "100", from: "USD", to: "EUR" },
              { amount: "500", from: "EUR", to: "GBP" },
              { amount: "2500", from: "JPY", to: "USD" },
            ].map((ex) => (
              <button
                key={`${ex.amount}-${ex.from}-to-${ex.to}`}
                type="button"
                onClick={() => {
                  setAmount(ex.amount)
                  setFromCurr(ex.from)
                  setToCurr(ex.to)
                }}
                className="border border-border bg-card px-2.5 py-1 font-medium font-mono text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {ex.amount} {ex.from} &rarr; {ex.to}
              </button>
            ))}
          </div>

          {/* Conversion results panel */}
          <div className="flex flex-col justify-between gap-4 border-border border-t pt-6 md:flex-row md:items-center">
            <div>
              <div className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
                Calculated Value
              </div>
              <div className="mt-1.5 font-black font-mono text-2xl text-foreground leading-none sm:text-3xl">
                {(parseFloat(amount || "0") || 0).toLocaleString()} {activeFrom}{" "}
                ={" "}
                <span className="text-primary">
                  {convertedValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </span>{" "}
                {activeTo}
              </div>
              <p className="mt-2 text-muted-foreground/80 text-xs">
                1 {activeFrom} = {exchangeRate.toFixed(4)} {activeTo} | 1{" "}
                {activeTo} = {(1 / exchangeRate).toFixed(4)} {activeFrom}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <Link
                href={`/exchange-rates/${activeFrom.toLowerCase()}-to-${activeTo.toLowerCase()}`}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border px-4 py-4 font-semibold text-xs"
                >
                  <TrendingUp className="mr-1.5 h-4 w-4" />
                  View Historical Trend
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Side-by-Side Reference tables and Chart */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: SEO explanation card */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-6">
              <h3 className="flex items-center gap-1.5 font-bold text-foreground text-sm uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-primary" />
                Conversion Explanation
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                This calculation converts {amount || "0"}{" "}
                {parseFloat(amount || "0") === 1
                  ? fromData.name
                  : `${fromData.name}s`}{" "}
                to {toData.name} using mid-market values.
              </p>

              <div className="space-y-3.5 border-border border-t pt-3 text-xs">
                <div>
                  <h4 className="font-bold text-foreground">
                    From Currency profile:
                  </h4>
                  <p className="mt-0.5 line-clamp-2 text-muted-foreground">
                    {fromData.overview}
                  </p>
                  <Link
                    href={`/currency/${fromData.id}`}
                    className="mt-1 block font-semibold text-primary hover:underline"
                  >
                    Learn more about {activeFrom} &rarr;
                  </Link>
                </div>

                <div className="pt-2">
                  <h4 className="font-bold text-foreground">
                    To Currency profile:
                  </h4>
                  <p className="mt-0.5 line-clamp-2 text-muted-foreground">
                    {toData.overview}
                  </p>
                  <Link
                    href={`/currency/${toData.id}`}
                    className="mt-1 block font-semibold text-primary hover:underline"
                  >
                    Learn more about {activeTo} &rarr;
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert */}
          <div className="flex items-start gap-3 border border-border bg-muted/20 p-4 text-xs">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-bold text-foreground">Commercial Rates</h4>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Retail brokers or banks may attach commissions or exchange
                margins to currency operations.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Chart */}
        <div className="lg:col-span-2">
          <RateChart
            rate={exchangeRate}
            fromCode={activeFrom}
            toCode={activeTo}
          />
        </div>
      </div>
    </div>
  )
}
