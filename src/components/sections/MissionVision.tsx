'use client'

import { CircleImageCard } from '@/components/ui'

const pillars = [
  {
    imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Equipo colaborando - Propósito de SCL Consultores',
    title: 'Propósito',
    description: 'Eliminamos la brecha entre las empresas que necesitan evolucionar tecnológicamente y los profesionales TI capaces de hacerlo realidad. Cada proyecto es una oportunidad de acelerar la transformación digital.',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Consultoría estratégica - Misión de SCL Consultores',
    title: 'Misión',
    description: 'Proveemos soluciones de consultoría SAP, outsourcing tecnológico y búsqueda especializada de profesionales TI. Entregamos equipos certificados, proyectos probados y resultados medibles.',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Visión de futuro - Visión de SCL Consultores',
    title: 'Visión',
    description: 'Para 2028, convertirnos en la consultora TI más recomendada de Latinoamérica. Expandir nuestra red a 500+ profesionales y alcanzar presencia en 10 países manteniendo 99% de éxito.',
  },
]

export function MissionVision() {
  return (
    <section id="nosotros" className="section-padding bg-white">
      <div className="layout-wrapper">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 md:text-display font-bold text-neutral-900 mb-4">
            Nuestra <span className="text-primary-500">Esencia</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Los pilares que guían cada decisión y proyecto que emprendemos
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <CircleImageCard
              key={index}
              imageSrc={pillar.imageSrc}
              imageAlt={pillar.imageAlt}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
