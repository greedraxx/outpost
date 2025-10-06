import Image from "next/image"

export function FeaturedArticle() {
  return (
    <section className="bg-background py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="bg-card rounded-none overflow-hidden grid md:grid-cols-[1fr_1.2fr] gap-0 border border-border/10">
          <div className="p-10 flex flex-col justify-between bg-[#f5f5f5]">
            <div>
              <p className="text-[11px] text-card-foreground/50 uppercase tracking-[0.15em] mb-6 font-medium">
                November 11, 2024
              </p>
              <h2 className="text-[32px] font-bold mb-4 text-card-foreground leading-tight">
                The Timeless Allure of Film Photography
              </h2>
              <p className="text-[13px] text-card-foreground/60 mb-1 font-medium">8 min read</p>
              <p className="text-[14px] text-card-foreground/70 leading-relaxed mb-8">
                In the digital age, where cameras are in everyone's pocket, the resurgence of film photography might seem surprising. Yet, it has evolved from a medium of necessity to a cherished art form. What makes film photography so enduringly relevant in a world dominated by pixels?
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-full bg-card-foreground/90 text-card text-[11px] font-medium">
                Trends
              </span>
              <span className="px-3 py-1.5 rounded-full bg-card-foreground/90 text-card text-[11px] font-medium">
                Photography
              </span>
              <span className="px-3 py-1.5 rounded-full bg-card-foreground/90 text-card text-[11px] font-medium">
                Film
              </span>
            </div>
          </div>
          <div className="relative h-[450px] md:h-auto">
            <Image 
              src="/black-and-white-tree-landscape-film-photography.jpg" 
              alt="Film photography" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
