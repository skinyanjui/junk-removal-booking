# Junk Removal Booking

A mobile-first, photo-first marketplace prototype for requesting junk removal, comparing local provider quotes, and booking a pickup.

## What is included

- Customer flow: photos → location/access → request sent → compare quotes → confirm booking.
- Provider onboarding with validated business details, ZIP coverage, capabilities, and review.
- Full-width provider dashboard with functional opportunities, jobs, coverage, and earnings tabs.
- Simulated routing, quoting, booking, job status, and payout behavior for prototype testing.
- Responsive, keyboard-oriented UI using Geist and a restrained green accent.
- Legal, accessibility, health, sitemap, robots, error, and not-found routes.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run typecheck
npm run lint
npm run build
```

## Product rules

1. Customers see only three stages: **Photos, Quotes, Book**.
2. Photos replace unnecessary item-classification questions.
3. Requests are routed to eligible providers; jobs are not assigned automatically.
4. The customer assigns the job by selecting a submitted quote.
5. Price increases require explicit customer approval.
6. Providers choose the ZIP codes where they receive opportunities.

## Prototype limitation

This repository currently uses client-side state and mock data. Authentication, persistent storage, production uploads, real routing, notifications, payments, verification, messaging, and payouts must be connected before launch.

See [`docs/MASTER_PRODUCT_BRIEF.md`](docs/MASTER_PRODUCT_BRIEF.md) for the source-of-truth product brief and [`docs/FUNCTIONAL_AUDIT.md`](docs/FUNCTIONAL_AUDIT.md) for the latest flow audit.

## Design system

See [`docs/GEIST_DESIGN_SYSTEM.md`](docs/GEIST_DESIGN_SYSTEM.md) for the shared Geist typography, token, component, and interaction standard.
