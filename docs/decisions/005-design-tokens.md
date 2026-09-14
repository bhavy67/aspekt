---
title: 'ADR-005: Design Token System'
date: 2026-09-14
status: Accepted
---

## Context

ASPEKT targets web (Next.js + Tailwind CSS v4), iOS, and Android (Expo / React Native).
A consistent visual language is needed across all surfaces without duplicating values
or losing type safety.

## Decision

### Token package — `@aspekt/ui`

All design tokens live in `packages/ui/src/tokens/`. The package is consumed as
TypeScript source (no build step) by all apps via the Turborepo workspace.

Token files:

| File            | Contents                                         |
| --------------- | ------------------------------------------------ |
| `colors.ts`     | Obsidian palette — dark, light, accent gradient  |
| `typography.ts` | Inter font family, size scale, weight, tracking  |
| `spacing.ts`    | 4px base-unit scale + component height constants |
| `radius.ts`     | Border radius scale                              |
| `motion.ts`     | Duration (ms) + easing cubic-bezier strings      |
| `shadows.ts`    | Elevation + glow shadows                         |

### Web — Tailwind CSS v4

CSS custom properties defined in `apps/web/app/globals.css` are the runtime source
of truth for light/dark mode. `@theme inline` registers them with Tailwind so
utilities like `bg-surface`, `text-foreground`, `border-border` are generated and
respond to `prefers-color-scheme` automatically.

Dark mode strategy: **media query** (`prefers-color-scheme: dark`) in Phase 3.
Phase 5 will optionally add a `[data-theme]` attribute approach for user-override.

Gradient accent is not a CSS variable — applied via `@layer utilities`:

- `bg-accent-gradient` — background gradient (primary CTA, buttons)
- `text-accent-gradient` — gradient text clipping (hero headings, marketing)
- `shadow-glow-*` — indigo glow shadows for CTA hover states

### Mobile — React Native

`apps/mobile/lib/theme.ts` imports all tokens from `@aspekt/ui` and assembles
`lightTheme` / `darkTheme` objects for use in React Native StyleSheet.
Phase 5 wraps these in a `ThemeContext` so screens respond to system changes at runtime.

## Consequences

- All new components on web use Tailwind utility classes from the token set.
  Raw hex values do not appear in component code.
- All new components on mobile reference `theme.colors.*`, `theme.spacing.*` etc.
  Raw values do not appear in component code.
- Token values are duplicated between TypeScript constants and CSS custom properties.
  This is intentional — a CSS-from-TypeScript generation step is deferred to Phase 5.
- Adding a new token requires updating both `packages/ui/src/tokens/*.ts` AND
  `apps/web/app/globals.css` until the generation step is in place.
