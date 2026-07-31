import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/provider/dashboard"],
    },
    sitemap: "https://junk-removal-booking.vercel.app/sitemap.xml",
  };
}
