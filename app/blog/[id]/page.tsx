import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Adsense } from "@/app/_components/adsense"
import { blogs } from "@/lib/data"
import { BlogPostContent } from "./_components/blog-post-content"

// Pre-render blog routes
export async function generateStaticParams() {
  return blogs.map((post) => ({
    id: post.id,
  }))
}

// SEO Metadata builder
export async function generateMetadata(
  props: PageProps<"/blog/[id]">
): Promise<Metadata> {
  const { id } = await props.params
  const post = blogs.find((b) => b.id === id)

  if (!post) {
    return {
      title: "Article Not Found | Currencies.global Blog",
      description:
        "The requested blog article could not be located in our index.",
    }
  }

  return {
    title: `${post.title} | Currencies.global Blog`,
    description: post.summary,
  }
}

export default async function BlogPostPage(props: PageProps<"/blog/[id]">) {
  const { id } = await props.params
  const post = blogs.find((b) => b.id === id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="mb-8">
        <Adsense slot="blog-post-top" format="horizontal" />
      </div>

      {/* Main Post details */}
      <BlogPostContent post={post} />

      {/* Bottom Banner */}
      <div className="mt-12">
        <Adsense slot="blog-post-bottom" format="horizontal" />
      </div>
    </div>
  )
}
