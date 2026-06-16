import { Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FactItem {
  id: number
  icon: string
  title: string
  description: string
}

const FACTS: FactItem[] = [
  {
    id: 1,
    icon: "🌎",
    title: "Largest Financial Market",
    description:
      "More than $7 trillion is traded in the foreign exchange market every day, making it the largest financial market in the world by volume.",
  },
  {
    id: 2,
    icon: "💵",
    title: "USD Dominance",
    description:
      "The US Dollar (USD) is involved in nearly 90% of all global currency transactions, serving as the world's primary reserve currency.",
  },
  {
    id: 3,
    icon: "💶",
    title: "New Kid on the Block",
    description:
      "The Euro (EUR) became an official currency in 1999, making it one of the newest major world currencies in circulation.",
  },
  {
    id: 4,
    icon: "💴",
    title: "Safe-Haven JPY",
    description:
      "The Japanese Yen (JPY) is among the most traded currencies and is widely considered a safe-haven asset during global economic uncertainty.",
  },
  {
    id: 5,
    icon: "🦆",
    title: "The Canadian 'Loonie'",
    description:
      "The Canadian Dollar is often called the 'Loonie' because of the common loon bird featured on the reverse of its one-dollar coin.",
  },
  {
    id: 6,
    icon: "💳",
    title: "Polymer Currency Pioneers",
    description:
      "The Australian Dollar was the first currency to be produced using polymer (plastic) banknotes to prevent counterfeiting.",
  },
  {
    id: 7,
    icon: "📊",
    title: "Most Traded Pairs",
    description:
      "The most traded currency pairs in the foreign exchange market are typically EUR/USD, USD/JPY, GBP/USD, and USD/CHF.",
  },
  {
    id: 8,
    icon: "🏔️",
    title: "Ultra-Stable Swiss Franc",
    description:
      "The Swiss Franc (CHF) is widely regarded as one of the world's most stable currencies, backed by a strong, neutral national economy.",
  },
]

export function CurrencyFacts() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
          <Globe className="h-6 w-6 animate-spin-slow text-blue-500" />8
          Fascinating Currency Facts
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Did you know? Explore these interesting facts about foreign exchange
          markets and global currencies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((item) => (
          <Card
            key={item.id}
            className="group relative overflow-hidden border border-border bg-card/40 transition-all duration-300 hover:border-blue-500/30 hover:bg-card hover:shadow-md"
          >
            {/* Soft decorative background spotlight */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-500/5 blur-xl transition-all group-hover:bg-blue-500/10" />

            <CardContent className="flex flex-col gap-3 p-5 text-left">
              <div className="flex items-center gap-3">
                <span className="select-none text-3xl leading-none transition-transform duration-300 group-hover:scale-125">
                  {item.icon}
                </span>
                <h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-blue-500">
                  {item.title}
                </h3>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
