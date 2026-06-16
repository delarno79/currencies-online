import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Globe,
  HelpCircle,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  type Country,
  type Currency,
  countries as staticCountries,
} from "@/lib/data"
import type { HistoryPoint } from "@/lib/historical-rates"
import { CurrencyChart } from "./currency-chart"

interface CurrencyDetailProps {
  currency: Currency
  initialCountries?: Country[]
  historyData?: HistoryPoint[]
}

export function CurrencyDetail({
  currency,
  initialCountries,
  historyData,
}: CurrencyDetailProps) {
  const countries = initialCountries || staticCountries
  // Find countries using this currency from our database
  const usingCountries = countries.filter(
    (c) => c.currencyCode === currency.code
  )

  return (
    <div className="space-y-8">
      {/* Back to directory */}
      <div>
        <Link href="/currencies">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Currencies Directory
          </Button>
        </Link>
      </div>

      {/* Main Info Blocks */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left / Center content: overview, chart, and countries */}
        <div className="space-y-8 lg:col-span-2">
          {/* 1. Header & Overview Card */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-5 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center border border-primary/10 bg-primary/10 font-bold text-primary text-xl">
                    {currency.symbol}
                  </div>
                  <div>
                    <h1 className="font-extrabold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
                      {currency.name}
                    </h1>
                    <span className="font-mono font-semibold text-muted-foreground text-xs">
                      ISO Code: {currency.code}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {currency.overview}
              </p>
            </CardContent>
          </Card>

          {/* 2. Historical Chart */}
          <CurrencyChart
            baseRate={currency.usdRate}
            code={currency.code}
            historyData={historyData}
          />

          {/* 3. Countries Using It */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Countries Utilizing the {currency.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {usingCountries.map((c) => (
                <Link key={c.id} href={`/country/${c.id}`} className="group">
                  <Card className="border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/40 hover:shadow-sm">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">{c.flag}</span>
                        <div>
                          <h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-primary">
                            {c.name}
                          </h3>
                          <span className="mt-0.5 flex items-center gap-1 font-medium text-[11px] text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {c.capital}
                          </span>
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

        {/* Right content: Statistics & FAQs */}
        <div className="space-y-6">
          {/* Quick Rates Card */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6">
              <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
                <Activity className="h-5 w-5 text-primary" />
                Live Rates & Stats
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs">
                    Rate vs USD
                  </span>
                  <div className="mt-1 font-black font-mono text-foreground text-xl">
                    1 USD ={" "}
                    <span className="text-primary">{currency.usdRate}</span>{" "}
                    {currency.code}
                  </div>
                  <div className="mt-0.5 font-mono text-muted-foreground text-xs">
                    1 {currency.code} = {(1 / currency.usdRate).toFixed(4)} USD
                  </div>
                </div>

                <div className="border-border border-t pt-4">
                  <span className="text-muted-foreground text-xs">
                    Average Global Value
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                    The {currency.name} ({currency.code}) currently traded at
                    reference interbank rates. Convert sizes using the
                    calculator link.
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-border border-t pt-4">
                <Link
                  href={`/converter?from=USD&to=${currency.code}`}
                  className="block w-full"
                >
                  <Button className="w-full gap-2 py-4 text-xs shadow-sm">
                    <Calculator className="h-4 w-4" />
                    Interactive Calculator
                  </Button>
                </Link>

                <Link
                  href={`/compare?type=currency&c1=${currency.id}`}
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-border py-4 text-xs"
                  >
                    Compare with other currencies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* FAQs section */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-1.5 font-bold text-base text-foreground">
              <HelpCircle className="h-4.5 w-4.5 text-primary" />
              Frequently Asked Questions
            </h2>

            <Accordion className="w-full space-y-2">
              {currency.faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${faq.question}`}
                  className="overflow-hidden border border-border bg-card px-4"
                >
                  <AccordionTrigger className="py-3.5 text-left font-semibold text-foreground text-xs hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 text-muted-foreground text-xs leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}

              <AccordionItem
                value="general-faq"
                className="overflow-hidden border border-border bg-card px-4"
              >
                <AccordionTrigger className="py-3.5 text-left font-semibold text-foreground text-xs hover:no-underline">
                  How accurate are the exchange rates listed?
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-4 text-muted-foreground text-xs leading-relaxed">
                  All rates listed are reference mid-market rates based on
                  static data matrices. These represent clean interbank values
                  and should be used for informational purposes only.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
