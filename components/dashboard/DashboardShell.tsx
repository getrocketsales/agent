'use client'

import { useState, useCallback } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'

interface DashboardShellProps {
  children: React.ReactNode
  user: { email?: string; name?: string }
}

export default function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const openSidebar = useCallback(() => setSidebarOpen(true), [])

  return (
    <div className="flex min-h-screen" style={{backgroundColor: '#edf0f2'}}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onMenuOpen={openSidebar} />
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
