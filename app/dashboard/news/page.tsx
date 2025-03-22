"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Search, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function NewsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Explore News</h1>
        <p className="text-muted-foreground">Discover personalized news articles tailored to your interests.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search articles..." className="w-full pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Articles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Categories</DropdownMenuLabel>
                <DropdownMenuItem>
                  <span>Technology</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Politics</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Health</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Science</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Finance</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Time Period</DropdownMenuLabel>
                <DropdownMenuItem>
                  <span>Today</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>This Week</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>This Month</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date (Newest)</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-r-none ${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-l-none ${viewMode === "list" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="politics">Politics</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {allArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="technology" className="mt-4">
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allArticles
                .filter((article) => article.category === "Technology")
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              {allArticles
                .filter((article) => article.category === "Technology")
                .map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
            </div>
          )}
        </TabsContent>
        {/* Other tabs would follow the same pattern */}
      </Tabs>
    </div>
  )
}

interface Article {
  id: string
  title: string
  summary: string
  category: string
  date: string
  image: string
  format: "text" | "image" | "video" | "ar"
  readTime: string
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {article.category}
          </Badge>
          <Badge variant="outline" className="bg-secondary/10 text-secondary">
            {article.format}
          </Badge>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-xs text-muted-foreground">{article.readTime}</span>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/news/${article.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row">
      <div className="aspect-video w-full overflow-hidden rounded-md sm:w-48">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {article.category}
          </Badge>
          <Badge variant="outline" className="bg-secondary/10 text-secondary">
            {article.format}
          </Badge>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </div>
        <h3 className="mt-2 line-clamp-1 text-lg font-semibold">{article.title}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{article.summary}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/news/${article.id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const allArticles: Article[] = [
  {
    id: "1",
    title: "AI Breakthrough: New Model Understands Context Better Than Ever",
    summary:
      "Researchers have developed a new AI model that can understand context in conversations with unprecedented accuracy.",
    category: "Technology",
    date: "2h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "text",
    readTime: "4 min read",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030.",
    category: "Politics",
    date: "4h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "image",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "New Study Reveals Benefits of Intermittent Fasting",
    summary:
      "A comprehensive study has found significant health benefits associated with intermittent fasting patterns.",
    category: "Health",
    date: "6h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "video",
    readTime: "5 min read",
  },
  {
    id: "4",
    title: "SpaceX Successfully Launches First Civilian Mission to Mars",
    summary: "SpaceX has made history with the first successful launch of civilians to the red planet.",
    category: "Science",
    date: "1h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "ar",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Major Breakthrough in Quantum Computing Announced",
    summary: "Scientists have achieved quantum supremacy with a new 1000-qubit processor.",
    category: "Technology",
    date: "3h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "text",
    readTime: "8 min read",
  },
  {
    id: "6",
    title: "Global Stock Markets Hit All-Time High",
    summary: "Stock markets around the world have reached unprecedented levels following economic recovery.",
    category: "Finance",
    date: "5h ago",
    image: "/placeholder.svg?height=200&width=400",
    format: "image",
    readTime: "3 min read",
  },
]

