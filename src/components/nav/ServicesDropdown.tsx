'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { services } from '@/config/services'
import { cn } from '@/lib/utils'

export function ServicesDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 150) // Small delay to prevent flickering
    }

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    handleMouseLeave()
                }
            }}
            ref={containerRef}
        >
            <button
                className={cn(
                    "nav-link flex items-center gap-1 group",
                    isOpen && "text-primary-500"
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <span>Servicios</span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {/* Dropdown Panel */}
            <div
                className={cn(
                    "absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden transition-all duration-300 origin-top-left z-50",
                    isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                )}
                role="menu"
            >
                <div className="p-2 flex flex-col gap-1">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="font-medium text-neutral-800">{service.title}</div>
                            <div className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                                {service.shortDescription}
                            </div>
                        </Link>
                    ))}

                    <div className="h-px bg-neutral-100 my-1 mx-2"></div>

                    <Link
                        href="/services"
                        className="block px-4 py-3 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors text-center"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                    >
                        Ver todos los servicios →
                    </Link>
                </div>
            </div>
        </div>
    )
}
