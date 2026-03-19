'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/portal/content', label: 'My Content', icon: '✏️' },
  { href: '/portal/leads', label: 'My Leads', icon: '📬' },
  { href: '/portal/history', label: 'Change History', icon: '🕐' },
  { href: '/portal/settings', label: 'Settings', icon: '⚙️' },
]

export default function PortalNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-r border-gray-200 w-56 min-h-screen hidden md:flex flex-col">
      <div className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
