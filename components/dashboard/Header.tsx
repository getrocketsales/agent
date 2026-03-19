'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user: { email?: string; name?: string }
  onMenuOpen: () => void
}

export default function Header({ user, onMenuOpen }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/portal/agency/login')
    router.refresh()
  }

  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.[0]?.toUpperCase() || 'U'

  const displayName = user.name || user.email || ''

  return (
    <header className="h-14 md:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-40 gap-3">
      {/* Left: hamburger (mobile/tablet) + breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Hamburger  only on < lg */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo  visible on mobile when sidebar is hidden */}
        <div className="lg:hidden flex items-center gap-1.5 min-w-0">
          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #592b77, #8b4b94)'}}>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-heading font-bold text-gray-800 tracking-wider truncate">ROCKETSALES</span>
        </div>

        {/* Desktop breadcrumb */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="h-0.5 w-6" style={{background: 'linear-gradient(90deg, #f37850, #8b4b94)'}}></div>
          <span className="text-xs tracking-widest text-gray-400 font-heading">AGENCY PORTAL</span>
        </div>
      </div>

      {/* Right: status + user */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Live status pill  hidden on xs */}
        <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
          <span className="text-xs font-heading tracking-wider text-green-700">LIVE</span>
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          {/* Name  hidden on mobile */}
          <div className="hidden md:block text-right">
            <p className="text-xs font-heading tracking-wide text-gray-700 leading-tight truncate max-w-[120px]">{displayName}</p>
            <p className="text-xs text-gray-400 leading-tight">Admin</p>
          </div>
          {/* Avatar */}
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-heading font-bold flex-shrink-0 cursor-pointer"
            style={{background: 'linear-gradient(135deg, #8b4b94, #f37850)'}}
            title={displayName}
          >
            {initials}
          </div>
          {/* Sign out  text on md+, icon only on sm */}
          <button
            onClick={handleSignOut}
            className="hidden sm:block text-xs text-gray-400 hover:text-red-500 transition-colors font-heading tracking-wider"
          >
            OUT
          </button>
        </div>
      </div>
    </header>
  )
}
