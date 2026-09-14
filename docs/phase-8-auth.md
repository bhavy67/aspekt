# Phase 8 — Authentication

## Summary

Phase 8 adds Sign in with Google and Sign in with Apple (iOS), user profiles, favourites, and download history across web and mobile.

---

## Database (migration 20260914000004)

| Table              | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `profiles`         | 1-to-1 extension of `auth.users` — display_name, avatar_url. Auto-created via trigger. |
| `favourites`       | `user_id + wallpaper_id` — unique per user. RLS: owner CRUD.                           |
| `download_history` | Per-apply log. RLS: owner read + insert.                                               |

Trigger `on_auth_user_created` inserts a `profiles` row from `raw_user_meta_data` on every new sign-up.

---

## Web

| File                              | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `lib/supabase-server.ts`          | Cookie-based server client via `@supabase/ssr` — for RSC and Server Actions         |
| `lib/supabase-browser.ts`         | Browser client via `@supabase/ssr` — for Client Components                          |
| `middleware.ts`                   | Refreshes auth session on every request; guards `/account/**` → redirect to sign-in |
| `app/auth/callback/route.ts`      | Exchanges OAuth `code` for a session cookie                                         |
| `app/auth/sign-out/route.ts`      | POST → `signOut()` → redirect to `/`                                                |
| `app/auth/sign-in/page.tsx`       | Sign-in page: Google + Apple OAuth buttons                                          |
| `app/account/page.tsx`            | Account dashboard — avatar, display name, recent favourites grid                    |
| `app/account/favourites/page.tsx` | Full favourites grid                                                                |
| `components/nav.tsx`              | Updated — shows **Sign In** (guest) or **Account** (signed in)                      |

### OAuth provider setup (manual, one-time)

1. **Supabase dashboard** → Authentication → Providers → enable Google + Apple
2. **Google Cloud Console** → OAuth 2.0 → add `https://<project>.supabase.co/auth/v1/callback`
3. **Apple Developer** → Sign in with Apple → add the same redirect URI
4. **Supabase** → Authentication → URL Configuration → add:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://aspekt.app/auth/callback` (prod)
   - `aspekt://auth/callback` (mobile deep link)

---

## Mobile

| File                                | Description                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `lib/auth.ts`                       | `signInWithGoogle` (WebBrowser OAuth), `signInWithApple` (expo-apple-authentication), `signOut`               |
| `context/auth-context.tsx`          | `AuthProvider` + `useAuth()` — wraps `onAuthStateChange`                                                      |
| `app/_layout.tsx`                   | Wraps entire app in `<AuthProvider>`; handles deep-link token exchange                                        |
| `app/auth/sign-in.tsx`              | Modal sign-in sheet: Google + Apple (iOS only)                                                                |
| `app/(tabs)/profile/index.tsx`      | Updated — shows user card + Favourites/History links when signed in                                           |
| `app/(tabs)/profile/favourites.tsx` | Favourites grid — empty state for guest + signed-out                                                          |
| `app/wallpaper/[slug].tsx`          | Heart button — toggles favourite; prompts sign-in if guest                                                    |
| `app/wallpaper/apply.tsx`           | Logs download history after successful save (fire-and-forget)                                                 |
| `lib/queries.ts`                    | Added `getFavourites`, `isFavourited`, `addFavourite`, `removeFavourite`, `logDownload`, `getDownloadHistory` |

### Packages added

- `expo-apple-authentication` — native iOS Sign in with Apple
- `expo-web-browser` — opens Google OAuth URL in in-app browser

---

## Auth flow — mobile

```
Profile tab → "Sign in" → /auth/sign-in (modal)
  → Google: supabase.signInWithOAuth + WebBrowser.openAuthSessionAsync
              → deep link: aspekt://auth/callback#access_token=...
              → _layout.tsx handles setSession
  → Apple (iOS): expo-apple-authentication.signInAsync
               → supabase.signInWithIdToken({ provider: 'apple', token })
  → onAuthStateChange fires → AuthContext updates → profile screen shows user
```

---

## Verification

```
Supabase migration applied:  ✓ profiles, favourites, download_history + RLS + trigger
Type-check mobile:           ✓ 0 errors
Type-check web:              ✓ 0 errors
Lint mobile:                 ✓ 0 errors
Lint web:                    ✓ 0 errors
Prettier:                    ✓ all files formatted
```
