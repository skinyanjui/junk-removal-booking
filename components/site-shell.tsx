import Link from "next/link";
import type { ReactNode } from "react";
import { TruckIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-row">
        <Link className="brand" href="/" aria-label="Junk Removal Near Me home">
          <span className="brand-mark" aria-hidden="true"><TruckIcon /></span>
          <span className="brand-copy"><b>Junk Removal</b><small>Near Me</small></span>
        </Link>

        <nav aria-label="Primary navigation" className="nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#trust">Trust</Link>
          <Link href="/provider">Provider network</Link>
        </nav>

        <div className="nav-actions">
          <Link className="button button-secondary nav-provider-link" href="/provider/dashboard">Provider sign in</Link>
          <Link className="button button-primary" href="/#booking">Get local quotes</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true"><TruckIcon /></span>
            <span className="brand-copy"><b>Junk Removal</b><small>Near Me</small></span>
          </Link>
          <p>Photo-first quote routing that helps customers compare local providers without buying a blind lead.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-column"><b>Customers</b><Link href="/#booking">Request quotes</Link><Link href="/#how">How it works</Link><Link href="/#trust">Safety and trust</Link></div>
          <div className="footer-column"><b>Providers</b><Link href="/provider">Join the network</Link><Link href="/provider/dashboard">Provider dashboard</Link></div>
          <div className="footer-column"><b>Company</b><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></div>
        </nav>
      </div>
    </footer>
  );
}

export function PageShell({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <><SiteHeader /><main className={compact ? "main compact-main" : "main"}>{children}</main>{!compact && <SiteFooter />}</>;
}
