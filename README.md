# ASPEKT

> **A beautifully curated wallpaper platform that understands your
> screen.**

ASPEKT is a production-grade, cross-platform wallpaper platform designed
for people who care about how their screen looks, not simply how many
wallpapers they can browse.

The product should feel **beautiful, calm, premium, fast, intentional,
curious, and human**.

This README is the initial **source of truth** for the project. It
describes the product vision, requirements, constraints, development
process, quality bar, open decisions, and launch direction.

------------------------------------------------------------------------

## 1. Project Identity

### Product Name

**ASPEKT**

Use `ASPEKT` as the primary brand spelling throughout the product unless
a later explicit brand decision changes it.

The name is inspired by the idea of **aspect, proportion, composition,
framing, and the relationship between an image and a screen**. The
distinctive `K` spelling is intentional.

### Product Type

Cross-platform wallpaper discovery, personalization, and digital-content
platform.

### Target Platforms

ASPEKT is intended to become a real production product for:

-   Android phones
-   iPhones
-   Android tablets
-   iPads
-   Foldable Android devices
-   Desktop browsers
-   Laptop browsers
-   Large monitors
-   Resizable browser windows
-   Split-screen environments

The project must **not** be treated as a phone-only application.

### Preferred Application Stack

Initial direction:

-   React Native
-   Expo
-   TypeScript
-   Expo Web / React Native Web where appropriate

The exact supporting technologies are not finalized yet.

Technology choices must be made based on:

-   Production stability
-   Cross-platform compatibility
-   Performance
-   Maintainability
-   Accessibility
-   Developer experience
-   Long-term scalability
-   Store requirements
-   Ecosystem maturity

Do not add technologies simply because they are currently popular.

------------------------------------------------------------------------

# 2. Product Vision

## Core Vision

> **A curated wallpaper platform that understands your screen and your
> aesthetic.**

Most wallpaper applications treat a wallpaper as a static image.

ASPEKT should treat a wallpaper as a **visual composition that needs to
work with the screen on which it is displayed**.

The product should understand, where technically possible:

-   Screen dimensions
-   Available viewport
-   Aspect ratio
-   Orientation
-   Resolution
-   Device/window size
-   Foldable posture/state
-   Image composition
-   Subject placement
-   Safe visual areas
-   Wallpaper category
-   Mood
-   User preferences

### Core Principle

> **The wallpaper should adapt to the screen, not the other way
> around.**

This principle should influence product design, image processing,
recommendation logic, previewing, and responsive UI.

------------------------------------------------------------------------

# 3. What ASPEKT Is

ASPEKT is intended to be:

-   A curated visual gallery
-   A premium wallpaper discovery experience
-   A place to discover wallpapers by mood and aesthetic
-   A platform that understands different screens
-   A product where preview quality matters
-   A product that values quality over catalog size
-   A calm alternative to ad-heavy wallpaper browsing

ASPEKT should make users feel that wallpapers have been **selected with
taste**, not dumped into a database.

------------------------------------------------------------------------

# 4. What ASPEKT Is NOT

ASPEKT should not become:

-   A Zedge clone
-   A generic wallpaper dump
-   A social network
-   A wallpaper community in V1
-   A marketplace in V1
-   An AI image generator as its primary identity
-   An aggressively gamified application
-   A casino-like coins system
-   An ad-heavy free application
-   A subscription trap
-   A complicated wallpaper editor
-   A collection of scraped images
-   A stock-photo browsing website
-   A product overloaded with features simply because competitors have
    them

The project should remain focused.

------------------------------------------------------------------------

# 5. Core User Loop

The primary loop should be:

**Discover → Preview → Fit → Save / Download → Return**

A typical user journey:

1.  Open ASPEKT.
2.  Immediately see high-quality wallpaper content.
3.  Browse recommendations, collections, moods, and categories.
4.  Open a wallpaper.
5.  See a beautiful, realistic preview.
6.  Understand how it fits their screen.
7.  Favorite it or download it.
8.  Optionally unlock it if it is premium.
9.  Return later for new content.

Every major feature should strengthen this loop.

------------------------------------------------------------------------

# 6. Main Differentiators

ASPEKT should not depend on a single gimmick.

The product differentiation should come from several connected ideas.

## 6.1 Perfect Fit

The product should understand the user's screen.

Do not think only in terms of:

-   1080p
-   1440p
-   4K
-   8K

Also consider:

-   Width
-   Height
-   Aspect ratio
-   Orientation
-   Viewport
-   Device class
-   Foldable state
-   Image composition
-   Subject position
-   Crop requirements
-   Safe areas
-   Lock-screen composition
-   Home-screen composition

ASPEKT should reduce:

-   Unwanted cropping
-   Stretching
-   Blurry wallpapers
-   Wrong orientation
-   Important subjects being hidden
-   Black bars
-   Awkward positioning
-   Poor lock-screen composition

------------------------------------------------------------------------

## 6.2 Mood-Based Discovery

Traditional categories are useful, but ASPEKT should have a more
editorial way of discovering content.

Potential moods/aesthetics:

-   Calm
-   Midnight
-   Solitude
-   Minimal
-   Earth
-   Monochrome
-   Retro Future
-   Warm
-   Dreamy
-   Dark
-   Abstract
-   Architecture
-   Nature
-   Experimental
-   Sunday
-   Quiet
-   Motion
-   Neon
-   Film
-   Space

These are **examples**, not a final taxonomy.

The final taxonomy must be intentionally designed during product/UX
work.

------------------------------------------------------------------------

