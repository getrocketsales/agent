import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Industries We Serve | AI Visibility by Industry | RocketSales',
  description: 'AI visibility strategies tailored for your industry. We serve financial services, healthcare, home services, and legal professionals.',
}

export default async function IndustriesPage() {
  const { page } = await getPageData('industries')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const industries = content?.industries || []
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">{hero.badge || 'Industries'}</p>
          <h1 className="text-5xl font-black text-white mb-6">{hero.heading || 'AI Visibility Strategies by Industry'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{hero.description || ''}</p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind: any) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}
                className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${ind.color} text-2xl mb-5`}>
                  {ind.icon}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{ind.name}</h2>
                <p className="text-purple-600 font-semibold mb-3">{ind.tagline}</p>
                <p className="text-gray-600 leading-relaxed">{ind.description}</p>
                <div className="mt-5 text-purple-700 font-bold text-sm uppercase tracking-wide">Learn More</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">{cta.heading || "Don't See Your Industry?"}</h2>
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
