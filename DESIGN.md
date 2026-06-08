# SleepBalance AI | Design System

## Visual Strategy: "Luminous Depth"
A design system that balances the ethereal qualities of light (recovery) with the structural depth of dark (sleep).

## Colors (OKLCH)
- **Primary (Core Balance):** `oklch(45% 0.12 260)` (Deep Intelligence Blue)
- **Secondary (Digital Pulse):** `oklch(60% 0.10 200)` (Calm Teal)
- **Surface (Parchment/Void):** 
  - Light: `oklch(98% 0.005 260)` (Tinted Bone)
  - Dark: `oklch(15% 0.01 260)` (Midnight Ink)
- **Accent (Circadian Warning):** `oklch(70% 0.15 40)` (Soft Amber / Dusk)

## Typography
- **Headings:** `Inter` (Bold, tight tracking `-0.02em`) for a modern, clinical look.
- **Body:** `Inter` (Regular, 16px, line-height 1.6) for high readability.
- **Meta/Data:** `JetBrains Mono` or similar for specific data points to emphasize precision.

## Motion & Transitions
- **Global Ease:** `cubic-bezier(0.22, 1, 0.36, 1)` (Ease Out Expo) for a premium, responsive feel.
- **Micro-interactions:** 
  - Hover: subtle scale (1.02) + shadow depth increase.
  - Entrance: staggered Y-slide (20px) + fade.
- **Scrolling:** Lenis configured for high-inertia, buttery smooth vertical transitions.

## Elevation & Components
- **Glass Cards:** 24px blur, 1px border with variable opacity (50% light / 10% dark).
- **Navigation:** Fixed sidebar with active-pill layout animations.
- **Charts:** Area charts with deep gradients to visualize "volume" of sleep/stress.
