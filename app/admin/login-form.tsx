"use client"

import { useActionState } from "react"
import { loginAdminAction } from "./actions"

const initialState = {
  error: null as string | null,
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialState
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-red-500/50 bg-red-950/50 px-4 py-3 text-red-200 text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label
          className="mb-2 block font-semibold text-slate-300 text-xs uppercase tracking-wider"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="admin"
        />
      </div>

      <div>
        <label
          className="mb-2 block font-semibold text-slate-300 text-xs uppercase tracking-wider"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white shadow-blue-600/10 shadow-lg transition duration-200 hover:bg-blue-500 focus:outline-none disabled:bg-blue-800"
      >
        {isPending ? "Logging In..." : "Log In"}
      </button>
    </form>
  )
}
