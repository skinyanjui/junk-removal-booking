"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { quotes, type Quote } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowRightIcon, CameraIcon, CheckIcon, ClockIcon, ImageIcon, MapPinIcon, ShieldCheckIcon, StarIcon, UploadIcon } from "@/components/icons";
import { Button, Card, Input, Textarea } from "@/components/ui";

type Step = "upload" | "details" | "sent" | "quotes" | "confirm" | "booked";
type Photo = { name: string; url: string };
type SortOption = "Recommended" | "Lowest price" | "Soonest pickup" | "Highest rated";

const locations = ["Outside or curbside", "Garage", "Inside", "Other"];
const paymentMethods = ["Card", "Apple Pay", "Google Pay"];

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
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [statusText, setStatusText] = useState("Quotes are on the way");
  const [quotesReady, setQuotesReady] = useState(false);
  const [sort, setSort] = useState<SortOption>("Recommended");
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<Photo[]>([]);

  useEffect(() => { photosRef.current = photos; }, [photos]);
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), []);

  const progress = useMemo(() => {
    if (step === "upload" || step === "details") return 1;
    if (step === "sent" || step === "quotes") return 2;
    return 3;
  }, [step]);

  const sortedQuotes = useMemo(() => {
    const list = [...quotes];
    if (sort === "Lowest price") return list.sort((a, b) => a.total - b.total);
    if (sort === "Soonest pickup") return list.sort((a, b) => a.window.localeCompare(b.window));
    if (sort === "Highest rated") return list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [sort]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const available = 8 - photos.length;
    const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/")).slice(0, available);
    const next = validFiles.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPhotos((current) => [...current, ...next]);
    setNotice(validFiles.length < files.length ? "Only image files were added. You can upload up to eight photos." : "");
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
    setQuotesReady(false);
    setStatusText("Quotes are on the way");
    window.setTimeout(() => {
      setStatusText("3 quotes are ready");
      setQuotesReady(true);
    }, 1100);
  }

  function resetRequest() {
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setPhotos([]);
    setSelectedQuote(null);
    setStep("upload");
    setQuotesReady(false);
    setNotice("");
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <section className="booking-shell" aria-live="polite">
      <div className="progress" aria-label={`Booking stage ${progress} of 3`}>
        {["Photos", "Quotes", "Book"].map((label, index) => (
          <span key={label} className={progress >= index + 1 ? "active" : ""}>
            <i>{progress > index + 1 ? <CheckIcon /> : index + 1}</i>{label}
          </span>
        ))}
      </div>

      {notice && <div className="toast-inline global-notice" role="status">{notice}</div>}

      {step === "upload" && (
        <div className="booking-grid">
          <div>
            <h1>What would you like removed?</h1>
            <Card className="upload-card">
              <input ref={fileRef} className="sr-only" id="photos" type="file" accept="image/*" multiple capture="environment" onChange={(event) => handleFiles(event.target.files)} />
              <button type="button" className="drop-zone" onClick={() => fileRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }}>
                <span className="upload-icon" aria-hidden="true">{photos.length ? <ImageIcon /> : <UploadIcon />}</span>
                <b>{photos.length ? "Add more photos" : "Take or choose photos"}</b>
                <small>Up to 8 images</small>
              </button>
              {photos.length > 0 && (
                <div className="photo-grid">
                  {photos.map((photo, index) => (
                    <figure key={`${photo.name}-${index}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url} alt={`Uploaded item ${index + 1}`} />
                      <button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => removePhoto(index)}>×</button>
                    </figure>
                  ))}
                </div>
              )}
            </Card>
            <div className="action-row">
              <Button disabled={!photos.length} onClick={() => setStep("details")}>Continue <ArrowRightIcon /></Button>
              <button type="button" className="text-link" onClick={() => setStep("details")}>Continue without photos</button>
            </div>
            <p className="reassurance">Free request. No obligation.</p>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "details" && (
        <div className="booking-grid">
          <div>
            <button type="button" className="back-link" onClick={() => setStep("upload")}>← Back</button>
            <h1>Pickup address and access</h1>
            <div className="form-stack">
              <label>Pickup address<div className="input-with-icon"><MapPinIcon /><Input value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" /></div></label>
              <fieldset><legend>Where are the items?</legend><div className="choice-grid">{locations.map((item) => <button type="button" key={item} className={location === item ? "choice selected" : "choice"} onClick={() => setLocation(item)}>{item}</button>)}</div></fieldset>
              {location === "Inside" && <fieldset><legend>Are there stairs?</legend><div className="choice-grid three">{["No", "Yes", "Elevator available"].map((item) => <button type="button" key={item} className={stairs === item ? "choice selected" : "choice"} onClick={() => setStairs(item)}>{item}</button>)}</div></fieldset>}
              <label>Anything else?<Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Gate code, parking, heavy items, or other details" /></label>
              <Button disabled={address.trim().length < 8} onClick={sendRequest}>Get quotes <ArrowRightIcon /></Button>
            </div>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "sent" && (
        <div className="center-panel compact-state-panel">
          <span className="success-mark"><CheckIcon /></span>
          <h1>Quotes are coming</h1>
          <Card className="status-card compact-status-card">
            <div className="timeline"><span className="done">Request sent</span><span className={quotesReady ? "done" : ""}>Quotes arriving</span><span className={quotesReady ? "done" : ""}>Ready</span></div>
            <b>{statusText}</b>
          </Card>
          <label className="contact-field">Send my quotes to<Input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Mobile number or email" /></label>
          <Button disabled={!quotesReady || contact.trim().length < 5} onClick={() => setStep("quotes")}>{quotesReady ? "View quotes" : "Quotes are coming…"}</Button>
          <div className="secondary-actions"><button type="button" onClick={() => setStep("upload")}>Add photo</button><button type="button" onClick={() => setStep("details")}>Edit</button><button type="button" onClick={resetRequest}>Cancel</button></div>
        </div>
      )}

      {step === "quotes" && (
        <div className="quotes-panel">
          <div className="section-heading compact-quote-heading"><h1>Choose a quote</h1><label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Sort quotes" className="select"><option>Recommended</option><option>Lowest price</option><option>Soonest pickup</option><option>Highest rated</option></select></label></div>
          <div className="quote-list">{sortedQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} onChoose={() => { setSelectedQuote(quote); setStep("confirm"); }} />)}</div>
          <p className="quotes-footnote">Prices include labor, loading, hauling, and disposal unless noted.</p>
        </div>
      )}

      {step === "confirm" && selectedQuote && (
        <div className="booking-grid narrow-grid">
          <div>
            <button type="button" className="back-link" onClick={() => setStep("quotes")}>← Back to quotes</button>
            <h1>Confirm pickup</h1>
            <Card className="summary-card compact-summary-card"><div><small>Provider</small><b>{selectedQuote.provider}</b></div><div><small>Pickup</small><b>{selectedQuote.window}</b></div><div><small>Total</small><b className="mono-value">{formatCurrency(selectedQuote.total)}</b></div><div><small>Address</small><b>{address}</b></div></Card>
            <div className="form-stack">
              <label>Name<Input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>
              <label>Mobile number<Input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" /></label>
              <fieldset><legend>Payment method</legend><div className="choice-grid three">{paymentMethods.map((method) => <button type="button" key={method} className={paymentMethod === method ? "choice selected" : "choice"} onClick={() => setPaymentMethod(method)}>{method}</button>)}</div></fieldset>
              <div className="authorization">You approve <b>{formatCurrency(selectedQuote.total)}</b>. Any change requires your approval.</div>
              <Button disabled={!name.trim() || phone.trim().length < 7} onClick={() => setStep("booked")}>Book pickup <ArrowRightIcon /></Button>
            </div>
          </div>
          <BookingAside photos={photos} />
        </div>
      )}

      {step === "booked" && selectedQuote && (
        <div className="center-panel compact-state-panel">
          <span className="success-mark"><CheckIcon /></span>
          <h1>Pickup booked</h1>
          <p className="booking-provider-line">{selectedQuote.provider} · {selectedQuote.window}</p>
          <Card className="status-card booking-receipt compact-receipt"><b className="mono-value">{formatCurrency(selectedQuote.total)}</b><span>{address}</span><span>{paymentMethod} · Updates sent to {phone}</span></Card>
          <Button onClick={resetRequest}>Book another pickup</Button>
          <div className="secondary-actions"><button type="button" onClick={() => showNotice("Messaging will be available shortly.")}>Message provider</button><button type="button" onClick={() => setStep("details")}>Change pickup</button><button type="button" onClick={() => { resetRequest(); showNotice("Booking cancelled. No charge was made."); }}>Cancel booking</button></div>
        </div>
      )}
    </section>
  );
}

function BookingAside({ photos }: { photos: Photo[] }) {
  return (
    <aside className="booking-aside">
      <Card className="item-summary-card">
        <div className="aside-head"><b>Your items</b><span>{photos.length} photos</span></div>
        {photos.length ? <div className="aside-photos">{photos.slice(0, 4).map((photo, index) => <img key={`${photo.name}-${index}`} src={photo.url} alt="" />)}</div> : <div className="compact-empty-preview"><CameraIcon /><span>Add photos for a faster quote</span></div>}
        <div className="estimate compact-estimate"><div><small>Estimated range</small><strong>$180–$320</strong></div><p>Final price shown before booking.</p></div>
      </Card>
      <div className="trust-list" id="trust"><span><ShieldCheckIcon /> Insurance status</span><span><StarIcon /> Ratings and completed jobs</span><span><CheckIcon /> Price changes require approval</span></div>
    </aside>
  );
}

function QuoteCard({ quote, onChoose }: { quote: Quote; onChoose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="quote-card compact-quote-card">
      <div className="compact-quote-main">
        <div className="compact-provider-copy">
          <div className="compact-provider-title">{quote.label && <span className="recommendation">{quote.label}</span>}<h2>{quote.provider}</h2></div>
          <div className="compact-provider-meta"><span><StarIcon /> {quote.rating} · {quote.completedJobs} jobs</span><span><ShieldCheckIcon /> {quote.verified ? "Insurance verified" : "Insurance unavailable"}</span></div>
          <p className="compact-included">{quote.included.join(" · ")}</p>
        </div>
        <div className="compact-quote-price"><strong>{formatCurrency(quote.total)}</strong><span><ClockIcon /> {quote.window}</span></div>
        <div className="compact-quote-actions"><Button onClick={onChoose}>Choose <ArrowRightIcon /></Button><button type="button" className="text-link" onClick={() => setOpen((value) => !value)}>{open ? "Hide" : "Details"}</button></div>
      </div>
      {open && <div className="quote-details compact-quote-details"><span>Free cancellation up to two hours before pickup.</span><span>Any price change requires your approval.</span></div>}
    </Card>
  );
}
