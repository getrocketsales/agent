import Link from 'next/link'
import { Metadata } from 'next'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Pricing | RocketSales AI Visibility Consulting',
  description: 'RocketSales pricing plans for AI Visibility, GEO Optimization, SEO Authority, and AEO services. Transparent monthly pricing for B2B businesses.',
}

export default async function PricingPage() {
  const { page, faqs } = await getPageData('pricing')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const plans = content?.plans || []
  const custom = content?.custom || {}
  const faqHeading = content?.faq_heading || 'Pricing FAQs'

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">{hero.badge || 'Pricing'}</p>
          <h1 className="text-5xl font-black text-white mb-6">{hero.heading || 'Simple, Transparent Pricing'}</h1>
          <p className="text-xl text-gray-300">{hero.subheading || ''}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan: any) => (
              <div key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-purple-900 to-gray-900 text-white shadow-2xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}>
                {plan.highlight && (
                  <div className="text-xs font-black text-orange-400 uppercase tracking-widest mb-3">Most Popular</div>
                )}
                <h2 className={`text-2xl font-black mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{plan.desc}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {(plan.features || []).map((f: string, i: number) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-green-400 font-bold mt-0.5"></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl transition-all text-center ${
                    plan.highlight
                      ? 'bg-orange-500 hover:bg-orange-400 text-white'
                      : 'text-white hover:opacity-90'
                  }`}
                  style={!plan.highlight ? {background:'linear-gradient(135deg,#592b77,#8b4b94)'} : {}}>
                  {plan.cta || 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-3">{custom.heading || 'Need Something Custom?'}</h2>
          <p className="text-gray-600 mb-6">{custom.description || ''}</p>
          <Link href={custom.button_url || '/contact'}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            {custom.button_text || 'Contact Us for Custom Pricing'}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">{faqHeading}</h2>
            <div className="space-y-6">
              {faqs.map((faq: any, i: number) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
