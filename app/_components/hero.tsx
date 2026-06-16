"use client"

import {
  Activity,
  ArrowRight,
  DollarSign,
  Hash,
  Landmark,
  Search,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  type Country,
  type Currency,
  countries as staticCountries,
  currencies as staticCurrencies,
} from "@/lib/data"

interface HeroProps {
  initialCountries?: Country[]
  initialCurrencies?: Currency[]
}

// Background currency symbols scattered across the hero
const BG_SYMBOLS = [
  {
    symbol: "€",
    top: "8%",
    left: "5%",
    size: "3.5rem",
    opacity: 0.06,
    rotate: -20,
  },
  {
    symbol: "$",
    top: "15%",
    left: "18%",
    size: "2rem",
    opacity: 0.05,
    rotate: 10,
  },
  {
    symbol: "£",
    top: "5%",
    left: "38%",
    size: "2.5rem",
    opacity: 0.05,
    rotate: -8,
  },
  {
    symbol: "¥",
    top: "60%",
    left: "2%",
    size: "2.8rem",
    opacity: 0.06,
    rotate: 15,
  },
  {
    symbol: "₹",
    top: "75%",
    left: "22%",
    size: "2rem",
    opacity: 0.05,
    rotate: -5,
  },
  {
    symbol: "Fr",
    top: "30%",
    left: "8%",
    size: "1.5rem",
    opacity: 0.04,
    rotate: 12,
  },
  {
    symbol: "₩",
    top: "85%",
    left: "8%",
    size: "2.2rem",
    opacity: 0.05,
    rotate: -15,
  },
  {
    symbol: "A$",
    top: "45%",
    left: "32%",
    size: "1.4rem",
    opacity: 0.04,
    rotate: 5,
  },
  {
    symbol: "R$",
    top: "92%",
    left: "35%",
    size: "1.6rem",
    opacity: 0.04,
    rotate: -10,
  },
  {
    symbol: "€",
    top: "20%",
    right: "5%",
    size: "2rem",
    opacity: 0.05,
    rotate: 8,
  },
  {
    symbol: "$",
    top: "55%",
    right: "2%",
    size: "3rem",
    opacity: 0.06,
    rotate: -12,
  },
  {
    symbol: "¥",
    top: "80%",
    right: "8%",
    size: "2.5rem",
    opacity: 0.05,
    rotate: 20,
  },
  {
    symbol: "₿",
    top: "10%",
    right: "22%",
    size: "1.8rem",
    opacity: 0.04,
    rotate: -5,
  },
  {
    symbol: "kr",
    top: "35%",
    right: "18%",
    size: "1.5rem",
    opacity: 0.04,
    rotate: 7,
  },
  {
    symbol: "₺",
    top: "70%",
    right: "25%",
    size: "2rem",
    opacity: 0.05,
    rotate: -18,
  },
]

