import Link from "next/link";
import { BookingExperience } from "@/components/booking-experience";
import { BriefcaseIcon, CheckIcon, ClockIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";
import { PageShell } from "@/components/site-shell";

const jobGroups = [
  {
    title: "Household pickup",
    description: "Clear everyday items without estimating truck space.",
    items: ["Furniture", "Mattresses", "Appliances"],
    icon: TruckIcon,
  },
  {
    title: "Property cleanouts",
    description: "Get quotes for larger jobs with photos and access details.",
    items: ["Estates", "Garages", "Storage units"],
    icon: MapPinIcon,
  },
  {
    title: "Removal projects",
    description: "Show providers what must be removed or taken apart.",
    items: ["Hot tubs", "Yard waste", "Light demolition"],
    icon: BriefcaseIcon,
  },
];

const questions = [
  ["Do I have to book?", "No. Requesting quotes is free, and you decide whether to book."],
  ["What is included?", "Prices include labor, loading, hauling, and disposal unless a quote says otherwise."],
  ["Can the price change?", "A provider must explain any change and receive your approval before additional work continues."],
  ["Will I see the pickup time?", "Yes. Every quote shows the provider's available pickup window before you choose."],
  ["Can I request a quote without photos?", "Yes. Photos are recommended because they help providers price the job more accurately."],
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="shell home-value-bar" aria-label="Booking benefits">
        <span><CheckIcon /> Free quote request</span>
        <span><ClockIcon /> Pickup windows shown upfront</span>
        <span><ShieldCheckIcon /> Price changes require approval</span>
      </section>

      <div id="booking" className="home-booking"><BookingExperience /></div>

      <section className="shell home-section home-jobs" id="services">
        <div className="home-section-heading">
          <div><p className="eyebrow">Popular jobs</p><h2>One simple flow for pickups and full cleanouts.</h2></div>
          <p>Upload photos once. Local providers can review the same job details and send comparable prices.</p>
        </div>
        <div className="home-job-grid">
          {jobGroups.map(({ title, description, items, icon: Icon }) => (
            <article className="home-job-card" key={title}>
              <span className="home-card-icon"><Icon /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <div className="home-card-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell home-trust-panel" id="trust">
        <div className="home-trust-copy">
          <p className="eyebrow">Know before you book</p>
          <h2>Compare the details that matter.</h2>
          <p>Choose using the total price, pickup window, provider history, and insurance status—not a vague estimate.</p>
          <Link className="button button-primary" href="/#booking">Get local quotes</Link>
        </div>
        <div className="home-trust-list">
          <article><ShieldCheckIcon /><div><h3>Provider information</h3><p>Review insurance status, ratings, and completed jobs.</p></div></article>
          <article><ClockIcon /><div><h3>Clear pickup windows</h3><p>See when each provider can arrive before booking.</p></div></article>
          <article><CheckIcon /><div><h3>Price protection</h3><p>Any increase must be explained and approved by you.</p></div></article>
        </div>
      </section>

      <section className="shell home-section home-faq-section">
        <div className="home-section-heading compact">
          <div><p className="eyebrow">Questions</p><h2>Before you request quotes</h2></div>
        </div>
        <div className="faq-list home-faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="shell home-final-cta">
        <div><p className="eyebrow">Ready when you are</p><h2>Show providers what needs to go.</h2><p>Start with photos or continue without them. The request is free.</p></div>
        <Link className="button button-primary" href="/#booking">Start a quote request</Link>
      </section>
    </PageShell>
  );
}
