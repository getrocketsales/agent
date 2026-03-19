import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message, service, source_page, source_url } = body
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const { data: rs } = await supabase.from('businesses').select('id').eq('slug', 'rocketsales').single()
    await supabase.from('leads').insert({
      business_id: rs?.id, name, email, phone,
      message: company ? `Company: ${company}\n\n${message}` : message,
      service_interest: service, source_page, source_url, status: 'new'
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
