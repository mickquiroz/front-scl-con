'use client'

import { FeatureCard, CounterGrid } from '@/components/ui'
import {
  Trophy,
  UserCheck,
  Puzzle,
  Headset,
  Rocket,
  Target,
} from 'lucide-react'

const features = [
  {
    icon: Trophy,
    title: 'Experiencia Comprobada',
    description: '15 años resolviendo desafíos TI en empresas de 50 a 5,000 empleados. 500+ proyectos nos enseñaron a anticipar problemas antes de que frenen tu operación.',
  },
  {
    icon: UserCheck,
    title: 'Equipo Especializado',
    description: 'Cada profesional tiene certificaciones activas y proyectos reales en producción. Si lo ponemos en tu equipo, es porque ya resolvió casos similares.',
  },
  {
    icon: Puzzle,
    title: 'Soluciones Personalizadas',
    description: 'Analizamos tu infraestructura actual, tus limitaciones presupuestarias y tus objetivos de negocio antes de proponer tecnología.',
  },
  {
    icon: Headset,
    title: 'Soporte Continuo',
    description: 'No desaparecemos cuando el proyecto sale a producción. Incluimos acompañamiento post-implementación, capacitación y monitoreo de KPIs.',
  },
  {
    icon: Rocket,
    title: 'Tecnología de Vanguardia',
    description: 'SAP S/4HANA, AWS, Azure, Google Cloud, UiPath, Automation Anywhere. Stack tecnológico con comunidad activa y soporte garantizado.',
  },
  {
    icon: Target,
    title: 'ROI Comprobado',
    description: 'Cada proyecto incluye métricas de éxito definidas. Nuestros clientes reportan retorno de inversión medible entre 6 y 18 meses.',
  },
]

const stats = [
  { end: 500, suffix: '+', label: 'Proyectos Completados' },
  { end: 200, suffix: '+', label: 'Clientes Satisfechos' },
  { end: 98, suffix: '%', label: 'Tasa de Éxito' },
  { end: 15, suffix: '+', label: 'Años de Experiencia' },
]

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="layout-wrapper">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 md:text-display font-bold text-neutral-900 mb-4">
            ¿Por qué elegir{' '}
            <span className="text-accent-500">SCL Consultores</span>?
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Somos tu socio estratégico en transformación digital con un compromiso genuino con tu éxito
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="bg-primary-500 rounded-2xl p-8 md:p-12 lg:p-16">
          <CounterGrid
            counters={stats}
            className="[&_*]:text-white [&_.text-primary-500]:text-white [&_.text-accent-500]:text-accent-400"
          />
        </div>
      </div>
    </section>
  )
}
