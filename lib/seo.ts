import type { Metadata } from "next";

export const siteConfig = {
  name: "Ansab Azys",
  title: "Ansab Azys — Full-Stack Developer",
  shortTitle: "ANSAB",
  role: "Full-Stack Developer",
  positioning: "I build modern web applications, SaaS products and digital experiences for businesses and startups.",
  location: "Kerala, India",
  availability: "Available for projects",
  email: "ansabazys@gmail.com",
  github: "https://github.com/ansabazys",
  linkedin: "https://linkedin.com/in/ansabazys",
  url: "https://ansabazys.com",
  description:
    "Personal portfolio of Mohammed Ansab K, Full-Stack Developer building high-performance SaaS products, e-commerce platforms, and calm web applications.",
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = "/og-image.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const ogTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;

  return {
    title: title || undefined,
    description,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: ogTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
      creator: "@ansab",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
