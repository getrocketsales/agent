'use client'

import { useState } from 'react'

interface CrawlResult {
  slug: string
  status: string
  airank_score?: number
  error?: string
}

interface BulkAuditProps {
  businessId: string
  siteUrl: string
  onComplete?: () => void
}

function getStatusColor(status: string) {
  if (status === 'APPROVED') return 'text-green-600 bg-green-50 border-green-200'
  if (status === 'NEEDS_EDIT') return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  if (status === 'FLAGGED') return 'text-red-600 bg-red-50 border-red-200'
  if (status === 'error') return 'text-gray-500 bg-gray-50 border-gray-200'
  return 'text-gray-600 bg-gray-50 border-gray-200'
}

function getScoreColor(score?: number) {
  if (!score) return '#9ca3af'
  if (score >= 75) return '#16a34a'
  if (score >= 60) return '#d97706'
  return '#dc2626'
}

export default function BulkAudit({ businessId, siteUrl, onComplete }: BulkAuditProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<CrawlResult[]>([])
  const [avgScore, setAvgScore] = useState<number | null>(null)
  const [pagesCount, setPagesCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [maxPages, setMaxPages] = useState(10)

  const runBulkAudit = async () => {
    setIsRunning(true)
    setResults([])
    setAvgScore(null)
    setPagesCount(null)
    setError(null)

    try {
      const res = await fetch('/api/airank/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          site_url: siteUrl,
          max_pages: maxPages,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Bulk audit failed')
        return
      }

      setResults(data.results || [])
      setAvgScore(data.average_score)
      setPagesCount(data.pages_crawled)
      onComplete?.()
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Bulk Site Audit</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Crawl and score all pages of <span className="font-medium text-orange-600">{siteUrl}</span>
            </p>
          </div>
          {avgScore !== null && (
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: getScoreColor(avgScore) }}>{avgScore}</div>
              <div className="text-xs text-gray-500">avg AIRank</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-medium">Max pages:</label>
            <select
              value={maxPages}
              onChange={(e) => setMaxPages(Number(e.target.value))}
              disabled={isRunning}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <button
            onClick={runBulkAudit}
            disabled={isRunning}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Crawling & Scoring...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Run Bulk AIRank Audit
              </>
            )}
          </button>
        </div>

        {isRunning && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Crawling pages, running AI analysis... this may take 12 minutes
          </div>
        )}

        {error && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              {pagesCount} pages audited
            </p>
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="text-green-600">{results.filter(r => r.status === 'APPROVED').length} approved</span>
              <span className="text-yellow-600">{results.filter(r => r.status === 'NEEDS_EDIT').length} needs edit</span>
              <span className="text-red-600">{results.filter(r => r.status === 'FLAGGED').length} flagged</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {results.map((result, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{result.slug || '/'}</p>
                  {result.error && <p className="text-xs text-red-500 mt-0.5">{result.error}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {result.airank_score !== undefined && (
                    <span className="text-lg font-black" style={{ color: getScoreColor(result.airank_score) }}>
                      {result.airank_score}
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
