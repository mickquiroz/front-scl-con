'use client'

import { cn } from '@/lib/utils'

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Desktop Timeline - Horizontal */}
      <div className="hidden lg:block">
        {/* Line */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-accent-500 z-0" />

        {/* Nodes */}
        <div className="relative z-10 flex justify-between">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center max-w-[180px]">
              {/* Circle with year */}
              <div className="w-20 h-20 rounded-full bg-primary-500 border-4 border-white shadow-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">{item.year}</span>
              </div>

              {/* Content */}
              <h4 className="text-heading-4 font-bold text-neutral-800 text-center mb-2">
                {item.title}
              </h4>
              <p className="text-body-sm text-neutral-600 text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Timeline - Vertical */}
      <div className="lg:hidden">
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-1 bg-accent-500" />

          {/* Nodes */}
          <div className="space-y-10">
            {items.map((item, index) => (
              <div key={index} className="relative">
                {/* Circle */}
                <div className="absolute -left-8 md:-left-12 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base">{item.year}</span>
                </div>

                {/* Content */}
                <div className="ml-4">
                  <h4 className="text-heading-4 font-bold text-neutral-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-body-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
