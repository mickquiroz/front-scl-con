'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const services = [
  'Consultoría SAP',
  'Transformación Digital',
  'Outsourcing TI',
  'Servicios Cloud',
  'Automatización RPA',
  'Otro',
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contacto" className="section-padding bg-neutral-50">
      <div className="layout-wrapper">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-heading-1 md:text-display font-bold text-neutral-900 mb-4">
              <span className="text-neutral-500">Iniciemos tu </span>
              <span className="text-accent-500">proyecto</span>
            </h2>
            <p className="text-body-lg text-neutral-600 mb-8">
              Cuéntanos sobre tu desafío tecnológico. Nuestro equipo te contactará
              en menos de 24 horas para explorar cómo podemos ayudarte.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-1">Email</h4>
                  <a
                    href="mailto:contacto@sclconsultores.com"
                    className="text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    contacto@sclconsultores.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-1">Teléfono</h4>
                  <a
                    href="tel:+56912345678"
                    className="text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    +56 9 1234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-1">Oficina</h4>
                  <p className="text-neutral-600">
                    Santiago, Chile<br />
                    Lunes a Viernes, 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-heading-3 font-bold text-neutral-800 mb-2">
                  Mensaje enviado
                </h3>
                <p className="text-neutral-600 mb-6">
                  Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setSubmitStatus('idle')}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                        errors.name
                          ? 'border-red-500 bg-red-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      )}
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Email corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                        errors.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      )}
                      placeholder="tu@empresa.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 hover:border-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors resize-none',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                      errors.message
                        ? 'border-red-500 bg-red-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    )}
                    placeholder="Cuéntanos sobre tu proyecto o desafío..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Error message */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">
                      Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-5 h-5" />
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
