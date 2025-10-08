import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Clock, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Listen to The Creative Pulse podcast. Discussions about AI, technology, and the future of intelligent agents.",
  openGraph: {
    title: "Podcasts | OUT POST",
    description: "Listen to The Creative Pulse podcast about AI and technology.",
  },
}

export default function PodcastPage() {
  const episodes = [
    {
      number: "01",
      title: "The Future of AI: Conversations with Leading Researchers",
      description:
        "Join us as we explore the cutting edge of artificial intelligence with top researchers from around the world.",
      duration: "45:32",
      date: "March 20, 2024",
      plays: "2.5k",
      image: "/podcast-episode-ai-future.jpg",
    },
    {
      number: "02",
      title: "Machine Learning in Practice: Real-World Applications",
      description: "Discover how companies are implementing ML solutions to solve complex business problems.",
      duration: "38:15",
      date: "March 13, 2024",
      plays: "2.1k",
      image: "/podcast-episode-ml-practice.jpg",
    },
    {
      number: "03",
      title: "Ethics in AI: Building Responsible Technology",
      description: "A deep dive into the ethical considerations and challenges facing AI developers today.",
      duration: "52:08",
      date: "March 6, 2024",
      plays: "1.9k",
      image: "/podcast-episode-ai-ethics.jpg",
    },
    {
      number: "04",
      title: "Generative AI Revolution: From Text to Images",
      description: "Exploring the latest developments in generative AI and their impact on creative industries.",
      duration: "41:22",
      date: "February 28, 2024",
      plays: "2.3k",
      image: "/podcast-episode-generative-ai.jpg",
    },
    {
      number: "05",
      title: "AI Startups: Building the Next Generation",
      description: "Insights from founders who are creating innovative AI-powered products and services.",
      duration: "47:55",
      date: "February 21, 2024",
      plays: "1.8k",
      image: "/podcast-episode-ai-startups.jpg",
    },
    {
      number: "06",
      title: "Natural Language Processing: Understanding Human Language",
      description: "How NLP is transforming the way we interact with technology and process information.",
      duration: "43:18",
      date: "February 14, 2024",
      plays: "1.7k",
      image: "/podcast-episode-nlp.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="bg-light py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Hero Section */}
          <div className="bg-background rounded-2xl p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src="/vintage-microphone-podcast-cover-art.jpg"
                      alt="Tech Pulse Podcast"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">PODCAST SERIES</p>
                    <h1 className="text-3xl font-bold">Tech Pulse</h1>
                    <p className="text-sm text-muted-foreground mt-1">AI & Technology Insights</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Join us every week as we explore the latest developments in artificial intelligence, machine learning,
                  and emerging technologies with industry experts and thought leaders.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base rounded-full">
                  <Play className="w-5 h-5 mr-2" />
                  Play Latest Episode
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/podcast-studio-setup-with-microphones.jpg"
                  alt="Podcast Studio"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">All Episodes</h2>
            <p className="text-muted-foreground">Listen to our latest conversations about AI and technology.</p>
          </div>

          <div className="space-y-6">
            {episodes.map((episode) => (
              <article
                key={episode.number}
                className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all group"
              >
                <div className="grid md:grid-cols-[200px_1fr] gap-6">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <Image
                      src={episode.image || "/placeholder.svg?height=200&width=200"}
                      alt={episode.title}
                      fill
                      className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl font-bold text-accent">#{episode.number}</span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{episode.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{episode.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          <span>{episode.plays}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-accent transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{episode.description}</p>
                    <Button
                      variant="outline"
                      className="w-fit border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Listen Now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
