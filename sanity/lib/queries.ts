import { groq } from "next-sanity"

/** Fetch all blog posts for the listing page */
export const allBlogsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "id": slug.current,
    title,
    summary,
    author,
    "category": category->title,
    readTime,
    publishedAt,
    "imageUrl": coverImage.asset->url
  }
`

/** Fetch a single blog post by slug */
export const blogBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "id": slug.current,
    title,
    summary,
    content,
    author,
    "category": category->title,
    readTime,
    publishedAt,
    "imageUrl": coverImage.asset->url
  }
`

/** Fetch all slugs for generateStaticParams */
export const allBlogSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`
