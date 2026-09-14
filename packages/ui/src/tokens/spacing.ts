// 4px base unit. All spacing is a multiple of 4.
// Used for padding, margin, gap, and component sizing.

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

// Common component heights — consistent across mobile and web
export const height = {
  btnSm: 28,
  btn: 36,
  btnMd: 38,
  btnLg: 48,
  input: 40,
  chip: 26,
  tabBar: 56,
  navBar: 56,
} as const;

export type SpacingKey = keyof typeof spacing;
