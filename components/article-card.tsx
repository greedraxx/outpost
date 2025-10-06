import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  tags: string[]
}

export function ArticleCard({ title, excerpt, category, date, image, tags }: ArticleCardProps) {
  return (
    <article className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-accent/50 transition-colors group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{excerpt}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-muted text-muted-foreground hover:bg-muted text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}
