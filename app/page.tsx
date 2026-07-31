import { BookingExperience } from "@/components/booking-experience";
import { CheckIcon, ClockIcon, ShieldCheckIcon } from "@/components/icons";
import { PageShell } from "@/components/site-shell";

const services = [
  "Furniture removal",
  "Appliance pickup",
  "Estate cleanouts",
  "Garage cleanouts",
  "Hot tub removal",
  "Mattress removal",
  "Yard waste",
  "Light demolition",
  "Office cleanouts",
  "Storage units",
];

const questions = [
  ["Do I have to book after requesting quotes?", "No. The request is free and there is no obligation. You choose whether any provider is the right fit."],
  ["What should be included in a quote?", "The displayed total should include labor, loading, hauling, and disposal unless the provider clearly identifies an exception."],
  ["Can a provider increase the price at pickup?", "Only when the job is materially different from the photos or description. The provider must explain the change and receive your approval before continuing."],
  ["How are providers matched?", "Opportunities are routed by service ZIP code, job capability, availability, and provider standing. Providers do not receive unrelated jobs."],
];

export default function HomePage() {
  return (
    <PageShell>
      <div id="booking"><BookingExperience /></div>

      <section className="shell market-strip" aria-label="Marketplace service standards">
        <div className="market-intro"><strong>Local quotes without the guessing.</strong><p>Compare the information that actually changes the decision.</p></div>
        <div><strong>3–5</strong><span>matched providers per request</span></div>
        <div><strong>100%</strong><span>customer-approved price changes</span></div>
        <div><strong>ZIP</strong><span>based opportunity routing</span></div>
      </section>

      <section className="shell service-section" id="services">
        <div className="section-intro">
          <div><p className="eyebrow">Common pickups</p><h2>One request for the work people usually need removed.</h2></div>
          <p>Photos help providers price mixed loads and unusual jobs without forcing customers through a long category tree.</p>
        </div>
        <div className="service-chips">{services.map((service) => <span key={service}>{service}</span>)}</div>
      </section>

      <section className="shell how-section" id="how">
        <p className="eyebrow">Three clear stages</p>
        <h2>Show us the junk. Compare local quotes. Choose a provider.</h2>
        <div className="how-grid">
          <article><i>1</i><h3>Upload</h3><p>Photos communicate volume, access, and item condition better than a long checklist.</p></article>
          <article><i>2</i><h3>Compare</h3><p>Review total price, pickup window, verification status, rating, and completed jobs.</p></article>
          <article><i>3</i><h3>Book</h3><p>Choose a provider and approve a clear authorization before the pickup is confirmed.</p></article>
        </div>
      </section>

      <section className="shell trust-section" id="trust">
        <div><p className="eyebrow">Built for clear decisions</p><h2>Trust information appears where it helps—not before the task.</h2></div>
        <div className="trust-grid">
          <article><ShieldCheckIcon /><h3>Verified providers</h3><p>Insurance and identity status are visible before you choose.</p></article>
          <article><ClockIcon /><h3>Real pickup windows</h3><p>Providers quote an arrival range instead of fake minute-by-minute precision.</p></article>
          <article><CheckIcon /><h3>Price approval</h3><p>Additional work requires a clear reason and your approval first.</p></article>
        </div>
      </section>

      <section className="shell faq-section">
        <div className="section-intro"><div><p className="eyebrow">Before you request</p><h2>Clear answers without the sales language.</h2></div><p className="faq-intro">The marketplace is designed around transparent quotes, customer control, and relevant provider routing.</p></div>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </PageShell>
  );
}
