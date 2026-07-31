import { LegalPage } from "@/components/legal-page";

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility">
      <h2>Our standard</h2>
      <p>We are building toward WCAG 2.2 Level AA so customers and providers can complete core tasks using keyboards, screen readers, zoom, high-contrast settings, and reduced-motion preferences.</p>
      <h2>Included practices</h2>
      <p>Core controls use visible labels, strong focus states, large touch targets, semantic headings, status announcements, plain-language errors, and layouts that collapse to a single column on smaller screens.</p>
      <h2>Known limitations</h2>
      <p>This repository is an interactive prototype. Third-party maps, payment interfaces, identity verification, and production photo tools must be evaluated before launch.</p>
      <h2>Feedback</h2>
      <p>Accessibility barriers should be reported through the support contact published with the production service. Include the page, task, device, browser, and assistive technology when possible.</p>
    </LegalPage>
  );
}
