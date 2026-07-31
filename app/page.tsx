import { BookingExperience } from "@/components/booking-experience";
import { CheckIcon, ClockIcon, ShieldCheckIcon } from "@/components/icons";
import { PageShell } from "@/components/site-shell";

const services = [
  "Furniture",
  "Appliances",
  "Estate cleanouts",
  "Garage cleanouts",
  "Hot tubs",
  "Mattresses",
  "Yard waste",
  "Light demolition",
  "Office cleanouts",
  "Storage units",
];

const questions = [
  ["Do I have to book?", "No. Requesting quotes is free, and you decide whether to book."],
  ["What is included?", "Prices include labor, loading, hauling, and disposal unless noted."],
  ["Can the price change?", "Any change must be explained and approved by you first."],
  ["Will I see the pickup time?", "Yes. Every quote shows its available pickup window."],
];

export default function HomePage() {
  return (
    <PageShell>
      <div id="booking"><BookingExperience /></div>

      <section className="shell service-section compact-service-section" id="services">
        <div className="compact-section-title">
          <h2>What can be removed?</h2>
          <span>Homes, rentals, and businesses</span>
        </div>
        <div className="service-chips">{services.map((service) => <span key={service}>{service}</span>)}</div>
      </section>

      <section className="shell trust-section compact-trust-section" id="trust" aria-label="Booking protections">
        <div className="trust-grid compact-trust-grid">
          <article><ShieldCheckIcon /><div><h3>Provider details</h3><p>Insurance, ratings, and completed jobs.</p></div></article>
          <article><ClockIcon /><div><h3>Pickup time</h3><p>Shown before you book.</p></div></article>
          <article><CheckIcon /><div><h3>Price approval</h3><p>No change without your approval.</p></div></article>
        </div>
      </section>

      <section className="shell faq-section compact-faq-section">
        <h2>Questions</h2>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </PageShell>
  );
}
