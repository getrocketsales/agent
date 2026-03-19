'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AddClientModalProps {
  onClose: () => void
}

const industries = ['Healthcare / Medical','Legal / Law Firm','Home Services','Financial Services','Real Estate','AI Consulting','Other']
const plans = [{value:'essential',label:'Essential'},{value:'growth',label:'Growth'},{value:'scale',label:'Scale'},{value:'custom',label:'Custom'}]

export function AddClientModal({ onClose }: AddClientModalProps) {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', email:'', owner_name:'', phone:'', city:'', state:'', industry:'', plan:'essential', domain:'', portal_password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{slug:string,portal_email:string}|null>(null)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError('Business name and email are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/provision-client', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Provisioning failed'); return }
      setResult({ slug: data.slug, portal_email: data.portal_email })
    } catch { setError('Network error') } finally { setLoading(false) }
  }

  const handleDone = () => { onClose(); router.refresh() }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add New Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">
          {result ? (
            <div className="text-center py-4 space-y-4">
              <div className="text-5xl"></div>
              <h3 className="text-xl font-black text-gray-900">Client Provisioned!</h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left space-y-2 text-sm text-green-800">
                <p><strong>Business:</strong> {form.name}</p>
                <p><strong>Portal Login:</strong> {result.portal_email}</p>
                {form.portal_password && <p><strong>Password:</strong> {form.portal_password}</p>}
                <p><strong>Portal URL:</strong> {window.location.origin}/portal/login</p>
              </div>
              <button onClick={handleDone} className="w-full py-3 text-white font-bold rounded-lg" style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>Done</button>
            </div>
          ) : (
            <div className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Business Name *</label>
                  <input value={form.name} onChange={e => update('name',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="e.g. Dallas Plumbing Co." />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Portal Email *</label>
                  <input type="email" value={form.email} onChange={e => update('email',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="client@business.com" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner Name</label>
                  <input value={form.owner_name} onChange={e => update('owner_name',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="John Smith" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</label>
                  <input value={form.phone} onChange={e => update('phone',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="469-555-1234" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">City</label>
                  <input value={form.city} onChange={e => update('city',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="Dallas" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">State</label>
                  <input value={form.state} onChange={e => update('state',e.target.value)} maxLength={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="TX" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Industry</label>
                  <select value={form.industry} onChange={e => update('industry',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                    <option value="">Select...</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Plan</label>
                  <select value={form.plan} onChange={e => update('plan',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                    {plans.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Domain</label>
                  <input value={form.domain} onChange={e => update('domain',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="clientdomain.com" />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Temp Password</label>
                  <input value={form.portal_password} onChange={e => update('portal_password',e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500" placeholder="Leave blank to auto-generate" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-sm">Cancel</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2.5 text-white rounded-lg font-bold disabled:opacity-50 text-sm" style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
                  {loading ? 'Provisioning...' : 'Provision Client'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
