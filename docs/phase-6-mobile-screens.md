# Phase 6 — Mobile Screens

## Summary

Phase 6 completes all 9 unbuilt mobile screens, wiring every stub into a fully functional screen backed by live Supabase data. All screens are type-safe, lint-clean, and formatted.

---

## New / Updated Files

### Wallpaper Flow (root stack — tab bar hidden)

| File                          | Description                                                                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/wallpaper/[slug].tsx`    | Full detail screen: hero image, scrollable metadata, category/mood chip navigation, color palette, Set Wallpaper + Download CTAs                                                                      |
| `app/wallpaper/customize.tsx` | Full-screen preview with fit mode selector (Fill / Fit / Stretch / Center / Tile) using `Image.resizeMode`; Apply CTA pushes to apply modal                                                           |
| `app/wallpaper/apply.tsx`     | Modal apply flow: destination picker (Lock / Home / Both) → save via `expo-file-system` + `expo-media-library` → iOS step-by-step guide or Android `WALLPAPER_SETTINGS` intent → success/error states |

### Explore Tab

| File                                     | Description                                                                                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `app/(tabs)/explore/category/[slug].tsx` | Category wallpaper grid, fetches via `getCategory` + `getWallpapersByCategory`                                                           |
| `app/(tabs)/explore/mood/[slug].tsx`     | Mood wallpaper grid, fetches via `getMood` + `getWallpapersByMood`                                                                       |
| `app/(tabs)/explore/search.tsx`          | Search screen with debounced FTS input, result count, empty and initial states                                                           |
| `app/(tabs)/explore/index.tsx`           | **Updated:** fixed navigation paths to `/(tabs)/explore/category/` and `/(tabs)/explore/mood/`; added search icon button → search screen |

### Collections Tab

| File                                | Description                                                     |
| ----------------------------------- | --------------------------------------------------------------- |
| `app/(tabs)/collections/[slug].tsx` | Cover image header, collection metadata, ordered wallpaper grid |

### Profile Tab

| File                              | Description                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `app/(tabs)/profile/settings.tsx` | Grid layout preference + clear download cache (new `expo-file-system` v57 `File`/`Directory`/`Paths` API) |
| `app/(tabs)/profile/about.tsx`    | App version (`expo-constants`), Privacy/ToS/Licenses links, copyright                                     |
| `app/(tabs)/profile/index.tsx`    | **Updated:** fixed navigation routes to `/(tabs)/profile/settings` and `/(tabs)/profile/about`            |

### Queries

| File             | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `lib/queries.ts` | Added `getCategory(slug)` and `getMood(slug)` (single-entity lookups) |

---

## Key Decisions

- **expo-file-system v57 API**: Legacy `FileSystem.cacheDirectory`/`downloadAsync` are deprecated and throw at runtime. Used new class API: `File.downloadFileAsync(url, Paths.cache)`.
- **expo-media-library v57**: `requestPermissionsAsync()` returns a single `PermissionResponse`, not an array — destructured as `{ status }`.
- **Android wallpaper intent**: Used `IntentLauncher.ActivityAction.WALLPAPER_SETTINGS` (the correct v57 enum member; `SET_WALLPAPER` does not exist).
- **Route paths**: Category/mood screens live under `(tabs)/explore/` — navigation must use `/(tabs)/explore/category/[slug]`, not `/category/[slug]`.
- **Fit mode tile**: `Image.resizeMode="repeat"` maps to the Tile mode.

---

## Verification

```
pnpm --filter @aspekt/mobile exec tsc --noEmit  ✓ 0 errors
pnpm --filter @aspekt/mobile lint                ✓ 0 errors, 0 warnings
pnpm --filter @aspekt/mobile exec prettier ...   ✓ all files formatted
```
