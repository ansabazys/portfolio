import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/navigation/Sidebar";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-[#FAFAF8] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#FAFAF8]">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col md:flex-row">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex flex-col">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
