import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Mic, Users, TrendingUp, Eye, Heart, MessageSquare, MoreVertical } from "lucide-react"

export default function AdminPage() {
  const stats = [
    { label: "Total Articles", value: "156", icon: FileText, change: "+12 this month" },
    { label: "Podcast Episodes", value: "48", icon: Mic, change: "+4 this month" },
    { label: "Total Readers", value: "24.5K", icon: Users, change: "+2.3K this month" },
    { label: "Engagement Rate", value: "68%", icon: TrendingUp, change: "+5% this month" },
  ]

  const recentArticles = [
    {
      title: "The Future of Large Language Models",
      category: "AI Research",
      status: "Published",
      views: "2.5K",
      likes: "342",
      comments: "28",
      date: "March 20, 2024",
    },
    {
      title: "Deep Learning Architectures Explained",
      category: "Machine Learning",
      status: "Published",
      views: "1.8K",
      likes: "256",
      comments: "19",
      date: "March 18, 2024",
    },
    {
      title: "Creating Art with AI: A New Era",
      category: "Generative AI",
      status: "Draft",
      views: "-",
      likes: "-",
      comments: "-",
      date: "March 22, 2024",
    },
    {
      title: "AI Regulation: What You Need to Know",
      category: "Ethics & Policy",
      status: "Published",
      views: "3.1K",
      likes: "428",
      comments: "45",
      date: "March 12, 2024",
    },
  ]

  const recentPodcasts = [
    {
      title: "The Future of AI: Conversations with Leading Researchers",
      episode: "01",
      status: "Published",
      plays: "2.5K",
      duration: "45:32",
      date: "March 20, 2024",
    },
    {
      title: "Machine Learning in Practice: Real-World Applications",
      episode: "02",
      status: "Published",
      plays: "2.1K",
      duration: "38:15",
      date: "March 13, 2024",
    },
    {
      title: "Ethics in AI: Building Responsible Technology",
      episode: "03",
      status: "Scheduled",
      plays: "-",
      duration: "52:08",
      date: "March 27, 2024",
    },
  ]

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="bg-light py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground text-lg">Manage your blog content and monitor performance</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                New Article
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-white">
                <Mic className="w-4 h-4 mr-2" />
                New Episode
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
                    {recentArticles.map((article, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
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
                              article.status === "Published"
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
                              <span>{article.comments}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{article.date}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
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
                    {recentPodcasts.map((podcast, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-accent">#{podcast.episode}</span>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-sm max-w-[300px] text-balance">{podcast.title}</div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              podcast.status === "Published"
                                ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                                : "bg-blue-500/10 text-blue-600 hover:bg-blue-500/10"
                            }
                          >
                            {podcast.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{podcast.plays}</td>
                        <td className="p-4 text-sm text-muted-foreground">{podcast.duration}</td>
                        <td className="p-4 text-sm text-muted-foreground">{podcast.date}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
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
