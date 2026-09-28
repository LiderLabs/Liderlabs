# Deployment

The Lider frontend is deployed through GitHub and Vercel.

```text
Local work
   ↓
Build
   ↓
Git commit
   ↓
GitHub
   ↓
Vercel
   ↓
Production
```

## Setup

```bash
npm install
npm run dev
```

Before pushing:

```bash
npm run build
npm run preview
```

`npm run preview` is only for checking the production build locally.

## Git

Useful commands:

```bash
git status
git branch --show-current
git remote -v
git pull origin main
git add .
git commit -m "feat: describe the change"
git push
```

First push with no upstream:

```bash
git push -u origin main
```

## First Push Check

Before the first push, confirm:

- production build succeeds
- no major console errors
- all six routes render
- mobile navigation works
- Product Story works on desktop/tablet
- Product Story mobile signal stays aligned
- Process works on desktop and mobile
- no unexpected horizontal overflow
- no secrets or temporary recordings are staged

Useful checks:

```bash
git status
git diff
git diff --staged
```

## Routes

The app uses browser-history routes:

```text
/
/about
/services
/clients
/contact
/contact/sales
```

After deployment, test each route by navigating normally, refreshing directly on that URL, and opening it in a new tab.

If direct route refreshes return a 404, add the appropriate Vercel SPA rewrite after confirming the issue.

## Production QA

### Responsive

Test:

```text
320
375
390
430
768
1024
1280+
```

Check:

- overflow
- text wrapping
- image crop/containment
- Navbar and Footer
- sticky story sections
- forms
- map
- FAQ

### Animation

Confirm:

- animations still work after resize/orientation changes
- Product Story mobile signal follows the rail
- IT Consultancy gets its final hold
- Process reaches Launch before releasing
- reduced motion shows readable final states
- counters end on the correct values

### Accessibility

Check keyboard navigation, visible focus states, menu Escape behavior, FAQ controls, image alt text, and decorative SVG accessibility.

### Content

Check internal/external links, contact details, map destination, legal links, and any placeholder copy.

### Metadata

Before public release, verify title, meta description, favicon, and social metadata if required.

## Environment Variables

Document names and purpose, never secret values.

The Contact Sales backend is not connected yet, so there is currently no final production form API configuration.

When that changes, private email/CRM keys must stay server-side and must not be exposed through Vite client variables.

## Contact Sales Deployment Gate

Do not treat the form as live until all of these work:

- backend endpoint
- server-side validation
- delivery to email or CRM
- secure secret handling
- loading state
- success state
- error/retry state
- duplicate submission handling
- spam/rate limiting
- production testing

## Vercel

Expected flow:

```text
push to main
     ↓
Vercel build
     ↓
deployment
```

After every important deployment, do a quick smoke test on the deployed URL instead of relying only on a successful build.

## Rollback

If a deployment breaks production:

1. identify the last known-good commit
2. revert or redeploy that version
3. reproduce the issue locally
4. fix it in a new commit
5. rebuild and retest
6. deploy again
