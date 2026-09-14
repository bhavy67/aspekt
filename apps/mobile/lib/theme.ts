import {
  colorsDark,
  colorsLight,
  colorsAccent,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  height,
  radius,
  duration,
  easing,
  shadow,
  shadowGlow,
} from '@aspekt/ui';

// Typed theme object for React Native StyleSheet consumption.
// Import `theme` or `darkTheme` in screen/component files.
// Phase 5: wrap in a ThemeContext so screens can respond to system changes.

export const lightTheme = {
  colors: {
    ...colorsLight,
    accent: colorsAccent,
  },
  font: {
    family: fontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
    letterSpacing,
  },
  spacing,
  height,
  radius,
  motion: { duration, easing },
  shadow,
  shadowGlow,
} as const;

export const darkTheme = {
  colors: {
    ...colorsDark,
    accent: colorsAccent,
  },
  font: lightTheme.font,
  spacing: lightTheme.spacing,
  height: lightTheme.height,
  radius: lightTheme.radius,
  motion: lightTheme.motion,
  shadow: lightTheme.shadow,
  shadowGlow: lightTheme.shadowGlow,
} as const;

export type Theme = typeof lightTheme;
