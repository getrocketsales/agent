import { AddClientButton } from '@/components/dashboard/ClientsPageClient'
import { createClient } from '@/lib/supabase/server'

interface Business {
  id: string
  name: string
  slug: string | null
  business_type: string | null
  target_city: string | null
  target_state: string | null
  status: string | null
  plan: string | null
  created_at: string
}

function StatusBadge({ status }: { status: string | null }) {
  const styles: Record<string, string> = {
    active: 'bg-green-50 text-green-700 border border-green-100',
    paused: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
    inactive: 'bg-gray-100 text-gray-500 border border-gray-200',
    cancelled: 'bg-red-50 text-red-600 border border-red-100',
  }
  const dots: Record<string, string> = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    inactive: 'bg-gray-400',
    cancelled: 'bg-red-400',
  }
  const s = status || 'unknown'
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-heading tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${styles[s] || 'bg-gray-100 text-gray-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dots[s] || 'bg-gray-400'} ${s === 'active' ? 'animate-pulse' : ''}`}></span>
      {s.toUpperCase()}
    </span>
  )
}

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, name, slug, business_type, target_city, target_state, status, plan, created_at')
    .order('created_at', { ascending: false })

  const all: Business[] = businesses || []
  const activeCount = all.filter(b => b.status === 'active').length

  return (
    <div>
      {/* Page header */}
      <div className="mb-5 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest font-heading mb-1" style={{color: '#8b4b94'}}>CLIENT MANAGEMENT</p>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">ALL CLIENTS</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-500 font-body text-sm">{all.length} clients total</p>
            <span className="flex items-center gap-1.5 text-xs font-heading text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {activeCount} ACTIVE
            </span>
          </div>
        </div>
        <AddClientButton />
      </div>

      {/* Mobile/Tablet: card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
        {all.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-heading font-bold text-base flex-shrink-0"
                  style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
                >
                  {b.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-gray-900 truncate">{b.name}</p>
                  {b.slug && <p className="text-xs text-gray-400 font-body truncate">{b.slug}</p>}
                </div>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div className="space-y-1.5 text-xs font-body text-gray-500">
              {(b.target_city || b.target_state) && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {b.target_city}, {b.target_state}
                </div>
              )}
              {b.business_type && (
                <div className="flex items-center gap-1.5 capitalize">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {b.business_type}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              {b.plan ? (
                <span className="text-xs font-heading tracking-wider px-2 py-1 rounded-full bg-purple-50 text-purple-700">
                  {b.plan.toUpperCase()}
                </span>
              ) : <span />}
              <a
                href={`/portal/agency/dashboard/clients/${b.id}`}
                className="text-xs font-heading tracking-wider text-gray-400 hover:text-purple-700 transition-colors"
              >
                VIEW DETAILS 
              </a>
            </div>
          </div>
        ))}
        {all.length === 0 && (
          <div className="col-span-2 py-12 text-center bg-white rounded-xl border border-gray-100">
            <p className="font-heading text-gray-400">NO CLIENTS YET</p>
            <p className="text-sm text-gray-400 font-body mt-1">Add your first client to get started</p>
          </div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">CLIENT</th>
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">LOCATION</th>
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">TYPE</th>
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">PLAN</th>
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">STATUS</th>
                <th className="text-left px-6 py-3 text-xs font-heading tracking-widest text-gray-400">SINCE</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {all.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/70 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                        style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
                      >
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-gray-900 text-sm">{b.name}</p>
                        {b.slug && <p className="text-xs text-gray-400 font-body">{b.slug}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-body">
                    {b.target_city && b.target_state ? `${b.target_city}, ${b.target_state}` : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-body capitalize">{b.business_type || ''}</td>
                  <td className="px-6 py-4">
                    {b.plan ? (
                      <span className="text-xs font-heading tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                        {b.plan.toUpperCase()}
                      </span>
                    ) : <span className="text-gray-300 text-sm"></span>}
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-body whitespace-nowrap">
                    {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/portal/agency/dashboard/clients/${b.id}`}
                      className="text-xs font-heading tracking-wider text-gray-300 group-hover:text-purple-700 transition-colors"
                    >
                      VIEW 
                    </a>
                  </td>
                </tr>
              ))}
              {all.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="font-heading text-gray-400">NO CLIENTS YET</p>
                    <p className="text-sm text-gray-400 font-body mt-1">Add your first client to get started</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
