import { Suspense } from "react"
import { isAdminAuthenticated } from "@/lib/auth"
import { db } from "@/lib/db"
import { LoginForm } from "./login-form"

async function DashboardContent() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Fetch count metrics
  const blogCount = await db.blogPost.count()
  const categoryCount = await db.category.count()
  const cityCount = await db.city.count()
  const currencyCount = await db.currency.count()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-extrabold text-3xl tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
          Manage your blog, categories, cities, and currencies from one unified
          workspace.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-md transition hover:border-blue-500/50">
          <h3 className="font-semibold text-slate-400 text-sm uppercase tracking-wide">
            Blog Posts
          </h3>
          <p className="mt-2 font-extrabold text-4xl text-blue-500">
            {blogCount}
          </p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-md transition hover:border-blue-500/50">
          <h3 className="font-semibold text-slate-400 text-sm uppercase tracking-wide">
            Categories
          </h3>
          <p className="mt-2 font-extrabold text-4xl text-blue-500">
            {categoryCount}
          </p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-md transition hover:border-blue-500/50">
          <h3 className="font-semibold text-slate-400 text-sm uppercase tracking-wide">
            Cities
          </h3>
          <p className="mt-2 font-extrabold text-4xl text-blue-500">
            {cityCount}
          </p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-md transition hover:border-blue-500/50">
          <h3 className="font-semibold text-slate-400 text-sm uppercase tracking-wide">
            Currencies
          </h3>
          <p className="mt-2 font-extrabold text-4xl text-blue-500">
            {currencyCount}
          </p>
        </div>
      </div>

      {/* Welcome Area */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-800/50 p-8 md:flex-row">
        <div>
          <h2 className="mb-2 font-bold text-white text-xl">
            Welcome to the Administration Console
          </h2>
          <p className="max-w-xl text-slate-400 text-sm leading-relaxed">
            All modifications will immediately update the database and reflect
            live on your Next.js website. To manage items, select a tab from the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={<div className="text-slate-400">Loading dashboard...</div>}
    >
      <DashboardContent />
    </Suspense>
  )
}
