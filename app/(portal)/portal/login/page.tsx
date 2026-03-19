'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PortalLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/portal/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-brand-dark">CLIENT PORTAL</h1>
          <p className="text-sm text-gray-500 mt-2 font-body">Sign in to manage your AI visibility</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-heading tracking-wider text-gray-500 mb-1.5">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm focus:outline-none transition-all"
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-600 text-sm font-body">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 text-white font-heading tracking-wider text-sm rounded-lg transition-all duration-150 disabled:opacity-60"
            style={{ background: loading ? '#8b4b94' : 'linear-gradient(135deg, #592b77, #8b4b94)' }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN TO PORTAL'}
          </button>
        </form>
        
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-body">
            Powered by{' '}
            <span className="font-heading tracking-wider" style={{ color: '#8b4b94' }}>ROCKETSALES</span>
            {' '}AI Visibility Platform
          </p>
        </div>
      </div>
    </div>
  )
}
