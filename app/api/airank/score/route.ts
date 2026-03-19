import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const business_id = searchParams.get('business_id')

    if (!business_id) {
      return NextResponse.json({ error: 'business_id required' }, { status: 400 })
    }

    const { data: pages } = await supabase
      .from('pages')
      .select('slug, title, airank_score, geo_score, seo_score, aeo_score, ai_score, last_audited_at, status')
      .eq('business_id', business_id)
      .order('airank_score', { ascending: false })

    const scores = pages || []
    const avg = scores.length
      ? Math.round(scores.reduce((a, p) => a + (p.airank_score || 0), 0) / scores.length)
      : 0

    return NextResponse.json({ pages: scores, average_score: avg })
  } catch (error) {
    console.error('Score fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 })
  }
}
