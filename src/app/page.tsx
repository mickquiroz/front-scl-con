import { Suspense } from 'react'
import {
  Header,
  Hero,
  MissionVision,
  Values,
  History,
  Team,
  WhyChooseUs,
  Contact,
  Footer,
} from '@/components/sections'
import { WhatsAppButton } from '@/components/ui'
import { TrustedBySection } from '@/components/services/TrustedBySection'
import { trustedCompanies } from '@/config/services'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionVision />
        <Values />
        <History />
        <Team />
        <WhyChooseUs />
        <TrustedBySection companies={trustedCompanies} />
        <Suspense fallback={<div className="section-padding bg-neutral-50" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton
        phoneNumber="56912345678"
        message="Hola, me interesa conocer más sobre sus servicios de consultoría TI."
      />
    </>
  )
}
