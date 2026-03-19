import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!business) notFound()

  const { data: pages } = await supabase
    .from('pages')
    .select('slug, title, airank_score, geo_score, seo_score, aeo_score, ai_score, status, last_audited_at')
    .eq('business_id', params.id)
    .order('airank_score', { ascending: false })

  const { data: leads } = await supabase
    .from('leads')
    .select('id, name, email, phone, status, created_at, service_interest')
    .eq('business_id', params.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: reviews } = await supabase
    .from('airank_reviews')
    .select('id, page_slug, overall_score, status, created_at')
    .eq('business_id', params.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const allPages = pages || []
  const avgAirank = allPages.length
    ? Math.round(allPages.reduce((a, p) => a + (p.airank_score || 0), 0) / allPages.length)
    : 0
  const avgGeo = allPages.length
    ? Math.round(allPages.reduce((a, p) => a + (p.geo_score || 0), 0) / allPages.length)
    : 0
  const avgSeo = allPages.length
    ? Math.round(allPages.reduce((a, p) => a + (p.seo_score || 0), 0) / allPages.length)
    : 0
  const avgAeo = allPages.length
    ? Math.round(allPages.reduce((a, p) => a + (p.aeo_score || 0), 0) / allPages.length)
    : 0
  const avgAi = allPages.length
    ? Math.round(allPages.reduce((a, p) => a + (p.ai_score || 0), 0) / allPages.length)
    : 0

  const getScoreColor = (s: number) => s >= 80 ? 'text-green-600' : s >= 60 ? 'text-yellow-600' : 'text-red-500'
  const getScoreBg = (s: number) => s >= 80 ? 'bg-green-50 border-green-200' : s >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
  const planColors: Record<string, string> = { essential:'bg-gray-100 text-gray-600', growth:'bg-blue-100 text-blue-700', scale:'bg-purple-100 text-purple-700', custom:'bg-orange-100 text-orange-700', starter:'bg-gray-100 text-gray-600' }
  const statusColors: Record<string, string> = { active:'text-green-600 bg-green-50', paused:'text-yellow-600 bg-yellow-50', cancelled:'text-red-600 bg-red-50', inactive:'text-gray-500 bg-gray-50' }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Back + Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/portal/agency/dashboard/clients" className="text-xs font-heading tracking-wider text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1 mb-2">
             BACK TO CLIENTS
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">{business.name}</h1>
          <p className="text-gray-500 text-sm mt-1 font-body">{business.city}{business.state ? `, ${business.state}` : ''} {business.industry ? ` ${business.industry}` : ''}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${planColors[business.plan] || planColors.essential}`}>{business.plan || 'essential'}</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusColors[business.status] || statusColors.inactive}`}>{business.status || 'active'}</span>
        </div>
      </div>

      {/* AIRank Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label:'AIRank', score: avgAirank, icon:'' },
          { label:'GEO', score: avgGeo, icon:'' },
          { label:'SEO', score: avgSeo, icon:'' },
          { label:'AEO', score: avgAeo, icon:'' },
          { label:'AI Vis', score: avgAi, icon:'' },
        ].map(item => (
          <div key={item.label} className={`border rounded-xl p-4 text-center ${getScoreBg(item.score)}`}>
            <div className="text-xl mb-1">{item.icon}</div>
            <div className={`text-3xl font-black ${getScoreColor(item.score)}`}>{item.score}</div>
            <div className="text-xs text-gray-500 font-medium mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Business Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4">Business Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {business.owner_name && <div><span className="font-semibold text-gray-600">Owner: </span><span className="text-gray-800">{business.owner_name}</span></div>}
          {business.email && <div><span className="font-semibold text-gray-600">Email: </span><span className="text-gray-800">{business.email}</span></div>}
          {business.phone && <div><span className="font-semibold text-gray-600">Phone: </span><span className="text-gray-800">{business.phone}</span></div>}
          {business.domain && <div><span className="font-semibold text-gray-600">Domain: </span><a href={`https://${business.domain}`} target="_blank" className="text-purple-600 hover:underline">{business.domain}</a></div>}
          <div><span className="font-semibold text-gray-600">Slug: </span><span className="text-gray-500 font-mono text-xs">{business.slug}</span></div>
          <div><span className="font-semibold text-gray-600">Since: </span><span className="text-gray-800">{new Date(business.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pages & AIRank */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4">Pages ({allPages.length})</h2>
          {allPages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No pages yet</p>
          ) : (
            <div className="space-y-2">
              {allPages.map(page => (
                <div key={page.slug} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{page.title || page.slug}</p>
                    <p className="text-xs text-gray-400">/{page.slug}</p>
                  </div>
                  <span className={`text-lg font-black ${getScoreColor(page.airank_score || 0)}`}>{page.airank_score || ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4">Recent Leads ({(leads || []).length})</h2>
          {!leads || leads.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No leads yet</p>
          ) : (
            <div className="space-y-3">
              {leads.map(lead => (
                <div key={lead.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{lead.name || 'Anonymous'}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                    {lead.service_interest && <p className="text-xs text-purple-600 mt-0.5">{lead.service_interest}</p>}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lead.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{lead.status || 'new'}</span>
                    <p className="text-xs text-gray-400 mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent AIRank Reviews */}
      {reviews && reviews.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-heading font-bold text-gray-500 uppercase tracking-wider mb-4">Recent AIRank Reviews</h2>
          <div className="space-y-2">
            {reviews.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">/{r.page_slug}</p>
                  <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black ${getScoreColor(r.overall_score || 0)}`}>{r.overall_score || ''}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === 'APPROVED' ? 'bg-green-100 text-green-700' : r.status === 'FLAGGED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
