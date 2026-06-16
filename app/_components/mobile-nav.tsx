"use client"

import {
  ArrowLeftRight,
  Calculator,
  Globe,
  Home,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Converter", href: "/converter", icon: Calculator },
  { name: "Rates", href: "/exchange-rates", icon: TrendingUp },
  { name: "Compare", href: "/compare", icon: ArrowLeftRight },
  { name: "Countries", href: "/countries", icon: Globe },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-border border-t bg-background/80 pb-safe backdrop-blur-md supports-backdrop-filter:bg-background/60 md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
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
                "relative flex h-full w-14 flex-col items-center justify-center gap-1 text-center transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute top-0 h-[2px] w-8 rounded-full bg-primary" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive
                    ? "scale-110 text-primary"
                    : "text-muted-foreground/80"
                )}
              />
              <span className="font-semibold text-[10px] tracking-tight">
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
