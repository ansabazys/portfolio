import type { Metadata } from "next";

export const siteConfig = {
  name: "Ansab Azys",
  title: "Ansab Azys — Designer & Full-Stack Developer",
  shortTitle: "ANSAB",
  role: "Designer & Full-Stack Developer",
  positioning: "I design and build brands, interfaces, applications, and digital products for businesses and founders turning ideas into something real.",
  location: "Kerala, India",
  availability: "Available for projects",
  currentMood: "Exploring ideas,\nbuilding what feels right.",
  email: "ansabazys@gmail.com",
  github: "https://github.com/ansabazys",
  linkedin: "https://linkedin.com/in/ansabazys",
  url: "https://ansabazys.com",
  description:
    "Personal portfolio of Ansab Azys, Designer & Full-Stack Developer creating brand identities, thoughtful user interfaces, SaaS applications, and calm digital products.",
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
