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
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton
        phoneNumber="56912345678"
        message="Hola, me interesa conocer más sobre sus servicios de consultoría TI."
      />
    </>
  )
}
