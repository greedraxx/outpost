"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { updateArticle, generateSlug, calculateReadTime } from "@/lib/supabase-queries"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoadingArticle, setIsLoadingArticle] = useState(true)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "AI",
    tags: "",
    featured_image: "",
    status: "draft" as "draft" | "published",
  })

  useEffect(() => {
    const checkAuthAndLoadArticle = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
        return
      }
      
      setIsCheckingAuth(false)

      // Load article
      const { data: article, error: loadError } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single()

      if (loadError || !article) {
        setError("Article not found")
        setIsLoadingArticle(false)
        return
      }

      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        tags: article.tags.join(", "),
        featured_image: article.featured_image || "",
        status: article.status,
      })
      setIsLoadingArticle(false)
    }
    
    checkAuthAndLoadArticle()
  }, [router, articleId])

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

      const slug = generateSlug(formData.title)
      const readTime = calculateReadTime(formData.content)
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)

      await updateArticle(articleId, {
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        featured_image: formData.featured_image || undefined,
        status: formData.status,
        read_time: readTime,
        published_at: formData.status === "published" ? new Date().toISOString() : undefined,
      })

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update article")
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return
    }

    try {
      const supabase = createClient()
      await supabase.from('articles').delete().eq('id', articleId)
      
      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to delete article")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isCheckingAuth || isLoadingArticle) {
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
              <h1 className="text-[42px] font-bold text-foreground">Edit Article</h1>
            </div>
            <Button
              onClick={handleDelete}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
              <p className="text-[14px] text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-8 border-border/20">
              <div className="space-y-6">
                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter article title"
                    required
                    className="h-12 text-[15px]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Excerpt *
                  </label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder="Brief description of the article"
                    required
                    rows={3}
                    className="text-[15px]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Content * (Markdown supported)
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Write your article content here..."
                    required
                    rows={15}
                    className="font-mono text-[14px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      required
                      className="w-full h-12 px-4 bg-background border border-border rounded-md text-[15px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="AI">AI</option>
                      <option value="Technology">Technology</option>
                      <option value="Agent">Agent</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="News">News</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-foreground mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={formData.tags}
                      onChange={(e) => handleChange("tags", e.target.value)}
                      placeholder="AI, Technology, Future"
                      className="h-12 text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Featured Image URL (optional)
                  </label>
                  <Input
                    value={formData.featured_image}
                    onChange={(e) => handleChange("featured_image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
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
                      <span className="text-[14px]">Published</span>
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
                    Save Changes
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

