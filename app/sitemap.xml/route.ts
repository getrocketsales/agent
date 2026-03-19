import { NextResponse } from 'next/server'

const BASE = 'https://agent.getrocketsales.org'
const WP_API = 'https://getrocketsales.org/wp-json/wp/v2'

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
  { url: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/ai-visibility', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/geo-optimization', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/seo-authority', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/aeo-optimization', priority: '0.8', changefreq: 'monthly' },
  { url: '/industries', priority: '0.7', changefreq: 'monthly' },
  { url: '/industries/healthcare', priority: '0.7', changefreq: 'monthly' },
  { url: '/industries/legal', priority: '0.7', changefreq: 'monthly' },
  { url: '/industries/home-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/industries/financial-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations', priority: '0.7', changefreq: 'monthly' },
]

async function getAllPostSlugs(): Promise<Array<{ slug: string, date: string }>> {
  const slugs: Array<{ slug: string, date: string }> = []
  let page = 1
  while (true) {
    try {
      const res = await fetch(`${WP_API}/posts?per_page=100&page=${page}&_fields=slug,date`, { next: { revalidate: 3600 } })
      if (!res.ok) break
      const posts = await res.json()
      if (!posts?.length) break
      slugs.push(...posts.map((p: { slug: string; date: string }) => ({ slug: p.slug, date: p.date })))
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
      if (page >= totalPages) break
      page++
    } catch { break }
  }
  return slugs
}

export async function GET() {
  const posts = await getAllPostSlugs()
  const staticXml = staticPages.map(p => `  <url><loc>${BASE}${p.url}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`).join('\n')
  const postXml = posts.map(p => `  <url><loc>${BASE}/blog/${p.slug}</loc><lastmod>${p.date.split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticXml}\n${postXml}\n</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } })
}
