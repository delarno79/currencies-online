import { BookOpen } from "lucide-react"
import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { db } from "@/lib/db"
import { BlogList } from "./_components/blog-list"
import { RefreshInterval } from "./_components/refresh-interval"
import { unstable_cache } from "next/cache"

export const metadata: Metadata = {
  title: "Currency & Economic Blog | Currencies.global",
  description:
    "Read expert analyses on world currencies, hyperinflation, currency strength benchmarks, and global economic trends.",
}

const fetchDbPosts = unstable_cache(
  async () => {
    try {
      const dbPosts = await db.blogPost.findMany({
        where: { published: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
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
      console.error("Failed to fetch blog posts from database:", err)
      return []
    }
  },
  ["blogs-list"],
  { revalidate: 60 }
)

export default async function BlogPage() {
  const posts = await fetchDbPosts()

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <RefreshInterval />

      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <BookOpen className="h-3 w-3" />
            Insights & Analysis
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Currencies.global Hub Blog
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Informative reviews, market updates, and educational guides covering
            global economics, monetary policies, and historic currency symbols.
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <Adsense slot="blog-top-ad" format="horizontal" />
      </div>

      {/* Main blog content list */}
      <BlogList posts={posts} />

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="blog-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
