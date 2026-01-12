import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import ReactLenis from "lenis/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Ansab Azys | Software Developer",
  description:
    "Portfolio of a passionate software developer specializing in web development and modern technologies.",
  keywords: [
    "software developer",
    "web developer",
    "portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Ansab Azys" }],
  openGraph: {
    title: "Ansab Azys | Software Developer",
    description: "Portfolio of a passionate software developer",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" dark">
      <ReactLenis root>
        <body
          style={{ margin: 0, padding: 0 }}
          className={`${geistMono.variable} ${geistSans.variable}  antialiased h-screen`}
        >
          <Header />

          {children}
          {/* <Footer /> */}
        </body>
      </ReactLenis>
    </html>
  );
}
