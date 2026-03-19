/* eslint-disable @typescript-eslint/no-explicit-any */ 
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalNav from '@/components/portal/PortalNav'

export default async function PortalHistoryPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/portal/login')

  const { data: portalUser } = await supabase
    .from('portal_users')
    .select('business_id')
    .eq('user_id', session.user.id)
    .single()

  if (!portalUser) redirect('/portal/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('name')
    .eq('id', portalUser.business_id)
    .single()

  const { data: changes } = await supabase
    .from('change_requests')
    .select('*')
    .eq('business_id', portalUser.business_id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader
        businessName={business?.name || 'Your Business'}
        userEmail={session.user.email || ''}
      />
      <div className="flex">
        <PortalNav />
        <main className="flex-1 p-6 max-w-5xl">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-brand-dark">Change History</h1>
            <p className="text-sm text-gray-500 font-body mt-1">
              Log of every edit and AIRank review result
            </p>
          </div>

          {!changes || changes.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <p className="text-4xl mb-4">🕐</p>
              <p className="font-heading font-bold text-brand-dark mb-2">No changes yet</p>
              <p className="text-sm text-gray-400 font-body">
                Content edits and their AIRank results will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {changes.map((change: any) => {
                const aiResult = change.airank_result
                return (
                  <div key={change.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-heading font-bold text-brand-dark capitalize">
                          {change.field?.replace(/_/g, ' ')}
                        </p>
                        <p className="text-xs text-gray-400 font-body">
                          {new Date(change.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-heading ${
                        change.airank_status === 'approved' ? 'bg-green-100 text-green-700' :
                        change.airank_status === 'flagged' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {change.airank_status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>

                    {aiResult && (
                      <div className="mt-3 pt-3 border-t border-gray-50">
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          {[
                            { label: 'GEO', value: aiResult.geo_score },
                            { label: 'SEO', value: aiResult.seo_score },
                            { label: 'AEO', value: aiResult.aeo_score },
                            { label: 'AI', value: aiResult.ai_score },
                          ].map(s => (
                            <div key={s.label} className="text-center bg-gray-50 rounded-lg py-2">
                              <p className="text-xs font-heading text-gray-400">{s.label}</p>
                              <p className="text-sm font-heading font-bold" style={{ color: '#592b77' }}>{s.value || 0}</p>
                            </div>
                          ))}
                        </div>
                        {aiResult.ai_notes && (
                          <p className="text-xs text-gray-500 font-body">{aiResult.ai_notes}</p>
                        )}
                      </div>
                    )}

                    {change.requested_value && (
                      <div className="mt-3 pt-3 border-t border-gray-50">
                        <p className="text-xs font-heading tracking-wider text-gray-400 mb-1">NEW VALUE</p>
                        <p className="text-sm text-gray-600 font-body line-clamp-3">{change.requested_value}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
