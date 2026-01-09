'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  className?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = 'Hola, me interesa conocer más sobre sus servicios de consultoría.',
  className
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={cn(
        'fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16',
        'rounded-full bg-green-500 text-white shadow-lg',
        'flex items-center justify-center',
        'hover:bg-green-600 hover:scale-110',
        'active:scale-95',
        'transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
        className
      )}
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" />
    </a>
  )
}