## 6.3 Curated Quality

A smaller collection of excellent wallpapers is preferable to thousands
of mediocre wallpapers.

Each production wallpaper should have:

-   Clear provenance
-   Appropriate licensing
-   Useful metadata
-   Correct dimensions
-   Correct orientation
-   Appropriate categorization
-   Appropriate mood/tags
-   Quality-control review

------------------------------------------------------------------------

## 6.4 Beautiful Preview

Wallpaper previewing is a core feature, not a secondary detail.

Potential preview modes:

-   Fullscreen preview
-   Device frame
-   Lock-screen preview
-   Home-screen preview
-   Crop preview
-   Fit preview
-   Portrait preview
-   Landscape preview
-   Tablet preview
-   Desktop preview
-   Foldable preview

The preview should help the user answer:

> **"Will this actually look good on my screen?"**

------------------------------------------------------------------------

# 7. Product Personality

ASPEKT should feel:

-   Premium
-   Minimal
-   Artistic
-   Curious
-   Modern
-   Calm
-   Slightly playful
-   Confident
-   Human
-   Intentional

ASPEKT should not feel:

-   Corporate
-   Generic
-   Overly technical
-   AI-heavy
-   Cheap
-   Cluttered
-   Aggressively monetized
-   Gamified
-   Like a stock-image website

The visual identity should communicate **taste before functionality**.

------------------------------------------------------------------------

# 8. Branding & Visual Identity

Branding is a major product milestone.

The final product must eventually have:

-   Logo
-   Logo mark
-   App icon
-   Favicon
-   Web favicon variants
-   Android icon assets
-   iOS icon assets
-   Splash / launch visual where appropriate
-   Social preview image
-   Typography system
-   Color palette
-   Design tokens
-   Basic brand guidelines

## IMPORTANT: BRANDING DECISION GATE

When development reaches the branding / visual design stage, the AI
coding agent MUST STOP and ask the product owner for branding
requirements before finalizing the visual identity.

Do **not** silently invent the final brand identity.

Do **not** permanently choose colors without asking.

Do **not** permanently choose typography without asking.

Do **not** create a final logo/final favicon based on assumptions.

The agent should ask about:

1.  Preferred overall mood
2.  Preferred colors
3.  Colors to avoid
4.  Light mode, dark mode, or both
5.  Logo style
6.  Symbol vs wordmark vs combination
7.  Typography direction
8.  Minimal vs expressive direction
9.  Geometric vs organic direction
10. Editorial vs futuristic vs playful direction
11. Whether the mark should relate to the `A`
12. Whether the mark should relate to aspect ratio / framing / screens
13. Favicon preferences
14. App icon preferences
15. Visual references the user likes
16. Visual references the user dislikes

If the user is undecided, the agent should propose **multiple visual
directions with reasoning** and ask the user to choose.

### Suggested branding checkpoint message

The agent can say:

> "We have reached the ASPEKT branding stage. Before I finalize the
> theme, logo, app icon, and favicon, I need your visual direction.
> Please tell me your preferred colors, mood, logo style, typography
> direction, and any references you like or dislike. If you are
> undecided, I can propose several directions first."

------------------------------------------------------------------------

# 9. Branding Deliverables

A future asset structure may look like:

``` text
assets/
  branding/
    logo/
    icons/
    favicon/
    app-icon/
    splash/
    social/
  fonts/
```

The exact structure can change during implementation.

Final branding should consider:

### Logo

-   Primary logo
-   Compact mark
-   Light-background version
-   Dark-background version
-   Monochrome version where useful

### Favicon

Consider:

-   SVG
-   16×16
-   32×32
-   48×48
-   Browser/platform-specific requirements

### App Icon

Create proper platform assets rather than simply stretching one image
into every required size.

### Social Preview

Create a proper website/social sharing image.

------------------------------------------------------------------------

# 10. Target Users

Primary users include:

-   People who frequently change wallpapers
-   Design-conscious users
-   Minimalist users
-   Photography lovers
-   Abstract-art lovers
-   People who want premium wallpapers
-   People frustrated by poor wallpaper cropping
-   Foldable-phone users
-   Tablet users
-   Desktop users
-   Users who prefer curated content over enormous catalogs

Potential future users:

-   Photographers
-   Digital artists
-   Designers
-   Wallpaper creators

Creator functionality is not required for V1.

------------------------------------------------------------------------

# 11. Initial V1 Scope

V1 should focus on the core experience.

## Discovery

Potential V1 features:

-   Home feed
-   Explore
-   Curated collections
-   Mood-based categories
-   Traditional categories
-   Search
-   Featured wallpapers
-   New wallpapers
-   Recommended wallpapers
-   Daily wallpaper / daily drop if validated

## Wallpaper Details

-   High-quality preview
-   Title
-   Metadata
-   Resolution
-   Aspect ratio
-   Orientation
-   Supported screen profiles
-   Favorite
-   Download
-   Share
-   Free/premium status
-   Coin price where applicable
-   Similar wallpapers

## Personalization

-   Favorites
-   Collections
-   Recently viewed where useful
-   Download history where useful
-   User preferences

## Accounts

Accounts should NOT be mandatory at first launch.

Users should be able to explore the core product before creating an
account.

Potential authentication later:

-   Google Sign-In
-   Apple Sign-In

Account functionality may eventually synchronize:

-   Favorites
-   Collections
-   Preferences
-   Purchases
-   Entitlements

------------------------------------------------------------------------

# 12. Features Explicitly Deferred

Do not implement these simply because they sound attractive.

