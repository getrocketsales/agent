import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Authority Building | RocketSales Consulting',
  description: 'Build the SEO authority that feeds both Google rankings and AI model trust. Technical SEO, content strategy, and link building for B2B businesses.',
}

const features = [
  { title: 'Technical SEO Audit & Fixes', desc: 'Full crawl analysis, Core Web Vitals optimization, schema markup, site architecture, and indexability  the foundation everything else depends on.' },
  { title: 'Content Strategy & Creation', desc: 'We build topic authority through a structured content calendar targeting high-value queries your buyers use at every stage of the funnel.' },
  { title: 'Link Authority Campaign', desc: 'Strategic link acquisition from relevant, high-authority sources that build your domain trust and feed AI model confidence.' },
  { title: 'Local SEO & GBP', desc: 'Google Business Profile optimization, local citation building, and geo-targeted content for businesses serving specific markets.' },
  { title: 'Competitor Gap Analysis', desc: 'We identify exactly what your competitors rank for that you do not  and build a systematic plan to close those gaps.' },
  { title: 'Monthly Performance Reporting', desc: 'Rankings, traffic, and conversion data every month with clear commentary on what changed and what we are doing about it.' },
]

export default function SEOAuthorityPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-green-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-green-400 uppercase tracking-widest mb-3">SEO Authority</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">The SEO Foundation That Wins Everywhere</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Strong SEO authority is the foundation of both Google rankings and AI model trust. We build the technical, content, and link signals that make your brand impossible to ignore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Get a Free SEO Audit
            </Link>
            <Link href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-green-400 transition-all">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">What SEO Authority Includes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Technical, content, and link-building  all three pillars, all working together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-black text-sm mb-4">{i + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">SEO Is the Root. AI Visibility Is the Branch.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">AI models are trained on web content. The sites with the most authority, trust, and comprehensive coverage are the ones AI models learn to cite. Build strong SEO authority and you build the root system that every other channel draws from.</p>
              <p className="text-gray-600 leading-relaxed">Our clients who invest in SEO Authority see faster results across all our other services  because everything compounds on a strong foundation.</p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Organic traffic growth', value: 'avg. +180% in 12 months' },
                { label: 'Domain rating improvement', value: 'avg. +22 DR in 6 months' },
                { label: 'AI citation increase', value: 'avg. 3.4x after SEO foundation' },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-xl font-black text-purple-700">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">Ready to Build Real SEO Authority?</h2>
          <p className="text-gray-300 text-lg mb-8">Book a free audit and see exactly where your SEO stands  and what it would take to dominate your market.</p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Book a Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
