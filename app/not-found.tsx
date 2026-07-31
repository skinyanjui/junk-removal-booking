import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="legal-page shell" aria-labelledby="not-found-title">
        <p className="eyebrow">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="lede">The page may have moved or the address may be incorrect.</p>
        <div className="split-actions">
          <Link className="button button-primary" href="/#booking">Get quotes</Link>
          <Link className="button button-secondary" href="/">Go home</Link>
        </div>
      </section>
    </PageShell>
  );
}
