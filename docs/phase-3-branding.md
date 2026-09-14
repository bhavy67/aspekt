# ASPEKT — Phase 3: Branding & Visual Identity

# Canonical Specification (approved 2026-09-14)

---

## Brand Direction — Obsidian

Palette A (Signal) × Palette C (Aura) merged. Dark-first, system-adaptive.

| Element       | Decision                                                                    |
| ------------- | --------------------------------------------------------------------------- |
| Color system  | Near-monochrome with cool space tint — Obsidian scale                       |
| Primary mode  | Dark (`#0B0B0E` bg). Light mode is full first-class, not an afterthought    |
| Accent        | Single gradient — indigo `#818CF8` → cyan `#22D3EE` (135°)                  |
| Accent use    | Primary CTA buttons, logo mark (gradient stroke), brand moments only        |
| Font          | Inter — all weights 300–800 via next/font/google (web) / expo-font (mobile) |
| Logo mark     | Four corner crop-bracket brackets — viewfinder / frame metaphor             |
| Logo stroke   | Gradient in brand contexts; monochrome (`currentColor`) in UI contexts      |
| Border radius | 8px default (lg). 10px cards. 6px chips. 9999px pills                       |
| Dark mode     | System-adaptive (`prefers-color-scheme`). User override: Phase 5            |

---

## Color Tokens

### Dark mode (primary)

| Token          | Value     | Usage                               |
| -------------- | --------- | ----------------------------------- |
| `background`   | `#0B0B0E` | Page background                     |
| `surface`      | `#13131A` | Cards, panels, inputs               |
| `raised`       | `#1C1C26` | Elevated surfaces, dropdowns        |
| `border`       | `#22222E` | Dividers, outlines (near-invisible) |
| `borderStrong` | `#2E2E3E` | Button borders, active borders      |
| `foreground`   | `#EDEDF2` | Primary text                        |
| `muted`        | `#8686A0` | Secondary text, metadata            |
| `subtle`       | `#46465A` | Placeholder, labels, divider text   |
| `success`      | `#34D399` | Free badge, success state           |

### Light mode

| Token          | Value     |
| -------------- | --------- |
| `background`   | `#F8F8FC` |
| `surface`      | `#F0F0F8` |
| `raised`       | `#E4E4F0` |
| `border`       | `#DCDCEC` |
| `borderStrong` | `#C4C4DC` |
| `foreground`   | `#0B0B14` |
| `muted`        | `#565672` |
| `subtle`       | `#9898B4` |
| `success`      | `#059669` |

### Accent

| Token       | Value                                       |
| ----------- | ------------------------------------------- |
| `from`      | `#818CF8` (indigo-400)                      |
| `to`        | `#22D3EE` (cyan-400)                        |
| `gradient`  | `linear-gradient(135deg, #818CF8, #22D3EE)` |
| `flatDark`  | `#818CF8` — flat fallback in dark mode      |
| `flatLight` | `#6366F1` — flat fallback in light mode     |
| `dimDark`   | `rgba(129, 140, 248, 0.12)` — chip/badge bg |
| `dimLight`  | `rgba(99, 102, 241, 0.10)`                  |

---

## Typography — Inter

| Role    | Size | Weight | Tracking | Leading |
| ------- | ---- | ------ | -------- | ------- |
| Display | 48px | 800    | −0.04em  | 1.0     |
| H1      | 30px | 700    | −0.03em  | 1.15    |
| H2      | 20px | 600    | −0.015em | 1.3     |
| Body    | 15px | 400    | 0        | 1.65    |
| UI/Base | 14px | 400    | 0        | 1.5     |
| Label   | 11px | 600    | +0.10em  | 1.0     |
| Caption | 12px | 400    | 0        | 1.5     |

---

## Logo System

### Mark

Four corner crop-bracket brackets drawn as two-segment paths (L-shapes at each corner).
Evokes a camera viewfinder / crop frame — directly aligned with the product metaphor.

**Gradient mark** — primary brand contexts:

- App icon, splash screen, loading state
- Marketing / OG imagery
- "On gradient" lockup (mark + wordmark on gradient fill)

**Monochrome mark** — UI contexts:

- Web nav (20px, currentColor)
- Mobile tab label (not used — mark only in top-left header)
- White mark on dark surfaces
- Dark mark on light surfaces

### Wordmark

"Aspekt" (title case) in Inter 700, letter-spacing +0.14em.

### Minimum sizes

| Context         | Mark size  | With wordmark? |
| --------------- | ---------- | -------------- |
| Favicon 16×16   | 16px mark  | No             |
| Favicon 32×32   | 32px mark  | No             |
| App icon 1024px | 512px mark | No (mark only) |
| Web nav         | 20px mark  | Yes            |
| Mobile nav      | 24px mark  | Yes            |
| Splash screen   | 80px mark  | Yes            |
| OG / Marketing  | 200px+     | Optional       |

### Asset files

| File                        | Use                                              |
| --------------------------- | ------------------------------------------------ |
| `public/favicon.svg`        | Web favicon — gradient mark on dark rounded rect |
| `public/logo-mark.svg`      | Gradient mark — all marketing use                |
| `public/logo-mark-mono.svg` | Monochrome `currentColor` mark                   |
| `public/app-icon.svg`       | 1024×1024 master — export to PNG for stores      |

**PNG exports required before store submission (Phase 13):**

- `icon.png` — 1024×1024 (iOS App Store, Expo)
- `adaptive-icon.png` — 1024×1024 (Android foreground)
- `apple-touch-icon.png` — 180×180
- `favicon-32.png` — 32×32 (legacy browser fallback)

---

## Spacing Scale

4px base unit. All spacing is a multiple of 4.

`4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 80 · 96`

---

## Border Radius

| Token  | Value  | Usage                |
| ------ | ------ | -------------------- |
| `sm`   | 4px    | Badges, small tags   |
| `md`   | 6px    | Chips, small buttons |
| `lg`   | 8px    | Buttons (default)    |
| `xl`   | 10px   | Cards                |
| `2xl`  | 12px   | Modals, sheets       |
| `pill` | 9999px | Rounded pill chips   |

---

## Motion Principles

- Prefer fast interactions: 150ms for hover/focus, 200ms for state transitions
- Modal/sheet entry: 300ms ease-out
- No decorative animation in V1 — motion serves clarity, not delight
- Respect `prefers-reduced-motion` on all animated elements (Phase 5)

---

## What Phase 3 Delivered

| Deliverable                            | Status |
| -------------------------------------- | ------ |
| `packages/ui` token package            | ✅     |
| Web Tailwind v4 theme (globals.css)    | ✅     |
| Inter font via next/font/google        | ✅     |
| Favicon SVG (gradient mark)            | ✅     |
| Logo mark SVGs (gradient + mono)       | ✅     |
| App icon SVG master (1024×1024)        | ✅     |
| Mobile theme.ts (lightTheme/darkTheme) | ✅     |
| Splash bg updated to Obsidian dark     | ✅     |
| ADR-005 (design token system)          | ✅     |

## What Phase 3 Deferred

| Item                                        | Phase |
| ------------------------------------------- | ----- |
| PNG icon exports for App Store submission   | 13    |
| User-controlled dark mode toggle            | 5     |
| CSS token generation from TypeScript source | 5     |
| `ThemeContext` for React Native             | 5     |
| Motion / animation primitives               | 5     |
| Icon component library                      | 5     |
| Component library (buttons, cards, etc.)    | 5     |
