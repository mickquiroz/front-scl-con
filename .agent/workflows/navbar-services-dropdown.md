---
description: Implement a modern Services dropdown (desktop + mobile), accessible, animated, and responsive
---

1. **Define UI Requirements**
   - Desktop:
     - Hover + focus open
     - Keyboard navigation (tab/enter/escape)
   - Mobile:
     - Submenu/accordion under “Services”
   - Visual:
     - Glass/blur panel, soft shadow, subtle border
     - Chevron rotation on open
     - Hover/focus-visible states

2. **Implement Component**
   - Create: `src/components/nav/ServicesDropdown.tsx`
   - Data source:
     - `src/config/services.ts`

3. **Accessibility**
   - Add:
     - `aria-haspopup="menu"`
     - `aria-expanded`
     - `role="menu"` / `role="menuitem"`
   - Ensure ESC closes dropdown

4. **Animation**
   - Use existing animation system:
     - If `framer-motion` exists → use it
     - Else use CSS transitions (fade + translate)

5. **Integrate into Navbar**
   - Replace static “Services” link with dropdown
   - Keep header spacing consistent

6. **Acceptance Criteria**
   - Works on desktop + mobile
   - Keyboard accessible
   - No layout shift or clipping

7. **Commit Workflow (Optional)**
   // turbo
   - Run `git add .`
   // turbo
   - Run `git commit -m "Add Services dropdown (modern + accessible)"`
