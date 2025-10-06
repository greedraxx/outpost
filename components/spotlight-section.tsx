import Image from "next/image"

interface Article {
  id: string
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
    <section className="bg-background py-20">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-start justify-between mb-12">
          <h2 className="text-[56px] font-bold text-foreground leading-[1.15]">
            Spotlight
            <br />
            on
            <br />
            Artists
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer bg-card border border-border/10 rounded-none overflow-hidden hover:border-accent/30 transition-all duration-300">
              <div className="relative h-[340px] overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 bg-[#f5f5f5]">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-card-foreground/90 text-card text-[11px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-card-foreground/50 uppercase tracking-[0.15em] mb-3 font-medium">
                  {article.date}
                </p>
                <h3 className="text-[22px] font-bold text-card-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-card-foreground/70 text-[14px] leading-relaxed">{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
