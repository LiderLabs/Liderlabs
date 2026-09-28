# Contributing

Keep changes focused, easy to review, and consistent with the current design and animation system.

## Start From an Updated Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/contact-form
```

Example branch names:

```text
feature/contact-form
fix/product-story-mobile-signal
fix/process-scroll-story
fix/mobile-navbar
docs/update-readme
```

## Commit Messages

Use clear messages that explain the change.

Good:

```text
feat: build contact sales form
fix: sync mobile product signal
fix: keep process cards inside sticky viewport
docs: update project documentation
```

Avoid:

```text
changes
stuff
update
final
```

## Pull Requests

Include:

- what changed
- why it changed
- screenshots/video for UI work
- breakpoints tested
- anything reviewers should pay attention to
- known follow-up work

## Frontend Rules

- follow the approved Figma/reference before adding new styling
- preserve approved copy
- reuse shared components where it makes sense
- keep unique storytelling sections local
- avoid unnecessary dependencies
- use semantic HTML
- use router links for internal navigation
- test desktop, tablet, and mobile
- never commit secrets

## Brand

Keep new work inside the current system:

```text
teal
cyan
deep navy
white
light blue-gray
```

Signal accent:

```text
#1092bf
```

## Tailwind CSS v4

Prefer standard utilities where possible.

```text
h-11 w-11     → size-11
h-[2px]       → h-0.5
h-full w-full → size-full
```

Use arbitrary values only when they are intentional parts of the design.

Prefer targeted transition properties over a generic `transition`.

## React

- keep components focused
- keep render logic pure
- use stable keys
- prefer local state
- clean up side effects
- do not manipulate the DOM during render

## GSAP

- use `useGSAP()`
- register plugins once
- use `gsap.matchMedia()` for responsive variants
- scope selectors
- prefer transform and opacity
- clean observers, RAF callbacks, and custom listeners
- support reduced motion
- refresh ScrollTrigger when lazy-loaded content changes measured layout

For long stories, prefer the current project pattern:

```text
CSS sticky + ScrollTrigger
```

Do not replace a working sticky story with GSAP pinning without full breakpoint testing.

## Mobile Animation

Mobile needs its own QA.

For simple reveals:

- trigger late enough to actually be visible
- keep movement small
- use `once: true` when content should stay visible

For scroll stories:

- keep signal, progress rail, and item activation synchronized
- refresh measurements after lazy-loaded content changes height

## QA Sizes

At minimum test:

```text
320
375
390
430
768
1024
1280+
```

Check overflow, wrapping, image behavior, sticky sections, tap targets, focus states, forms, map, accordions, and orientation changes.

## Content

Do not silently rewrite approved content.

Flag questionable copy separately from engineering fixes.

## Form Work

When the Contact Sales backend is added:

- keep secrets server-side
- validate on client and server
- add submitting/success/error states
- prevent duplicate submissions
- add spam/rate-limit protection where appropriate

## Before Committing

```bash
npm run build
git status
git diff
```

Run the project's lint command too if one exists.

Do not commit `node_modules`, `dist`, `.env` secrets, temporary recordings, or unrelated experiment files.
