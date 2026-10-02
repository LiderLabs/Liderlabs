# Lider Technologies Website

A responsive corporate website for **Lider Technologies**, built to show how the company turns ideas into software, digital products, infrastructure, and business outcomes.

**Idea → Architecture → Build → Deploy → Client → Business Impact**

---

## Project Status

- Frontend Development — **Complete**
- Backend / Form Integration — **Complete**
- Responsive Development — **Complete**
- Animation System — **Complete**
- Core Pages — **Complete**
- Deployment Flow — **Configured**

The project is in its final QA and production verification stage.

---

## Tech Stack

- React + Vite
- JavaScript
- React Router
- Tailwind CSS v4
- GSAP + ScrollTrigger + MotionPathPlugin
- `@gsap/react`
- Formspree
- Git + GitHub
- Vercel

---

## Brand

```text
Primary        #176d8c
Primary Dark   #0f5874
Primary Light  #e9f5f9
Navy           #002d33
Signal Cyan    #1092bf
Ink            #0d162b
Surface        #f7f9fb
```

The cyan signal is used throughout the site as a visual thread connecting Lider's engineering process.

---

## Routes

```text
/                Home
/about           About
/services        Services
/clients         Clients
/contact         Contact
/contact/sales   Contact Sales
```

---

## Pages

### Home
Hero, Who We Are, Proven Systems, Product Story, Process, Trusted Clients, Metrics, and CTA.

### About
Hero, Who We Are, Capabilities, Engineering Principles, Trusted Ecosystem, and Careers CTA.

### Services
Hero, End-to-End Enterprise Systems, Our Approach, Development Process, Services Proof, and CTA.

### Clients
Hero, Metrics, Proven Systems, Testimonials, Trusted Businesses, and CTA.

### Contact
Contact overview, contact details, sales/support options, response metrics, map, and FAQ.

### Contact Sales
Sales enquiry page with enterprise contact information and a fully integrated Formspree form.

---

## Animation

GSAP is the main animation engine.

The project uses:

- `useGSAP()` for React-safe animation setup
- `gsap.matchMedia()` for responsive animation behavior
- `ScrollTrigger` for scroll-driven sections
- `MotionPathPlugin` for animated signal paths
- CSS `sticky` for storytelling sections
- `IntersectionObserver` + `requestAnimationFrame` for counters
- `prefers-reduced-motion` support

Responsive behavior is adapted for mobile, tablet, and desktop.

Examples:

- Product Story uses sticky storytelling on larger screens and normal-flow content on mobile.
- Process uses sticky cards on desktop and individual reveals on smaller screens.
- Services CTA uses a moving client-logo carousel on small screens.

---

## Contact Sales Form

The Contact Sales form is integrated with **Formspree** using `@formspree/react`.

### Fields

- Full name
- Work email
- Company
- Company size
- Requirements

### Features

- Client-side validation
- Accessible error messages
- Loading/submitting state
- Success confirmation
- Error feedback
- Form reset
- Honeypot spam protection
- Automatic focus on the first invalid field
- Responsive layout

### Submission Flow

```text
User fills form
      ↓
Validation
      ↓
Formspree submission
      ↓
Success / Error feedback
```

The backend requirement for the current sales enquiry workflow is complete through Formspree.

---

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

---

## Development Guidelines

- Use `Link` and `NavLink` for internal navigation.
- Keep animation logic scoped to its section.
- Use Tailwind CSS v4 utilities consistently.
- Keep important content readable without animation.
- Respect reduced-motion preferences.
- Preserve the approved design before introducing new styling.

---

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

---

## Git Workflow

```bash
git pull
npm run dev

npm run build
git status
git add .
git commit -m "update: project changes"
git push
```

---

## Deployment

The project is deployed through **Vercel** and connected to GitHub.

```text
Local Development
      ↓
GitHub
      ↓
Vercel
      ↓
Production
```

---

## Final Release Checks

Development is complete. Remaining work is focused on release quality:

- Final responsive QA
- Accessibility review
- Performance and image review
- Content consistency check
- Privacy and Terms destinations
- Metadata and SEO review
- Final production build verification
- Final Vercel deployment testing

---

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Animations](./docs/ANIMATIONS.md)
- [Components](./docs/COMPONENTS.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Contributing](./docs/CONTRIBUTING.md)
