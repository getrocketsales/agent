import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getSiteData } from '@/lib/supabase/fetch-site-data'

export const revalidate = 3600 // revalidate every hour

export const metadata: Metadata = {
  title: 'RocketSales | AI Visibility, GEO & SEO for B2B Growth',
  description: 'RocketSales helps B2B companies cut through the noise with AI-powered visibility. Using advanced platforms like ChatGPT, Gemini, and proprietary GEO strategies, we position your brand where modern buyers are searching.',
  openGraph: {
    title: 'RocketSales | AI Visibility, GEO & SEO for B2B Growth',
    description: 'RocketSales helps B2B companies cut through the noise with AI-powered visibility.',
    url: 'https://agent.getrocketsales.org',
    siteName: 'RocketSales',
    type: 'website',
  },
}

export default async function HomePage() {
  const { site, faqs, services, pricingTiers, testimonials } = await getSiteData()

  const settings = site?.settings || {}
  const phone = settings.phone || '+14697695855'
  const founder = settings.founder || 'Ron Mitchell'
  const tagline = settings.tagline || 'AI Visibility, GEO & SEO for B2B Growth'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site?.name || 'RocketSales',
    url: 'https://agent.getrocketsales.org',
    logo: 'https://agent.getrocketsales.org/logo.png',
    description: site?.tagline || tagline,
    founder: { '@type': 'Person', name: founder },
    telephone: phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Richardson', addressRegion: 'TX', addressCountry: 'US' },
    sameAs: ['https://getrocketsales.org'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
      }) }} />

      {/* HERO */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-6">
                <span className="w-2 h-2 rounded-full" style={{background:'#592b77'}}></span>
                <span className="text-sm font-medium text-gray-700">Trusted by Growing B2B Companies</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">
                Stand Out With{' '}
                <span style={{background:'linear-gradient(135deg,#e05c2a,#f97316)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  AI-Fueled
                </span>
                <br />Visibility
              </h1>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed font-semibold uppercase tracking-wide text-sm" style={{color:'#592b77'}}>
                Boost SEO, GEO, and AI-Driven Visibility to Increase Traffic and Market Impact.
              </p>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                RocketSales helps your company cut through the noise and win with AI-powered visibility. Using advanced platforms like ChatGPT, Gemini, and our proprietary Generative Engine Optimization (GEO), we position your brand where modern buyers are actually searching and engaging.
              </p>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                We replace outdated prospecting with intelligent, AI-driven SEO and GEO strategies that actively identify and connect with real decision-makers. Our systems continuously analyze search trends, AI discovery patterns, and buyer intent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105" style={{background:'linear-gradient(135deg,#e05c2a,#f97316)'}}>
                  Book a Free 15-Minute Consultation
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold rounded-lg border-2 transition-all hover:opacity-90" style={{borderColor:'#592b77',color:'#592b77'}}>
                  How Does It Work?
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <Image
                  src="/circle-salesteam.png"
                  alt="AI Agent Team solving a problem"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER WITH AI */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Deliver with AI</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered solutions help B2B companies dominate search visibility and generate qualified leads through cutting-edge technology.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service: any, i: number) => {
              const icons = ['', '', '', '']
              return (
                <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-4">{service.icon || icons[i % 4]}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.short_description || service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* IMPOSSIBLE TO IGNORE */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Impossible to Ignore</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We don&apos;t just optimize for search engines  we make sure your brand shows up in AI-generated answers, voice search results, and every digital touchpoint that matters.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '93%', label: 'of online experiences begin with a search engine or AI assistant' },
              { num: '75%', label: 'of B2B buyers use AI tools to research solutions before contacting sales' },
              { num: '60%', label: 'of clicks go to the top 3 organic results on search engines' },
              { num: '10x', label: 'more qualified leads from AI-optimized content vs traditional methods' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-5xl font-black mb-3" style={{color:'#592b77'}}>{stat.num}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#f9f5ff,#fff7f3)'}}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <blockquote className="text-2xl sm:text-3xl font-medium text-gray-800 italic leading-relaxed">
            &ldquo;In today&apos;s AI-driven world, visibility isn&apos;t optional  it&apos;s survival. We help businesses become the answer, not just another option.&rdquo;
          </blockquote>
          <p className="mt-6 text-lg font-semibold" style={{color:'#592b77'}}> {founder}, Founder of RocketSales</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business. All plans include our core AI visibility technology.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier: any) => (
              <div key={tier.id} className={`rounded-2xl p-8 ${tier.is_featured ? 'bg-gradient-to-b from-purple-50 to-orange-50 border-2 border-purple-200 shadow-lg relative' : 'bg-gray-50 border border-gray-200'}`}>
                {tier.is_featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{background:'linear-gradient(135deg,#592b77,#e05c2a)'}}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {(tier.features || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.is_featured ? '/pricing' : (tier.name === 'Custom' ? '/contact' : '/pricing')}
                  className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all ${
                    tier.is_featured
                      ? 'text-white hover:opacity-90'
                      : 'border-2 hover:opacity-80'
                  }`}
                  style={tier.is_featured ? {background:'linear-gradient(135deg,#592b77,#e05c2a)'} : {borderColor:'#592b77', color:'#592b77'}}
                >
                  {tier.name === 'Custom' ? 'Contact Us' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400"></span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.author_name}</p>
                  <p className="text-sm text-gray-500">{t.author_title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RON MITCHELL BIO */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <Image
                  src="/ron-mitchell.jpg"
                  alt="Ron Mitchell - Founder of RocketSales"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet {founder}</h2>
              <p className="text-lg font-semibold mb-4" style={{color:'#592b77'}}>Founder & CEO of RocketSales</p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over 20 years in B2B sales, marketing, and technology, Ron Mitchell founded RocketSales to bridge the gap between traditional sales strategies and the AI revolution transforming how businesses are discovered online.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Ron has led sales teams, built CRM systems, and developed AI-powered solutions that have generated millions in revenue for clients across healthcare, technology, and professional services.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                His vision for RocketSales is simple: make every B2B company visible, credible, and impossible to ignore in the age of AI.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3" style={{color:'#592b77'}}>
                Learn More About Ron 
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq: any) => (
              <details key={faq.id} className="bg-white rounded-xl shadow-sm">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-purple-700 transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#592b77,#7c3d9e)'}}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Become Impossible to Ignore?</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Book a free 15-minute strategy call and discover how AI-powered visibility can transform your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105" style={{background:'linear-gradient(135deg,#e05c2a,#f97316)'}}>
              Book Your Free Strategy Call
            </Link>
            <Link href={`tel:${phone}`} className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white rounded-lg border-2 border-white/30 transition-all hover:bg-white/10">
              Call {phone}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
