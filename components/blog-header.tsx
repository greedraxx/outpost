import Link from "next/link"

export function BlogHeader() {
  const categories = ["Latest", "Article", "Podcast", "Admin"]

  return (
    <header className="bg-background">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">OUT POST BLOG</p>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={category === "Latest" ? "/" : `/${category.toLowerCase()}`}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-accent text-white hover:bg-accent/90 flex items-center justify-center transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-accent text-white hover:bg-accent/90 flex items-center justify-center transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l6 6m0-6l-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h1 className="text-[80px] leading-none font-bold tracking-tight">OUT POST</h1>
          <p className="text-sm text-muted-foreground max-w-[140px] leading-tight">Blog about Ai, Tech.</p>
        </div>
      </div>
    </header>
  )
}
