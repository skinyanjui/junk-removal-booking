import { BookingExperience } from "@/components/booking-experience";
import { PageShell } from "@/components/site-shell";

export default function HomePage() {
  return <PageShell><BookingExperience /><section className="shell how-section" id="how"><p className="eyebrow">Three clear stages</p><h2>Show us the junk. Compare local quotes. Choose a provider.</h2><div className="how-grid"><article><i>1</i><h3>Upload</h3><p>Photos communicate more than a long checklist.</p></article><article><i>2</i><h3>Quotes</h3><p>Compare total price, pickup time, and verified trust.</p></article><article><i>3</i><h3>Book</h3><p>Choose a provider and approve the final authorization.</p></article></div></section></PageShell>;
}
