'use client'

import { CounterGrid } from '@/components/ui'

const teamStats = [
  { end: 175, suffix: '+', label: 'Profesionales certificados' },
  { end: 50, suffix: '+', label: 'Certificaciones SAP' },
  { end: 30, suffix: '+', label: 'Certificaciones Cloud' },
  { end: 20, suffix: '+', label: 'Certificaciones RPA' },
]

export function Team() {
  return (
    <section id="equipo" className="section-padding bg-neutral-50">
      <div className="layout-wrapper">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-heading-1 md:text-display font-bold text-neutral-900 mb-4">
            <span className="text-neutral-500">Nuestro </span>
            <span className="text-accent-500">Equipo</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Profesionales certificados y auditados, listos para integrarse a tu operación en días, no meses
          </p>
        </div>

        {/* Counters */}
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 lg:p-16">
          <CounterGrid counters={teamStats} />
        </div>
      </div>
    </section>
  )
}
