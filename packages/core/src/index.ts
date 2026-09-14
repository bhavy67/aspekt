/**
 * @aspekt/core
 *
 * Shared business logic for the ASPEKT platform.
 * This package will be populated in later phases.
 *
 * Phase 6 — Fit Engine:
 *   Calculates how a wallpaper maps onto a target viewport.
 *   Pure, deterministic, independently testable.
 *
 * Phase 9 — Coin Logic:
 *   Coin balance calculations, transaction validation.
 *
 * Other utilities:
 *   Validation schemas (Zod), formatting, constants.
 */

export const ASPEKT_PACKAGE = '@aspekt/core' as const;

export const COIN_REWARDS = {
  daily_checkin: 5,
  share: 3,
  apply: 1,
  rewarded_ad: 10,
} as const;

export const DEFAULT_PREMIUM_COST = 10;

export const AD_DAILY_LIMIT = 5;

// Coin packs — productId must match exactly what is configured in App Store Connect
// and Google Play Console. Prices here are display fallbacks only; real prices come
// from the store via RevenueCat.
export const COIN_PACKS = [
  { productId: 'aspekt_coins_small', label: 'Small', coins: 50, fallbackPrice: '$0.99' },
  { productId: 'aspekt_coins_medium', label: 'Medium', coins: 150, fallbackPrice: '$2.99' },
  { productId: 'aspekt_coins_large', label: 'Large', coins: 500, fallbackPrice: '$7.99' },
  { productId: 'aspekt_coins_mega', label: 'Mega', coins: 1200, fallbackPrice: '$14.99' },
] as const;
