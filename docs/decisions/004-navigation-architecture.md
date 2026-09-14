---
title: 'ADR-004: Navigation Architecture'
date: 2026-09-14
status: Accepted
---

## Context

ASPEKT targets phones, tablets, foldables, and desktop web across iOS, Android, and
browser. A navigation architecture is required that:

- Organises the four core product sections clearly
- Scales across form factors without separate app variants
- Supports universal deep links from external sources (share, notifications, SEO)
- Keeps the wallpaper-centric screens (Detail, Fit/Customize, Apply) accessible from
  any section

## Decisions

### Mobile — Four Root Tabs

| Position | Tab         | Root Screen                                   | V1  |
| -------- | ----------- | --------------------------------------------- | --- |
| 1        | Home        | Home Feed (curated, editorial)                | ✅  |
| 2        | Explore     | Explore Hub (search, categories, moods)       | ✅  |
| 3        | Collections | Collections List (curated ASPEKT collections) | ✅  |
| 4        | Profile     | Profile Hub (guest shell + Settings + About)  | ✅  |

Tab order rationale: Home anchors discovery; Explore enables intent-driven browsing;
Collections surfaces curation as a first-class identity; Profile is rightmost per
platform convention.

Each tab maintains its own independent navigation stack. Tab state (scroll position,
stack depth) is preserved when switching tabs.

### Expo Router File Structure

```
app/
  _layout.tsx                          Root Stack (headerShown: false globally)
  (tabs)/
    _layout.tsx                        Tabs navigator (4 tabs)
    index.tsx                          Home tab root — Home Feed
    explore/
      _layout.tsx                      Explore tab Stack
      index.tsx                        Explore Hub
      search.tsx                       Search Results
      category/[slug].tsx              Category Browse
      mood/[slug].tsx                  Mood Browse
    collections/
      _layout.tsx                      Collections tab Stack
      index.tsx                        Collections List
      [slug].tsx                       Collection Detail
    profile/
      _layout.tsx                      Profile tab Stack
      index.tsx                        Profile Hub (guest shell)
      settings.tsx                     Settings
      about.tsx                        About
  wallpaper/
    [slug].tsx                         Wallpaper Detail (root Stack — cross-tab)
    customize.tsx                      Fit/Customize (root Stack)
    apply.tsx                          Apply flow (root Stack, modal presentation)
```

### Wallpaper Screens at Root Stack Level

Wallpaper Detail, Fit/Customize, and Apply are defined at the root Stack level,
outside the tab group. This means:

- Any tab can navigate to `/wallpaper/[slug]` without needing to duplicate the screen
- The tab bar is hidden during the wallpaper flow (full-screen experience)
- The user returns to whichever tab initiated the navigation on back/dismiss

### Adaptive Navigation

| Width Class | Breakpoint | Mobile Pattern                       | Web Pattern           |
| ----------- | ---------- | ------------------------------------ | --------------------- |
| Compact     | < 600pt    | Bottom tab bar                       | Sticky header + chips |
| Medium      | 600–900pt  | Bottom tab bar or sidebar rail       | Top nav bar           |
| Expanded    | > 900pt    | Persistent left sidebar + split view | Top nav bar + content |

Tablet in expanded mode: sidebar replaces bottom tabs; wallpaper detail opens as
right-panel split rather than full-screen push.

Foldable: `FoldingFeature` (Jetpack WindowManager) drives layout transitions on
Android. App responds to `WindowSizeClass` changes without restart. Wallpaper
processing uses the active display's aspect ratio (determined at time of apply, not
per-display targeting — see ADR-003 context for why per-display is not possible).

Web: persistent top nav bar at all widths. No bottom tab bar on web at any viewport.
Navigation adapts from full top bar (desktop) to hamburger/chips (mobile web) in
Phase 4.

### Deep Link Strategy

| Scheme                      | Role                                                  |
| --------------------------- | ----------------------------------------------------- |
| `https://aspekt.app/[path]` | Universal Link (iOS) / App Link (Android) — preferred |
| `aspekt://[path]`           | Custom URI scheme — always works, fallback            |

Route → destination mapping:

| Path                  | Mobile screen                            | Web page              |
| --------------------- | ---------------------------------------- | --------------------- |
| `/wallpaper/[slug]`   | Wallpaper Detail (modal over active tab) | `/wallpaper/[slug]`   |
| `/collections/[slug]` | Collection Detail (Collections tab)      | `/collections/[slug]` |
| `/category/[slug]`    | Category Browse (Explore tab)            | `/category/[slug]`    |
| `/mood/[slug]`        | Mood Browse (Explore tab)                | `/mood/[slug]`        |
| `/explore`            | Explore tab root                         | `/explore`            |
| `/search?q=X`         | Explore tab → Search pre-filled          | `/search?q=X`         |
| `/collections`        | Collections tab root                     | `/collections`        |
| `/download`           | App Store redirect                       | `/download`           |

Wallpaper and collection deep links open as a modal over the current active tab.
Tab-root deep links switch the active tab.

### Universal Links

Universal links require domain verification at store submission time. The
`aspekt://` custom scheme provides deep link capability from development onwards.
Universal link configuration (`associatedDomains` on iOS, `autoVerify` intent
filters on Android) is scaffolded in Phase 2 and activated in Phase 13
(Store & Web Launch).

## Consequences

- Wallpaper Detail is always a root-level push — the tab bar is hidden during the
  wallpaper flow. This is intentional; full-screen preview is the primary experience.
- Adaptive layout (sidebar, split view) must be implemented in Phase 4 (UI Foundation)
  and Phase 6 (Device-Aware Experience). Phase 2 establishes the route structure only.
- User-created collections (Phase 8) will add screens to the Collections tab stack
  without changing the tab structure.
- Auth screens (Phase 8) will be presented as modals at the root Stack level.
- Coin Store and account features (Phase 9+) will be added to the Profile tab stack.
