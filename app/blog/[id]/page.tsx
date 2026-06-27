import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Adsense } from "@/app/_components/adsense"
import { blogs as hardcodedBlogs } from "@/lib/data"
import { db } from "@/lib/db"
import { BlogPostContent } from "./_components/blog-post-content"

export const dynamic = "force-dynamic"

async function getRawDbPost(slug: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    })

    if (!post) return null

    return {
      id: post.slug,
      title: post.title,
      summary: post.summary,
      category: post.category.name,
      readTime: `${Math.ceil(post.content.split(/\s+/).length / 200)} min read`,
      date: post.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Currencies.global Editor",
      content: post.content,
      imageUrl: "",
    }
  } catch (err) {
    console.error("Failed to fetch blog post from database:", err)
    return null
  }
}

async function fetchDbPost(slug: string) {
  return getRawDbPost(slug)
}

async function getRawDbRecommendations(excludeSlug: string) {
  try {
    const dbPosts = await db.blogPost.findMany({
      where: {
        published: true,
        slug: { not: excludeSlug },
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 2,
    })

    return dbPosts.map((post) => ({
      id: post.slug,
      title: post.title,
      summary: post.summary,
      category: post.category.name,
      readTime: `${Math.ceil(post.content.split(/\s+/).length / 200)} min read`,
      date: post.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Currencies.global Editor",
      content: post.content,
      imageUrl: "",
    }))
  } catch (err) {
    console.error("Failed to fetch blog recommendations from database:", err)
    return []
  }
}

async function fetchDbRecommendations(excludeSlug: string) {
  return getRawDbRecommendations(excludeSlug)
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await props.params

  // Try DB first
  const dbPost = await fetchDbPost(id)
  if (dbPost) {
    return {
      title: `${dbPost.title} | Currencies.global Blog`,
      description: dbPost.summary,
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

export default function BlogPostPage(props: {
  params: Promise<{ id: string }>
}) {
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

  const recommendations = await fetchDbRecommendations(id)

  // Try DB first
  const dbPost = await fetchDbPost(id)
  if (dbPost) {
    return (
      <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Adsense slot="blog-post-top" format="horizontal" />
        </div>
        <BlogPostContent
          post={dbPost}
          source="hardcoded"
          recommendedPosts={recommendations}
        />
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
      <BlogPostContent
        post={hardcodedPost}
        source="hardcoded"
        recommendedPosts={recommendations}
      />
      <div className="mt-12">
        <Adsense slot="blog-post-bottom" format="horizontal" />
      </div>
    </div>
  )
}
