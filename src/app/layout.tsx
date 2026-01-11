import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${geistMono.variable} ${geistSans.variable}  antialiased h-screen`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
