# ADR-002: Backend Platform — Supabase

**Date:** Phase 0  
**Status:** Decided

## Problem

ASPEKT requires:

- Relational database (wallpapers, users, coins, entitlements)
- Authentication (Google + Apple OAuth)
- Server-side business logic (coin verification, purchase webhooks)
- Row-level data isolation per user

## Options Considered

**A. Supabase (chosen)**

- PostgreSQL + Auth + Edge Functions in one managed platform
- Row Level Security for user data isolation
- TypeScript type generation from schema
- PostgREST auto-API from schema
- Self-hostable if needed

**B. Custom Node.js/Bun API + hosted PostgreSQL**

- Full control, portable
- Requires more infrastructure setup
- Higher DevOps burden in early phases

**C. Firebase**

- NoSQL is a poor fit for relational wallpaper catalog + coin ledger
- Rejected: data model mismatch

## Decision

Use **Supabase** for:

- PostgreSQL database
- Supabase Auth (Google + Apple OAuth)
- Edge Functions for server-authoritative operations (coins, purchases)
- Row Level Security for user data isolation

Use **Cloudflare R2 + Cloudflare Images** separately for image storage/CDN.  
Supabase Storage is not sufficient for multi-variant, format-optimized wallpaper delivery.

## Important Notes

- Supabase Edge Functions run on Deno. Complex business logic should be kept lean.
- Edge Functions are for async/server-authoritative operations, not hot request paths.
- PostgreSQL is standard and portable. Lock-in is manageable if migration is ever needed.
- Search quality will eventually require a dedicated index (Typesense/Algolia) — do not rely on PostgreSQL full-text search indefinitely.

## Reconsider If

- Complex recommendation or computation logic outgrows Edge Functions
- Cost exceeds reasonable bounds at scale (database is portable to any PostgreSQL host)
- A major Supabase API change is incompatible
