# Phase 4 — UI Foundation

## Goals

Build the visible shell of both apps: navigation, component primitives, and a themed mobile tab bar. Screen content stays as stubs for Phase 5.

---

## Web (`apps/web`)

### Nav (`components/nav.tsx`)

- Fixed top bar, `z-50`, height `h-14`
- **Scroll-aware:** transparent at top → `bg-glass` + `border-b border-border` at 8 px scroll depth
- Logo left, nav links centre (hidden below `md`), actions right
- Active link: `bg-raised text-foreground`; inactive: `text-muted hover:text-foreground`
- Actions: Search (hidden below `sm`), "Get the App" gradient CTA

### Component primitives

| Component    | File                    | Variants                                               |
| ------------ | ----------------------- | ------------------------------------------------------ |
| `<Button>`   | `components/button.tsx` | `primary` / `secondary` / `ghost` × `sm` / `md` / `lg` |
| `<Chip>`     | `components/chip.tsx`   | `default` / `accent` / `gradient`                      |
| `<Logo>`     | `components/logo.tsx`   | `gradient` / `mono`                                    |
| `<LogoMark>` | `components/logo.tsx`   | `gradient` / `mono`                                    |

- `Logo` and `LogoMark` are `'use client'` — use React's `useId()` so each instance gets a unique SVG `linearGradient` id (prevents gradient resolution collisions when multiple marks appear on one page).
- `Button primary` and `Chip gradient` use `bg-accent-gradient` and inline `color: '#0B0B0E'` for on-gradient text.

### Layout (`app/layout.tsx`)

- `<Nav />` rendered at the top of `<body>`
- `<div className="pt-14">` wraps `{children}` to clear the fixed nav

### Homepage stub (`app/page.tsx`)

Placeholder hero for Phase 5 replacement:

- Accent chip → gradient headline → CTA buttons (Browse Wallpapers / View Collections)
- 8-card placeholder grid with gradient swatches (aspect-ratio 3/4)
- App download CTA strip at the bottom

---

## Mobile (`apps/mobile`)

### `<Screen>` wrapper (`components/screen.tsx`)

```tsx
<Screen edges={['top', 'bottom']}>{/* screen content */}</Screen>
```

- Wraps content in `SafeAreaView` + `View`
- Reads `useColorScheme()` and applies `lightTheme.colors.background` or `darkTheme.colors.background`
- All tab screens import this; Phase 5 replaces stub content

### Tab bar (`app/(tabs)/_layout.tsx`)

- `@expo/vector-icons` Ionicons — outline icon when inactive, filled when active
- Tab → icon map: Home (`home`), Explore (`compass`), Collections (`albums`), Profile (`person`)
- `tabBarStyle`: `backgroundColor: theme.colors.surface`, `borderTopColor: theme.colors.border`
- `tabBarActiveTintColor: theme.colors.accent.flatDark`
- `tabBarInactiveTintColor: theme.colors.muted`

---

## Verification

```
pnpm type-check  ✓ 10/10 tasks
pnpm lint        ✓ 6/6 tasks
pnpm build       ✓ web builds clean (8 pages)
pnpm format      ✓ all files formatted
```
