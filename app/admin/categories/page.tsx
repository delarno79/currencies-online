import Link from "next/link"
import { Suspense } from "react"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
import { DeleteConfirmButton } from "../_components/delete-confirm-button"
import { SlugInput } from "../_components/slug-input"
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "../actions"

async function CategoriesContent({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  })

  const params = await searchParams
  const isEditing = params.action === "edit" && params.id
  const isCreating = params.action === "create"

  const editingCategory = isEditing
    ? await db.category.findUnique({
        where: { id: parseInt(params.id!) },
      })
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight">Categories</h1>
          <p className="mt-2 text-slate-400">
            Manage the blog post categories.
          </p>
        </div>
        {!isCreating && !isEditing && (
          <Link
            href="/admin/categories?action=create"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-sm text-white transition hover:bg-blue-500"
          >
            Create Category
          </Link>
        )}
      </div>

      {/* Form Area */}
      {(isCreating || (isEditing && editingCategory)) && (
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-white text-xl">
              {isEditing
                ? `Edit Category: ${editingCategory?.name}`
                : "Create New Category"}
            </h2>
            <Link
              href="/admin/categories"
              className="text-slate-400 text-sm transition hover:text-slate-200"
            >
              Cancel
            </Link>
          </div>

          <form
            action={isEditing ? updateCategoryAction : createCategoryAction}
            className="space-y-6"
            autoComplete="off"
          >
            {isEditing && (
              <input type="hidden" name="id" value={editingCategory?.id} />
            )}

            <SlugInput
              defaultTitle={editingCategory?.name || ""}
              defaultSlug={editingCategory?.slug || ""}
              titleLabel="Category Name"
              titleName="name"
              slugName="slug"
              placeholderTitle="e.g. Travel Tips"
              placeholderSlug="e.g. travel-tips"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              {isEditing ? "Save Changes" : "Create Category"}
            </button>
          </form>
        </div>
      )}

      {/* Categories List */}
      {!isCreating && !isEditing && (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
          {categories.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No categories found. Create one to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-slate-700 border-b bg-slate-800/50">
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Slug
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-400 text-xs uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-100">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        /{cat.slug}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(cat.createdAt).toLocaleDateString()}
                      </td>
                      <td className="space-x-3 px-6 py-4 text-right font-medium text-sm">
                        <Link
                          href={`/admin/categories?action=edit&id=${cat.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <DeleteConfirmButton
                          itemName="category"
                          onConfirm={deleteCategoryAction.bind(null, cat.id)}
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

export default function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  return (
    <Suspense
      fallback={<div className="text-slate-400">Loading categories...</div>}
    >
      <CategoriesContent searchParams={searchParams} />
    </Suspense>
  )
}
