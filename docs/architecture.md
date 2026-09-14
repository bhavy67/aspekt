# ASPEKT — Architecture Overview

> This document provides a high-level architecture summary.
> See `decisions/` for individual Architecture Decision Records (ADRs).

## Stack

| Layer                | Technology                             | Rationale                                              |
| -------------------- | -------------------------------------- | ------------------------------------------------------ |
| Mobile (iOS/Android) | React Native + Expo (managed workflow) | Cross-platform, mature ecosystem                       |
| Web                  | Next.js (App Router)                   | SSR/SSG for SEO, proper desktop experience             |
| Monorepo             | Turborepo + pnpm workspaces            | Build caching, shared packages                         |
| Database             | PostgreSQL (via Supabase)              | Relational, suited for wallpaper catalog + coin ledger |
| Auth                 | Supabase Auth                          | Google/Apple OAuth, JWT, Row Level Security            |
| Backend              | Supabase (PostgREST + Edge Functions)  | Managed, no DevOps burden                              |
| Image Storage        | Cloudflare R2 + Cloudflare Images      | Zero egress fees, on-the-fly transformations           |
| IAP                  | RevenueCat (Phase 11+)                 | Cross-platform purchase abstraction                    |
| Ads                  | Google AdMob (Phase 10+)               | Rewarded ads for coin earning                          |

## Monorepo Structure

```
aspekt/
├── apps/
│   ├── mobile/     Expo app (iOS + Android)
│   └── web/        Next.js app
├── packages/
│   ├── types/      Shared TypeScript types
│   ├── core/       Fit Engine, coin math, validation, utilities
│   ├── api-client/ Supabase query functions
│   └── config/     ESLint + TypeScript base configs
├── supabase/       Supabase project config + migrations
└── docs/           Architecture decisions
```

## Shared Code Boundary

**Shared** (packages/): TypeScript types, business logic, API query functions, validation.

**Not shared** (per-app): UI components, navigation, styling, platform APIs.

## Key Design Decisions

- ADR-001: Monorepo with Turborepo + pnpm
- ADR-002: Supabase as backend platform
- ADR-003: iOS wallpaper apply — PHPhotoLibrary + in-app guide (no public API)
- ADR-004: Navigation architecture — 4-tab mobile, top-nav web, adaptive layout

## Phase Status

| Phase                          | Status      |
| ------------------------------ | ----------- |
| 0 — Product Understanding      | ✅ Complete |
| 1 — Project Foundation         | ✅ Complete |
| 2 — Product & UX Architecture  | ✅ Complete |
| 3 — Branding & Visual Identity | Pending     |
| 4 — UI Foundation              | Pending     |
| 5 — Core Wallpaper Experience  | Pending     |
| 6 — Device-Aware Experience    | Pending     |
| 7 — Backend & Content Platform | Pending     |
| 8 — Accounts & Authentication  | Pending     |
| 9 — Coins & Entitlements       | Pending     |
| 10 — Advertising               | Pending     |
| 11 — Payments                  | Pending     |
| 12 — Production Hardening      | Pending     |
| 13 — Store & Web Launch        | Pending     |
