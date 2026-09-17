
## 1. Project Summary

Build a **premium, editorial-style landing page** for **ND Natural Products**, a natural skincare brand rooted in raw, unprocessed ingredients (laurel, castor, coffee, frankincense, senna). This is a $5,000–$8,000 tier project — the client wants it to feel like a Le Labo, Aesop, or Loewe Perfumes microsite, not a templated Shopify landing page.

**Current products:** Laurel Soap, Castor Oil
**Launching soon:** Coffee Soap, Body Scrubs, Essential Oils, Senna Tea, Frankincense Oil, Skin Serum

**Non-negotiables from the client:**
- High-end, luxurious, modern feel — nothing generic or "AI-template" looking.
- Real motion design: GSAP (ScrollTrigger) + Three.js, used with intent, not decoration.
- Fully responsive (mobile, tablet, desktop, large desktop).
- **Long-form scroll** — this is a rich, immersive one-pager with many distinct full-viewport sections, not a short 3-section landing page. Build enough content depth that scrolling feels like a journey, not a scan.

---

## 2. Design System (define these tokens before writing any code)

### 2.1 Color Palette
Use these as CSS custom properties. Do not substitute a generic "AI cream + terracotta" palette — this exact palette is the brief.

```css
:root {
  --beige:        #EDE4D3;  /* primary background */
  --taupe:        #B4A392;  /* secondary background / cards */
  --stone:        #D3CDBF;  /* dividers, borders, muted surfaces */
  --sage:         #8C9773;  /* primary accent — CTAs, icons, highlights */
  --sage-dark:    #5F6A4C;  /* deep sage for text-on-light, hover states */
  --warm-brown:   #A8623E;  /* terracotta-leaning brown — secondary accent, warm highlights */
  --olive-gold:   #B08D3E;  /* metallic accent — dividers, small caps labels, foil-style details */
  --ink:          #2C2A24;  /* near-black warm charcoal for body text, not pure black */
  --cream-white:  #FBF8F2;  /* lightest surface, product cards */
}
```
Usage rule: beige/stone/taupe carry ~70% of the page as calm background; sage and warm-brown are accents (CTAs, underlines, icon fills); olive-gold is used sparingly for dividers, small-caps eyebrow labels, and hover states — treat it like foil stamping, not a fill color.

### 2.2 Typography
- **Display serif:** `Fraunces` (variable font, Google Fonts) — used large, tight tracking, for headlines and product names. Lean into its soft, ink-trap serif detail at large sizes.
- **Body sans:** `General Sans` (Fontshare, free) or `Inter` as fallback — used for paragraph copy, UI labels.
- **Accent/label face:** `Fraunces` italic or a small-caps treatment of the body font at wide letter-spacing (0.15–0.2em) for eyebrow labels like "01 — THE RITUAL" or "COMING SOON."

Set a real type scale (not default browser sizes) — e.g. hero display 7–9rem desktop / 2.5rem mobile, section headings 3–4rem, body 1.05–1.15rem with 1.6–1.7 line-height.

### 2.3 Layout Concept
Editorial-apothecary layout: generous whitespace, asymmetric grids (not everything centered in a 12-col grid), full-bleed macro photography of raw ingredients (laurel leaves, castor beans, coffee grounds, frankincense resin tears, senna leaves) bleeding to the viewport edge while text sits in a narrower, deliberate column. Avoid the default "centered hero, 3-card grid, centered CTA" template.

### 2.4 Signature Element
Build one moment the site is remembered for: a **3D "ingredient-to-product" scene** — as the user scrolls into the product/hero area, raw ingredients (a laurel leaf, a castor bean, a coffee bean) drift in from the edges of the viewport in 3D space, rotate, and assemble/settle into the shape of the product bottle or soap bar, which then resolves into a real product photo/label. This ties the 3D requirement directly to the brand story (raw ingredient → refined product) instead of using Three.js as generic background decoration.

### 2.5 Aesthetic References (mood, not to be copied literally)
Aesop.com (restraint, typography-led), Le Labo (raw/apothecary materiality), Loewe Perfumes (tactile macro photography), COS/Arket (editorial spacing). Avoid: dark-mode neon-accent tech aesthetics, dense broadsheet newspaper grids, and the generic "cream background + terracotta serif hero" combo unless it matches these exact tokens above.

