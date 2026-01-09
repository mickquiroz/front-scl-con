'use client'

import Link from 'next/link'
import { Linkedin, Twitter, Facebook, Instagram, ArrowUp } from 'lucide-react'

const serviceLinks = [
  { label: 'Consultoría SAP', href: '#servicios' },
  { label: 'Transformación Digital', href: '#servicios' },
  { label: 'Outsourcing TI', href: '#servicios' },
  { label: 'Servicios Cloud', href: '#servicios' },
  { label: 'Automatización RPA', href: '#servicios' },
]

const companyLinks = [
  { label: 'Sobre Nosotros', href: '#nosotros' },
  { label: 'Nuestro Equipo', href: '#equipo' },
  { label: 'Casos de Éxito', href: '#' },
  { label: 'Certificaciones', href: '#' },
  { label: 'Trabaja con Nosotros', href: '#' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="layout-wrapper py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SCL</span>
              </div>
              <span className="text-xl font-bold">Consultores</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Consultora de tecnología especializada en outsourcing TI, consultoría SAP
              y transformación digital. Conectamos empresas con profesionales
              certificados y entregamos proyectos con 98% de tasa de éxito.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="mailto:contacto@sclconsultores.com"
                  className="hover:text-white transition-colors"
                >
                  contacto@sclconsultores.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+56912345678"
                  className="hover:text-white transition-colors"
                >
                  +56 9 1234 5678
                </a>
              </li>
              <li>Santiago, Chile</li>
              <li>Lunes a Viernes, 9:00 - 18:00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="layout-wrapper py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              &copy; {currentYear} SCL Consultores. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos de Servicio
              </a>
              <button
                onClick={handleScrollToTop}
                aria-label="Volver arriba"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