Deferred until validated:

-   Creator marketplace
-   User uploads
-   Public creator profiles
-   Social following
-   Comments
-   Messaging
-   Community feed
-   Complex wallpaper editor
-   AI generation as the main feature
-   NFT/crypto functionality
-   Advanced social features
-   Complex gamification
-   Referral systems
-   Wallpaper contests
-   Advanced subscriptions

These may be considered for future versions.

------------------------------------------------------------------------

# 13. Monetization Direction

Monetization should be gradual.

The user experience should remain valuable even without spending money.

## Free Content

Some wallpapers should always be directly free.

## Premium Content

Premium wallpapers may use a coin-based model.

Initial placeholder idea:

-   Starting balance: approximately 100--200 coins
-   Premium wallpaper: approximately 10--20 coins

These numbers are **not final** and must be validated before
implementation.

## Ways to Earn Coins

Potential:

-   Daily reward
-   Streak reward
-   Rewarded advertisement
-   Promotional rewards

## Paid Coin Packs

Potential future packs:

-   Small
-   Medium
-   Large
-   Bonus

Exact pricing and quantities must be decided later.

### Important Monetization Rule

Coins must not make ASPEKT feel like a mobile game.

The purpose of coins is to support a digital-content economy, not
manipulate users.

------------------------------------------------------------------------

# 14. Advertising

Advertising should be introduced carefully.

Preferred initial ad type:

> **Opt-in rewarded ads**

Example:

> "Watch a short ad to earn coins."

Avoid aggressive advertising.

Avoid:

-   Ads immediately after launch
-   Frequent interstitials
-   Ads interrupting wallpaper previews
-   Ads blocking navigation
-   Fake buttons
-   Misleading ad placements
-   Forced ad watching

The core browsing experience must remain enjoyable.

------------------------------------------------------------------------

# 15. Payments

Digital wallpaper content and virtual currency may require
platform-specific billing systems.

Before implementing payments, the AI agent must research and verify the
**current official Apple and Google requirements**.

Potential architecture:

``` text
User
  ↓
Purchase
  ↓
Platform Billing
  ↓
Backend Verification
  ↓
Entitlement / Coin Credit
  ↓
User Account
```

Never trust the client alone to determine ownership of paid content.

Payment implementation must consider:

-   Purchase success
-   Purchase failure
-   Pending purchase
-   Cancelled purchase
-   Duplicate callbacks
-   Restore purchases
-   Refunds
-   Entitlement synchronization
-   Server-side verification
-   Network failures
-   App restarts during purchase
-   Cross-device synchronization

------------------------------------------------------------------------

# 16. Authentication

Authentication should provide value rather than become an unnecessary
gate.

Initial experience:

> **Browse first. Login later.**

Potential providers:

-   Google
-   Apple

Authentication must eventually handle:

-   Login
-   Signup
-   Logout
-   Session expiry
-   Token refresh
-   Cancellation
-   Network errors
-   Existing accounts
-   New accounts
-   Account deletion
-   Secure credential/token storage

------------------------------------------------------------------------

# 17. Backend

ASPEKT is expected to require a backend for production functionality.

Potential backend responsibilities:

-   Wallpaper catalog
-   Wallpaper metadata
-   Categories
-   Moods
-   Collections
-   Search
-   User accounts
-   Favorites
-   User collections
-   Coin balances
-   Transactions
-   Purchases
-   Entitlements
-   Rewarded-ad rewards
-   Daily rewards
-   Analytics
-   Admin functionality
-   Content management
-   Future creator functionality

The backend technology is **not finalized**.

Architecture must be designed before implementation.

------------------------------------------------------------------------

# 18. Storage & CDN

Large wallpaper image binaries should not be stored directly inside the
primary database.

Conceptual architecture:

``` text
Mobile / Web
      |
      v
     API
      |
      +-------- Database
      |
      +-------- Object Storage
                    |
                    v
                   CDN
```

The database should store metadata and references.

Object storage should hold image assets.

Potential image variants:

-   Thumbnail
-   Small preview
-   Medium preview
-   Full-resolution image
-   Device-specific variant where justified

Potential future optimization:

-   CDN transformations
-   Responsive images
-   WebP
-   AVIF
-   Progressive loading
-   Resolution-aware delivery

------------------------------------------------------------------------

# 19. Wallpaper Metadata

A conceptual wallpaper model may contain:

``` text
id
title
description
author
source
license
category
moods
tags
orientation
width
height
aspectRatio
resolution
fileSize
thumbnailUrl
previewUrl
fullImageUrl
isFree
coinPrice
isFeatured
isDaily
createdAt
updatedAt
```

This is **not a final schema**.

The final schema must be designed during the backend architecture phase.

------------------------------------------------------------------------

# 20. Content Licensing

This is a critical production requirement.

Do NOT scrape or redistribute content from:

-   Google Images
-   Pinterest
-   Instagram
-   Other wallpaper applications
-   Websites without redistribution permission

Production wallpapers must have appropriate commercial rights.

Possible legitimate sources:

-   Original artwork
-   Original photography
-   Properly licensed artwork
-   Commissioned artwork
-   Explicit creator submissions
-   Generated artwork where commercial rights are clear

Every production wallpaper should have known provenance.

------------------------------------------------------------------------

# 21. Device-Aware Architecture

ASPEKT must be designed around **available space and capabilities**, not
device-name assumptions.

Avoid logic such as:

``` text
if Samsung Fold
if iPhone 15
if iPad
```

unless a platform-specific capability genuinely requires it.

Prefer:

