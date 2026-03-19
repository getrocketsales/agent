import { NextRequest, NextResponse } from 'next/server'
import { reviewContent } from '@/lib/airank/engine'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { content, context, role, business_id, page_slug, reviewed_by } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const review = await reviewContent(content, context)

    if (business_id) {
      await supabase.from('airank_reviews').insert({
        business_id,
        page_slug,
        reviewed_by,
        role,
        original_content: content,
        revised_content: review.revised_content,
        geo_score: review.geo_score,
        seo_score: review.seo_score,
        aeo_score: review.aeo_score,
        ai_score: review.ai_score,
        overall_score: review.overall_score,
        status: review.status,
        flagged_reasons: review.flagged_reasons,
        ai_notes: review.ai_notes,
      })
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('AIRank review error:', error)
    return NextResponse.json({ error: 'Review failed' }, { status: 500 })
  }
}
