# Animation System

Animation on the Lider site is there to support the story, not to decorate every section.

The main visual idea is a **cyan signal** (`#1092bf`) moving through the product and engineering journey.

```text
Idea → Architecture → Build → Deploy → Client → Business Impact
```

## Tools

The site uses:

- GSAP
- ScrollTrigger
- MotionPathPlugin
- `@gsap/react`
- CSS `sticky` for long story sections

`useGSAP()` handles React-safe setup and cleanup, while `gsap.matchMedia()` keeps mobile, tablet, desktop, and reduced-motion behavior separate.

## Motion Style

### Small interactions

Buttons, icons, status indicators, and hover states should stay quick and subtle.

Typical range: **150–300ms**.

### Section reveals

Headings, cards, logos, and images usually enters with a small vertical movement, scale, or opacity transition.

Typical range: **400–800ms**.

### Scroll stories

The larger animated sections use ScrollTrigger to connect progress to scrolling. Layout is handled by CSS wherever possible so animation does not distort the page.

For long stories we prefer:

```text
CSS sticky
    +
ScrollTrigger progress
```

over GSAP pinning when pin spacing would stretch the section.

## Home

### Hero

- responsive GSAP entrance
- heading, image, and supporting content reveal
- cyan signal animation
- separate mobile/tablet/desktop timings
- reduced-motion fallback

### Who We Are

Desktop uses a controlled section story.

Mobile and tablet use independent card triggers so each card reveals reliably on tall screens and stays visible once shown.

### Product Story

Products:

1. UI/UX Design
2. Web App Development
3. Mobile App Development
4. IT Consultancy

#### Desktop / tablet

The section uses a tall scroll track with a CSS sticky stage.

GSAP controls:

- active product
- active timeline item
- image changes
- signal movement
- final IT Consultancy hold

The section does not release until the final image has had enough time on screen.

#### Mobile

Products stay in normal document flow.

The mobile timeline includes:

- cyan progress rail
- travelling signal dot
- product bullets
- synchronized bullet activation
- product copy and image reveal
- full-width product images

When lazy-loaded image height changes the timeline geometry, ScrollTrigger is refreshed.

### Process

Stages:

```text
Concept → Build → Launch
```

#### Desktop

The heading stays in normal flow while only the card viewport becomes sticky.

Each stage gets:

- subtle active-card lift
- cyan border/shadow
- number pulse
- staged content reveal
- arrow movement
- `LIVE` animation on Launch

Launch receives a final hold before the next section appears.

#### Mobile / tablet

Cards stay in normal flow and use their own ScrollTriggers.

Animations are shorter, movement is smaller, and the cards remain visible after reveal.

### Trusted Clients

Desktop uses a controlled stagger.

Mobile and tablet use individual card triggers so logos reveal reliably on smaller screens.

### Metrics

Counters do not use ScrollTrigger for the number animation.

```text
IntersectionObserver
        ↓
requestAnimationFrame
        ↓
final number
```

GSAP is only used for the visual entrance.

### CTA

The CTA reveals once, then the closing cyan signal travels into the terminal.

## Other Pages

### About

Motion stays light across the Hero, Capabilities, Engineering Principles, Trusted Ecosystem, and Careers CTA.

### Services

Service cards and approach sections use restrained reveals. Development Process carries more of the storytelling. Metrics use the same reliable counter pattern.

### Clients

Metrics count once. Project cards, testimonials, and trusted businesses use simple reveal motion.

### Contact

Contact is intentionally the calmest page. Important details should never depend on a long animation.

The FAQ uses interaction-based accordion animation rather than scroll animation.

## Rules

- Prefer transform and opacity.
- Keep text readable while moving.
- Do not hide essential content for long periods.
- Keep mobile motion simpler and shorter.
- Use `useGSAP()` for section animation.
- Use `gsap.matchMedia()` for responsive behavior.
- Scope selectors to the section.
- Clean up observers, RAF callbacks, event listeners, and ScrollTriggers.
- Respect `prefers-reduced-motion`.
- Refresh ScrollTrigger when lazy-loaded content changes measured layout.
- Use reversible scrub timelines for real scroll stories.
- Use `once: true` for simple reveals that should stay visible.
