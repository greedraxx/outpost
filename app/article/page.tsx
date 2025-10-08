import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { ArticleCard } from "@/components/article-card"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all articles about AI, technology, and intelligent agents. Stay updated with the latest insights and trends.",
  openGraph: {
    title: "Articles | OUT POST",
    description: "Browse all articles about AI, technology, and intelligent agents.",
  },
}

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function ArticlePage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: articlesData } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const articles = (articlesData || []).map(article => ({
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    image: article.featured_image,
    date: article.published_at 
      ? new Date(article.published_at).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })
      : 'Recently',
    tags: article.tags,
  }))

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="bg-background py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-[56px] font-bold text-foreground mb-4">All Articles</h2>
            <p className="text-muted-foreground text-lg">
              Explore our latest insights on AI technology, machine learning, and the future of tech.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No articles yet. Create your first article in the Admin panel!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
