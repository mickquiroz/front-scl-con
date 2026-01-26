export interface ServiceStat {
    value: string;
    label: string;
    sublabel?: string;
}

export interface ServiceHighlight {
    title: string;
    description: string;
    useCase?: string;
    badge?: string;
}

export interface ServiceProcessStep {
    title: string;
    description: string;
    deliverables?: string;
    duration?: string;
}

export interface ServiceHero {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryHref?: string;
    targetAudience?: string;
}

export interface ServiceCaseStudy {
    industry: string;
    title: string;
    result: string;
    description: string;
}

export interface ServiceTestimonial {
    quote: string;
    author: string;
    role: string;
    company?: string;
}

export interface ServiceSocialProof {
    headline: string;
    cases: ServiceCaseStudy[];
    testimonial?: ServiceTestimonial;
    logos?: string[]; // URLs strings or just placeholders for now
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    hero: ServiceHero;
    stats: ServiceStat[];
    highlights: ServiceHighlight[];
    process: ServiceProcessStep[];
    socialProof?: ServiceSocialProof;
}

export const countriesPresence = [
    "Chile",
    "Peru",
    "Colombia",
    "Costa Rica",
    "Guatemala",
    "United States",
    "Brazil",
    "Argentina",
    "Spain",
    "Mexico",
];

export const services: Service[] = [
    {
        id: "sap-consulting",
        title: "SAP Consulting",
        slug: "sap-consulting",
        shortDescription: "Expertos en transformación digital y optimización de procesos SAP.",
        hero: {
            headline: "Transformación SAP de Alto Impacto",
            subheadline: "Maximizamos el valor de su inversión SAP con soluciones a medida y consultoría experta.",
            ctaPrimary: "Contáctanos",
            ctaSecondary: "Ver Casos de Éxito",
            ctaPrimaryHref: "/contact",
            ctaSecondaryHref: "#cta",
        },
        stats: [
            { value: "15+", label: "Años de Experiencia" },
            { value: "50+", label: "Consultores Certificados" },
            { value: "100%", label: "Compromiso" },
        ],
        highlights: [
            {
                title: "Implementación S/4HANA",
                description: "Migración y despliegue de la última generación de ERP SAP.",
            },
            {
                title: "Optimización de Procesos",
                description: "Mejora continua y reingeniería de procesos de negocio.",
            },
            {
                title: "Soporte AMS",
                description: "Mantenimiento correctivo y evolutivo de su plataforma SAP.",
            },
            {
                title: "Migración a la Nube",
                description: "Estrategias seguras para llevar su infraestructura SAP a la nube.",
            }
        ],
        process: [
            {
                title: "Diagnóstico",
                description: "Evaluamos el estado actual de sus sistemas y procesos.",
            },
            {
                title: "Estrategia",
                description: "Diseñamos un roadmap de transformación alineado al negocio.",
            },
            {
                title: "Implementación",
                description: "Ejecución ágil con metodologías probadas y mínimo riesgo.",
            },
            {
                title: "Mejora Continua",
                description: "Soporte y optimización constante post-implementación.",
            }
        ]
    },
    {
        id: "hyperautomation",
        title: "Hyperautomation",
        slug: "hyperautomation",
        shortDescription: "Automatización inteligente de procesos con RPA y tecnologías avanzadas.",
        hero: {
            headline: "Automatización Inteligente que Reduce Costos hasta 70%",
            subheadline: "Transforme procesos manuales en flujos automatizados con RPA e IA. Mejore velocidad, precisión y cumplimiento mientras libera a su equipo para tareas de mayor valor. 500+ proyectos | 100+ bots en soporte | 80+ entregas exitosas",
            ctaPrimary: "Solicitar Diagnóstico",
            ctaSecondary: "Calcular ROI",
            ctaPrimaryHref: "#cta",
            ctaSecondaryHref: "#roi-calculator",
            targetAudience: "Finanzas • Operaciones • RR.HH. • Logística"
        },
        stats: [
            { value: "500+", label: "Proyectos", sublabel: "en LATAM + USA" },
            { value: "100+", label: "Bots en soporte", sublabel: "SLA y monitoreo" },
            { value: "80+", label: "Entregas exitosas", sublabel: "en producción" },
            { value: "2-6 sem", label: "Time-to-value", sublabel: "Implementación ágil" }
        ],
        highlights: [
            {
                title: "RPA Avanzado",
                description: "Robots software que automatizan tareas repetitivas con alta precisión, reduciendo errores y tiempos de ejecución.",
                useCase: "Conciliaciones, facturación, reporting",
                badge: "Top Demand"
            },
            {
                title: "Integración Cognitiva",
                description: "Uso de IA para procesamiento de documentos, clasificación automática y validación de datos complejos.",
                useCase: "Clasificación + validación automática",
                badge: "AI-Ready"
            },
            {
                title: "Process Mining",
                description: "Análisis profundo de trazas digitales para detectar cuellos de botella y optimizar flujos reales.",
                useCase: "Detecta cuellos de botella",
                badge: "Discovery"
            },
            {
                title: "Chatbots & Asistentes",
                description: "Interfaces conversacionales inteligentes que resuelven consultas frecuentes y ejecutan transacciones.",
                useCase: "Mesa de ayuda / atención",
                badge: "24/7"
            }
        ],
        process: [
            {
                title: "Discovery",
                description: "Identificación y priorización de oportunidades con análisis de viabilidad técnica y económica.",
                deliverables: "Lista priorizada + business case",
                duration: "1–2 semanas"
            },
            {
                title: "Diseño y Prototipado",
                description: "Definición de arquitectura, validación de reglas de negocio y creación de prueba de concepto.",
                deliverables: "PoC validada",
                duration: "1–2 semanas"
            },
            {
                title: "Desarrollo",
                description: "Construcción de bots robustos, integración con sistemas y pruebas exhaustivas (UAT).",
                deliverables: "Bots listos + QA",
                duration: "2–4 semanas"
            },
            {
                title: "Despliegue y Monitoreo",
                description: "Puesta en producción controlada, gestión del cambio y soporte continuo con SLA.",
                deliverables: "Orquestación + soporte",
                duration: "Ongoing"
            }
        ],
        socialProof: {
            headline: "Resultados Reales en Producción",
            cases: [
                {
                    industry: "Retail / Logística",
                    title: "Optimización de Inventario",
                    result: "Reducción de 40% en stock out",
                    description: "Automatización del proceso de reposición y alertas preventivas."
                },
                {
                    industry: "Servicios Financieros",
                    title: "Conciliación Bancaria",
                    result: "100% conciliación automática",
                    description: "Proceso diario que libera 4 horas/analista para análisis de discrepancias."
                },
                {
                    industry: "Seguros",
                    title: "Gestión de Siniestros",
                    result: "Tiempo de respuesta -60%",
                    description: "Clasificación automática de correos y extracción de datos de pólizas."
                }
            ],
            testimonial: {
                quote: "La implementación de RPA nos permitió escalar la operación sin aumentar el headcount administrativo, mejorando la calidad de vida del equipo.",
                author: "Gerente de Operaciones",
                role: "Retail Multinacional"
            }
        }
    },
];
