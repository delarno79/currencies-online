"use client"

import {
  ArrowLeftRight,
  BookOpen,
  Calculator,
  Coins,
  Globe,
  Home,
  Menu,
  Moon,
  Sparkles,
  Sun,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Countries", href: "/countries", icon: Globe },
  { name: "Currencies", href: "/currencies", icon: Coins },
  { name: "Exchange Rates", href: "/exchange-rates", icon: TrendingUp },
  { name: "Currency Converter", href: "/converter", icon: Calculator },
  { name: "Compare", href: "/compare", icon: ArrowLeftRight },
  { name: "Blog", href: "/blog", icon: BookOpen },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by waiting until mounted
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          {/* Globe Icon — used at all breakpoints */}
          <Image
            src="/logo-3-small.png"
            alt="Currencies.global Logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-sm object-contain"
            priority
          />
          {/* Brand text — visible on all screen sizes */}
          <span className="flex items-baseline gap-0">
            <span className="font-bold text-foreground text-xl tracking-tight">
              Currencies
            </span>
            <span className="font-semibold text-[#5b9fc8] text-xl tracking-tight">
              .global
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1 whitespace-nowrap px-1.5 py-1.5 font-medium text-xs transition-all duration-200 hover:bg-accent hover:text-accent-foreground lg:px-2 lg:py-2 lg:text-sm xl:gap-1.5 xl:px-3",
                  isActive
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "hidden h-4 w-4 xl:block",
                    isActive ? "text-primary" : "text-muted-foreground/80"
                  )}
                />
                {item.name}
                {isActive && (
                  <span className="absolute right-1.5 bottom-0 left-1.5 h-[2px] rounded-full bg-primary lg:right-2 lg:left-2 xl:right-3 xl:left-3" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" || theme === "dark") ? (
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
          </Button>

          {/* Quick Converter Shortcut */}
          <Link href="/converter" className="hidden shrink-0 lg:inline-block">
            <Button
              size="sm"
              className="flex h-8 items-center gap-1.5 px-4 font-medium shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Convert Now
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent
                side="right"
                className="w-[300px] border-border border-l bg-background px-4 py-6"
              >
                <SheetHeader className="border-border border-b pb-4 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
                      <Coins className="h-4 w-4" />
                    </div>
                    <span className="font-bold">Currencies.global</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-6">
                  {navItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 font-medium text-base transition-colors hover:bg-accent",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
                <div className="absolute right-4 bottom-8 left-4 flex flex-col gap-3">
                  <Link href="/converter" className="w-full">
                    <Button className="w-full gap-2 py-5 shadow-lg shadow-primary/15">
                      <Calculator className="h-4 w-4" />
                      Quick Converter
                    </Button>
                  </Link>
                  <p className="text-center text-muted-foreground text-xs">
                    World's Currency Directory & Database
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
