import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sclconsultores.com'),
  title: 'SCL Consultores | Transformación Digital & Consultoría SAP',
  description: 'Consultora de tecnología especializada en outsourcing TI, consultoría SAP y transformación digital. 15+ años de experiencia, 500+ proyectos completados con 98% de tasa de éxito.',
  keywords: [
    'consultoría SAP',
    'transformación digital',
    'outsourcing TI',
    'servicios cloud',
    'automatización RPA',
    'consultora tecnología Chile',
    'SAP Partner',
  ],
  authors: [{ name: 'SCL Consultores' }],
  creator: 'SCL Consultores',
  publisher: 'SCL Consultores',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://sclconsultores.com',
    siteName: 'SCL Consultores',
    title: 'SCL Consultores | Transformación Digital & Consultoría SAP',
    description: 'Consultora de tecnología especializada en outsourcing TI, consultoría SAP y transformación digital. 15+ años de experiencia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SCL Consultores - Transformación Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCL Consultores | Transformación Digital & Consultoría SAP',
    description: 'Consultora de tecnología especializada en outsourcing TI, consultoría SAP y transformación digital.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0085B3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
