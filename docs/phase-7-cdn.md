# Phase 7 — Image CDN

## Summary

Phase 7 creates the Supabase Storage bucket for production wallpaper images and delivers the upload pipeline. Development seed data still uses picsum.photos. Run the upload script once you have source image files to switch the database to CDN URLs.

---

## What was built

| Area                 | Change                                                            |
| -------------------- | ----------------------------------------------------------------- |
| **Supabase Storage** | `wallpapers` bucket — public, 20 MB limit, JPEG/WebP/PNG only     |
| **Storage RLS**      | `Public read wallpapers` policy — anonymous SELECT on all objects |
| **Upload script**    | `scripts/upload-wallpaper.ts` — resize + upload + DB update       |
| **Next.js config**   | Added `*.supabase.co` remote pattern for `next/image`             |
| **Root deps**        | `sharp`, `tsx`, `@supabase/supabase-js` as devDependencies        |
| **Migration file**   | `supabase/migrations/20260914000003_wallpapers_storage.sql`       |

---

## Storage layout

```
wallpapers/          (bucket — public)
  full/{slug}.jpg    ← image_url in DB    — longest edge 2560 px, JPEG q90
  thumb/{slug}.jpg   ← thumbnail_url in DB — longest edge 640 px,  JPEG q90
```

Public URL pattern:

```
https://ypppcbxjowvbnzvvkmpe.supabase.co/storage/v1/object/public/wallpapers/full/{slug}.jpg
```

---

## Using the upload script

### Prerequisites

1. Get your **service_role key** from Supabase → Settings → API → Project API keys.
2. Add it to `apps/web/.env.local` (or export it):
   ```
   SUPABASE_SERVICE_KEY=eyJhbG...
   ```

### Single image

```bash
pnpm upload-wallpaper --slug aurora-borealis-a8f3 --file ./images/aurora.jpg
```

### Batch upload

Name each file after the wallpaper slug (e.g. `aurora-borealis-a8f3.jpg`):

```bash
pnpm upload-wallpaper --dir ./images/
```

The script will:

1. Resize to full (2560 px) and thumb (640 px) using `sharp`
2. Upload both to Supabase Storage with `upsert: true`
3. `UPDATE wallpapers SET image_url, thumbnail_url, width, height WHERE slug = $slug`
4. Print the public CDN URLs

Portrait images (height > width) are handled: the longest edge is capped at 2560 / 640 respectively.

---

## Verification

```
Supabase Storage bucket created:   ✓ wallpapers (public)
RLS policy applied:                ✓ Public read wallpapers
Migration on disk:                 ✓ 20260914000003_wallpapers_storage.sql
Script type-check:                 ✓ 0 errors
Script smoke test:                 ✓ exits with clear error when env vars missing
Next.js image remote pattern:      ✓ *.supabase.co/storage/v1/object/public/**
Web type-check:                    ✓ 0 errors
```
