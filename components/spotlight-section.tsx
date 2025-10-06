import Image from "next/image"

export function SpotlightSection() {
  const articles = [
    {
      image: "/black-and-white-artist.png",
      date: "September 10, 2024",
      category: "Music",
      tags: ["Music", "City", "Personality"],
      title: "Soundscapes of the City: An Interview with Leo Hart",
      excerpt:
        "Explore the world of sound artist Leo Hart, who transforms urban noise into captivating musical compositions.",
    },
    {
      image: "/painter-artist-studio-window.jpg",
      date: "November 7, 2024",
      category: "Interviews",
      tags: ["Personality", "Art", "Artist"],
      title: "Eva Martinez. The Visionary Behind the Canvas",
      excerpt:
        "Discover the creative journey of Eva Martinez, a self-taught painter whose bold use of color and texture redefines modern art.",
    },
  ]

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
