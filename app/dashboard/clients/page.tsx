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

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, name, slug, business_type, target_city, target_state, status, plan, created_at')
    .order('created_at', { ascending: false })

  const allBusinesses: Business[] = businesses || []

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest font-heading mb-1" style={{color: '#8b4b94'}}>CLIENT MANAGEMENT</p>
          <h1 className="text-3xl font-heading font-bold text-gray-900">ALL CLIENTS</h1>
          <p className="text-gray-500 font-body mt-1">{allBusinesses.length} managed {allBusinesses.length === 1 ? 'client' : 'clients'}</p>
        </div>
        <button
          className="text-sm font-heading tracking-wider px-5 py-2.5 rounded-lg text-white transition-all flex items-center gap-2"
          style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ADD CLIENT
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
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
              {allBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                        style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
                      >
                        {business.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-gray-900 text-sm">{business.name}</p>
                        {business.slug && <p className="text-xs text-gray-400 font-body">{business.slug}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-body">
                    {business.target_city && business.target_state
                      ? `${business.target_city}, ${business.target_state}`
                      : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-body capitalize">
                    {business.business_type || ''}
                  </td>
                  <td className="px-6 py-4">
                    {business.plan ? (
                      <span className="text-xs font-heading tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                        {business.plan.toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm"></span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-heading tracking-wider px-2.5 py-1 rounded-full ${
                      business.status === 'active'
                        ? 'bg-green-50 text-green-700'
                        : business.status === 'paused'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        business.status === 'active' ? 'bg-green-500' : business.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></span>
                      {(business.status || 'unknown').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-body">
                    {new Date(business.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/dashboard/clients/${business.id}`}
                      className="text-xs font-heading tracking-wider text-gray-400 hover:text-purple-700 transition-colors"
                    >
                      VIEW 
                    </a>
                  </td>
                </tr>
              ))}
              {allBusinesses.length === 0 && (
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
