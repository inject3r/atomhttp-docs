'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  duration?: number
  onClose?: () => void
}

export default function Toast({ message, type = 'success', duration = 2000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 flex items-center gap-2 shadow-lg toast-message z-50">
      {type === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
      <span className="text-sm text-gray-300">{message}</span>
    </div>
  )
}