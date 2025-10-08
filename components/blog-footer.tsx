import Link from "next/link"

export function BlogFooter() {
  const categories = ["About", "Latest", "Article", "Podcast", "Admin"]

  return (
    <footer className="bg-background border-t border-border/20 mt-10">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-[36px] font-bold mb-2 leading-none text-foreground">OUT POST</h3>
            <p className="text-[12px] text-muted-foreground max-w-[220px] leading-relaxed">
              Blog about ai, tech, agent.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="w-9 h-9 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all duration-300"
              aria-label="Twitter"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button 
              className="w-9 h-9 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 text-[13px] mb-5 pb-5 border-b border-border/20">
          <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors font-medium">
            Terms & Conditions
          </Link>
          <Link href="/policy" className="text-muted-foreground hover:text-accent transition-colors font-medium">
            Cookie & Policy
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={category === "Latest" ? "/" : `/${category.toLowerCase()}`}
              className="text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="text-[13px] text-muted-foreground text-center">
          All rights reserved. © 2025 OUT POST
        </div>
      </div>
    </footer>
  )
}
