import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function Page() {
  const { page, faqs: pageFaqs } = await getPageData('services-seo-authority')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const features = content?.features || {}
  const featureItems = features.items || []
  const stats = content?.stats || []
  const why = content?.why || {}
  const contentFaqs = content?.faqs || []
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-950 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-green-400 uppercase tracking-widest mb-3">{hero.badge || ''}</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">{hero.heading || ''}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {hero.description || ''}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={hero.cta_url || '/contact'}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              {hero.cta_text || 'Get Started'}
            </Link>
            {hero.secondary_url && (
              <Link href={hero.secondary_url}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-purple-400 transition-all">
                {hero.secondary_text || ''}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      {featureItems.length > 0 && (
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{features.heading || ''}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{features.description || ''}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((f: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="bg-green-100 text-green-700 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm mb-4">{i + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Stats */}
      {stats.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {why.heading && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">{why.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{why.description || ''}</p>
            </div>
          )}
          <div className="bg-gradient-to-br from-green-950 to-gray-900 rounded-2xl p-8 text-white">
            {stats.map((s: any, i: number) => (
              <div key={i} className="text-center mb-6 last:mb-0">
                <div className="text-4xl font-black text-orange-400 mb-2">{s.value}</div>
                <div className="text-white font-bold mb-4">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FAQ */}
      {contentFaqs.length > 0 && (
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {contentFaqs.map((faq: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">{cta.heading || ''}</h2>
          <p className="text-gray-300 text-lg mb-8">{cta.description || ''}</p>
          <Link href={cta.button_url || '/contact'}
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            {cta.button_text || 'Book a Free Strategy Call'}
          </Link>
        </div>
      </section>
    </>
  )
}
