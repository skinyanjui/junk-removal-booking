# Junk Removal Booking

A mobile-first, photo-first marketplace for requesting junk removal, comparing local provider quotes, and booking a pickup.

## What is included

- Customer flow: upload → location/access → request sent → compare quotes → confirm booking.
- Provider onboarding with ZIP-code coverage selection.
- Full-width provider dashboard with opportunities, jobs, coverage, and earnings.
- Simulated routing, quote, booking, and status behavior for prototype testing.
- Product, architecture, routing, UX, and source-reference documentation.
- Responsive, keyboard-accessible UI using Geist and a restrained green accent.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Validate

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Product rules

1. Customers see only three stages: **Upload, Quotes, Book**.
2. Photos replace unnecessary item-classification questions.
3. Requests are routed to eligible providers; jobs are not assigned automatically.
4. The customer assigns the job by selecting a submitted quote.
5. Price increases require explicit customer approval.
6. Providers choose the ZIP codes where they receive opportunities.

See [`docs/MASTER_PRODUCT_BRIEF.md`](docs/MASTER_PRODUCT_BRIEF.md) for the complete source-of-truth brief.

## Design system

See [`docs/GEIST_DESIGN_SYSTEM.md`](docs/GEIST_DESIGN_SYSTEM.md) for the shared Geist typography, token, component, and interaction standard.
