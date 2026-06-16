import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MistakeItem {
  id: number
  title: string
  description: string
}

const MISTAKES: MistakeItem[] = [
  {
    id: 1,
    title: "Exchanging Money at Airports",
    description:
      "Airport exchange counters often offer less favorable rates and higher fees than banks or local exchange providers.",
  },
  {
    id: 2,
    title: "Ignoring Hidden Conversion Fees",
    description:
      "Many banks, credit cards, and transfer services add hidden markups to the exchange rate rather than offering the interbank value.",
  },
  {
    id: 3,
    title: "Accepting Dynamic Currency Conversion (DCC)",
    description:
      "When paying abroad, merchants may offer to charge you in your home currency. This convenience often comes with a heavy exchange rate markup.",
  },
  {
    id: 4,
    title: "Failing to Compare Exchange Rates",
    description:
      "Rates can vary significantly between different providers. Comparing rates online before booking can save a substantial amount on large transactions.",
  },
  {
    id: 5,
    title: "Waiting Until the Last Minute",
    description:
      "Exchanging currency during emergencies or immediately before travel limits your options and often forces you to accept high exchange costs.",
  },
  {
    id: 6,
    title: "Not Checking Transfer Fees",
    description:
      "A seemingly favorable exchange rate can easily be offset by high flat service charges or hidden transaction transfer fees.",
  },
  {
    id: 7,
    title: "Using Unlicensed Exchange Services",
    description:
      "Always use reputable financial institutions and licensed currency exchange providers to protect your money from fraud.",
  },
  {
    id: 8,
    title: "Assuming the Advertised Rate Is Final",
    description:
      "The advertised rate in street-level booths often does not include service charges, commissions, or local transaction fees.",
  },
]

export function ExchangeMistakes() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
          <AlertTriangle className="h-6 w-6 animate-pulse text-amber-500" />8
          Common Currency Exchange Mistakes to Avoid
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Keep these pitfalls in mind to secure the best rates and keep more of
          your funds during exchange transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MISTAKES.map((item) => (
          <Card
            key={item.id}
            className="group relative overflow-hidden border border-border bg-card/40 transition-all duration-300 hover:border-amber-500/30 hover:bg-card hover:shadow-md"
          >
            {/* Top warning line on hover */}
            <div className="absolute top-0 right-0 left-0 h-1 scale-x-0 bg-amber-500 transition-transform duration-300 group-hover:scale-x-100" />

            <CardContent className="flex flex-col gap-3 p-5 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 font-extrabold text-amber-500 text-xs dark:bg-amber-500/20">
                  {item.id}
                </span>
                <h3 className="font-bold text-foreground text-sm transition-colors group-hover:text-amber-500">
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
