import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | Currencies.online",
  description:
    "Read the Terms of Service of Currencies.online to understand the conditions of website usage.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm">
          Last Updated: June 6, 2026
        </p>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="prose dark:prose-invert max-w-none space-y-6 p-6 text-muted-foreground text-sm leading-relaxed sm:p-8">
          <p>
            Welcome to Currencies.online. By accessing or using our website, you
            agree to comply with and be bound by the following terms and
            conditions.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website, you acknowledge that you have read,
            understood, and agreed to these terms. If you do not agree, you must
            immediately discontinue usage.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily view and query our database.
            This is a license grant, not a transfer of title. Under this
            license, you may not:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Modify, copy, or scrape data programmatically for resale.</li>
              <li>
                Use the database content for any commercial purpose without
                prior consent.
              </li>
              <li>
                Decompile or reverse-engineer any component of
                Currencies.online.
              </li>
            </ul>
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            3. Disclaimer
          </h2>
          <p>
            The currency rates and country directories are provided on an
            'as-is' basis. Currencies.online makes no warranties, expressed or
            implied, regarding exchange rate precision or availability.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            4. Governing Law
          </h2>
          <p>
            Any claim relating to Currencies.online shall be governed by local
            regulations without regard to conflict of law provisions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
