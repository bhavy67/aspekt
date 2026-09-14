# ASPEKT — Phase 2: Product & UX Architecture

# Canonical Specification (approved 2026-09-14)

This document is the authoritative post-approval reference for Phase 2.
Platform corrections from the technical feasibility review are applied here.
All WallpaperKit references have been removed. All foldable per-display wallpaper
claims have been removed. MIUI FLAG_LOCK limitation is documented.

---

## Product Decisions

| Decision              | Resolution                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------ |
| Q1 — Content taxonomy | Two separate taxonomies: Categories (subject/style) and Moods (feeling/atmosphere)         |
| Q2 — Premium preview  | Full unobstructed preview. CDN display variant only — master asset URL never exposed       |
| Q3 — V1 collections   | Curator-only. No user-created collections until Phase 8                                    |
| Q4 — URL slugs        | Title + short ID: `/wallpaper/aurora-borealis-a8f3` — generated once, stable               |
| Q5 — OS targets       | iOS 16+ minimum; Android 10 / API 29+ minimum                                              |
| Q6 — Web download     | Free wallpapers: direct download, no auth, no interstitial. Non-blocking app CTA alongside |
| Q7 — Onboarding       | None. First launch goes directly to Home Feed                                              |
| RD-1 — Profile V1     | Honest guest shell: sign-in CTA + future features preview + Settings + About               |
| RD-3 — iOS apply      | Option A: Transparent differentiation. Save to Photos + in-app guide. No WallpaperKit      |

---

## Navigation Architecture — Mobile

### Bottom Tab Bar (phone)

| #   | Tab         | Root screen                |
| --- | ----------- | -------------------------- |
| 1   | Home        | Home Feed                  |
| 2   | Explore     | Explore Hub                |
| 3   | Collections | Collections List (curated) |
| 4   | Profile     | Profile Hub (guest shell)  |

See ADR-004 for full adaptive/tablet/foldable rules and Expo Router file structure.

### Adaptive layout summary

| Context           | Pattern                                                     |
| ----------------- | ----------------------------------------------------------- |
| Phone portrait    | Bottom tab bar                                              |
| Phone landscape   | Bottom tab bar (compact)                                    |
| Tablet portrait   | Bottom tab bar or sidebar rail                              |
| Tablet landscape  | Persistent sidebar + split detail                           |
| Foldable folded   | Phone layout                                                |
| Foldable unfolded | Tablet layout (responds to WindowSizeClass without restart) |

---

## Web Information Architecture

| Route                 | Description                                                 | Rendering |
| --------------------- | ----------------------------------------------------------- | --------- |
| `/`                   | Homepage — hero, featured, trending, category rows, app CTA | SSG + ISR |
| `/browse`             | Full catalog with sort/filter                               | SSR       |
| `/explore`            | Discovery hub — category cards, mood cards, trending        | SSG + ISR |
| `/search?q=X`         | Search results                                              | SSR       |
| `/wallpaper/[slug]`   | Wallpaper detail — CDN preview, metadata, download, related | SSG + ISR |
| `/collections`        | All curated collections                                     | SSG + ISR |
| `/collections/[slug]` | Collection detail                                           | SSG + ISR |
| `/category/[slug]`    | Category browse                                             | SSG + ISR |
| `/mood/[slug]`        | Mood browse                                                 | SSG + ISR |
| `/download`           | App install CTA                                             | SSG       |
| `/account/**`         | Auth-required account pages                                 | Phase 8   |

Web navigation: top nav bar (desktop), sticky header (mobile web). No bottom tab bar at any viewport.

---

## V1 Screen Inventory — Mobile

### Home tab

- **Home Feed** — featured hero, trending row, editorial picks, New This Week, category teaser rows

### Explore tab

- **Explore Hub** — search bar, categories grid, moods grid, trending tags
- **Search Results** — wallpaper grid, filter chips, result count
- **Category Browse** — wallpapers in one category, sort options
- **Mood Browse** — wallpapers in one mood, sort options

### Collections tab

- **Collections List** — curated ASPEKT collections only. No create button in V1.
- **Collection Detail** — cover, name, description, curator credit, wallpaper grid

