# UX and Accessibility Standard

## Experience target

A first-time customer should understand and begin within five seconds. The interface exposes only the decision needed now.

## Visual system

- Geist Sans for UI text and Geist Mono for prices and operational identifiers.
- White and light-neutral surfaces.
- Near-black text and one green accent.
- Thin borders, 12–18px radii, minimal shadows.
- No gradients or decorative marketing art in the core booking flow.

## Responsive behavior

- Mobile-first, single-column booking screens.
- Sticky actions may be added where they do not hide content.
- Provider dashboards use full browser width on desktop and collapse cleanly on mobile.
- Button pairs remain aligned where space permits and stack when necessary.

## Accessibility

- Every control has a visible label or accessible name.
- Keyboard focus uses a strong visible ring.
- Touch targets are at least 44px in the implemented interface.
- Status changes use an `aria-live` region.
- Photo upload supports keyboard activation and descriptive errors.
- Color is never the only state indicator.
- Reduced-motion preferences disable nonessential transitions.

## Error language

Use plain recovery instructions, never technical stack traces. Examples:

- “We could not upload that photo. Try again or choose a different image.”
- “Add one wider photo showing all the items.”
- “No providers are available in this ZIP code yet.”
- “No quotes have arrived yet. We’re expanding your request.”
