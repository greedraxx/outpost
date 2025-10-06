import Image from "next/image"

interface Article {
  id: string
  title: string
  excerpt: string
  tags: string[]
  featured_image?: string
}

interface MustSeeSectionProps {
  articles: Article[]
}

export function MustSeeSection({ articles: allArticles }: MustSeeSectionProps) {
  const articles = allArticles.slice(3, 6).map(article => ({
    image: article.featured_image || "/red-theater-curtains-stage.jpg",
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
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[56px] font-bold text-foreground leading-tight">Must-See Moments</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[320px] rounded-none overflow-hidden mb-4 border border-border/10">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-[18px] font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-foreground/70 text-[14px] leading-relaxed mb-4">{article.excerpt}</p>
              <a href="#" className="text-[13px] text-foreground/80 hover:text-accent transition-colors font-medium inline-flex items-center gap-1">
                Read more 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
