'use client'

import { Timeline } from '@/components/ui'

const historyItems = [
  {
    year: '2010',
    title: 'Fundación en Santiago',
    description: 'Iniciamos con 5 consultores SAP, enfocados en empresas medianas que necesitaban implementaciones ágiles.',
  },
  {
    year: '2013',
    title: 'Red de 50 profesionales',
    description: 'Alcanzamos masa crítica en outsourcing TI. Formalizamos nuestra metodología de matchmaking.',
  },
  {
    year: '2016',
    title: 'Expansión a Cloud',
    description: 'Incorporamos equipo certificado en AWS, Azure y Google Cloud. Primera migración completa para retail.',
  },
  {
    year: '2019',
    title: '100 proyectos SAP',
    description: 'Superamos las 100 implementaciones SAP exitosas. Nos convertimos en referente regional.',
  },
  {
    year: '2022',
    title: 'Certificación RPA',
    description: 'Sumamos 20 certificaciones en automatización robótica. Lanzamos área de transformación digital.',
  },
  {
    year: '2025',
    title: '175+ profesionales',
    description: 'Alcanzamos 500 proyectos completados y 98% de tasa de éxito. 200+ clientes confían en nosotros.',
  },
]

export function History() {
  return (
    <section className="section-padding bg-white">
      <div className="layout-wrapper">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 md:text-display font-bold text-neutral-900 mb-4">
            <span className="text-neutral-500">Nuestra </span>
            <span className="text-accent-500">Historia</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            15 años de evolución y crecimiento continuo
          </p>
        </div>

        {/* Timeline */}
        <Timeline items={historyItems} />
      </div>
    </section>
  )
}
