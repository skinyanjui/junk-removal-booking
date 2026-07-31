"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { opportunities } from "@/lib/mock-data";
import { BriefcaseIcon, CheckIcon, ClockIcon, DollarIcon, MapPinIcon, ShieldCheckIcon, StarIcon } from "@/components/icons";
import { Button, Card, Input } from "@/components/ui";

type Opportunity = (typeof opportunities)[number];
type DashboardTab = "Opportunities" | "Jobs" | "Coverage" | "Earnings";
type CoverageArea = { zip: string; active: boolean; sameDay: boolean; minimum: number };
type JobStatus = "Confirmed" | "En route" | "Arrived" | "In progress" | "Complete";

const capabilityOptions = ["Furniture", "Appliances", "Cleanouts", "Yard waste", "Heavy items", "Light demolition"];
const workflow: JobStatus[] = ["Confirmed", "En route", "Arrived", "In progress", "Complete"];

function validPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ProviderOnboarding() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zips, setZips] = useState(["47715", "47714", "47630"]);
  const [newZip, setNewZip] = useState("");
  const [suggestNearby, setSuggestNearby] = useState(true);
  const [capabilities, setCapabilities] = useState(["Furniture", "Appliances", "Cleanouts", "Yard waste", "Light demolition"]);
  const [minimum, setMinimum] = useState("100");
  const [message, setMessage] = useState("");

  const businessValid = business.trim().length >= 2 && validPhone(phone) && validEmail(email);
  const coverageValid = zips.length > 0;
  const capabilitiesValid = capabilities.length > 0 && Number(minimum) >= 0;
  const labels = ["Business", "Coverage", "Capabilities", "Review"];

  function notify(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2800);
  }

  function addZip() {
    const zip = newZip.trim();
    if (!/^\d{5}$/.test(zip)) {
      notify("Enter a valid five-digit ZIP code.");
      return;
    }
    if (zips.includes(zip)) {
      notify(`${zip} is already in your coverage.`);
      return;
    }
    setZips((current) => [...current, zip]);
    setNewZip("");
  }

  function toggleCapability(item: string) {
    setCapabilities((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  function goToStep(next: number) {
    if (next <= step) setStep(next);
  }

  return (
    <div className="provider-onboarding">
      <div className="provider-hero">
        <div><p className="eyebrow">Provider network</p><h1>Receive jobs in the ZIP codes you choose.</h1></div>
        <p className="lede">Create your profile, choose coverage, and send quotes.</p>
      </div>

      {message && <div className="toast-inline" role="status">{message}</div>}

      <div className="onboarding-layout">
        <aside className="onboarding-rail">
          <nav className="onboarding-steps" aria-label="Provider onboarding progress">
            {labels.map((label, index) => {
              const target = index + 1;
              return (
                <button type="button" key={label} disabled={target > step} className={step === target ? "active" : step > target ? "complete" : ""} aria-current={step === target ? "step" : undefined} onClick={() => goToStep(target)}>
                  <i>{step > target ? <CheckIcon /> : target}</i>{label}
                </button>
              );
            })}
          </nav>
        </aside>

        <Card className="onboarding-card">
          <div className="onboarding-progress" aria-hidden="true"><span style={{ width: `${step * 25}%` }} /></div>

          {step === 1 && (
            <div className="form-stack">
              <h2>Business details</h2>
              <label>Business name<Input required value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="River City Junk Removal" autoComplete="organization" /></label>
              <label>Business phone<Input required value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" placeholder="(812) 555-0199" autoComplete="tel" aria-invalid={phone.length > 0 && !validPhone(phone)} /></label>
              <label>Business email<Input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="jobs@company.com" autoComplete="email" aria-invalid={email.length > 0 && !validEmail(email)} /></label>
              <Button disabled={!businessValid} onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="form-stack">
              <h2>Coverage</h2>
              <div className="zip-entry"><Input value={newZip} onChange={(event) => setNewZip(event.target.value.replace(/\D/g, ""))} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addZip(); } }} inputMode="numeric" maxLength={5} placeholder="Add ZIP code" aria-label="ZIP code" /><Button onClick={addZip}>Add</Button></div>
              <div className="zip-list">{zips.map((zip) => <span key={zip}>{zip}<button type="button" aria-label={`Remove ${zip}`} onClick={() => setZips((current) => current.filter((item) => item !== zip))}>×</button></span>)}</div>
              <label className="switch-row"><input type="checkbox" checked={suggestNearby} onChange={(event) => setSuggestNearby(event.target.checked)} /> Suggest nearby ZIP codes</label>
              <div className="split-actions"><Button variant="secondary" onClick={() => setStep(1)}>Back</Button><Button disabled={!coverageValid} onClick={() => setStep(3)}>Continue</Button></div>
            </div>
          )}

          {step === 3 && (
            <div className="form-stack">
              <h2>Capabilities</h2>
              <div className="capability-grid">{capabilityOptions.map((item) => <label key={item}><input type="checkbox" checked={capabilities.includes(item)} onChange={() => toggleCapability(item)} />{item}</label>)}</div>
              <label>Minimum job value<div className="input-prefix"><span>$</span><Input value={minimum} onChange={(event) => setMinimum(event.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" /></div></label>
              <div className="split-actions"><Button variant="secondary" onClick={() => setStep(2)}>Back</Button><Button disabled={!capabilitiesValid} onClick={() => setStep(4)}>Continue</Button></div>
            </div>
          )}

          {step === 4 && (
            <div className="form-stack">
              <h2>Review</h2>
              <Card className="review-box"><b>{business}</b><span>{zips.length} active ZIP codes</span><span>{capabilities.length} job types · ${minimum || "0"} minimum</span><span>{email}</span><span className="review-status"><ShieldCheckIcon /> Insurance and identity verification required before live jobs</span></Card>
              <div className="split-actions"><Button variant="secondary" onClick={() => setStep(3)}>Back</Button><Link className="button button-primary" href="/provider/dashboard">Open dashboard</Link></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export function ProviderDashboard() {
  const [tab, setTab] = useState<DashboardTab>("Opportunities");
  const [message, setMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState<Opportunity | null>(null);
  const [quoteTotal, setQuoteTotal] = useState("");
  const [quoteWindow, setQuoteWindow] = useState("Today, 4–6 PM");
  const [opportunityItems, setOpportunityItems] = useState([...opportunities]);
  const [sortMode, setSortMode] = useState("Best matches");
  const [quotesSent, setQuotesSent] = useState(14);
  const [available, setAvailable] = useState(true);
  const [jobStatus, setJobStatus] = useState<JobStatus>("Confirmed");
  const [coverage, setCoverage] = useState<CoverageArea[]>([
    { zip: "47715", active: true, sameDay: true, minimum: 125 },
    { zip: "47714", active: true, sameDay: true, minimum: 100 },
    { zip: "47630", active: true, sameDay: false, minimum: 100 },
    { zip: "42420", active: false, sameDay: false, minimum: 100 },
  ]);
  const [newCoverageZip, setNewCoverageZip] = useState("");
  const [showPayout, setShowPayout] = useState(false);

  const sortedOpportunities = useMemo(() => {
    const list = [...opportunityItems];
    if (sortMode === "Nearest") return list.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance));
    if (sortMode === "Highest value") return list.sort((a, b) => Number.parseInt(b.value.match(/\d+/g)?.at(-1) ?? "0") - Number.parseInt(a.value.match(/\d+/g)?.at(-1) ?? "0"));
    return list;
  }, [opportunityItems, sortMode]);

  const tabs: { label: DashboardTab; count?: number }[] = [
    { label: "Opportunities", count: opportunityItems.length },
    { label: "Jobs", count: jobStatus === "Complete" ? 0 : 1 },
    { label: "Coverage" },
    { label: "Earnings" },
  ];

  const metrics = [
    { label: "Open opportunities", value: String(opportunityItems.length), change: available ? "Available today" : "Availability paused" },
    { label: "Quotes sent this week", value: String(quotesSent), change: "Updated as quotes are sent" },
    { label: "Booked revenue", value: "$6,920", change: "17 completed jobs" },
    { label: "Customer rating", value: "4.9", change: "248 verified reviews" },
  ];

  function notify(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2800);
  }

  function submitQuote() {
    if (!selectedJob || Number(quoteTotal) <= 0) return;
    const job = selectedJob;
    setOpportunityItems((current) => current.filter((item) => item.id !== job.id));
    setQuotesSent((current) => current + 1);
    setSelectedJob(null);
    setQuoteTotal("");
    notify(`Quote sent for ${job.id} · $${quoteTotal} · ${quoteWindow}`);
  }

  function decline(job: Opportunity) {
    setOpportunityItems((current) => current.filter((item) => item.id !== job.id));
    if (selectedJob?.id === job.id) setSelectedJob(null);
    notify(`${job.id} removed from opportunities.`);
  }

  function addCoverageZip() {
    const zip = newCoverageZip.trim();
    if (!/^\d{5}$/.test(zip)) {
      notify("Enter a valid five-digit ZIP code.");
      return;
    }
    if (coverage.some((area) => area.zip === zip)) {
      notify(`${zip} is already listed.`);
      return;
    }
    setCoverage((current) => [...current, { zip, active: true, sameDay: false, minimum: 100 }]);
    setNewCoverageZip("");
    notify(`${zip} added to coverage.`);
  }

  function advanceJob() {
    const currentIndex = workflow.indexOf(jobStatus);
    const next = workflow[currentIndex + 1];
    if (!next) return;
    setJobStatus(next);
    notify(`Job updated to ${next}. Customer notified.`);
  }

  const jobAction = jobStatus === "Confirmed" ? "Start trip" : jobStatus === "En route" ? "Mark arrived" : jobStatus === "Arrived" ? "Start job" : jobStatus === "In progress" ? "Complete job" : "Completed";

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div><p className="eyebrow">River City Junk Removal</p><h1>{tab}</h1></div>
        <div className="dashboard-actions"><button type="button" className={available ? "availability" : "availability paused"} aria-pressed={available} onClick={() => setAvailable((current) => !current)}><i /> {available ? "Available today" : "Paused"}</button><Link className="button button-secondary" href="/">Customer view</Link><span className="provider-avatar" aria-label="Provider profile">RC</span></div>
      </header>

      <section className="metric-grid" aria-label="Provider performance summary">
        {metrics.map((metric) => <div className="metric-card" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small className="positive">{metric.change}</small></div>)}
      </section>

      <nav className="dashboard-tabs" aria-label="Provider dashboard sections">
        {tabs.map((item) => <button type="button" key={item.label} className={tab === item.label ? "active" : ""} aria-current={tab === item.label ? "page" : undefined} onClick={() => setTab(item.label)}>{item.label}{item.count !== undefined ? <span className="tab-count">{item.count}</span> : null}</button>)}
      </nav>

      {message && <div className="toast-inline" role="status">{message}</div>}

      {selectedJob && (
        <Card className="quote-composer">
          <div><p className="eyebrow">Send quote · {selectedJob.id}</p><h2>{selectedJob.type}</h2><p>ZIP {selectedJob.zip} · {selectedJob.distance} · {selectedJob.timing}</p></div>
          <div className="quote-composer-fields"><label>Total price<div className="input-prefix"><span>$</span><Input value={quoteTotal} onChange={(event) => setQuoteTotal(event.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" placeholder="225" /></div></label><label>Earliest pickup<select className="select" value={quoteWindow} onChange={(event) => setQuoteWindow(event.target.value)}><option>Today, 2–4 PM</option><option>Today, 4–6 PM</option><option>Tomorrow, 8–10 AM</option><option>Tomorrow, 12–2 PM</option></select></label></div>
          <div className="split-actions"><Button disabled={Number(quoteTotal) <= 0} onClick={submitQuote}>Submit quote</Button><Button variant="secondary" onClick={() => { setSelectedJob(null); setQuoteTotal(""); }}>Cancel</Button></div>
        </Card>
      )}

      {tab === "Opportunities" && (
        <div className="dashboard-grid">
          <section>
            <div className="section-heading compact"><div><h2>New opportunities</h2><p>{opportunityItems.length ? "Review and quote available jobs." : "No open opportunities."}</p></div><select className="select" value={sortMode} onChange={(event) => setSortMode(event.target.value)} aria-label="Filter opportunities"><option>Best matches</option><option>Nearest</option><option>Highest value</option></select></div>
            <div className="opportunity-list">
              {sortedOpportunities.map((job) => {
                const originalIndex = opportunities.findIndex((item) => item.id === job.id);
                return (
                  <Card className="opportunity-card" key={job.id}>
                    <div className="opportunity-visual"><BriefcaseIcon /><span>{job.photos} photos</span></div>
                    <div className="opportunity-copy"><div className="opportunity-top"><span>{job.id}</span><span className="match-pill">{["96% match", "91% match", "84% match"][originalIndex] ?? "Match"}</span></div><h3>{job.type}</h3><div className="job-meta"><span><MapPinIcon /> ZIP {job.zip}</span><span>{job.distance}</span><span><ClockIcon /> {job.timing}</span></div></div>
                    <div className="opportunity-value"><strong>{job.value}</strong><Button onClick={() => setSelectedJob(job)}>Send quote</Button><Button variant="ghost" onClick={() => decline(job)}>Decline</Button></div>
                  </Card>
                );
              })}
            </div>
          </section>
          <aside>
            <Card className="dashboard-summary"><p className="eyebrow">Quote performance</p><div className="summary-list"><div><strong>38%</strong><span>Acceptance rate</span></div><div><strong>18 min</strong><span>Median response time</span></div><div><strong>$407</strong><span>Average booked job</span></div></div></Card>
            <Card className="dashboard-summary"><h3>Coverage health</h3><p>{coverage.filter((area) => area.active).length} active ZIP codes</p><p>Same-day enabled in {coverage.filter((area) => area.sameDay).length}</p><button type="button" className="text-link" onClick={() => setTab("Coverage")}>Manage coverage</button></Card>
          </aside>
        </div>
      )}

      {tab === "Jobs" && (
        <div className="dashboard-grid">
          <section><Card className="active-job"><span className="recommendation">{jobStatus}</span><h2>JR-1037 · Estate cleanout</h2><p>Evansville, IN · Today, 3–5 PM</p><div className="status-actions">{jobStatus !== "Complete" && <Button onClick={advanceJob}>{jobAction}</Button>}<Button variant="secondary" onClick={() => notify("Customer messaging is not connected in this prototype.")}>Message customer</Button></div></Card></section>
          <aside><Card className="dashboard-summary"><h3>Job workflow</h3>{workflow.map((item) => <span key={item} className={workflow.indexOf(item) <= workflow.indexOf(jobStatus) ? "workflow active" : "workflow"}>{item}</span>)}</Card></aside>
        </div>
      )}

      {tab === "Coverage" && (
        <div className="coverage-page"><div className="section-heading"><div><h2>ZIP coverage</h2><p>Pause areas or change same-day availability.</p></div><div className="zip-entry"><Input value={newCoverageZip} onChange={(event) => setNewCoverageZip(event.target.value.replace(/\D/g, ""))} maxLength={5} inputMode="numeric" placeholder="ZIP code" aria-label="New coverage ZIP code" onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addCoverageZip(); } }} /><Button onClick={addCoverageZip}>Add ZIP</Button></div></div><div className="coverage-table" role="table"><div className="coverage-row heading" role="row"><span>ZIP</span><span>Status</span><span>Same-day</span><span>Minimum</span></div>{coverage.map((area) => <div className="coverage-row" role="row" key={area.zip}><b>{area.zip}</b><button type="button" className="status-pill" aria-pressed={area.active} onClick={() => setCoverage((current) => current.map((item) => item.zip === area.zip ? { ...item, active: !item.active } : item))}>{area.active ? "Active" : "Paused"}</button><label><input type="checkbox" checked={area.sameDay} onChange={(event) => setCoverage((current) => current.map((item) => item.zip === area.zip ? { ...item, sameDay: event.target.checked } : item))} /> Enabled</label><span className="mono-value">${area.minimum}</span></div>)}</div></div>
      )}

      {tab === "Earnings" && (
        <div className="dashboard-grid"><section><Card className="earnings-card"><p className="eyebrow">Available balance</p><strong>$2,840</strong><p>Next payout: Friday</p><Button onClick={() => setShowPayout((current) => !current)}><DollarIcon /> {showPayout ? "Hide payout" : "View payout"}</Button>{showPayout && <div className="quote-details"><p>Scheduled payout: $2,840</p><p>Destination: Bank account ending in 4821</p><p>Estimated arrival: Friday</p></div>}</Card><Card><h2>Recent activity</h2><div className="activity-list"><span><b>JR-1034</b><i>+$425</i></span><span><b>JR-1028</b><i>+$210</i></span><span><b>JR-1022</b><i>+$185</i></span></div></Card></section><aside><Card className="dashboard-summary"><p className="eyebrow">Quality</p><div className="summary-list"><div><strong><StarIcon /> 4.9</strong><span>Customer rating</span></div><div><strong>17</strong><span>Completed jobs</span></div><div><strong>0</strong><span>Open disputes</span></div></div></Card></aside></div>
      )}
    </div>
  );
}
