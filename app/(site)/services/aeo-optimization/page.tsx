import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AEO Optimization | Answer Engine Optimization | RocketSales',
  description: 'Answer Engine Optimization (AEO) structures your content to win featured snippets, People Also Ask, and AI-generated answers. Own the definitive answer in your market.',
}

const features = [
  { title: 'Question & Answer Mapping', desc: 'We identify every question your buyers ask at every stage of the funnel and create structured, authoritative answers your brand owns.' },
  { title: 'Featured Snippet Targeting', desc: 'We optimize content specifically to win featured snippets  the zero-click answers that appear at the top of search results and feed AI responses.' },
  { title: 'FAQ Schema Implementation', desc: 'Structured data markup that makes your answers machine-readable by search engines and AI tools.' },
  { title: 'People Also Ask Domination', desc: 'We build content that captures PAA boxes  expanding your presence across entire topic clusters, not just single queries.' },
  { title: 'Voice Search Optimization', desc: 'Natural language answers optimized for voice assistants that pull directly from featured snippets and structured content.' },
  { title: 'AEO Performance Tracking', desc: 'Monitor your featured snippet wins, PAA appearances, and answer engine citation rate with monthly reporting.' },
]

const faqs = [
  { q: 'What is Answer Engine Optimization (AEO)?', a: 'AEO is the practice of structuring your content so it wins the "answer" position in search  featured snippets, People Also Ask boxes, voice search responses, and AI-generated answers. Instead of ranking on page one, you become the answer at position zero.' },
  { q: 'How does AEO relate to AI Visibility?', a: 'They are tightly linked. AI models frequently pull answers from the same content that wins featured snippets. If you dominate AEO, you are building the same signals that drive AI Visibility. We optimize both simultaneously.' },
  { q: 'What types of businesses benefit most from AEO?', a: 'Any business where buyers research extensively before purchasing. B2B services, professional services, healthcare, legal, financial  anywhere the buyer journey involves questions, AEO can capture attention at the research stage.' },
  { q: 'How do I know if AEO is working?', a: 'We track featured snippet wins, PAA appearances, and zero-click impressions through Search Console and third-party tools. You get a monthly report showing your answer engine footprint and how it is growing.' },
]

export default function AEOOptimizationPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-orange-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-3">AEO Optimization</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">Own the Answer, Not Just the Ranking</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Answer Engine Optimization structures your content to win featured snippets, PAA boxes, and AI-generated answers  so your brand becomes the definitive answer buyers find first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Get a Free AEO Audit
            </Link>
            <Link href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-orange-400 transition-all">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">What AEO Optimization Includes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">From question mapping to schema markup  everything it takes to own the answer layer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm mb-4">{i + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">Start Owning the Answer Layer</h2>
          <p className="text-gray-300 text-lg mb-8">Book a free strategy call and we will show you exactly which answers your brand should be winning right now.</p>
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
