import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Disclaimer | Currencies.online",
  description:
    "Read the financial and general disclaimer of Currencies.online.",
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          Disclaimer
        </h1>
        <p className="text-muted-foreground text-sm">
          Last Updated: June 6, 2026
        </p>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="prose dark:prose-invert max-w-none space-y-6 p-6 text-muted-foreground text-sm leading-relaxed sm:p-8">
          <h2 className="font-bold text-base text-foreground">
            1. Financial Information Disclaimer
          </h2>
          <p>
            The content, converters, graphs, and directories on
            Currencies.online are provided for general informational purposes
            only. None of the information on this website constitutes financial,
            investment, or legal advice.
          </p>
          <p>
            Exchange rates fluctuate constantly. While we make effort to supply
            accurate references, we do not guarantee the completeness or
            accuracy of any rates listed. Always consult qualified specialists
            before undertaking any commercial operations.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            2. Limitation of Liability
          </h2>
          <p>
            In no event shall Currencies.online or its partners be held liable
            for any damages (including, without limitation, damages for loss of
            capital, data, or profit) arising out of the use or inability to use
            the calculators or database, even if notified of the possibility of
            such damage.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
