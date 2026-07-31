import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <h2>Information we collect</h2>
      <p>We collect the information needed to create and complete a junk-removal request, including contact details, service address, uploaded photos, access notes, quote activity, booking records, and payment authorization details handled by approved payment processors.</p>
      <h2>How we use information</h2>
      <p>We use this information to route requests to eligible providers, deliver quotes and status updates, verify providers, prevent fraud, support customers, improve the product, and meet legal obligations.</p>
      <h2>Provider access</h2>
      <p>Providers receive only the information needed to evaluate or perform a job. Sensitive customer information should not be disclosed before a booking unless it is operationally necessary.</p>
      <h2>Retention and choices</h2>
      <p>Records are retained only as long as needed for operations, disputes, accounting, safety, and legal compliance. Customers may request access, correction, or deletion where applicable.</p>
      <h2>Children</h2>
      <p>This service is not directed to children under 13, and we do not knowingly collect their personal information.</p>
      <h2>Contact</h2>
      <p>Privacy requests will be handled through the support contact published with the production service.</p>
    </LegalPage>
  );
}
