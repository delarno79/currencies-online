"use client"

import { useState } from "react"

interface SlugInputProps {
  defaultTitle?: string
  defaultSlug?: string
  titleLabel?: string
  titleName?: string
  slugName?: string
  placeholderTitle?: string
  placeholderSlug?: string
}

export function SlugInput({
  defaultTitle = "",
  defaultSlug = "",
  titleLabel = "Title",
  titleName = "title",
  slugName = "slug",
  placeholderTitle = "",
  placeholderSlug = "",
}: SlugInputProps) {
  const [title, setTitle] = useState(defaultTitle)
  const [slug, setSlug] = useState(defaultSlug)
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    defaultSlug !== ""
  )

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val))
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true)
    setSlug(e.target.value)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
          {titleLabel}
        </label>
        <input
          type="text"
          name={titleName}
          required
          value={title}
          onChange={handleTitleChange}
          autoComplete="off"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
          placeholder={placeholderTitle}
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
          Slug
        </label>
        <input
          type="text"
          name={slugName}
          required
          value={slug}
          onChange={handleSlugChange}
          autoComplete="off"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none"
          placeholder={placeholderSlug}
        />
      </div>
    </div>
  )
}
