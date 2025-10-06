import Image from "next/image"

export function MustSeeSection() {
  const articles = [
    {
      image: "/red-theater-curtains-stage.jpg",
      tags: ["Exhibitions", "Recommendations", "Art"],
      title: "Unmissable Shows This Season: Our recommendations",
      excerpt:
        "Get ready for an unforgettable cultural experience with our handpicked list of shows you can't afford to miss this season.",
    },
    {
      image: "/black-and-white-architecture-geometric.jpg",
      tags: ["Architecture", "Hidden", "Art"],
      title: "Hidden Gems: Lesser-Known Exhibits Worth Exploring",
      excerpt:
        "Discover the beauty of art at its basest path with our guide to hidden gems that offer a world of exhibitions.",
    },
    {
      image: "/spiral-staircase-architecture-black-and-white.jpg",
      tags: ["Design", "Art", "Inspiration"],
      title: "Design Diaries: Where to Find Inspiration",
      excerpt:
        "From sculptural forms in urban spaces to architectural marvels and timeless art, discover where designers, artists turn for ideas.",
    },
  ]

  return (
    <section className="bg-card py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl font-bold text-card-foreground">Must-See Moments</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-card-foreground/20 hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-card-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-card-foreground/20 hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-card-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[280px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex gap-2 mb-3 flex-wrap">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-card-foreground text-card text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-card-foreground/70 text-sm leading-relaxed mb-3">{article.excerpt}</p>
              <a href="#" className="text-sm text-card-foreground hover:text-accent transition-colors">
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
