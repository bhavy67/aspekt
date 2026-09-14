/**
 * @aspekt/api-client
 *
 * Shared Supabase query functions and API service layer.
 * This package will be populated during Phase 7 (Backend & Content Platform).
 *
 * Eventual exports will include:
 * - Supabase client factory (accepts client instance, returns typed query fns)
 * - Wallpaper queries (list, get, search, filter by mood/category)
 * - Collection queries
 * - User/account queries
 * - Coin and transaction queries
 * - Entitlement queries
 *
 * Usage pattern:
 *   Each app initializes its own Supabase client (platform-appropriate).
 *   Query functions from this package accept that client as a parameter.
 *   This keeps platform-specific auth/session handling in the app,
 *   while keeping query logic shared and typed.
 */

export const ASPEKT_PACKAGE = '@aspekt/api-client' as const;
