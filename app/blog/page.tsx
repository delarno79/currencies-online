import { BookOpen } from "lucide-react"
import type { Metadata } from "next"
import { Adsense } from "@/app/_components/adsense"
import { BlogList } from "./_components/blog-list"

export const metadata: Metadata = {
  title: "Currency & Economic Blog | Currencies.online",
  description:
    "Read expert analyses on world currencies, hyperinflation, currency strength benchmarks, and global economic trends.",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
            <BookOpen className="h-3 w-3" />
            Insights & Analysis
          </span>
          <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
            Currencies.online Hub Blog
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
      <BlogList />

      {/* Bottom Ad Spot */}
      <div className="mt-12">
        <Adsense slot="blog-bottom-ad" format="horizontal" />
      </div>
    </div>
  )
}
