import { useEffect, useState } from 'react'
import { ArrowSquareOut, ChatCircle, ArrowUp, Clock } from '@phosphor-icons/react'

interface AlgoliaStory {
  objectID: string
  title: string
  url?: string
  points: number
  author: string
  created_at_i: number
  num_comments?: number
}

interface HNStory {
  id: number
  title: string
  url?: string
  score: number
  by: string
  time: number
  descendants?: number
}

function App() {
  const [stories, setStories] = useState<HNStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true)
        setError(null)

        // Calculate timestamp for three months ago
        const threeMonthsAgo = Math.floor(Date.now() / 1000) - (90 * 24 * 60 * 60)

        // Fetch top stories from last three months using Algolia
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>${threeMonthsAgo}&hitsPerPage=30`
        )
        if (!response.ok) throw new Error('Failed to fetch stories')

        const data = await response.json()
        const algoliaStories: AlgoliaStory[] = data.hits

        // Convert Algolia format to our HNStory format
        const convertedStories: HNStory[] = algoliaStories
          .filter(story => story.title && story.points) // Filter out stories without title or points
          .map(story => ({
            id: parseInt(story.objectID),
            title: story.title,
            url: story.url,
            score: story.points,
            by: story.author,
            time: story.created_at_i,
            descendants: story.num_comments
          }))
          .sort((a, b) => b.score - a.score) // Sort by score descending

        setStories(convertedStories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchTopStories()
  }, [])

  const formatTime = (timestamp: number) => {
    const now = Date.now() / 1000
    const diff = now - timestamp
    const hours = Math.floor(diff / 3600)

    if (hours < 1) return 'just now'
    if (hours === 1) return '1 hour ago'
    if (hours < 24) return `${hours} hours ago`

    const days = Math.floor(hours / 24)
    if (days === 1) return '1 day ago'
    return `${days} days ago`
  }

  const getDomain = (url?: string) => {
    if (!url) return null
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-200 to-transparent pointer-events-none"></div>
      <div className="max-w-3xl mx-auto px-6 py-12 relative">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Calm HN
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-wider">
            Top stories from the last three months
          </p>
        </header>

        <div className="space-y-6">
          {stories.map((story, index) => (
            <article key={story.id} className="group -mx-3 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors duration-300 relative">
              <a
                href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={story.title}
              />
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 relative z-10 pointer-events-none">
                <span className="bg-slate-200 text-slate-500 text-[10px] leading-none font-medium px-2 py-0.5 rounded-full flex-shrink-0 self-center mt-px group-hover:bg-purple-200 group-hover:text-slate-600 transition-colors group-hover:duration-[750ms] duration-300">
                  {index + 1}
                </span>
                <h2 className="text-slate-900 text-lg leading-relaxed">
                  <span className="inline-flex items-baseline gap-1.5">
                    {story.title}
                    {story.url && (
                      <ArrowSquareOut size={14} weight="regular" className="opacity-40 flex-shrink-0 mt-1" />
                    )}
                  </span>
                </h2>
                <div></div>
                <div className="flex items-center gap-3 text-xs text-slate-400 group-hover:text-slate-500 transition-colors duration-300">
                <span className="flex items-center gap-1">
                  <ArrowUp size={12} weight="regular" className="opacity-60" />
                  {story.score}
                </span>
                {story.descendants !== undefined && (
                  <>
                    <span>·</span>
                    <a
                      href={`https://news.ycombinator.com/item?id=${story.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 pointer-events-auto relative z-20"
                    >
                      <ChatCircle size={12} weight="regular" className="opacity-60" />
                      {story.descendants}
                    </a>
                  </>
                )}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} weight="regular" className="opacity-60" />
                  {formatTime(story.time)}
                </span>
                {getDomain(story.url) && (
                  <>
                    <span>·</span>
                    <span>{getDomain(story.url)}</span>
                  </>
                )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
