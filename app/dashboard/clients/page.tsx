import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: businesses } = await supabase
    .from('businesses')
    .select(`
      id, name, slug, status, plan, business_type, target_city, target_state, created_at,
      client_sites ( id, url, portal_subdomain )
    `)
    .order('name')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-gray-400 mt-1">{businesses?.length || 0} total accounts</p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition"
        >
          + Add Client
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Website</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {businesses?.map((biz) => (
              <tr key={biz.id} className="hover:bg-gray-800/50 transition">
                <td className="px-5 py-4">
                  <Link href={`/dashboard/clients/${biz.id}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-400 font-bold text-xs">
                        {biz.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white hover:text-orange-400 transition">{biz.name}</p>
                      {biz.business_type && <p className="text-xs text-gray-500 capitalize">{biz.business_type}</p>}
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <a
                    href={biz.client_sites?.[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition truncate max-w-[180px] block"
                  >
                    {biz.client_sites?.[0]?.url || ''}
                  </a>
                </td>
                <td className="px-5 py-4 text-sm text-gray-400">
                  {biz.target_city ? `${biz.target_city}${biz.target_state ? `, ${biz.target_state}` : ''}` : ''}
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs font-medium text-gray-300 capitalize">{biz.plan}</span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={biz.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400',
    paused: 'bg-yellow-500/10 text-yellow-400',
    churned: 'bg-red-500/10 text-red-400',
  }
  return (
    <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full capitalize ${map[status] || map.active}`}>
      {status}
    </span>
  )
}
