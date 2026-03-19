import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { auditPage } from '@/lib/airank/engine'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// WordPress and asset junk patterns to skip
const SKIP_PATTERNS = [
  /\.(woff|woff2|ttf|eot|otf|css|js|png|jpg|jpeg|gif|svg|ico|xml|zip|pdf|mp4|mp3|webp|avif)$/i,
  /\/wp-content\//i,
  /\/wp-includes\//i,
  /\/wp-json\//i,
  /\/wp-admin\//i,
  /\/feed\/?$/i,
  /\/comments\/feed\/?$/i,
  /\/trackback\/?$/i,
  /\/xmlrpc\.php/i,
  /\/sitemap/i,
  /\/robots\.txt/i,
  /\?/,  // skip URLs with query strings
  /#/,   // skip anchor links
]

function shouldSkipUrl(url: string): boolean {
  return SKIP_PATTERNS.some(p => p.test(url))
}

function extractTextFromHtml(html: string): string {
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.slice(0, 3000)
}

function extractMetaTitle(html: string, fallback: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return match ? match[1].trim() : fallback
}

function extractMetaDescription(html: string): string {
  const match =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
  return match ? match[1].trim() : ''
}

function extractInternalLinks(html: string, baseUrl: string): string[] {
  const origin = new URL(baseUrl).origin
  const linkRegex = /href=["']([^"']+)["']/gi
  const links: Set<string> = new Set()
  let match
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim()
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) continue
    try {
      const full = href.startsWith('http') ? href : new URL(href, baseUrl).href
      if (full.startsWith(origin) && !shouldSkipUrl(full)) {
        links.add(full)
      }
    } catch {}
  }
  return Array.from(links)
}

function inferPageType(slug: string): string {
  if (slug === '/' || slug === '') return 'home'
  if (/service|offer|solution/i.test(slug)) return 'service page'
  if (/about|team|story/i.test(slug)) return 'about page'
  if (/contact|get-in-touch|reach/i.test(slug)) return 'contact page'
  if (/blog|post|article|news/i.test(slug)) return 'blog post'
  if (/location|area|city|region/i.test(slug)) return 'location page'
  if (/faq|question/i.test(slug)) return 'faq page'
  if (/pricing|plan|cost/i.test(slug)) return 'pricing page'
  return 'service page'
}

export const maxDuration = 300 // 5 min timeout for Vercel; ignored on VPS but good practice