``` text
availableWidth
availableHeight
aspectRatio
orientation
windowSize
platformCapabilities
```

Think in adaptive layout classes such as:

``` text
Compact
Medium
Expanded
Large
```

Exact breakpoints must be determined during design and implementation.

------------------------------------------------------------------------

# 22. Foldable Support

Foldables are a first-class consideration.

Support should include, where technically available:

-   Folded state
-   Unfolded state
-   Portrait
-   Landscape
-   Split-screen
-   Resizable windows

Special attention is required for:

-   Wallpaper preview
-   Navigation
-   Grid layout
-   Fullscreen preview
-   Modal placement
-   Image crop
-   Safe areas
-   Fold/hinge areas where applicable
-   Transitions between states

Do not create a separate application for foldables.

The application should adapt naturally.

------------------------------------------------------------------------

# 23. Tablet Support

Tablet and iPad layouts should not simply be enlarged phone screens.

Consider:

-   Multi-column grids
-   Better whitespace
-   Persistent navigation where appropriate
-   Larger preview areas
-   Multi-pane layouts where useful
-   Efficient use of horizontal space

Avoid excessive empty space.

------------------------------------------------------------------------

# 24. Desktop Web

The web application must be a proper product experience.

It should not feel like:

> "The mobile app stretched into a browser."

Desktop can use:

-   Larger grids
-   Hover interactions
-   Keyboard navigation
-   Larger preview surfaces
-   Side panels
-   Persistent navigation where useful
-   Browser history
-   URL navigation
-   Deep links
-   Sharing

Web should be equally capable while respecting web-specific interaction
patterns.

------------------------------------------------------------------------

# 25. Accessibility

Accessibility is a production requirement.

Consider:

-   Screen readers
-   Semantic labels
-   Color contrast
-   Touch target sizes
-   Keyboard navigation on web
-   Focus management
-   Reduced motion
-   Dynamic text scaling
-   Accessible loading states
-   Accessible errors
-   Meaningful image descriptions

Accessibility must not be treated as a last-minute checklist.

------------------------------------------------------------------------

# 26. Performance

Performance is a product feature.

Pay special attention to:

-   Startup time
-   Time to first useful content
-   Image loading
-   Image caching
-   Memory usage
-   Large image rendering
-   Scroll performance
-   Navigation transitions
-   Web bundle size
-   Low-end Android devices
-   Slow networks

Do not load full-resolution images into small cards.

Use thumbnails, previews, lazy loading, caching, and CDN delivery
appropriately.

------------------------------------------------------------------------

# 27. Offline & Poor Network Behaviour

The application should degrade gracefully.

Potential offline functionality:

-   Recently cached wallpapers
-   Cached thumbnails
-   Previously downloaded wallpapers
-   Local favorites where appropriate
-   Useful offline state
-   Retry mechanisms

One failed API request should not make the entire application unusable.

------------------------------------------------------------------------

# 28. Error Handling

Every async operation must have intentional states.

At minimum consider:

-   Loading
-   Success
-   Empty
-   Offline
-   Timeout
-   Unauthorized
-   Forbidden
-   Not found
-   Server error
-   Retry

Avoid indefinite spinners.

Avoid generic messages where a useful explanation is possible.

------------------------------------------------------------------------

# 29. Navigation

Navigation should be:

-   Predictable
-   Minimal
-   Fast
-   Accessible
-   Consistent

Potential primary destinations:

-   Home
-   Explore
-   Favorites
-   Collections
-   Profile / Settings

The final navigation architecture must be decided during UX
architecture.

Do not add tabs just to fill space.

------------------------------------------------------------------------

# 30. Search

Search should eventually understand more than exact wallpaper titles.

Potential search dimensions:

-   Mood
-   Color
-   Style
-   Category
-   Theme
-   Creator
-   Orientation
-   Device suitability
-   Visual concepts

Example searches:

``` text
dark mountain
minimal beige
blue abstract
quiet city
retro car
amoled black
warm sunset
```

Search quality should be treated as a core product capability.

------------------------------------------------------------------------

# 31. Collections

Collections should feel editorial.

Examples:

-   Quiet Mornings
-   After Midnight
-   Earth Tones
-   Monochrome
-   Retro Future
-   Weekend
-   Architecture
-   Minimal
-   Deep Space

Avoid hundreds of meaningless categories.

A collection should have a reason to exist.

------------------------------------------------------------------------

# 32. Daily Content

A potential recurring feature:

> **Wallpaper of the Day**

or:

> **Daily Drop**

The exact naming is not final.

If implemented, it should feel like a pleasant reason to return rather
than an engagement trick.

Potential characteristics:

-   One highly curated wallpaper
-   Daily editorial selection
-   Optional notification
-   Free or premium status

Do not copy another product's branding or exact mechanics.

------------------------------------------------------------------------

# 33. Future: Complete the Setup

A long-term differentiator could extend ASPEKT beyond a single
wallpaper.

Potential setup experience:

-   Wallpaper
-   Lock-screen composition
-   Home-screen composition
-   Widget styling
-   Icon style
-   Matching color palette

This is future scope.

Do not let it delay V1.

------------------------------------------------------------------------

# 34. Future: Creator Ecosystem

Future versions may support:

-   Creator profiles
-   Creator uploads
-   Verification
-   Licensing
-   Revenue sharing
-   Creator analytics
-   Collections
-   Follows

This requires serious:

-   Legal work
-   Moderation
-   Copyright handling
-   Storage
-   Payments
-   Content review

Do not implement casually.

------------------------------------------------------------------------

