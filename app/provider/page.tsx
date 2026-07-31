import type { Metadata } from "next";
import Link from "next/link";
import { ProviderOnboarding } from "@/components/provider-experience";
import { BriefcaseIcon, CheckIcon, ClockIcon, DollarIcon, MapPinIcon, ShieldCheckIcon } from "@/components/icons";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "For Junk Removal Providers",
  description: "Choose your service ZIP codes, review local opportunities, send quotes, and manage booked junk-removal jobs.",
};

const providerBenefits = [
  { title: "Choose your coverage", copy: "Select the ZIP codes you serve and pause an area whenever needed.", icon: MapPinIcon },
  { title: "Quote the right jobs", copy: "Review photos, timing, distance, and job details before sending a price.", icon: BriefcaseIcon },
  { title: "Control availability", copy: "Set minimums, capabilities, and same-day availability from your dashboard.", icon: ClockIcon },
];

const providerQuestions = [
  ["How do opportunities reach providers?", "Opportunities are shown to eligible providers based on coverage, capabilities, availability, and verification status."],
  ["Do I have to quote every opportunity?", "No. Review the details and quote only the jobs that fit your business."],
  ["Can I change my service area?", "Yes. ZIP codes, minimums, capabilities, and same-day availability stay editable."],
  ["What is required before live jobs?", "Business information, identity, insurance, payout details, and any locally required licenses must be verified."],
];

export default function ProviderPage() {
  return (
    <PageShell>
      <section className="shell provider-home-hero">
        <div className="provider-home-copy">
          <p className="eyebrow">For junk removal providers</p>
          <h1>Choose the jobs and ZIP codes that fit your business.</h1>
          <p className="lede">Review local opportunities, send your total price and pickup window, then manage accepted jobs from one dashboard.</p>
          <div className="provider-home-actions">
            <a className="button button-primary" href="#provider-onboarding">Create provider profile</a>
            <Link className="button button-secondary" href="/provider/dashboard">Provider sign in</Link>
          </div>
          <div className="provider-home-points">
            <span><CheckIcon /> Choose coverage</span>
            <span><CheckIcon /> Set job minimums</span>
            <span><CheckIcon /> Pause availability</span>
          </div>
        </div>

        <div className="provider-dashboard-preview" aria-label="Provider dashboard preview">
          <div className="provider-preview-header"><div><small>Provider dashboard</small><b>New opportunities</b></div><span><i /> Available</span></div>
          <div className="provider-preview-metrics"><div><small>Open</small><strong>3</strong></div><div><small>Quotes sent</small><strong>14</strong></div><div><small>Rating</small><strong>4.9</strong></div></div>
          <div className="provider-preview-job">
            <span className="provider-preview-icon"><BriefcaseIcon /></span>
            <div><small>4.2 miles · Today</small><b>Furniture + mattress</b><span>ZIP 47715 · 5 photos</span></div>
            <div><strong>$180–$260</strong><span>Send quote</span></div>
          </div>
          <div className="provider-preview-job muted">
            <span className="provider-preview-icon"><BriefcaseIcon /></span>
            <div><small>8.8 miles · Tomorrow</small><b>Garage cleanout</b><span>ZIP 47630 · 7 photos</span></div>
            <div><strong>$320–$480</strong><span>Review</span></div>
          </div>
        </div>
      </section>

      <section className="shell provider-benefit-grid" aria-label="Provider benefits">
        {providerBenefits.map(({ title, copy, icon: Icon }) => <article key={title}><span><Icon /></span><div><h2>{title}</h2><p>{copy}</p></div></article>)}
      </section>

      <section className="shell provider-control-band">
        <div><p className="eyebrow">Built for control</p><h2>You decide where, when, and what work you take.</h2></div>
        <div className="provider-control-list">
          <span><MapPinIcon /><b>Coverage</b><small>ZIP codes and nearby areas</small></span>
          <span><DollarIcon /><b>Pricing</b><small>Your total quote and minimums</small></span>
          <span><ShieldCheckIcon /><b>Trust</b><small>Verified business information</small></span>
        </div>
      </section>

      <section className="shell provider-onboarding-section" id="provider-onboarding">
        <div className="provider-section-heading">
          <div><p className="eyebrow">Provider application</p><h2>Set up your profile in four short steps.</h2></div>
          <p>Add business details, choose coverage, select capabilities, and review the information required for verification.</p>
        </div>
        <ProviderOnboarding />
      </section>

      <section className="shell provider-requirements-panel">
        <div><p className="eyebrow">Before live jobs</p><h2>Complete verification once your profile is ready.</h2><p>Live access requires accurate business and payout information. Requirements may vary by location and service type.</p></div>
        <div className="provider-requirement-list">
          <span><CheckIcon /> Business and identity details</span>
          <span><CheckIcon /> Active insurance documentation</span>
          <span><CheckIcon /> Payout and tax information</span>
          <span><CheckIcon /> Applicable local licenses</span>
        </div>
      </section>

      <section className="shell home-section provider-faq-section">
        <div className="home-section-heading compact"><div><p className="eyebrow">Provider questions</p><h2>How the provider experience works</h2></div></div>
        <div className="faq-list home-faq-list">{providerQuestions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </PageShell>
  );
}
