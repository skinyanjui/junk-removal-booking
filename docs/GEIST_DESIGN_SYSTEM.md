# Geist interface standard

This product uses Geist as both a font family and an interface discipline.

## Typography

- Geist Sans is used for navigation, headings, body copy, forms, buttons, cards, and tables.
- Geist Mono is reserved for prices, ZIP codes, booking IDs, job IDs, timestamps, and operational metrics.
- Page titles use restrained weight (`600`) and tight negative tracking rather than oversized bold decoration.
- Secondary copy remains readable and never drops below accessible contrast.

## Visual tokens

- Background: `#fafafa`
- Surface: `#ffffff`
- Primary text: `#1d1d1f`
- Secondary text: `#626262`
- Border: `#e5e5e5`
- Accent: `#0b6e4f`
- Focus: `#12a66a`
- Radii: 8px, 12px, and 16px
- Shadows: subtle one-pixel and low-elevation shadows only

## Component rules

- Controls use a minimum 44px height.
- Forms use visible labels, neutral borders, and a three-pixel focus halo.
- Buttons use one dominant dark primary action, quiet secondary buttons, and text-only tertiary actions.
- Cards rely on borders and spacing before shadow.
- Prices, IDs, ZIP codes, and dashboard metrics use tabular Geist Mono numerals.
- Mobile booking actions become a compact sticky action surface.

## Interaction rules

- Customer screens expose one primary decision at a time.
- Quote comparison prioritizes price, pickup window, and trust.
- Provider screens use full-width operational layouts with compact navigation.
- Disabled states reflect genuine system readiness or missing required information.
- Reduced-motion preferences disable non-essential transitions.
