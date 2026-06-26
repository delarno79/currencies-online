import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

import "./globals.css"
import Script from "next/script"
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

import { getCachedSystemSettings } from "@/lib/data-cache"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settingsList = await getCachedSystemSettings()
  
  const getSetting = (key: string, defaultValue: string) => {
    return settingsList.find((s) => s.key === key)?.value ?? defaultValue
  }
  
  const adsenseEnabled = getSetting("adsense_enabled", "false") === "true"
  const adsenseClientId = getSetting("adsense_client_id", "")
  const adsenseGlobalCode = getSetting("adsense_global_code", "")

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased font-sans"
    >
      <head>
        {adsenseEnabled && adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        {adsenseGlobalCode && (
          <script
            dangerouslySetInnerHTML={{
              __html: adsenseGlobalCode.replace(/<\/?script>/gi, ""),
            }}
          />
        )}
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4C91RK4QF4"
          strategy="afterInteractive"
          id="gtag"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4C91RK4QF4');
          `}
        </Script>
        <ThemeProvider>
          <NuqsAdapter>
            <div className="flex min-h-screen flex-col bg-background pb-16 text-foreground selection:bg-primary/20 md:pb-0">
              <Suspense
                fallback={
                  <div className="h-16 border-border border-b bg-background" />
                }
              >
                <Header />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
              <Suspense fallback={null}>
                <MobileNav />
              </Suspense>
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
