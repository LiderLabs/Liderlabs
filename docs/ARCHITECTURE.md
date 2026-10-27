# Architecture

The Lider frontend is kept intentionally simple: shared UI is reusable, page sections stay close to their pages, and animation logic lives beside the section it controls.

## Structure

```text
src/
├── assets/
│   └── images/
├── components/
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Services/
│   ├── Clients/
│   └── Contact/
├── lib/
│   └── gsap.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

Shared elements such as the Navbar and Footer belongs in `components/`. Unique storytelling sections stay page-local.

## App Entry

`main.jsx` mounts the app and provides the router:

```jsx
<StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</StrictMode>
```

## App Shell

```text
Navbar
  ↓
ScrollToHash
  ↓
Routes
  ↓
Footer
```

Route content uses a flex-growing wrapper so the Footer stays at the bottom of shorter pages.

## Routes

```text
/               Home
/about          About
/services       Services
/clients        Clients
/contact        Contact
/contact/sales  Contact Sales
```

Use `Link` for internal navigation and `NavLink` when active route styling matters.

## ScrollToHash

`ScrollToHash` handles route positioning:

- normal navigation → top of page
- hash navigation → scroll to the target section

Current hash links include:

```text
/about#principles
/about#careers
```

## Styling

The project uses Tailwind CSS v4 through `@tailwindcss/vite`.

Main tokens include:

```text
Primary       #176d8c
Primary Dark  #0f5874
Signal Cyan   #1092bf
Navy          #002d33
Ink           #0d162b
Surface       #f7f9fb
Border        #dce7ec
```

Prefer canonical Tailwind utilities when possible:

```text
h-11 w-11     → size-11
h-[2px]       → h-0.5
h-full w-full → size-full
```

Arbitrary values are fine when they are part of the actual design, such as custom radii, max widths, shadows, or SVG geometry.

## GSAP

Plugins are registered once in `src/lib/gsap.js`.

```js
gsap.registerPlugin(
  ScrollTrigger,
  MotionPathPlugin,
  useGSAP,
);
```

General rules:

- use `useGSAP()` for lifecycle-safe animation
- use `gsap.matchMedia()` for breakpoints
- keep selectors scoped
- do not create animation side effects during render
- clean custom observers and RAF callbacks
- support reduced motion

## Sticky Story Sections

Long stories such as Product Story and Process separate layout from animation.

```text
CSS sticky
    +
normal page scroll
    +
ScrollTrigger
```

This avoids the layout stretching we saw with GSAP pin spacing.

## Responsive Strategy

### Desktop

Full storytelling, sticky stages, scrubbed progress, richer transitions.

### Tablet

Keep the story but reduce movement and spacing where needed.

### Mobile

Default to normal flow, use late per-item triggers, keep revealed content visible, and avoid desktop-sized assumptions.

## Counters

Metrics use:

```text
IntersectionObserver
        ↓
requestAnimationFrame
        ↓
number update
```

GSAP handles the entrance only.

This keeps counters reliable on short sections and tall mobile screens.

## State

No global state library is needed right now.

Local component state is enough for:

- mobile navigation
- FAQ
- form UI
- temporary feedback

## Form Architecture

The Contact Sales form is frontend-only at the moment.

Planned flow:

```text
React form
   ↓
client validation
   ↓
API
   ↓
server validation
   ↓
email / CRM
   ↓
success or error
```

Private API keys and mail credentials must stay server-side.

## Accessibility

Keep semantic HTML, keyboard navigation, visible focus states, alt text, accessible accordions, reduced motion, and usable tap targets throughout the site.
