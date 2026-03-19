import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const WP_API = 'https://getrocketsales.org/wp-json/wp/v2'

interface WPPost {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
}

function stripHtml(html: string) {
  return html.replace(/\*\*/g, '').replace(/<[^>]*>/g, '').replace(/&hellip;/g, '').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_fields=id,slug,date,title,excerpt,content`, {
      next: { revalidate: 3600 }
    })
    const posts = await res.json()
    return posts?.[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-950 to-purple-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6 inline-block">
             Back to Blog
          </Link>
          <div className="text-xs text-gray-400 mb-4">{formatDate(post.date)}</div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {stripHtml(post.title.rendered)}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-purple-700 prose-strong:text-gray-900 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-4">Ready to Dominate AI Search?</h2>
          <p className="text-gray-300 mb-8">Book a free 15-minute strategy call and get your AIRank score.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Book a Free Strategy Call
            </Link>
            <Link href="/blog"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:border-purple-400 transition-all">
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
