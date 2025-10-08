import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface Podcast {
  id: string
  episode_number: number
  title: string
  duration: string
}

interface PodcastSectionProps {
  podcasts: Podcast[]
}

export function PodcastSection({ podcasts }: PodcastSectionProps) {
  const episodes = podcasts.length > 0 
    ? podcasts.slice(0, 5).map(p => ({
        number: String(p.episode_number).padStart(2, '0'),
        title: p.title.length > 45 ? p.title.substring(0, 45) + '...' : p.title,
        duration: p.duration
      }))
    : [
        { number: "01", title: "No episodes yet. Create one in Admin!", duration: "0:00" }
      ]

  return (
    <section className="bg-background py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-center">
          <div className="bg-[#1a1a1a] p-8 rounded-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="relative w-[180px] h-[180px] rounded-sm overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src="/vintage-microphone-podcast-cover-art.jpg"
                  alt="The Creative Pulse"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-white/60 uppercase tracking-[0.15em] mb-2 font-medium">PODCAST</p>
                <h3 className="text-[18px] font-bold text-white leading-tight">The Creative Pulse</h3>
              </div>
            </div>
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.number} className="flex items-start gap-3 text-sm group cursor-pointer">
                  <span className="text-white/90 font-bold text-[13px] pt-0.5">#{episode.number}</span>
                  <span className="flex-1 text-white/80 text-[13px] leading-relaxed group-hover:text-accent transition-colors">
                    {episode.title}
                  </span>
                  <div className="flex items-center gap-2 text-white/50 flex-shrink-0">
                    <Play className="w-3 h-3 fill-white/50" />
                    <span className="text-[11px] font-medium">{episode.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-[56px] font-bold text-white leading-[1.1] mb-10">
              Have You
              <br />
              Heard Our
              <br />
              Podcast Yet?
            </h2>
            <button className="bg-accent hover:bg-accent/90 text-white px-16 py-4 text-[15px] font-semibold rounded-full transition-all duration-300 hover:shadow-lg">
              Playlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
