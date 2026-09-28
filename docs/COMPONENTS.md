# Components

This file documents the shared components and recurring UI patterns in the Lider frontend.

Not every repeated section needs to become a global component. If a section has unique layout or animation geometry, it can stay local to its page.

## Navbar

Shared across all pages.

Handles:

- desktop and mobile navigation
- active route styling
- sticky/scrolled state
- Work With Us link
- closing the mobile menu after navigation
- Escape key handling
- returning focus to the menu button
- switching cleanly back to desktop navigation

## Footer

Shared site footer.

Contains:

- company links
- service links
- contact details
- map link
- current year

Privacy and Terms still need final destinations.

## ScrollToHash

Handles route scroll behavior.

Used for:

```text
/about#principles
/about#careers
```

It resets normal route changes to the top and scrolls hash routes to their target section.

## Signal Pattern

The current site uses a cyan signal as a recurring visual motif.

A signal can include:

- SVG path
- moving dot
- glow/filter
- GSAP refs
- MotionPath animation
- progress animation
- reduced-motion fallback

Signals are often defined locally because each section has different path geometry.

## Metrics / Counters

Used across Home, Services, Clients, and Contact.

Counter behavior:

```text
IntersectionObserver
        ↓
requestAnimationFrame
        ↓
final value
```

GSAP handles the visual reveal, not the actual count.

Counters should run once, land exactly on the final value, and clean up pending RAF callbacks.

## Logo Grids

Used for client and ecosystem proof.

Guidelines:

- preserve logo proportions
- provide meaningful alt text
- keep motion restrained
- use per-card mobile triggers when needed
- keep the grid responsive

## CTA Sections

CTAs are page-specific but share the same general language:

- clear headline
- primary action
- optional secondary action
- strong focus states
- restrained entrance motion
- teal/cyan/navy styling

The Home CTA links to:

```text
/contact/sales
/contact
```

## FAQ Accordion

Used on Contact.

Requirements:

- real button controls
- keyboard access
- `aria-expanded`
- readable answer content
- interaction-driven animation

## Product Story

### Desktop / tablet

- CSS sticky story stage
- active product timeline
- changing product image
- cyan signal
- final IT Consultancy hold

### Mobile

- products stay in normal flow
- full-width images
- vertical rail
- travelling cyan signal
- bullet activation
- synchronized copy/image reveals
- ScrollTrigger refresh after lazy-loaded image sizing

## Process

### Desktop

- heading stays in normal flow
- only cards become sticky
- Concept → Build → Launch
- subtle active-card animation
- final Launch hold

### Mobile / tablet

- normal flow
- per-card reveal timelines
- smaller motion distances
- cards remain visible after reveal

## Contact Sales Form

Current fields:

- Full name
- Work email
- Company
- Company size
- Requirements

Current status: frontend UI only.

Next work:

- validation
- accessible error messages
- loading state
- API request
- success/error feedback
- spam protection

## Images

- load hero images eagerly when they affect first paint
- lazy-load below-the-fold images
- use `object-contain` when the full artwork must stay visible
- refresh ScrollTrigger when lazy-loaded image size changes affect measured animation geometry
