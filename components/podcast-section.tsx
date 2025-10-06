import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function PodcastSection() {
  const episodes = [
    { number: "01", title: "Art in the City: How Modern Sculptur...", duration: "0:54" },
    { number: "02", title: "Is Film Photography Really Making a...", duration: "1:02" },
    { number: "03", title: "Behind the Scenes of Galleries: How...", duration: "0:42" },
    { number: "04", title: "Culture Online: Can Digital Replace t...", duration: "0:42" },
    { number: "05", title: "Music as Therapy: How Sounds Influ...", duration: "0:56" },
  ]

  return (
    <section className="bg-[#e8e8e8] py-20">
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
            <h2 className="text-[56px] font-bold text-card-foreground leading-[1.1] mb-10">
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
