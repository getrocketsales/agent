/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalNav from '@/components/portal/PortalNav'

interface AIRankResult {
  status: 'APPROVED' | 'NEEDS_EDIT' | 'FLAGGED'
  geo_score: number
  seo_score: number
  aeo_score: number
  ai_score: number
  overall_score: number
  ai_notes: string
  revised_content?: string
  flagged_reasons?: string[]
}

export default function PortalContentPage() {
  const [business, setBusiness] = useState<any>(null)
  const [businessId, setBusinessId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [content, setContent] = useState('')
  const [tagline, setTagline] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<AIRankResult | null>(null)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      setUserEmail(session.user.email || '')

      const { data: portalUser } = await supabase
        .from('portal_users')
        .select('business_id')
        .eq('user_id', session.user.id)
        .single()

      if (!portalUser) return

      setBusinessId(portalUser.business_id)

      const { data: biz } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', portalUser.business_id)
        .single()

      setBusiness(biz)

      const { data: settings } = await supabase
        .from('settings')
        .select('*')
        .eq('business_id', portalUser.business_id)
        .single()

      if (settings) {
        setContent(settings.tagline || '')
        setTagline(settings.site_name || '')
      }

      setLoading(false)
    }
    load()
  }, [])

  const handleCheckAIRank = async () => {
    if (!content.trim()) return
    setSaving(true)
    setResult(null)

    try {
      const res = await fetch('/api/airank/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, business_id: businessId })
      })
      const data = await res.json()
      setResult(data)

      // If approved or needs edit, save to DB
      if (data.status === 'APPROVED' || data.status === 'NEEDS_EDIT') {
        const supabase = createClient()
        const finalContent = data.status === 'NEEDS_EDIT' ? (data.revised_content || content) : content
        
        // Update settings
        const { data: existing } = await supabase
          .from('settings')
          .select('id')
          .eq('business_id', businessId)
          .single()
        
        if (existing) {
          await supabase
            .from('settings')
            .update({ tagline: finalContent, updated_at: new Date().toISOString() })
            .eq('business_id', businessId)
        } else {
          await supabase.from('settings').insert({
            business_id: businessId,
            tagline: finalContent,
          })
        }

        // Log change request with correct schema
        await supabase.from('change_requests').insert({
          business_id: businessId,
          field: 'tagline',
          original_value: content,
          requested_value: finalContent,
          airank_status: data.status,
          created_at: new Date().toISOString()
        })

        if (data.status === 'APPROVED') {
          setSavedMessage('Content approved and saved!')
        } else {
          setSavedMessage('Content revised by AI and saved.')
          setContent(finalContent)
        }
      } else if (data.status === 'FLAGGED') {
        // Log the flagged attempt
        const supabase = createClient()
        await supabase.from('change_requests').insert({
          business_id: businessId,
          field: 'tagline',
          original_value: content,
          requested_value: content,
          airank_status: 'FLAGGED',
          created_at: new Date().toISOString()
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 font-body">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader
        businessName={business?.name || 'Your Business'}
        userEmail={userEmail}
      />
      <div className="flex">
        <PortalNav />
        <main className="flex-1 p-6 max-w-3xl">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-brand-dark">My Content</h1>
            <p className="text-sm text-gray-500 font-body mt-1">
              Edit your business content — every save goes through AIRank review
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="mb-4">
              <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                SITE NAME / TAGLINE
              </label>
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none"
                placeholder="RocketSales | AI Visibility Experts in Dallas, TX"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                BUSINESS DESCRIPTION (AIRank Reviewed)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none resize-none"
                placeholder="Describe your business, services, target city, what makes you unique..."
              />
              <p className="text-xs text-gray-400 font-body mt-1">
                {content.length} characters — aim for 200+ for best AIRank scores
              </p>
            </div>

            <button
              onClick={handleCheckAIRank}
              disabled={saving || !content.trim()}
              className="w-full py-3 px-6 text-white font-heading tracking-wider text-sm rounded-lg transition-all duration-150 disabled:opacity-60"
              style={{ background: saving ? '#8b4b94' : 'linear-gradient(135deg, #592b77, #8b4b94)' }}
            >
              {saving ? 'RUNNING AIRANK REVIEW...' : 'CHECK & SAVE CONTENT'}
            </button>
          </div>

          {result && (
            <div className={`bg-white rounded-xl border shadow-sm p-5 ${
              result.status === 'APPROVED' ? 'border-green-200' :
              result.status === 'FLAGGED' ? 'border-red-200' :
              'border-yellow-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-brand-dark">AIRank Result</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-heading ${
                  result.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  result.status === 'FLAGGED' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {result.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'GEO', value: result.geo_score },
                  { label: 'SEO', value: result.seo_score },
                  { label: 'AEO', value: result.aeo_score },
                  { label: 'AI', value: result.ai_score },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-xs font-heading text-gray-400">{s.label}</p>
                    <p className="text-xl font-heading font-bold" style={{ color: '#592b77' }}>{s.value}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 font-body mb-3">{result.ai_notes}</p>

              {result.flagged_reasons && result.flagged_reasons.length > 0 && (
                <ul className="text-sm text-red-600 font-body space-y-1">
                  {result.flagged_reasons.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              )}

              {savedMessage && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 text-sm font-body">{savedMessage}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
