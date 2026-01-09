'use client'

import { ValueCard } from '@/components/ui'
import {
  ShieldCheck,
  Zap,
  Award,
  Handshake,
  Lightbulb,
  Eye,
} from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'Confiabilidad',
    description: '98% de tasa de éxito en más de 500 proyectos no es suerte, es método. Cumplimos lo que prometemos, en el tiempo acordado.',
  },
  {
    icon: Zap,
    title: 'Agilidad',
    description: 'Respondemos requerimientos en 24 horas, presentamos candidatos en 72 horas e iniciamos proyectos en una semana. Velocidad sin sacrificar calidad.',
  },
  {
    icon: Award,
    title: 'Expertise Técnico',
    description: '100+ certificaciones activas entre SAP, Cloud y RPA respaldan cada recomendación. No vendemos teoría, implementamos con conocimiento probado.',
  },
  {
    icon: Handshake,
    title: 'Compromiso',
    description: 'Tu éxito es nuestro KPI principal. Acompañamos cada proyecto hasta que los resultados estén operando. 200+ clientes que vuelven lo confirman.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación Pragmática',
    description: 'Adoptamos tecnología que resuelve problemas. Cloud, RPA y automatización son herramientas que implementamos cuando mejoran resultados.',
  },
  {
    icon: Eye,
    title: 'Transparencia',
    description: 'Cada cotización incluye desglose real de costos, tiempos y recursos. Si algo no funciona, lo decimos antes de que sea problema.',
  },
]

export function Values() {
  return (
    <section id="servicios" className="section-padding bg-primary-500">
      <div className="layout-wrapper">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 md:text-display font-bold mb-4">
            <span className="text-white">Nuestros </span>
            <span className="text-accent-400">Valores</span>
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
            Los principios que guían cada decisión y acción en nuestra empresa
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
