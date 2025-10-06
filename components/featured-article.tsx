import Image from "next/image"

export function FeaturedArticle() {
  return (
    <section className="bg-background pb-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="bg-card rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0">
          <div className="p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-card-foreground/60 uppercase tracking-wider">Photography</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-card-foreground text-balance">
              The Timeless Allure of Film Photography
            </h2>
            <p className="text-sm text-card-foreground/60 mb-2">March 15, 2024</p>
            <p className="text-card-foreground/70 mb-8 leading-relaxed">
              In the digital age, where cameras are in everyone's pocket, the resurgence of film photography is
              surprising. Yet, it has evolved from a medium of necessity to a cherished art form, enduringly relevant in
              a world dominated by pixels.
            </p>
            <div className="flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-card-foreground text-card text-xs font-medium">
                Lifestyle
              </span>
              <span className="px-4 py-1.5 rounded-full bg-card-foreground text-card text-xs font-medium">
                Photography
              </span>
              <span className="px-4 py-1.5 rounded-full bg-card-foreground text-card text-xs font-medium">Film</span>
            </div>
          </div>
          <div className="relative h-[400px] md:h-auto">
            <Image src="/black-and-white-tree-landscape-film-photography.jpg" alt="Film photography" fill className="object-cover grayscale" />
          </div>
        </div>
      </div>
    </section>
  )
}
