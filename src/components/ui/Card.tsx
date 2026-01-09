'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'on-dark' | 'flat'
  hover?: boolean
}

export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  const variants = {
    default: 'bg-white shadow-card',
    'on-dark': 'bg-white shadow-lg',
    flat: 'bg-neutral-50',
  }

  return (
    <div
      className={cn(
        'rounded-xl p-6 md:p-8 transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function ValueCard({ icon: Icon, title, description, className }: ValueCardProps) {
  return (
    <Card variant="on-dark" className={cn('text-center', className)}>
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />
      </div>
      <h4 className="text-heading-4 font-bold text-primary-500 mb-3">{title}</h4>
      <p className="text-body-sm text-neutral-600 leading-relaxed">{description}</p>
    </Card>
  )
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent-50 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-500" />
      </div>
      <h4 className="text-heading-4 font-bold text-neutral-800 mb-3">{title}</h4>
      <p className="text-body-sm text-neutral-600 leading-relaxed">{description}</p>
    </Card>
  )
}

interface CircleImageCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  className?: string
}

export function CircleImageCard({ imageSrc, imageAlt, title, description, className }: CircleImageCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden mx-auto mb-6 shadow-lg border-4 border-white">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-heading-3 font-bold text-primary-500 mb-3">{title}</h3>
      <p className="text-body text-neutral-600 leading-relaxed max-w-sm mx-auto">{description}</p>
    </div>
  )
}
