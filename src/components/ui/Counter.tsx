'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number
  className?: string
}

export function Counter({ end, suffix = '', label, duration = 2000, className }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-5xl md:text-6xl lg:text-display-lg font-extrabold text-primary-500 leading-none tracking-tight mb-2">
        {count}
        <span className="text-accent-500">{suffix}</span>
      </div>
      <p className="text-body text-neutral-600 font-medium">{label}</p>
    </div>
  )
}

interface CounterGridProps {
  counters: Array<{
    end: number
    suffix?: string
    label: string
  }>
  className?: string
}

export function CounterGrid({ counters, className }: CounterGridProps) {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12', className)}>
      {counters.map((counter, index) => (
        <Counter
          key={index}
          end={counter.end}
          suffix={counter.suffix}
          label={counter.label}
        />
      ))}
    </div>
  )
}
