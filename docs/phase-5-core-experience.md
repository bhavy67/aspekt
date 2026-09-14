# Phase 5 — Core Wallpaper Experience

## Summary

Phase 5 delivers the full content layer: live Supabase database, 30 seeded wallpapers, and every public-facing screen on both web and mobile.

---

## Supabase project

|                |                                            |
| -------------- | ------------------------------------------ |
| **Project ID** | `ypppcbxjowvbnzvvkmpe`                     |
| **URL**        | `https://ypppcbxjowvbnzvvkmpe.supabase.co` |
| **Region**     | ap-south-1                                 |

Credentials are in `apps/web/.env.local` and `apps/mobile/.env.local` (not committed).

---

## Database schema

Migrations applied:

- `20260914000001_core_schema` — all tables, indexes, RLS policies
- `20260914000002_wallpapers_fts` — full-text search trigger + GIN index

### Tables

| Table                   | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| `categories`            | 6 content categories (Abstract, Architecture, Nature, Minimal, Dark, Gradient) |
| `moods`                 | 4 mood filters (Focus, Calm, Bold, Dreamy)                                     |
| `collections`           | 3 curated collections                                                          |
| `wallpapers`            | 30 wallpapers with title, slug, image_url, thumbnail_url, tags, color_palette  |
| `wallpaper_categories`  | M:M junction (37 links)                                                        |
| `wallpaper_moods`       | M:M junction (30 links)                                                        |
| `wallpaper_collections` | Ordered M:M junction (18 links)                                                |

All tables have RLS enabled with public `SELECT` policies. No writes via anon key.

Seed data uses [picsum.photos](https://picsum.photos) seed-based URLs for development images. Replace with CDN URLs in Phase 7.

---

## Web (`apps/web`)

### New files

| File                            | Description                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| `lib/supabase.ts`               | Single `createClient` instance (anon key, public reads only)         |
| `lib/queries.ts`                | Typed server-side query functions for all entities                   |
| `components/wallpaper-card.tsx` | Reusable card with Next.js `Image`, hover overlay, free badge        |
| `next.config.ts`                | Added `remotePatterns` for `picsum.photos` and `images.unsplash.com` |

### Updated pages

| Route                 | Rendering                  | Description                                               |
| --------------------- | -------------------------- | --------------------------------------------------------- |
| `/`                   | SSG + 1h revalidate        | Hero, featured grid (8), categories, collections, app CTA |
| `/browse`             | SSR (searchParams)         | Full grid with category/mood filter chips, search         |
| `/explore`            | SSG + 1h revalidate        | Category cards grid + mood cards grid                     |
| `/collections`        | SSG + 1h revalidate        | All curated collections                                   |
| `/collections/[slug]` | SSG (generateStaticParams) | Collection cover header + wallpaper grid                  |
| `/category/[slug]`    | SSG (generateStaticParams) | Category header + wallpaper grid                          |
| `/mood/[slug]`        | SSG (generateStaticParams) | Mood header + wallpaper grid                              |
| `/wallpaper/[slug]`   | SSG (generateStaticParams) | Full preview, download, tags, related                     |
| `/search`             | SSR                        | FTS results grid                                          |
| `/download`           | SSG                        | App store CTA with feature highlights                     |

---

## Mobile (`apps/mobile`)

### New files

| File              | Description                                     |
| ----------------- | ----------------------------------------------- |
| `lib/supabase.ts` | `createClient` using `EXPO_PUBLIC_*` env vars   |
| `lib/queries.ts`  | Typed async query functions (same shape as web) |

### Updated screens

| Screen           | Data                                                               |
| ---------------- | ------------------------------------------------------------------ |
| Home Feed        | `FlatList` of 30 wallpapers, 2-column grid, tap → wallpaper detail |
| Explore Hub      | Categories grid (3-col) + Moods grid (2-col) with cover images     |
| Collections List | `FlatList` of collections with cover images and descriptions       |
| Profile Hub      | Guest CTA + coming-soon feature previews + Settings/About links    |

---

## Verification

```
pnpm type-check  ✓ 10/10 tasks
pnpm lint        ✓ 6/6 tasks
pnpm build       ✓ 43 pages generated (30 wallpapers + 6 categories + 4 moods + 3 collections + static pages)
pnpm format      ✓ all files formatted
```
