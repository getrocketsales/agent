'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', service: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page: 'contact', source_url: window.location.href })
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch { setError('Something went wrong. Please call us at 469-769-5855.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="text-center py-12 space-y-4">
      <div className="text-5xl"></div>
      <h3 className="text-xl font-black text-gray-900">Message Sent!</h3>
      <p className="text-gray-500">We will be in touch within 1 business day. For faster response, call <a href="tel:4697695855" className="text-purple-700 font-bold">469-769-5855</a>.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Name *</label>
          <input required value={form.name} onChange={e => update('name', e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="John Smith" />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Email *</label>
          <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</label>
          <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="469-555-1234" />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</label>
          <input value={form.company} onChange={e => update('company', e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Your Business" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">I am interested in</label>
        <select value={form.service} onChange={e => update('service', e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <option value="">Select a service...</option>
          <option value="AI Visibility">AI Visibility & Citations</option>
          <option value="GEO">Generative Engine Optimization (GEO)</option>
          <option value="SEO">SEO Rankings & Authority</option>
          <option value="AEO">Answer Engine Optimization (AEO)</option>
          <option value="Full AIRank">Full AIRank Package</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</label>
        <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Tell us about your business and goals..." />
      </div>
      <button type="submit" disabled={loading} className="w-full py-4 text-sm font-bold text-white rounded-xl disabled:opacity-50 transition-all hover:opacity-90" style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
        {loading ? 'Sending...' : 'Send Message & Book Strategy Call '}
      </button>
    </form>
  )
}
