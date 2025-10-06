"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Mic, Users, TrendingUp, Eye, Heart, MessageSquare, MoreVertical, LogOut, Plus, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
      } else {
        setUserEmail(user.email || "")
        setIsLoading(false)
      }
    }
    
    checkUser()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const [articles, setArticles] = useState<any[]>([])
  const [podcasts, setPodcasts] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      
      // Articles 가져오기
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (articlesData) setArticles(articlesData)

      // Podcasts 가져오기
      const { data: podcastsData } = await supabase
        .from('podcasts')
        .select('*')
        .order('episode_number', { ascending: false })
        .limit(3)
      
      if (podcastsData) setPodcasts(podcastsData)
    }

    if (!isLoading) {
      loadData()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: "Total Articles", value: articles.length.toString(), icon: FileText, change: "Recent" },
    { label: "Podcast Episodes", value: podcasts.length.toString(), icon: Mic, change: "Episodes" },
    { label: "Total Readers", value: "24.5K", icon: Users, change: "+2.3K this month" },
    { label: "Engagement Rate", value: "68%", icon: TrendingUp, change: "+5% this month" },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return
    }

    try {
      const supabase = createClient()
      await supabase.from('articles').delete().eq('id', id)
      
      // Reload articles
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (articlesData) setArticles(articlesData)
    } catch (err) {
      console.error('Failed to delete article:', err)
    }
  }

  const handleDeletePodcast = async (id: string) => {
    if (!confirm("Are you sure you want to delete this podcast?")) {
      return
    }

    try {
      const supabase = createClient()
      await supabase.from('podcasts').delete().eq('id', id)
      
      // Reload podcasts
      const { data: podcastsData } = await supabase
        .from('podcasts')
        .select('*')
        .order('episode_number', { ascending: false })
        .limit(3)
      
      if (podcastsData) setPodcasts(podcastsData)
    } catch (err) {
      console.error('Failed to delete podcast:', err)
    }
  }

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="bg-light py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Manage your blog content and monitor performance
                {userEmail && <span className="ml-2">• {userEmail}</span>}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/admin/articles/new")}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                New Article
              </Button>
              <Button 
                onClick={() => router.push("/admin/podcasts/new")}
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <Mic className="w-4 h-4 mr-2" />
                New Episode
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-muted-foreground/20 text-muted-foreground hover:bg-red-500 hover:text-white hover:border-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 border-border/50 hover:border-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-accent">{stat.change}</div>
              </Card>
            ))}
          </div>

          {/* Recent Articles */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Recent Articles</h2>
              <Button variant="ghost" className="text-accent hover:text-accent/80">
                View All
              </Button>
            </div>
            <Card className="border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Engagement</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          No articles yet. Click "New Article" to create one.
                        </td>
                      </tr>
                    ) : (
                      articles.map((article) => (
                        <tr key={article.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-sm max-w-[300px] text-balance">{article.title}</div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              className={
                                article.status === "published"
                                  ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                                  : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10"
                              }
                            >
                              {article.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{article.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                <span>{article.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>0</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(article.created_at)}
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/admin/articles/${article.id}/edit`)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteArticle(article.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Recent Podcasts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Recent Podcast Episodes</h2>
              <Button variant="ghost" className="text-accent hover:text-accent/80">
                View All
              </Button>
            </div>
            <Card className="border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Episode</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Plays</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Duration</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {podcasts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No podcasts yet. Click "New Episode" to create one.
                        </td>
                      </tr>
                    ) : (
                      podcasts.map((podcast) => (
                        <tr key={podcast.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-accent">#{String(podcast.episode_number).padStart(2, '0')}</span>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-sm max-w-[300px] text-balance">{podcast.title}</div>
                          </td>
                          <td className="p-4">
                            <Badge
                              className={
                                podcast.status === "published"
                                  ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                                  : podcast.status === "scheduled"
                                  ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/10"
                                  : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10"
                              }
                            >
                              {podcast.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{podcast.plays}</td>
                          <td className="p-4 text-sm text-muted-foreground">{podcast.duration}</td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(podcast.created_at)}
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/admin/podcasts/${podcast.id}/edit`)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeletePodcast(podcast.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
