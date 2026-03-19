import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Serve | RocketSales Consulting',
  description: 'RocketSales builds AI Visibility for healthcare, legal, home services, and financial services businesses. Industry-specific strategies that deliver results.',
}

const industries = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'AI Visibility for medical practices, clinics, and health services',
    desc: 'Patients increasingly use AI to find providers. We make sure your practice, clinic, or health service is the trusted answer when they search.',
    icon: '',
  },
  {
    slug: 'legal',
    name: 'Legal',
    tagline: 'AI Visibility for law firms and legal professionals',
    desc: 'Legal buyers research extensively before making contact. We position your firm as the authoritative answer in AI tools so qualified prospects find you first.',
    icon: '',
  },
  {
    slug: 'home-services',
    name: 'Home Services',
    tagline: 'AI Visibility for contractors, HVAC, plumbers, and more',
    desc: 'Homeowners use AI to vet service providers. We build your AI presence so your business is the recommended name in your market.',
    icon: '',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    tagline: 'AI Visibility for financial advisors, CPAs, and fintech',
    desc: 'Trust is everything in financial services. We build the authority signals that make AI tools cite your firm when buyers are choosing who to trust with their money.',
    icon: '',
  },
]

export default function IndustriesPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-950 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">Industries</p>
          <h1 className="text-5xl font-black text-white mb-6">We Know Your Market</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generic SEO does not work in competitive, trust-driven industries. We bring deep expertise in your vertical  the language, the buyers, and the AI signals that matter most.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}
                className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-5">{ind.icon}</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{ind.name}</h2>
                <p className="text-purple-600 font-semibold mb-3">{ind.tagline}</p>
                <p className="text-gray-600 leading-relaxed">{ind.desc}</p>
                <div className="mt-5 text-purple-700 font-bold text-sm uppercase tracking-wide">Learn More </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Do Not See Your Industry?</h2>
          <p className="text-lg text-gray-600 mb-8">We work with B2B businesses across many verticals. If your market is competitive and trust-driven, AI Visibility matters  and we can help.</p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Talk to Us About Your Industry
          </Link>
        </div>
      </section>
    </>
  )
}
