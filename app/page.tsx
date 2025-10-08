import { BlogHeader } from "@/components/blog-header"
import { FeaturedArticle } from "@/components/featured-article"
import { PodcastSection } from "@/components/podcast-section"
import { SpotlightSection } from "@/components/spotlight-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { MustSeeSection } from "@/components/must-see-section"
import { BlogFooter } from "@/components/blog-footer"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export const revalidate = 0 // 캐싱 비활성화 (테스트용)
export const dynamic = 'force-dynamic' // 항상 동적 렌더링

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()
  
  // Published articles만 가져오기
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(10)

  // Published podcasts만 가져오기
  const { data: podcasts, error: podcastsError } = await supabase
    .from('podcasts')
    .select('*')
    .eq('status', 'published')
    .order('episode_number', { ascending: false })
    .limit(5)

  console.log('Articles:', articles?.length, 'Podcasts:', podcasts?.length)
  if (articlesError) console.error('Articles error:', articlesError)
  if (podcastsError) console.error('Podcasts error:', podcastsError)

  return (
    <div className="min-h-screen">
      <BlogHeader />
      <FeaturedArticle articles={articles || []} />
      <SpotlightSection articles={articles || []} />
      <MustSeeSection articles={articles || []} />
      <PodcastSection podcasts={podcasts || []} />
      <NewsletterSection />
      <BlogFooter />
    </div>
  )
}
