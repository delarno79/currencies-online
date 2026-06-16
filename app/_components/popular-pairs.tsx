"use client"

import { ArrowRight, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CurrencyPair {
  label: string
  from: string
  to: string
  href: string
}

const POPULAR_PAIRS: CurrencyPair[] = [
  {
    label: "USD to EUR",
    from: "USD",
    to: "EUR",
    href: "/exchange-rates/usd-to-eur",
  },
  {
    label: "EUR to USD",
    from: "EUR",
    to: "USD",
    href: "/exchange-rates/eur-to-usd",
  },
  {
    label: "USD to INR",
    from: "USD",
    to: "INR",
    href: "/exchange-rates/usd-to-inr",
  },
  {
    label: "INR to USD",
    from: "INR",
    to: "USD",
    href: "/exchange-rates/inr-to-usd",
  },
  {
    label: "USD to GBP",
    from: "USD",
    to: "GBP",
    href: "/exchange-rates/usd-to-gbp",
  },
  {
    label: "GBP to USD",
    from: "GBP",
    to: "USD",
    href: "/exchange-rates/gbp-to-usd",
  },
  {
    label: "USD to CAD",
    from: "USD",
    to: "CAD",
    href: "/exchange-rates/usd-to-cad",
  },
  {
    label: "CAD to USD",
    from: "CAD",
    to: "USD",
    href: "/exchange-rates/cad-to-usd",
  },
  {
    label: "USD to AUD",
    from: "USD",
    to: "AUD",
    href: "/exchange-rates/usd-to-aud",
  },
  {
    label: "AUD to USD",
    from: "AUD",
    to: "USD",
    href: "/exchange-rates/aud-to-usd",
  },
  {
    label: "USD to MXN",
    from: "USD",
    to: "MXN",
    href: "/exchange-rates/usd-to-mxn",
  },
  {
    label: "USD to JPY",
    from: "USD",
    to: "JPY",
    href: "/exchange-rates/usd-to-jpy",
  },
  {
    label: "USD to PHP",
    from: "USD",
    to: "PHP",
    href: "/exchange-rates/usd-to-php",
  },
  {
    label: "PHP to USD",
    from: "PHP",
    to: "USD",
    href: "/exchange-rates/php-to-usd",
  },
  {
    label: "Peso to USD",
    from: "MXN",
    to: "USD",
    href: "/exchange-rates/mxn-to-usd",
  },
  {
    label: "USD to Peso",
    from: "USD",
    to: "MXN",
    href: "/exchange-rates/usd-to-mxn",
  },
  {
    label: "USD to THB",
    from: "USD",
    to: "THB",
    href: "/exchange-rates/usd-to-thb",
  },
  {
    label: "THB to USD",
    from: "THB",
    to: "USD",
    href: "/exchange-rates/thb-to-usd",
  },
  {
    label: "VND to USD",
    from: "VND",
    to: "USD",
    href: "/exchange-rates/vnd-to-usd",
  },
  {
    label: "USD to VND",
    from: "USD",
    to: "VND",
    href: "/exchange-rates/usd-to-vnd",
  },
  {
    label: "YEN to USD",
    from: "JPY",
    to: "USD",
    href: "/exchange-rates/jpy-to-usd",
  },
  {
    label: "USD to YEN",
    from: "USD",
    to: "JPY",
    href: "/exchange-rates/usd-to-jpy",
  },
  {
    label: "COP to USD",
    from: "COP",
    to: "USD",
    href: "/exchange-rates/cop-to-usd",
  },
  {
    label: "USD to COP",
    from: "USD",
    to: "COP",
    href: "/exchange-rates/usd-to-cop",
  },
  {
    label: "USD to KRW",
    from: "USD",
    to: "KRW",
    href: "/exchange-rates/usd-to-krw",
  },
  {
    label: "KRW to USD",
    from: "KRW",
    to: "USD",
    href: "/exchange-rates/krw-to-usd",
  },
  {
    label: "CHF to USD",
    from: "CHF",
    to: "USD",
    href: "/exchange-rates/chf-to-usd",
  },
  {
    label: "USD to CHF",
    from: "USD",
    to: "CHF",
    href: "/exchange-rates/usd-to-chf",
  },
  {
    label: "MXN to USD",
    from: "MXN",
    to: "USD",
    href: "/exchange-rates/mxn-to-usd",
  },
  {
    label: "USD to PKR",
    from: "USD",
    to: "PKR",
    href: "/exchange-rates/usd-to-pkr",
  },
  {
    label: "PKR to USD",
    from: "PKR",
    to: "USD",
    href: "/exchange-rates/pkr-to-usd",
  },
  {
    label: "USD to SGD",
    from: "USD",
    to: "SGD",
    href: "/exchange-rates/usd-to-sgd",
  },
  {
    label: "SGD to USD",
    from: "SGD",
    to: "USD",
    href: "/exchange-rates/sgd-to-usd",
  },
  {
    label: "USD to ZAR",
    from: "USD",
    to: "ZAR",
    href: "/exchange-rates/usd-to-zar",
  },
  {
    label: "ZAR to USD",
    from: "ZAR",
    to: "USD",
    href: "/exchange-rates/zar-to-usd",
  },
  {
    label: "USD to NPR",
    from: "USD",
    to: "NPR",
    href: "/exchange-rates/usd-to-npr",
  },
  {
    label: "NPR to USD",
    from: "NPR",
    to: "USD",
    href: "/exchange-rates/npr-to-usd",
  },
  {
    label: "USD to MYR",
    from: "USD",
    to: "MYR",
    href: "/exchange-rates/usd-to-myr",
  },
  {
    label: "USD to IDR",
    from: "USD",
    to: "IDR",
    href: "/exchange-rates/usd-to-idr",
  },
  {
    label: "NZD to USD",
    from: "NZD",
    to: "USD",
    href: "/exchange-rates/nzd-to-usd",
  },
  {
    label: "USD to NZD",
    from: "USD",
    to: "NZD",
    href: "/exchange-rates/usd-to-nzd",
  },
  {
    label: "USD to BDT",
    from: "USD",
    to: "BDT",
    href: "/exchange-rates/usd-to-bdt",
  },
  {
    label: "USD to PLN",
    from: "USD",
    to: "PLN",
    href: "/exchange-rates/usd-to-pln",
  },
  {
    label: "USD to KSH",
    from: "USD",
    to: "KES",
    href: "/exchange-rates/usd-to-kes",
  },
  {
    label: "CNY to USD",
    from: "CNY",
    to: "USD",
    href: "/exchange-rates/cny-to-usd",
  },
  {
    label: "SEK to USD",
    from: "SEK",
    to: "USD",
    href: "/exchange-rates/sek-to-usd",
  },
  {
    label: "CZK to USD",
    from: "CZK",
    to: "USD",
    href: "/exchange-rates/czk-to-usd",
  },
  {
    label: "USD to LKR",
    from: "USD",
    to: "LKR",
    href: "/exchange-rates/usd-to-lkr",
  },
  {
    label: "LIRA to USD",
    from: "TRY",
    to: "USD",
    href: "/exchange-rates/try-to-usd",
  },
  {
    label: "USD to NOK",
    from: "USD",
    to: "NOK",
    href: "/exchange-rates/usd-to-nok",
  },
  {
    label: "RM to USD",
    from: "MYR",
    to: "USD",
    href: "/exchange-rates/myr-to-usd",
  },
  {
    label: "USD to EGP",
    from: "USD",
    to: "EGP",
    href: "/exchange-rates/usd-to-egp",
  },
  {
    label: "HK to USD",
    from: "HKD",
    to: "USD",
    href: "/exchange-rates/hkd-to-usd",
  },
]

const getFlag = (code: string) => {
  const flags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    INR: "🇮🇳",
    GBP: "🇬🇧",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
    MXN: "🇲🇽",
    JPY: "🇯🇵",
    PHP: "🇵🇭",
    THB: "🇹🇭",
    VND: "🇻🇳",
    COP: "🇨🇴",
    KRW: "🇰🇷",
    CHF: "🇨🇭",
    PKR: "🇵🇰",
    SGD: "🇸🇬",
    ZAR: "🇿🇦",
    NPR: "🇳🇵",
    MYR: "🇲🇾",
    IDR: "🇮🇩",
    NZD: "🇳🇿",
    BDT: "🇧🇩",
    PLN: "🇵🇱",
    KES: "🇰🇪",
    CNY: "🇨🇳",
    SEK: "🇸🇪",
    CZK: "🇨🇿",
    LKR: "🇱🇰",
    TRY: "🇹🇷",
    NOK: "🇳🇴",
    EGP: "🇪🇬",
    HKD: "🇭🇰",
  }
  return flags[code.toUpperCase()] || "🏳️"
}

