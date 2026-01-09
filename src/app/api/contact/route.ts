import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return false
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .slice(0, 1000) // Limit length
}

function validateFormData(data: unknown): { valid: boolean; errors: string[]; data?: ContactFormData } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Datos inválidos'] }
  }

  const formData = data as Record<string, unknown>

  // Required fields
  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length < 2) {
    errors.push('El nombre es requerido (mínimo 2 caracteres)')
  }

  if (!formData.email || typeof formData.email !== 'string' || !validateEmail(formData.email)) {
    errors.push('Email inválido')
  }

  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
    errors.push('El mensaje es requerido (mínimo 10 caracteres)')
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: [],
    data: {
      name: sanitizeInput(formData.name as string),
      email: (formData.email as string).trim().toLowerCase(),
      phone: formData.phone ? sanitizeInput(formData.phone as string) : undefined,
      company: formData.company ? sanitizeInput(formData.company as string) : undefined,
      service: formData.service ? sanitizeInput(formData.service as string) : undefined,
      message: sanitizeInput(formData.message as string),
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = validateFormData(body)

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validación fallida', details: validation.errors },
        { status: 400 }
      )
    }

    const formData = validation.data!

    // Log the contact form submission (in production, send email here)
    console.log('=== NUEVO CONTACTO ===')
    console.log('Nombre:', formData.name)
    console.log('Email:', formData.email)
    console.log('Teléfono:', formData.phone || 'No proporcionado')
    console.log('Empresa:', formData.company || 'No proporcionada')
    console.log('Servicio:', formData.service || 'No seleccionado')
    console.log('Mensaje:', formData.message)
    console.log('Fecha:', new Date().toISOString())
    console.log('====================')

    // In production, you would send an email here using a service like:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // Example with Resend (commented out):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'SCL Consultores <noreply@sclconsultores.com>',
      to: ['contacto@sclconsultores.com'],
      subject: `Nuevo contacto: ${formData.name} - ${formData.service || 'Consulta general'}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${formData.company || 'No proporcionada'}</p>
        <p><strong>Servicio de interés:</strong> ${formData.service || 'No seleccionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${formData.message}</p>
      `,
    })

    // Send auto-reply to user
    await resend.emails.send({
      from: 'SCL Consultores <noreply@sclconsultores.com>',
      to: [formData.email],
      subject: 'Hemos recibido tu mensaje - SCL Consultores',
      html: `
        <h2>Gracias por contactarnos, ${formData.name}!</h2>
        <p>Hemos recibido tu mensaje y nuestro equipo te contactará en menos de 24 horas hábiles.</p>
        <p>Si tienes alguna pregunta urgente, puedes contactarnos directamente:</p>
        <ul>
          <li>Email: contacto@sclconsultores.com</li>
          <li>Teléfono: +56 9 1234 5678</li>
        </ul>
        <p>Saludos cordiales,<br>El equipo de SCL Consultores</p>
      `,
    })
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
