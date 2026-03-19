import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function Page() {
  const { page } = await getPageData('industries-home-services')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const painPoints = content?.painPoints || []
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">{hero.badge || ''}</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">{hero.heading || ''}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {hero.description || ''}
          </p>
          <Link href={hero.cta_url || '/contact'}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            {hero.cta_text || 'Get Started'}
          </Link>
        </div>
      </section>

      {/* Pain Points / Why Section */}
      {painPoints.length > 0 && (
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Why AI Visibility Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((pp: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{pp.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-950 to-gray-950 text-white text-center">
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
