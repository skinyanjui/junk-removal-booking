import type { MetadataRoute } from "next";

const baseUrl = "https://junk-removal-booking.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/provider`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/accessibility`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
