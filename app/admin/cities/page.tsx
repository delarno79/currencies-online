import Link from "next/link"
import { Suspense } from "react"
import { db } from "@/lib/db"
import { DeleteConfirmButton } from "../_components/delete-confirm-button"
import { SlugInput } from "../_components/slug-input"
import {
  createCityAction,
  deleteCityAction,
  updateCityAction,
} from "../actions"

async function CitiesContent({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  const cities = await db.city.findMany({
    orderBy: { name: "asc" },
  })

  const params = await searchParams
  const isEditing = params.action === "edit" && params.id
  const isCreating = params.action === "create"

  const editingCity = isEditing
    ? await db.city.findUnique({
        where: { id: parseInt(params.id!) },
      })
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight">
            Cities Directory
          </h1>
          <p className="mt-2 text-slate-400">
            Manage the US cities configured for programmatic SEO pages.
          </p>
        </div>
        {!isCreating && !isEditing && (
          <Link
            href="/admin/cities?action=create"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-sm text-white transition hover:bg-blue-500"
          >
            Add City
          </Link>
        )}
      </div>

      {/* Form Area */}
      {(isCreating || (isEditing && editingCity)) && (
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-white text-xl">
              {isEditing ? `Edit City: ${editingCity?.name}` : "Add New City"}
            </h2>
            <Link
              href="/admin/cities"
              className="text-slate-400 text-sm transition hover:text-slate-200"
            >
              Cancel
            </Link>
          </div>

          <form
            action={isEditing ? updateCityAction : createCityAction}
            className="space-y-6"
            autoComplete="off"
          >
            {isEditing && (
              <input type="hidden" name="id" value={editingCity?.id} />
            )}

            <SlugInput
              defaultTitle={editingCity?.name || ""}
              defaultSlug={editingCity?.slug || ""}
              titleLabel="City Name"
              titleName="name"
              slugName="slug"
              placeholderTitle="e.g. New York"
              placeholderSlug="e.g. new-york-ny"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  State Code
                </label>
                <input
                  type="text"
                  name="state"
                  autoComplete="off"
                  defaultValue={editingCity?.state || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. NY"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  autoComplete="off"
                  defaultValue={editingCity?.country || "United States"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. United States"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Country Code
                </label>
                <input
                  type="text"
                  name="countryCode"
                  required
                  maxLength={2}
                  autoComplete="off"
                  defaultValue={editingCity?.countryCode || "US"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. US"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Timezone
                </label>
                <input
                  type="text"
                  name="timezone"
                  autoComplete="off"
                  defaultValue={editingCity?.timezone || "America/New_York"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. America/New_York"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  autoComplete="off"
                  defaultValue={editingCity?.latitude || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. 40.7128"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  autoComplete="off"
                  defaultValue={editingCity?.longitude || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. -74.0060"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Population
                </label>
                <input
                  type="number"
                  name="population"
                  autoComplete="off"
                  defaultValue={editingCity?.population || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. 8419000"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              {isEditing ? "Save Changes" : "Add City"}
            </button>
          </form>
        </div>
      )}

      {/* Cities List */}
      {!isCreating && !isEditing && (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
          {cities.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No cities configured yet. Add one to generate SEO pages!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-slate-700 border-b bg-slate-800/50">
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      City
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      State
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Slug
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Country
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-400 text-xs uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cities.map((city) => (
                    <tr
                      key={city.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-100">
                        {city.name}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {city.state || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        /currency-exchange/{city.slug}/
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {city.country}
                      </td>
                      <td className="space-x-3 px-6 py-4 text-right font-medium text-sm">
                        <Link
                          href={`/admin/cities?action=edit&id=${city.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <DeleteConfirmButton
                          itemName="city"
                          onConfirm={deleteCityAction.bind(null, city.id)}
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

export default function AdminCitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  return (
    <Suspense
      fallback={<div className="text-slate-400">Loading cities...</div>}
    >
      <CitiesContent searchParams={searchParams} />
    </Suspense>
  )
}
