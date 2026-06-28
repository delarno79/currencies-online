"use client"

import {
  Activity,
  Building2,
  Coins,
  DollarSign,
  Globe,
  Link2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Copyright } from "./copyright"

const socials = [
  {
    name: "Facebook",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>Facebook</title>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Twitter",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>Twitter</title>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>LinkedIn</title>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Instagram",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>Instagram</title>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "YouTube",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>YouTube</title>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    href: "#",
  },
]

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/studio")) {
    return null
  }

  return (
    <footer className="border-slate-800 border-t bg-[#0c1f38] text-slate-300">
      <div className="container mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6 xl:gap-12">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo-3-small.png"
                alt="Currencies.global Logo"
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-sm object-contain"
              />
              <span className="flex items-baseline gap-0">
                <span className="font-bold text-lg text-white tracking-tight">
                  Currencies
                </span>
                <span className="font-semibold text-[#7bbde0] text-lg tracking-tight">
                  .global
                </span>
              </span>
            </Link>

            <p className="max-w-xs text-slate-400 text-xs leading-relaxed">
              The world's currency directory and exchange rate database. Find
              any country's currency, live exchange rates, converter, charts and
              much more.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors duration-200 hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Column 2: Popular Countries */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5 text-primary" />
              Popular Countries
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Japan Currency", href: "/country/japan-currency" },
                { name: "India Currency", href: "/country/india-currency" },
                { name: "China Currency", href: "/country/china-currency" },
                { name: "Canada Currency", href: "/country/canada-currency" },
                { name: "Mexico Currency", href: "/country/mexico-currency" },
                { name: "Brazil Currency", href: "/country/brazil-currency" },
                {
                  name: "Australia Currency",
                  href: "/country/australia-currency",
                },
                {
                  name: "United Kingdom Currency",
                  href: "/country/united-kingdom-currency",
                },
                { name: "Germany Currency", href: "/country/germany-currency" },
                {
                  name: "South Korea Currency",
                  href: "/country/south-korea-currency",
                },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-xs transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Currencies */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              Popular Currencies
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "US Dollar (USD)", href: "/currency/us-dollar" },
                { name: "Euro (EUR)", href: "/currency/euro" },
                {
                  name: "British Pound (GBP)",
                  href: "/currency/british-pound",
                },
                { name: "Japanese Yen (JPY)", href: "/currency/japanese-yen" },
                { name: "Indian Rupee (INR)", href: "/currency/indian-rupee" },
                {
                  name: "Canadian Dollar (CAD)",
                  href: "/currency/canadian-dollar",
                },
                {
                  name: "Australian Dollar (AUD)",
                  href: "/currency/australian-dollar",
                },
                { name: "Chinese Yuan (CNY)", href: "/currency/chinese-yuan" },
                { name: "Swiss Franc (CHF)", href: "/currency/swiss-franc" },
                { name: "Mexican Peso (MXN)", href: "/currency/mexican-peso" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-xs transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Popular Exchange Rates */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Exchange Rates
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "USD to EUR", href: "/exchange-rates/usd-to-eur" },
                { name: "USD to JPY", href: "/exchange-rates/usd-to-jpy" },
                { name: "USD to GBP", href: "/exchange-rates/usd-to-gbp" },
                { name: "USD to INR", href: "/exchange-rates/usd-to-inr" },
                { name: "USD to CAD", href: "/exchange-rates/usd-to-cad" },
                { name: "EUR to USD", href: "/exchange-rates/eur-to-usd" },
                { name: "GBP to USD", href: "/exchange-rates/gbp-to-usd" },
                { name: "CAD to USD", href: "/exchange-rates/cad-to-usd" },
                { name: "AUD to USD", href: "/exchange-rates/aud-to-usd" },
                { name: "JPY to USD", href: "/exchange-rates/jpy-to-usd" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-xs transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <Link2 className="h-3.5 w-3.5 text-primary" />
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Currency Converter", href: "/converter" },
                { name: "Compare", href: "/compare" },
                { name: "Exchange Rates", href: "/exchange-rates" },
                { name: "Countries", href: "/countries" },
                { name: "Currencies", href: "/currencies" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-xs transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Company */}
          <div>
            <h3 className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faqs" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "Sitemap", href: "/sitemap" },
                { name: "XML Sitemap", href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-xs transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer copyright bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-slate-800 border-t pt-8 text-slate-500 text-xs md:flex-row">
          <div className="flex items-center gap-1">
            <Copyright />
            <span>Currencies.global. All rights reserved.</span>
          </div>

          <div className="text-slate-500">
            All exchange rates are updated in real-time.
          </div>
        </div>
      </div>
    </footer>
  )
}
