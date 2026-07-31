import Link from "next/link";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site-shell";

export function LegalPage({ title, updated = "July 30, 2026", children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <PageShell>
      <article className="legal-page shell">
        <Link className="back-link" href="/">← Back home</Link>
        <p className="eyebrow">Junk Removal Near Me</p>
        <h1>{title}</h1>
        <p className="lede">Last updated {updated}</p>
        <div className="legal-copy">{children}</div>
      </article>
    </PageShell>
  );
}
