"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { quotes, type Quote } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button, Card, Input, Textarea } from "@/components/ui";

type Step = "upload" | "details" | "sent" | "quotes" | "confirm" | "booked";

type Photo = { name: string; url: string };

const locations = ["Outside or curbside", "Garage", "Inside", "Other"];

export function BookingExperience() {
  const [step, setStep] = useState<Step>("upload");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [address, setAddress] = useState("120 SE 4th St, Evansville, IN 47708");
  const [location, setLocation] = useState("Outside or curbside");
  const [stairs, setStairs] = useState("No");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [statusText, setStatusText] = useState("5 providers notified");
  const fileRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<Photo[]>([]);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), []);

  const progress = useMemo(() => {
    if (step === "upload" || step === "details") return 1;
    if (step === "sent" || step === "quotes") return 2;
    return 3;
  }, [step]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).slice(0, 8 - photos.length).map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPhotos((current) => [...current, ...next]);
  }

  function removePhoto(index: number) {
    setPhotos((current) => {
      const removed = current[index];
      if (removed) URL.revokeObjectURL(removed.url);
      return current.filter((_, photoIndex) => photoIndex !== index);
    });
  }

  function sendRequest() {
    setStep("sent");
    setStatusText("5 providers notified");
    window.setTimeout(() => setStatusText("2 providers are reviewing · 3 quotes ready"), 1200);
  }

  return (
    <section className="booking-shell" aria-live="polite">
      <div className="progress" aria-label={`Booking stage ${progress} of 3`}>
        {["Upload", "Quotes", "Book"].map((label, index) => <span key={label} className={progress >= index + 1 ? "active" : ""}><i>{progress > index + 1 ? "✓" : index + 1}</i>{label}</span>)}
      </div>

      {step === "upload" && (
        <div className="booking-grid">
          <div>
            <p className="eyebrow">Start your free request</p>
            <h1>What would you like removed?</h1>
            <p className="lede">Upload a few photos. We’ll send the job to local providers who serve your area.</p>
            <Card className="upload-card">
              <input ref={fileRef} className="sr-only" id="photos" type="file" accept="image/*" multiple capture="environment" onChange={(event) => handleFiles(event.target.files)} />
              <button className="drop-zone" onClick={() => fileRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }}>
                <span className="upload-icon" aria-hidden="true">＋</span>
                <b>{photos.length ? "Add more photos" : "Take or choose photos"}</b>
                <small>Up to 8 images · JPG, PNG, or HEIC</small>
              </button>
              {photos.length > 0 && <div className="photo-grid">{photos.map((photo, index) => <figure key={`${photo.name}-${index}`}><img src={photo.url} alt={`Uploaded item ${index + 1}`} /><button aria-label={`Remove photo ${index + 1}`} onClick={() => removePhoto(index)}>×</button></figure>)}</div>}
            </Card>
            <div className="action-row"><Button disabled={!photos.length} onClick={() => setStep("details")}>Continue <span aria-hidden="true">→</span></Button><button className="text-link" onClick={() => setStep("details")}>I can’t upload photos</button></div>
            <p className="reassurance">Free request. No obligation.</p>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "details" && (
        <div className="booking-grid">
          <div>
            <button className="back-link" onClick={() => setStep("upload")}>← Back to photos</button>
            <h1>Where should we pick this up?</h1>
            <p className="lede">Confirm the address and tell us only what affects access.</p>
            <div className="form-stack">
              <label>Pickup address<Input value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" /></label>
              <fieldset><legend>Where are the items?</legend><div className="choice-grid">{locations.map((item) => <button type="button" key={item} className={location === item ? "choice selected" : "choice"} onClick={() => setLocation(item)}>{item}</button>)}</div></fieldset>
              {location === "Inside" && <fieldset><legend>Are there stairs?</legend><div className="choice-grid three">{["No", "Yes", "Elevator available"].map((item) => <button type="button" key={item} className={stairs === item ? "choice selected" : "choice"} onClick={() => setStairs(item)}>{item}</button>)}</div></fieldset>}
              <label>Anything important we should know?<Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Gate code, parking instructions, heavy items, or access details" /></label>
              <Button onClick={sendRequest}>Request local quotes</Button>
              <p className="reassurance">We’ll send your request to providers serving this ZIP code.</p>
            </div>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "sent" && (
        <div className="center-panel">
          <span className="success-mark">✓</span>
          <p className="eyebrow">Request JR-1042</p>
          <h1>Your request is out to local providers.</h1>
          <p className="lede">We’re notifying providers who serve your ZIP code and handle this type of job.</p>
          <Card className="status-card"><div className="timeline"><span className="done">Request sent</span><span className="done">Providers reviewing</span><span className={statusText.includes("quotes") ? "done" : ""}>Quotes arriving</span></div><b>{statusText}</b></Card>
          <label className="contact-field">Where should we send your quotes?<Input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Mobile number or email" /></label>
          <Button onClick={() => setStep("quotes")}>View quotes</Button>
          <div className="secondary-actions"><button>Add another photo</button><button onClick={() => setStep("details")}>Edit request</button><button>Cancel request</button></div>
        </div>
      )}

      {step === "quotes" && (
        <div className="quotes-panel">
          <div className="section-heading"><div><p className="eyebrow">3 local quotes</p><h1>Compare price, pickup time, and trust.</h1></div><select aria-label="Sort quotes" className="select"><option>Best match</option><option>Lowest price</option><option>Soonest pickup</option><option>Highest rated</option></select></div>
          <div className="quote-grid">{quotes.map((quote) => <QuoteCard key={quote.id} quote={quote} onChoose={() => { setSelectedQuote(quote); setStep("confirm"); }} />)}</div>
        </div>
      )}

      {step === "confirm" && selectedQuote && (
        <div className="booking-grid narrow-grid">
          <div>
            <button className="back-link" onClick={() => setStep("quotes")}>← Back to quotes</button>
            <h1>Confirm your pickup</h1>
            <Card className="summary-card"><div><small>Provider</small><b>{selectedQuote.provider}</b></div><div><small>Pickup</small><b>{selectedQuote.window}</b></div><div><small>Total authorization</small><b>{formatCurrency(selectedQuote.total)}</b></div><div><small>Address</small><b>{address}</b></div></Card>
            <div className="form-stack"><label>Name<Input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label><label>Mobile number<Input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" /></label><fieldset><legend>Payment method</legend><div className="choice-grid three"><button type="button" className="choice selected">Card</button><button type="button" className="choice">Apple Pay</button><button type="button" className="choice">Google Pay</button></div></fieldset><div className="authorization">You authorize up to <b>{formatCurrency(selectedQuote.total)}</b>. Any increase requires your approval.</div><Button disabled={!name || !phone} onClick={() => setStep("booked")}>Book pickup</Button><p className="reassurance">You will not be charged more unless you approve a price change.</p></div>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "booked" && selectedQuote && (
        <div className="center-panel"><span className="success-mark">✓</span><p className="eyebrow">Booking JR-1042</p><h1>Your pickup is booked.</h1><p className="lede">{selectedQuote.provider} will arrive {selectedQuote.window.toLowerCase()}.</p><Card className="status-card booking-receipt"><b>{formatCurrency(selectedQuote.total)} confirmed</b><span>{address}</span><span>Text updates enabled for {phone}</span></Card><Button onClick={() => setStep("upload")}>Book another pickup</Button><div className="secondary-actions"><button>Message provider</button><button>Change pickup</button><button>Cancel booking</button></div></div>
      )}
    </section>
  );
}

