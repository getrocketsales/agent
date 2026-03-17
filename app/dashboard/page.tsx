import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: businesses } = await supabase
    .from('businesses')
    .select(`
      id, name, slug, status, plan, business_type, target_city, target_state,
      client_sites ( id, url, portal_subdomain )
    `)
    .order('name')

  const { data: auditStats } = await supabase
    .from('audits')
    .select('ai_score, seo_score, geo_score')
    .not('ai_score', 'is', null)

  const avgAiScore = auditStats && auditStats.length > 0
    ? Math.round(auditStats.reduce((a, b) => a + (b.ai_score || 0), 0) / auditStats.length)
    : 0

  const activeCount = businesses?.filter(b => b.status === 'active').length || 0

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of all client accounts</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active Clients" value={activeCount} icon="" color="blue" />
        <StatCard label="Avg AIRank Score" value={avgAiScore} icon="" color="orange" suffix="/100" />
        <StatCard label="Total Pages Audited" value={auditStats?.length || 0} icon="" color="green" />
      </div>

      {/* Clients grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Client Accounts</h2>
          <Link
            href="/dashboard/clients/new"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition"
          >
            + Add Client
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {businesses?.map((biz) => (
            <ClientCard key={biz.id} business={biz} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color, suffix = '' }: {
  label: string; value: number; icon: string; color: string; suffix?: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400',
    orange: 'bg-orange-500/10 text-orange-400',
    green: 'bg-green-500/10 text-green-400',
  }
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[color]}`}>
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold text-white">{value}{suffix}</p>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClientCard({ business }: { business: any }) {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400',
    paused: 'bg-yellow-500/10 text-yellow-400',
    churned: 'bg-red-500/10 text-red-400',
  }
  const site = business.client_sites?.[0]

  return (
    <Link href={`/dashboard/clients/${business.id}`}>
      <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <span className="text-orange-400 font-bold text-sm">
              {business.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[business.status] || statusColors.active}`}>
            {business.status}
          </span>
        </div>
        <h3 className="font-semibold text-white group-hover:text-orange-400 transition mb-1">
          {business.name}
        </h3>
        {site?.url && (
          <p className="text-xs text-gray-500 truncate mb-3">{site.url}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize">{business.plan} plan</span>
          {business.target_city && (
            <span> {business.target_city}{business.target_state ? `, ${business.target_state}` : ''}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
