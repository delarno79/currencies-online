import Link from "next/link"
import { Suspense } from "react"
import { db } from "@/lib/db"
import { DeleteConfirmButton } from "../_components/delete-confirm-button"
import { SlugInput } from "../_components/slug-input"
import {
  createBlogAction,
  deleteBlogAction,
  updateBlogAction,
} from "../actions"

async function BlogsContent({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  const blogs = await db.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  const categories = await db.category.findMany()

  const params = await searchParams
  const isEditing = params.action === "edit" && params.id
  const isCreating = params.action === "create"

  const editingBlog = isEditing
    ? await db.blogPost.findUnique({
        where: { id: parseInt(params.id!) },
      })
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-3xl tracking-tight">Blog Posts</h1>
          <p className="mt-2 text-slate-400">
            Manage the articles and guides appearing on the site.
          </p>
        </div>
        {!isCreating && !isEditing && (
          <Link
            href="/admin/blogs?action=create"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-sm text-white transition hover:bg-blue-500"
          >
            Create Post
          </Link>
        )}
      </div>

      {/* Form Area */}
      {(isCreating || (isEditing && editingBlog)) && (
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-white text-xl">
              {isEditing
                ? `Edit Post: ${editingBlog?.title}`
                : "Create New Post"}
            </h2>
            <Link
              href="/admin/blogs"
              className="text-slate-400 text-sm transition hover:text-slate-200"
            >
              Cancel
            </Link>
          </div>

          <form
            action={isEditing ? updateBlogAction : createBlogAction}
            className="space-y-6"
            autoComplete="off"
          >
            {isEditing && (
              <input type="hidden" name="id" value={editingBlog?.id} />
            )}

            <SlugInput
              defaultTitle={editingBlog?.title || ""}
              defaultSlug={editingBlog?.slug || ""}
              titleLabel="Title"
              titleName="title"
              slugName="slug"
              placeholderTitle="e.g. How to Save Money on Currency Exchange"
              placeholderSlug="e.g. how-to-save-money-on-currency-exchange"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Category
                </label>
                <select
                  name="categoryId"
                  required
                  defaultValue={editingBlog?.categoryId || ""}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Status
                </label>
                <select
                  name="published"
                  defaultValue={editingBlog?.published ? "true" : "false"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                >
                  <option value="false">Draft</option>
                  <option value="true">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                Summary
              </label>
              <textarea
                name="summary"
                required
                rows={3}
                autoComplete="off"
                defaultValue={editingBlog?.summary || ""}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                placeholder="A brief teaser paragraph shown in blog listings..."
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                Content (Markdown)
              </label>
              <textarea
                name="content"
                required
                rows={12}
                autoComplete="off"
                defaultValue={editingBlog?.content || ""}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 font-mono text-slate-100 text-sm placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
                placeholder="# Introduction..."
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              {isEditing ? "Save Changes" : "Create Post"}
            </button>
          </form>
        </div>
      )}

      {/* Blogs List */}
      {!isCreating && !isEditing && (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
          {blogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No blog posts found. Create one to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-slate-700 border-b bg-slate-800/50">
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Title
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase">
                      Status
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
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="transition hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-100">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {blog.category.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs ${
                            blog.published
                              ? "bg-green-950 text-green-300"
                              : "bg-yellow-950 text-yellow-300"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="space-x-3 px-6 py-4 text-right font-medium text-sm">
                        <Link
                          href={`/admin/blogs?action=edit&id=${blog.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <DeleteConfirmButton
                          itemName="blog post"
                          onConfirm={deleteBlogAction.bind(null, blog.id)}
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

export default function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; id?: string }>
}) {
  return (
    <Suspense
      fallback={<div className="text-slate-400">Loading blog posts...</div>}
    >
      <BlogsContent searchParams={searchParams} />
    </Suspense>
  )
}
