import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geist = Geist({ subsets: ["latin"] });

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
      <body className={`${geist.className} antialiased h-screen`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