### Profile tab

- **Profile Hub** — guest state: sign-in CTA, preview of features (Favourites,
  Download History, Collections, Coins), Settings shortcut, About shortcut
- **Settings** — cache management, notification preferences, display preferences
- **About** — app version, licenses, privacy policy, terms of service

### Cross-tab (root Stack — V1)

- **Wallpaper Detail** — CDN preview, title, artist, category, mood tags, resolution,
  free/premium label, "Set Wallpaper" CTA, "Download" CTA (free only)
- **Fit/Customize** — full-screen canvas, fit mode (Fill/Fit/Stretch/Center/Tile),
  pan/zoom, background colour picker (when edges exposed)
- **Apply Destination Picker** — bottom sheet: Home Screen / Lock Screen / Both
- **Apply Progress** — loading, cancel option
- **Apply Success** — confirmation, "Share", "Apply another", "Back"
- **Apply Failure** — platform-specific error, retry, "Download instead"
- **Permission Request** — context explanation, "Allow" → system dialog
- **Permission Denied** — explanation, "Open Settings" deep link

### Not in V1

- ♡ Favourite button — Phase 8
- Add to Collection action — Phase 8
- Authentication Sheet — Phase 8
- Coin Store / Coin balance — Phase 9
- Premium Gate — Phase 9
- Create Collection — Phase 8

---

## V1 User Flows (summary)

### First Launch

App cold start → minimum startup state → **Home Feed (guest)**.
No onboarding. No splash beyond technical minimum.

### Guest Browsing

Full access to: Home Feed, Wallpaper Detail, Preview, Fit/Customize, Apply (free),
Download (free), Explore, Collections, Settings, About.
No auth required for any of the above in V1.

### Discovering a Wallpaper

Mobile paths: Home → Detail | Explore → Category/Mood/Search → Detail |
Collections → Collection Detail → Detail | Deep link → Detail.
Web paths: Homepage → Detail | Browse → Detail | Explore → Detail |
Search → Detail | SEO → Detail | Collection → Detail.

### Wallpaper Apply — iOS (CORRECTED)

Fit/Customize → Next → Destination Picker → "Save & Set Wallpaper" →
Permission request (Photos add-only, first time only) → Saving to Photos →
**In-app step-by-step guide** (Settings → Wallpaper → Add New → select photo → Set) →
User taps Done (self-reported). ASPEKT cannot confirm wallpaper was applied.

### Wallpaper Apply — Android

Fit/Customize → Next → Destination Picker → Apply →
`isSetWallpaperAllowed()` check → `WallpaperManager.setBitmap()/setStream()` with
`FLAG_SYSTEM` / `FLAG_LOCK` / both → Success or Failure.
MIUI limitation: `FLAG_LOCK` silently fails on MIUI 11+. Fallback message:
"Home screen wallpaper has been set. To set the lock screen on your device, use
the system Themes or Wallpaper app."

### Free Wallpaper Download — Mobile

Detail → Download → No auth required → Photos/MediaStore → Success toast.

### Free Wallpaper Download — Web

`/wallpaper/[slug]` → Download → Direct file download (Content-Disposition: attachment) →
Browser download. Non-blocking "Also in the ASPEKT app" CTA displayed. No auth.
No interstitial.

### Returning User (V1 — guest state)

Background re-open: restore last tab + scroll position.
Cold start: Home Feed (refresh in background, cached content first).
No session management in V1.

### Deferred flows

Saving a Favourite (Phase 8), Creating a Collection (Phase 8),
Premium wallpaper gate (Phase 9), Earning coins (Phase 9/10),
Purchasing coins (Phase 11), Authentication (Phase 8).

---

## Platform-Specific Differences

### iOS — apply

No public API for in-app wallpaper setting. See ADR-003.
Approach: PHPhotoLibrary (add-only) + in-app guide.
ASPEKT can only confirm "saved to Photos", not "wallpaper applied".

### iOS — permissions

Photos: `NSPhotoLibraryAddUsageDescription` + `PHAccessLevel.addOnly`.
No read access needed or requested.

