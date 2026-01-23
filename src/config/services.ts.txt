export interface ServiceStat {
    value: string;
    label: string;
}

export interface ServiceHighlight {
    title: string;
    description: string;
}

export interface ServiceProcessStep {
    title: string;
    description: string;
}

export interface ServiceHero {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
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
            headline: "Reduzca Costos y Acelere Operaciones con Automatización",
            subheadline: "500+ proyectos · 100+ bots en soporte · 80+ entregas exitosas. Libere el potencial de su equipo delegando tareas repetitivas a nuestra fuerza de trabajo digital.",
            ctaPrimary: "Solicitar Diagnóstico",
            ctaSecondary: "Hablar con Especialista",
        },
        stats: [
            { value: "500+", label: "Proyectos" },
            { value: "100+", label: "Bots en soporte" },
            { value: "80+", label: "Entregas exitosas" },
        ],
        highlights: [
            {
                title: "RPA Avanzado",
                description: "Robots software que automatizan tareas repetitivas con alta precisión.",
            },
            {
                title: "Integración Cognitiva",
                description: "Uso de IA para procesamiento de documentos y toma de decisiones.",
            },
            {
                title: "Process Mining",
                description: "Análisis profundo de procesos para identificar cuellos de botella.",
            },
            {
                title: "Chatbots & Asistentes",
                description: "Interfaces conversacionales inteligentes para atención al cliente.",
            }
        ],
        process: [
            {
                title: "Discovery",
                description: "Identificación y priorización de oportunidades de automatización.",
            },
            {
                title: "Diseño y Prototipado",
                description: "Creación de la arquitectura de la solución y validación rápida.",
            },
            {
                title: "Desarrollo",
                description: "Construcción de bots y agentes con mejores prácticas.",
            },
            {
                title: "Despliegue y Monitoreo",
                description: "Puesta en producción y orquestación centralizada.",
            }
        ]
    },
];
