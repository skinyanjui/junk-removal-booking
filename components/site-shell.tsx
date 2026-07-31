import Link from "next/link";
import type { ReactNode } from "react";
import { TruckIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-row">
        <Link className="brand" href="/" aria-label="Junk Removal Near Me home">
          <span className="brand-mark" aria-hidden="true"><TruckIcon /></span>
          <span><b>Junk Removal</b><small>Near Me</small></span>
        </Link>
        <nav aria-label="Primary navigation" className="nav-links">
          <Link href="/#how">How it works</Link>
          <Link href="/#trust">Trust</Link>
          <Link href="/provider">For providers</Link>
        </nav>
        <Link className="button button-secondary nav-cta" href="/provider/dashboard">
          <span className="nav-cta-long">Provider dashboard</span><span className="nav-cta-short">Providers</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><b>Junk Removal Near Me</b><p>Photo-first local quote routing.</p></div>
        <div className="footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></div>
      </div>
    </footer>
  );
}

export function PageShell({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <><SiteHeader /><main className={compact ? "main compact-main" : "main"}>{children}</main>{!compact && <SiteFooter />}</>;
}
