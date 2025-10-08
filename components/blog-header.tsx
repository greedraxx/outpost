import Link from "next/link"
import Image from "next/image"
import { Settings } from "lucide-react"

export function BlogHeader() {
  const categories = [
    { name: "Home", href: "/" },
    { name: "Article", href: "/article" },
    { name: "Podcast", href: "/podcast" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="bg-background border-b border-border/20">
      <div className="max-w-[1200px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-12">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-medium">OUT POST BLOG.</p>
          <div className="flex items-center gap-10">
            <nav className="flex items-center gap-10">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-[13px] text-foreground hover:text-accent transition-colors font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <Link
              href="/admin"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Admin Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="flex items-end gap-8">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="OUT POST"
              width={300}
              height={60}
              priority
              className="h-auto w-auto max-h-[100px]"
            />
          </Link>
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
