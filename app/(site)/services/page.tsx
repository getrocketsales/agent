import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AI Visibility Services | RocketSales Consulting',
  description: 'Full-stack AI visibility services: AI Visibility, GEO, SEO Authority, and AEO. Get found by ChatGPT, Perplexity, Gemini, and Google.',
}

export default async function ServicesPage() {
  const { page } = await getPageData('services')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const services = content?.services || []
  const stack = content?.stack || {}
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">{hero.badge || 'Our Services'}</p>
          <h1 className="text-5xl font-black text-white mb-6">{hero.heading || 'AI Visibility Services Built for Revenue'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{hero.description || ''}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc: any) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`}
                className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${svc.color} text-2xl mb-5`}>
                  {svc.icon}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{svc.name}</h2>
                <p className="text-purple-600 font-semibold mb-3">{svc.tagline}</p>
                <p className="text-gray-600 leading-relaxed">{svc.description}</p>
                <div className="mt-5 text-purple-700 font-bold text-sm uppercase tracking-wide">Learn More </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How They Work Together */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-6">{stack.heading || 'The Full AI Visibility Stack'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">{stack.description || ''}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={cta.button_url || '/contact'}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl transition-all hover:opacity-90"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              {cta.button_text || 'Book a Free Strategy Call'}
            </Link>
            <Link href={cta.secondary_url || '/pricing'}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 border-2 border-gray-300 rounded-xl hover:border-purple-400 transition-all">
              {cta.secondary_text || 'View Pricing'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
