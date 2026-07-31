"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="main">
      <section className="legal-page shell" aria-labelledby="error-title">
        <p className="eyebrow">Something went wrong</p>
        <h1 id="error-title">This page could not load</h1>
        <p className="lede">Try the page again. Your browser has not submitted a booking from this screen.</p>
        <div className="split-actions">
          <button type="button" className="button button-primary" onClick={reset}>Try again</button>
          <Link className="button button-secondary" href="/">Go home</Link>
        </div>
      </section>
    </main>
  );
}
