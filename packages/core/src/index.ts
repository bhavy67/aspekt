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
} as const;

export const DEFAULT_PREMIUM_COST = 10;
