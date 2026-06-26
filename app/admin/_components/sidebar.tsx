"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"

interface SidebarProps {
  logoutAction: () => void
}

export function Sidebar({ logoutAction }: SidebarProps) {
  const pathname = usePathname()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Blog Posts", href: "/admin/blogs" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Cities Directory", href: "/admin/cities" },
    { name: "Currencies", href: "/admin/currencies" },
    { name: "Settings", href: "/admin/settings" },
  ]

  const handleLogout = () => {
    startTransition(() => {
      logoutAction()
    })
  }

  return (
    <>
      <aside className="flex w-64 shrink-0 flex-col justify-between border-slate-800 border-r bg-slate-950">
        <div>
          {/* Brand Header */}
          <div className="border-slate-900 border-b p-6">
            <Link
              href="/admin"
              className="block font-bold text-blue-500 text-xl hover:opacity-90"
            >
              Currencies.global
            </Link>
          </div>

          {/* Admin Info Section */}
          <div className="flex items-center justify-between gap-3 border-slate-900 border-b bg-slate-950/40 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600/10 font-bold text-blue-400">
                AD
              </div>
              <div>
                <div className="font-semibold text-slate-100 text-sm">
                  admin
                </div>
                <div className="font-medium text-[11px] text-slate-500">
                  Administrator
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={() => setIsLogoutOpen(true)}
              className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-950/20 hover:text-red-400"
              title="Logout"
              aria-label="Logout"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center rounded-lg px-4 py-3 font-medium text-sm transition ${
                      isActive
                        ? "rounded-l-none border-blue-500 border-l-4 bg-blue-600/10 font-semibold text-blue-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {isLogoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <h3 className="mb-2 font-bold text-lg text-white">
              Confirm Logout
            </h3>
            <p className="mb-6 text-slate-400 text-sm leading-relaxed">
              Are you sure you want to log out of your admin session?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setIsLogoutOpen(false)}
                className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-200 text-sm transition hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-red-500"
              >
                {isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
