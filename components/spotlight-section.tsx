import Image from "next/image"

export function SpotlightSection() {
  const articles = [
    {
      image: "/black-and-white-artist.png",
      category: "Music",
      tags: ["Art", "Interview"],
      title: "Soundscapes of the City: An Interview with Leo Hart",
      excerpt:
        "Explore the world of sound artist Leo Hart, who transforms urban noise into captivating musical compositions.",
    },
    {
      image: "/painter-artist-studio-window.jpg",
      category: "Interviews",
      tags: ["Art", "Profile"],
      title: "Eva Martinez: The Visionary Behind the Canvas",
      excerpt:
        "Discover the creative journey of Eva Martinez, a self-taught painter whose bold use of color and texture redefines modern art.",
    },
  ]

  return (
    <section className="bg-card py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl font-bold text-card-foreground leading-tight">
            Spotlight
            <br />
            on
            <br />
            Artists
          </h2>
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

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[300px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-card-foreground text-card text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-card-foreground/60 uppercase tracking-wider mb-2">{article.category}</p>
              <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-card-foreground/70 text-sm leading-relaxed">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
