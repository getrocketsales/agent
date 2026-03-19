import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Visibility for Financial Services | RocketSales Consulting',
  description: 'AI Visibility for financial advisors, CPAs, wealth managers, and fintech. Build the trust signals that make AI recommend your firm when buyers choose who to trust with their money.',
}

const painPoints = [
  { title: 'Financial Buyers Use AI to Vet Firms', desc: 'High-value financial clients are meticulous researchers. They ask AI tools about advisors, CPAs, and wealth managers before making contact. Your AI presence determines whether you are even in consideration.' },
  { title: 'YMYL Signals Are Critical', desc: 'AI models apply extra scrutiny to financial content  categorizing it as "Your Money or Your Life" material. We build the expertise, authority, and trustworthiness (E-E-A-T) signals that earn AI citations in this space.' },
  { title: 'Regulatory-Aware Content Strategy', desc: 'We understand the compliance implications of financial marketing and create authority-building content that respects SEC, FINRA, and other regulatory requirements.' },
  { title: 'Trust-First Brand Positioning', desc: 'We build content that demonstrates your track record, credentials, and client outcomes  the trust signals that convince both AI models and prospective clients that you are the right choice.' },
]

export default function FinancialServicesPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Financial Services</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">AI Visibility for Financial Professionals</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            When high-value clients ask AI who to trust with their money, your firm should be the answer. We build the compliance-aware authority that makes financial AI Visibility work.
          </p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Get a Free Financial Services AI Audit
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">The Financial Services AI Visibility Challenge</h2>
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
          <h2 className="text-3xl font-black text-gray-900 mb-4">Win the Trust Game in AI Search</h2>
          <p className="text-lg text-gray-600 mb-8">Financial services is a trust business. AI Visibility is the modern trust signal. Book a call to see where you stand and what it takes to lead.</p>
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
