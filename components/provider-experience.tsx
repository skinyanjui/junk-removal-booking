"use client";

import Link from "next/link";
import { useState } from "react";
import { opportunities } from "@/lib/mock-data";
import { BriefcaseIcon, CheckIcon, ClockIcon, DollarIcon, MapPinIcon, ShieldCheckIcon, StarIcon } from "@/components/icons";
import { Button, Card, Input } from "@/components/ui";

type Opportunity = (typeof opportunities)[number];
type DashboardTab = "Opportunities" | "Jobs" | "Coverage" | "Earnings";

export function ProviderOnboarding() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zips, setZips] = useState(["47715", "47714", "47630"]);
  const [newZip, setNewZip] = useState("");

  function addZip() {
    const zip = newZip.trim();
    if (/^\d{5}$/.test(zip) && !zips.includes(zip)) setZips((current) => [...current, zip]);
    setNewZip("");
  }

  const labels = ["Business", "Coverage", "Capabilities", "Review"];

  return (
    <div className="provider-onboarding">
      <div className="provider-hero">
        <div><p className="eyebrow">Provider network</p><h1>Receive jobs in the ZIP codes you choose.</h1></div>
        <p className="lede">Create a trusted provider profile, set your coverage, and send clear quotes without paying for irrelevant leads.</p>
      </div>

      <div className="onboarding-layout">
        <aside className="onboarding-rail">
          <nav className="onboarding-steps" aria-label="Provider onboarding progress">
            {labels.map((label, index) => (
              <button type="button" key={label} className={step === index + 1 ? "active" : step > index + 1 ? "complete" : ""} onClick={() => setStep(index + 1)}>
                <i>{step > index + 1 ? <CheckIcon /> : index + 1}</i>{label}
              </button>
            ))}
          </nav>
          <div className="onboarding-help"><b>Your settings stay editable.</b>Pause ZIP codes, change minimums, and update capabilities from the dashboard at any time.</div>
        </aside>

        <Card className="onboarding-card">
          <div className="onboarding-progress" aria-hidden="true"><span style={{ width: `${step * 25}%` }} /></div>

          {step === 1 && (
            <div className="form-stack">
              <p className="eyebrow">Step 1 of 4</p><h2>Tell us about your business.</h2>
              <p className="form-intro">Use details customers and the verification team can confirm.</p>
              <label>Business name<Input value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="River City Junk Removal" autoComplete="organization" /></label>
              <label>Business phone<Input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" placeholder="(812) 555-0199" autoComplete="tel" /></label>
              <label>Business email<Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="jobs@company.com" autoComplete="email" /></label>
              <Button disabled={!business.trim() || phone.trim().length < 7 || !email.includes("@")} onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="form-stack">
              <p className="eyebrow">Step 2 of 4</p><h2>Choose your coverage.</h2>
              <p className="form-intro">Only receive opportunities in active ZIP codes. Pause an area without deleting it.</p>
              <div className="zip-entry"><Input value={newZip} onChange={(event) => setNewZip(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addZip(); } }} inputMode="numeric" maxLength={5} placeholder="Add ZIP code" /><Button onClick={addZip}>Add</Button></div>
              <div className="zip-list">{zips.map((zip) => <span key={zip}>{zip}<button type="button" aria-label={`Remove ${zip}`} onClick={() => setZips((current) => current.filter((item) => item !== zip))}>×</button></span>)}</div>
              <label className="switch-row"><input type="checkbox" defaultChecked /> Suggest nearby ZIP codes with similar drive times</label>
              <div className="split-actions"><Button variant="secondary" onClick={() => setStep(1)}>Back</Button><Button disabled={!zips.length} onClick={() => setStep(3)}>Continue</Button></div>
            </div>
          )}

          {step === 3 && (
            <div className="form-stack">
              <p className="eyebrow">Step 3 of 4</p><h2>What jobs can you handle?</h2>
              <p className="form-intro">These settings prevent poor matches and improve quote accuracy.</p>
              <div className="capability-grid">{["Furniture", "Appliances", "Cleanouts", "Yard waste", "Heavy items", "Light demolition"].map((item) => <label key={item}><input type="checkbox" defaultChecked={item !== "Heavy items"} />{item}</label>)}</div>
              <label>Minimum job value<Input defaultValue="$100" inputMode="decimal" /></label>
              <div className="split-actions"><Button variant="secondary" onClick={() => setStep(2)}>Back</Button><Button onClick={() => setStep(4)}>Continue</Button></div>
            </div>
          )}

          {step === 4 && (
            <div className="form-stack">
              <p className="eyebrow">Step 4 of 4</p><h2>Ready for verification.</h2>
              <Card className="review-box"><b>{business || "Your business"}</b><span>{zips.length} active ZIP codes</span><span>{email || "Business email required"}</span><span className="review-status"><ShieldCheckIcon /> Insurance and identity verification required before live opportunities</span></Card>
              <Link className="button button-primary" href="/provider/dashboard">Open provider dashboard</Link>
              <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
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

  const tabs: { label: DashboardTab; count?: number }[] = [
    { label: "Opportunities", count: 3 },
    { label: "Jobs", count: 1 },
    { label: "Coverage" },
    { label: "Earnings" },
  ];

  const metrics = [
    { label: "Open opportunities", value: "3", change: "2 strong matches" },
    { label: "Quotes sent this week", value: "14", change: "+18% from last week" },
    { label: "Booked revenue", value: "$6,920", change: "17 completed jobs" },
    { label: "Customer rating", value: "4.9", change: "248 verified reviews" },
  ];

  function notify(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2600);
  }

  function submitQuote() {
    if (!selectedJob || !quoteTotal.trim()) return;
    notify(`Quote sent for ${selectedJob.id} · $${quoteTotal} · ${quoteWindow}`);
    setSelectedJob(null);
    setQuoteTotal("");
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div><p className="eyebrow">River City Junk Removal</p><h1>{tab}</h1></div>
        <div className="dashboard-actions"><span className="availability"><i /> Available today</span><Link className="button button-secondary" href="/">Customer view</Link><span className="provider-avatar" aria-label="Provider profile">RC</span></div>
      </header>

      <section className="metric-grid" aria-label="Provider performance summary">
        {metrics.map((metric) => <div className="metric-card" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small className="positive">{metric.change}</small></div>)}
      </section>

      <nav className="dashboard-tabs" aria-label="Provider dashboard sections">
        {tabs.map((item) => <button type="button" key={item.label} className={tab === item.label ? "active" : ""} onClick={() => setTab(item.label)}>{item.label}{item.count ? <span className="tab-count">{item.count}</span> : null}</button>)}
      </nav>

      {message && <div className="toast-inline" role="status">{message}</div>}

      {selectedJob && (
        <Card className="quote-composer">
          <div><p className="eyebrow">Send quote · {selectedJob.id}</p><h2>{selectedJob.type}</h2><p>ZIP {selectedJob.zip} · {selectedJob.distance} · {selectedJob.timing}</p></div>
          <div className="quote-composer-fields"><label>Total price<div className="input-prefix"><span>$</span><Input value={quoteTotal} onChange={(event) => setQuoteTotal(event.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" placeholder="225" /></div></label><label>Earliest pickup<select className="select" value={quoteWindow} onChange={(event) => setQuoteWindow(event.target.value)}><option>Today, 2–4 PM</option><option>Today, 4–6 PM</option><option>Tomorrow, 8–10 AM</option><option>Tomorrow, 12–2 PM</option></select></label></div>
          <div className="split-actions"><Button disabled={!quoteTotal} onClick={submitQuote}>Submit quote</Button><Button variant="secondary" onClick={() => setSelectedJob(null)}>Cancel</Button></div>
        </Card>
      )}

      {tab === "Opportunities" && (
        <div className="dashboard-grid">
          <section>
            <div className="section-heading compact"><div><h2>New opportunities</h2><p>Strong ZIP and capability matches appear first.</p></div><select className="select" aria-label="Filter opportunities"><option>Best matches</option><option>Nearest</option><option>Highest value</option></select></div>
            <div className="opportunity-list">
              {opportunities.map((job, index) => (
                <Card className="opportunity-card" key={job.id}>
                  <div className="opportunity-visual"><BriefcaseIcon /><span>{job.photos} photos</span></div>
                  <div className="opportunity-copy"><div className="opportunity-top"><span>{job.id}</span><span className="match-pill">{["96% match", "91% match", "84% match"][index]}</span></div><h3>{job.type}</h3><div className="job-meta"><span><MapPinIcon /> ZIP {job.zip}</span><span>{job.distance}</span><span><ClockIcon /> {job.timing}</span></div></div>
                  <div className="opportunity-value"><strong>{job.value}</strong><Button onClick={() => setSelectedJob(job)}>Send quote</Button><Button variant="ghost" onClick={() => notify(`${job.id} declined`)}>Decline</Button></div>
                </Card>
              ))}
            </div>
          </section>
          <aside>
            <Card className="dashboard-summary"><p className="eyebrow">Quote performance</p><div className="summary-list"><div><strong>38%</strong><span>Acceptance rate</span></div><div><strong>18 min</strong><span>Median response time</span></div><div><strong>$407</strong><span>Average booked job</span></div></div></Card>
            <Card className="dashboard-summary"><h3>Coverage health</h3><p>12 active ZIP codes</p><p>Same-day enabled in 7</p><button type="button" className="text-link" onClick={() => setTab("Coverage")}>Manage coverage</button></Card>
          </aside>
        </div>
      )}

      {tab === "Jobs" && (
        <div className="dashboard-grid">
          <section><Card className="active-job"><span className="recommendation">Confirmed</span><h2>JR-1037 · Estate cleanout</h2><p>Evansville, IN · Today, 3–5 PM</p><div className="status-actions"><Button onClick={() => notify("Trip started. Customer notified.")}>Start trip</Button><Button variant="secondary" onClick={() => notify("Customer message opened")}>Message customer</Button></div></Card></section>
          <aside><Card className="dashboard-summary"><h3>Job workflow</h3>{["Confirmed", "En route", "Arrived", "In progress", "Complete"].map((item, index) => <span key={item} className={index === 0 ? "workflow active" : "workflow"}>{item}</span>)}</Card></aside>
        </div>
      )}

      {tab === "Coverage" && (
        <div className="coverage-page"><div className="section-heading"><div><h2>ZIP coverage</h2><p>Pause areas without deleting your settings.</p></div><Button onClick={() => notify("ZIP search opened")}>Add ZIP codes</Button></div><div className="coverage-table" role="table"><div className="coverage-row heading" role="row"><span>ZIP</span><span>Status</span><span>Same-day</span><span>Minimum</span></div>{["47715", "47714", "47630", "42420"].map((zip, index) => <div className="coverage-row" role="row" key={zip}><b>{zip}</b><button type="button" className="status-pill" onClick={() => notify(`${zip} status toggled`)}>{index === 3 ? "Paused" : "Active"}</button><label><input type="checkbox" defaultChecked={index < 2} /> Enabled</label><span className="mono-value">${index === 0 ? 125 : 100}</span></div>)}</div></div>
      )}

      {tab === "Earnings" && (
        <div className="dashboard-grid"><section><Card className="earnings-card"><p className="eyebrow">Available balance</p><strong>$2,840</strong><p>Next payout: Friday</p><Button onClick={() => notify("Payout details opened")}><DollarIcon /> View payout</Button></Card><Card><h2>Recent activity</h2><div className="activity-list"><span><b>JR-1034</b><i>+$425</i></span><span><b>JR-1028</b><i>+$210</i></span><span><b>JR-1022</b><i>+$185</i></span></div></Card></section><aside><Card className="dashboard-summary"><p className="eyebrow">Quality</p><div className="summary-list"><div><strong><StarIcon /> 4.9</strong><span>Customer rating</span></div><div><strong>17</strong><span>Completed jobs</span></div><div><strong>0</strong><span>Open disputes</span></div></div></Card></aside></div>
      )}
    </div>
  );
}
