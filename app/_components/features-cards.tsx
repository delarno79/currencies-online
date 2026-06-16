import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Globe,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesCards() {
  const cards = [
    {
      title: "Currency Converter",
      description:
        "Convert between any currencies instantly with real-time exchange rates.",
      buttonText: "Convert Now",
      href: "/converter",
      icon: Globe,
      iconBg: "bg-blue-500/10 text-blue-500",
      btnClass: "text-blue-500 hover:text-blue-600",
    },
    {
      title: "Compare Currencies",
      description:
        "Compare currencies, countries, exchange rates, and purchasing power side by side.",
      buttonText: "Compare Now",
      href: "/compare",
      icon: ArrowLeftRight,
      iconBg: "bg-emerald-500/10 text-emerald-500",
      btnClass: "text-emerald-500 hover:text-emerald-600",
    },
    {
      title: "Exchange Rates",
      description:
        "View live, historical, and forecast exchange rates for any currency pair.",
      buttonText: "View Rates",
      href: "/exchange-rates",
      icon: TrendingUp,
      iconBg: "bg-purple-500/10 text-purple-500",
      btnClass: "text-purple-500 hover:text-purple-600",
    },
    {
      title: "Currency Guides",
      description:
        "Read expert articles, guides, and insights about global currencies.",
      buttonText: "Read Blog",
      href: "/blog",
      icon: BookOpen,
      iconBg: "bg-amber-500/10 text-amber-500",
      btnClass: "text-amber-500 hover:text-amber-600",
    },
  ]

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="group flex flex-col justify-between border border-border bg-card/40 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-bold text-foreground text-lg">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-muted-foreground text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Button/Link */}
                <Link
                  href={card.href}
                  className={`inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider transition-colors duration-200 ${card.btnClass}`}
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
