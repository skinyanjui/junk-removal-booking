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
        <div className="section-intro">
          <div><p className="eyebrow">Common pickups</p><h2>Junk removal for homes, rentals, and businesses.</h2></div>
          <p>Upload photos and add the pickup details. No long checklist required.</p>
        </div>
        <div className="service-chips">{services.map((service) => <span key={service}>{service}</span>)}</div>
      </section>

      <section className="shell how-section" id="how">
        <p className="eyebrow">Three easy steps</p>
        <h2>Upload photos. Compare quotes. Book your pickup.</h2>
        <div className="how-grid">
          <article><i>1</i><h3>Add photos</h3><p>Show what needs to be removed.</p></article>
          <article><i>2</i><h3>Compare quotes</h3><p>See total prices and pickup windows.</p></article>
          <article><i>3</i><h3>Book</h3><p>Choose the option that works for you.</p></article>
        </div>
      </section>

      <section className="shell trust-section" id="trust">
        <div><p className="eyebrow">Know before you book</p><h2>See the important details before you choose.</h2></div>
        <div className="trust-grid">
          <article><ShieldCheckIcon /><h3>Provider information</h3><p>View insurance status, ratings, and completed jobs.</p></article>
          <article><ClockIcon /><h3>Pickup windows</h3><p>Know when your provider can arrive.</p></article>
          <article><CheckIcon /><h3>Price approval</h3><p>No price change without your approval.</p></article>
        </div>
      </section>

      <section className="shell faq-section">
        <div className="section-intro"><div><p className="eyebrow">Questions</p><h2>A few things to know before you book.</h2></div></div>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
    </PageShell>
  );
}
