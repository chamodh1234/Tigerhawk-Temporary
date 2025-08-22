import React, { useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6 max-w-2xl w-full mx-4 animate-modal-in min-h-[400px] max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 text-xl font-bold focus:outline-none"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <div className="overflow-y-auto mt-2" style={{ maxHeight: 'calc(80vh - 2.5rem)' }}>
          {children}
        </div>
      </div>
      <style jsx global>{`
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  )
} 