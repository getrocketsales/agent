import { NextRequest, NextResponse } from 'next/server'
import { generatePageContent } from '@/lib/airank/engine'

export async function POST(req: NextRequest) {
  try {
    const { prompt, pageType } = await req.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }
    const content = await generatePageContent(prompt, pageType || 'service page')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
