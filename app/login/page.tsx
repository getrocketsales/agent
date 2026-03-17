'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex" style={{background: 'linear-gradient(135deg, #592b77 0%, #2F3B40 60%, #1a1f22 100%)'}}>
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full border-2 border-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white"></div>
        </div>

        <div className="relative z-10">
          <Image
            src="https://getrocketsales.org/wp-content/uploads/2025/08/rocketsales_logo-h1.png"
            alt="RocketSales Logo"
            width={200}
            height={55}
            className="h-12 w-auto brightness-0 invert"
            unoptimized
            priority
          />
        </div>

        <div className="relative z-10">
          <h1 className="font-heading text-5xl font-bold text-white leading-tight mb-4">
            AI-FUELED<br />
            <span style={{color: '#f37850'}}>SEO VISIBILITY</span><br />
            PLATFORM
          </h1>
          <p className="text-white/60 text-lg font-body">
            Manage your clients, track rankings, and deploy AI-powered SEO strategies  all in one place.
          </p>
          <div className="mt-8 flex gap-6">
            <div>
              <p className="font-heading text-2xl font-bold" style={{color: '#f37850'}}>SEO</p>
              <p className="text-white/50 text-xs tracking-wider font-heading">SEARCH ENGINE</p>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <p className="font-heading text-2xl font-bold" style={{color: '#fdc880'}}>GEO</p>
              <p className="text-white/50 text-xs tracking-wider font-heading">GENERATIVE ENGINE</p>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <p className="font-heading text-2xl font-bold text-white">AEO</p>
              <p className="text-white/50 text-xs tracking-wider font-heading">AI ENGINE</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white/40 text-xs font-heading tracking-widest">AIRANK ENGINE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white lg:rounded-l-3xl">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex justify-center">
          <Image
            src="https://getrocketsales.org/wp-content/uploads/2025/08/rocketsales_logo-h1.png"
            alt="RocketSales Logo"
            width={180}
            height={50}
            className="h-10 w-auto"
            unoptimized
            priority
          />
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-widest font-heading mb-2" style={{color: '#8b4b94'}}>AGENCY PORTAL</p>
            <h2 className="font-heading text-3xl font-bold text-gray-900">SIGN IN</h2>
            <p className="text-gray-500 mt-2 font-body">Access your RocketSales dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-heading tracking-wider text-gray-500 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{"--tw-ring-color": "#8b4b94"} as React.CSSProperties}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(139,75,148,0.15)'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-heading tracking-wider text-gray-500 mb-2">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=""
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 font-body text-sm placeholder-gray-400 focus:outline-none transition-all"
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(139,75,148,0.15)'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm font-body">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 text-white font-heading tracking-wider text-sm rounded-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{background: loading ? '#8b4b94' : 'linear-gradient(135deg, #592b77, #8b4b94)'}}
              onMouseEnter={(e) => !loading && ((e.target as HTMLElement).style.background = 'linear-gradient(135deg, #8b4b94, #f37850)')}
              onMouseLeave={(e) => !loading && ((e.target as HTMLElement).style.background = 'linear-gradient(135deg, #592b77, #8b4b94)')}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN TO DASHBOARD'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400 font-body">
              Powered by{" "}
              <span className="font-heading tracking-wider" style={{color: '#8b4b94'}}>ROCKETSALES</span>
              {" "} AI Visibility Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