# 35. Security

Security is required from the beginning.

Consider:

-   Authentication security
-   API authorization
-   Rate limiting
-   Secure token storage
-   Purchase verification
-   Server-side entitlement checks
-   Input validation
-   File validation
-   Abuse prevention
-   Admin authorization
-   Secret management
-   Safe logging

Never commit:

-   API secrets
-   Private keys
-   Production credentials
-   Database credentials
-   Payment secrets

------------------------------------------------------------------------

# 36. Analytics

Analytics should answer meaningful product questions.

Examples:

-   Which wallpapers are viewed?
-   Which wallpapers are downloaded?
-   Which moods are popular?
-   Which searches fail?
-   Which previews lead to downloads?
-   Which screen sizes have poor fit?
-   Which content converts to premium?
-   How often do users return?

Do not collect data merely because it is available.

Analytics must respect privacy and applicable platform requirements.

------------------------------------------------------------------------

# 37. Notifications

Notifications should be useful.

Potential notifications:

-   Daily wallpaper
-   New collection
-   Download completion where relevant
-   Important account information

Avoid:

-   Spam
-   Fake urgency
-   Engagement bait
-   Repeated promotional messages

Notification preferences should be controllable.

------------------------------------------------------------------------

# 38. Design System

Before building large amounts of UI, establish a design system.

Define:

-   Colors
-   Typography
-   Spacing
-   Border radius
-   Shadows/elevation
-   Icons
-   Buttons
-   Cards
-   Bottom sheets
-   Modals
-   Inputs
-   Chips
-   Tabs
-   Navigation
-   Skeletons
-   Empty states
-   Error states

Use design tokens rather than scattering hardcoded values throughout the
codebase.

Conceptual example:

``` text
color.background
color.surface
color.text.primary
color.text.secondary
color.accent

spacing.xs
spacing.sm
spacing.md
spacing.lg
spacing.xl

radius.sm
radius.md
radius.lg
```

Exact values must be decided during visual design.

------------------------------------------------------------------------

# 39. Theme Decision

ASPEKT may eventually support:

-   Light
-   Dark
-   System

The final theme must be decided during the visual design stage.

### IMPORTANT

The coding agent must ask the product owner before finalizing:

-   Overall theme
-   Light/dark direction
-   Color palette
-   Contrast level
-   Visual mood
-   Brand prominence
-   Background treatment

The agent may propose options but must not silently make the final
decision.

------------------------------------------------------------------------

# 40. State Management

Separate different types of state.

### Server State

Examples:

-   Wallpapers
-   Collections
-   User data
-   Purchases
-   Entitlements

### UI State

Examples:

-   Filters
-   Modals
-   Navigation state
-   Temporary selections

### Persistent Local State

Examples:

-   Theme preference
-   Settings
-   Cached preferences
-   Recently viewed data

Do not place every state value into one global store.

------------------------------------------------------------------------

# 41. API Architecture

Avoid raw network calls scattered across UI components.

Prefer a structure conceptually similar to:

``` text
UI
 ↓
Feature / Hook
 ↓
Service / Query Layer
 ↓
API Client
 ↓
Backend
```

The final implementation may differ, but separation of concerns is
required.

------------------------------------------------------------------------

# 42. Environment Management

Support at least:

-   Development
-   Staging
-   Production

Do not hardcode production URLs or credentials.

Provide:

``` text
.env.example
```

Document:

-   Required variables
-   Optional variables
-   Client-safe variables
-   Server-only secrets
-   Where each value comes from

------------------------------------------------------------------------

# 43. Testing Strategy

Testing must happen continuously.

Do not wait until the end.

## Unit Tests

Test:

-   Utilities
-   Business logic
-   Coin calculations
-   Pricing
-   Validation
-   Device-fit calculations
-   Formatting

## Component Tests

Test:

-   Wallpaper cards
-   Preview
-   Search
-   Filters
-   Buttons
-   Forms
-   Error states

## Integration Tests

Test:

-   API flows
-   Authentication
-   Favorites
-   Downloads
-   Purchases
-   Entitlements

## End-to-End Tests

Critical journey:

``` text
Launch
→ Browse
→ Open wallpaper
→ Preview
→ Favorite
→ Download
```

Premium journey:

``` text
Launch
→ Browse premium wallpaper
→ Earn/buy coins
→ Unlock wallpaper
→ Download
```

------------------------------------------------------------------------

# 44. Device Testing Matrix

Do not test only one development device.

At minimum consider:

### Compact Phones

-   Small Android
-   Small iPhone

### Standard Phones

-   Common Android
-   Common iPhone

### Large Phones

-   Large Android
-   Large iPhone

### Foldables

-   Folded
-   Unfolded
-   Portrait
-   Landscape

### Tablets

-   Android tablet
-   iPad

### Desktop

-   Small laptop
-   Large desktop
-   Wide monitor

### Window Conditions

-   Fullscreen
-   Half-screen
-   Narrow browser
-   Wide browser
-   Resized window

------------------------------------------------------------------------

# 45. Orientation Testing

Every major screen must be considered in:

-   Portrait
-   Landscape

Particular attention:

-   Wallpaper preview
-   Fullscreen viewer
-   Navigation
-   Grids
-   Modals
-   Bottom sheets
-   Image cropping

Never assume portrait-only behaviour unless there is a deliberate
product reason.

------------------------------------------------------------------------

# 46. Extreme Aspect Ratios

Explicitly test:

