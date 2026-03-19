'use client'
import { useState } from 'react'
import { AddClientModal } from '@/components/admin/AddClientModal'

export function AddClientButton() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="self-start sm:self-auto text-sm font-heading tracking-wider px-4 py-2.5 rounded-lg text-white transition-all flex items-center gap-2 whitespace-nowrap"
        style={{background:'linear-gradient(135deg, #592b77, #8b4b94)'}}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        ADD CLIENT
      </button>
      {showModal && <AddClientModal onClose={() => setShowModal(false)} />}
    </>
  )
}
