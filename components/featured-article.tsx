import Image from "next/image"

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  featured_image?: string
  read_time: number
  published_at?: string
}

interface FeaturedArticleProps {
  articles: Article[]
}

export function FeaturedArticle({ articles }: FeaturedArticleProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  const featuredArticle = articles[0]
  const publishedDate = featuredArticle.published_at 
    ? new Date(featuredArticle.published_at).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : 'Recently'

  const hasImage = featuredArticle.featured_image && featuredArticle.featured_image.trim() !== ''

  return (
    <section className="bg-background py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className={`bg-card rounded-none overflow-hidden grid ${hasImage ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-1'} gap-0 border border-border/10`}>
          <div className="p-10 flex flex-col justify-between bg-[#f5f5f5]">
            <div>
              <p className="text-[11px] text-card-foreground/50 uppercase tracking-[0.15em] mb-6 font-medium">
                {publishedDate}
              </p>
              <h2 className="text-[32px] font-bold mb-4 text-card-foreground leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-[13px] text-card-foreground/60 mb-1 font-medium">
                {featuredArticle.read_time} min read
              </p>
              <p className="text-[14px] text-card-foreground/70 leading-relaxed mb-8">
                {featuredArticle.excerpt}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {featuredArticle.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-card-foreground/90 text-card text-[11px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {hasImage && (
            <div className="relative h-[450px] md:h-auto bg-muted">
              <Image 
                src={featuredArticle.featured_image!} 
                alt={featuredArticle.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
