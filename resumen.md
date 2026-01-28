# Resumen del Proyecto: SCL Consultores Web

Este documento sirve como guía integral para comprender la arquitectura, estructura y propósito del proyecto web de **SCL Consultores**, diseñado para ser consumido por una IA o desarrollador que necesite contexto rápido sin acceso directo a todo el repositorio.

## 1. Visión General del Proyecto
El proyecto es el sitio web corporativo premium de **SCL Consultores**, una firma tecnológica especializada en consultoría SAP, Transformación Digital y Outsourcing TI.
*   **Objetivo:** Comunicar autoridad, experiencia y modernidad.
*   **Público Objetivo:** Gerentes de TI, Operaciones y Finanzas en búsqueda de optimización de procesos y servicios SAP.
*   **Estética:** Diseño limpio, corporativo y moderno ("Premium Tech"), priorizando el modo claro (Light Mode) con acentos en colores de marca (Teal, Cyan, Orange).

## 2. Stack Tecnológico
*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router).
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (configuración moderna vía CSS puro con `@theme`).
*   **Iconos:** `lucide-react`.
*   **Testing:** `vitest` y `testing-library`.
*   **Gestor de Paquetes:** `npm`.

## 3. Estructura de Carpetas (`src/`)
La lógica principal vive dentro de `src/`. A continuación, la anatomía del directorio:

*   **`app/`**: Contiene las rutas y layouts del App Router de Next.js.
    *   `layout.tsx`: Root Layout que define fuentes (Inter), metadatos SEO globales y estilos base.
    *   `page.tsx`: Página de inicio (Home).
    *   `services/`: Rutas dinámicas o estáticas para los servicios (e.g., `hyperautomation`, `sap-consulting`).
    *   `contact/`: Página de contacto.
    *   `api/`: Endpoints de API (si aplican).
*   **`components/`**: Arquitectura de componentes modular.
    *   `ui/`: Componentes base/atómicos reutilizables (Botones, Cards, Contadores). *No dependen del negocio.*
    *   `sections/`: Bloques grandes de UI para construir páginas (e.g., Hero, Features, ContactForm).
    *   `services/`: Componentes específicos para las páginas de servicios (e.g., `HeroROIButton`, `ServiceHero`).
    *   `nav/`: Componentes de navegación (Header, Footer).
*   **`config/`**: Configuración de datos y contenido.
    *   `services.ts`: **Archivo crítico**. Contiene toda la data estructurada de los servicios (títulos, descripciones, stats, casos de éxito). Separa el contenido del código.
*   **`styles/`**:
    *   `globals.css`: Punto de entrada de estilos. Define los **Design Tokens** y configuración de Tailwind v4.
*   **`lib/`**, **`hooks/`**: Utilidades y hooks personalizados.

## 4. Arquitectura y Diseño

### Sistema de Diseño (Tailwind v4)
El proyecto utiliza la última versión de Tailwind, definiendo el tema directamente en CSS (`src/styles/globals.css`).
*   **Variables CSS:** Se usan variables semánticas (`--primary`, `--secondary`, `--accent`, `--background`) para facilitar el mantenimiento y consistencia.
*   **Colores Clave:**
    *   `Primary` (#0583AF): Teal corporativo.
    *   `Accent` (#1E98C3): Cyan para destaques.
    *   `CTA` (#F1872B): Naranja para llamadas a la acción (Botones).
    *   `Background` (#F7F7F4): Blanco hueso/crema muy suave para un look premium y legible.

### Gestión de Contenido
El contenido de los servicios no está "harcodeado" en los componentes (JSX), sino que se alimenta de `src/config/services.ts`. Esto permite a una IA o desarrollador actualizar textos, cifras o testimonios en un solo lugar y que se propaguen por toda la UI.

### Componentes Clave
*   `Counter.tsx`: Contador animado para estadísticas (maneja `useRef` y `IntersectionObserver`).
*   `ServiceHero`: Componente polimórfico que adapta su contenido (título, subtítulo, CTAs) según el servicio inyectado.

## 5. Comandos Importantes (`package.json`)
*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila para producción.
*   `npm run lint`: Verifica reglas de código (ESLint).
*   `npm test`: Corre los tests unitarios (Vitest).

## 6. Notas para la IA (Contexto de Negocio)
Si necesitas generar contenido o modificar la UI, ten en cuenta:
1.  **Tono:** Profesional, experto, pero accesible. Enfocado en "Resultados" y "ROI".
2.  **Servicios Foco:**
    *   **Hyperautomation (RPA):** Enfocado en eficiencia, ahorro de costos y bots.
    *   **SAP Consulting:** Enfocado en migración S/4HANA, optimización y soporte.
3.  **Restricciones:** Mantener la consistencia del Design System. No introducir estilos inline arbitrarios; usar siempre las clases de utilidad de Tailwind definidas en `@theme`.
