/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import PortalHeader from '@/components/portal/PortalHeader'
import PortalNav from '@/components/portal/PortalNav'

export default function PortalSettingsPage() {
  const [business, setBusiness] = useState<any>(null)
  const [businessId, setBusinessId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [settingsId, setSettingsId] = useState<string>('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [hours, setHours] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      setUserEmail(session.user.email || '')

      const { data: portalUser } = await supabase
        .from('portal_users')
        .select('business_id')
        .eq('user_id', session.user.id)
        .single()

      if (!portalUser) return
      setBusinessId(portalUser.business_id)

      const { data: biz } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', portalUser.business_id)
        .single()

      setBusiness(biz)

      const { data: settings } = await supabase
        .from('settings')
        .select('*')
        .eq('business_id', portalUser.business_id)
        .single()

      if (settings) {
        setSettingsId(settings.id)
        setPhone(settings.phone || '')
        setAddress(settings.address || '')
        setHours(settings.hours ? JSON.stringify(settings.hours, null, 2) : '')
      }

      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    const supabase = createClient()

    const updates = {
      phone,
      address,
      hours: hours ? JSON.parse(hours) : {},
      updated_at: new Date().toISOString(),
    }

    if (settingsId) {
      await supabase.from('settings').update(updates).eq('id', settingsId)
    } else {
      await supabase.from('settings').insert({ ...updates, business_id: businessId })
    }

    // Log change
    await supabase.from('change_requests').insert({
      business_id: businessId,
      field: 'settings',
      requested_value: JSON.stringify(updates),
      airank_status: "APPROVED",
      created_at: new Date().toISOString()
    })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 font-body">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader
        businessName={business?.name || 'Your Business'}
        userEmail={userEmail}
      />
      <div className="flex">
        <PortalNav />
        <main className="flex-1 p-6 max-w-2xl">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-brand-dark">Settings</h1>
            <p className="text-sm text-gray-500 font-body mt-1">
              Update your business contact info and hours
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                  BUSINESS NAME
                </label>
                <p className="px-4 py-3 rounded-lg bg-gray-50 text-gray-500 font-body text-sm">
                  {business?.name} (contact RocketSales to update)
                </p>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                  ADDRESS
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Dallas, TX 75001"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">
                  BUSINESS HOURS (JSON)
                </label>
                <textarea
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none font-mono resize-none"
                  placeholder='{"monday": "9am-5pm", "tuesday": "9am-5pm"}'
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 px-6 text-white font-heading tracking-wider text-sm rounded-lg transition-all duration-150 disabled:opacity-60"
                style={{ background: saving ? '#8b4b94' : 'linear-gradient(135deg, #592b77, #8b4b94)' }}
              >
                {saving ? 'SAVING...' : '💾 SAVE SETTINGS'}
              </button>

              {saved && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-green-700 text-sm font-body text-center">Settings saved successfully!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
