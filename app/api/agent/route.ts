import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60 // 60 second timeout for Vercel/Next.js

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://absplano.app.n8n.cloud/webhook/claude-memory'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 55000) // 55s timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Agent API error:', error)
    const isTimeout = error instanceof Error && error.name === 'AbortError'
    return NextResponse.json(
      { error: isTimeout ? 'Request timed out  please try again' : 'Failed to get response from agent' },
      { status: isTimeout ? 504 : 500 }
    )
  }
}
