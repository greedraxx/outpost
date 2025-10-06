import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function PodcastSection() {
  const episodes = [
    { number: "01", title: "Art in the City: How Modern Sculpture...", plays: "1.5k" },
    { number: "02", title: "Is Film Photography Really Making a...", plays: "1.2k" },
    { number: "03", title: "Behind the Scenes of Galleries: How...", plays: "942" },
    { number: "04", title: "Culture Online: Can Digital Spaces t...", plays: "1.1k" },
    { number: "05", title: "Music as Therapy: How Sound Influe...", plays: "1.3k" },
  ]

  return (
    <section className="bg-card py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/vintage-microphone-podcast-cover-art.jpg"
                  alt="The Creative Pulse"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <p className="text-xs text-card-foreground/60 uppercase tracking-wider mb-1">PODCAST</p>
                <h3 className="text-xl font-bold text-card-foreground">The Creative Pulse</h3>
              </div>
            </div>
            <div className="space-y-3">
              {episodes.map((episode) => (
                <div key={episode.number} className="flex items-center gap-4 text-sm">
                  <span className="font-bold text-card-foreground">#{episode.number}</span>
                  <span className="flex-1 text-card-foreground/70">{episode.title}</span>
                  <div className="flex items-center gap-2 text-card-foreground/60">
                    <Play className="w-3 h-3" />
                    <span className="text-xs">{episode.plays}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold text-card-foreground mb-8 text-balance leading-tight">
              Have You Heard Our Podcast Yet?
            </h2>
            <Button className="bg-accent hover:bg-accent/90 text-white px-12 py-6 text-lg rounded-full">
              Playlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
