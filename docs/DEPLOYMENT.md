# Production deployment

## Vercel

- Project: `junk-removal-booking`
- Production alias: `https://junk-removal-booking.vercel.app`
- Framework: Next.js App Router
- Production branch: `main`
- Node.js: 22 or newer
- Package manager: pnpm

## Required release checks

1. Install with `pnpm install --no-frozen-lockfile` until a committed lockfile is generated.
2. Run `pnpm typecheck`.
3. Run `pnpm lint`.
4. Run `pnpm build`.
5. Confirm `/` returns the customer upload experience.
6. Confirm `/provider/join` and `/provider/dashboard` render.
7. Confirm `/privacy`, `/terms`, and `/accessibility` render.
8. Confirm `/api/health` returns JSON with `ok: true`.
9. Confirm the production alias points to the latest `main` deployment.

## 404 prevention

The repository includes `vercel.json` with explicit Next.js framework detection and build commands. Do not deploy an empty or static placeholder bundle to the production project. Production deployments must include the root `app/page` route and the complete application source.
