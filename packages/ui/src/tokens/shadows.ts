// Shadows are dark-mode tuned — heavier opacity in dark, lighter in light.
// Glow variants use the accent indigo (#818CF8) for CTA emphasis.

export const shadow = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.20)',
  md: '0 4px 12px rgba(0, 0, 0, 0.30)',
  lg: '0 8px 28px rgba(0, 0, 0, 0.40)',
  xl: '0 16px 56px rgba(0, 0, 0, 0.55)',
  card: '0 2px 8px rgba(0, 0, 0, 0.25)',
  cardHover: '0 12px 40px rgba(0, 0, 0, 0.40), 0 0 0 1px rgba(129, 140, 248, 0.35)',
} as const;

export const shadowGlow = {
  sm: '0 0 16px rgba(129, 140, 248, 0.25)',
  md: '0 4px 24px rgba(129, 140, 248, 0.35)',
  lg: '0 8px 40px rgba(129, 140, 248, 0.45)',
  // Combined: elevation + glow — primary CTA hover state
  cta: '0 4px 28px rgba(129, 140, 248, 0.45), 0 0 0 1px rgba(129, 140, 248, 0.30)',
} as const;

export type ShadowKey = keyof typeof shadow;
export type ShadowGlowKey = keyof typeof shadowGlow;