export function PopularPairs() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-end">
        <div>
          <h2 className="flex items-center gap-2 font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
            <RefreshCw className="h-6 w-6 text-primary" />
            Most Popular Currency Pairs
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Quickly access real-time conversion rates and charts for
            high-traffic trading pairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {POPULAR_PAIRS.map((pair, index) => {
          const fromFlag = getFlag(pair.from)
          const toFlag = getFlag(pair.to)
          const isHidden = !isExpanded && index >= 32
          return (
            <Link
              key={pair.label}
              href={pair.href}
              className={cn("group block", isHidden && "hidden")}
            >
              <Card className="h-full border border-border bg-card/40 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="select-none text-base leading-none transition-transform duration-300 group-hover:scale-110">
                      {fromFlag}
                    </span>
                    <span className="text-muted-foreground/30 text-xs">/</span>
                    <span className="select-none text-base leading-none transition-transform duration-300 group-hover:scale-110">
                      {toFlag}
                    </span>
                  </div>
                  <span className="whitespace-nowrap font-bold text-foreground text-xs transition-colors group-hover:text-primary">
                    {pair.label}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <span>View Rate</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2 border-border px-6 py-5 font-semibold shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          {isExpanded ? (
            <>
              <span>Show Less Pairs</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show All {POPULAR_PAIRS.length} Pairs</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </section>
  )
}