-   Very narrow screens
-   Very wide screens
-   Very tall screens
-   Short screens
-   Folded states
-   Unfolded states
-   Split-screen
-   Small browser windows
-   Very large browser windows

Critical content must remain accessible.

------------------------------------------------------------------------

# 47. Loading States

Every asynchronous experience must have an intentional loading state.

Prefer:

-   Skeletons
-   Progressive image loading
-   Cached content
-   Meaningful placeholders

Avoid blank screens where practical.

------------------------------------------------------------------------

# 48. Empty States

Every list/collection should have an intentional empty state.

Examples:

### Favorites

> "Your favorites will live here."

### Search

> "No wallpapers matched that."

### Downloads

> "Nothing downloaded yet."

Empty states should feel like part of the ASPEKT design system.

------------------------------------------------------------------------

# 49. Image Handling

Images are the heart of ASPEKT.

Image handling is therefore a core engineering concern.

Consider:

-   Thumbnail dimensions
-   Preview dimensions
-   Full-resolution delivery
-   Progressive loading
-   Caching
-   Memory usage
-   CDN
-   Compression
-   Image format
-   Device pixel ratio
-   Orientation
-   Aspect ratio
-   Crop strategy

Never load an enormous image when a smaller variant is sufficient.

------------------------------------------------------------------------

# 50. Wallpaper Fit Engine

A future core module should calculate how a wallpaper behaves against a
target viewport.

Conceptual inputs:

``` text
wallpaperWidth
wallpaperHeight
viewportWidth
viewportHeight
orientation
fitMode
safeArea
```

Potential outputs:

``` text
scale
crop
offset
visibleRegion
fitQuality
```

This logic should be:

-   Pure
-   Deterministic
-   Independently testable
-   Separate from visual components

------------------------------------------------------------------------

# 51. Download Experience

Downloads must clearly communicate:

-   Starting
-   Downloading
-   Completed
-   Failed
-   Permission issue
-   Storage issue
-   Network interruption

Never silently fail.

------------------------------------------------------------------------

# 52. Sharing

Potential sharing:

-   Share wallpaper
-   Share ASPEKT wallpaper link
-   Share collection
-   Deep link to wallpaper

Shared links should open the relevant wallpaper page where supported.

------------------------------------------------------------------------

# 53. Deep Linking

The architecture should support public links conceptually similar to:

``` text
/wallpaper/<id>
/collection/<id>
/search/<query>
```

Exact URL structure will be decided during architecture.

Deep links should be considered across:

-   Web
-   Android
-   iOS

------------------------------------------------------------------------

# 54. SEO

Public web content should be SEO-friendly.

Potential indexed pages:

-   Wallpaper pages
-   Collections
-   Categories
-   Future creator pages

Consider:

-   Page title
-   Meta description
-   Canonical URL
-   Open Graph image
-   Structured data where useful

Do not sacrifice application performance merely for SEO.

------------------------------------------------------------------------

# 55. Admin / Content Management

A production wallpaper platform needs content-management capability.

Potential admin functionality:

-   Upload wallpaper
-   Edit metadata
-   Set category
-   Set moods
-   Set tags
-   Set price
-   Feature wallpaper
-   Publish/unpublish
-   Schedule daily wallpaper
-   Manage collections
-   Manage creators
-   Review content
-   View reports

The admin system may be separate or part of the same web application
depending on architecture.

------------------------------------------------------------------------

# 56. Moderation

If user-generated content is introduced later, moderation becomes
mandatory.

Potential systems:

-   Content review
-   Copyright complaints
-   Report handling
-   Abuse prevention
-   NSFW filtering
-   Duplicate detection
-   Metadata validation

Do not add public uploads without a moderation plan.

------------------------------------------------------------------------

# 57. Privacy

Collect only what is necessary.

Eventually document:

-   Data collected
-   Why it is collected
-   Retention
-   Account deletion
-   Analytics
-   Advertising
-   Purchase data
-   Device information

The final product must include appropriate privacy disclosures for its
distribution regions.

------------------------------------------------------------------------

# 58. Store Readiness

Before launch, validate current official requirements for:

-   Apple App Store
-   Google Play
-   Privacy
-   Payments
-   Account deletion
-   Data safety
-   App metadata
-   Screenshots
-   App icons
-   Age rating
-   Content declarations
-   Permissions
-   Advertising

Store policies can change.

Always verify current requirements before submission.

------------------------------------------------------------------------

# 59. Permissions

Request permissions only when needed.

Potential permissions:

-   Photos/media access
-   Notifications

Do not ask for permissions simply because they are available.

Explain permissions when appropriate.

------------------------------------------------------------------------

# 60. Security & Secrets Checklist

Before production builds:

-   No secrets committed
-   No debug credentials
-   No staging URLs
-   No test payment configuration
-   No sensitive logs
-   Correct production environment
-   Correct API configuration

------------------------------------------------------------------------

# 61. Logging

Logging must be useful and safe.

Never log unnecessarily:

-   Passwords
-   Authentication tokens
-   Payment credentials
-   Sensitive personal data
-   Private identifiers

Use appropriate log levels.

------------------------------------------------------------------------

# 62. Dependency Rules

Before adding a dependency, ask:

1.  Do we actually need it?
2.  Is it maintained?
3.  Is it compatible with Expo?
4.  Does it work on iOS?
5.  Does it work on Android?
6.  Does it work on web if required?
7.  What is the bundle-size impact?
8.  Does it require native configuration?
9.  Is there a simpler alternative?
10. Is the license acceptable?

Do not add a dependency for trivial functionality.

------------------------------------------------------------------------

# 63. Documentation

