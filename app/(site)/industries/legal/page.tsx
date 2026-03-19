import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Visibility for Law Firms | RocketSales Consulting',
  description: 'AI Visibility for law firms and legal professionals. Get cited by AI when potential clients research attorneys in your practice area.',
}

const painPoints = [
  { title: 'Clients Research Attorneys Using AI', desc: 'Before picking up the phone, legal buyers ask AI tools about attorneys in their area. We make sure your firm is the recommended answer for your practice areas and geography.' },
  { title: 'Expertise and Trust Are Mandatory', desc: 'AI models are especially cautious about legal advice. They cite firms with demonstrable expertise  bar memberships, case results, thought leadership, and authoritative educational content.' },
  { title: 'Practice Area Specificity Matters', desc: 'Someone searching for a "personal injury lawyer" and someone searching for a "corporate M&A attorney" need very different visibility signals. We build specific authority for each of your practice areas.' },
  { title: 'Reputation Management Integration', desc: 'We combine AI Visibility with reputation signals  reviews, media mentions, and community authority  that reinforce your firm\'s trustworthiness in AI responses.' },
]

export default function LegalPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-slate-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">AI Visibility for Law Firms</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Legal clients research before they call. We position your firm as the authoritative recommendation in AI tools  so the best clients find you before they consider your competitors.
          </p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Get a Free Legal AI Audit
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">The Legal AI Visibility Challenge</h2>
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

      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to Dominate Legal AI Search?</h2>
          <p className="text-lg text-gray-600 mb-8">See exactly how your firm is cited in AI tools today  and what it would take to lead your market.</p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Book a Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
