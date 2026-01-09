'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-semibold
      rounded-lg transition-all duration-300
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
    `

    const variants = {
      primary: `
        bg-accent-500 text-white shadow-button
        hover:bg-accent-600 hover:shadow-button-hover hover:-translate-y-0.5
        active:bg-accent-700 active:translate-y-0
        focus-visible:ring-accent-500
      `,
      secondary: `
        bg-transparent text-primary-500 border-2 border-primary-500
        hover:bg-primary-500 hover:text-white
        active:bg-primary-600
        focus-visible:ring-primary-500
      `,
      white: `
        bg-white text-primary-500 shadow-md
        hover:bg-neutral-50 hover:-translate-y-0.5
        active:bg-neutral-100 active:translate-y-0
        focus-visible:ring-white
      `,
      ghost: `
        bg-transparent text-primary-500
        hover:bg-primary-50
        active:bg-primary-100
        focus-visible:ring-primary-500
      `,
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Enviando...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
