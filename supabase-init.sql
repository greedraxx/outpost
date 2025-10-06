-- OUT POST Blog Database Schema
-- Supabase SQL Editor에서 실행하세요

-- 1. Articles 테이블 생성
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Admin',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5, -- 분 단위
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Podcasts 테이블 생성
CREATE TABLE IF NOT EXISTS podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  episode_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  audio_url TEXT,
  cover_image TEXT,
  duration TEXT NOT NULL, -- "45:32" 형식
  duration_seconds INTEGER, -- 검색/정렬용
  plays INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Comments 테이블 생성 (Article용)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Article Likes 테이블 (중복 방지)
CREATE TABLE IF NOT EXISTS article_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);

-- 5. Podcast Plays 테이블 (통계용)
CREATE TABLE IF NOT EXISTS podcast_plays (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  podcast_id UUID REFERENCES podcasts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  duration_played INTEGER, -- 재생한 시간 (초)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_podcasts_episode_number ON podcasts(episode_number);
CREATE INDEX IF NOT EXISTS idx_podcasts_status ON podcasts(status);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);

-- 7. Updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger 생성
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcasts_updated_at
  BEFORE UPDATE ON podcasts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Row Level Security (RLS) 활성화
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_plays ENABLE ROW LEVEL SECURITY;

-- 10. RLS 정책 생성

-- Articles: 모든 사람이 published 글 읽기 가능
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (status = 'published');

-- Articles: 인증된 사용자만 모든 글 보기 (Admin용)
CREATE POLICY "Authenticated users can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

-- Articles: 인증된 사용자만 생성/수정/삭제
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Podcasts: 모든 사람이 published 팟캐스트 읽기 가능
CREATE POLICY "Anyone can view published podcasts"
  ON podcasts FOR SELECT
  USING (status = 'published');

-- Podcasts: 인증된 사용자만 모든 팟캐스트 보기
CREATE POLICY "Authenticated users can view all podcasts"
  ON podcasts FOR SELECT
  TO authenticated
  USING (true);

-- Podcasts: 인증된 사용자만 생성/수정/삭제
CREATE POLICY "Authenticated users can manage podcasts"
  ON podcasts FOR ALL
  TO authenticated
  USING (true);

-- Comments: 모든 사람이 approved 댓글 읽기
CREATE POLICY "Anyone can view approved comments"
  ON comments FOR SELECT
  USING (status = 'approved');

-- Comments: 인증된 사용자는 모든 댓글 관리
CREATE POLICY "Authenticated users can manage comments"
  ON comments FOR ALL
  TO authenticated
  USING (true);

-- 11. 샘플 데이터 삽입 (테스트용)
INSERT INTO articles (title, slug, excerpt, content, category, tags, status, published_at, views, likes, read_time)
VALUES 
  (
    'The Future of AI Agents: Transforming Technology',
    'future-of-ai-agents',
    'AI agents are revolutionizing how we interact with technology. Discover the latest trends and what the future holds.',
    '# The Future of AI Agents

AI agents are becoming increasingly sophisticated, capable of handling complex tasks autonomously. From customer service to data analysis, these intelligent systems are transforming industries.

## Key Developments

1. **Autonomous Decision Making**: Modern AI agents can make decisions without human intervention
2. **Natural Language Understanding**: Better comprehension of context and nuance
3. **Multi-modal Capabilities**: Processing text, images, and audio simultaneously

The future looks promising as we continue to develop more capable and reliable AI systems.',
    'AI',
    ARRAY['AI', 'Technology', 'Future'],
    'published',
    NOW() - INTERVAL '2 days',
    2500,
    342,
    8
  ),
  (
    'Building Efficient Tech Stacks in 2025',
    'building-efficient-tech-stacks-2025',
    'Learn how to build modern, efficient tech stacks that scale with your business needs.',
    '# Building Efficient Tech Stacks

Choosing the right technology stack is crucial for success. Here''s what you need to know in 2025.

## Modern Stack Components

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Supabase, PostgreSQL
- **Deployment**: Vercel, AWS, Cloudflare

Building with these tools ensures scalability and developer productivity.',
    'Technology',
    ARRAY['Tech Stack', 'Development', 'Best Practices'],
    'published',
    NOW() - INTERVAL '5 days',
    1800,
    256,
    6
  ),
  (
    'Introduction to AI Agents: A Comprehensive Guide',
    'introduction-to-ai-agents',
    'A beginner-friendly guide to understanding AI agents and their applications.',
    '# Introduction to AI Agents

AI agents are software entities that can perceive their environment and take actions to achieve specific goals.

## What Makes an AI Agent?

- Autonomy
- Reactivity
- Pro-activeness
- Social ability

This comprehensive guide will help you understand the fundamentals.',
    'AI',
    ARRAY['AI', 'Agents', 'Tutorial'],
    'published',
    NOW() - INTERVAL '7 days',
    3100,
    428,
    12
  );

INSERT INTO podcasts (episode_number, title, description, duration, duration_seconds, status, published_at, plays)
VALUES
  (
    1,
    'The Future of AI: Conversations with Leading Researchers',
    'Join us as we discuss the cutting-edge developments in AI with top researchers from around the world.',
    '45:32',
    2732,
    'published',
    NOW() - INTERVAL '3 days',
    2500
  ),
  (
    2,
    'Machine Learning in Practice: Real-World Applications',
    'Explore how machine learning is being applied to solve real-world problems across various industries.',
    '38:15',
    2295,
    'published',
    NOW() - INTERVAL '10 days',
    2100
  ),
  (
    3,
    'AI Agents: The Next Evolution in Technology',
    'Discover how AI agents are transforming the way we interact with technology and what the future holds.',
    '42:48',
    2568,
    'published',
    NOW() - INTERVAL '17 days',
    1850
  ),
  (
    4,
    'Ethics in AI: Building Responsible Technology',
    'A deep dive into the ethical considerations when developing AI systems.',
    '52:08',
    3128,
    'scheduled',
    NOW() + INTERVAL '7 days',
    0
  ),
  (
    5,
    'Tech Trends 2025: What to Expect',
    'An overview of the biggest technology trends we expect to see in 2025.',
    '36:22',
    2182,
    'published',
    NOW() - INTERVAL '24 days',
    1650
  );

-- 12. View 생성 (자주 사용하는 쿼리 최적화)
CREATE OR REPLACE VIEW published_articles_with_stats AS
SELECT 
  a.id,
  a.title,
  a.slug,
  a.excerpt,
  a.category,
  a.tags,
  a.featured_image,
  a.author_name,
  a.views,
  a.likes,
  a.read_time,
  a.published_at,
  a.created_at,
  COUNT(DISTINCT c.id) as comment_count
FROM articles a
LEFT JOIN comments c ON a.id = c.article_id AND c.status = 'approved'
WHERE a.status = 'published'
GROUP BY a.id
ORDER BY a.published_at DESC;

CREATE OR REPLACE VIEW published_podcasts_with_stats AS
SELECT 
  p.id,
  p.episode_number,
  p.title,
  p.description,
  p.audio_url,
  p.cover_image,
  p.duration,
  p.plays,
  p.published_at,
  p.created_at
FROM podcasts p
WHERE p.status = 'published'
ORDER BY p.episode_number DESC;

-- 완료!
-- 이제 Supabase에서 Storage를 설정하여 이미지/오디오 파일을 업로드할 수 있습니다.

