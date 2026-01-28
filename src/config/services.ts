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
    bgImageSrc?: string;
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
    bgImageSrc?: string;
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
    testimonials?: ServiceTestimonial[];
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
    processShowcase?: ServiceProcessShowcase;
}

export interface ServiceProcessSector {
    key: string;
    label: string;
    videoSrc: string;
}

export interface ServiceProcessShowcase {
    title: string;
    subtitle?: string;
    sectors: ServiceProcessSector[];
}

export interface TrustedCompany {
    name: string;
    logo: string;
    href?: string;
}

export interface InternationalPresenceItem {
    code: string;
    label: string;
    flagEmoji: string;
    flagAsset?: string;
}

export interface InternationalPresenceConfig {
    hubs: InternationalPresenceItem[];
    coverage: InternationalPresenceItem[];
}

export const internationalPresence: InternationalPresenceConfig = {
    hubs: [
        { code: "CL", label: "Chile", flagEmoji: "🇨🇱" },
        { code: "PE", label: "Perú", flagEmoji: "🇵🇪" },
        { code: "US", label: "Estados Unidos", flagEmoji: "🇺🇸" },
    ],
    coverage: [
        { code: "CO", label: "Colombia", flagEmoji: "🇨🇴" },
        { code: "CR", label: "Costa Rica", flagEmoji: "🇨🇷" },
        { code: "GT", label: "Guatemala", flagEmoji: "🇬🇹" },
        { code: "BR", label: "Brasil", flagEmoji: "🇧🇷" },
        { code: "AR", label: "Argentina", flagEmoji: "🇦🇷" },
        { code: "ES", label: "España", flagEmoji: "🇪🇸" },
        { code: "MX", label: "México", flagEmoji: "🇲🇽" },
    ]
};