---

## 3. Tech Stack

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS, driven by the CSS variables above (extend `tailwind.config` with the palette and font families — don't hardcode hex values in components)
- **Scroll & motion:** GSAP 3 + `ScrollTrigger` (+ `ScrollSmoother` if licensed, otherwise `Lenis` for buttery smooth scroll)
- **3D:** Three.js via `@react-three/fiber` + `@react-three/drei` for the signature ingredient-assembly scene and any ambient particle/dust motes in the hero
- **Micro-interactions:** Framer Motion for UI-level transitions (menu open/close, hover states, image reveals) — keep GSAP focused on the scroll-driven narrative, Framer Motion on discrete UI moments
- **Forms:** a simple form endpoint (e.g. Formspree, Resend, or a Next.js API route) for the newsletter and contact form
- **Images:** `next/image` with blur placeholders, responsive `sizes`, and lazy loading below the fold
- **Fonts:** loaded via `next/font` (self-hosted, no layout shift)
- **Deployment target:** Vercel

---

## 4. Global Interaction Rules

- **Smooth scroll** across the whole page (Lenis or ScrollSmoother), tuned to feel weighty and premium, not floaty.
- **Custom cursor** on desktop only: a small dot that expands/labels itself ("View," "Explore") over interactive elements; fall back to the native cursor on touch devices.
- **Page load sequence:** a brief, elegant intro (logo mark draws in or the wordmark fades/reveals with the tagline) before the hero settles — under 2 seconds, skippable on scroll/click.
- **Scroll-triggered reveals:** text and images animate in (fade + slight rise, or clip-path reveals) as they enter viewport — stagger children, don't animate every element identically.
- **Sticky/pinned moments:** at least one pinned section (e.g. the product collection or the ingredient-assembly scene) where scroll progress drives the animation timeline via `ScrollTrigger.scrub`.
- **Reduced motion:** respect `prefers-reduced-motion` — provide a non-animated fallback for every scroll-triggered and 3D sequence.
- **Accessibility floor:** semantic HTML, visible keyboard focus states styled in-palette (not browser default blue), alt text on all product/ingredient imagery, color contrast checked against the beige/stone backgrounds.

---

## 5. Full Page Structure (long-scroll, ~10 sections)

Build every section below as its own full-bleed or full-viewport block — this should feel like a long, cinematic scroll, not a short single-screen pitch.

**01 — Hero**
Full-viewport. Wordmark "ND" large and centered or asymmetrically placed, tagline (e.g. "Skincare, Unrefined" — write real copy, see §9), soft ambient 3D dust/particle motes drifting via Three.js, muted video or macro photo of laurel leaves/oil pouring as background. Scroll-cue at the bottom (small animated line or arrow, on-brand not default browser style).

**02 — Brand Philosophy / Origin Story**
Editorial two-column layout: short founder/brand story on one side (why natural, why these ingredients), a large macro photograph on the other. Text reveals line-by-line on scroll (GSAP SplitText-style stagger).

**03 — The Ritual / How It's Made**
A horizontal or pinned-scroll sequence showing the raw-to-refined process (harvest → cold-press/extraction → cure → finished bar/oil), 3–4 steps, using structural numbering here because it's a genuine sequential process.

**04 — The Signature Scene (Ingredient Assembly)**
The pinned 3D moment described in §2.4. This is the visual centerpiece of the page — give it real scroll length (don't rush it).

**05 — The Collection: Available Now**
Laurel Soap and Castor Oil, presented as large, tactile product features (not small e-commerce cards) — full product photography, ingredient callouts (e.g. "Cold-pressed laurel berry oil, saponified over 40 days"), price/CTA ("Shop Laurel Soap"). Each product gets real vertical space, not a cramped grid.

**06 — Testimonials / Social Proof**
Editorial-style quote carousel (large serif quote, small attribution) rather than star-rating review cards — matches the luxury register.

**07 — Ingredients Deep-Dive**
A tactile, macro-photography grid of raw materials (laurel berries, castor beans, coffee, frankincense resin, senna leaf) each with a one-line provenance/benefit note on hover or scroll-reveal.

**08 — Sustainability / Craft Values**
Short-form section on sourcing ethics, small-batch production, packaging — 3 concise value statements, understated icons in sage/olive-gold, not a generic "our values" icon grid.

**09 — Newsletter / "Join the Ritual"**
Email capture tied to product launches ("Be first to try the Skin Serum"), styled as a full-bleed moment with a strong background (photo or solid sage/warm-brown block), not a footer afterthought.

**10 — Footer**
Logo, navigation, social links, contact info, small legal line — quiet and minimal, in `--ink` on `--stone` or `--taupe`.

---

## 6. Product Display System

- **Available products** (Laurel Soap, Castor Oil): full editorial treatment per §05 — hero-quality photo, ingredient story, price, add-to-cart/shop-now CTA.
- **Upcoming products** (6 items): grouped together, visually "veiled" or muted compared to available ones, each with a "Notify Me" capture instead of a buy button.
- Every product card/feature should show: product name (display serif), one-line description in the brand's voice, key ingredient callout, and either a CTA (available) or notify form (coming soon).
- Reserve the full 3D treatment (§2.4) for 1–2 flagship products (Laurel Soap + Skin Serum are good candidates — one available, one upcoming) rather than building six separate 3D scenes; keep the rest as high-quality photography with GSAP reveals to protect performance.

---

## 7. Responsive Behavior

- **Mobile (< 640px):** stack all multi-column sections vertically, reduce hero display type to ~2.2–2.8rem, disable the custom cursor, simplify or disable the pinned 3D scene to a lighter fallback (static image + subtle CSS parallax) to protect performance and battery.
- **Tablet (640–1024px):** adjust grid columns (e.g. 2-col instead of 3–4), keep motion but reduce particle counts in the 3D scene.
- **Desktop (1024px+):** full experience as specified above.
- **Large desktop (1440px+):** cap max content width (e.g. 1440–1600px) with generous margins rather than stretching full-bleed text.
- Test touch targets, tap states (replace hover-only interactions with tap-friendly equivalents), and horizontal-scroll galleries on mobile (should be swipeable, not scroll-jacked).

---

## 8. Performance Checklist

- Lazy-load all below-the-fold imagery and the 3D canvas (mount on intersection, not on initial page load).
- Compress/optimize product and ingredient photography (WebP/AVIF).
- Cap 3D scene complexity (low-poly or instanced particles, not high-poly product models) to keep it smooth on mid-range devices.
- Code-split the Three.js scene so it doesn't block initial page load/LCP.
- Target Lighthouse performance ≥ 85 on mobile despite the animation load.

---

## 9. Copy & Tone Guidelines

Write real copy — don't ship lorem ipsum or generic placeholder lines. Voice: warm, confident, unhurried, sensory (this is a brand about raw materials and ritual, not clinical skincare science). Active voice, plain but evocative language, no filler adjectives stacked together ("luxurious premium natural" — pick one).

Sample directions (adapt, don't necessarily use verbatim):
- Hero tagline: "Skincare, unrefined." or "From the earth, to the skin."
- Section 02 eyebrow: "OUR PHILOSOPHY"
- Section 06 label: "COMING SOON — SIGN UP TO BE FIRST"
- CTA verbs: "Shop the soap," "Notify me at launch," "Read the ritual" — name the actual action, not "Submit" or "Learn more" everywhere.

---

## 10. Deliverables & Structure

```
/app
  /page.tsx                → assembles all sections
  /components
    Hero.tsx
    BrandStory.tsx
    RitualProcess.tsx
    IngredientScene3D.tsx   → the signature R3F scene
    CollectionAvailable.tsx
    Testimonials.tsx
    IngredientsGrid.tsx
    SustainabilityValues.tsx
    NewsletterCTA.tsx
    Footer.tsx
    CustomCursor.tsx
  /lib
    gsap.ts                → GSAP + ScrollTrigger registration/config
    smoothScroll.ts         → Lenis setup
  /styles
    globals.css             → CSS variable tokens from §2.1
tailwind.config.ts          → extended with palette + fonts
```

---

## 11. How to Use This Prompt

If pasting into an AI coding tool: ask it to (1) confirm the design token plan against §2 before writing code, (2) scaffold the Next.js project and install gsap, three, @react-three/fiber, @react-three/drei, framer-motion, lenis, (3) build section-by-section in the order listed in §5, checking responsive behavior (§7) and reduced-motion fallbacks (§4) after each section, rather than writing the entire page in one pass.
