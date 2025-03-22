import Link from "next/link"
import { ArrowLeft, Share2, Bookmark, ThumbsUp, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the article data based on the ID
  const article = {
    id: params.id,
    title: "AI Breakthrough: New Model Understands Context Better Than Ever",
    summary:
      "Researchers have developed a new AI model that can understand context in conversations with unprecedented accuracy.",
    content: `
      <p>In a groundbreaking development, researchers at AI Research Labs have unveiled a new language model that demonstrates unprecedented capabilities in understanding conversational context.</p>
      
      <p>The model, named ContextAI, can maintain coherent conversations across multiple topics and remember details from earlier in the conversation with remarkable accuracy. This represents a significant leap forward in natural language processing technology.</p>
      
      <p>"What makes ContextAI different is its ability to understand nuanced human interactions," explains Dr. Sarah Chen, lead researcher on the project. "It can pick up on subtle contextual cues that previous models missed entirely."</p>
      
      <p>The implications for this technology are far-reaching. From customer service chatbots to virtual assistants, ContextAI could transform how we interact with AI systems in our daily lives.</p>
      
      <p>Early tests show that ContextAI achieves a 78% accuracy rate on complex contextual understanding tasks, compared to the previous state-of-the-art model's 45%.</p>
      
      <p>The research team plans to release a limited version of ContextAI for academic research next month, with commercial applications expected to follow later this year.</p>
      
      <p>Industry experts are already taking notice. "This could be the breakthrough we've been waiting for," says tech analyst Miguel Rodriguez. "The ability to maintain context over long conversations has been a major hurdle for AI systems."</p>
      
      <p>As AI continues to evolve, developments like ContextAI raise both exciting possibilities and important questions about the future of human-machine interaction.</p>
    `,
    category: "Technology",
    date: "March 15, 2023",
    image: "/placeholder.svg?height=400&width=800",
    format: "text",
    readTime: "4 min read",
    author: {
      name: "Dr. Alex Johnson",
      role: "AI Correspondent",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    relatedArticles: [
      {
        id: "2",
        title: "The Future of AI in Healthcare: Predictions for 2024",
        category: "Technology",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "3",
        title: "How Machine Learning is Transforming Scientific Research",
        category: "Science",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "4",
        title: "Ethics in AI: The Growing Debate",
        category: "Technology",
        image: "/placeholder.svg?height=100&width=200",
      },
    ],
  }

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/news" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{article.category}</Badge>
            <Badge variant="outline">{article.format}</Badge>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <Avatar>
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-sm text-muted-foreground">{article.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg">
          <img src={article.image || "/placeholder.svg"} alt={article.title} className="h-full w-full object-cover" />
        </div>

        <div
          className="prose prose-stone max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {article.relatedArticles.map((relatedArticle) => (
              <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={relatedArticle.image || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-3">
                    <Badge className="mb-1 w-fit">{relatedArticle.category}</Badge>
                    <CardTitle className="line-clamp-2 text-sm">{relatedArticle.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

