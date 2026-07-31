# First-Principles Product Brief: Junk Removal Near Me

## Product definition

Build a nationwide junk-removal quote marketplace connecting customers with independent providers who choose the ZIP codes where they receive opportunities.

The customer uploads photos, confirms the pickup location and access, receives quotes from eligible local providers, chooses one, and books the job. The experience must feel easier than calling several companies individually.

## Primary customer promise

1. **Show us the junk**
2. **Compare local quotes**
3. **Choose a provider**

Everything else is automatic, contextual, or behind the scenes.

## First-principles rules

- One primary task and one dominant action per screen.
- Ask only questions that affect price, eligibility, or job execution.
- Use photos instead of asking customers to classify items or estimate truck volume.
- Use progressive disclosure and preserve answers between steps.
- Never ask the same question twice.
- Avoid industry terminology and explain uncertainty plainly.
- Show what happens next.
- Do not expose marketplace mechanics to customers.

## Customer journey

### Upload

Start immediately with **“What would you like removed?”** and a large multi-image upload interface. Support mobile camera capture, desktop file selection, drag and drop, previews, adding, and removing photos. Reassure customers that the request is free and carries no obligation. Do not require an account.

### Location and access

Ask **“Where should we pick this up?”** Use address autocomplete or device location where available. Then ask **“Where are the items?”** with Outside/curbside, Garage, Inside, and Other choices. Reveal contextual follow-ups only when needed, such as stairs for inside pickups or dismantling for hot tubs and sheds. Include one optional notes field.

### Request sent

Show a calm status timeline: Request sent, Providers reviewing, Quotes arriving. Show real counts only. Do not use fake timers or unsupported quote-time promises. Collect a mobile number or email only when needed to deliver quotes.

### Compare quotes

Reduce every offer to:

1. Total price
2. Earliest pickup window
3. Trust

Show no more than three quotes initially. Each card includes provider, rating, completed jobs, insurance status, inclusions, and a clear **Choose this provider** action. Use only restrained, transparent recommendations such as Best overall, Lowest price, or Soonest pickup.

### Confirm booking

Collect only name, mobile number, and payment method. Display the provider, total, pickup window, address, and uploaded photos. Use the statement: **“You authorize up to $X. Any increase requires your approval.”**

### Pickup and price changes

Use five job statuses: Confirmed, En route, Arrived, In progress, Complete. Show one dominant action at a time. Only show a live map when real en-route GPS exists. Providers must submit a price-change request with the original price, new price, reason, and supporting photo when relevant. Additional work cannot proceed until the customer approves.

## Provider experience

Use four main navigation areas:

1. Opportunities
2. Jobs
3. Coverage
4. Earnings

Opportunity cards show approximate location, ZIP, distance, photos, access notes, timing, job type, quote deadline, Send quote, and Decline. Do not reveal unnecessary customer information before booking.

The quote form asks only for total price, earliest pickup, and inclusions. Optional fields include another pickup window, short note, and expiration.

Coverage supports ZIP search, nearby ZIP expansion, radius selection, pausing, removal, same-day availability, minimum value, service types, capacity, availability, heavy items, and demolition capability.

## Routing rules

Match on customer ZIP, provider ZIP selections, service and item compatibility, availability, verification, capability, distance, response history, completion history, rating, and fair distribution.

- Do not automatically assign jobs.
- Notify the five strongest eligible providers first.
- Expand routing if too few quotes arrive.
- Stop routing when the customer books or the request expires.
- Do not notify every provider in a large region.

## Interface and copy

Use Geist, a light neutral background, near-black text, one green accent, thin borders, rounded cards, minimal shadows, large controls, plain icons, and sticky mobile actions. Avoid gradients, oversized marketing heroes, dense dashboards, carousels, excessive badges, long forms, multi-column mobile layouts, and industry jargon.

Preferred copy includes Upload photos, Confirm your address, Request local quotes, Providers are reviewing your request, Compare quotes, Choose this provider, Confirm pickup, Provider on the way, Approve price update, and Pickup complete.

## Accessibility

Target WCAG 2.2 AA with keyboard access, explicit labels, high contrast, visible focus, large touch targets, screen-reader status updates, accessible photo upload, error summaries, and reduced-motion support.

## Required prototype coverage

Customer: upload, location/access, request sent, quotes, quote details, confirm, confirmation, pickup status, price update, completion, rating.

Provider: sign-up, ZIP coverage, inbox, opportunity details, quote submission, accepted quote, active job, price update, completion, earnings.

Admin later: provider verification, routing review, booking details, dispute review.
