import { Award, Database, Info, ShieldCheck } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | Currencies.online",
  description:
    "Learn about the mission, data architecture, and team behind Currencies.online, the premier currency directory and database.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
          <Info className="h-3 w-3" />
          Our Profile
        </span>
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          About Currencies.online
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Currencies.online is designed to be the world's most accessible
          currency directory and exchange rate database, bridging search queries
          with accurate statistics.
        </p>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <h2 className="font-bold text-foreground text-lg">Our Mission</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We believe that finding simple financial questions shouldn't require
            navigating complex financial terminals. Whether you want to know
            what currency is used in Japan, check the symbol of the Brazilian
            Real, or analyze the 30-day volatility of the British Pound,
            Currencies.online provides clean, readable information in under 50
            milliseconds.
          </p>

          <h2 className="border-border border-t pt-4 font-bold text-foreground text-lg">
            Data Integrity
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our currency structures, country directories, and exchange rate
            calculations are built programmatically using verified interbank
            codes. By combining a static data engine with automated
            calculations, we ensure that every query is resolved with zero
            server overhead and maximum performance.
          </p>
        </CardContent>
      </Card>

      {/* Grid statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="space-y-2 rounded-xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Database className="h-5 w-5" />
          </div>
          <div className="font-bold font-mono text-2xl text-foreground">
            195+
          </div>
          <div className="font-semibold text-muted-foreground text-xs uppercase">
            Countries Indexed
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="font-bold font-mono text-2xl text-foreground">
            100%
          </div>
          <div className="font-semibold text-muted-foreground text-xs uppercase">
            ISO-Compliant
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Award className="h-5 w-5" />
          </div>
          <div className="font-bold font-mono text-2xl text-foreground">
            30+
          </div>
          <div className="font-semibold text-muted-foreground text-xs uppercase">
            Major Currencies
          </div>
        </div>
      </div>
    </div>
  )
}