Maintain useful documentation.

Potential structure:

``` text
docs/
├── architecture.md
├── product.md
├── design-system.md
├── branding.md
├── api.md
├── database.md
├── testing.md
├── deployment.md
├── monetization.md
└── decisions/
```

The structure can evolve.

------------------------------------------------------------------------

# 64. Decision Log

Important technical/product decisions should be recorded.

Use a format such as:

``` text
Decision:
Date:
Problem:
Options considered:
Chosen solution:
Why:
Trade-offs:
Reconsider if:
```

Do not repeatedly reopen decisions without a concrete reason.

------------------------------------------------------------------------

# 65. Development Method

ASPEKT must be developed **phase by phase**.

Do not attempt to build the entire application at once.

The AI coding agent must:

1.  Read this README completely.
2.  Understand the product.
3.  Identify assumptions.
4.  Separate fixed requirements from ideas.
5.  Propose a development plan.
6.  Confirm the current phase.
7.  Work only on the approved phase.
8.  Test the phase.
9.  Report what changed.
10. Report known risks.
11. Stop before beginning another major phase unless explicitly
    instructed.

------------------------------------------------------------------------

# 66. Important AI Agent Behaviour

This README contains a mixture of:

-   Requirements
-   Product direction
-   Constraints
-   Ideas
-   Future possibilities

The agent must not assume every idea is approved for implementation.

### When uncertain:

**ASK FIRST.**

Do not silently invent major product behaviour.

Do not silently add features.

Do not silently change the architecture.

Do not silently finalize branding.

Do not silently introduce monetization.

Do not silently introduce authentication gates.

Major product decisions require product-owner confirmation.

------------------------------------------------------------------------

# 67. Development Phases

## Phase 0 --- Product Understanding

Tasks:

-   Read README
-   Understand product
-   Identify ambiguities
-   Separate V1 from future scope
-   Identify technical risks
-   Identify product risks
-   Propose implementation roadmap

Output:

-   Development plan
-   Open questions
-   Recommended next step

Do not start major implementation.

------------------------------------------------------------------------

## Phase 1 --- Project Foundation

Tasks:

-   Initialize Expo project
-   Configure TypeScript
-   Initialize Git
-   Establish folder structure
-   Configure linting
-   Configure formatting
-   Configure testing
-   Establish environment configuration
-   Create development scripts
-   Align README/documentation

Verify:

-   Android
-   iOS
-   Web

All three must be considered during foundation.

------------------------------------------------------------------------

## Phase 2 --- Product & UX Architecture

Define:

-   Information architecture
-   Navigation
-   Main screens
-   User journeys
-   Wallpaper discovery
-   Wallpaper details
-   Preview experience
-   Favorites
-   Collections
-   Search
-   Settings
-   Account entry points

Deliver:

-   Screen inventory
-   User flows
-   Navigation architecture
-   UX decisions
-   Open questions

Do not rush into polished UI.

------------------------------------------------------------------------

## Phase 3 --- Branding & Visual Identity

### MANDATORY USER CHECKPOINT

Before finalizing branding, stop and ask the user for:

-   Theme
-   Colors
-   Typography
-   Logo direction
-   App icon direction
-   Favicon direction
-   Light/dark preference
-   Visual references
-   Things to avoid

Then create:

-   Design tokens
-   Brand system
-   Logo
-   App icon
-   Favicon
-   Splash/launch direction
-   Typography system

This is a deliberate decision gate.

------------------------------------------------------------------------

## Phase 4 --- UI Foundation

Implement:

-   Theme
-   Design tokens
-   Typography
-   Reusable components
-   Navigation shell
-   Responsive layout primitives
-   Loading states
-   Empty states
-   Error states

Test across screen categories.

------------------------------------------------------------------------

## Phase 5 --- Core Wallpaper Experience

Implement:

-   Home
-   Explore
-   Categories
-   Search foundation
-   Wallpaper grid
-   Wallpaper details
-   Preview
-   Favorites
-   Collections
-   Downloads foundation
-   Sharing foundation

Prioritize:

-   Visual quality
-   Performance
-   Responsiveness
-   Accessibility

------------------------------------------------------------------------

## Phase 6 --- Device-Aware Experience

Implement:

-   Viewport detection
-   Aspect-ratio handling
-   Orientation
-   Fit calculations
-   Crop preview
-   Device-aware recommendations
-   Foldable handling
-   Tablet layouts
-   Desktop layouts

This phase is central to the ASPEKT identity.

------------------------------------------------------------------------

## Phase 7 --- Backend & Content Platform

Implement:

-   API
-   Database
-   Wallpaper catalog
-   Object storage
-   CDN
-   Metadata
-   Collections
-   Categories
-   Search infrastructure
-   Admin/content tools

------------------------------------------------------------------------

## Phase 8 --- Accounts

Implement:

-   Authentication
-   Google Sign-In
-   Apple Sign-In if required
-   User profile
-   Sync
-   Session handling
-   Account deletion

Do not introduce mandatory login without explicit approval.

------------------------------------------------------------------------

## Phase 9 --- Coins & Entitlements

Implement:

-   Coin balance
-   Free content
-   Premium content
-   Unlock logic
-   Entitlements
-   Transaction records
-   Reward system
-   Server-side verification

All calculations must be thoroughly tested.

------------------------------------------------------------------------

## Phase 10 --- Advertising

Implement carefully:

-   Rewarded ads
-   Coin rewards
-   Ad failure handling
-   Duplicate callback protection
-   Reward verification
-   No-ad-available state

