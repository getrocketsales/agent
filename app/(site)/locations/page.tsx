import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Locations | RocketSales AI Visibility Consulting',
  description: 'RocketSales provides AI Visibility consulting nationwide. Based in Richardson, TX  serving Dallas, Houston, Austin, New York, Los Angeles, Chicago, and all major US markets.',
}

export default async function LocationsPage() {
  const { page } = await getPageData('locations')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const hq = content?.hq || {}
  const markets = content?.markets || {}
  const whyLocal = content?.why_local || {}
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">{hero.badge || 'Locations'}</p>
          <h1 className="text-5xl font-black text-white mb-6">{hero.heading || 'Serving Clients Across the US'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{hero.subheading || ''}</p>
        </div>
      </section>

      {/* HQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-950 to-gray-900 rounded-2xl p-8 text-white text-center">
            <div className="text-4xl mb-3"></div>
            <h2 className="text-2xl font-black text-white mb-2">{hq.heading || 'Headquartered in Richardson, TX'}</h2>
            <p className="text-gray-300 mb-4">{hq.description || ''}</p>
            <div className="text-gray-400 text-sm">
              <p>{hq.phone || '469-769-5855'}  |  {hq.email || 'info@getrocketsales.org'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{markets.heading || 'Markets We Serve'}</h2>
            <p className="text-lg text-gray-600">{markets.subheading || ''}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(markets.cities || []).map((market: any, i: number) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-xl font-black text-gray-900">{market.city}</h3>
                  <span className="text-sm text-gray-500 font-semibold">{market.state}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{market.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center text-gray-500">
            <p>{markets.fallback_text || 'Do not see your city? We serve businesses in all 50 states.'} <Link href="/contact" className="text-purple-700 font-bold hover:underline">Contact us</Link> to discuss your market.</p>
          </div>
        </div>
      </section>

      {/* Why Location Matters */}
      {whyLocal.items && whyLocal.items.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">{whyLocal.heading || 'Why Local AI Visibility Matters'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyLocal.items.map((item: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">{cta.heading || 'Ready to Own Your Market?'}</h2>
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
