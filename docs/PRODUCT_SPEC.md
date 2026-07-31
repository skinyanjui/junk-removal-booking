# Initial Product Specification

## Product

Junk Removal Booking is a two-sided marketplace for customers and independent junk-removal providers. The product should feel as direct as a ride-hailing application while accounting for the extra information needed to price removal jobs.

## Customer experience

### Homepage

- Immediate ZIP-code entry and prominent “Start booking” action.
- Three-step explanation kept secondary to the booking action.
- Trust, safety, service coverage, and provider-quality signals.
- Responsive universal header and footer.

### Booking flow

Collect only information needed to route and price the job:

- ZIP code and service address.
- Three to eight job photos.
- Service category.
- Approximate quantity or load size.
- Indoor or outdoor location.
- Stairs, elevator, distance, or access restrictions.
- Heavy items or dismantling requirements.
- Preferred pickup timing: today, two to three days, selected date, or flexible.
- Preferred contact method.
- Customer name, phone, and email.

The flow should support save-and-return behavior, useful validation, image previews, clear progress, and a confirmation state.

## Provider experience

### Onboarding

- Account and contact details.
- Business identity and public profile.
- Service categories and equipment/capacity.
- ZIP-code coverage selection.
- Availability and operating hours.
- Insurance, licenses, identity, and verification documents where applicable.
- Pricing preferences and job-size limits.
- Payout setup.
- Review and activation checklist.

### Dashboard

Use a full-width responsive layout with:

- Overview and performance summary.
- New job opportunities.
- Quotes and pending responses.
- Scheduled jobs.
- Active jobs.
- Messages.
- Earnings and payouts.
- Reviews.
- Service areas.
- Availability.
- Team and vehicles.
- Business profile.
- Settings and support.

## Routing model

Jobs are eligible for providers based on:

- Customer ZIP code.
- Provider-selected ZIP-code coverage.
- Required service category.
- Capacity, equipment, timing, and availability.
- Verification and account status.
- Provider quality, response rate, proximity, and workload.

The first release may use deterministic eligibility and ranking. Later versions can support automated assignment, bid windows, preferred-provider rules, and dynamic dispatch.

## Functional quality requirements

- Every visible action must have a valid destination or working behavior.
- No placeholder footer or navigation links.
- All forms require validation, error states, loading states, and success states.
- Keyboard navigation and visible focus states are required.
- Responsive behavior must be tested across mobile, tablet, laptop, and wide desktop layouts.
- Dashboards should use the available page width without becoming difficult to scan.
- Typography should remain readable and modern at all supported sizes.
