import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cacheLife, cacheTag } from "next/cache"
import { Adsense } from "@/app/_components/adsense"
import { blogs as hardcodedBlogs } from "@/lib/data"
import { client } from "@/sanity/lib/client"
import { blogBySlugQuery } from "@/sanity/lib/queries"
import type { SanityBlogPost } from "@/sanity/lib/types"
import { BlogPostContent } from "./_components/blog-post-content"

async function fetchPost(slug: string): Promise<SanityBlogPost | null> {
  "use cache"
  cacheLife("minutes")
  cacheTag("blogs", `blog-${slug}`)
  return client.fetch<SanityBlogPost | null>(blogBySlugQuery, { slug })
}

export async function generateMetadata(
  props: PageProps<"/blog/[id]">
): Promise<Metadata> {
  const { id } = await props.params

  // Try Sanity first
  const sanityPost = await fetchPost(id)
  if (sanityPost) {
    return {
      title: `${sanityPost.title} | Currencies.global Blog`,
      description: sanityPost.summary,
    }
  }

  // Fall back to hardcoded
  const post = hardcodedBlogs.find((b) => b.id === id)
  if (!post) {
    return {
      title: "Article Not Found | Currencies.global Blog",
      description: "The requested blog article could not be located.",
    }
  }
  return {
    title: `${post.title} | Currencies.global Blog`,
    description: post.summary,
  }
}

export default function BlogPostPage(props: PageProps<"/blog/[id]">) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-[1440px] px-4 py-20 text-center text-muted-foreground sm:px-6 lg:px-8">
          Loading article...
        </div>
      }
    >
      <BlogPostPageContent params={props.params} />
    </Suspense>
  )
}

async function BlogPostPageContent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Try Sanity first
  const sanityPost = await fetchPost(id)
  if (sanityPost) {
    return (
      <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Adsense slot="blog-post-top" format="horizontal" />
        </div>
        <BlogPostContent post={sanityPost} source="sanity" />
        <div className="mt-12">
          <Adsense slot="blog-post-bottom" format="horizontal" />
        </div>
      </div>
    )
  }

  // Fall back to hardcoded
  const hardcodedPost = hardcodedBlogs.find((b) => b.id === id)
  if (!hardcodedPost) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Adsense slot="blog-post-top" format="horizontal" />
      </div>
      <BlogPostContent post={hardcodedPost} source="hardcoded" />
      <div className="mt-12">
        <Adsense slot="blog-post-bottom" format="horizontal" />
      </div>
    </div>
  )
}
