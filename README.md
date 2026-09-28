# Lider Technologies Website

A responsive corporate website for **Lider Technologies**, built to show how the company turns ideas into working software, digital products, infrastructure, and business outcomes.

The site follows a simple storytelling flow:

**Idea → Architecture → Build → Deploy → Client → Business Impact**

## Tech Stack

- React + Vite
- JavaScript
- React Router
- Tailwind CSS v4
- GSAP + ScrollTrigger + MotionPathPlugin
- Git + GitHub
- Vercel

## Brand

The current visual system is built around teal, cyan, deep navy, white, and light blue-gray surfaces.

```text
Primary        #176d8c
Primary Dark   #0f5874
Navy           #002d33
Signal Cyan    #1092bf
Ink            #0d162b
Surface        #f7f9fb
```

The cyan signal is used throughout the site as a visual thread connecting the different stages of Lider's engineering process.

## Pages

```text
/               Home
/about          About
/services       Services
/clients        Clients
/contact        Contact
/contact/sales  Contact Sales
```

### Home
Hero, Who We Are, Product Story, Process, Trusted Clients, Metrics, and Work With Us CTA.

### About
Hero, Capabilities, Engineering Principles, Trusted Ecosystem, and Careers CTA.

### Services
Hero, Enterprise Systems, Our Approach, Development Process, Services Proof, and CTA.

### Clients
Hero, Metrics, Proven Systems, Testimonials, Trusted Businesses, and CTA.

### Contact
Contact overview, response details, Lider Labs Center/map, and FAQ.

### Contact Sales
Sales form and enterprise contact information.

> The Contact Sales interface is built, but the form backend is not connected yet.

## Animation

GSAP is the main animation engine.

The site uses:

- `useGSAP()` for React-safe animation setup
- `gsap.matchMedia()` for responsive behavior
- ScrollTrigger for scroll-driven sections
- MotionPathPlugin for moving signal paths
- CSS `sticky` for longer story sections where it gives better layout control than GSAP pinning

Some sections use different mobile behavior so the experience stays readable and reliable on smaller screens.

Examples:

- **Product Story:** sticky scroll story on tablet/desktop, normal-flow products with a travelling cyan signal on mobile
- **Process:** sticky card story on desktop, individual card reveals on mobile/tablet
- **Metrics:** `IntersectionObserver` + `requestAnimationFrame` for number counting, with GSAP used for the visual entrance

More detail is in (./docs/ANIMATIONS.md).

## Project Structure

```text
src/
├── assets/
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

Shared UI lives in `components/`, while page-specific sections stay close to the page that owns them.

## Getting Started

```bash
git clone <repository-url>
cd lidertechnologies
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Development Notes

- Use `Link` and `NavLink` for internal navigation.
- Keep animation logic scoped to the section it controls.
- Prefer Tailwind v4 canonical utilities where possible.
- Keep important content readable without animation.
- Respect `prefers-reduced-motion`.
- Avoid motion that makes scrolling difficult.
- Follow the approved design/reference before introducing new styling.

## Contact Sales Form

Current fields:

- Full name
- Work email
- Company
- Company size
- Requirements

The frontend is ready, but submission is still pending backend integration.

Next steps:

1. client-side validation
2. accessible error messages
3. loading/submitting state
4. backend/API endpoint
5. server-side validation
6. email or CRM delivery
7. success/error feedback
8. spam and rate-limit protection

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Animations](./docs/ANIMATIONS.md)
- [Components](./docs/COMPONENTS.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Contributing](./docs/CONTRIBUTING.md)

## Project Status

The main frontend is built.

Still to do before final production release:

- Contact Sales backend
- final responsive QA
- accessibility review
- performance/image review
- content consistency check
- Privacy and Terms destinations
- metadata/SEO review
- optional 404 page
- final deployment testing
