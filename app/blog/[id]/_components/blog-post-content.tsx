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

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  // Find other posts for recommendation
  const otherPosts = blogs.filter((b) => b.id !== post.id).slice(0, 2)

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
                  {post.date}
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

              {/* HTML Content rendering with stylized classes */}
              <div
                className="prose dark:prose-invert prose-h3:mt-6 prose-p:mt-2 max-w-none prose-ul:list-disc prose-ul:space-y-1.5 space-y-5 prose-ul:pl-5 prose-headings:font-bold prose-headings:font-heading prose-strong:font-bold prose-h3:text-base prose-headings:text-foreground prose-strong:text-foreground text-muted-foreground text-sm leading-relaxed prose-h3:sm:text-lg sm:text-base"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: static database contents are safe
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
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
          <div className="space-y-4">
            <h2 className="flex items-center gap-1.5 font-bold text-base text-foreground">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              Recommended Articles
            </h2>

            <div className="space-y-4">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block"
                >
                  <Card className="border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/40 hover:shadow-sm">
                    <CardContent className="space-y-2 p-4">
                      <span className="inline-flex items-center bg-primary/10 px-2 py-0.5 font-semibold text-[10px] text-primary">
                        {post.category}
                      </span>
                      <h3 className="line-clamp-2 font-bold text-foreground text-xs leading-snug transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
