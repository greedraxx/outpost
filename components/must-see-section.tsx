import Image from "next/image"
import Link from "next/link"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  tags: string[]
  featured_image?: string
}

interface MustSeeSectionProps {
  articles: Article[]
}

export function MustSeeSection({ articles: allArticles }: MustSeeSectionProps) {
  const articles = allArticles.slice(0, 6).map(article => ({
    slug: article.slug,
    image: article.featured_image || "/red-theater-curtains-stage.jpg",
    tags: article.tags.slice(0, 3),
    title: article.title,
    excerpt: article.excerpt,
  }))

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[42px] font-bold text-card-foreground leading-tight">Latest Articles</h2>
          <Link href="/article" className="text-[14px] text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link key={index} href={`/article/${article.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative h-[240px] rounded-none overflow-hidden mb-3 border border-border/10">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[11px] text-white bg-black/60 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 backdrop-blur-sm">
                      Read more 
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-foreground text-background text-[10px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[16px] font-bold text-card-foreground mb-2 leading-tight group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-card-foreground/70 text-[13px] leading-relaxed line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
