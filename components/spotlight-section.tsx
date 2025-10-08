import Image from "next/image"
import Link from "next/link"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  featured_image?: string
  published_at?: string
}

interface SpotlightSectionProps {
  articles: Article[]
}

export function SpotlightSection({ articles: allArticles }: SpotlightSectionProps) {
  const articles = allArticles.slice(1, 3).map(article => ({
    slug: article.slug,
    image: article.featured_image || "/black-and-white-artist.png",
    date: article.published_at 
      ? new Date(article.published_at).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })
      : 'Recently',
    category: article.category,
    tags: article.tags.slice(0, 3),
    title: article.title,
    excerpt: article.excerpt,
  }))

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="bg-background py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-start justify-between mb-12">
          <h2 className="text-[56px] font-bold text-foreground leading-[1.15]">
            Spotlight
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Link key={index} href={`/article/${article.slug}`}>
              <div className="group cursor-pointer bg-card border border-border/10 rounded-none overflow-hidden hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-[280px] overflow-hidden flex-shrink-0">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-card-foreground/90 text-card text-[10px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-card-foreground/50 uppercase tracking-[0.15em] mb-2 font-medium">
                    {article.date}
                  </p>
                  <h3 className="text-[18px] font-bold text-card-foreground mb-2 leading-tight group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-card-foreground/70 text-[13px] leading-relaxed line-clamp-3">{article.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
