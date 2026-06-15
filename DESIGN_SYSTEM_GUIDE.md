# 🎨 TattooTalks Premium Design System
## "Molten Gold" - World-Class Luxury Aesthetic

---

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [CSS Utility Classes](#css-utility-classes)
4. [Component Examples](#component-examples)
5. [Best Practices](#best-practices)

---

## 🎨 Color Palette

### Base Backgrounds (No Pure Black)
```css
--ink-primary: #121212    /* Primary Background (Cod Gray) */
--ink-surface: #1A1A1A    /* Cards/Surfaces (Deep Charcoal) */
--ink-deep: #0D0D0D       /* Deepest shadows */
```

**Usage in Tailwind:**
```tsx
<div className="bg-ink-primary">       {/* Primary background */}
<div className="bg-ink-surface">       {/* Card surfaces */}
<div className="bg-ink-deep">          {/* Deep shadows */}
```

### Molten Gold Accent (Brand Signature)
```css
--molten-gold: #C5A059    /* Old Gold / Metallic (Gradient Start) */
--molten-amber: #CC5500   /* Burnt Amber / Fire (Gradient End) */
```

**Usage in Tailwind:**
```tsx
<div className="text-molten-gold">     {/* Gold text */}
<div className="border-molten-amber">  {/* Amber border */}
<div className="bg-molten-gold">       {/* Solid gold background */}
```

**Gradient Usage:**
```tsx
<div className="bg-gradient-to-r from-molten-gold to-molten-amber">
  Molten Gold Gradient
</div>
```

### Text Hierarchy
```css
--text-primary: #F5F5F5   /* Off-White (softer than pure white) */
--text-secondary: #A3A3A3 /* Neutral Gray */
--text-muted: #737373     /* Dimmed text */
```

**Usage in Tailwind:**
```tsx
<h1 className="text-text-primary">Main Heading</h1>
<p className="text-text-secondary">Secondary text</p>
<span className="text-text-muted">Muted caption</span>
```

---

## ✍️ Typography

### Font Families

#### Serif for Headings (Editorial & Classy)
- **Primary:** Playfair Display
- **Alternative:** Cinzel
- **Vibe:** Elegant, traditional, artistic (like Vogue, Inked Mag)

```tsx
<h1 className="font-serif text-5xl font-bold">
  Premium Heading
</h1>

<h2 className="font-cinzel text-3xl font-semibold">
  Alternative Heading
</h2>
```

#### Sans-Serif for Body/UI (Clean & Geometric)
- **Primary:** Inter
- **Vibe:** Invisible, functional, modern

```tsx
<p className="font-sans text-base">
  Body text with excellent readability on mobile.
</p>

<button className="font-sans font-semibold uppercase tracking-wide">
  Action Button
</button>
```

### Typography Scale
```tsx
/* Headings (use font-serif) */
<h1 className="font-serif text-6xl font-bold">Hero Title</h1>
<h2 className="font-serif text-5xl font-bold">Section Title</h2>
<h3 className="font-serif text-4xl font-semibold">Subsection</h3>
<h4 className="font-serif text-3xl font-semibold">Card Title</h4>

/* Body (use font-sans) */
<p className="font-sans text-lg">Large body text</p>
<p className="font-sans text-base">Regular body text</p>
<p className="font-sans text-sm">Small text</p>
<p className="font-sans text-xs">Captions</p>
```

---

## 🛠️ CSS Utility Classes

### 1. Gold Gradient Text

**Basic Gradient Text:**
```tsx
<h1 className="gold-gradient-text text-5xl font-serif">
  Molten Gold Heading
</h1>
```

**Animated Shimmer Text:**
```tsx
<h1 className="gold-gradient-text-shimmer text-5xl font-serif">
  Premium Shimmer Effect
</h1>
```

**CSS Classes:**
```css
.gold-gradient-text {
  background: linear-gradient(135deg, #C5A059 0%, #CC5500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.gold-gradient-text-shimmer {
  /* Same as above + animated shimmer */
  animation: shimmer 3s linear infinite;
}
```

### 2. Gold Border Glow

**Standard Glow (for buttons, cards):**
```tsx
<button className="gold-border-glow px-8 py-4 rounded-lg">
  Premium Button
</button>
```

**Strong Glow (for hero CTAs, avatars):**
```tsx
<div className="gold-border-glow-strong rounded-full p-1">
  <img src="/avatar.png" className="rounded-full" />
</div>
```

**CSS Classes:**
```css
.gold-border-glow {
  border: 1.5px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: 
    linear-gradient(var(--ink-surface), var(--ink-surface)),
    linear-gradient(135deg, var(--molten-gold), var(--molten-amber));
  box-shadow: 
    0 0 20px rgba(197, 160, 89, 0.3),
    inset 0 0 12px rgba(197, 160, 89, 0.1);
  transition: all 0.3s;
}

.gold-border-glow:hover {
  box-shadow: 
    0 0 32px rgba(197, 160, 89, 0.5),
    inset 0 0 16px rgba(197, 160, 89, 0.15);
  transform: translateY(-2px);
}
```

### 3. Premium Card Effects

```tsx
<div className="card-premium p-6">
  <h3 className="font-serif text-2xl mb-4">Card Title</h3>
  <p className="font-sans text-text-secondary">Card content...</p>
</div>
```

**CSS Class:**
```css
.card-premium {
  background: var(--ink-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition: all 0.3s;
}

.card-premium:hover {
  transform: translateY(-4px);
  border-color: rgba(197, 160, 89, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 16px rgba(197, 160, 89, 0.15);
}
```

### 4. Premium Icon Styling (Outline Style, 1.5px Stroke)

```tsx
import { Heart } from 'lucide-react'

<Heart className="icon-premium h-6 w-6" />
<Heart className="icon-premium active h-6 w-6" />  {/* Active state */}
```

**CSS Class:**
```css
.icon-premium {
  stroke-width: 1.5px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.icon-premium:hover,
.icon-premium.active {
  background: linear-gradient(135deg, var(--molten-gold), var(--molten-amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(197, 160, 89, 0.4));
}
```

---

## 🎯 Component Examples

### Premium Action Button (Full Example)

```tsx
import { PremiumButton } from '@/components/ui/premium-button'
import { ArrowRight } from 'lucide-react'

export function HeroCTA() {
  return (
    <div className="space-y-4">
      {/* Primary CTA with strong glow */}
      <PremiumButton 
        variant="primary" 
        size="lg" 
        glow="strong"
        className="group"
      >
        Get Started
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </PremiumButton>

      {/* Secondary button with outline */}
      <PremiumButton 
        variant="outline" 
        size="md" 
        glow="medium"
      >
        Learn More
      </PremiumButton>

      {/* Loading state */}
      <PremiumButton 
        variant="primary" 
        size="md" 
        isLoading
      >
        Processing...
      </PremiumButton>

      {/* Shimmer effect */}
      <PremiumButton 
        variant="primary" 
        size="xl" 
        shimmer
      >
        Premium Upgrade
      </PremiumButton>
    </div>
  )
}
```

### Premium Card Component

```tsx
export function PremiumCard() {
  return (
    <div className="card-premium p-8 space-y-4">
      {/* Gold gradient heading */}
      <h3 className="gold-gradient-text text-3xl font-serif">
        Premium Feature
      </h3>
      
      {/* Body text */}
      <p className="text-text-secondary font-sans text-base leading-relaxed">
        Experience world-class design with our molten gold aesthetic.
      </p>
      
      {/* Premium button */}
      <PremiumButton variant="outline" size="sm">
        Explore
      </PremiumButton>
    </div>
  )
}
```

### Premium Avatar with Glow

```tsx
import Image from 'next/image'

export function PremiumAvatar({ src }: { src: string }) {
  return (
    <div className="gold-border-glow-strong rounded-full p-1 inline-block">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image 
          src={src} 
          alt="Premium Avatar" 
          fill 
          className="object-cover"
        />
      </div>
    </div>
  )
}
```

### Premium Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-ink-deep flex items-center justify-center">
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-molten-glow opacity-30" />
      
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Serif heading with shimmer */}
        <h1 className="gold-gradient-text-shimmer text-7xl md:text-8xl font-serif font-bold">
          TattooTalks
        </h1>
        
        {/* Secondary heading */}
        <p className="text-text-primary text-2xl md:text-3xl font-sans font-light">
          World-Class Tattoo Community
        </p>
        
        {/* Premium CTA */}
        <PremiumButton 
          variant="primary" 
          size="xl" 
          glow="strong"
          className="mt-8"
        >
          Join the Elite
        </PremiumButton>
      </div>
    </section>
  )
}
```

---

## 💡 Best Practices

### Do's ✅

1. **Typography Hierarchy:**
   - Use `font-serif` (Playfair Display) for H1-H4
   - Use `font-sans` (Inter) for body text, buttons, UI elements
   - Always pair with proper font weights (700+ for headings)

2. **Gold Gradient Usage:**
   - Apply to **key brand elements only** (logo, CTA text, premium badges)
   - Use `gold-gradient-text-shimmer` sparingly (hero sections only)
   - Avoid gradients on small text (<14px)

3. **Glow Effects:**
   - Use `gold-border-glow` for interactive elements (buttons, cards)
   - Use `gold-border-glow-strong` for hero CTAs and avatars
   - Always combine with hover transitions

4. **Icon Styling:**
   - Set `stroke-width: 1.5px` on all Lucide icons
   - Default color: `text-secondary` (#A3A3A3)
   - Active state: Apply `icon-premium active` class

5. **Background Colors:**
   - **Never use pure black (#000000)**
   - Use `bg-ink-primary` (#121212) for main backgrounds
   - Use `bg-ink-surface` (#1A1A1A) for cards/surfaces
   - Use `bg-ink-deep` (#0D0D0D) for deep shadows only

### Don'ts ❌

1. **Avoid Flat Colors:**
   - Don't use solid yellow/orange (#FFC93C, #FFB800)
   - Always use gradients for gold accents

2. **Don't Overuse Glow:**
   - Limit glow effects to 2-3 elements per screen
   - Avoid glow on body text or small UI elements

3. **Typography Mistakes:**
   - Don't use serif fonts for buttons or form inputs
   - Don't use sans-serif for main headings (H1-H2)
   - Don't mix multiple serif fonts on the same page

4. **Icon Mistakes:**
   - Avoid filled icons (always use outline style)
   - Don't use stroke-width > 2px (too bold)
   - Don't use bright colors by default (stick to gray)

---

## 🚀 Quick Start Checklist

- [ ] Import Google Fonts (Playfair Display, Inter, Cinzel)
- [ ] Replace all `bg-black` with `bg-ink-primary`
- [ ] Update headings to use `font-serif`
- [ ] Apply `gold-gradient-text` to logo and main headings
- [ ] Add `gold-border-glow` to primary CTAs
- [ ] Update icons to use `icon-premium` class
- [ ] Replace flat yellow (#FFC93C) with `molten-gold` gradient
- [ ] Test hover states on all interactive elements

---

## 📚 Resources

- **Fonts:**
  - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  - [Inter](https://fonts.google.com/specimen/Inter)
  - [Cinzel](https://fonts.google.com/specimen/Cinzel)

- **Color Reference:**
  - Molten Gold: `#C5A059`
  - Burnt Amber: `#CC5500`
  - Cod Gray: `#121212`

---

**Design System Version:** 1.0.0  
**Last Updated:** January 2026  
**Maintained by:** TattooTalks Design Team
