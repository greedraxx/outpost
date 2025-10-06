"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { createPodcast, durationToSeconds } from "@/lib/supabase-queries"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewPodcastPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    episode_number: "",
    title: "",
    description: "",
    audio_url: "",
    cover_image: "",
    duration: "",
    status: "draft" as "draft" | "published",
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
      } else {
        setIsCheckingAuth(false)
      }
    }
    
    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
        return
      }

      const durationSeconds = durationToSeconds(formData.duration)

      await createPodcast({
        episode_number: parseInt(formData.episode_number),
        title: formData.title,
        description: formData.description,
        audio_url: formData.audio_url || undefined,
        cover_image: formData.cover_image || undefined,
        duration: formData.duration,
        duration_seconds: durationSeconds,
        status: formData.status,
        published_at: formData.status === "published" ? new Date().toISOString() : undefined,
      })

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to create podcast")
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <main className="bg-background py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" className="border-border hover:border-accent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-[42px] font-bold text-foreground">New Podcast Episode</h1>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
              <p className="text-[14px] text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-8 border-border/20">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-2">
                      Episode Number *
                    </label>
                    <Input
                      type="number"
                      value={formData.episode_number}
                      onChange={(e) => handleChange("episode_number", e.target.value)}
                      placeholder="1"
                      required
                      min="1"
                      className="h-12 text-[15px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-2">
                      Duration * (MM:SS or HH:MM:SS)
                    </label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="45:32"
                      required
                      pattern="([0-9]{1,2}:)?[0-9]{1,2}:[0-9]{2}"
                      className="h-12 text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter episode title"
                    required
                    className="h-12 text-[15px]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Brief description of the episode"
                    required
                    rows={5}
                    className="text-[15px]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Audio URL (optional)
                  </label>
                  <Input
                    value={formData.audio_url}
                    onChange={(e) => handleChange("audio_url", e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    type="url"
                    className="h-12 text-[15px]"
                  />
                  <p className="text-[12px] text-muted-foreground mt-1">
                    Upload audio to Supabase Storage and paste the URL here
                  </p>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Cover Image URL (optional)
                  </label>
                  <Input
                    value={formData.cover_image}
                    onChange={(e) => handleChange("cover_image", e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    type="url"
                    className="h-12 text-[15px]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Status *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={formData.status === "draft"}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="text-[14px]">Draft</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={formData.status === "published"}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="text-[14px]">Publish Now</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90 text-white px-8 h-12"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {formData.status === "published" ? "Publish" : "Save Draft"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}

