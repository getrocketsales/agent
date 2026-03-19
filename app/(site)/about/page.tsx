import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About RocketSales Consulting | AI Visibility for B2B Growth',
  description: 'RocketSales is a nationwide AI visibility consulting firm based in Richardson, TX. We help B2B businesses dominate AI search through AIRank-powered strategies.',
}

export default async function AboutPage() {
  const { page } = await getPageData('about')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const story = content?.story || {}
  const values = content?.values || {}
  const location = content?.location || {}
  const cta = content?.cta || {}

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">{hero.badge || 'About Us'}</p>
          <h1 className="text-5xl font-black text-white mb-6">{hero.heading || 'About RocketSales'}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {hero.subheading || ''}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">{story.heading || 'Our Story'}</h2>
              {(story.paragraphs || []).map((p: string, i: number) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
            <div className="bg-gradient-to-br from-purple-950 to-gray-900 rounded-2xl p-8 text-white">
              <div className="text-orange-400 text-5xl font-black mb-1">{story.founder_name || 'Ron Mitchell'}</div>
              <div className="text-gray-300 font-bold mb-6">{story.founder_title || 'Owner, RocketSales Consulting'}</div>
              <blockquote className="text-gray-300 italic leading-relaxed border-l-4 border-purple-500 pl-4">
                &ldquo;{story.founder_quote || ''}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values / How We Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{values.heading || 'How We Work'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{values.subheading || 'The principles behind every engagement.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(values.items || []).map((v: any, i: number) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">{location.heading || 'Based in Richardson, TX. Serving Clients Nationwide.'}</h2>
          <p className="text-lg text-gray-600 mb-4">{location.description || ''}</p>
          <div className="mt-4 text-gray-500">
            <p> {location.address || 'Richardson, TX'}  |   <a href={`tel:${location.phone || '4697695855'}`} className="hover:text-purple-700 transition-colors">{location.phone ? location.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : '469-769-5855'}</a>  |   <a href={`mailto:${location.email || 'info@getrocketsales.org'}`} className="hover:text-purple-700 transition-colors">{location.email || 'info@getrocketsales.org'}</a></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">{cta.heading || 'Ready to Work Together?'}</h2>
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
