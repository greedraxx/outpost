import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  date: string
  image?: string
  tags: string[]
}

export function ArticleCard({ title, excerpt, category, date, image, tags }: ArticleCardProps) {
  const hasImage = image && image.trim() !== ''
  
  return (
    <article className="bg-[#e8e8e8] rounded-none overflow-hidden border border-border/10 hover:border-accent/30 transition-all duration-300 group">
      {hasImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs bg-card-foreground/90 text-card">
            {category}
          </Badge>
          <span className="text-[11px] text-card-foreground/50 font-medium">{date}</span>
        </div>
        <h3 className="text-[18px] font-bold mb-2 leading-tight text-card-foreground group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-[14px] text-card-foreground/70 mb-4 leading-relaxed">{excerpt}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} className="bg-card-foreground/10 text-card-foreground hover:bg-card-foreground/20 text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}
