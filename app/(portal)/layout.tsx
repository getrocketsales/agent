import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/portal/login')
  }

  const { data: portalUser } = await supabase
    .from('portal_users')
    .select('id, business_id, role')
    .eq('user_id', session.user.id)
    .single()

  if (!portalUser) {
    redirect('/portal/login')
  }

  return <>{children}</>
}
