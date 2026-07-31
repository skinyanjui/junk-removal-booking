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
  ["Do I have to book after requesting quotes?", "No. Requesting quotes is free, and you choose whether to book."],
  ["What is included in the price?", "Quotes include labor, loading, hauling, and disposal unless an exception is clearly shown."],
  ["Can the price change at pickup?", "Any change must be explained and approved by you before work continues."],
  ["Will I see the pickup time before booking?", "Yes. Each quote shows the available pickup window before you choose."],
];

export default function HomePage() {
  return (
    <PageShell>
      <div id="booking"><BookingExperience /></div>

      <section className="shell service-section" id="services">
        <div className="section-intro compact-section-intro">
          <div><p className="eyebrow">Common pickups</p><h2>Junk removal for homes, rentals, and businesses.</h2></div>
        </div>
        <div className="service-chips">{services.map((service) => <span key={service}>{service}</span>)}</div>
      </section>

      <section className="shell how-section compact-how-section" id="how" aria-labelledby="how-title">
        <h2 className="sr-only" id="how-title">How it works</h2>
        <div className="how-grid compact-step-grid">
          <article><i>1</i><div><h3>Add photos</h3><p>Show what needs to be removed.</p></div></article>
          <article><i>2</i><div><h3>Compare quotes</h3><p>See prices and pickup windows.</p></div></article>
          <article><i>3</i><div><h3>Book</h3><p>Choose the option that works.</p></div></article>
        </div>
      </section>

      <section className="shell trust-section" id="trust">
        <div><p className="eyebrow">Know before you book</p><h2>See the important details before you choose.</h2></div>
        <div className="trust-grid compact-trust-grid">
          <article><ShieldCheckIcon /><div><h3>Provider information</h3><p>Insurance status, ratings, and completed jobs.</p></div></article>
          <article><ClockIcon /><div><h3>Pickup windows</h3><p>Know when your provider can arrive.</p></div></article>
          <article><CheckIcon /><div><h3>Price approval</h3><p>No price change without your approval.</p></div></article>
        </div>
      </section>

      <section className="shell faq-section">
        <div className="section-intro compact-section-intro"><div><p className="eyebrow">Questions</p><h2>Before you book</h2></div></div>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </PageShell>
  );
}
