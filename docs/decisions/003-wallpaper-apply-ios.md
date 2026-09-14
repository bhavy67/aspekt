---
title: 'ADR-003: iOS Wallpaper Apply Architecture'
date: 2026-09-14
status: Accepted
---

## Context

ASPEKT's core feature is applying wallpapers to device screens. On Android this is
handled via the public `WallpaperManager` API. iOS requires a fundamentally different
approach because Apple provides no equivalent public API for third-party apps.

This ADR documents the platform constraint, the decision on how to handle it, and the
consequences for the product experience.

## Findings

Apple provides no public API that allows a third-party App Store application to
programmatically set the device Home Screen or Lock Screen wallpaper. This was
confirmed via Apple Developer Forums threads 110679 and 765870, both of which received
direct responses from Apple DTS engineers.

Specific findings:

- There is no public Apple framework named "WallpaperKit" available to third-party
  developers. The name has no significance in the public SDK.
- There are no entitlements that unlock wallpaper-setting capability for App Store
  distributed apps.
- Apps that use private wallpaper APIs are rejected under App Store Guideline 2.5.1.
- MDM (Mobile Device Management) can set wallpapers on supervised enterprise devices,
  but this is entirely outside the consumer App Store app model.
- The URL scheme `prefs:root=Wallpaper` was never officially supported and is broken
  as of iOS 18.1 (opens root Settings, not the Wallpaper sub-screen).

## Decision

ASPEKT will use the only viable approach for App Store apps: save the processed image
to the user's Photos library, then show an in-app step-by-step guide for the user to
complete the final step in iOS Settings manually.

### iOS Apply Flow

1. User completes Fit/Customize and selects destination (Home Screen / Lock Screen / Both)
2. ASPEKT processes the image on-device (fit mode, position, background colour applied)
3. ASPEKT saves the processed image to the Photos library using `PHPhotoLibrary`
   with add-only permission (`PHAccessLevel.addOnly`)
4. ASPEKT shows an in-app step-by-step guide:
   - Open Settings
   - Tap Wallpaper
   - Tap Add New Wallpaper
   - Find the saved photo in your library
   - Choose Home Screen / Lock Screen / Both
   - Tap Set
5. User completes the process in iOS Settings independently
6. User taps "Done" in ASPEKT — this is a self-reported confirmation

ASPEKT can only confirm that the processed image was saved to Photos.
ASPEKT cannot confirm that the wallpaper was set.

### Photos Permission

Use add-only access only. Do not request full library read/write.

- Add `NSPhotoLibraryAddUsageDescription` to `Info.plist` via `app.config.ts`
  `ios.infoPlist`
- Call `PHPhotoLibrary.requestAuthorization(for: .addOnly)` before saving
- Add-only access does not allow reading the user's existing photos

Usage description (approved): "ASPEKT saves your customised wallpaper to Photos so you
can set it as your wallpaper in iOS Settings."

### Settings Deep Link

Do not use `prefs:root=Wallpaper` or any `App-prefs:` scheme variant. These are
undocumented, unsupported, and broken on iOS 18.1+. The in-app guide is the only
reliable path.

### User-Facing Copy

Primary CTA: **"Save & Set Wallpaper"**

Supporting copy should explain clearly that ASPEKT will save the image and then walk
the user through the iOS Settings steps. The tone should be matter-of-fact, not
apologetic. This is a platform characteristic, not a product failure.

## Consequences

- The iOS apply experience requires more user steps than Android. This is an accurate
  reflection of platform constraints, not an implementation shortcut.
- ASPEKT communicates the two-step process honestly (RD-3: Option A — Transparent
  differentiation, approved 2026-09-14).
- The Fit/Customize step remains a core ASPEKT experience on iOS — the image is fully
  processed in-app before being handed to Photos.
- The terminal state on iOS is "image saved to Photos" + in-app guide, not "wallpaper
  applied".
- Phase 5 (Core Wallpaper Experience) will implement this flow in native Expo/React
  Native code using `expo-media-library` or `expo-image-picker` write API.
- Phase 6 (Device-Aware Experience) will refine the guide illustrations for specific
  iOS versions if the Settings path changes across OS versions.

## What NOT to do

- Do not use WallpaperKit — it does not exist as a public API for third-party apps.
- Do not use any private wallpaper-setting API — App Store rejection risk.
- Do not use `prefs:root=Wallpaper` — broken on iOS 18.1+.
- Do not claim ASPEKT successfully applied the wallpaper on iOS.
- Do not request full Photos read/write permission when add-only suffices.
