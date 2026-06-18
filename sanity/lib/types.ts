import type { PortableTextBlock } from "next-sanity"

/** Blog post from Sanity CMS */
export interface SanityBlogPost {
  id: string
  title: string
  summary: string
  /** Portable Text blocks (rich text from Sanity editor) */
  content: PortableTextBlock[]
  author: string
  category: string
  readTime: string
  publishedAt: string
  imageUrl?: string | null
}
