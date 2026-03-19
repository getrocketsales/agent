import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Visibility Services | RocketSales Consulting',
  description: 'RocketSales offers AI Visibility, GEO Optimization, SEO Authority, and AEO services to help B2B businesses dominate AI-driven search.',
}

const services = [
  {
    slug: 'ai-visibility',
    name: 'AI Visibility',
    tagline: 'Get cited by AI tools like ChatGPT, Perplexity, and Gemini',
    description: 'We engineer your brand\'s presence into the AI answer layer  so when buyers ask AI tools about your category, your name comes up. AIRank-powered tracking shows exactly where you stand.',
    icon: '',
    color: 'from-purple-600 to-purple-800',
  },
  {
    slug: 'geo-optimization',
    name: 'GEO Optimization',
    tagline: 'Generative Engine Optimization for the AI search era',
    description: 'GEO is the discipline of optimizing your content and authority so generative AI engines consistently surface your brand in responses. We build the signals that make AI engines trust you.',
    icon: '',
    color: 'from-blue-600 to-blue-800',
  },
  {
    slug: 'seo-authority',
    name: 'SEO Authority',
    tagline: 'Dominate traditional and AI-powered search results',
    description: 'Technical SEO, content strategy, and link authority  the foundational signals that feed both Google rankings and AI training data. A high-authority site wins everywhere.',
    icon: '',
    color: 'from-green-600 to-green-800',
  },
  {
    slug: 'aeo-optimization',
    name: 'AEO Optimization',
    tagline: 'Answer Engine Optimization  own the featured answers',
    description: 'Structure your content to win featured snippets, People Also Ask boxes, and AI-generated answers. AEO turns your expertise into the definitive answer buyers find first.',
    icon: '',
    color: 'from-orange-500 to-orange-700',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">Our Services</p>
          <h1 className="text-5xl font-black text-white mb-6">AI Search Dominance,<br />End to End</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Four integrated services that work together to make your brand the trusted answer in AI-powered search  for every buyer, in every channel.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc) => (
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
          <h2 className="text-3xl font-black text-gray-900 mb-6">The Full AI Visibility Stack</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Most agencies pick one lane. We build a complete system. SEO Authority provides the foundation. AEO structures your answers. GEO trains AI engines to trust you. AI Visibility tracks and amplifies your citation rate  all measured by AIRank.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl transition-all hover:opacity-90"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Book a Free Strategy Call
            </Link>
            <Link href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 border-2 border-gray-300 rounded-xl hover:border-purple-400 transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
