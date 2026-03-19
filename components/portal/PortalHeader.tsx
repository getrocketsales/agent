/* eslint-disable @typescript-eslint/no-unused-vars */ 
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface PortalHeaderProps {
  businessName: string
  userEmail: string
}

export default function PortalHeader({ businessName, userEmail }: PortalHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/portal/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-heading"
            style={{ background: 'linear-gradient(135deg, #592b77, #8b4b94)' }}>
            {businessName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-brand-dark">{businessName}</p>
            <p className="text-xs text-gray-400 font-body">Client Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-gray-400 font-body">{userEmail}</span>
          <button
            onClick={handleSignOut}
            className="text-xs font-heading tracking-wider text-gray-500 hover:text-brand-dark transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-100"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </header>
  )
}