export const trustedCompanies: TrustedCompany[] = [
    { name: "Entel", logo: "/images/empresas/entel.svg" },
    { name: "CCU", logo: "/images/empresas/ccu.svg" },
    { name: "Komatsu", logo: "/images/empresas/komatsu.svg" },
    { name: "Deloitte", logo: "/images/empresas/deloitte.svg" },
    { name: "Sonda", logo: "/images/empresas/sonda.svg" },
    { name: "Agrosuper", logo: "/images/empresas/agrosuper.svg" },
    { name: "Mallplaza", logo: "/images/empresas/mallplaza.svg" },
    { name: "Novis", logo: "/images/empresas/novis.svg" },
    { name: "Camanchaca", logo: "/images/empresas/camanchaca.svg" },
    { name: "AquaChile", logo: "/images/empresas/aquachile.svg" },
    { name: "Coagra", logo: "/images/empresas/coagra.svg" },
    { name: "Tattersall", logo: "/images/empresas/tattersall.svg" },
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
                badge: "Top Demand",
                bgImageSrc: "/images/capacidades/rpa-avanzado-2.jpg"
            },
            {
                title: "Integración Cognitiva",
                description: "Uso de IA para procesamiento de documentos, clasificación automática y validación de datos complejos.",
                useCase: "Clasificación + validación automática",
                badge: "AI-Ready",
                bgImageSrc: "/images/capacidades/integracion-cognitiva-3.png"
            },
            {
                title: "Process Mining",
                description: "Análisis profundo de trazas digitales para detectar cuellos de botella y optimizar flujos reales.",
                useCase: "Detecta cuellos de botella",
                badge: "Discovery",
                bgImageSrc: "/images/capacidades/process-mining-1.jpeg"
            },
            {
                title: "Chatbots & Asistentes",
                description: "Interfaces conversacionales inteligentes que resuelven consultas frecuentes y ejecutan transacciones.",
                useCase: "Mesa de ayuda / atención",
                badge: "24/7",
                bgImageSrc: "/images/capacidades/chatbot-2.png"
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
                    description: "Automatización del proceso de reposición y alertas preventivas.",
                    bgImageSrc: "/images/resultados/retail-1.png"
                },
                {
                    industry: "Servicios Financieros",
                    title: "Conciliación Bancaria",
                    result: "100% conciliación automática",
                    description: "Proceso diario que libera 4 horas/analista para análisis de discrepancias.",
                    bgImageSrc: "/images/resultados/financiero-1.png"
                },
                {
                    industry: "Seguros",
                    title: "Gestión de Siniestros",
                    result: "Tiempo de respuesta -60%",
                    description: "Clasificación automática de correos y extracción de datos de pólizas.",
                    bgImageSrc: "/images/resultados/seguros-1.png"
                }
            ],
            testimonials: [
                {
                    quote: "La implementación de RPA nos permitió escalar la operación sin aumentar el headcount administrativo, mejorando la calidad de vida del equipo.",
                    author: "María Fernanda Rojas",
                    role: "Gerente de Operaciones",
                    company: "COAGRA"
                },
                {
                    quote: "Redujimos el tiempo de cierre mensual de 5 días a 2 días gracias a la automatización de conciliaciones y reportes financieros.",
                    author: "Carlos Mendoza",
                    role: "Jefe de Tesorería",
                    company: "Camanchaca"
                },
                {
                    quote: "Process Mining nos ayudó a identificar cuellos de botella que no veíamos. Optimizamos el flujo de órdenes de compra y mejoramos nuestro SLA.",
                    author: "Andrés Valenzuela",
                    role: "Líder de Automatización",
                    company: "KOMATSU"
                },
                {
                    quote: "La integración cognitiva transformó nuestro proceso de clasificación de documentos. Ahora procesamos facturas en minutos, no en horas.",
                    author: "Patricia Silva",
                    role: "Subgerente de TI",
                    company: "Viumanent"
                },
                {
                    quote: "Los bots de RPA liberaron a nuestro equipo de tareas repetitivas. Ahora se enfocan en análisis estratégico y mejora continua.",
                    author: "Roberto Guzmán",
                    role: "Director de Procesos",
                    company: "Agrosuper"
                },
                {
                    quote: "Implementamos chatbots para consultas internas y redujimos la carga de la mesa de ayuda en un 45%. El equipo está más satisfecho.",
                    author: "Claudia Morales",
                    role: "Gerente de RR.HH.",
                    company: "Aquachile"
                },
                {
                    quote: "La automatización de nuestros procesos de auditoría mejoró la trazabilidad y nos preparó mejor para cumplimiento normativo.",
                    author: "Luis Hernández",
                    role: "Jefe de Compliance",
                    company: "Frusan"
                },
                {
                    quote: "Con RPA logramos procesar solicitudes de crédito más rápido y con menos errores. Nuestros clientes notan la diferencia.",
                    author: "Daniela Campos",
                    role: "Gerente de Crédito",
                    company: "APAS"
                },
                {
                    quote: "La integración entre SAP y nuestros sistemas legacy era un dolor de cabeza. La automatización lo resolvió de forma elegante y confiable.",
                    author: "Jorge Ramírez",
                    role: "Arquitecto de Soluciones",
                    company: "RAM"
                },
                {
                    quote: "Automatizamos la generación de reportes regulatorios y ganamos tiempo valioso para análisis de riesgos y planificación estratégica.",
                    author: "Sofía Vargas",
                    role: "Gerente de Riesgos",
                    company: "TATTERSALL"
                },
                {
                    quote: "La hiperautomatización nos permitió escalar servicios digitales sin comprometer la calidad. Reducimos costos operativos significativamente.",
                    author: "Fernando Castillo",
                    role: "Director de Transformación Digital",
                    company: "Entel"
                }
            ],
        },
        processShowcase: {
            title: "Derriba los silos y acelera la transformación de tu negocio.",
            sectors: [
                { key: "finance", label: "Finance", videoSrc: "/videos/Finance.mp4" },
                { key: "healthcare", label: "Healthcare", videoSrc: "/videos/Healthcare.mp4" },
                { key: "supply-chain", label: "Supply Chain", videoSrc: "/videos/Supply_Chain.mp4" },
                { key: "operations", label: "Operations", videoSrc: "/videos/Operations.mp4" },
                { key: "banking", label: "Banking", videoSrc: "/videos/Banking.mp4" }
            ]
        }
    }
];