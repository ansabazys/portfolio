import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Footer } from "@/components/navigation/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { siteConfig } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Designer & Full-Stack Developer",
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
  knowsAbout: [
    "Product Design",
    "UI/UX Design",
    "Brand & Identity",
    "Web Development",
    "SaaS Application Architecture",
    "Full-Stack Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAF8] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#FAFAF8]">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
            </div>
          </div>
          {process.env.NODE_ENV === "production" && (
            <Script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon='{"token": "1f926fc946c84971b817c8e415ef41d8"}'
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}

