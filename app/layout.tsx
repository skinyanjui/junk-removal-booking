import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./geist-system.css";
import "./compact-system.css";
import "./card-system.css";
import "./refinement-system.css";
import "./booking-flow-system.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://junk-removal-booking.vercel.app"),
  title: {
    default: "Junk Removal Near Me | Compare Local Quotes",
    template: "%s | Junk Removal Near Me",
  },
  description: "Upload photos, receive quotes from local junk-removal providers, and choose who handles the pickup.",
  openGraph: {
    title: "Junk Removal Near Me",
    description: "Upload photos, compare verified local quotes, and book the pickup that works for you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
