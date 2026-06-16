import {
  ArrowRight,
  BookOpen,
  Coins,
  FileText,
  Globe,
  Map as MapIcon,
  TrendingUp,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { blogs } from "@/lib/data"
import {
  getCachedCountries,
  getCachedCurrencies,
  getCachedExchangeRates,
} from "@/lib/data-cache"

export const metadata: Metadata = {
  title: "HTML Sitemap | Currencies.online",
  description:
    "Browse the complete sitemap index of Currencies.online to find country directories, currency analyses, exchange rates, calculators, and articles.",
}

export default async function SitemapPage() {
  const [countries, currencies, exchangeRatesMatrix] = await Promise.all([
    getCachedCountries(),
    getCachedCurrencies(),
    getCachedExchangeRates(),
  ])
  return (
    <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
          <MapIcon className="h-3 w-3" />
          Site Architecture
        </span>
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          HTML Sitemap Index
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground text-sm">
          Quick directory index of all public routes and pages hosted on the
          Currencies.online database.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Section 1: Main Pages & Legal */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <Globe className="h-4.5 w-4.5 text-primary" />
                Primary Core Pages
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                <li>
                  <Link
                    href="/"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/countries"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Countries List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/currencies"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Currencies List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/exchange-rates"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Exchange Rates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/converter"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Currency Converter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compare"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Compare Centre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Blog Index
                  </Link>
                </li>
              </ul>

              <h2 className="flex items-center gap-2 border-border border-t pt-4 font-bold text-base text-foreground">
                <FileText className="h-4.5 w-4.5 text-primary" />
                Company & Legal pages
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                <li>
                  <Link
                    href="/about"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    FAQs Help
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="font-medium transition-colors hover:text-primary"
                  >
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="font-medium text-primary transition-colors hover:text-primary"
                  >
                    XML Sitemap
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2: Blog Posts */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <BookOpen className="h-4.5 w-4.5 text-primary" />
                Blog Articles
              </h2>
              <ul className="space-y-2 text-xs">
                {blogs.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/blog/${b.id}`}
                      className="flex items-center gap-1 font-medium transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                      <span className="truncate">{b.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Countries and Currencies Directory */}
        <div className="space-y-6">
          {/* Countries Detail Pages */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <Globe className="h-4.5 w-4.5 text-primary" />
                Countries Directory Pages
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {countries.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/country/${c.id}`}
                      className="flex items-center gap-1.5 font-medium transition-colors hover:text-primary"
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Currencies & Rates Detail Pages */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <Coins className="h-4.5 w-4.5 text-primary" />
                Currencies Detail Pages
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {currencies.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/currency/${c.id}`}
                      className="flex items-center gap-1 font-medium transition-colors hover:text-primary"
                    >
                      <span className="font-mono font-semibold text-primary/70">
                        [{c.code}]
                      </span>
                      <span>{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="flex items-center gap-2 border-border border-t pt-4 font-bold text-base text-foreground">
                <TrendingUp className="h-4.5 w-4.5 text-primary" />
                Exchange Rate Pairs Pages
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {exchangeRatesMatrix.map((pair) => {
                  const slug = `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`
                  return (
                    <li key={slug}>
                      <Link
                        href={`/exchange-rates/${slug}`}
                        className="font-medium font-mono uppercase transition-colors hover:text-primary"
                      >
                        {pair.from} / {pair.to}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