export async function POST(req: NextRequest) {
  try {
    const { business_id, site_url, max_pages = 10 } = await req.json()

    if (!business_id || !site_url) {
      return NextResponse.json({ error: 'business_id and site_url required' }, { status: 400 })
    }

    const results: { slug: string; status: string; airank_score?: number; error?: string }[] = []

    // Step 1: Fetch homepage
    console.log(`[Crawl] Starting crawl of ${site_url}`)
    let homepageHtml = ''
    try {
      const homeRes = await fetch(site_url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RocketSalesBot/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(15000),
        redirect: 'follow',
      })
      if (!homeRes.ok) {
        return NextResponse.json({ error: `Site returned ${homeRes.status}: ${site_url}` }, { status: 500 })
      }
      const contentType = homeRes.headers.get('content-type') || ''
      if (!contentType.includes('text/html')) {
        return NextResponse.json({ error: `Site did not return HTML (got: ${contentType})` }, { status: 500 })
      }
      homepageHtml = await homeRes.text()
    } catch (err: any) {
      return NextResponse.json({ error: `Failed to fetch site: ${err.message}` }, { status: 500 })
    }

    // Step 2: Discover internal links  filter junk
    const baseOrigin = new URL(site_url).origin
    const discovered = extractInternalLinks(homepageHtml, site_url)
    const allLinks = [baseOrigin + '/', ...discovered]
    const uniqueLinks = [...new Set(allLinks)]
      .filter(url => !shouldSkipUrl(url))
      .slice(0, max_pages)

    console.log(`[Crawl] Found ${uniqueLinks.length} valid pages to audit`)

    // Step 3: For each page  fetch, extract, upsert, audit
    for (const pageUrl of uniqueLinks) {
      let urlObj: URL
      try { urlObj = new URL(pageUrl) } catch { continue }
      const slug = urlObj.pathname || '/'

      // Skip known junk slugs
      if (shouldSkipUrl(slug)) {
        console.log(`[Crawl] Skipping junk URL: ${slug}`)
        continue
      }

      try {
        console.log(`[Crawl] Fetching ${pageUrl}`)
        const res = await fetch(pageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RocketSalesBot/1.0)',
            'Accept': 'text/html,application/xhtml+xml',
          },
          signal: AbortSignal.timeout(12000),
          redirect: 'follow',
        })

        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('text/html')) {
          console.log(`[Crawl] Skipping non-HTML: ${pageUrl} (${contentType})`)
          continue
        }

        const html = await res.text()
        const title = extractMetaTitle(html, slug)
        const meta_title = title
        const meta_description = extractMetaDescription(html)
        const content = extractTextFromHtml(html)
        const page_type = inferPageType(slug)

        // Skip pages with basically no content
        if (content.trim().length < 50) {
          console.log(`[Crawl] Skipping low-content page: ${slug}`)
          continue
        }

        // Upsert page into Supabase
        const { data: existingPage } = await supabase
          .from('pages')
          .select('id')
          .eq('business_id', business_id)
          .eq('slug', slug)
          .single()

        let pageId: string

        if (existingPage) {
          await supabase.from('pages').update({
            title, meta_title, meta_description,
            content: { text: content }, page_type,
          }).eq('id', existingPage.id)
          pageId = existingPage.id
        } else {
          const { data: newPage, error: insertErr } = await supabase
            .from('pages').insert({
              business_id, slug, title, meta_title, meta_description,
              content: { text: content }, page_type, status: 'published',
            }).select('id').single()

          if (insertErr || !newPage) {
            console.error(`[Crawl] Insert error for ${slug}:`, insertErr?.message)
            results.push({ slug, status: 'error', error: insertErr?.message || 'Insert failed' })
            continue
          }
          pageId = newPage.id
        }

        // Run AIRank audit
        const audit = await auditPage({
          page_slug: slug, title, meta_title, meta_description, content, page_type,
        })

        // Save scores to page
        await supabase.from('pages').update({
          airank_score: audit.overall_score,
          geo_score: audit.geo_score,
          seo_score: audit.seo_score,
          aeo_score: audit.aeo_score,
          ai_score: audit.ai_score,
          last_audited_at: new Date().toISOString(),
        }).eq('id', pageId)

        // Save review
        await supabase.from('airank_reviews').insert({
          business_id, page_slug: slug,
          reviewed_by: 'crawl-bot', role: 'auto',
          original_content: content,
          revised_content: audit.revised_content || null,
          geo_score: audit.geo_score, seo_score: audit.seo_score,
          aeo_score: audit.aeo_score, ai_score: audit.ai_score,
          overall_score: audit.overall_score,
          status: audit.status,
          flagged_reasons: audit.flagged_reasons,
          ai_notes: audit.ai_notes,
        })

        results.push({ slug, status: audit.status, airank_score: audit.overall_score })
        console.log(`[Crawl] ${slug}  ${audit.status} (${audit.overall_score})`)

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 300))

      } catch (pageErr: any) {
        console.error(`[Crawl] Error on ${pageUrl}:`, pageErr.message)
        results.push({ slug, status: 'error', error: pageErr.message })
      }
    }

    const scoredResults = results.filter(r => r.airank_score !== undefined)
    const avgScore = scoredResults.length > 0
      ? Math.round(scoredResults.reduce((a, r) => a + (r.airank_score || 0), 0) / scoredResults.length)
      : 0

    console.log(`[Crawl] Done. ${results.length} pages. Avg: ${avgScore}`)

    return NextResponse.json({
      success: true,
      pages_crawled: results.length,
      average_score: avgScore,
      results,
    })

  } catch (error: any) {
    console.error('[Crawl] Fatal error:', error.message)
    return NextResponse.json({ error: 'Crawl failed', detail: error.message }, { status: 500 })
  }
}
