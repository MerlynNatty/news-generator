import type React from "react"
import Link from "next/link"
import { ArrowRight, Newspaper, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Newspaper className="h-6 w-6" />
            <span>NewsAI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium">
              Login
            </Link>
            <Button asChild>
              <Link href="/auth/login?signup=true">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">News Tailored Just For You</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Experience personalized news with AI-powered summaries, media generation, and augmented reality overlays.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/auth/login?signup=true">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
            Discover how our AI-powered platform transforms your news experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-10 w-10" />}
            title="Personalized News"
            description="Get news tailored to your interests, preferences, and reading habits."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Adaptive Tone"
            description="Choose how your news is presented - formal, casual, or humorous."
          />
          <FeatureCard
            icon={<Newspaper className="h-10 w-10" />}
            title="AR News Overlay"
            description="Point your camera at images to see related news in augmented reality."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Transform Your News Experience?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Join thousands of users who have already discovered the future of news consumption.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/login?signup=true">
              Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Newspaper className="h-5 w-5" />
            <span>NewsAI</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NewsAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
      <div className="text-primary">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

