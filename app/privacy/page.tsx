import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Currencies.online",
  description:
    "Read the Privacy Policy of Currencies.online to understand how we collect, use, and safeguard your details.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last Updated: June 6, 2026
        </p>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="prose dark:prose-invert max-w-none space-y-6 p-6 text-muted-foreground text-sm leading-relaxed sm:p-8">
          <p>
            At Currencies.online, we prioritize the privacy of our visitors.
            This Privacy Policy document outlines the types of information we
            collect and how we use it.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            1. Information Collection
          </h2>
          <p>
            Currencies.online does not require registration. We do not collect
            personally identifiable details unless you fill out the Contact Us
            form directly. Standard server logs (IP address, browser type,
            referral URLs, access timestamps) are collected automatically for
            analytical and debugging purposes.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            2. Cookies and Web Beacons
          </h2>
          <p>
            We use cookies to store information about visitor preferences and
            optimize user experience. Additionally, third-party advertising
            partners, such as Google AdSense, utilize cookies (like the DART
            cookie) to serve advertisements based on search interactions.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            3. Third-Party Ads
          </h2>
          <p>
            Third-party ad servers use technologies like cookies, JavaScript, or
            Web Beacons that are sent directly to users' browsers. They
            automatically receive your IP address when this occurs. These are
            used to measure the effectiveness of their advertising campaigns.
          </p>

          <h2 className="mt-4 font-bold text-base text-foreground">
            4. Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