function BookingAside({ photos }: { photos: Photo[] }) {
  return <aside className="booking-aside"><Card><div className="aside-head"><b>Your items</b><span>{photos.length || 0} photos</span></div>{photos.length ? <div className="aside-photos">{photos.slice(0, 4).map((photo, index) => <img key={`${photo.name}-${index}`} src={photo.url} alt="" />)}</div> : <div className="empty-preview">Photos appear here</div>}<div className="estimate"><small>Typical local range</small><strong>$180–$320</strong><p>Providers set the final quote before you book.</p></div></Card><div className="trust-list" id="trust"><span>✓ Insurance verification</span><span>✓ Ratings and completed jobs</span><span>✓ Price changes need approval</span></div></aside>;
}

function QuoteCard({ quote, onChoose }: { quote: Quote; onChoose: () => void }) {
  const [open, setOpen] = useState(false);
  return <Card className="quote-card">{quote.label && <span className="recommendation">{quote.label}</span>}<strong className="quote-price">{formatCurrency(quote.total)} total</strong><b className="quote-window">{quote.window}</b><div className="provider-block"><h2>{quote.provider}</h2><p>{quote.rating} ★ · {quote.completedJobs} completed jobs</p><span>{quote.verified ? "Insurance verified" : "Verification pending"}</span></div><div className="included"><small>Includes</small><p>{quote.included.join(" · ")}</p></div>{open && <div className="quote-details"><p>Free cancellation up to two hours before pickup.</p><p>Additional work requires a customer-approved price update.</p></div>}<Button onClick={onChoose}>Choose this provider</Button><button className="text-link" onClick={() => setOpen((value) => !value)}>{open ? "Hide details" : "View details"}</button></Card>;
}
