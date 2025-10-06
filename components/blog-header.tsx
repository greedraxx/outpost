import Link from "next/link"

export function BlogHeader() {
  const categories = ["About", "Latest", "Article", "Podcast", "Admin"]

  return (
    <header className="bg-background border-b border-border/20">
      <div className="max-w-[1200px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-12">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-medium">OUT POST BLOG.</p>
          <div className="flex items-center gap-10">
            <nav className="flex items-center gap-10">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={category === "Latest" ? "/" : `/${category.toLowerCase()}`}
                  className="text-[13px] text-foreground hover:text-accent transition-colors font-medium"
                >
                  {category}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button 
                className="w-9 h-9 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all duration-300"
                aria-label="SoundCloud"
              >
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
                </svg>
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all duration-300"
                aria-label="Spotify"
              >
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-.2.3-.5.4-.8.4-.2 0-.3 0-.5-.1-2.5-1.5-5.5-1.8-9.1-1-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4-.9 7.3-.5 10.1 1.2.4.2.5.7.3 1.1zm1.1-2.7c-.2.4-.7.5-1.1.3-2.8-1.7-7.1-2.2-10.4-1.2-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 3.8-1.1 8.6-.6 11.8 1.4.4.2.5.8.2 1.2zm.1-2.8C13.3 9 7.7 8.8 4.5 9.8c-.6.2-1.2-.2-1.4-.8-.2-.6.2-1.2.8-1.4 3.7-1.1 10-1 14.8 1.4.5.3.7 1 .4 1.5-.3.5-1 .7-1.4.3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-8">
          <h1 className="text-[120px] leading-[0.85] font-bold tracking-tight text-foreground">
            OUT POST
          </h1>
          <div className="pb-3">
            <p className="text-[15px] text-muted-foreground leading-snug font-light">
              <span className="font-semibold text-foreground">Blog about</span>
              <br />
              ai
              <br />
              tech
              <br />
              agent.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
