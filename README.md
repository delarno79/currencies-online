# Currencies.global

> **World's Currency Directory & Exchange Rates Database**  
> A full-featured, SEO-optimized currency information platform built with Next.js 16.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

Currencies.global is a directory-style website providing:

- **Live exchange rates** for 160+ world currencies
- **Currency converter** with real-time data
- **Side-by-side currency comparison** with economic metrics
- **Historical rate charts** (30-day trends)
- **Country & currency directory** with detailed info pages
- **Exchange rate pages** for 53+ popular currency pairs
- **Blog / guides** section for currency-related content
- **FAQ** and educational content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16.2.6](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI Library | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) |
| Styling | Tailwind CSS v4 |
| Charts | [Recharts 3](https://recharts.org) |
| Icons | [Lucide React](https://lucide.dev) |
| State / URL | [nuqs](https://nuqs.47ng.com) (URL search params as state) |
| Linting | [Biome](https://biomejs.dev) |
| Git Hooks | [Husky](https://typicode.github.io/husky) |
| Package Manager | [pnpm](https://pnpm.io) |

---

## Project Structure

```
currencies.online/
├── app/
│   ├── _components/          # Shared homepage components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── features-cards.tsx
│   │   ├── popular-currencies.tsx
│   │   ├── latest-rates.tsx
│   │   ├── popular-pairs.tsx
│   │   ├── exchange-mistakes.tsx
│   │   ├── currency-facts.tsx
│   │   ├── browse-regions.tsx
│   │   └── adsense.tsx
│   ├── about/
│   ├── blog/
│   ├── compare/              # Side-by-side currency comparison
│   ├── contact/
│   ├── converter/            # Currency converter tool
│   ├── countries/            # Countries directory listing
│   ├── country/[id]/         # Individual country pages
│   ├── currencies/           # Currencies directory listing
│   ├── currency/[id]/        # Individual currency pages
│   ├── disclaimer/
│   ├── exchange-rates/[pair] # Exchange rate pair pages (e.g. usd-to-eur)
│   ├── faqs/
│   ├── privacy/
│   ├── sitemap/
│   ├── terms/
│   ├── layout.tsx
│   └── page.tsx              # Homepage
├── lib/
│   ├── countries-api.ts      # REST Countries API + live rates fetcher
│   ├── currencies-api.ts     # Currency data builder + exchange matrix
│   ├── historical-rates.ts   # 30-day historical rates (Frankfurter API)
│   ├── data-cache.ts         # Next.js "use cache" caching layer
│   ├── data.ts               # Static fallback data (currencies, countries)
│   ├── countries-data.json   # Bundled country dataset
│   └── utils.ts
├── components/
│   └── ui/                   # shadcn/ui components
├── public/
├── next.config.ts
├── biome.json
└── package.json
```

---

## Data & API Architecture

The app follows a **"live data with static fallback"** pattern — all data is fetched from live APIs at build/request time, and gracefully falls back to bundled static data if any API is unavailable.

### External APIs Used

| API | Purpose | Endpoint |
|---|---|---|
| [open.er-api.com](https://open.er-api.com) | Live exchange rates (USD base) | `GET /v6/latest/USD` |
| [restcountries.com](https://restcountries.com) | Country names, flags, population, languages | `GET /v3.1/all` |
| [frankfurter.app](https://frankfurter.app) | Historical exchange rates (yesterday's data for daily change calculation) | `GET /{date}?base=USD` |

> **No API key required.** All three APIs are free and open.

### Caching Strategy

The app uses **Next.js 16 Cache Components** (`"use cache"` directive) — data is cached server-side and automatically revalidated.

```ts
// lib/data-cache.ts
export async function getCachedCurrencies() {
  "use cache"
  cacheLife("hours")   // Revalidates every few hours
  cacheTag("currencies")
  return getCurrenciesFromApi()
}
```

| Cache Function | Tag | Lifetime |
|---|---|---|
| `getCachedCountries()` | `countries` | hours |
| `getCachedCurrencies()` | `currencies` | hours |
| `getCachedExchangeRates()` | `exchange-rates` | hours |
| `getCachedHistoricalRates(from, to)` | `historical-{from}-{to}` | hours |

### Data Flow

```
Request
  └── Server Component
        └── getCached*()  ──── Cache HIT? ──→ Return cached data
                          └── Cache MISS? ──→ Fetch from API
                                              └── API fails? ──→ Static fallback (data.ts)
```

---

## Getting Started

### Prerequisites

- **Node.js** v20+ (install via [Homebrew](https://brew.sh): `brew install node`)
- **pnpm** (install: `npm install -g pnpm` or `brew install pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahreaz0/currencies.online.git
cd currencies.online

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

```bash
# Development server (with Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code with Biome
pnpm lint

# Format code with Biome
pnpm format

# Lint + format together (with auto-fix)
pnpm check

# TypeScript type checking
pnpm typecheck
```

---

## Adding UI Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add a new component:

```bash
npx shadcn@latest add <component-name>
# Example:
npx shadcn@latest add dialog
```

Components are placed in the `components/ui/` directory and can be imported as:

```tsx
import { Button } from "@/components/ui/button"
```

---

## Homepage Section Order

The homepage sections are ordered as follows (defined in `app/page.tsx`):

1. **Hero** — Search bar + animated globe
2. **AdSense** (top banner)
3. **Features Cards** — Converter, Compare, Exchange Rates, Guides
4. **Popular Currencies** — Top 16 currencies with live rates
5. **Live Exchange Rates** — Full rates table
6. **AdSense** (bottom banner)
7. **Most Popular Currency Pairs** — 32 shown by default, expandable to all 53
8. **Common Exchange Mistakes** — Educational section
9. **Fascinating Currency Facts** — Educational section
10. **Browse by Region** — Country navigation by continent

---

## Code Quality

- **Biome** handles both linting and formatting (replaces ESLint + Prettier)
- **Husky** runs checks automatically on `git commit`
- **TypeScript** strict mode enabled throughout
- All components are typed — no `any` usage

### Biome config

See [`biome.json`](./biome.json) for linting/formatting rules.

---

## Deployment

The project is designed to deploy on **Vercel**, **Hostinger** (using the Node.js Web App template), or any Node.js-compatible platform.

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm start
```

> The `cacheComponents: true` flag in `next.config.ts` enables Next.js 16's Cache Components feature, which provides ISR-like caching without the need for explicit `revalidate` values on each page.

---

## License

Private project — all rights reserved.
