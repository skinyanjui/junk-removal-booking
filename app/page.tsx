import { BookingExperience } from "@/components/booking-experience";
import { CheckIcon, ClockIcon, ShieldCheckIcon } from "@/components/icons";
import { PageShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <PageShell>
      <BookingExperience />
      <section className="shell how-section" id="how">
        <p className="eyebrow">Three clear stages</p>
        <h2>Show us the junk. Compare local quotes. Choose a provider.</h2>
        <div className="how-grid">
          <article><i>1</i><h3>Upload</h3><p>Photos communicate more than a long checklist.</p></article>
          <article><i>2</i><h3>Quotes</h3><p>Compare total price, pickup time, and verified trust.</p></article>
          <article><i>3</i><h3>Book</h3><p>Choose a provider and approve the final authorization.</p></article>
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
    </PageShell>
  );
}