export function Hero({ initialCountries, initialCurrencies }: HeroProps) {
  const countries = initialCountries || staticCountries
  const currencies = initialCurrencies || staticCurrencies
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<
    {
      type: "country" | "currency"
      name: string
      id: string
      flagOrSymbol: string
      code?: string
    }[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }

    const filteredCountries = countries
      .filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.currencyCode.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4)
      .map((c) => ({
        type: "country" as const,
        name: c.name,
        id: c.id,
        flagOrSymbol: c.flag,
        code: c.currencyCode,
      }))

    const filteredCurrencies = currencies
      .filter(
        (curr) =>
          curr.name.toLowerCase().includes(query.toLowerCase()) ||
          curr.code.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4)
      .map((curr) => ({
        type: "currency" as const,
        name: curr.name,
        id: curr.id,
        flagOrSymbol: curr.symbol,
        code: curr.code,
      }))

    setSuggestions([...filteredCountries, ...filteredCurrencies])
    setIsOpen(true)
  }, [query, currencies, countries])

  const handleSelect = (item: (typeof suggestions)[0]) => {
    setQuery("")
    setIsOpen(false)
    if (item.type === "country") {
      router.push(`/country/${item.id}`)
    } else {
      router.push(`/currency/${item.id}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() === "") return

    // Try to find exact match
    const matchedCountry = countries.find(
      (c) =>
        c.name.toLowerCase() === query.toLowerCase().trim() ||
        c.currencyCode.toLowerCase() === query.toLowerCase().trim()
    )
    if (matchedCountry) {
      router.push(`/country/${matchedCountry.id}`)
      return
    }

    const matchedCurrency = currencies.find(
      (curr) =>
        curr.name.toLowerCase() === query.toLowerCase().trim() ||
        curr.code.toLowerCase() === query.toLowerCase().trim()
    )
    if (matchedCurrency) {
      router.push(`/currency/${matchedCurrency.id}`)
      return
    }

    // Default: go to countries list with search parameter
    router.push(`/countries?search=${encodeURIComponent(query)}`)
  }

  return (
    <section
      className="relative px-4 py-10"
      style={{
        background: "var(--hero-bg)",
      }}
    >
      {/* Background currency symbols watermark */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {BG_SYMBOLS.map((sym, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative items
            key={i}
            className="absolute font-bold text-blue-900 dark:text-blue-400"
            style={{
              top: sym.top,
              left: "left" in sym ? (sym as { left: string }).left : undefined,
              right:
                "right" in sym ? (sym as { right: string }).right : undefined,
              fontSize: sym.size,
              opacity: sym.opacity,
              transform: `rotate(${sym.rotate}deg)`,
              fontFamily: "Georgia, serif",
            }}
          >
            {sym.symbol}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
          {/* Left Column: Headline and Search */}
          <div className="space-y-5 text-left lg:col-span-3">
            {/* Main Heading */}
            <h1
              className="font-extrabold text-[#0a1f44] leading-tight tracking-tight dark:text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
            >
              Find Any Country&apos;s
              <br />
              <span className="text-[#0a1f44] dark:text-blue-400">
                Currency Instantly
              </span>
            </h1>

            {/* Feature Pills */}
            <div className="space-y-2.5">
              <p className="font-semibold text-slate-500 text-sm dark:text-slate-400">
                Search for a country and instantly see:
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { text: "Official Currency", icon: Landmark },
                  { text: "Currency Code", icon: Hash },
                  { text: "Currency Symbol", icon: DollarSign },
                  { text: "Current USD Exchange Rate", icon: Activity },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-1.5 rounded-md border border-blue-200/70 bg-white/80 px-2.5 py-1.5 shadow-sm backdrop-blur-sm dark:border-blue-900/50 dark:bg-slate-900/80"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a56db] text-white dark:bg-blue-600">
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className="font-semibold text-slate-700 text-xs leading-none dark:text-slate-300">
                        {item.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Search Box */}
            <div ref={containerRef} className="relative w-full max-w-xl">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center"
              >
                <InputGroup className="h-14 flex-1 rounded-lg border border-primary/50 bg-background">
                  <InputGroupInput
                    type="text"
                    placeholder="Enter a country name (e.g., Japan, India, United States)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                    className="pl-5"
                  />
                  <InputGroupAddon align="inline-end" className="pr-2.5">
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      className="h-10 cursor-pointer gap-1.5 rounded-md px-4"
                    >
                      <Search data-icon="inline-start" />
                      Search Currency
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>

              {/* Suggestions Dropdown */}
              {isOpen && suggestions.length > 0 && (
                <div className="fade-in slide-in-from-top-2 absolute right-0 left-0 z-50 mt-2 animate-in rounded-md border border-border bg-background/95 p-2 shadow-2xl backdrop-blur-md duration-150">
                  <div className="px-3 py-1.5 font-semibold text-muted-foreground/70 text-xs uppercase tracking-wider">
                    Suggestions
                  </div>
                  <div className="mt-1 divide-y divide-border/20">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        type="button"
                        className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2.5">
                          {item.type === "country" ? (
                            <span className="text-xl leading-none">
                              {item.flagOrSymbol}
                            </span>
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary/10 font-bold text-primary text-xs">
                              {item.flagOrSymbol}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="ml-2 text-muted-foreground text-xs">
                              ({item.code})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-primary text-xs opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="mr-1 font-semibold text-slate-500 dark:text-slate-400">
                Popular searches:
              </span>
              {[
                { name: "United States", id: "united-states" },
                { name: "Japan", id: "japan" },
                { name: "India", id: "india" },
                { name: "Brazil", id: "brazil" },
                { name: "Germany", id: "germany" },
                { name: "France", id: "france" },
                { name: "Canada", id: "canada" },
                { name: "Australia", id: "australia" },
              ].map((item) => (
                <Badge
                  key={item.id}
                  variant="outline"
                  onClick={() => router.push(`/country/${item.id}`)}
                  className="h-6 cursor-pointer rounded-md border-blue-300 bg-blue-50/10 px-2.5 font-semibold text-[#1a56db] transition-colors hover:bg-blue-50/80 dark:border-blue-800 dark:bg-blue-950/5 dark:text-blue-400 dark:hover:bg-blue-950/30"
                >
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column: Globe Image */}
          <div className="relative hidden items-center justify-center lg:col-span-2 lg:flex">
            <div className="relative mx-auto w-full max-w-[460px]">
              <Image
                src="/hero-globe-2.png"
                alt="Globe with floating currency coin badges representing major world currencies"
                width={460}
                height={460}
                priority
                className="h-auto w-full dark:opacity-95 dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
