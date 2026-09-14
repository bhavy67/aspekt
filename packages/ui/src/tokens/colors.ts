// Obsidian — ASPEKT brand color system
// Dark-first. Near-monochrome with a cool space tint.
// Single gradient accent: indigo (#818CF8) → cyan (#22D3EE).
// Used for primary CTAs, logo mark, and brand moments only.

export const colorsDark = {
  background: '#0B0B0E',
  surface: '#13131A',
  raised: '#1C1C26',
  border: '#22222E',
  borderStrong: '#2E2E3E',
  foreground: '#EDEDF2',
  muted: '#8686A0',
  subtle: '#46465A',
  success: '#34D399',
} as const;

export const colorsLight = {
  background: '#F8F8FC',
  surface: '#F0F0F8',
  raised: '#E4E4F0',
  border: '#DCDCEC',
  borderStrong: '#C4C4DC',
  foreground: '#0B0B14',
  muted: '#565672',
  subtle: '#9898B4',
  success: '#059669',
} as const;

export const colorsAccent = {
  // Gradient — primary CTAs, logo mark, brand moments
  from: '#818CF8',
  to: '#22D3EE',
  gradient: 'linear-gradient(135deg, #818CF8 0%, #22D3EE 100%)',

  // Flat fallback — for contexts that can't render gradients (icons, small text)
  flatDark: '#818CF8',
  flatLight: '#6366F1',

  // Subtle tinted background — chip/badge backgrounds
  dimDark: 'rgba(129, 140, 248, 0.12)',
  dimLight: 'rgba(99, 102, 241, 0.10)',

  // Glow — CTA button box-shadow
  glowSm: 'rgba(129, 140, 248, 0.25)',
  glowMd: 'rgba(129, 140, 248, 0.40)',
  glowLg: 'rgba(129, 140, 248, 0.55)',
} as const;

export type ColorKey = keyof typeof colorsDark;
