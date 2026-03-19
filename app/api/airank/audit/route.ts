import { NextRequest, NextResponse } from 'next/server'
import { auditPage } from '@/lib/airank/engine'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { business_id, page_slug } = await req.json()

    const { data: page } = await supabase
      .from('pages')
      .select('*')
      .eq('business_id', business_id)
      .eq('slug', page_slug)
      .single()

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const audit = await auditPage({
      page_slug: page.slug,
      title: page.title,
      meta_title: page.meta_title || '',
      meta_description: page.meta_description || '',
      content: JSON.stringify(page.content),
      page_type: page.page_type,
    })

    await supabase
      .from('pages')
      .update({
        airank_score: audit.overall_score,
        geo_score: audit.geo_score,
        seo_score: audit.seo_score,
        aeo_score: audit.aeo_score,
        ai_score: audit.ai_score,
        last_audited_at: new Date().toISOString(),
      })
      .eq('id', page.id)

    return NextResponse.json(audit)
  } catch (error) {
    console.error('AIRank audit error:', error)
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 })
  }
}
