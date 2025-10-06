import { createClient } from './supabase'

// Article 타입 정의
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured_image?: string
  author_name: string
  status: 'draft' | 'published' | 'archived'
  views: number
  likes: number
  read_time: number
  published_at?: string
  created_at: string
  updated_at: string
}

// Podcast 타입 정의
export interface Podcast {
  id: string
  episode_number: number
  title: string
  description: string
  audio_url?: string
  cover_image?: string
  duration: string
  duration_seconds?: number
  plays: number
  status: 'draft' | 'published' | 'scheduled'
  published_at?: string
  scheduled_at?: string
  created_at: string
  updated_at: string
}

// ==================== ARTICLES ====================

// 모든 Article 가져오기 (Admin용)
export const getAllArticles = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

// Published Article만 가져오기 (Public용)
export const getPublishedArticles = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

// Slug로 Article 가져오기
export const getArticleBySlug = async (slug: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Article
}

// Article 생성
export const createArticle = async (article: Partial<Article>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select()
    .single()

  if (error) throw error
  return data as Article
}

// Article 업데이트
export const updateArticle = async (id: string, updates: Partial<Article>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

// Article 삭제
export const deleteArticle = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Article 조회수 증가
export const incrementArticleViews = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase.rpc('increment', {
    table_name: 'articles',
    row_id: id,
    column_name: 'views'
  })

  if (error) {
    // RPC가 없으면 수동으로 업데이트
    const { data: article } = await supabase
      .from('articles')
      .select('views')
      .eq('id', id)
      .single()
    
    if (article) {
      await supabase
        .from('articles')
        .update({ views: article.views + 1 })
        .eq('id', id)
    }
  }
}

// ==================== PODCASTS ====================

// 모든 Podcast 가져오기 (Admin용)
export const getAllPodcasts = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('episode_number', { ascending: false })

  if (error) throw error
  return data as Podcast[]
}

// Published Podcast만 가져오기 (Public용)
export const getPublishedPodcasts = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .eq('status', 'published')
    .order('episode_number', { ascending: false })

  if (error) throw error
  return data as Podcast[]
}

// Podcast 생성
export const createPodcast = async (podcast: Partial<Podcast>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('podcasts')
    .insert([podcast])
    .select()
    .single()

  if (error) throw error
  return data as Podcast
}

// Podcast 업데이트
export const updatePodcast = async (id: string, updates: Partial<Podcast>) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('podcasts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Podcast
}

// Podcast 삭제
export const deletePodcast = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('podcasts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Podcast 재생수 증가
export const incrementPodcastPlays = async (id: string) => {
  const supabase = createClient()
  const { data: podcast } = await supabase
    .from('podcasts')
    .select('plays')
    .eq('id', id)
    .single()
  
  if (podcast) {
    await supabase
      .from('podcasts')
      .update({ plays: podcast.plays + 1 })
      .eq('id', id)
  }
}

// ==================== UTILITY ====================

// Slug 생성 (제목을 URL 친화적으로 변환)
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 -로
    .replace(/--+/g, '-') // 연속된 -를 하나로
}

// 읽기 시간 계산 (분)
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Duration을 초로 변환
export const durationToSeconds = (duration: string): number => {
  const parts = duration.split(':')
  if (parts.length === 2) {
    const [minutes, seconds] = parts.map(Number)
    return minutes * 60 + seconds
  } else if (parts.length === 3) {
    const [hours, minutes, seconds] = parts.map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }
  return 0
}

// 초를 Duration으로 변환
export const secondsToDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`
}

