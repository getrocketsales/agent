'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'OVERVIEW', icon: 'grid', exact: true },
  { href: '/dashboard/clients', label: 'CLIENTS', icon: 'users' },
  { href: '/dashboard/audits', label: 'AUDITS', icon: 'search' },
  { href: '/dashboard/airank', label: 'AIRANK ENGINE', icon: 'zap' },
  { href: '/dashboard/reports', label: 'REPORTS', icon: 'bar-chart' },
  { href: '/dashboard/settings', label: 'SETTINGS', icon: 'settings' },
]

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>),
    users: (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
    search: (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>),
    zap: (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
    "bar-chart": (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
    settings: (<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    close: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>),
  }
  return <>{icons[name] || null}</>
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  // Close on route change (mobile)
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const sidebarContent = (
    <aside className="w-64 h-full flex flex-col" style={{background: 'linear-gradient(180deg, #592b77 0%, #2F3B40 100%)'}}>
      {/* Logo + close button */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <Image
            src="https://getrocketsales.org/wp-content/uploads/2025/08/rocketsales_logo-h1.png"
            alt="RocketSales Logo"
            width={140}
            height={40}
            className="h-8 w-auto brightness-0 invert"
            unoptimized
            priority
          />
        </Link>
        {/* Close button visible only on mobile/tablet */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <Icon name="close" />
        </button>
      </div>

      <div className="px-4 py-2 border-b border-white/10">
        <p className="text-white/40 text-xs tracking-widest font-heading py-2">AGENCY DASHBOARD</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-heading tracking-wider transition-all duration-150 ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400"></span>}
            </Link>
          )
        })}
      </nav>

      {/* Status footer */}
      <div className="px-5 py-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"></div>
          <span className="text-white/50 text-xs font-heading tracking-wider">AIRANK ENGINE ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
          <span className="text-white/40 text-xs font-heading tracking-wider">PM2 ONLINE</span>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: always visible sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile/Tablet: drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="relative flex-shrink-0 w-64 h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
