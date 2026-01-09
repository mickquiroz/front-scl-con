'use client'

import { Button } from '@/components/ui'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function Hero() {
  const handleScrollToServices = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-primary-500 pt-28 md:pt-36 pb-16 flex items-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
      </div>

      <div className="layout-wrapper relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-display font-bold leading-tight mb-6 text-balance">
              Transformamos tu infraestructura TI en{' '}
              <span className="text-accent-400">ventaja competitiva</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              Consultores especializados en SAP, Cloud y transformación digital.
              15 años conectando empresas con los profesionales TI que necesitan
              para escalar sin fricciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleScrollToContact}
                className="group"
              >
                Iniciar proyecto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="white"
                size="lg"
                onClick={handleScrollToServices}
              >
                Explorar servicios
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-4">Confían en nosotros:</p>
              <div className="flex items-center gap-8 opacity-80">
                <span className="text-white font-semibold">SAP Partner</span>
                <span className="text-white font-semibold">AWS</span>
                <span className="text-white font-semibold">Azure</span>
                <span className="text-white font-semibold">Google Cloud</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Equipo de consultores SCL trabajando en soluciones tecnológicas"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <span className="text-accent-500 font-bold text-lg">98%</span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800">Tasa de éxito</p>
                    <p className="text-sm text-neutral-500">en proyectos</p>
                  </div>
                </div>
              </div>

              {/* Floating years card */}
              <div className="absolute -top-4 -right-4 bg-accent-500 rounded-xl p-4 shadow-xl hidden md:block">
                <div className="text-center text-white">
                  <span className="text-3xl font-bold">15+</span>
                  <p className="text-sm opacity-90">Años</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce hidden md:block">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  )
}