### Android — apply

`WallpaperManager` with `FLAG_SYSTEM` / `FLAG_LOCK` / `FLAG_BOTH`.
`SET_WALLPAPER` is a normal (install-time) permission — no runtime dialog.
Check `isSetWallpaperAllowed()` before calling.
MIUI 11+: `FLAG_LOCK` silently fails. Detect and show device-specific message.

### Android — storage

MediaStore API 29+: no write permission needed to save to gallery.
Use `ContentResolver.insert()` with `RELATIVE_PATH`.

### Android — foldables

No public API for per-display independent wallpaper setting.
ASPEKT processes the image for the current display's aspect ratio (driven by
`WindowSizeClass` / `FoldingFeature`) and calls `WallpaperManager` once.
`FoldingFeature` from Jetpack WindowManager detects fold state and orientation.

### Web

No native wallpaper apply capability. "Set Wallpaper" = deep link to app or download.
Download: `Content-Disposition: attachment`. Web Share API with URL fallback.
SEO: OG tags + JSON-LD `ImageObject` on wallpaper pages.

---

## Platform Corrections Applied

The following claims from the initial Phase 2 draft have been corrected:

| Incorrect claim                                                      | Correction                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| "WallpaperKit (iOS 16+, requires entitlement)"                       | No such public API exists. Removed entirely.                                                           |
| "iOS fallback: PHPhotoLibrary + Settings deep link"                  | Settings deep link is broken on iOS 18.1+. Removed. Approach is PHPhotoLibrary + in-app guide only.    |
| "WallpaperManager may require separate calls per display (foldable)" | No public API for per-display targeting. ASPEKT calls WallpaperManager once for current display state. |
| "Android: SET_WALLPAPER requires runtime permission"                 | SET_WALLPAPER is a normal permission — granted at install, no runtime dialog.                          |
| MIUI FLAG_LOCK not mentioned                                         | MIUI 11+ silently ignores FLAG_LOCK. Documented with graceful fallback.                                |

---

## V1 vs Future Reference

| Feature                             | Phase                |
| ----------------------------------- | -------------------- |
| Home Feed (curated)                 | 5                    |
| Explore (categories, moods, search) | 5                    |
| Collections (curated)               | 5                    |
| Wallpaper Detail + Preview          | 5                    |
| Fit/Customize                       | 5                    |
| Apply (iOS + Android, all states)   | 5                    |
| Free download (mobile + web)        | 5                    |
| Guest browsing (no auth required)   | 5                    |
| Web public routes                   | 5                    |
| Sign in with Apple / Google         | 8                    |
| Favourites                          | 8                    |
| Download History                    | 8                    |
| User-created Collections            | 8                    |
| Web account routes                  | 8                    |
| Coin balance + premium gating       | 9                    |
| Coin earning (daily, share)         | 9                    |
| Rewarded ads (AdMob)                | 10                   |
| Coin purchase IAP                   | 11                   |
| Universal links (domain verified)   | 13                   |
| Onboarding                          | Removed from roadmap |
| Live / animated wallpapers          | Not on roadmap       |
| User-uploaded wallpapers            | Not on roadmap       |

---

## Deep Link Map

| Path                  | Mobile                              | Web                   |
| --------------------- | ----------------------------------- | --------------------- |
| `/wallpaper/[slug]`   | Wallpaper Detail (modal)            | `/wallpaper/[slug]`   |
| `/collections/[slug]` | Collection Detail (Collections tab) | `/collections/[slug]` |
| `/category/[slug]`    | Category Browse (Explore tab)       | `/category/[slug]`    |
| `/mood/[slug]`        | Mood Browse (Explore tab)           | `/mood/[slug]`        |
| `/explore`            | Explore tab root                    | `/explore`            |
| `/search?q=X`         | Explore → Search pre-filled         | `/search?q=X`         |
| `/collections`        | Collections tab                     | `/collections`        |
| `/download`           | App Store redirect                  | `/download`           |

Slug format: `title-shortid` (e.g., `aurora-borealis-a8f3`).
Generated once at creation. Stable on title edit. Old slugs 301-redirect.
