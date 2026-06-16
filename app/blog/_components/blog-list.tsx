"use client"

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input as UiInput } from "@/components/ui/input"
import { blogs } from "@/lib/data"

export function BlogList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category))
    return ["All", ...Array.from(set)]
  }, [])

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.content.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  return (
    <div className="space-y-8">
      {/* Category selector and Search bar */}
      <div className="flex flex-col items-stretch justify-between gap-4 border border-border bg-card p-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <UiInput
            type="text"
            placeholder="Search blog articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-border bg-background/50 pl-9"
          />
        </div>

        {/* Categories List */}
        <div className="no-scrollbar flex flex-nowrap gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 font-semibold text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of articles */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block"
            >
              <Card className="h-full border border-border transition-all duration-300 hover:border-primary/20 hover:bg-accent/30 hover:shadow-md">
                <CardContent className="flex h-full flex-col justify-between gap-5 p-6">
                  {/* Category & Read time */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-muted-foreground text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & summary */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground text-lg leading-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-muted-foreground text-xs leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  {/* Footer details: Date & Author */}
                  <div className="flex items-center justify-between border-border border-t pt-4 text-muted-foreground text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {post.author}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-border bg-card py-20 text-center">
          <BookOpen className="mb-4 h-12 w-12 animate-bounce text-muted-foreground/40" />
          <h3 className="font-bold text-foreground text-lg">
            No Articles Found
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground text-sm">
            We couldn't find any articles matching your search query. Try typing
            something else.
          </p>
        </div>
      )}
    </div>
  )
}
