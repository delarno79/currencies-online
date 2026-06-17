import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import "./globals.css"
import { Footer } from "@/app/_components/footer"
import { Header } from "@/app/_components/header"
import { MobileNav } from "@/app/_components/mobile-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title:
    "Currencies.global | World's Currency Directory & Exchange Rates Database",
  description:
    "Search any country's official currency, currency code, symbol, and live exchange rates. Your ultimate world currency directory and exchange rate database.",
  metadataBase: new URL("https://currencies.global"),
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <NuqsAdapter>
            <div className="flex min-h-screen flex-col bg-background pb-16 text-foreground selection:bg-primary/20 md:pb-0">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileNav />
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
