'use client'
import { useState, useEffect } from 'react'
import { AIRankEditor } from '@/components/admin/AIRankEditor'
import BulkAudit from '@/components/airank/BulkAudit'

const ROCKETSALES_BUSINESS_ID = process.env.NEXT_PUBLIC_ROCKETSALES_BUSINESS_ID || ''
const ROCKETSALES_SITE_URL = process.env.NEXT_PUBLIC_ROCKETSALES_SITE_URL || 'https://getrocketsales.org'

interface PageScore {
  slug: string
  title: string
  airank_score: number
  geo_score: number
  seo_score: number
  aeo_score: number
  ai_score: number
  last_audited_at: string | null
  status: string
}

export default function AIRankDashboard() {
  const [pages, setPages] = useState<PageScore[]>([])
  const [avgScore, setAvgScore] = useState(0)
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'scores' | 'editor' | 'history' | 'bulk'>('scores')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScores()
  }, [])

  const fetchScores = async () => {
    try {
      const res = await fetch(`/api/airank/score?business_id=${ROCKETSALES_BUSINESS_ID}`)
      const data = await res.json()
      setPages(data.pages || [])
      setAvgScore(data.average_score || 0)
    } catch (error) {
      console.error('Score fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AIRank Engine</h1>
          <p className="text-gray-500 text-sm mt-1">
            GEO  SEO  AEO  AI Visibility  all in one score
          </p>
        </div>
        <div className={`text-center px-6 py-3 rounded-xl ${getScoreBg(avgScore)}`}>
          <div className={`text-3xl font-black ${getScoreColor(avgScore)}`}>{avgScore}</div>
          <div className="text-xs text-gray-500 font-medium">AVG AIRANK</div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {(['scores', 'editor', 'history', 'bulk'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'scores' && ' '}
            {tab === 'editor' && ' '}
            {tab === 'history' && ' '}
              {tab === 'bulk' && ' '}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'scores' && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading scores...</div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="text-4xl mb-3"></div>
              <p className="text-gray-500 font-medium">No pages audited yet</p>
              <p className="text-sm text-gray-400 mt-1">Switch to the Editor tab to create and audit content</p>
            </div>
          ) : (
            pages.map((page) => (
              <div
                key={page.slug}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors cursor-pointer"
                onClick={() => { setSelectedPage(page.slug); setActiveTab('editor') }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{page.title || page.slug}</p>
                    <p className="text-xs text-gray-400 mt-0.5">/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex gap-2 text-xs">
                      {['GEO', 'SEO', 'AEO', 'AI'].map((pillar, i) => {
                        const score = [page.geo_score, page.seo_score, page.aeo_score, page.ai_score][i]
                        return (
                          <span key={pillar} className={`px-2 py-1 rounded-full font-medium ${getScoreBg(score || 0)} ${getScoreColor(score || 0)}`}>
                            {pillar} {score || 0}
                          </span>
                        )
                      })}
                    </div>
                    <div className={`text-2xl font-black ${getScoreColor(page.airank_score || 0)}`}>
                      {page.airank_score || 0}
                    </div>
                  </div>
                </div>
                {page.last_audited_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    Last audited: {new Date(page.last_audited_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'editor' && (
        <AIRankEditor
          businessId={ROCKETSALES_BUSINESS_ID}
          pageSlug={selectedPage || 'new-page'}
          onPublish={(content) => {
            console.log('Publishing:', content)
            fetchScores()
          }}
        />
      )}

      {activeTab === 'history' && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <div className="text-4xl mb-3"></div>
          <p className="text-gray-500 font-medium">Review History</p>
          <p className="text-sm text-gray-400 mt-1">All AIRank reviews will appear here</p>
        </div>
      )}

      {activeTab === 'bulk' && (
        <BulkAudit
          businessId={ROCKETSALES_BUSINESS_ID}
          siteUrl={ROCKETSALES_SITE_URL}
          onComplete={fetchScores}
        />
      )}
    </div>
  )
}
