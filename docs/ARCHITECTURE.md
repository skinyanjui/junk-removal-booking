# Architecture

## Current prototype

The repository is a Next.js App Router application written in TypeScript. It uses React client components for interactive prototype state and Tailwind CSS v4 plus project CSS tokens for styling.

### Routes

- `/` — customer booking prototype
- `/provider` — provider onboarding
- `/provider/dashboard` — full-width provider operations dashboard
- `/api/health` — deployment health endpoint

### Important components

- `BookingExperience` — upload, details, request status, quote comparison, confirmation, and booking state.
- `ProviderOnboarding` — business, ZIP coverage, capabilities, and review.
- `ProviderDashboard` — opportunities, jobs, coverage, and earnings.
- `SiteHeader` and `SiteFooter` — universal public-site shell.
- `ui.tsx` — reusable shadcn-style primitives.

## Backend boundary

The current build intentionally uses mock data. Production adapters should preserve the same UI contracts while replacing local state with authenticated APIs.

Recommended domains:

- Users and temporary customer sessions
- Provider organizations and members
- Provider verification documents
- ZIP coverage and capability rules
- Requests, photos, access answers, and routing history
- Quotes and quote expiration
- Bookings and booking status history
- Price-change requests and approvals
- Payments, authorization changes, payouts, and refunds
- Messages, notifications, ratings, incidents, and disputes

## Deployment

The app is designed for Vercel. Store credentials in Vercel environment variables. Never commit secrets. Production photo storage, messaging, payments, maps, and identity providers should be selected behind adapters rather than embedded directly in page components.
