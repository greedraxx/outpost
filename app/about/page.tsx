import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />
      <main className="bg-background py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-[72px] font-bold text-foreground mb-8 leading-tight">About OUT POST</h1>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-[16px] text-foreground/80 leading-relaxed">
                OUT POST는 AI, 기술, 그리고 에이전트에 관한 최신 정보와 인사이트를 제공하는 블로그입니다.
                우리는 빠르게 변화하는 기술 트렌드를 탐구하고, 실용적인 지식을 공유합니다.
              </p>
              <p className="text-[16px] text-foreground/80 leading-relaxed">
                인공지능의 발전과 함께 세상이 어떻게 변화하고 있는지, 그리고 우리가 어떻게 이러한 
                변화에 적응하고 활용할 수 있는지에 대한 이야기를 전합니다.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#e8e8e8] p-8 rounded-sm border border-border/10">
                <h3 className="text-[24px] font-bold text-card-foreground mb-4">Our Mission</h3>
                <p className="text-[14px] text-card-foreground/70 leading-relaxed">
                  복잡한 기술을 쉽게 이해할 수 있도록 전달하고, AI와 기술의 발전이 
                  우리 삶에 미치는 영향을 탐구합니다.
                </p>
              </div>
              <div className="bg-[#e8e8e8] p-8 rounded-sm border border-border/10">
                <h3 className="text-[24px] font-bold text-card-foreground mb-4">What We Cover</h3>
                <ul className="space-y-2 text-[14px] text-card-foreground/70">
                  <li>• AI & Machine Learning</li>
                  <li>• Tech Trends & Innovation</li>
                  <li>• AI Agents & Automation</li>
                  <li>• Future of Technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}

