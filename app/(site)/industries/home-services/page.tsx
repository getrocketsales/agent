import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Visibility for Home Services | RocketSales Consulting',
  description: 'AI Visibility for contractors, HVAC, plumbers, electricians, and home service businesses. Get recommended by AI when homeowners search for service providers.',
}

const painPoints = [
  { title: 'Homeowners Ask AI Before Calling', desc: 'When the AC breaks or a pipe bursts, homeowners increasingly ask AI tools "best HVAC company near me" or "trusted plumber in [city]." We make sure your business is that recommendation.' },
  { title: 'Reviews and Local Signals Are Everything', desc: 'Home services AI Visibility is built on local authority  reviews, GBP optimization, service area content, and community trust signals all drive citation rate.' },
  { title: 'High-Value Job Targeting', desc: 'We build visibility for the search terms that attract premium jobs  not just volume, but the right customers willing to pay for quality service.' },
  { title: 'Seasonal and Emergency Visibility', desc: 'We optimize for both scheduled service queries and emergency searches  so you capture demand year-round, not just during peak season.' },
]

export default function HomeServicesPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-amber-950 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">Home Services</p>
          <h1 className="text-5xl font-black text-white mb-6 max-w-3xl">AI Visibility for Home Service Businesses</h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            When homeowners ask AI who to call, your business should be the name that comes up. We build the local authority and AI signals that make you the trusted recommendation in your market.
          </p>
          <Link href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl hover:opacity-90 transition-all"
            style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
            Get a Free Home Services AI Audit
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Why Home Services AI Visibility Is Different</h2>
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
          <h2 className="text-3xl font-black text-gray-900 mb-4">Stop Paying for Leads. Start Earning Them.</h2>
          <p className="text-lg text-gray-600 mb-8">AI Visibility is the alternative to constant ad spend. Build once, earn citations permanently. Book a call to see what is possible in your market.</p>
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
