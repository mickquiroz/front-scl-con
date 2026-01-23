---
description: Apply a consistent motion system across the site (scroll reveal, hover lift, counters), respecting reduced-motion
---

1. **Audit Current Motion**
   - Identify:
     - existing animation utilities
     - repeated patterns
     - pages lacking motion (hero/cards)

2. **Define Motion Tokens**
   - Create variants:
     - `fadeUp`, `stagger`, `scaleIn`
   - Ensure reduced motion support:
     - disable or shorten motion when `prefers-reduced-motion`

3. **Apply to Key Sections**
   - Navbar dropdown (subtle)
   - Service cards
   - Stats counters
   - CTA blocks

4. **Performance Gate**
   - Avoid excessive blur layers on mobile
   - Keep animations minimal and GPU-friendly

5. **Acceptance Criteria**
   - Consistent motion language across pages
   - No jitter / no layout shifts
   - Reduced-motion respected

6. **Commit Workflow (Optional)**
   // turbo
   - Run `git add .`
   // turbo
   - Run `git commit -m "Add site-wide motion system (consistent + accessible)"`
