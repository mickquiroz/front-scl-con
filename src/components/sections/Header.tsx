'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { ServicesDropdown } from '@/components/nav/ServicesDropdown'
import { services } from '@/config/services'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-500 text-white py-2 hidden md:block">
        <div className="layout-wrapper">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="mailto:contacto@sclconsultores.com"
                className="flex items-center gap-2 hover:text-accent-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contacto@sclconsultores.com</span>
              </a>
              <a
                href="tel:+56912345678"
                className="flex items-center gap-2 hover:text-accent-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+56 9 1234 5678</span>
              </a>
            </div>
            <div className="text-sm opacity-90">
              Lunes a Viernes: 9:00 - 18:00
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          'bg-white transition-all duration-300',
          isScrolled ? 'shadow-nav py-3' : 'py-4'
        )}
      >
        <div className="layout-wrapper">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SCL</span>
              </div>
              <span className="text-xl font-bold text-primary-500 hidden sm:block">
                Consultores
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.label === 'Servicios' ? (
                  <ServicesDropdown key={link.href} />
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="primary" size="sm">
                Iniciar Proyecto
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="layout-wrapper py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.label === 'Servicios' ? (
                  <div key={link.href} className="flex flex-col">
                    <button
                      className="flex items-center justify-between py-3 px-4 text-neutral-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors text-left"
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isMobileServicesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 bg-neutral-50 rounded-lg ml-4 border-l-2 border-primary-100",
                        isMobileServicesOpen ? "max-h-[500px] opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
                      )}
                    >
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block py-2 px-4 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="block py-2 px-4 text-sm font-medium text-primary-600 hover:text-primary-700 mt-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Ver todos →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 px-4 text-neutral-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <Button variant="primary" className="w-full">
                  Iniciar Proyecto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
