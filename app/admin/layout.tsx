import Link from "next/link"
import { Suspense } from "react"
import { isAdminAuthenticated } from "@/lib/auth"
import { Sidebar } from "./_components/sidebar"
import { logoutAdminAction } from "./actions"
import { LoginForm } from "./login-form"

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-slate-100">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-extrabold text-3xl text-blue-500 tracking-tight">
              Currencies Global
            </h1>
            <p className="font-medium text-slate-400 text-sm">
              Administration Portal Log In
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar logoutAction={logoutAdminAction} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-900 p-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">
          Loading Admin Portal...
        </div>
      }
    >
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  )
}
