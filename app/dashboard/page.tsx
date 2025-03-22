import Link from "next/link"
import { BarChart3, Newspaper, Layers3Icon as Layers3D, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your personalized news.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+14% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 hrs</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AR Interactions</CardTitle>
            <Layers3D className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5.4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommended">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/news">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reading Activity</CardTitle>
            <CardDescription>Your reading patterns over the past month</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] w-full">
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
            <CardDescription>What you've been reading about</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] w-full">
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
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
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/news/${article.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface Article {
  id: string
  title: string
  summary: string
  category: string
  date: string
  image: string
}

const recommendedArticles: Article[] = [
  {
    id: "1",
    title: "AI Breakthrough: New Model Understands Context Better Than Ever",
    summary:
      "Researchers have developed a new AI model that can understand context in conversations with unprecedented accuracy.",
    category: "Technology",
    date: "2h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030.",
    category: "Politics",
    date: "4h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "New Study Reveals Benefits of Intermittent Fasting",
    summary:
      "A comprehensive study has found significant health benefits associated with intermittent fasting patterns.",
    category: "Health",
    date: "6h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const trendingArticles: Article[] = [
  {
    id: "4",
    title: "SpaceX Successfully Launches First Civilian Mission to Mars",
    summary: "SpaceX has made history with the first successful launch of civilians to the red planet.",
    category: "Science",
    date: "1h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Major Breakthrough in Quantum Computing Announced",
    summary: "Scientists have achieved quantum supremacy with a new 1000-qubit processor.",
    category: "Technology",
    date: "3h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Global Stock Markets Hit All-Time High",
    summary: "Stock markets around the world have reached unprecedented levels following economic recovery.",
    category: "Finance",
    date: "5h ago",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const savedArticles: Article[] = [
  {
    id: "7",
    title: "Revolutionary Battery Technology Extends EV Range by 300%",
    summary: "A new battery technology promises to triple the range of electric vehicles on a single charge.",
    category: "Technology",
    date: "2d ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "8",
    title: "Ancient Civilization Discovered in Amazon Rainforest",
    summary: "Archaeologists have uncovered evidence of a previously unknown ancient civilization in the Amazon.",
    category: "History",
    date: "3d ago",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "9",
    title: "New Nutritional Guidelines Reverse Decades of Advice",
    summary: "Health experts have released new dietary guidelines that contradict long-standing nutritional advice.",
    category: "Health",
    date: "4d ago",
    image: "/placeholder.svg?height=200&width=400",
  },
]

