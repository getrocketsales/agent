/* eslint-disable react/no-unescaped-entities */
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalNav from '@/components/portal/PortalNav'
import Link from 'next/link'

export default async function PortalDashboardPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) redirect('/portal/login')

  const { data: portalUser } = await supabase
    .from('portal_users')
    .select('id, business_id, role')
    .eq('user_id', session.user.id)
    .single()

  if (!portalUser) redirect('/portal/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', portalUser.business_id)
    .single()

  const { data: pages } = await supabase
    .from('pages')
    .select('id, title, status, geo_score, seo_score, aeo_score, ai_score, overall_score, updated_at')
    .eq('business_id', portalUser.business_id)
    .order('updated_at', { ascending: false })
    .limit(5)

  const { data: changes } = await supabase
    .from('change_requests')
    .select('id, field, airank_status, created_at')
    .eq('business_id', portalUser.business_id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: leadCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', portalUser.business_id)

  const avgScore = pages && pages.length > 0
    ? Math.round(pages.reduce((sum, p) => sum + (p.overall_score || 0), 0) / pages.length)
    : 0

  const quickActions = [
    { href: '/portal/content', label: 'Edit Content', icon: 'E', desc: 'Update your business info' },
    { href: '/portal/leads', label: 'View Leads', icon: 'L', desc: leadCount ? String(leadCount) + ' total leads' : 'No leads yet' },
    { href: '/portal/history', label: 'Change History', icon: 'H', desc: 'See all edits & AI reviews' },
    { href: '/portal/settings', label: 'Settings', icon: 'S', desc: 'Update contact & hours' },
  ]

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
            <h1 className="font-heading text-2xl font-bold text-brand-dark">
              Welcome, {business?.name || 'Client'}
            </h1>
            <p className="text-sm text-gray-500 font-body mt-1">
              Here is your AI visibility overview
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'AI Score', value: avgScore, color: '#592b77' },
              { label: 'Pages Active', value: pages?.filter(p => p.status === 'published').length || 0, color: '#16a34a' },
              { label: 'Total Leads', value: leadCount || 0, color: '#2563eb' },
              { label: 'Pending', value: changes?.filter(c => c.airank_status === 'NEEDS_EDIT').length || 0, color: '#d97706' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-heading tracking-wider text-gray-400">{stat.label}</p>
                <p className="text-2xl font-heading font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {quickActions.map(action => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-2"
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading text-sm" style={{ background: 'linear-gradient(135deg, #592b77, #8b4b94)' }}>{action.icon}</span>
                <span className="font-heading text-sm font-bold text-brand-dark">{action.label}</span>
                <span className="text-xs text-gray-400 font-body">{action.desc}</span>
              </Link>
            ))}
          </div>

          {pages && pages.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
              <h2 className="font-heading font-bold text-brand-dark mb-4">Recent Pages</h2>
              <div className="space-y-3">
                {pages.map(page => (
                  <div key={page.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-body text-gray-700">{page.title}</p>
                      <p className="text-xs text-gray-400 font-body">{new Date(page.updated_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-heading font-bold" style={{ color: '#592b77' }}>
                        {page.overall_score || 0}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-heading ${
                        page.status === 'published' ? 'bg-green-100 text-green-700' :
                        page.status === 'flagged' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {(page.status || 'draft').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {changes && changes.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-heading font-bold text-brand-dark mb-4">Recent Changes</h2>
              <div className="space-y-2">
                {changes.map(change => (
                  <div key={change.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <p className="text-sm font-body text-gray-600 capitalize">{(change.field || '').replace(/_/g, ' ')}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-heading ${
                        change.airank_status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        change.airank_status === 'FLAGGED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {change.airank_status || 'PENDING'}
                      </span>
                      <span className="text-xs text-gray-400 font-body">
                        {new Date(change.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
