---
description: Create a reusable Service Landing template (Hero + Stats + Features + Process + CTA) fed by services config
---

1. **Create Reusable Components**
   - `src/components/services/ServiceHero.tsx`
   - `src/components/services/StatsStrip.tsx`
   - `src/components/services/FeatureGrid.tsx`
   - `src/components/services/ProcessTimeline.tsx`
   - `src/components/services/CTASection.tsx`

2. **Design Rules**
   - Tailwind-first
   - Consistent spacing, typography scale, and shadow tokens
   - Respect `prefers-reduced-motion`

3. **Data Contract**
   - Components consume `ServiceConfig` from `src/config/services.ts`
   - No hardcoded service copy inside components

4. **Integrate on Child Pages**
   - `/services/hyperautomation` uses template
   - `/services/sap-consulting` uses same template

5. **Acceptance Criteria**
   - Same template renders both pages with different content
   - No duplicated layout code across pages

6. **Commit Workflow (Optional)**
   // turbo
   - Run `git add .`
   // turbo
   - Run `git commit -m "Add reusable service landing template components"`
