// Inter at all weights — geometric, legible, precise.
// Available via next/font/google on web, expo-font on mobile.

export const fontFamily = {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
} as const;

// px values — converted to rem in web CSS
export const fontSize = {
  '2xs': 10,
  xs: 12,
  sm: 13,
  base: 14,
  md: 15,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 38,
  '5xl': 48,
} as const;

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeight = {
  none: 1.0,
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.8,
} as const;

export const letterSpacing = {
  tightest: '-0.04em',
  tighter: '-0.03em',
  tight: '-0.02em',
  snug: '-0.01em',
  normal: '0em',
  label: '0.10em',
  wide: '0.14em',
} as const;

export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;
