import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { ArticleCard } from "@/components/article-card"

export default function ArticlePage() {
  const articles = [
    {
      category: "AI Research",
      title: "The Future of Large Language Models",
      excerpt: "Exploring the next generation of AI models and their potential impact on various industries.",
      image: "/futuristic-ai-interface-with-multiple-data-streams.jpg",
      date: "March 20, 2024",
      tags: ["AI", "Research", "LLM"],
    },
    {
      category: "Machine Learning",
      title: "Deep Learning Architectures Explained",
      excerpt: "A comprehensive guide to understanding modern neural network architectures and their applications.",
      image: "/abstract-neural-network-visualization-with-glowing.jpg",
      date: "March 18, 2024",
      tags: ["ML", "Deep Learning", "Tutorial"],
    },
    {
      category: "Generative AI",
      title: "Creating Art with AI: A New Era",
      excerpt: "How generative AI is transforming the creative industry and empowering artists worldwide.",
      image: "/digital-art-created-by-ai-showing-vibrant-colors.jpg",
      date: "March 15, 2024",
      tags: ["Generative AI", "Art", "Creativity"],
    },
    {
      category: "Ethics & Policy",
      title: "AI Regulation: What You Need to Know",
      excerpt: "Understanding the latest developments in AI governance and their implications for developers.",
      image: "/modern-government-building-representing-ai-policy.jpg",
      date: "March 12, 2024",
      tags: ["Ethics", "Policy", "Regulation"],
    },
    {
      category: "Industry Trends",
      title: "AI in Healthcare: Transforming Patient Care",
      excerpt: "Discover how artificial intelligence is revolutionizing medical diagnosis and treatment.",
      image: "/medical-technology-with-ai-interface.jpg",
      date: "March 10, 2024",
      tags: ["Healthcare", "Industry", "Innovation"],
    },
    {
      category: "Coding/Tutorials",
      title: "Building Your First AI Agent",
      excerpt: "Step-by-step guide to creating an intelligent agent using modern AI frameworks.",
      image: "/code-editor-with-ai-assistant-integration.jpg",
      date: "March 8, 2024",
      tags: ["Tutorial", "Coding", "AI Agent"],
    },
  ]

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="bg-light py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">All Articles</h2>
            <p className="text-muted-foreground text-lg">
              Explore our latest insights on AI technology, machine learning, and the future of tech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
