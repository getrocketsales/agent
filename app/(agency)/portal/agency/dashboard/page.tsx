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

function StatusDot({ status }: { status: string | null }) {
  const colors: Record<string, string> = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    inactive: 'bg-gray-400',
    cancelled: 'bg-red-400',
  }
  return (
    <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${colors[status || ''] || 'bg-gray-300'}`} />
  )
}

function StatCard({ label, value, sub, color = '#8b4b94', trend }: {
  label: string; value: string | number; sub?: string; color?: string; trend?: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs tracking-widest font-heading text-gray-400 truncate">{label}</p>
          <p className="mt-1 text-2xl sm:text-3xl font-heading font-bold text-gray-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-400 font-body truncate">{sub}</p>}
          {trend && <p className="mt-1 text-xs font-heading" style={{color}}>{trend}</p>}
        </div>
        <div className="w-2 h-8 rounded-full flex-shrink-0 mt-1" style={{backgroundColor: color}}></div>
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

  const all: Business[] = businesses || []
  const activeCount = all.filter(b => b.status === 'active').length
  const pausedCount = all.filter(b => b.status === 'paused').length
  const planCounts = all.reduce((acc: Record<string, number>, b) => {
    const plan = b.plan || 'basic'
    acc[plan] = (acc[plan] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      {/* Page header */}
      <div className="mb-5 sm:mb-6 md:mb-8">
        <p className="text-xs tracking-widest font-heading mb-1" style={{color: '#8b4b94'}}>AGENCY OVERVIEW</p>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">DASHBOARD</h1>
        <p className="text-gray-500 font-body mt-1 text-sm">AI-powered visibility management for all your clients</p>
      </div>

      {/* System status bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-wrap gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
          <span className="text-xs font-heading tracking-wider text-gray-600">AIRANK ENGINE</span>
          <span className="text-xs font-heading text-green-600 bg-green-50 px-2 py-0.5 rounded-full">ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
          <span className="text-xs font-heading tracking-wider text-gray-600">PM2 PROCESS</span>
          <span className="text-xs font-heading text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
          <span className="text-xs font-heading tracking-wider text-gray-600">SUPABASE DB</span>
          <span className="text-xs font-heading text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">CONNECTED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></div>
          <span className="text-xs font-heading tracking-wider text-gray-600">NEXT.JS 14</span>
          <span className="text-xs font-heading text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">v14.2.35</span>
        </div>
      </div>

      {/* Stats grid  2 cols on sm, 4 cols on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
        <StatCard label="TOTAL CLIENTS" value={all.length} sub="All businesses" color="#592b77" />
        <StatCard label="ACTIVE" value={activeCount} sub="Currently running" color="#22c55e" trend={activeCount > 0 ? `${Math.round(activeCount/all.length*100)}% active` : undefined} />
        <StatCard label="PAUSED" value={pausedCount} sub="Temporarily off" color="#f59e0b" />
        <StatCard label="PRO PLANS" value={planCounts['pro'] || 0} sub="Premium tier" color="#8b4b94" />
      </div>

      {/* Recent clients table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs tracking-widest font-heading truncate" style={{color: '#8b4b94'}}>CLIENT ROSTER</p>
            <h2 className="font-heading font-bold text-gray-900 text-base sm:text-lg">RECENT CLIENTS</h2>
          </div>
          <a
            href="/portal/agency/dashboard/clients"
            className="text-xs font-heading tracking-wider px-3 sm:px-4 py-2 rounded-lg text-white transition-all flex-shrink-0 whitespace-nowrap"
            style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
          >
            VIEW ALL
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {all.slice(0, 8).map((b) => (
            <div key={b.id} className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                  style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}
                >
                  {b.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-gray-900 text-sm truncate">{b.name}</p>
                  <p className="text-xs text-gray-400 font-body truncate">
                    {b.target_city && b.target_state ? `${b.target_city}, ${b.target_state}` : b.business_type || ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Plan badge  hidden on xs */}
                {b.plan && (
                  <span className="hidden sm:inline text-xs font-heading tracking-wider px-2 py-1 rounded-full bg-purple-50 text-purple-700">
                    {b.plan.toUpperCase()}
                  </span>
                )}
                {/* Status dot + label */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-heading tracking-wider px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap ${
                  b.status === 'active' ? 'bg-green-50 text-green-700'
                  : b.status === 'paused' ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-gray-100 text-gray-500'
                }`}>
                  <StatusDot status={b.status} />
                  <span className="hidden xs:inline">{(b.status || '').toUpperCase()}</span>
                </span>
              </div>
            </div>
          ))}
          {all.length === 0 && (
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
