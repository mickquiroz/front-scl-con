---
description: Make "Services" data-driven (single config powering Navbar dropdown + /services overview + child pages)
---

1. **Define Inputs & Targets**
   - Target routes:
     - `/services` (overview)
     - `/services/sap-consulting`
     - `/services/hyperautomation`
   - Target components:
     - Navbar “Services” dropdown
     - Service landing template components

2. **Detect Routing Mode (App vs Pages Router)**
   - Check if project uses:
     - `src/app` (App Router), or
     - `src/pages` (Pages Router)
   - Implement pages accordingly (do not mix patterns).

3. **Create Central Config**
   - Create: `src/config/services.ts`
   - Include fields:
     - `id`, `title`, `slug`, `shortDescription`
     - `hero { headline, subheadline, ctaPrimary, ctaSecondary }`
     - `stats[]` (value + suffix)
     - `highlights[]` (title + description)
     - `countriesPresence[]` (shared)

4. **Wire Navbar to Config**
   - Update Navbar to consume `services.ts`
   - Dropdown items must map to `/services/${slug}`

5. **Create /services Overview Page**
   - Generate cards from config:
     - Title, shortDescription, CTA link

6. **Create Child Pages**
   - Implement `/services/hyperautomation` and `/services/sap-consulting`
   - Content must be injected from the same config

7. **Acceptance Criteria**
   - Adding a new service requires editing only `services.ts`
   - Navbar dropdown + `/services` + child pages render correctly
   - Mobile navigation works (no overflow)

8. **Commit Workflow (Optional)**
   // turbo
   - Run `git add .`
   // turbo
   - Run `git commit -m "Make services data-driven (config + routes)"`
