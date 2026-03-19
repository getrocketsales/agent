import Link from 'next/link'
export const revalidate = 3600

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | AI Visibility & GEO Insights | RocketSales',
  description: 'Expert insights on AI Visibility, GEO optimization, SEO authority, and AEO strategies for B2B businesses. Stay ahead of AI-driven search.',
}

const WP_API = 'https://getrocketsales.org/wp-json/wp/v2'

interface WPPost {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
}

function stripHtml(html: string) {
  return html.replace(/\*\*/g, '').replace(/<[^>]*>/g, '').replace(/&hellip;/g, '').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function getPosts(page = 1): Promise<{ posts: WPPost[], totalPages: number, total: number }> {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=24&page=${page}&_fields=id,slug,date,title,excerpt`, {
      next: { revalidate: 3600 }
    })
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
    const total = parseInt(res.headers.get('X-WP-Total') || '0')
    const posts = await res.json()
    return { posts, totalPages, total }
  } catch {
    return { posts: [], totalPages: 1, total: 0 }
  }
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1')
  const { posts, totalPages, total } = await getPosts(currentPage)

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">Insights</p>
          <h1 className="text-4xl font-black text-white mb-4">AI Visibility & Search Intelligence</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Expert insights on GEO, AEO, SEO, and AI-driven search for B2B businesses. {total.toLocaleString()} articles and counting.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all block">
                <div className="text-xs text-gray-400 mb-3">{formatDate(post.date)}</div>
                <h2 className="text-base font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-snug">
                  {stripHtml(post.title.rendered)}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {stripHtml(post.excerpt.rendered).slice(0, 160)}
                </p>
                <div className="mt-4 text-purple-700 font-bold text-xs uppercase tracking-wide">Read More </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
              {currentPage > 1 && (
                <Link href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-bold border border-gray-300 rounded-lg hover:border-purple-400 hover:text-purple-700 transition-all">
                   Prev
                </Link>
              )}
              {Array.from({ length: Math.min(9, totalPages) }, (_, i) => {
                let p: number
                if (totalPages <= 9) {
                  p = i + 1
                } else if (currentPage <= 5) {
                  p = i + 1
                } else if (currentPage >= totalPages - 4) {
                  p = totalPages - 8 + i
                } else {
                  p = currentPage - 4 + i
                }
                return (
                  <Link key={p} href={`/blog?page=${p}`}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${p === currentPage
                      ? 'text-white'
                      : 'border border-gray-300 hover:border-purple-400 hover:text-purple-700'}`}
                    style={p === currentPage ? {background:'linear-gradient(135deg,#592b77,#8b4b94)'} : {}}>
                    {p}
                  </Link>
                )
              })}
              {currentPage < totalPages && (
                <Link href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-bold border border-gray-300 rounded-lg hover:border-purple-400 hover:text-purple-700 transition-all">
                  Next 
                </Link>
              )}
            </div>
          )}
          <div className="mt-4 text-center text-sm text-gray-400">
            Page {currentPage} of {totalPages}  {total.toLocaleString()} total articles
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Ready to Apply These Strategies?</h2>
          <p className="text-gray-600 mb-6">Book a free strategy call and we will audit your current AI Visibility score.</p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Book a Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
