/* eslint-disable @typescript-eslint/no-explicit-any */ 
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalNav from '@/components/portal/PortalNav'

export default async function PortalLeadsPage() {
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

  const { data: leads } = await supabase
    .from('leads')
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
            <h1 className="font-heading text-2xl font-bold text-brand-dark">My Leads</h1>
            <p className="text-sm text-gray-500 font-body mt-1">
              Contact form submissions from your website
            </p>
          </div>

          {!leads || leads.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <p className="text-4xl mb-4">📬</p>
              <p className="font-heading font-bold text-brand-dark mb-2">No leads yet</p>
              <p className="text-sm text-gray-400 font-body">
                Leads from your contact forms will appear here
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-heading tracking-wider text-gray-400">NAME</th>
                    <th className="text-left px-5 py-3 text-xs font-heading tracking-wider text-gray-400">EMAIL</th>
                    <th className="text-left px-5 py-3 text-xs font-heading tracking-wider text-gray-400">PHONE</th>
                    <th className="text-left px-5 py-3 text-xs font-heading tracking-wider text-gray-400">MESSAGE</th>
                    <th className="text-left px-5 py-3 text-xs font-heading tracking-wider text-gray-400">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-body text-gray-700 font-medium">
                        {lead.name || '—'}
                      </td>
                      <td className="px-5 py-4 text-sm font-body text-gray-600">
                        <a href={`mailto:${lead.email}`} className="hover:text-brand-dark transition-colors">
                          {lead.email || '—'}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-sm font-body text-gray-600">
                        {lead.phone || '—'}
                      </td>
                      <td className="px-5 py-4 text-sm font-body text-gray-600 max-w-xs truncate">
                        {lead.message || '—'}
                      </td>
                      <td className="px-5 py-4 text-sm font-body text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
