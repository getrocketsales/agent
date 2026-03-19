'use client'
import { useState } from 'react'
import { AIRankScoreCard } from '@/components/airank/AIRankScoreCard'

interface AIRankEditorProps {
  businessId: string
  pageSlug?: string
  initialContent?: string
  onPublish?: (content: string) => void
}

type ReviewResult = {
  status: 'APPROVED' | 'NEEDS_EDIT' | 'FLAGGED'
  geo_score: number
  seo_score: number
  aeo_score: number
  ai_score: number
  overall_score: number
  flagged_reasons: string[]
  ai_notes: string
  revised_content?: string
}

export function AIRankEditor({ businessId, pageSlug, initialContent, onPublish }: AIRankEditorProps) {
  const [content, setContent] = useState(initialContent || '')
  const [prompt, setPrompt] = useState('')
  const [review, setReview] = useState<ReviewResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'generate'>('edit')

  const handleReview = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/airank/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          context: `Page: ${pageSlug}`,
          role: 'admin',
          business_id: businessId,
          page_slug: pageSlug,
          reviewed_by: 'admin',
        }),
      })
      const data = await res.json()
      setReview(data)
    } catch (error) {
      console.error('Review error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/airank/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, pageType: 'service page' }),
      })
      const data = await res.json()
      setContent(data.content)
      setActiveTab('edit')
    } catch (error) {
      console.error('Generate error:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handlePublish = () => {
    if (review?.status === 'APPROVED' && onPublish) {
      onPublish(content)
    }
  }

  const handleUseRevision = () => {
    if (review?.revised_content) {
      setContent(review.revised_content)
      setReview(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'edit'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
             Edit Content
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'generate'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
             AI Generate
          </button>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Page Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter or paste page content here..."
            />
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Describe the content you want to generate
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g. Service page for AI visibility consulting for healthcare providers in Dallas TX..."
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? ' Generating...' : ' Generate AIRank Content'}
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleReview}
            disabled={loading || !content}
            className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? ' Reviewing...' : ' Run AIRank Review'}
          </button>

          {review?.status === 'APPROVED' && (
            <button
              onClick={handlePublish}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
               Publish
            </button>
          )}
        </div>

        {review?.revised_content && (
          <button
            onClick={handleUseRevision}
            className="w-full py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
             Use AI Suggested Revision
          </button>
        )}
      </div>

      <div>
        {review ? (
          <AIRankScoreCard {...review} />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="text-4xl mb-3"></div>
            <p className="text-gray-500 font-medium">AIRank Review</p>
            <p className="text-sm text-gray-400 mt-1">
              Enter content and click Run AIRank Review to see your GEO, SEO, AEO and AI Visibility scores
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
