# QA CHECKLIST - SCL CONSULTORES

## 1. RESPONSIVE TESTING

### Mobile (360px)
- [ ] Header hamburger menu funciona
- [ ] Hero texto legible, imagen ajustada
- [ ] Cards en columna única
- [ ] Timeline vertical funcional
- [ ] Formulario usable con teclado
- [ ] WhatsApp button visible y clickeable
- [ ] Footer columnas apiladas
- [ ] Sin scroll horizontal

### Tablet (768px)
- [ ] Navegación colapsada o completa
- [ ] Grid 2 columnas en cards
- [ ] Hero layout ajustado
- [ ] Formulario campos en 2 columnas

### Desktop (1024px)
- [ ] Navegación completa visible
- [ ] Grid 3-4 columnas en cards
- [ ] Timeline horizontal
- [ ] Layout 2 columnas en contacto

### Large Desktop (1440px)
- [ ] Contenido centrado
- [ ] Max-width respetado (1440px)
- [ ] Texto no ultra-ancho
- [ ] Espaciado balanceado

### Extra Large (1920px)
- [ ] No se ve "pegado a la izquierda"
- [ ] Container max-width aplicado
- [ ] Padding lateral consistente
- [ ] Imágenes no estiradas

---

## 2. FUNCIONALIDAD

### Navegación
- [ ] Logo clickeable vuelve a inicio
- [ ] Links smooth scroll funcionan
- [ ] Menú mobile abre/cierra
- [ ] Navbar sticky funciona
- [ ] Estado activo en links

### Formulario de Contacto
- [ ] Validación campos requeridos
- [ ] Email validation funciona
- [ ] Submit muestra loading state
- [ ] Success message aparece
- [ ] Error message aparece si falla
- [ ] Campos se limpian tras éxito

### WhatsApp Button
- [ ] Link correcto formateado
- [ ] Mensaje pre-poblado
- [ ] Abre WhatsApp en nueva tab
- [ ] Visible en todas las páginas
- [ ] No bloquea contenido

### Contadores
- [ ] Animación se activa al scroll
- [ ] Números cuentan correctamente
- [ ] Solo se activa una vez

---

## 3. ACCESIBILIDAD (WCAG 2.1 AA)

### Contraste
- [ ] Texto normal: ratio 4.5:1 mínimo
- [ ] Texto grande: ratio 3:1 mínimo
- [ ] Botones legibles
- [ ] Links distinguibles

### Navegación por Teclado
- [ ] Tab order lógico
- [ ] Focus states visibles
- [ ] Skip to content (si aplica)
- [ ] Menú mobile accesible

### Screen Readers
- [ ] Alt text en imágenes
- [ ] ARIA labels en iconos
- [ ] Estructura semántica (header, nav, main, footer)
- [ ] Headings jerárquicos (h1 > h2 > h3)

### Formularios
- [ ] Labels asociados a inputs
- [ ] Error messages descriptivos
- [ ] Required fields marcados

---

## 4. PERFORMANCE

### Core Web Vitals (Targets)
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)

### Lighthouse Scores (Desktop)
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Lighthouse Scores (Mobile)
- [ ] Performance > 85
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Assets
- [ ] Imágenes optimizadas (WebP)
- [ ] Fonts cargando correctamente
- [ ] Sin recursos bloqueantes
- [ ] CSS minificado

---

## 5. SEO

### Meta Tags
- [ ] Title único y descriptivo (<60 chars)
- [ ] Description relevante (<160 chars)
- [ ] Keywords incluidos
- [ ] Canonical URL

### Open Graph
- [ ] og:title
- [ ] og:description
- [ ] og:image (1200x630)
- [ ] og:url
- [ ] og:type

### Twitter Cards
- [ ] twitter:card
- [ ] twitter:title
- [ ] twitter:description
- [ ] twitter:image

### Estructura
- [ ] Un solo H1 por página
- [ ] Headings jerárquicos
- [ ] URLs limpias
- [ ] Sitemap.xml accesible
- [ ] robots.txt configurado

---

## 6. CROSS-BROWSER

### Desktop
- [ ] Chrome (último)
- [ ] Firefox (último)
- [ ] Safari (último)
- [ ] Edge (último)

### Mobile
- [ ] iOS Safari
- [ ] Chrome Android
- [ ] Samsung Internet

---

## 7. SEGURIDAD

### Headers
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy configurado

### Formulario
- [ ] Rate limiting activo
- [ ] Input sanitization
- [ ] No SQL injection posible
- [ ] CSRF protection (si aplica)

### General
- [ ] HTTPS configurado
- [ ] No secrets expuestos
- [ ] .env no en repositorio

---

## 8. DEPLOY CHECKLIST

### Pre-Deploy
- [ ] Build exitoso sin errores
- [ ] Variables de entorno configuradas
- [ ] Dominio apuntando correctamente
- [ ] SSL certificado activo

### Post-Deploy
- [ ] Sitio accesible en URL producción
- [ ] Formulario envía emails
- [ ] WhatsApp link funciona
- [ ] Analytics configurado
- [ ] Sin errores en console
- [ ] Sin 404s ni broken links

---

## NOTAS

### Comandos Útiles
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview producción local
npm run start

# Lint
npm run lint
```

### Deploy en Vercel
1. Conectar repo a Vercel
2. Configurar variables de entorno:
   - `RESEND_API_KEY` (para emails)
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy automático desde main

### Contacto Form Testing
El formulario actualmente logea en consola. Para producción:
1. Registrar en Resend.com
2. Agregar API key como variable de entorno
3. Descomentar código de envío en `/api/contact/route.ts`

---

## FIRMA QA

- Fecha: ____________
- QA por: ____________
- Versión: 1.0.0
- Estado: [ ] APROBADO / [ ] REQUIERE CAMBIOS
