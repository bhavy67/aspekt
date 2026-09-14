// px values. 8px (lg) is the default component radius.
// Tighter for inline elements (chips, badges), larger for cards and modals.

export const radius = {
  none: 0,
  xs: 3,
  sm: 4,
  md: 6,
  lg: 8, // default
  xl: 10,
  '2xl': 12,
  '3xl': 16,
  card: 10,
  modal: 16,
  pill: 9999,
} as const;

export type RadiusKey = keyof typeof radius;
