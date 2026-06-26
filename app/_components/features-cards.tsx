import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Globe,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturesCardsProps {
  card1Title?: string
  card1Desc?: string
  card1Btn?: string
  card1Href?: string
  card2Title?: string
  card2Desc?: string
  card2Btn?: string
  card2Href?: string
  card3Title?: string
  card3Desc?: string
  card3Btn?: string
  card3Href?: string
  card4Title?: string
  card4Desc?: string
  card4Btn?: string
  card4Href?: string
}

export function FeaturesCards({
  card1Title,
  card1Desc,
  card1Btn,
  card1Href,
  card2Title,
  card2Desc,
  card2Btn,
  card2Href,
  card3Title,
  card3Desc,
  card3Btn,
  card3Href,
  card4Title,
  card4Desc,
  card4Btn,
  card4Href,
}: FeaturesCardsProps = {}) {
  const cards = [
    {
      title: card1Title || "Currency Converter",
      description:
        card1Desc || "Convert between any currencies instantly with real-time exchange rates.",
      buttonText: card1Btn || "Convert Now",
      href: card1Href || "/converter",
      icon: Globe,
      iconBg: "bg-blue-500/10 text-blue-500",
      btnClass: "text-blue-500 hover:text-blue-600",
    },
    {
      title: card2Title || "Compare Currencies",
      description:
        card2Desc || "Compare currencies, countries, exchange rates, and purchasing power side by side.",
      buttonText: card2Btn || "Compare Now",
      href: card2Href || "/compare",
      icon: ArrowLeftRight,
      iconBg: "bg-emerald-500/10 text-emerald-500",
      btnClass: "text-emerald-500 hover:text-emerald-600",
    },
    {
      title: card3Title || "Exchange Rates",
      description:
        card3Desc || "View live, historical, and forecast exchange rates for any currency pair.",
      buttonText: card3Btn || "View Rates",
      href: card3Href || "/exchange-rates",
      icon: TrendingUp,
      iconBg: "bg-purple-500/10 text-purple-500",
      btnClass: "text-purple-500 hover:text-purple-600",
    },
    {
      title: card4Title || "Currency Guides",
      description:
        card4Desc || "Read expert articles, guides, and insights about global currencies.",
      buttonText: card4Btn || "Read Blog",
      href: card4Href || "/blog",
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
