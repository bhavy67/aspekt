# ADR-001: Monorepo Architecture

**Date:** Phase 0 / Phase 1  
**Status:** Decided

## Problem

ASPEKT requires:

- A React Native / Expo app for iOS and Android
- A Next.js web application for proper SEO and desktop experience
- Shared TypeScript business logic, types, and API clients across both

These must be maintained coherently without duplicating domain logic.

## Options Considered

**A. Single Expo app with Expo Web**

- One codebase, simpler
- Expo Web cannot produce proper SSR for SEO
- Desktop experience constrained by React Native Web
- Rejected: SEO and desktop quality requirements not met

**B. Completely separate repositories**

- Maximum flexibility per app
- Types, business logic, and API clients would be duplicated or require a separate published npm package
- No shared build cache
- Rejected: too much duplication risk

**C. Turborepo + pnpm monorepo (chosen)**

- Shared TypeScript packages for types, logic, queries
- Each app has full autonomy over UI and platform APIs
- Turborepo provides task caching across the workspace
- pnpm workspaces handle dependency linking

## Decision

Use a **Turborepo + pnpm monorepo** with:

- `apps/mobile` — Expo managed workflow
- `apps/web` — Next.js App Router
- `packages/types`, `packages/core`, `packages/api-client`, `packages/config`

## Trade-offs

| Advantage                                       | Disadvantage                              |
| ----------------------------------------------- | ----------------------------------------- |
| Shared types — one change propagates everywhere | Two UI codebases to maintain              |
| Build cache across all packages                 | Metro + monorepo requires specific config |
| Single repository, single PR history            | pnpm hoisting config needed for Expo      |

## Reconsider If

- The project grows large enough that repository splitting is warranted
- A major Expo or Next.js version requires a fundamentally different structure
