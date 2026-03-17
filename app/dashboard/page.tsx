import { createClient } from '@/lib/supabase/server'

interface Business {
  id: string
  name: string
  business_type: string | null
  target_city: string | null
  target_state: string | null
  status: string | null
  plan: string | null
}

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  color?: string
}

function StatCard({ label, value, sub, color = '#8b4b94' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest font-heading text-gray-400">{label}</p>
          <p className="mt-1 text-3xl font-heading font-bold text-gray-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-400 font-body">{sub}</p>}
        </div>
        <div className="w-2 h-8 rounded-full" style={{backgroundColor: color}}></div>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, name, business_type, target_city, target_state, status, plan')
    .order('created_at', { ascending: false })

  const allBusinesses: Business[] = businesses || []
  const activeCount = allBusinesses.filter(b => b.status === 'active').length
  const planCounts = allBusinesses.reduce((acc: Record<string, number>, b) => {
    const plan = b.plan || 'basic'
    acc[plan] = (acc[plan] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs tracking-widest font-heading mb-1" style={{color: '#8b4b94'}}>AGENCY OVERVIEW</p>
        <h1 className="text-3xl font-heading font-bold text-gray-900">DASHBOARD</h1>
        <p className="text-gray-500 font-body mt-1">AI-powered visibility management for all your clients</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="TOTAL CLIENTS" value={allBusinesses.length} sub="All managed businesses" color="#592b77" />
        <StatCard label="ACTIVE CLIENTS" value={activeCount} sub="Currently active" color="#f37850" />
        <StatCard label="PRO PLANS" value={planCounts['pro'] || 0} sub="Pro tier clients" color="#8b4b94" />
        <StatCard label="BASIC PLANS" value={planCounts['basic'] || 0} sub="Basic tier clients" color="#fdc880" />
      </div>

      {/* Recent clients */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest font-heading" style={{color: '#8b4b94'}}>CLIENT ROSTER</p>
            <h2 className="font-heading font-bold text-gray-900 text-lg">RECENT CLIENTS</h2>
          </div>
          <a
            href="/dashboard/clients"
            className="text-xs font-heading tracking-wider px-4 py-2 rounded-lg text-white transition-all"
            style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
          >
            VIEW ALL
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {allBusinesses.slice(0, 6).map((business) => (
            <div key={business.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm"
                  style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
                >
                  {business.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-heading font-bold text-gray-900">{business.name}</p>
                  <p className="text-xs text-gray-400 font-body">
                    {business.target_city && business.target_state
                      ? `${business.target_city}, ${business.target_state}`
                      : business.business_type || ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {business.plan && (
                  <span className="text-xs font-heading tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                    {business.plan.toUpperCase()}
                  </span>
                )}
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
              </div>
            </div>
          ))}
          {allBusinesses.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="font-heading text-gray-400">NO CLIENTS YET</p>
              <p className="text-sm text-gray-400 font-body mt-1">Add your first client to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
