// Duration in ms. Easing as CSS cubic-bezier strings.
// Prefer fast (150ms) for micro-interactions, normal (200ms) for transitions,
// slow (300ms) for modal/sheet entry and meaningful state changes.

export const duration = {
  instant: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
} as const;

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
