# Functional Audit

Audit date: July 31, 2026

## Verification scope

The customer flow, provider onboarding, provider dashboard, global navigation, legal routes, metadata routes, and failure routes were reviewed at source level. Vercel production builds were used as the release gate. Direct browser capture is currently blocked by the connected Vercel team access scope, so this audit does not claim screenshot-based visual verification.

## Customer booking flow

| Step | Controls verified | Prototype status | Production dependency |
| --- | --- | --- | --- |
| Photos | File picker, camera input, drag/drop, eight-photo limit, preview, remove, re-add same file, skip, continue | Working | Persistent object storage, malware/file validation, image processing |
| Pickup details | Address, location choices, conditional access choices, notes, back, request quotes | Working | Address autocomplete/geocoding, service-area validation |
| Quote wait | Quote status, contact validation, view quotes, add photo, edit, cancel | Working simulation | Real request routing, provider notifications, asynchronous quote events |
| Quote comparison | Recommended order, lowest price, soonest pickup, highest rated, details expand/collapse, choose | Working | Real quotes, expiration, provider availability locking |
| Confirmation | Provider/address/total summary, name, validated mobile number, payment selection, back, book | Working simulation | Payment processor, authorization, idempotency, fraud controls |
| Booked | Receipt summary, new booking, change, cancel, message notice | Working simulation | Persistent booking, cancellation policy, messaging, notification delivery |

## Provider onboarding

| Step | Controls verified | Prototype status | Production dependency |
| --- | --- | --- | --- |
| Business | Required name, valid phone, valid email, gated continue | Working | Account creation, email/phone verification |
| Coverage | Add, duplicate prevention, ZIP validation, remove, nearby toggle, gated continue | Working | Geospatial coverage service, service-area rules |
| Capabilities | Controlled selections, minimum value, at least one capability, back/continue | Working | Persisted provider settings |
| Review | Accurate summary, previous-step navigation, dashboard route | Working | Identity, insurance, license, bank, tax verification |

## Provider dashboard

| Area | Controls verified | Prototype status | Production dependency |
| --- | --- | --- | --- |
| Availability | Available/paused toggle | Working locally | Persisted availability and routing integration |
| Opportunities | Sorting, send quote, numeric price, pickup window, cancel, submit, decline, dynamic count | Working locally | Real opportunity feed, quote persistence, deadlines |
| Jobs | Confirmed → En route → Arrived → In progress → Complete | Working locally | Customer synchronization, timestamps, GPS, proof of completion |
| Coverage | Add ZIP, validation, duplicate prevention, active/paused, same-day toggles | Working locally | Persisted coverage and routing engine |
| Earnings | Payout detail expand/collapse, recent activity | Working locally | Ledger, fees, refunds, payout provider, tax reporting |
| Navigation | All tabs, customer view, coverage shortcut | Working | Authentication and authorization |

## Routes

- `/` — customer booking and marketing content
- `/provider` — provider onboarding
- `/provider/dashboard` — provider dashboard prototype
- `/privacy` — privacy policy
- `/terms` — terms of use
- `/accessibility` — accessibility statement
- `/api/health` — health response
- `/robots.txt` — crawler rules
- `/sitemap.xml` — public route sitemap
- Invalid routes — custom not-found page
- Render failures — recoverable error page

Header and footer destinations resolve to existing routes or existing page anchors.

## Critical launch gaps

1. Authentication and role-based access for customers, providers, and administrators.
2. Persistent database models for requests, photos, quotes, bookings, messages, status events, coverage, disputes, payments, and payouts.
3. Production photo upload and retention with file validation, compression, access controls, and deletion.
4. Real ZIP/service routing with provider capability, availability, verification, distance, and fair-distribution rules.
5. Email/SMS/push delivery for quote arrival, booking confirmation, job status, changes, cancellations, and receipts.
6. Payment authorization, capture, refunds, cancellation fees, price-change authorization, webhooks, and reconciliation.
7. Provider identity, insurance, license, banking, tax, and ongoing compliance verification.
8. Customer and provider messaging with moderation, attachment controls, and audit history.
9. Customer pickup tracking, price-change approval, completion proof, tipping if desired, rating, and dispute flows.
10. Administrator console for verification, routing review, booking support, refunds, disputes, fraud, content, and account enforcement.

## Operational and quality gaps

- Customer support contact and support workflow.
- Prohibited-items and hazardous-material screening.
- Cancellation/refund rules by provider and time window.
- Analytics funnel, conversion, routing health, quote latency, cancellation, and quality metrics.
- Error monitoring, structured logs, alerting, and incident ownership.
- Rate limiting, bot protection, CSRF strategy, security headers, audit logs, and abuse controls.
- Automated component, integration, accessibility, and end-to-end browser tests.
- Real-device testing across iOS Safari, Android Chrome, desktop browsers, zoom, keyboard, and screen readers.
- Reduced-motion behavior and formal WCAG 2.2 AA verification.
- Production domain, branded transactional email domain, favicon/app icons, social image, and final search metadata.
- Final legal review with real company identity, contact, governing law, payments, refunds, liability, and dispute terms.

## Current conclusion

The repository is a coherent and functional interactive prototype. The visible customer and provider controls now change state consistently and the production build passes. It is not yet a transactional marketplace because its core data, identity, communication, verification, payment, routing, support, and administration systems remain simulated or absent.
