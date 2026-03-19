import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { name, email, owner_name, phone, city, state, industry, plan, domain, portal_password } = await req.json()
    if (!name || !email) return NextResponse.json({ error: 'name and email required' }, { status: 400 })

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .insert({ name, slug, owner_name, email, phone, city, state, industry, plan: plan || 'essential', status: 'active', domain, portal_enabled: true })
      .select().single()

    if (bizError) return NextResponse.json({ error: bizError.message }, { status: 500 })

    await supabase.from('settings').insert({ business_id: business.id, site_name: name, phone })

    await supabase.from('pages').insert([
      { business_id: business.id, slug: 'home', title: name + ' - Home', meta_title: name, page_type: 'home', status: 'published' },
      { business_id: business.id, slug: 'contact', title: 'Contact ' + name, meta_title: 'Contact ' + name, page_type: 'contact', status: 'published' }
    ])

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: portal_password || Math.random().toString(36).slice(-8) + 'A1!',
      email_confirm: true
    })

    if (authError && !authError.message.includes('already registered')) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    if (authUser?.user) {
      await supabase.from('portal_users').insert({ business_id: business.id, user_id: authUser.user.id, role: 'client' })
    }

    return NextResponse.json({ success: true, business_id: business.id, slug: business.slug, portal_email: email })
  } catch (error) {
    console.error('Provision error:', error)
    return NextResponse.json({ error: 'Provisioning failed' }, { status: 500 })
  }
}
