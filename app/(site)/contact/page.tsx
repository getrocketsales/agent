import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { getPageData } from '@/lib/supabase/fetch-site-data'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact RocketSales | Book a Free AI Visibility Strategy Call',
  description: 'Book a free 15-minute strategy call with RocketSales. We will audit your AIRank score and show you how to dominate AI search, GEO, SEO, and AEO.',
}

export default async function ContactPage() {
  const { page } = await getPageData('contact')
  if (!page) notFound()

  const content = page.content as any
  const hero = content?.hero || {}
  const benefits = content?.benefits || []
  const phone = content?.phone || {}
  const formHeading = content?.form_heading || 'Send Us a Message'

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3">{hero.badge || 'Get Started'}</p>
            <h1 className="text-4xl font-black text-gray-900 mb-6">{hero.heading || 'Book a Free Strategy Call'}</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">{hero.description || ''}</p>
            <div className="space-y-6">
              {benefits.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <p className="text-sm font-bold text-purple-700 mb-1">{phone.label || 'Prefer to call directly?'}</p>
              <a href={`tel:${phone.number || '4697695855'}`} className="text-2xl font-black text-purple-900 hover:text-purple-700">{phone.display || '469-769-5855'}</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{formHeading}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
