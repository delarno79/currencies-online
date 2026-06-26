import { PortableText, type PortableTextComponents } from "@portabletext/react"
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type BlogPost, blogs } from "@/lib/data"
import type { SanityBlogPost } from "@/sanity/lib/types"

/** Portable Text renderer components — maps Sanity block types to styled HTML */
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-2 text-sm leading-relaxed sm:text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 font-bold font-heading text-foreground text-xl tracking-tight sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 font-bold font-heading text-base text-foreground sm:text-lg">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-primary border-l-4 pl-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm sm:text-base">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        // biome-ignore lint/performance/noImgElement: Sanity images, CDN URL
        <img
          src={value.asset.url}
          alt={value.alt ?? ""}
          className="my-6 w-full rounded-md"
        />
      ) : null,
  },
}

function formatDate(raw: string) {
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface BlogPostContentProps {
  post: BlogPost | SanityBlogPost
  source: "hardcoded" | "sanity"
  recommendedPosts?: BlogPost[]
}

export function BlogPostContent({
  post,
  source,
  recommendedPosts = [],
}: BlogPostContentProps) {
  const displayDate =
    source === "sanity"
      ? formatDate((post as SanityBlogPost).publishedAt)
      : (post as BlogPost).date

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Article Body */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6 sm:p-8">
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-3.5 text-muted-foreground text-xs">
                <span className="inline-flex items-center bg-primary/10 px-3 py-1 font-semibold text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {displayDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-extrabold font-heading text-3xl text-foreground leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>

              {/* Author box */}
              <div className="flex items-center gap-3.5 border-border border-t border-b py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-xs">
                    Written by {post.author}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Economic Analyst & Contributor
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-muted-foreground">
                {source === "sanity" ? (
                  <PortableText
                    value={(post as SanityBlogPost).content}
                    components={portableTextComponents}
                  />
                ) : (
                  <div
                    className="prose dark:prose-invert prose-h3:mt-6 prose-p:mt-2 max-w-none prose-ul:list-disc prose-ul:space-y-1.5 space-y-5 prose-ul:pl-5 prose-headings:font-bold prose-headings:font-heading prose-strong:font-bold prose-h3:text-base prose-headings:text-foreground prose-strong:text-foreground text-sm leading-relaxed prose-h3:sm:text-lg sm:text-base"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: static hardcoded content is safe
                    dangerouslySetInnerHTML={{
                      __html: (post as BlogPost).content,
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Recommendations & Sidebar widgets */}
        <div className="space-y-6">
          {/* Quick Tools Box */}
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                <TrendingUp className="h-4.5 w-4.5 text-primary" />
                Useful Utilities
              </h2>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Take advantage of our global currency converters and directories
                while reviewing economic articles.
              </p>

              <div className="space-y-2">
                <Link href="/converter" className="block w-full">
                  <Button className="w-full gap-2 py-4 text-xs">
                    <Calculator className="h-4 w-4" />
                    Exchange Calculator
                  </Button>
                </Link>

                <Link href="/countries" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-border py-4 text-xs"
                  >
                    Search Country Currencies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Posts */}
          {recommendedPosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-1.5 font-bold text-base text-foreground">
                <BookOpen className="h-4.5 w-4.5 text-primary" />
                Recommended Articles
              </h2>

              <div className="space-y-4">
                {recommendedPosts.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/blog/${rec.id}`}
                    className="group block"
                  >
                    <Card className="border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/40 hover:shadow-sm">
                      <CardContent className="space-y-2 p-4">
                        <span className="inline-flex items-center bg-primary/10 px-2 py-0.5 font-semibold text-[10px] text-primary">
                          {rec.category}
                        </span>
                        <h3 className="line-clamp-2 font-bold text-foreground text-xs leading-snug transition-colors group-hover:text-primary">
                          {rec.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{rec.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