Do not allow ads to degrade the core browsing experience.

------------------------------------------------------------------------

## Phase 11 --- Payments

Implement:

-   iOS billing
-   Android billing
-   Coin packs
-   Purchase verification
-   Restore purchases
-   Entitlements
-   Failed purchases
-   Pending purchases
-   Refund handling

Verify current platform policies before implementation.

------------------------------------------------------------------------

## Phase 12 --- Production Hardening

Test:

-   Crash scenarios
-   Offline
-   Slow networks
-   Large images
-   Memory pressure
-   Navigation edge cases
-   Authentication edge cases
-   Purchase edge cases
-   Accessibility
-   Security
-   Performance
-   Responsive behaviour

------------------------------------------------------------------------

## Phase 13 --- Store & Web Launch

Prepare:

-   App Store
-   Google Play
-   Web deployment
-   Domain
-   Favicon
-   App icons
-   Screenshots
-   Store descriptions
-   Privacy policy
-   Terms
-   Support page
-   Contact
-   SEO
-   Analytics
-   Monitoring

Perform final release-candidate testing.

------------------------------------------------------------------------

# 68. Definition of Done

A feature is not complete because it works once.

A feature is complete only when:

-   It works on supported platforms
-   Loading is handled
-   Errors are handled
-   Empty states are handled
-   Offline behaviour is considered
-   Accessibility is considered
-   Responsive behaviour works
-   Tests exist where appropriate
-   No obvious runtime errors remain
-   No obvious console errors remain
-   It follows the design system
-   Performance is acceptable
-   Existing functionality is not broken

------------------------------------------------------------------------

# 69. Production Quality Bar

The target is not:

> "It works on my phone."

The target is:

> **"It feels like a real product."**

Before declaring a feature finished, ask:

### UX

-   Is the interaction obvious?
-   Is there unnecessary friction?
-   Does it feel intentional?

### Visual

-   Does it look polished?
-   Is spacing consistent?
-   Is typography consistent?
-   Does it feel like ASPEKT?

### Responsive

-   What happens on a small phone?
-   What happens on a large phone?
-   What happens on a Fold?
-   What happens on a tablet?
-   What happens in landscape?
-   What happens in split-screen?
-   What happens on desktop?

### Performance

-   Does it load quickly?
-   Are images optimized?
-   Is scrolling smooth?
-   Are memory-heavy operations controlled?

### Reliability

-   What happens if the network disappears?
-   What happens if an API fails?
-   What happens if the user retries?
-   What happens if an operation happens twice?

### Accessibility

-   Can keyboard users operate it?
-   Can screen readers understand it?
-   Are touch targets appropriate?
-   Does text scale correctly?

------------------------------------------------------------------------

# 70. No-Hurry Rule

This project is intentionally being built carefully.

Do not sacrifice:

-   Architecture
-   UX
-   Visual quality
-   Testing
-   Accessibility
-   Performance
-   Security
-   Store compliance
-   Responsive support

for speed.

If a feature needs more design work, do the design work.

If a decision has long-term consequences, discuss it before
implementation.

------------------------------------------------------------------------

# 71. Product Decision Gates

The following decisions require explicit product-owner approval if they
have not already been decided.

## Brand

-   Logo
-   Colors
-   Typography
-   Theme
-   Favicon
-   App icon

## Product

-   Final navigation
-   Final V1 scope
-   Daily wallpaper mechanics
-   Coin economy
-   Wallpaper pricing
-   Advertising placement
-   Authentication timing
-   Premium model

## Technical

-   Backend
-   Database
-   Storage
-   CDN
-   Analytics
-   Authentication provider
-   Payment architecture

The agent should present options and trade-offs instead of silently
making major decisions.

------------------------------------------------------------------------

# 72. Current Project Status

``` text
Project: ASPEKT

Status: Pre-development / Product Definition

Current Phase: Phase 0 — Product Understanding

Brand Name: ASPEKT

Logo: Not finalized
App Icon: Not finalized
Favicon: Not finalized
Theme: Not finalized
Color Palette: Not finalized
Typography: Not finalized

Backend: Not finalized
Database: Not finalized
Storage/CDN: Not finalized

Authentication: Planned, implementation later
Payments: Planned, implementation later
Advertising: Planned, implementation later

Creator Marketplace: Future consideration

Primary Development Direction:
React Native + Expo + TypeScript

Target Platforms:
Android + iOS + Web
```

------------------------------------------------------------------------

# 73. First Instruction to the AI Coding Agent

When the AI coding agent is first started inside this repository, it
must:

1.  Read `README.md` completely.
2.  Treat this README as the initial product source of truth.
3.  Summarize its understanding of ASPEKT.
4.  Identify assumptions.
5.  Separate:
    -   Must-have V1 requirements
    -   Future ideas
    -   Open product decisions
6.  Propose a phase-by-phase development plan.
7.  Identify technical risks.
8.  Identify product risks.
9.  Identify decisions requiring user input.
10. Recommend the immediate next step.
11. **Do not begin major implementation until the user approves the
    initial plan.**

The agent should not immediately generate a large amount of code just
because the README exists.

------------------------------------------------------------------------

# 74. Final Product Principle

When making a decision, prefer the option that makes ASPEKT:

**Simpler.\
Faster.\
More beautiful.\
More adaptive.\
More reliable.\
More useful.\
More intentional.**

ASPEKT is not trying to have the most wallpapers.

ASPEKT is trying to have the wallpapers that **feel right**.

> **The wallpaper should adapt to the screen, not the other way
> around.**
