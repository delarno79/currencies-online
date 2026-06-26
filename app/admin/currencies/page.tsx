import Link from "next/link"
import { Suspense } from "react"
import { db } from "@/lib/db"
import { DeleteConfirmButton } from "../_components/delete-confirm-button"
import {
  createCurrencyAction,
  deleteCurrencyAction,
  updateCurrencyAction,
} from "../actions"

async function CurrenciesContent({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  const currencies = await db.currency.findMany({
    orderBy: { code: "asc" },
  })

  const params = await searchParams
  const isEditing = params.action === "edit" && params.id
  const isCreating = params.action === "create"

  const editingCurrency = isEditing
    ? await db.currency.findUnique({
        where: { id: parseInt(params.id!) },
      })
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight">Currencies</h1>
          <p className="mt-2 text-slate-400">
            Manage the list of world currencies available on the platform.
          </p>
        </div>
        {!isCreating && !isEditing && (
          <Link
            href="/admin/currencies?action=create"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-sm text-white transition hover:bg-blue-500"
          >
            Add Currency
          </Link>
        )}
      </div>

      {/* Form Area */}
      {(isCreating || (isEditing && editingCurrency)) && (
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-white text-xl">
              {isEditing
                ? `Edit Currency: ${editingCurrency?.code}`
                : "Add New Currency"}
            </h2>
            <Link
              href="/admin/currencies"
              className="text-slate-400 text-sm transition hover:text-slate-200"
            >
              Cancel
            </Link>
          </div>

          <form
            action={isEditing ? updateCurrencyAction : createCurrencyAction}
            className="space-y-6"
            autoComplete="off"
          >
            {isEditing && (
              <input type="hidden" name="id" value={editingCurrency?.id} />
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Currency Code
                </label>
                <input
                  type="text"
                  name="code"
                  required
                  maxLength={3}
                  autoComplete="off"
                  defaultValue={editingCurrency?.code || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. USD"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Currency Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  defaultValue={editingCurrency?.name || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. US Dollar"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  autoComplete="off"
                  defaultValue={editingCurrency?.symbol || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. $"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              {isEditing ? "Save Changes" : "Add Currency"}
            </button>
          </form>
        </div>
      )}

      {/* Currencies List */}
      {!isCreating && !isEditing && (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
          {currencies.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No currencies set up yet. Add one to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-slate-700 border-b bg-slate-800/50">
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Code
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Symbol
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-400 text-xs uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {currencies.map((curr) => (
                    <tr
                      key={curr.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4 font-bold text-slate-100">
                        {curr.code}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {curr.name}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {curr.symbol || "-"}
                      </td>
                      <td className="space-x-3 px-6 py-4 text-right font-medium text-sm">
                        <Link
                          href={`/admin/currencies?action=edit&id=${curr.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <DeleteConfirmButton
                          itemName="currency"
                          onConfirm={deleteCurrencyAction.bind(null, curr.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminCurrenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  return (
    <Suspense
      fallback={<div className="text-slate-400">Loading currencies...</div>}
    >
      <CurrenciesContent searchParams={searchParams} />
    </Suspense>
  )
}
