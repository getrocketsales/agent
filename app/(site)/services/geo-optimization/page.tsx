import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GEO Optimization | Generative Engine Optimization | RocketSales',
  description: 'Generative Engine Optimization (GEO) builds your brand into AI search results. RocketSales engineers the signals that make AI engines consistently surface your brand.',
}

const features = [
  { title: 'Entity Authority Building', desc: 'We establish your brand as a recognized entity with clear signals about who you are, what you do, and who you serve  the foundation of GEO.' },
  { title: 'Content Corpus Development', desc: 'We build a structured content library that AI engines can use to understand and cite your brand across a wide range of relevant queries.' },
  { title: 'Semantic Coverage Mapping', desc: 'We identify every topic cluster related to your business and create authoritative content that covers each one comprehensively.' },
  { title: 'Knowledge Graph Integration', desc: 'We work to get your brand represented accurately in Google\'s Knowledge Graph and other structured data systems that feed AI models.' },
  { title: 'Co-citation Network', desc: 'We build connections between your brand and established industry authorities so AI models recognize you as part of the trusted expert ecosystem.' },
  { title: 'GEO Performance Tracking', desc: 'Monthly reporting on your brand\'s presence in AI-generated responses, with trend analysis and competitive benchmarking.' },
]

const faqs = [
  { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO is the emerging discipline of optimizing your brand for generative AI engines  tools like ChatGPT, Perplexity, and Gemini that generate answers instead of returning links. It combines entity authority, content depth, and structured signals to earn AI citations.' },
  { q: 'Is GEO the same as AI Visibility?', a: 'They are closely related. GEO refers to the optimization techniques we use. AI Visibility refers to the outcome  your brand appearing in AI responses. Think of GEO as the engine and AI Visibility as the result.' },
  { q: 'Does GEO replace SEO?', a: 'No  GEO works alongside SEO. Strong SEO authority is actually a key input to GEO success. We build both simultaneously, so you win in traditional search and AI search.' },
  { q: 'How do you measure GEO results?', a: 'We track your brand\'s citation rate across AI tools using AIRank, monitor your entity presence in knowledge graphs, and measure your share of voice in AI responses vs. competitors.' },
]

export default function GEOOptimizationPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">GEO Optimization</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">Built for the Generative AI Era</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Generative Engine Optimization builds the entity authority and content depth that make AI engines consistently choose your brand as the authoritative answer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
              style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Get a Free GEO Audit
            </Link>
            <Link href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-blue-400 transition-all">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">What GEO Optimization Includes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The complete system for building durable AI search authority.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm mb-4">{i + 1}</div>
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

      <section className="py-20 bg-gradient-to-br from-blue-950 to-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">Start Building AI Authority Today</h2>
          <p className="text-gray-300 text-lg mb-8">Book a free strategy call and see exactly how you rank in generative AI search right now.</p>
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
