import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Visibility for Healthcare | RocketSales Consulting',
  description: 'AI Visibility for medical practices, clinics, and healthcare businesses. Get cited by AI when patients search for providers in your specialty.',
}

const painPoints = [
  { title: 'Patients Use AI to Find Providers', desc: 'More patients now ask ChatGPT or Perplexity "best [specialty] in [city]" before ever visiting a hospital website. If you are not in those answers, you are losing patients to competitors who are.' },
  { title: 'Trust Signals Are Critical in Healthcare', desc: 'AI models cite providers that demonstrate consistent authority  credentials, publications, patient reviews, and comprehensive educational content all factor in.' },
  { title: 'Local Competition Is Fierce', desc: 'Healthcare is hyperlocal. We build geo-targeted AI visibility so your practice dominates searches in your specific market area.' },
  { title: 'Compliance-Aware Content Strategy', desc: 'We understand HIPAA implications and create authority-building content that never compromises compliance.' },
]

export default function HealthcarePage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-teal-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-3">Healthcare</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">AI Visibility for Healthcare Practices</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            When patients ask AI tools which provider to choose, your practice should be the answer. We build the authority, content, and signals that make healthcare AI search work in your favor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Get a Free Healthcare AI Audit
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">The Healthcare AI Visibility Challenge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Our Healthcare AI Visibility Approach</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>We start with an AIRank audit specific to your specialty and geography  running the exact queries patients use when searching for a provider like you. Most practices are shocked at how often their competitors are cited and they are not.</p>
            <p className="mt-4">From there, we build a structured content program that answers patient questions authoritatively, establishes your clinical credentials, and builds the entity signals that AI models use to verify expertise. Combined with local SEO and GBP optimization, this creates a complete AI visibility system.</p>
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
