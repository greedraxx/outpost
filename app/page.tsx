import { BlogHeader } from "@/components/blog-header"
import { FeaturedArticle } from "@/components/featured-article"
import { PodcastSection } from "@/components/podcast-section"
import { SpotlightSection } from "@/components/spotlight-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { MustSeeSection } from "@/components/must-see-section"
import { BlogFooter } from "@/components/blog-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <FeaturedArticle />
      <PodcastSection />
      <SpotlightSection />
      <NewsletterSection />
      <MustSeeSection />
      <BlogFooter />
    </div>
  )
}
