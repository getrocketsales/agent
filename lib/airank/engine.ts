import { siteConfig } from '@/lib/config'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const MODEL = 'anthropic/claude-sonnet-4-5'

async function callOpenRouter(system: string, userMessage: string, maxTokens: number = 2000): Promise<string> {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://agent.getrocketsales.org',
      'X-Title': 'RocketSales AIRank Engine',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMessage }
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} ${error}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

export interface AIRankReview {
  status: 'APPROVED' | 'NEEDS_EDIT' | 'FLAGGED'
  geo_score: number
  seo_score: number
  aeo_score: number
  ai_score: number
  overall_score: number
  flagged_reasons: string[]
  ai_notes: string
  revised_content?: string
}

export interface AIRankAudit {
  page_slug: string
  title: string
  meta_title: string
  meta_description: string
  content: string
  page_type: string
}

export async function reviewContent(
  original: string,
  context: string = ''
): Promise<AIRankReview> {
  const systemPrompt = `You are the AIRank Guardian for RocketSales Consulting. Your job is to review content changes and score them across 4 pillars. Always respond with valid JSON only  no markdown, no explanation outside JSON.

Scoring rubric (0-100 each):
GEO: Local/geographic signals, NAP consistency, service area relevance, location keywords
SEO: Keyword intent, meta quality, heading structure, readability, internal linking signals
AEO: Answer-friendly format, FAQ structure, featured snippet potential, question targeting
AI Visibility: Entity clarity, structured data signals, authoritative tone, AI citation potential

Status rules:
- APPROVED: all scores >= 70, overall >= 75
- NEEDS_EDIT: any score 50-69 OR overall 60-74 (provide revised_content)
- FLAGGED: any score < 50 OR content harmful to brand/rankings

Return this exact JSON structure with no other text:
{"status":"APPROVED","geo_score":0,"seo_score":0,"aeo_score":0,"ai_score":0,"overall_score":0,"flagged_reasons":[],"ai_notes":"string"}`

  const userMessage = `${context ? `Context: ${context}\n\n` : ''}Review this content for AIRank optimization:\n\n${original}`

  const text = await callOpenRouter(systemPrompt, userMessage, 2000)

  const cleanText = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()

  try {
    return JSON.parse(cleanText) as AIRankReview
  } catch {
    return {
      status: 'FLAGGED',
      geo_score: 0,
      seo_score: 0,
      aeo_score: 0,
      ai_score: 0,
      overall_score: 0,
      flagged_reasons: ['AI review parse error  manual review required'],
      ai_notes: text,
    }
  }
}

export async function auditPage(audit: AIRankAudit): Promise<AIRankReview> {
  const content = `Page: ${audit.page_slug}\nTitle: ${audit.title}\nMeta Title: ${audit.meta_title}\nMeta Description: ${audit.meta_description}\nPage Type: ${audit.page_type}\nContent: ${audit.content}`
  return reviewContent(content, `Full page audit for ${audit.page_slug}`)
}

export async function generatePageContent(prompt: string, pageType: string): Promise<string> {
  const systemPrompt = `You are an AI content writer for RocketSales Consulting. You create AIRank-optimized content that scores highly across GEO, SEO, AEO, and AI Visibility.
Business: ${siteConfig.name}
Owner: ${siteConfig.owner}
Phone: ${siteConfig.phone}
Services: ${siteConfig.services.join(', ')}
Always write in a professional, authoritative tone that positions RocketSales as the nationwide leader in AI visibility consulting.`

  const userMessage = `Create ${pageType} content for: ${prompt}\n\nRequirements:\n- Optimized for GEO, SEO, AEO, and AI Visibility (AIRank)\n- Include natural keyword placement\n- Structure for featured snippets where possible\n- Professional B2B tone\n- Include a FAQ section at the end`

  return callOpenRouter(systemPrompt, userMessage, 4000)
}
